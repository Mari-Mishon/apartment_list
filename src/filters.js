export const filterCost = (flats, range) => {
    return flats.filter(flat => { 
        return flat.cost>= range[0]  && flat.cost <= range[1]
})
}

export const filterArea = (flats, range) => {
    return flats.filter(flat => { 
        return flat.cost>= range[0]  && flat.area <= range[1]
})
}