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