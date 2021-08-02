require('/public/style/main.css');
import { renderFlats, replaceFlats } from './render.js'
import { createSliderCost, createSliderArea } from './slider.js';

const ADD_FLAT_COUNT = 20;
const INIT_COUNT = 5;
let currentFlatCount = 0;
let moreFlatsButton = document.querySelector('.more_button');

fetch("/api/data.json").then(response => response.json()).then(({ data }) => {
  let initFlats = data.slice(currentFlatCount, INIT_COUNT)
  renderFlats(initFlats);
  currentFlatCount += INIT_COUNT;

  const minStartCost = Math.min(...data.map(flat => {
    return flat.cost
  }));

  const maxStartCost = Math.max(...data.map(flat => {
    return flat.cost
  }))

  // const minStartArea = Math.min(...data.map(flat => {
  //   return flat.area
  // }));

  // const maxStartArea = Math.max(...data.map(flat => {
  //   return flat.area
  // }))


  createSliderCost(minStartCost, maxStartCost).on('change', (a, b, range) => {
    console.log(range[1])

    fetch(`/api/from=${range[0]}&to=${range[1]}.json`).then(response => response.json()).then(({ data }) => {
      replaceFlats(data);
    })

    //   if (11000000>=range[0] && 20000000<=range[1]) {
    //     fetch(`/api/tenTwentyMillionCost.json`).then(response => response.json()).then(({data}) => {
    //       replaceFlats(data);
    //   })
    // }

    // if (21000000>=range[0] && 40000000<range[1]) {
    //   console.log("not data!")
    // }
  })

  // createSliderArea(minStartArea, maxStartArea).on('change', (a, b, range) => {
  //   let renderedFlats = data.slice(0, currentFlatCount);
  //   let filteredFlats = filterArea(renderedFlats, range);
  //   replaceFlats(filteredFlats)
  // });

  const roomButtons = document.querySelectorAll('.rooms_btn');
  roomButtons.forEach((element) => {
    element.addEventListener('click', (event) => {
      let id = event.target.id;
      fetch(`/api/${id}Filter.json`).then(response => response.json()).then(({ data }) => {
        replaceFlats(data);
      })
    });
  });

  moreFlatsButton.addEventListener('click', () => {
    let moreFlats = data.slice(currentFlatCount, currentFlatCount + ADD_FLAT_COUNT)
    renderFlats(moreFlats);
    currentFlatCount += moreFlats.length;

    if (currentFlatCount >= data.length) {
      moreFlatsButton.style.display = 'none';
    }
  });

  const resetFilterButton = document.querySelector('.reset');
  resetFilterButton.addEventListener('click', () => {
    replaceFlats(initFlats);
  });
})

const upButton = document.querySelector(".up_btn")
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




