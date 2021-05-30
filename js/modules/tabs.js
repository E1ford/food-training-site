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