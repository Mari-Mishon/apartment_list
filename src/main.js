import '/public/style/main.css';
import { renderFlats, replaceFlats } from './render.js'
import { createSliderCost, createSliderArea } from './slider.js';
import { filterCost, filterArea } from './filters.js';

const ADD_FLAT_COUNT = 20;
const INIT_COUNT = 2;
let currentFlatCount = 0;
let moreFlatsButton = document.querySelector('.more-button');


fetch("/api/data.json").then(response => response.json()).then(({ data }) => {
  let initFlats = data.slice(currentFlatCount, INIT_COUNT)
  renderFlats(initFlats);
  currentFlatCount += INIT_COUNT;

  createSliderCost().on('change', (a,b, range)=> {
    let renderedFlats = data.slice(0,currentFlatCount);
    let filteredFlats = filterCost(renderedFlats, range);
    replaceFlats(filteredFlats)
  });

  createSliderArea().on('change', (a,b, range)=> {
    let renderedFlats = data.slice(0,currentFlatCount);
    let filteredFlats = filterArea(renderedFlats, range);
    replaceFlats(filteredFlats)
  });

  moreFlatsButton.addEventListener('click', () => {
    let moreFlats = data.slice(currentFlatCount, currentFlatCount + ADD_FLAT_COUNT)
    renderFlats(moreFlats);
    currentFlatCount += moreFlats.length;

    if (currentFlatCount >= data.length) {
      moreFlatsButton.style.display = 'none';
    }
  })
})




