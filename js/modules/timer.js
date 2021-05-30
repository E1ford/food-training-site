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