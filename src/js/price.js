fetch('./price.txt').then((response) => {
	return response.text()
}).then((text_price) => {
	document.getElementById('price-table').innerHTML = 
    text_price.split('\n').map(line => {
        return '<tr>' + line.split('\t').map(cell => {
            return '<td>' + cell + '</td>';
        }).join('') + '</tr>';
    }).join('\n');
}).catch((err) => {
	console.warn('Ошибка загрузки текста', err)
    document.getElementById('price-table').textContent = 'Прайс-лист временно недоступен...'
});
