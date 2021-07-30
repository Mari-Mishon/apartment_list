import apartment from "./templates/apartment.hbs"

const renderFlat = (flat, parentNode) => {
    let tr = document.createElement('tr');
    tr.innerHTML = apartment(flat);
    tr.className = "flat-list"; 
    parentNode.append(tr)
}

export const renderFlats = (flats) => {
    let node = document.querySelector('.table-body')
    flats.forEach(flat => {
        renderFlat(flat, node);
    });
}

export const replaceFlats = (flats) => {
  let node = document.querySelector('.table-body');
  let cloneNode = node.cloneNode(false);
  flats.forEach(flat => {
    renderFlat(flat, cloneNode);
});
    node.parentNode.replaceChild(cloneNode, node)
}



