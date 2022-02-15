fetch('./price.txt').then((response) => {
	return response.text()
}).then((text_price) => {
	document.getElementById('price-table').innerHTML = 
    text_price.split('\n').map(line => {
        return '<tr>' + line.split('\t').map((cell, i, arr) => {
            return (arr.length-1) ? '<td>' + cell + '</td>' : '<td class="table-header" colspan="2">' + cell + '</td>'
        }).join('') + '</tr>'
    }).join('\n')
}).catch((err) => {
	console.warn('Ошибка загрузки текста', err)
    document.getElementById('price-table').textContent = 'Прайс-лист временно недоступен...'
})

