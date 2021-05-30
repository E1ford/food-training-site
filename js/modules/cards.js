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