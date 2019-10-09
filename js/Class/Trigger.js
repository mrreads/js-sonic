class Trigger 
{
    constructor(id, player, height, width, top, left, func, message) 
    {
        this.id = id;
        this.player = document.querySelector('#' + player);
        this.height = height;
        this.width = width;
        this.element = document.querySelector('#' + this.id);
        this.element.style.height = this.height + 'px';
        this.element.style.width = this.width + 'px';
        this.element.style.top = top + 'px';
        this.element.style.left = left + 'px';
        this.inTrigger = false;
        this.triggerName = id;
        this.func = func;
        this.isPicked = false;
        this.wasInTrigger = false;
        this.triggerForMessage = false;
        this.triggerForMessage = message;

        // Проверяет, находится ли игрок в триггере.
        setInterval(function () 
        {
            
            if ((((parseInt(this.player.style.left) + parseInt(this.player.style.width)) > parseInt(this.element.style.left)) && (parseInt(this.player.style.left) < (parseInt(this.element.style.left) + parseInt(this.element.style.width)))) && (((parseInt(this.player.style.top) + parseInt(this.player.style.height)) > parseInt(this.element.style.top)) && (parseInt(this.player.style.top) < (parseInt(this.element.style.top) + parseInt(this.element.style.height)))))
            {
                this.inTrigger = true;
                this.func();
                if (this.triggerForMessage == true) { this.wasInTrigger = true; }
            }
            else 
            {
                if (this.triggerName == id)
                {
                    this.inTrigger = false;
                }
                
                if (this.wasInTrigger == true)
                {
                    if (this.player.querySelector('.message'))
                    {
                        document.querySelector('.message').remove();
                    }
                }
            }
        }.bind(this), 1000/60);
    }
}