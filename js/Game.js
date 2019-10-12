class Game
{
    constructor(height, width, img) 
    {
        this.height = height;
        this.width = width;
        if (!document.querySelector(`#menu`)) { document.body.innerHTML = `<div id="menu"></div>`; }
        this.element = document.querySelector(`#menu`);
        this.element.style.width = width + 'px';
        this.element.style.height = height + 'px';
        this.element.style.position = "relative";
        this.element.style.backgroundImage = 'url("'+img+'")';

        this.logo = document.createElement("p");
        this.element.appendChild(this.logo);
        this.start = document.createElement("p");
        this.element.appendChild(this.start);
        this.logo.textContent = `SONIC the hedgehod`;
        this.start.textContent = `click start`;
        this.start.addEventListener('click', function()
        {
            // let audio = new Audio('./audio/start.mp3');
            // audio.play();
            this.startGame();
        }.bind(this));
    }

    startGame()
    {
        let field = new GameArena('field', this.height, this.width, './img/background1.png');
        let player = new GamePlayer('player', 130, 130, 300, 100, field, './img/sonicIdle.png');
        


        let ground1 = new GameCollision('ground1', player, field, 250, 2150, 600, 0, './img/ground1.png');
        let ground2 = new GameCollision('ground2', player, field, 250, 550, 410, 350, './img/ground1.png', '-1');

        let temp = 50;
        for (let i = 0; i < 5; i++)
        {
            window['ring' + i] = new GameTrigger('ring' + i, player, field, 50, 50, 300, 500 + temp, './img/objectRing.gif', true);
            i++;
            temp = temp + 100;
        }
    }
}

let game = new Game(720, 960, './img/menu1.jpg');

