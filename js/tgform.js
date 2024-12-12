document.getElementById('contactForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const botToken = "8045325196:AAECxgcshH5WSqMS45xxuxL-bUzmt1Tql8w"; // Укажите токен вашего бота
    const chatId = "806496812"; // Укажите ваш Chat ID

    const formData = new FormData();
    formData.append('chat_id', chatId);

    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const message = document.getElementById('message').value;
    const file = document.getElementById('file').files[0];

    const text = `Имя: ${name}\nТелефон: ${phone}\nСообщение: ${message}`;
    formData.append('caption', text);

    if (file) {
        formData.append('document', file);
    } else {
        formData.append('text', text);
    }

    const url = file
        ? `https://api.telegram.org/bot${botToken}/sendDocument`
        : `https://api.telegram.org/bot${botToken}/sendMessage`;

    const notification = document.getElementById('notification');

    try {
        const response = await fetch(url, {
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            showNotification('Сообщение успешно отправлено!', 'success');
            document.getElementById('contactForm').reset();
        } else {
            showNotification('Ошибка отправки сообщения.', 'error');
        }
    } catch (error) {
        console.error('Ошибка:', error);
        showNotification('Ошибка при отправке.', 'error');
    }
});

function showNotification(message, type) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.className = type;
    notification.style.display = 'block';
    setTimeout(() => {
        notification.style.display = 'none';
    }, 5000);

}