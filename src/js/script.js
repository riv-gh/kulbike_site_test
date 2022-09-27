// prise
fetch('./price.txt?'+Math.random()).then((response) => {
	return response.text()
}).then((text_price) => {
    let header_num = 0
	document.getElementById('price-table').innerHTML = 
    text_price.split('\n').map((line, i, lines_arr) => {
        return '<tr>' + line.split('\t').map((cell, j, arr) => {
            return (arr.length-1) ? 
                `<td class="table-child table-child_${header_num}">${cell}</td>` : 
                (()=>{
                    header_num=i
                    return `<td class="table-header table-header_${i}" colspan="2">${cell}</td>`
                })()
        }).join('') + '</tr>'
    }).join('\n')
}).catch((err) => {
	console.warn('Ошибка загрузки текста', err)
    document.getElementById('price-table').textContent = 'Прайс-лист временно недоступен...'
})
var global
setTimeout(()=>{
    document.querySelectorAll('#price-container .table-header').forEach(header=>{
        header.addEventListener('click', (event)=>{
            event.target.classList.toggle('header-show')
            global = event.target
            document.querySelectorAll(`.table-child_${
                Array.from(event.target.classList).find(el=>el.indexOf('table-header_')+1).split('_')[1]
            }`).forEach(el => {
                el.classList.toggle('child-show')
            })
        })
    })
},300)
// //price

// menu
const menu_el = document.getElementById('menu')
function toggleMenu() {
    menu_el.classList.toggle('show')
}
document.querySelectorAll('#menu a:not(#menu_btn)').forEach(a=>{
    a.addEventListener('click', () => { menu_el.classList.remove('show') })
})
// //menu

// send message
const message_show_el = document.querySelector('#message_show')
message_show_el.querySelector('a').addEventListener('click',()=>{
    message_show_el.classList.remove('show')
    form_clear()
})

document.querySelector('#message-form input[type=button]').addEventListener('click', async (form) => {
    send_message(
        'Имя: *' + document.getElementById('tb_name').value + '*\n' +
        'Телефон: ' + document.getElementById('tb_phone').value + '\n' +
        ( document.getElementById('cb_write').checked ? 'Предпочтение текста\n' : 'Предпочтение звонка\n') +
        'Сообщение:\n' + document.getElementById('tb_message').value + '\n\n' +
        '[‌‌Перезвонить](' + document.location.origin+document.location.pathname + 'recall.html?' + document.getElementById('tb_phone').value.replace(/\s|-|\(|\)|\+|\?/gi,'') + ')'
    )    
})
function form_clear() {
    document.getElementById('tb_name').value = ''
    document.getElementById('tb_phone').value = ''
    document.getElementById('tb_message').value = ''
}

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
            form_clear()
        },3000)
        
    }).catch((err) => {
        console.warn('Ошибка отправки', err)
        document.querySelector('#message_show pre').textContent = 'Ошибка отправки!\n' + err
    });
    return false
}
// //send message

//year
const year_el = document.getElementById('year')
year_el.innerText+='-'+(new Date()).getFullYear()
// //year