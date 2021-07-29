import '/public/style/main.css';
import { renderFlats } from './render.js'


import noUiSlider from 'nouislider';
import wNumb from 'wnumb'
import 'nouislider/dist/nouislider.css';
var rublePrefixFormat = wNumb({ prefix: '₽', decimals: 0 })
var slider_cost = document.getElementById('slider_cost');


function filterCost(flats, cost) {
  return flats.filter(flat => {
    return flat.cost >= Number(cost[0]) && flat.cost <= Number(cost[1])
  })
}
const createSlider = (minCost, maxCost) => {

  return noUiSlider.create(slider_cost, {
    start: [minCost, maxCost],
    connect: true,
    tooltips: [rublePrefixFormat, rublePrefixFormat],
    step: 100000,
    // pips: {
    //   mode: 'steps',
    //   density: 5,
    //   format: rublePrefixFormat
    // },
    range: {
      'min': minCost,
      'max': maxCost
    }
  });
}

fetch("/api/data.json").then(response => response.json()).then(({ data }) => {
  renderFlats(data)
})