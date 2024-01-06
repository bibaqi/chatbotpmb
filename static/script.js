$(document).ready(function () {
    $("#send-btn").click(function () {
        sendMessage();
    });

    $("#user-input").keypress(function (e) {
        if (e.which == 13) {
            sendMessage();
            return false;
        }
    });
});

function sendMessage() {
    let userInput = $("#user-input").val();
    if (userInput) {
        let userMessage = $(`<div class="user-message">${userInput}</div>`);
        $("#chat-content").append(userMessage);

        // Tampilkan indikator mengetik
        let typingIndicator = $('<div id="typing-indicator">waiting response<span class="typing-dots">...</span></div>');
        $("#chat-content").append(typingIndicator);

        setTimeout(function () {
            $.ajax({
                url: "/get_response",
                method: "POST",
                data: { user_input: userInput },
                success: function (response) {
                    // Sembunyikan indikator mengetik setelah mendapatkan respons
                    typingIndicator.remove();

                    let botMessage = $(`<div class="bot-message">\n ${response}</div>`);
                    $("#chat-content").append(botMessage);
                    $("#user-input").val("");
                    botMessage[0].scrollIntoView(); // Scroll ke pesan bot terbaru
                }
            });
        }, 3000);
    }
}