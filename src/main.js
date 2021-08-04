require('/public/style/main.scss');
import { renderFlats, replaceFlats, renderSliderCostTitle, renderSliderAreaTitle } from './render.js'
import { createSliderCost, createSliderArea } from './slider.js';
import { createFilter } from './filters.js';
let sliderCost = document.getElementById('sliderCost');
let sliderArea = document.getElementById('sliderArea');

let globalFilter = {
  room: {
    "1": false,
    "2": false,
    "3": false,
    "4": false,
  },
  area: [],
  cost: []
}

const ADD_FLAT_COUNT = 20;
const INIT_COUNT = 5;
let currentFlatCount = 0;
let moreFlatsButton = document.querySelector('.more__button');
const roomButtons = document.querySelectorAll('.rooms__btn');

const prepareFlats = (flatsData, currentFlatCount) => {
  currentFlatCount = 0;
  let flatsToRender = flatsData.slice(currentFlatCount, INIT_COUNT)
  currentFlatCount += INIT_COUNT;
  return flatsToRender;

}
const handleMoreButton = (moreFlatsButton, currentFlatCount, flatsData) => {
  if (currentFlatCount >= flatsData.length) {
    moreFlatsButton.style.display = 'none';
  }
  if (currentFlatCount < flatsData.length) {
    if (moreFlatsButton.style.display === 'none') {
      moreFlatsButton.style.display = 'inline-block';
    }
  }
}

const initSliderCost = (flatsData, minStartCost, maxStartCost) => {
  createSliderCost(minStartCost, maxStartCost).on('change', (a, b, range) => {
    sliderCost.setAttribute('disabled', true)
    globalFilter.cost = range;
    renderSliderCostTitle(...range);

    fetch(`https://my-json-server.typicode.com/Mari-Mishon/apartment_list/data?${createFilter(globalFilter)}`).
      then(response => response.json()).then((data) => {
        flatsData = data.slice();
        let flatsToRender = prepareFlats(data, currentFlatCount)
        handleMoreButton(moreFlatsButton, currentFlatCount, flatsData)
        replaceFlats(flatsToRender);
      }).then(() => {
        sliderCost.removeAttribute('disabled', false)
      })
  })
  renderSliderCostTitle(minStartCost, maxStartCost);
}

const initSliderArea = (flatsData, minStartArea, maxStartArea) => {
  createSliderArea(minStartArea, maxStartArea).on('change', (a, b, range) => {
    sliderArea.setAttribute('disabled', true)
    globalFilter.area = range;
    renderSliderAreaTitle(...range)
    fetch(`https://my-json-server.typicode.com/Mari-Mishon/apartment_list/data?${createFilter(globalFilter)}`).
      then(response => response.json()).then((data) => {
        flatsData = data.slice();
        let flatsToRender = prepareFlats(data, currentFlatCount)
        handleMoreButton(moreFlatsButton, currentFlatCount, flatsData)
        replaceFlats(flatsToRender);
      }).then(() => {
        sliderArea.removeAttribute('disabled', false)
      })
  })
  renderSliderAreaTitle(minStartArea, maxStartArea);
}
const initFilterButtons = (flatsData) => {
  roomButtons.forEach((element) => {
    element.addEventListener('click', (event) => {
      let id = event.target.id;
      let room = document.getElementById(id)
      globalFilter.room[id] = !globalFilter.room[id]
      room.setAttribute('disabled', 'disabled')
      fetch(`https://my-json-server.typicode.com/Mari-Mishon/apartment_list/data?${createFilter(globalFilter)}`).
        then(response => response.json()).then((data) => {
          flatsData = data.slice();
          let flatsToRender = prepareFlats(data, currentFlatCount)
          handleMoreButton(moreFlatsButton, currentFlatCount, flatsData)
          replaceFlats(flatsToRender);
        }).then(() => {
          room.removeAttribute('disabled')
          room.setAttribute('enabled', true)

        })
    });
  });
}
const initMoreButton = (flatsData) => {
  moreFlatsButton.addEventListener('click', () => {
    let moreFlats = flatsData.slice(currentFlatCount, currentFlatCount + ADD_FLAT_COUNT)
    renderFlats(moreFlats);
    currentFlatCount += moreFlats.length;

    handleMoreButton(moreFlatsButton, currentFlatCount, flatsData)
  });
}

fetch("https://my-json-server.typicode.com/Mari-Mishon/apartment_list/data").then(response => response.json()).then((data) => {
  let initFlats = data.slice(currentFlatCount, INIT_COUNT)
  let flatsData = data.slice();
  const minStartCost = Math.min(...data.map(flat => {
    return flat.cost
  }));

  const maxStartCost = Math.max(...data.map(flat => {
    return flat.cost
  }))
  globalFilter.cost = [minStartCost, maxStartCost];

  const minStartArea = Math.min(...data.map(flat => {
    return flat.area
  }));

  const maxStartArea = Math.max(...data.map(flat => {
    return flat.area
  }))

  globalFilter.area = [minStartArea, maxStartArea];

  renderFlats(initFlats);
  currentFlatCount += INIT_COUNT;

  initSliderCost(flatsData, minStartCost, maxStartCost);
  initSliderArea(flatsData, minStartArea, maxStartArea);
  initFilterButtons(flatsData);
  initMoreButton(flatsData);

  const resetFilterButton = document.querySelector('.reset');
  resetFilterButton.addEventListener('click', () => {
    globalFilter = {
      room: {
        "1": false,
        "2": false,
        "3": false,
        "4": false,
      },
      area: [minStartArea, maxStartArea],
      cost: [minStartCost, maxStartCost]
    }
    sliderCost.noUiSlider.set([minStartCost, maxStartCost])
    sliderArea.noUiSlider.set([minStartArea, maxStartArea])

    replaceFlats(initFlats);
  });
})

const upButton = document.querySelector(".up__btn")
const smoothJumpUp = () => {
  if (document.body.scrollTop > 0 || document.documentElement.scrollTop > 0) {
    window.scrollBy(0, -50);
    setTimeout(smoothJumpUp, 20);
  }
  return false;
}
upButton.addEventListener('click', smoothJumpUp)


window.onscroll = function () {
  var scrolled = window.pageYOffset || document.documentElement.scrollTop;
  if (scrolled > 100) {
    upButton.style.display = 'block';
  } else {
    upButton.style.display = 'none';
  }
}




