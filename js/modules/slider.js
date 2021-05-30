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