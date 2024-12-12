<?php

header('Content-Type: application/json'); // Устанавливаем заголовок для JSON

$botToken = '8045325196:AAECxgcshH5WSqMS45xxuxL-bUzmt1Tql8w';
$chatId = '678464658';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Проверка обязательных полей
    if (empty($_POST['name']) || empty($_POST['phone']) || empty($_POST['message'])) {
        echo json_encode(['status' => 'ERROR', 'message' => 'Заполните все поля!']);
        exit;
    }

    $name = htmlspecialchars($_POST['name']);
    $phone = htmlspecialchars($_POST['phone']);
    $message = htmlspecialchars($_POST['message']);

    // Формируем текст сообщения
    $text = "Имя: $name\nТелефон: $phone\nСообщение: $message";

    // Telegram API URL
    $url = "https://api.telegram.org/bot$botToken/sendMessage";
    $data = [
        'chat_id' => $chatId,
        'text' => $text,
    ];

    // Если есть файл
    if (isset($_FILES['file']) && $_FILES['file']['error'] === UPLOAD_ERR_OK) {
        $fileTmpPath = $_FILES['file']['tmp_name'];
        $fileName = $_FILES['file']['name'];

        // Убедимся, что файл является изображением
        $fileType = mime_content_type($fileTmpPath);
        $allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
        if (!in_array($fileType, $allowedTypes)) {
            echo json_encode(['status' => 'ERROR', 'message' => 'Файл должен быть изображением!']);
            exit;
        }

        // Отправляем файл в Telegram
        $url = "https://api.telegram.org/bot$botToken/sendDocument";
        $data = [
            'chat_id' => $chatId,
            'caption' => $text,
            'document' => new CURLFile($fileTmpPath, $fileType, $fileName),
        ];
    }

    // Отправляем запрос в Telegram
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $response = curl_exec($ch);
    $error = curl_error($ch);
    curl_close($ch);

    if ($response === false) {
        echo json_encode(['status' => 'ERROR', 'message' => 'Ошибка отправки: ' . $error]);
        exit;
    }

    echo json_encode(['status' => 'SUCCESS', 'message' => 'Сообщение успешно отправлено!']);
    exit;
} else {
    echo json_encode(['status' => 'ERROR', 'message' => 'Метод не поддерживается!']);
    exit;
}
