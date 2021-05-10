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



//таймер

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

function setClock(selector, endTime){
    const timer = document.querySelector(selector),
        days = timer.querySelector('#days'),
        hours = timer.querySelector('#hours'),
        minutes = timer.querySelector('#minutes'),
        seconds = timer.querySelector('#seconds'),
        timeInterval= setInterval(updateClock, 1000);
    updateClock();

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





});

