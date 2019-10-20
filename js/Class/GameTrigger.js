class GameTrigger 
{
    constructor(name, player, field, height, width, top, left, img, pickable, type) 
    {
        this.name = name;
        this.field = field.element;
        this.player = player;
        this.height = height;
        this.width = width;
        this.element = document.createElement("div");
        this.field.appendChild(this.element);
        this.element.classList.add(name);
        this.element = document.querySelector('.' + this.name);
        this.element.style.position = "absolute";
        this.element.style.backgroundImage = 'url("'+img+'")';
        this.element.style.height = this.height + 'px';
        this.element.style.width = this.width + 'px';
        this.element.style.top = top + 'px';
        this.element.style.left = left + 'px';
        this.inTrigger = false;
        this.wasInTrigger = false;
        this.element.style.backgroundImage = 'url("'+img+'")';
        this.type = 'trigger';
        this.type = type;

        this.isPickable = false;
        this.isPickable = pickable;
        this.isPicked = false;
        // Проверяет, находится ли игрок в триггере.
        setInterval(function () 
        {
            if ((((parseInt(this.player.element.style.left) + parseInt(this.player.element.style.width)) > parseInt(this.element.style.left)) && (parseInt(this.player.element.style.left) < (parseInt(this.element.style.left) + parseInt(this.element.style.width)))) && (((parseInt(this.player.element.style.top) + parseInt(this.player.element.style.height)) > parseInt(this.element.style.top)) && (parseInt(this.player.element.style.top) < (parseInt(this.element.style.top) + parseInt(this.element.style.height)))))
            {
                this.inTrigger = true;
                
                if (this.isPickable == true && this.isPicked == false)
                {
                    if (this.type == 'ring')
                    {
                        this.element.style.backgroundImage = 'unset';
                        player.playVfx(this.element, 400, './img/objectRingVfx.gif');
                        let audioRing = new Audio('./audio/objectRing.wav');
                        audioRing.play();
                        this.player.rings += 1;
                        player.updateCounters();
                        this.isPicked = true;
                        setTimeout(() => { this.element.remove(); }, 400);
                    }
                }
            }
            else 
            {
                this.inTrigger = false;
            }
        }.bind(this), 1000/60);
    }
}