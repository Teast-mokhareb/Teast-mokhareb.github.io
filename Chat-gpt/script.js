document.getElementById('messageForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const messageInput = document.getElementById('messageInput');
    const chatBox = document.getElementById('chatBox');

    const text = messageInput.value.trim();

    if (text === '') {
        return;
    }

    // نمایش پیام کاربر
    const userMessage = document.createElement('div');
    userMessage.classList.add('message', 'user');
    userMessage.innerHTML = `<p>${text}</p>`;
    chatBox.appendChild(userMessage);

    // پاک کردن ورودی
    messageInput.value = '';

    // ارسال درخواست به سرور PHP
    fetch(`gpt.php?text=${encodeURIComponent(text)}`)
        .then(response => response.json())
        .then(data => {
            // نمایش پیام ربات
            const botMessage = document.createElement('div');
            botMessage.classList.add('message', 'bot');
            if (data.result) {
                botMessage.innerHTML = `<p>${data.result}</p>`;
            } else if (data.error) {
                botMessage.innerHTML = `<p>${data.error}</p>`;
            }
            chatBox.appendChild(botMessage);

            // اسکرول به پایین
            chatBox.scrollTop = chatBox.scrollHeight;
        })
        .catch(error => {
            console.error('Error:', error);
        });
});
