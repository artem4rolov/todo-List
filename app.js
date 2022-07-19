document.addEventListener('DOMContentLoaded', () => {
    const doList = document.querySelector('.do__list'),  /* список дел первого блока (левого) */
          doListProcess = document.querySelector('.do__list-process'), /* список дел второго блока (центрального) */
          doListDone = document.querySelector('.do__list-done'), /* список дел третьего блока (правого) */
          formAddDo = document.querySelector('form'),
          textDo = document.querySelector('.do__text');

    let doArrayStart = [],
        doArrayProcess = [],
        doArrayDone = [];

    // Добавление новой задачи в первый (левый) список

    formAddDo.addEventListener('submit', (e) => {
        e.preventDefault();

        doArrayStart.push(textDo.value);
        createDoList(doArrayStart, doList);
        

        console.log(doArrayStart);

    });

    /* рендер списка задач из массива, удаление задачи из левого списка, добавление задачи в центральный список */

    function createDoList(doos, parent) {
        parent.innerHTML = '';

        doos.forEach((item, i) => {
            parent.innerHTML += `
                <li class="do__item"> ${i + 1} ${item}
                    <div class="buttons">
                        <div class="delete__do"></div>
                        <div class="submit__do"></div>
                    </div>
                </li>
            `;
        });
        /* при удалении задачи, она удаляется из массива doArratStart */
        document.querySelectorAll('.delete__do').forEach((btn, i) => {
            btn.addEventListener('click', (e) => {
                btn.parentElement.remove(); /* удаляем элемент-родитель от кнопки (это элемент li в DOM) */
                doArrayStart.splice(i, 1);
                createDoList(doos, parent);
            });
        });

        /* при подтверждении задачи, она отправляется на центральный список "в процессе" */
        document.querySelectorAll('.submit__do').forEach((btn, i) => {
            btn.addEventListener('click', (e) => {
                doArrayProcess.push(btn.parentElement.parentNode.textContent.slice(2, -1)); /* добавляем элемент (текст элемента li) из левого списка в центральный (записываем значение в массив doArrayProcess)) */

                doArrayStart.splice(i, 1); /*удаляем элемент из левого списка (также удаляем элемент из массива doArrayStart) */

                createSubmitDoosList(doArrayProcess, doListProcess); /*рендерим центральный список */
                createDoList(doos, parent); /*рендерим левый список */
            });
            
        });

        document.querySelectorAll('.done__do').forEach((btn, i) => {
            btn.addEventListener('click', (e) => {
                doArrayDone.push(btn.parentElement.parentNode.textContent.slice(2, -1)); /* добавляем элемент (текст элемента li) из левого списка в центральный (записываем значение в массив doArrayProcess)) */

                doArrayProcess.splice(i, 1); /*удаляем элемент из левого списка (также удаляем элемент из массива doArrayStart) */

                createDoneDoosList(doArrayDone, doListDone); /*рендерим центральный список */
                createSubmitDoosList(doArrayProcess, doListProcess); /*рендерим левый список */
            });
            
        });

    }

    // Перенос задачи во второй (центральный) список

    

    function createSubmitDoosList(doos, parent) {
        parent.innerHTML = '';

        doos.forEach((item, i) => {
            parent.innerHTML += `
                <li class="do__item"> ${i + 1} ${item}
                    <div class="buttons">
                        <img class="animate__do" src="/img/load.gif" width="20px" height="20px">
                        <div class="done__do"></div>
                    </div>
                </li>
            `;
        });
    }

    function createDoneDoosList(doos, parent) {
        parent.innerHTML = '';

        doos.forEach((item, i) => {
            parent.innerHTML += `
                <li class="do__item"> ${i + 1} ${item}
                    <div class="buttons">
                        <div class="delete__do"></div>
                        <img class="done__do" src="/img/load.gif" width="20px" height="20px>
                    </div>
                </li>
            `;
        });
    }

});