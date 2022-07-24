document.addEventListener('DOMContentLoaded', () => {
    const doList = document.querySelector('.do__list'),  /* список дел первого блока (левого) */
          doListProcess = document.querySelector('.do__list-process'), /* список дел второго блока (центрального) */
          doListDone = document.querySelector('.do__list-done'), /* список дел третьего блока (правого) */
          formAddDo = document.querySelector('form'),
          textDo = document.querySelector('.do__text');

    let doArrayStart = [],
        doArrayProcess = [],
        doArrayDone = [];

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
                createDoList(doArrayStart, doList);
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
                createDoList(doArrayStart, doList);
                createSubmitDoosList(doArrayProcess, doListProcess);
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
                //после
                createSubmitDoosList(doArrayProcess, doListProcess);
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
            createSubmitDoosList(doArrayProcess, doListProcess);
            createDoneDoosList(doArrayDone, doListDone);
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
                createDoneDoosList(doArrayDone, doListDone);
            });
            
        });
    });

    //добавляем задачу в левый список из формы Form
    formAddDo.addEventListener('submit', (e) => {
        e.preventDefault();

        doArrayStart.push(textDo.value);
        createDoList(doArrayStart, doList);
    });

    // рендер первый список
    function createDoList(doos, parent) {
        parent.innerHTML = '';

        doos.forEach((item, i) => {
            parent.innerHTML += `
                <li class="do__item"> 
                    <div class="content__do-item start">
                        <div class="text">${item}</div>
                        <img class="submit__do" src="/img/right.png" width="30" height="30">
                    </div>
                    <img class="delete__do" src="/img/delete.png" width="35" height="35">
                </li>
            `;
        });

    }

    // рендер второй список
    function createSubmitDoosList(doos, parent) {
        parent.innerHTML = '';

        doos.forEach((item, i) => {
            parent.innerHTML += `
                <li class="do__item">
                    <div class="content__do-item process">
                        <div class="text">${item}</div>
                        <img class="done__do" src="/img/load.gif" width="30" height="30">
                    </div>
                    <img class="delete__do" src="/img/delete.png" width="35" height="35">
                </li>
            `;
        });
    }

    // рендер третий список
    function createDoneDoosList(doos, parent) {
        parent.innerHTML = '';

        doos.forEach((item, i) => {
            parent.innerHTML += `
                <li class="do__item">
                    <div class="content__do-item done">
                        <div class="text">${item}</div>
                        <img class="success__do" src="/img/done.svg" width="30" height="30">
                    </div>
                    <img class="delete__do" src="/img/delete.png" width="35" height="35">
                </li>
            `;
        });
    }

});