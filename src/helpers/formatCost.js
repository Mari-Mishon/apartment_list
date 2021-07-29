export default (float) => {
    return float.toString().replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')
}