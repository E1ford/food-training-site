'use strict';

window.addEventListener('DOMContentLoaded', () => {
    const tabs = require('./modules/tabs'),
         calc = require('./modules/calc'),
         timer = require('./modules/timer'),
         slider = require('./modules/slider'),
         modal = require('./modules/modal'),
         forms = require('./modules/forms'),
         cards = require('./modules/cards');


    tabs();
    calc();
    timer();
    slider();
    modal();
    forms();
    cards();

});









