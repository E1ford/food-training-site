'use strict';


    // 1шаг. создать переменные  !первая переменная это каждый раздел(кнопка) на табе !вторая переменная это информация которая появляется на этом слайде
    // !третья переменная это родитель всех табов(кнопок)
window.addEventListener('DOMContentLoaded', () => {


    const   tabs = document.querySelectorAll('.tabheader__item'),
            tabsContants = document.querySelectorAll('.tabcontent'),
            tabParent = document.querySelector('.tabheader__items');
            


    //функция которая прячет весь контент лишний а так же удаляет класс активности и класс -показать 
    function hideTab(){
        tabsContants.forEach((item) => {
            item.classList.remove('show');
            item.classList.add('hide');
        });
        tabs.forEach( item => {
            item.classList.remove('tabheader__item_active');
        });
    }



    //функция для показа определенного слайда убирает с активного окна класс-спрятать и дает ему класс -показать так же дает ему класс -активного окна
    function showTabs(i=0){
        tabsContants[i].classList.add('show');
        tabsContants[i].classList.remove('hide');

        tabs[i].classList.add('tabheader__item_active');
    }
    // сначала вызываем все спрятать потом только показать, иначе программа отчистит все и ничего не отобразится
    hideTab();
    showTabs();
    // делигирование присваиываем обработчик событий, проверяем что бы нажатый элемент имел класс (кнопки) на которую нам надо нажать 

    tabParent.addEventListener('click', (event) =>{
        const target = event.target;
        if(target && target.classList.contains('tabheader__item')){
            tabs.forEach((item, i) => {
                if(target == item) {
                    hideTab();
                    showTabs(i);
                } 
            });
        }
    });



    // логика таймера, получаетдату преобразует  его в переменные и отдает дальше 

    const deadline = '2021-06-14';

    function getTimeRemaining(endTime){
        const t = Date.parse(endTime) - Date.parse(new Date()),
            days = Math.floor(t / (1000 * 60 * 60 * 24)),
            hours = Math.floor(t / (1000 * 60 * 60) % 24),
            minutes = Math.floor(t / (1000 * 60) % 60),
            seconds = Math.floor(t / 1000 % 60);
        
            return{
                'total': t, 
                'days': days,
                'hours': hours,
                'minutes': minutes,
                'seconds': seconds
            };   
    }
    //добавляет 0 к числу если оно меньше 10
    function getZero(num){
        if(num >= 0 && num <10 ){
            return `0${num}`;
        } else {
            return num;
        }
    }
    // работа с селектором таймера, внутри функция по обновлению 
    function setClock(selector, endTime){
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval= setInterval(updateClock, 1000);
        updateClock();
    // функция для обновления таймера
        function updateClock(){
            const t = getTimeRemaining(endTime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);
            if(t.total <= 0){
                clearInterval(timeInterval);
            }
        }
    }


    setClock('.timer', deadline);



    // реализация модального окна "связаться с нами"

    const    modalWind = document.querySelector('.modal'),
            modalBtn = document.querySelectorAll('[Data-modal]');


    //реальзация открытия окна
    function openModal(){
        modalWind.classList.add('show');
        modalWind.classList.remove('hide');
        document.body.style.overflow = "hidden";
        clearInterval(modalTimerId);
    }
    //реализация закрытия окна
    function closeModal(){
        modalWind.classList.remove('show');
        modalWind.classList.add('hide');
        document.body.style.overflow = "";
    }

    //вешаем обработчик событий на кнопку открытия окна
    modalBtn.forEach(item => {
        item.addEventListener('click', () => {
        openModal();
        });
    });

    //реализуем закрытие окна при нажатии сбоку от окна
    modalWind.addEventListener('click', (e)=>{
        if(e.target && e.target === modalWind || e.target.classList.contains('modal__close')){
            closeModal();
        }
    });
    // вешаем на документ обработчик собыйтий (нажатий на клавиатуру) для закрытия на esc
    document.addEventListener('keydown', (event) => {
        if(event.code === 'Escape' && modalWind.classList.contains('show')){
            closeModal();
        } 
    });

    //вешаем обработчик событий на кнопку закрытия окна 
    // таймер для открытия модального окна через время
    const modalTimerId = setTimeout(openModal, 60000);


    // еслил мы прокрутили страницу до конца то открываем окно
    function showModalByScroll(){
        if(window.pageYOffset + document.documentElement.clientHeight>= document.documentElement.scrollHeight){
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);



    // отправка информации на сервер формы
    // получаем наши формы
    const forms = document.querySelectorAll('form');

// просто текстовая информация, используется для отображения работы
    const message = {
        loading:'img/form/spinner.svg',
        success:'спасибо мы скоро с вами свяжимся',
        failure:'что то пошло не так...',
    };
    // подключаем наши формы
    forms.forEach(item  => {
        postData(item);
    });
// основная функция
    function postData(form){

        // обработчик событий при нажатии на кнопку btn
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            // нужно для отображения информации типа (загрузка, успешно и тд)
            let statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
            display: block;
            margin: 0 auto;
            `;
            form.append(statusMessage);
            // создаем сам запрос
            const request = new XMLHttpRequest(); 
            request.open('POST', 'server.php');

            // без jsona удалить 
            request.setRequestHeader('Content-type', 'multipart/form-data');
            const formData = new FormData(form);

            const object ={};
            formData.forEach(function(value, key){
                object[key]= value;
            });

            const json = JSON.stringify(object);
            request.send(json);

            // обработчик на запрос(что бы узнать когда все выполнилось)
            request.addEventListener('load', () => {
                if(request.status === 200){

                    // выводим информацию ЭХО (то что ушло на сервер)
                    console.log(request.response);
                    showThanksModal(message.success);

                    // отчищаем формы от информации
                    form.reset();
                    
                    statusMessage.remove();
                } else{

                    // если ошибка
                    showThanksModal(message.failure);
                }
            });
        });
    }
// функция для реализации всплывающего окна
    function showThanksModal(message){
        // получаем окно 
        const prevModalDialog = document.querySelector('.modal__dialog');
        // скрываем окно 
        prevModalDialog.classList.add('hide');
        // // открываем окно
        openModal();
        // создаем новое окно без инпутов
        const thanksModal = document.createElement('div');
        // присваиваем окну классы 
        thanksModal.classList.add('modal__dialog');
        // структура окна 
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>×</div>
                <div class="modal_title" data-close>${message}</div>
            </div>
        `;
        // вставляем наше созданно е окно в модал
        document.querySelector('.modal').append(thanksModal);
        // удаляем окно через время
        setTimeout(() =>{
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal();
            
        }, 3000);
    }


    


});