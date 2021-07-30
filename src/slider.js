import noUiSlider from 'nouislider';
import wNumb from 'wnumb'
import 'nouislider/dist/nouislider.css';
var rubPrefixFormat = wNumb({ prefix: '₽', decimals: 0 })
var sliderCost = document.querySelector('.slider_cost');
var sliderArea = document.querySelector('.slider_area');

export const createSliderCost = () => {
return noUiSlider.create(sliderCost, {
        start: [5500000, 18900000],
        connect: true,
        tooltips: [rubPrefixFormat, rubPrefixFormat],
        step: 100000,
        range: {
            'min': 1000000,
            'max': 30000000
        }
    });   
}

export const createSliderArea = () => {
    return noUiSlider.create(sliderArea, {
            start: [33, 123],
            connect: true,
            tooltips: [rubPrefixFormat, rubPrefixFormat],
            step: 1,
            range: {
                'min': 0,
                'max': 300
            }
        });   
    }