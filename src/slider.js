import noUiSlider from 'nouislider';
import wNumb from 'wnumb'
import 'nouislider/dist/nouislider.css';
var fromPrefixFormat = wNumb({ thousand:' ', decimals: 0, prefix:'от '})
var toPrefixFormat = wNumb({ thousand:' ', decimals: 0, prefix:'до '})
var sliderCost = document.getElementById('slider_cost');
var sliderArea = document.getElementById('slider_area');

export const createSliderCost = (minStartCost, maxStartCost) => {
return noUiSlider.create(sliderCost, {
        start: [minStartCost, maxStartCost],
        connect: true,
        tooltips: [fromPrefixFormat, toPrefixFormat],
        step: 10000000,
        range: {
            'min': 0,
            'max': 40000000
        }
    });   
}

export const createSliderArea = (minStartArea, maxStartArea) => {
    return noUiSlider.create(sliderArea, {
            start: [minStartArea, maxStartArea],
            connect: true,
            tooltips: [fromPrefixFormat, toPrefixFormat],
            step: 20,
            range: {
                'min': 0,
                'max': 100
            }
        });   
    }