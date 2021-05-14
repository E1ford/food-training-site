
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
        } else{
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

new Menu(
    "img/tabs/vegy.jpg",
    'vegy',
    'Меню "Фитнес"',
    'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    229,
    '.menu .container',
    'menu__item'
    ).insert();

new Menu(
    "img/tabs/elite.jpg",
    'elite',
    'Меню “Премиум”',
    'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное менюбез похода в ресторан!',
    550,
    '.menu .container',
    'menu__item'
    ).insert();


new Menu(
    "img/tabs/post.jpg",
    'post',
    'Меню "Постное”',
    'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки,правильное количество белков за счет тофу и импортных вегетарианских стейков.',
    550,
    '.menu .container',
    'menu__item'
    ).insert();

