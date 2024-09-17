<?php
header('Content-Type: application/json');

$text = isset($_GET['text']) ? $_GET['text'] : '';

if (empty($text)) {
    echo json_encode([
        'status' => '400',
        'error' => 'Text parameter is required.'
    ], JSON_PRETTY_PRINT);
    exit();
}

$apiUrl = 'http://api-free.ir/api/chat.php?text=' . urlencode($text);

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $apiUrl);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
$response = curl_exec($ch);
curl_close($ch);

if ($response === false) {
    echo json_encode([
        'status' => '500',
        'error' => 'Failed to fetch data from API.'
    ], JSON_PRETTY_PRINT);
    exit();
}

$data = json_decode($response, true);

if (isset($data['result'])) {
    echo json_encode([
        'status' => '200',
        'Programmer' => 'Dr.Sadeghi',
        'username' => '@Mr_Sequrity',
        'Channel' => '@api_code',
        'result' => $data['result']
    ], JSON_PRETTY_PRINT);
} else {
    echo json_encode([
        'status' => '500',
        'error' => 'Invalid response from API.'
    ], JSON_PRETTY_PRINT);
}
?>
