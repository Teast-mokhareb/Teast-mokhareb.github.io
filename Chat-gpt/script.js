function sendMessage() {
    const inputField = document.getElementById('userInput');
    const chatBox = document.getElementById('chatBox');
    const userMessage = inputField.value.trim();

    if (userMessage === '') return;

    // Append user message
    const userMessageElement = document.createElement('div');
    userMessageElement.className = 'message user';
    userMessageElement.innerHTML = `<p>${userMessage}</p>`;
    chatBox.appendChild(userMessageElement);

    // Clear input field
    inputField.value = '';

    // Send request to server
    fetch('/sendMessage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: userMessage })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        const botMessage = data.result;

        // Append bot message
        const botMessageElement = document.createElement('div');
        botMessageElement.className = 'message bot';
        botMessageElement.innerHTML = `<p>${botMessage}</p>`;
        chatBox.appendChild(botMessageElement);

        // Scroll to bottom
        chatBox.scrollTop = chatBox.scrollHeight;
    })
    .catch(error => {
        const errorMessageElement = document.createElement('div');
        errorMessageElement.className = 'message bot';
        errorMessageElement.innerHTML = `<p>Error: ${error.message}</p>`;
        chatBox.appendChild(errorMessageElement);
        chatBox.scrollTop = chatBox.scrollHeight;
    });
}
