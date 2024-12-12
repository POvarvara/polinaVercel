(function ($) {
    $("#contactForm").submit(function (event) {
        event.preventDefault();

        let message = $(this).find(".contact-form__message");
        let form = $("#contactForm")[0];
        let fd = new FormData(form);

        $.ajax({
            url: "/php/send-message.php", // путь к PHP-обработчику
            type: "POST",
            data: fd,
            processData: false,
            contentType: false,
            beforeSend: () => {
                message.text("Отправка...").css("color", "blue");
            },
            success: function (res) {
                if (res.status === "SUCCESS") {
                    message.text(res.message).css("color", "green");
                } else {
                    message.text(res.message).css("color", "red");
                }
            },
            error: function () {
                message.text("Ошибка сервера. Попробуйте позже.").css("color", "red");
            },
        });
    });
})(jQuery);
