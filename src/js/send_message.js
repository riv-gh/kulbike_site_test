const message_show_el = document.querySelector('#message_show')
message_show_el.querySelector('a').addEventListener('click',()=>{
    message_show_el.classList.remove('show')
})

document.querySelector('#message-form input[type=button]').addEventListener('click', async (form) => {
    send_message(
        'Имя: *' + document.getElementById('tb_name').value + '*\n' +
        'Телефон: ' + document.getElementById('tb_phone').value + '\n' +
        ( document.getElementById('cb_write').checked ? 'Предпочтение текста\n' : 'Предпочтение звонка\n') +
        'Сообщение:\n' + document.getElementById('tb_message').value + '\n\n' +
        '[‌‌Перезвонить](' + document.location.origin+document.location.pathname + 'recall.html?' + document.getElementById('tb_phone').value.replace('+','') + ')'
    )    
})

function send_message(text) {
    const telegram_api_key = '5178774646:AAF2TR-SJXoLeBkt0Jy5FFUOumfYtB9wL8k' //please not use
    const telegram_chat_id = '-1001690597788'
    const link = `https://api.telegram.org/bot${telegram_api_key}/sendMessage`
    fetch(link, {
    method: 'post',
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `chat_id=${telegram_chat_id}&parse_mode=Markdown&text=${encodeURI(text)}`,
    }).then((response) => {
        return response.text()
    }).then((json) => {
        if (!JSON.parse(json)['ok']) 
            throw JSON.parse(json)
        message_show_el.classList.add('show')
        setTimeout(()=>{
            message_show_el.classList.remove('show')
        },3000)
        
    }).catch((err) => {
        console.warn('Ошибка отправки', err)
        document.querySelector('#message_show pre').textContent = 'Ошибка отправки!\n' + err
    });
    return false
}