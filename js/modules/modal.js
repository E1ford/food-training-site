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