import noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';
var sliderCost = document.getElementById('slider_cost');
var sliderArea = document.getElementById('slider_area');

export const createSliderCost = (minStartCost, maxStartCost) => {
return noUiSlider.create(sliderCost, {
        start: [minStartCost, maxStartCost],
        connect: true,
        step: 500000,
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
            step: 20,
            range: {
                'min': 0,
                'max': 100
            }
        });   
    }