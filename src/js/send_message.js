const form_btn = document.querySelector('#message-form input[type=button]');
form_btn.addEventListener('click', async (form) => {
    return send_message(
        'Имя: ' + document.getElementById('tb_name').value + '\n' +
        'Телефон: ' + document.getElementById('tb_phone').value + '\n' +
        ( document.getElementById('cb_write').checked ? 'Предпочтение текста\n' : 'Предпочтение звонка\n') +
        'Сообщение:\n' + document.getElementById('tb_message').value + '\n' +
        document.location.href + 'recall.html?' + document.getElementById('tb_phone').value.replace('+','')
    )
        
})



function send_message(text) {
    const telegram_api_key = '5178774646:AAF2TR-SJXoLeBkt0Jy5FFUOumfYtB9wL8k' //please not use
    const telegram_chat_id = '-1001690597788'
    const link = `https://api.telegram.org/bot${telegram_api_key}/sendMessage`
    fetch(link, {
    method: 'post',
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `chat_id=${telegram_chat_id}&text=${encodeURI(text)}`,
    }).then((response) => {
        return response.text()
    }).then((text) => {
        console.log(text)
    }).catch((err) => {
        console.warn('Ошибка отправки', err)
    });
    return false
}