export const createElement = (template) => {
    const newElement = document.createElement(`div`);
    newElement.innerHTML = template;
    return newElement.firstElementChild;
};

export const render = (child) => {
    document.body.querySelector("#app").prepend(child);
};
