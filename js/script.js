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
        })
    }
})



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
        modalBtn = document.querySelectorAll('[Data-modal]'),
        modalClose = document.querySelector('.modal__close');


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
    if(e.target && e.target === modalWind){
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
modalClose.addEventListener('click', () => {
    closeModal();
});
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


});

