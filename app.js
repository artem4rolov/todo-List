document.addEventListener('DOMContentLoaded', () => {
    const doList = document.querySelector('.do__list'),  /* список дел первого блока (левого) */
          doListProcess = document.querySelector('.do__list-process'), /* список дел второго блока (центрального) */
          doListDone = document.querySelector('.do__list-done'), /* список дел третьего блока (правого) */
          formAddDo = document.querySelector('form'),
          textDo = document.querySelector('.do__text');
          

    let doArrayStart = [],
        doArrayProcess = [],
        doArrayDone = [];

    doList.addEventListener('click', (e) => {
        /* при удалении задачи, она удаляется из массива doArratStart */
        document.querySelectorAll('.delete__do').forEach((btn, i) => {
            if (e.target.classList.contains('delete__do')) {
                btn.parentElement.remove(); /* удаляем элемент-родитель от кнопки (это элемент li в DOM) */
                doArrayStart.splice(i, 1);
                createDoList(doArrayStart, doList);
            }
        });

        /* при подтверждении задачи, она отправляется на центральный список "в процессе" */
        document.querySelectorAll('.submit__do').forEach(function(btn, i) {
            if (e.target.classList.contains('submit__do')) {
                doArrayProcess.push(btn[i]); /* добавляем элемент (текст элемента li) из левого списка в центральный (записываем значение в массив doArrayProcess)) */

                doArrayStart.splice(i, 1); /*удаляем элемент из левого списка (также удаляем элемент из массива doArrayStart) */

                createSubmitDoosList(doArrayProcess, doListProcess); /*рендерим центральный список */
                createDoList(doArrayStart, doList); /*рендерим левый список */
                console.log(`первый массив ${doArrayStart}`);
                console.log(`второй массив ${doArrayProcess}`);
                console.log(`третий массив ${doArrayDone}`);
            }
            
        });
    });

    doListProcess.addEventListener('click', (e) => {
        document.querySelectorAll('.done__do').forEach((btn, i) => {
            if (e.target.classList.contains('done__do')) {
                doArrayDone.push(btn.parentElement.parentNode.textContent.slice(2, -1)); /* добавляем элемент (текст элемента li) из левого списка в центральный (записываем значение в массив doArrayProcess)) */

                doArrayProcess.splice(i, 1); /* удаляем элемент из левого списка (также удаляем элемент из массива doArrayStart) */

                createDoneDoosList(doArrayDone, doListDone); /*рендерим центральный список */
                createSubmitDoosList(doArrayProcess, doListProcess); /*рендерим левый список */
                console.log(`первый массив ${doArrayStart}`);
                console.log(`второй массив ${doArrayProcess}`);
                console.log(`третий массив ${doArrayDone}`);
            }
            
        });

        document.querySelectorAll('.delete__do').forEach((btn, i) => {
            if (e.target.classList.contains('delete__do')) {
                btn.parentElement.remove(); /* удаляем элемент-родитель от кнопки (это элемент li в DOM) */
                doArrayProcess.splice(i, 1);
                createSubmitDoosList(doArrayProcess, doListProcess);
                createDoList(doArrayStart, doList);
            }
        });
    });
    
    doListDone.addEventListener('click', (e) => {
        document.querySelectorAll('.delete__do').forEach((btn, i) => {
            if (e.target.classList.contains('delete__do')) {
                btn.parentElement.remove(); /* удаляем элемент-родитель от кнопки (это элемент li в DOM) */
                doArrayDone.splice(i, 1);
                createDoneDoosList(doArrayDone, doListDone);
            }
        });
    });

    // Добавление новой задачи в первый (левый) список

    formAddDo.addEventListener('submit', (e) => {
        e.preventDefault();

        doArrayStart.push(textDo.value);
        createDoList(doArrayStart, doList);
    });

    /* рендер списка задач из массива, удаление задачи из левого списка, добавление задачи в центральный список */

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

    // Перенос задачи во второй (центральный) список

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