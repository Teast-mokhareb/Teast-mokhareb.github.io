function sendMessage() {
    const inputField = document.getElementById('userInput');
    const chatBox = document.getElementById('chatBox');
    const userMessage = inputField.value.trim();

    if (userMessage === '') return;

    
    const userMessageElement = document.createElement('div');
    userMessageElement.className = 'message user';
    userMessageElement.innerHTML = `<p>${userMessage}</p>`;
    chatBox.appendChild(userMessageElement);

    
    inputField.value = '';

    
    const url = `http://api.api-code.ir/api/ai-chatbot/?text=${encodeURIComponent(userMessage)}`;
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (!data.result) {
                throw new Error('Unexpected response format');
            }
            const botMessage = data.result;

            
            const botMessageElement = document.createElement('div');
            botMessageElement.className = 'message bot';
            botMessageElement.innerHTML = `<p>${botMessage}</p>`;
            chatBox.appendChild(botMessageElement);

            
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
