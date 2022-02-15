const menu_el = document.getElementById('menu')
function toggleMenu() {
    menu_el.classList.toggle('show')
}
document.querySelectorAll('#menu a:not(#menu_btn)').forEach(a=>{
    a.addEventListener('click', () => { menu_el.classList.remove('show') })
})
