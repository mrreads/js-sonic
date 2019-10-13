class GameArena
{
    constructor(id, height, width, img) 
    {
        this.height = height;
        this.width = width;
        if (!document.querySelector(`#${id}`)) { document.body.innerHTML = `<div id="${ id }"></div>`; }
        this.element = document.querySelector(`#${id}`);
        this.element.style.width = width + 'px';
        this.element.style.height = height + 'px';
        this.element.style.position = "relative";
        this.element.style.backgroundImage = 'url("'+img+'")';
        this.element.style.zIndex = '-5';
        this.element.style.backgroundSize = 'auto 100%';
        this.element.style.backgroundPosition = '1px center';
    }
}