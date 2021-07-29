import apartment from "./templates/apartment.hbs"

const renderFlat = (flat) => {
    let tr = document.createElement('tr');
    tr.innerHTML = apartment(flat);
    tr.className = "flat-list"; 
    document.querySelector('.table-body').append(tr)
}

const FLAT_COUNT = 20;
const INIT_COUNT = 2;
export const renderFlats = (flats) => {
    flats.slice(0, INIT_COUNT).forEach(flat => {
        renderFlat(flat);
    });
}