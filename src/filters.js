export const createFilter = (globalFilter) => {

    let params = '';
    Object.keys(globalFilter.room).forEach((key) => {
        globalFilter.room[key] ? params += `room=${key}&` : params
    })

    params += `cost_gte=${globalFilter.cost[0]}&cost_lte=${globalFilter.cost[1]}&`
    params += `area_gte=${globalFilter.area[0]}&area_lte=${globalFilter.area[1]}&`

    return params;
}