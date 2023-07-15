const messageMercure = (jsonData, author) => {

    let chatChannel = document.querySelector(".chat-channel");
    let dateMessage = jsonData.date.date.split('.')[0];

    if (author == 1) {
        chatChannel.insertAdjacentHTML(
            'beforeend',
            `            <li class="d-flex justify-content-between mb-4">
            <img src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp" alt="avatar"
              class="rounded-circle d-flex align-self-start me-3 shadow-1-strong" width="60">
            <div class="card mask-custom w-100 author-1">
              <div class="card-header d-flex justify-content-between p-3"
                style="border-bottom: 1px solid rgba(255,255,255,.3);">
                <p class="fw-bold mb-0">${jsonData.authorFirstName} ${jsonData.authorLastName}</p>
                <p class="text-light small mb-0"><i class="far fa-clock"></i>${dateMessage}</p>
              </div>
              <div class="card-body">
                <p class="mb-0">
                  ${jsonData.content}
                </p>
              </div>
            </div>
          </li>`
        );
    } else {
        chatChannel.insertAdjacentHTML(
            'beforeend',
            `            <li class="d-flex justify-content-between mb-4">
            <div class="card mask-custom w-100 author-2">
              <div class="card-header d-flex justify-content-between p-3"
                style="border-bottom: 1px solid rgba(255,255,255,.3);">
                <p class="fw-bold mb-0">${jsonData.authorFirstName} ${jsonData.authorLastName}</p>
                <p class="text-light small mb-0"><i class="far fa-clock"></i>${dateMessage}</p>
              </div>
              <div class="card-body">
                <p class="mb-0">
                  ${jsonData.content}
                </p>
              </div>
            </div>
            <img src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-5.webp" alt="avatar"
              class="rounded-circle d-flex align-self-start ms-3 shadow-1-strong" width="60">
          </li>`
        );
    }

    //scroll to last message
    chatChannel.scrollTop = chatChannel.scrollHeight;
}
