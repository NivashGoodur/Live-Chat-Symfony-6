<?php

namespace App\Controller;

use DateTime;
use App\Entity\Channel;
use App\Entity\Message;
use App\Form\MessageType;
use App\Repository\ChannelRepository;
use App\Repository\MessageRepository;
use Symfony\Component\Mercure\Update;
use Symfony\Component\Mercure\HubInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Attribute\IsGranted;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;

class ChatController extends AbstractController
{
    #[IsGranted('ROLE_USER')]
    #[Route('/', name: 'app_home')]
    public function index(): Response
    {

        return $this->render('chat/chat.html.twig');
    }

    #[IsGranted('ROLE_USER')]
    #[Route('channel/{id}', name: 'app_channel')]
    public function channel(Request $request, Channel $channel, HubInterface $hub, MessageRepository $messageRepository, ChannelRepository $channelRepository): Response
    {

        $messages = $messageRepository->findBy(['channel' => $channel->getId()], ['date' => 'DESC'], 5);

        $messages = array_reverse($messages);

        $form = $this->createForm(MessageType::class);
        $form->handleRequest($request);


        return $this->render('chat/channel.html.twig', [
            'form' => $form->createView(),
            'messages' => $messages,
            'channels' => $channelRepository->findAll(),
            'channelId' => $channel->getId()
        ]);
    }

    #[IsGranted('ROLE_USER')]
    #[Route('channel/{id}/post-message', name: 'app_channel_post_message', methods: ['POST'])]
    public function channelPostMessage(Request $request, Channel $channel, HubInterface $hub, MessageRepository $messageRepository, ChannelRepository $channelRepository) : Response
    {

        $data = \json_decode($request->getContent(), true); // On récupère les data postées et on les déserialize

        if (empty($content = $data['content'])) {
            throw new AccessDeniedHttpException('No data sent');
        }

        $content = trim(strip_tags($data['content']));


        $NewMessage = new Message();
        $NewMessage
            ->setContent($content)
            ->setdate(new DateTime())
            ->setAuthor($this->getUser())
            ->setChannel($channel);

        $messageRepository->save($NewMessage, 1);

        $update = new Update(
            'https://localhost:8000/channel/' . $channel->getId(),
            json_encode([
                'content' => $NewMessage->getContent(),
                'authorFirstName' => $NewMessage->getAuthor()->getFirstname(),
                'authorLastName' => $NewMessage->getAuthor()->getLastname(),
                'date' => $NewMessage->getdate(),
            ])
        );

        $hub->publish($update);

        return new Response('Its coming from here .', 200, array('Content-Type' => 'text/html'));
    }
}
