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
        

        //(name, player, field, height, width, top, left, img, zIndex)
        let ground1 = new GameCollision('ground1', player, field, 250, 4150, 600, 0, './img/ground1.png');
        let ground2 = new GameCollision('ground2', player, field, 250, 550, 410, 400, './img/ground1.png', '-1');
        let ground3 = new GameCollision('ground3', player, field, 250, 350, 410, 1550, './img/ground1.png', '-1');
        let ground4 = new GameCollision('ground4', player, field, 250, 350, 410, 2150, './img/ground1.png', '-1');
        let ground5 = new GameCollision('ground5', player, field, 250, 350, 410, 3450, './img/ground1.png', '-1');

        let spring1 = new GameCollision('spring1', player, field, 50, 100, 562, 951, './img/objectSpring.png', '-1', 'spring');
        let spring2 = new GameCollision('spring2', player, field, 50, 100, 562, 1300, './img/objectSpring.png', '-1', 'spring');

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

