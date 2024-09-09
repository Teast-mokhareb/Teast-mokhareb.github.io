const { exec } = require('child_process');
const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('public'));

app.post('/sendMessage', (req, res) => {
    const userMessage = req.body.text;
    if (!userMessage) {
        return res.status(400).send('No message provided');
    }

    const encodedMessage = encodeURIComponent(userMessage);
    const curlCommand = `curl "http://api.api-code.ir/api/ai-chatbot/?text=${encodedMessage}"`;

    exec(curlCommand, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return res.status(500).send(`Error: ${error.message}`);
        }

        try {
            const data = JSON.parse(stdout);
            if (data.result) {
                return res.json({ result: data.result });
            } else {
                return res.status(500).send('Unexpected response format');
            }
        } catch (parseError) {
            return res.status(500).send('Failed to parse response');
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
      
