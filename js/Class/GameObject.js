class GameObject
{
    constructor(name, height, width, field, player)
    {
        this.player = player;
        this.field =  field.element;
        this.height = height;
        this.width = width;
        this.element = document.createElement("div");
        this.field.appendChild(this.element);
        this.element.classList.add(name);
        this.random = Math.round(Math.random() * (parseInt(this.field.style.width) - parseInt(this.width)));
        this.element.style.width = width + 'px';
        this.element.style.height = height + 'px';
        this.element.style.position = "absolute";
        this.element.style.top = 0 + 'px';
        this.element.style.left = this.random + 'px';
        this.randomImage();
        this.isRemoved = false;
        this.isPicked = false;

        this.create();
    }

    create()
    {
        setInterval(function () 
        {
            let temp = parseInt(this.element.style.top) + 5;
            this.element.style.top = temp + "px";

            if ((((parseInt(this.player.element.style.left) + parseInt(this.player.element.style.width)) > parseInt(this.element.style.left)) && (parseInt(this.player.element.style.left) < (parseInt(this.element.style.left) + parseInt(this.element.style.width)))) && (((parseInt(this.player.element.style.top) + parseInt(this.player.element.style.height)) > parseInt(this.element.style.top)) && (parseInt(this.player.element.style.top) < (parseInt(this.element.style.top) + parseInt(this.element.style.height)))))
            {
                if (this.isRemoved == false)
                {
                    this.isRemoved = true;
                    this.player.catch = this.player.catch + 1;
                    this.element.remove();

                    let catchAudio = new Audio('./audio/catch1.mp3');
                    catchAudio.play();
                }
            }
            
            if ((parseInt(this.element.style.top) + parseInt(this.element.style.height)/2) >= parseInt(this.field.style.height))
            {
                if (this.isRemoved == false)
                {
                    this.isRemoved = true;
                    this.player.miss = this.player.miss + 1;
                    this.element.remove();

                    this.missAudioRandom = Math.round(Math.random());
                    let missAudio;
                    if (this.missAudioRandom == 0) { missAudio = new Audio('./audio/miss1.mp3'); }
                    if (this.missAudioRandom == 1) { missAudio = new Audio('./audio/miss2.mp3'); }
                    missAudio.play();
                }
            }
        }.bind(this), 1000/60);
    }

    randomImage()
    {
        let randomNumber = Math.round(Math.random() * 2);
        console.log(randomNumber);
        if (randomNumber == 0) { this.element.style.backgroundImage = 'url("./img/baltika3.png")'; }
        if (randomNumber == 1) { this.element.style.backgroundImage = 'url("./img/baltika7.png")'; }
        if (randomNumber == 2) { this.element.style.backgroundImage = 'url("./img/baltika9.png")'; }
    }
}