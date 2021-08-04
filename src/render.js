import apartment from "./templates/apartment.hbs"
import tooltips from "./templates/tooltips.hbs"

export const renderSliderCostTitle = (from, to) => {
    let node = document.querySelector('.filter__title__cost');
    let cloneNode = node.cloneNode(false);
    let div = document.createElement('div');
    div.className = 'tooltips__filter'
    div.innerHTML = tooltips({from: from, to: to});
    cloneNode.append(div)
    node.parentNode.replaceChild(cloneNode, node)
}

export const renderSliderAreaTitle = (from, to) => {
    let node = document.querySelector('.filter__title__area');
    let cloneNode = node.cloneNode(false);
    let div = document.createElement('div');
    div.className = 'tooltips__filter'
    div.innerHTML = tooltips({from: from, to: to});
    cloneNode.append(div)
    node.parentNode.replaceChild(cloneNode, node)
}

const renderFlat = (flat, parentNode) => {
    let div = document.createElement('div');
    div.innerHTML = apartment(flat);
    div.className = "apartments__wrap";
    parentNode.append(div)
}

export const renderFlats = (flats) => {
    let node = document.querySelector('.table__body')
    flats.forEach(flat => {
        renderFlat(flat, node);
    });
}

export const replaceFlats = (flats) => {
    let node = document.querySelector('.table__body');
    let cloneNode = node.cloneNode(false);
    flats.forEach(flat => {
        renderFlat(flat, cloneNode);
    });
    node.parentNode.replaceChild(cloneNode, node)
}



