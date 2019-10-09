class GamePlayer
{
    constructor(id, height, width, field, img)
    {
        this.field =  field.element;
        this.height = height;
        this.width = width;
        if (!document.querySelector(`#${id}`)) { this.field.innerHTML += `<div id="${ id }"></div>`; }
        this.element = document.querySelector(`#${id}`);
        this.element.style.width = width + 'px';
        this.element.style.height = height + 'px';
        this.element.style.position = "absolute";
        this.element.style.top = (field.height - this.height) + 'px';
        this.element.style.left = (field.width / 2 - this.width) + 'px';
        this.element.style.backgroundImage = 'url("'+img+'")';

        this.miss = 0;
        this.catch = 0;

        this.keyboardControl();

        this.initDebug();
    }

    move(value)
    {
        if (!((parseInt(this.element.style.left) + parseInt(value)) > (parseInt(this.field.style.width) - parseInt(this.element.style.width)))) 
        {
            let counter = 0;
            let move = setInterval(function () 
            {
                if (counter == Math.abs(value)) 
                {
                    clearInterval(move);
                } 
                else 
                {
                    let temp;
                    counter++;
                    if (value >= 0) 
                    {
                        temp = parseInt(this.element.style.left) + 1;
                    } 
                    else 
                    {
                        temp = parseInt(this.element.style.left) - 1;
                    }
                    if (temp > 0) 
                    {
                        this.element.style.left = temp + "px";
                    }
                }

                if ((parseInt(this.element.style.left) + parseInt(this.width)) > parseInt(this.field.style.width))
                {
                    let temp = (parseInt(this.field.style.width) - parseInt(this.element.style.width));
                    this.element.style.left = temp + 'px';
                }
            }.bind(this), 1);
        }
    }

    keyboardControl()
    {
        document.addEventListener('keypress', function (event) 
        {
            if (event.code == 'KeyA') 
            {
                this.move(-23);
            }
            if (event.code == 'KeyD') 
            {
                this.move(23);
            }
        }.bind(this));
    }

    initDebug()
    {
        this.debug = document.createElement("div");
        this.field.appendChild(this.debug);
        this.debug.classList.add('debug');
        this.debugText = document.createElement("p");
        document.querySelector('.debug').appendChild(this.debugText);
        this.debugText = document.createElement("p");
        document.querySelector('.debug').appendChild(this.debugText);

        setInterval(function()
        {
            document.querySelector(".debug p:nth-child(1)").textContent = `Miss: ${this.miss}`;
            document.querySelector(".debug p:nth-child(2)").textContent = `Catch: ${this.catch}`;
        }.bind(this), 100);
    }
}