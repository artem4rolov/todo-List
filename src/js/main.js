document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    const doList = document.querySelector('.do__list'),  /* список дел первого блока (левого) */
          doListProcess = document.querySelector('.do__list-process'), /* список дел второго блока (центрального) */
          doListDone = document.querySelector('.do__list-done'), /* список дел третьего блока (правого) */
          openFormBtn = document.querySelector('.open__form-btn'), /* кнопка открытия формы в левом списке задач */
          modal = document.querySelector('.modal'), /* подложка модального окна */
          modalWrapper = document.querySelector('.modal__wrapper'), /* модальное окно */
          formAddDo = document.querySelector('form'), /* форма добавления новой задачи */
          closeformAddDo = document.querySelector('.close__btn'), /* кнопка закрытия формы добавления задачи */
          textDo = document.querySelector('.do__text'), /* текстовое поле формы добавления задачи */
          switchTeme = document.querySelector('.switch'), /* переключатель темы оформления */
          iconTheme = document.querySelector('.icon__theme'), /* изображение при смене темы оформления */
          FAQbtn = document.querySelector('.icon__faq'); /* кнопка вызова инфо */ 

    let doArrayStart = [], /* массив с задачами в левом списке */
        doArrayProcess = [], /* массив с задачами в центральном списке */
        doArrayDone = [], /* массив с задачами в правом списке */

    localDoArrayStart = JSON.parse(localStorage.getItem('doArrayStart')),
    localDoArrayProcess = JSON.parse(localStorage.getItem('doArrayProcess')),
    localDoArrayDone = JSON.parse(localStorage.getItem('doArrayDone'));

    // render(localDoArrayStart, doList, 'start', 'submit__do', '/src/assets/img/right.png');
    // render(localDoArrayProcess, doListProcess, 'process', 'done__do', '/src/assets/img/load.gif');
    // render(localDoArrayDone, doListDone, 'done', 'success__do', '/src/assets/img/done.svg');

    if (localStorage.getItem('theme') === 'dark') {
        switchTeme.classList.add('switchOn');
        darkTheme();
    }
    if (localStorage.getItem('theme') === 'light') {
        switchTeme.classList.remove('switchOn');
        lightTheme();
    }
    
    // функция открытия модального окна с формой
    function openFormModal() {
        openFormBtn.addEventListener('click', (e) => {
            e.preventDefault();
    
            modal.style.display = 'block';
            modalWrapper.style.display = 'block';
            textDo.focus();
        });
    }

    // функция закрытия модального окна с формой
    function closeFormModal() {
        
        let eventList = ['click', 'keydown'];

        eventList.forEach(event => {
            modal.addEventListener(event, (e) => {
                if (e.target.classList.contains('modal') || e.keyCode === 27) {
                    modal.style.display = 'none';
                    modalWrapper.style.display = 'none';
                    formAddDo.reset();
                    message.remove();
                    textDo.style.border = '1px solid black';
                }
            });
        });

        closeformAddDo.addEventListener('click', (e) => {
            modal.style.display = 'none';
            modalWrapper.style.display = 'none'; 
            formAddDo.reset();
            message.remove();
            textDo.style.border = '1px solid black';
        });
    }

    // открываем, закрываем модалку с формой добавления новой задачи
    openFormModal();
    closeFormModal();

    // создадим шаблон сообщения на будущее
    const message = document.createElement('div');
    message.style.cssText = `
        position: absolute;
        width: 200px;
        height: 20px;
        border-radius: 50px;
        margin: auto;
        margin-top: 5px;
        top: 0;
        right: 0;
        left: 0;
        bottom: 1;
        background: yellow;
        font-size: 14px;
    `;

    // проверяем input textDo на количество символов 
    textDo.addEventListener('input', () => {

        if (textDo.value.length > 35) {
            
            message.textContent = 'Ты эссе хочешь написать?'; /* записываем в сообщение message текст */
            modalWrapper.append(message); /* помещаем сообщение в родителя modalWrapper */
            textDo.style.border = '5px solid red';

            setTimeout(() => {
                message.remove();
                textDo.style.border = '';
            }, 3000);

            textDo.value.substring(0, 35);

        } else  if (textDo.value.length <= 0) {
            message.textContent = 'Ничего?';
            modalWrapper.append(message);
            textDo.style.border = '5px solid red';

            setTimeout(() => {
                message.remove();
                textDo.style.border = '';
            }, 3000);
        } else if (textDo.value.length >= 1) {
            message.remove();
            textDo.style.border = '1px solid black';
        } else {
            textDo.style.border = '1px solid black';
        }
    });

    // добавляем скролл в списке задач (parent), если элементы превышают (maxNum) количество
    function scroll(doListArray, parent, maxNum) {
        if (doListArray.length > maxNum) {
            parent.style.overflow = 'hidden';
            parent.style.overflowY = 'scroll';
        } else {
            parent.style.overflowY = 'hidden';
        }
    }

    //добавляем задачу в левый список из формы Form
    formAddDo.addEventListener('submit', (e) => {
        e.preventDefault();

        if (textDo.value === '') {
            message.textContent = 'Ну придумай что-нибудь!'; /* записываем в сообщение message текст */
            modalWrapper.append(message); /* помещаем сообщение в родителя modalWrapper */
            textDo.style.border = '5px solid red';
        } else if (!(/^[0-9A-ZА-ЯЁ:. ]+$/i.test(textDo.value))) {  /* символы, которые допускаются при вводе новой задачи */
            textDo.value.replace(/[&\/\\#()$~%'":*?<>{}]/g,''); /* символы, которые будут заменены на пустую строку при вводе новой задачи */
            message.textContent = 'Давай на человеческом';
            modalWrapper.append(message);
            textDo.style.border = '5px solid red';
        } else {
            textDo.value.substring(0, 40);
            doArrayStart.push(textDo.value);

            localStorage.setItem('doArrayStart', JSON.stringify(doArrayStart));
            
            render(doArrayStart, doList, 'start', 'submit__do', '/src/assets/img/right.png'); /* первый список */
            // render(localDoArrayStart, doList, 'start', 'submit__do', '/src/assets/img/right.png');

            formAddDo.reset();
        }

        scroll(doArrayStart, doList, 10);

        if (doArrayStart.length >= 10) {
            const achivment = document.createElement('div'),
                  achivmentImg = document.createElement('img'),
                  achivmentText = document.createElement('div');
    
            achivment.style.cssText = `
                position: absolute;

                display: flex;
                justify-content: center;
                align-items: center;
                width: 200px;
                height: 100px;

                background: white;
                border-radius: 50px;

                top: 0;
                margin-left: 20px
                margin-top: 20px;

                z-index: 120;
            `;

            achivmentImg.setAttribute('src', '../src/assets/img/gif-start.gif');
            achivmentImg.setAttribute('width', 100);
            achivmentImg.setAttribute('height', 100);
            achivmentText.innerHTML = '<h2>Деловой человек!</h2>';

            achivment.append(achivmentImg);
            achivment.append(achivmentText);
    
            document.body.append(achivment);

            setTimeout(() => {
                achivment.remove();
                achivmentImg.remove();
                achivmentText.remove();
            }, 3000);
        }
    });
    
    //удаление задач из первого списка
    doList.addEventListener('mouseup', () => {
        //отслеживаем клик на кнопку удаления задачи в левом списке
        doList.querySelectorAll('.delete__do').forEach(function(btn, j) {
            btn.addEventListener('click', function() {
                for (let i = 0; i < doArrayStart.length; i++) {
                    //если индекс кнопки "удалить" совпадает с индексом массива doArrayStart (левый список дел), то удаляем этот элемент (li) из центрального списка, удаляем элемент из массива doArrayStart
                    if (j === i) {
                        btn.parentElement.remove(j);
                        doArrayStart.splice(i, 1);
                    }
                }

                localStorage.setItem('doArrayStart', JSON.stringify(doArrayStart));

                render(doArrayStart, doList, 'start', 'submit__do', '/src/assets/img/right.png'); /* первый список */
                // render(localDoArrayStart, doList, 'start', 'submit__do', '/src/assets/img/right.png');

                scroll(doArrayStart, doList, 10);
            });
            
        });
    });

    //удаление и перенос задачи из первого списка в центральный
    doList.addEventListener('mouseup', () => {

        //отслеживаем клик на кнопку удаления задачи в левом списке
        doList.querySelectorAll('.submit__do').forEach(function(btn, j) {
            btn.addEventListener('click', function() {
                for (let i = 0; i < doArrayStart.length; i++) {
                    if (j === i) {
                        doArrayProcess.push(doArrayStart[i]);
                        btn.parentElement.remove(j);
                        doArrayStart.splice(i, 1);
                    }
                }

                localStorage.setItem('doArrayProcess', JSON.stringify(doArrayProcess));
                localStorage.setItem('doArrayStart', JSON.stringify(doArrayStart));

                render(doArrayStart, doList, 'start', 'submit__do', '/src/assets/img/right.png'); /* первый список */
                // render(localDoArrayStart, doList, 'start', 'submit__do', '/src/assets/img/right.png');

                render(doArrayProcess, doListProcess, 'process', 'done__do', '/src/assets/img/load.gif'); /* центральный список */
                // render(localDoArrayProcess, doListProcess, 'process', 'done__do', '/src/assets/img/load.gif');

                scroll(doArrayProcess, doListProcess, 10);


                // ачивка для первого списка
                if (doArrayProcess.length >= 10) {
                    const achivment = document.createElement('div'),
                          achivmentImg = document.createElement('img'),
                          achivmentText = document.createElement('div');
            
                    achivment.style.cssText = `
                        position: absolute;
        
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        width: 300px;
                        height: 100px;
        
                        background: white;
                        border-radius: 50px;
        
                        top: 0;
                        margin-left: 20px
                        margin-top: 20px;
        
                        z-index: 120;
                    `;
        
                    achivmentImg.setAttribute('src', '../src/assets/img/gif-process.gif');
                    achivmentImg.setAttribute('width', 100);
                    achivmentImg.setAttribute('height', 100);
                    achivmentText.innerHTML = '<h2>А ты не сдаешься!</h2>';
        
                    achivment.append(achivmentImg);
                    achivment.append(achivmentText);
            
                    document.body.append(achivment);
        
                    setTimeout(() => {
                        achivment.remove();
                        achivmentImg.remove();
                        achivmentText.remove();
                    }, 3000);
                }
            });
        });
    });

    //удаление задачи из центрального списка, появление модалки
    //обязательно отслеживать клик по родителю doListProcess, иначе не работает
    doListProcess.addEventListener('click', (e) => {
        
        //создание модалки (Бросаешь на пол пути)
        const modal = document.createElement('div');
        modal.style.cssText = `
            height: 30px;
            width: 180px;
            background-color: #F6272F;
            color: #fff;
            border-radius: 50px;
            font-size: 14px;
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
            font-family: 'Roboto', sans-serif;
            z-index: 5;
            opacity: 1;
        `;

        modal.textContent = 'Бросаешь на полпути?';
        // e.target.parentElement.parentElement.previousElementSibling.append(modal);
        if (e.target.classList.contains('delete__do')) {
            // doListProcess.appendChild(modal);
            e.target.parentElement.parentElement.previousElementSibling.append(modal);

            //удаление модалки через 3 секунды
            setTimeout(() => {
                modal.remove();
            }, 3000);
        }
        
        //отслеживаем клик на кнопку удаления задачи в центральном списке
        //обязательно указываем элемент именно из центрального списка doListProcess с помощью querySelector, иначе всё ломается
        doListProcess.querySelectorAll('.delete__do').forEach(function(btn, j) {
            btn.addEventListener('click', function() {
                modal.remove();
                for (let i = 0; i < doArrayProcess.length; i++) {
                    //если индекс кнопки "удалить" совпадает с индексом массива doArraProcess (центральный список дел), то удаляем этот элемент (li) из центрального списка, удаляем элемент из массива doArrayProcess
                    if (j === i) {
                        doArrayProcess.splice(i, 1);
                        btn.parentElement.remove(j);
                    }
                }

                localStorage.setItem('doArrayProcess', JSON.stringify(doArrayProcess));

                //после
                render(doArrayProcess, doListProcess, 'process', 'done__do', '/src/assets/img/load.gif'); /* центральный список */
                // render(localDoArrayProcess, doListProcess, 'process', 'done__do', '/src/assets/img/load.gif');

                scroll(doArrayProcess, doListProcess, 10);
            });
        });
    });

    //удаление и перенос задачи из центрального списка в правый
    doListProcess.addEventListener('mouseup', (e) => {
       //отслеживаем клик на кнопку удаления задачи в левом списке
       doListProcess.querySelectorAll('.done__do').forEach(function(btn, j) {
            btn.addEventListener('click', function() {
                if (e.target.classList.contains('done__do')) {
                    for (let i = 0; i < doArrayProcess.length; i++) {
                        if (j === i) {
                            doArrayDone.push(doArrayProcess[i]);
                            btn.parentElement.remove(j);
                            doArrayProcess.splice(i, 1);
                        }
                    }
                }

                localStorage.setItem('doArrayProcess', JSON.stringify(doArrayProcess));
                localStorage.setItem('doArrayDone', JSON.stringify(doArrayDone));

                render(doArrayProcess, doListProcess, 'process', 'done__do', '/src/assets/img/load.gif'); /* центральный список */
                // render(localDoArrayProcess, doListProcess, 'process', 'done__do', '/src/assets/img/load.gif');

                render(doArrayDone, doListDone, 'done', 'success__do', '/src/assets/img/done.svg'); /* правый список */
                // render(localDoArrayDone, doListDone, 'done', 'success__do', '/src/assets/img/done.svg');
                // createDoneDoosList(doArrayDone, doListDone);

                scroll(doArrayDone, doListDone, 10);

                if (doArrayDone.length >= 10) {
                    const achivment = document.createElement('div'),
                          achivmentImg = document.createElement('img'),
                          achivmentText = document.createElement('div');
            
                    achivment.style.cssText = `
                        position: absolute;
        
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        width: 280px;
                        height: 120px;
        
                        background: white;
                        border-radius: 50px;
        
                        top: 0;
                        margin-left: 20px
                        margin-top: 20px;
        
                        z-index: 120;
                    `;
        
                    achivmentImg.setAttribute('src', '../src/assets/img/gif-done.gif');
                    achivmentImg.setAttribute('width', 100);
                    achivmentImg.setAttribute('height', 100);
                    achivmentText.innerHTML = '<h2>Держишь слово!</h2>';
        
                    achivment.append(achivmentImg);
                    achivment.append(achivmentText);
            
                    document.body.append(achivment);
        
                    setTimeout(() => {
                        achivment.remove();
                        achivmentImg.remove();
                        achivmentText.remove();
                    }, 3000);
                }
            });
        }); 
    });

    //удаление задач из правого списка
    doListDone.addEventListener('mouseup', () => {
        //отслеживаем клик на кнопку удаления задачи в правом списке
        doListDone.querySelectorAll('.delete__do').forEach(function(btn, j) {
            btn.addEventListener('click', function() {
                for (let i = 0; i < doArrayDone.length; i++) {
                    //если индекс кнопки "удалить" совпадает с индексом массива doArrayStart (левый список дел), то удаляем этот элемент (li) из центрального списка, удаляем элемент из массива doArrayStart
                    if (j === i) {
                        btn.parentElement.remove(j);
                        doArrayDone.splice(i, 1);
                    }
                }

                localStorage.setItem('doArrayDone', JSON.stringify(doArrayDone));

                render(doArrayDone, doListDone, 'done', 'success__do', '/src/assets/img/done.svg'); /* правый список */
                // render(localDoArrayDone, doListDone, 'done', 'success__do', '/src/assets/img/done.svg');

                scroll(doArrayDone, doListDone, 10);
            });
            
        });
    });

    // функция рендера списков задач
    function render(doos, parent, doItemStatusClass, imgClass, src) {
        parent.innerHTML = '';

        doos.forEach((item, i) => {
            parent.innerHTML += `
                <li class="do__item">
                    <div class="content__do-item ${doItemStatusClass}">
                        <div class="text">${item}</div>
                        <img class="${imgClass}" src=${src} width="30" height="30">
                    </div>
                    <img class="delete__do" src="/src/assets/img/delete.png" width="35" height="35">
                </li>
            `;
        });
    }

    // смена темы оформления
    switchTeme.addEventListener('click', () => {
        switchTeme.classList.toggle('switchOn');

        if (switchTeme.classList.contains('switchOn')) {
            setTimeout(() => {
                setTimeout(() => {
                    iconTheme.setAttribute('src', '/src/assets/img/night.png'); /* меняем изображение при смене темы оформления */
                }, 0);
                iconTheme.style.transform = 'rotate(360deg)';
            }, 0);
            darkTheme();
        } else {
            // делаем всё как было для светлой темы
            setTimeout(() => {
                setTimeout(() => {
                    iconTheme.setAttribute('src', '/src/assets/img/day.png'); /* меняем изображение при смене темы оформления */
                }, 0);
                iconTheme.style.transform = '';
            }, 0);
            lightTheme();
        }
    });

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


    // открытие модального окна с информацией
    FAQbtn.addEventListener('click', () => {
        const infoModal = document.createElement('div'),
              infoModalContent = document.createElement('div'),
              closeForm = document.createElement('div');

        const message = document.createElement('div');
        message.style.cssText = `
            width: 100%;
            height: 100%;
            margin-top: 20px;
            margin: 0 auto;
            border-radius: 50px;
            font-size: 14px;
        `;

        infoModal.classList.add('modal');
        infoModalContent.classList.add('modal__wrapper');
        closeForm.classList.add('close__btn');
        closeForm.style.marginRight = '20px';
        closeForm.style.marginTop = '20px';
        closeForm.innerHTML = 'x';

        message.innerHTML = `
            <b>Канбан-доски</b>
            <hr>
            <i>А вы думали, что это простой туду-лист? Нет.</i>
            Методология канбан пришла к нам с японского завода Toyota и в контексте этой концепции
            переводится как “сигнальная карточка”. Этот метод в первую очередь про визуализацию задач
            и управление их потоком.
        `;

        infoModal.append(infoModalContent);
        infoModalContent.append(message);
        infoModalContent.append(closeForm);
        document.body.append(infoModal);

        infoModal.style.display = 'block';
        infoModalContent.style.display = 'block';

        let eventList = ['click', 'keydown'];

        eventList.forEach(event => {
            infoModal.addEventListener(event, (e) => {
                if (e.target.classList.contains('modal') || e.keyCode === 27) {
                    infoModal.style.display = 'none';
                    infoModalContent.style.display = 'none';
                    message.remove();
                }
            });
        });

        closeForm.addEventListener('click', (e) => {
            infoModal.style.display = 'none';
            infoModalContent.style.display = 'none';
            message.remove();
        });
    });

    // статус-бар на устройствах, шириной экрана от 1024 и ниже
    const main = document.querySelector('.main'),
          body = document.querySelector('body'),
          btnNext = document.querySelector('.next'),
          btnPrev = document.querySelector('.prev'),
          blockWithList = document.querySelector('.todo__block-start');

    //  шаг     скролл бади (0) + ширина блока с задачами   +  (ширина блока main) - (ширина блока с задачами * 3) - 10 (примерный расчет)
    let step = (body.scrollLeft + blockWithList.clientWidth + ((main.clientWidth - (blockWithList.clientWidth * 3) - 10) / 3));
    

    btnNext.addEventListener('click', (e) => {
        body.scrollBy({
            left: step,
            behavior: 'smooth'
        });
    });

    btnPrev.addEventListener('click', (e) => {
        body.scrollBy({
            left: -step,
            behavior: 'smooth'
        });
    });

    //secret
    const secret = document.querySelector('.secret');

    secret.addEventListener('click', () => {
        const infoModal = document.createElement('div'),
              infoModalContent = document.createElement('div'),
              closeForm = document.createElement('div');

        const message = document.createElement('div');
        message.style.cssText = `
            width: 100%;
            height: 100%;
            margin-top: 20px;
            margin: 0 auto;
            border-radius: 50px;
            font-size: 14px;
        `;

        infoModal.classList.add('modal');
        infoModalContent.classList.add('modal__wrapper');
        closeForm.classList.add('close__btn');
        closeForm.style.marginRight = '20px';
        closeForm.style.marginTop = '20px';
        closeForm.innerHTML = 'x';

        message.innerHTML = `
            <b>Секрет!</b>
            <br>
            P.S. Чтобы разгадать секрет - добавляй как можно больше задач, и увидишь результат!
        `;

        infoModal.append(infoModalContent);
        infoModalContent.append(message);
        infoModalContent.append(closeForm);
        document.body.append(infoModal);

        infoModal.style.display = 'block';
        infoModalContent.style.display = 'block';

        let eventList = ['click', 'keydown'];

        eventList.forEach(event => {
            infoModal.addEventListener(event, (e) => {
                if (e.target.classList.contains('modal') || e.keyCode === 27) {
                    infoModal.style.display = 'none';
                    infoModalContent.style.display = 'none';
                    message.remove();
                }
            });
        });

        closeForm.addEventListener('click', (e) => {
            infoModal.style.display = 'none';
            infoModalContent.style.display = 'none';
            message.remove();
        });

        secret.remove();
    });

});