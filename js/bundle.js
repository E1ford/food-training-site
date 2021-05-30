/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((module) => {

function calc(){

}
module.exports = calc;

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((module) => {

function cards(){
    // получение данныхэ меню
        // const getResource = async(url, ) => {
        //     const res = await fetch(url);
        //     // если ошибка
        //     if (!res.ok){
        //         throw new Error(`could not fetch ${url}, status ${res.status}`);
        //     }
        // // преобразовываем данные из json
        //     return await res.json();
        // };
        
    // получение данных от сервера  и реализация на их основе карточек
    axios.get('http://localhost:3000/menu')
    .then(data => {
        data.data.forEach(({img, altimg, title, descr, price}) => {    
        new Menu(img, altimg, title, descr, price, '.menu .container').insert();
        });
    });
    // класс меню
    class Menu {

        constructor(src, alt, heading, text, price, parentsEl, ...rest ){
            this.src = src;
            this.alt = alt;
            this.heading = heading;
            this.text = text;
            this.price = price;
            this.parentsEl = parentsEl;
            this.classes = rest;
        }
        insert(){
            const divInsert = document.createElement('div');
            if(this.classes.length === 0){
                this.classes = 'menu__item';
            } else {
                this.classes.forEach(className => divInsert.classList.add(className));
            }
            
            divInsert.innerHTML = `<div class="menu__item">
                        <img src=${this.src} alt=${this.alt}>
                        <h3 class="menu__item-subtitle">${this.heading}</h3>
                        <div class="menu__item-descr">${this.text}</div>
                        <div class="menu__item-divider"></div>
                        <div class="menu__item-price">
                            <div class="menu__item-cost">Цена:</div>
                            <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                        </div>
                    </div>
            `;

            document.querySelector(`${this.parentsEl}`).append(divInsert);
            
        }
    }

}
module.exports = cards;

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((module) => {

function forms(){
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
        bindPostData(item);
    });

    const postData = async(url, data) => {
        const res = await fetch(url, {
            method:'POST', 
            headers:{
                'Content-type': 'application/json'
            },
            body: data
    });
        return await res.json();
    };
    // основная функция
    function bindPostData(form){

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
            let formData = new FormData(form);

             const json = JSON.stringify(Object.fromEntries(formData.entries()));

          
            // создаем сам запрос
            postData('http://localhost:3000/requests', json)
            .then(data => {
                    console.log(data);
                    showThanksModal(message.success);
                    
                    statusMessage.remove();
            }).catch(()=>{
                    showThanksModal(message.failure);
            }).finally(()=>
                    form.reset());
            
           
        });
    }

}
module.exports = forms;

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((module) => {

function modal(){
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


    
}
module.exports = modal;

/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((module) => {

function slider(){
    // слайдер 
    const slides = document.querySelectorAll('.offer__slide'),
        prev = document.querySelector('.offer__slider-prev'),
        next = document.querySelector('.offer__slider-next'),
        total = document.querySelector('#total'),
        current = document.querySelector('#current'),
        slidesWrapper = document.querySelector('.offer__slider-wrapper'),
        slideField = document.querySelector('.offer__slider-inner'),
        width = window.getComputedStyle(slidesWrapper).width;

// счетчик
    let slideIndex = 1;
    let offset = 0;

// добавляет 0 если <10
    if(slides.length < 10){
        total.textContent = `0${slides.length}`;
        current.textContent = `0${slideIndex}`;
    }else{
        total.textContent = slides.length;
        current.textContent = slideIndex;
    }
    slideField.style.width = 100 * slides.length + '%';
    slideField.style.display = 'flex';
    slideField.style.transition = '0.5s all';


    slidesWrapper.style.overflow = 'hidden';

    slides.forEach(slide => {
        slide.style.width = width;
    });

    next.addEventListener('click', ()=> {
        if(offset == +width.slice(0, width.length -2) * (slides.length - 1)){
            offset = 0;
        }else{
            offset += +width.slice(0, width.length -2 );
        }
        slideField.style.transform = `translateX(-${offset}px)`;


        if(slideIndex == slides.length){
            slideIndex = 1; 
        }else{
            slideIndex++;
        }


        if(slides.length < 10){
            current.textContent = `0${slideIndex}`;
        }else{
            current.textContent = slideIndex;
        }
    });


    prev.addEventListener('click', ()=> {
        if(offset == 0){
            offset = +width.slice(0, width.length - 2) * (slides.length - 1);
        }else{
            offset -= +width.slice(0, width.length - 2 );
        }

// если на первом слайде и жмет назад
        if(slideIndex == 1){
            slideIndex = slides.length; 
        }else{
            slideIndex--;
        }

// добавляет 0 если число <10
        if(slides.length < 10){
            current.textContent = `0${slideIndex}`;
        }else{
            current.textContent = slideIndex;
        }
//двигает слайд 
        slideField.style.transform = `translateX(-${offset}px)`;
        
    });
}
module.exports = slider;

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((module) => {

function tabs() {

// 1шаг. создать переменные  !первая переменная это каждый раздел(кнопка) на табе !вторая переменная это информация которая появляется на этом слайде
// !третья переменная это родитель всех табов(кнопок)



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
}


module.exports = tabs;

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((module) => {

function timer(){
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
}
module.exports = timer;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/


window.addEventListener('DOMContentLoaded', () => {
    const tabs = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js"),
         calc = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js"),
         timer = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js"),
         slider = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js"),
         modal = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js"),
         forms = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js"),
         cards = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");


    tabs();
    calc();
    timer();
    slider();
    modal();
    forms();
    cards();

});










})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map