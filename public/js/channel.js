$(document).ready(function() {
    $("#submit").on("click", function(e) {
        e.preventDefault();
        // var title = $("#title").val();
        // var author = $("#author").val();
        // var desc = $("#desc").val();
        // $.ajax({
        //     url: "includes/SubmitForm.inc.php",
        //     type: "POST",
        //     data: {
        //         title: title,
        //         author: author,
        //         desc: desc
        //     },
        //     success: function($data) {
        //         $("#alert").html($data);
        //         $("#form").trigger("reset");
        //     }
        // });

        // function Mercure();
    });
});

// const Mercure = () => {
//     const eventSource = new EventSource("{{ mercure('https://localhost:8000/channel/1')|escape('js') }}", { withCredentials: true });
//     eventSource.onmessage = event => {
//       // Will be called every time an update is published by the server
//       console.log(JSON.parse(event.data));
//     }
// }