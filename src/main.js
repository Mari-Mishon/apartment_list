import '/public/style/main.css';
import noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';
import apartmentList from './templates/apartment_list.hbs';
import {createElement, render} from './render.js'

// document.addEventListener("DOMContentLoaded", () => {
	let template = apartmentList({
		title: "Чебурашка"
	});
  let DOMElement = createElement(template)
	render(DOMElement)
// });


var slider = document.getElementById('slider');
// const upBtn = document.querySelector(`.up_btn`);
var data = fetch("/api/data.json").then(async (response) => console.log(await response.json()))
noUiSlider.create(slider, {
    start: [20, 80],
    connect: true,
    range: {
        'min': 0,
        'max': 100
    }
});



