function lightTheme() {
    localStorage.setItem('theme', 'light');
        
    iconTheme.setAttribute('src', '/src/assets/img/day.png'); /* меняем изображение при смене темы оформления */
    iconTheme.style.transform = '';
    
    document.querySelectorAll('.todo__title').forEach(item => {
        item.style.color = '';
    });

    document.body.style.backgroundColor = '';
    document.querySelector('.todo__block-start').style.backgroundColor = '';
    document.querySelector('.todo__block-process').style.backgroundColor = '';
    document.querySelector('.todo__block-done').style.backgroundColor = '';
    document.querySelector('.modal__wrapper').style.backgroundColor = '';
}

function darkTheme() {
    localStorage.setItem('theme', 'dark');

    iconTheme.setAttribute('src', '/src/assets/img/night.png'); /* меняем изображение при смене темы оформления */
    iconTheme.style.transform = 'rotate(360deg)';
    
    document.querySelectorAll('.todo__title').forEach(item => {
        item.style.color = '#fff'; /* меняем цвет текста в заголовках на белый */
    });

    document.body.style.backgroundColor = 'rgb(99, 99, 99)'; /* задаем цвет для body */
    document.querySelector('.todo__block-start').style.backgroundColor = 'rgb(153, 153, 153)'; /* задаем цвет для всех списков задач */
    document.querySelector('.todo__block-process').style.backgroundColor = 'rgb(153, 153, 153)'; /* задаем цвет для всех списков задач */
    document.querySelector('.todo__block-done').style.backgroundColor = 'rgb(153, 153, 153)'; /* задаем цвет для всех списков задач */
    document.querySelector('.modal__wrapper').style.backgroundColor = 'rgb(99, 99, 99)'; /* задаем цвет для модалки */
}

export default {lightTheme, darkTheme};