fetch('./price.txt').then((response) => {
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