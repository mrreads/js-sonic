class Game
{
    constructor(height, width) 
    {
        this.height = height;
        this.width = width;
        if (!document.querySelector(`#menu`)) { document.body.innerHTML = `<div id="menu"></div>`; }
        setTimeout(() => { let menuSegaAudio = new Audio('./audio/menuSega.mp3'); menuSegaAudio.play(); }, 2000);
        this.element = document.querySelector(`#menu`);
        this.element.style.margin = '0 auto';
        this.element.style.width = width + 'px';
        this.element.style.height = height + 'px';
        this.element.style.position = "relative";
        this.element.style.backgroundImage = 'url("./img/segaLogo.gif")';


        setTimeout(() => 
        {
            this.element.style.opacity = '0';
        }, 3500);

        
        setTimeout(() => 
        {
            this.element.style.backgroundPosition = '0%';
            this.backgroundAnimate = setInterval(() => { this.element.style.backgroundPosition = (parseInt(this.element.style.backgroundPosition) + 1) + '%'; }, 150);
            this.element.style.backgroundSize = 'cover';
            this.element.style.backgroundImage = 'url(./img/menuBackground.png)';
            
        }, 3700);

        setTimeout(() => 
        {
            this.element.style.opacity = '1';
            let menuTitleAudio = new Audio('./audio/menuMusic.mp3');
            menuTitleAudio.play();

            this.sonic = document.createElement("div");
            this.element.appendChild(this.sonic);
            this.sonic.style.opacity = '0';
            this.sonic.style.transition = '0.3s all';
            this.sonic.style.position = 'absolute';
            this.sonic.style.width = '100%';
            this.sonic.style.height = '455px';
            this.sonic.style.top = '85px';
            this.sonic.style.backgroundRepeat = 'no-repeat';
            this.sonic.style.backgroundImage = 'url(./img/menuSonic.gif)';

            this.start = document.createElement("div");
            this.element.appendChild(this.start);
            this.start.style.opacity = '0';
            this.start.style.transition = '0.3s all';
            this.start.style.position = 'absolute';
            this.start.style.width = '100%';
            this.start.style.height = '455px';
            this.start.style.top = '355px';
            this.start.style.backgroundSize = '61%';
            this.start.style.backgroundRepeat = 'no-repeat';
            this.start.style.backgroundImage = 'url(./img/menuPressStart.png)';

            setTimeout(() => 
            {
                this.sonic.style.opacity = '1';
            }, 500);

            setTimeout(() => 
            {
                this.start.style.opacity = '1';
                this.start.style.cursor = 'pointer';
                this.start.addEventListener('click', function()
                {
                    menuTitleAudio.pause();
                    this.Level_1();
                }.bind(this));
            }, 800);
        }, 3900);
    }

    levelPreview(text, act)
    {
        this.element.innerHTML = '';
        clearInterval(this.backgroundAnimate);
        this.element.style.backgroundImage = 'unset';
        this.element.style.backgroundColor = 'black';

        this.circle = document.createElement("div");
        this.element.appendChild(this.circle);
        this.circle.style.backgroundRepeat = 'no-repeat';
        this.circle.style.position = 'absolute';
        this.circle.style.height = '250px';
        this.circle.style.width = '250px';
        this.circle.style.top = '165px';
        this.circle.style.right = '-300px';
        this.circle.style.backgroundImage = 'url(./img/levelPreview.png)';

        let cirleAnimation = setInterval(() => {
            if (parseInt(this.circle.style.right) == 150)
            {
                clearInterval(cirleAnimation);
            }
            this.circle.style.right = (parseInt(this.circle.style.right) + 10) + 'px';
        }, 1);

        this.levelName = document.createElement("p");
        this.element.appendChild(this.levelName);
        this.levelName.style.position = 'absolute';
        this.levelName.style.color = 'white';
        this.levelName.style.fontSize = '100px';
        this.levelName.style.right = '-1500px';
        this.levelName.textContent = text.toUpperCase();
        this.levelName.style.top = '172px';

        let levelNameAnimation = setInterval(() => {
            if (parseInt(this.levelName.style.right) == 190)
            {
                clearInterval(levelNameAnimation);
            }
            this.levelName.style.right = (parseInt(this.levelName.style.right) + 10) + 'px';
        }, 1);

        this.levelZone = document.createElement("p");
        this.element.appendChild(this.levelZone);
        this.levelZone.style.position = 'absolute';
        this.levelZone.style.color = 'white';
        this.levelZone.style.fontSize = '100px';
        this.levelZone.style.top = '255px';
        this.levelZone.style.right = '-2000px';
        this.levelZone.textContent = 'ZONE';

        let levelZoneAnimation = setInterval(() => {
            if (parseInt(this.levelZone.style.right) == 280)
            {
                clearInterval(levelZoneAnimation);
            }
            this.levelZone.style.right = (parseInt(this.levelZone.style.right) + 10) + 'px';
        }, 1);

        this.levelAct = document.createElement("p");
        this.element.appendChild(this.levelAct);
        this.levelAct.style.position = 'absolute';
        this.levelAct.style.color = 'rgb(232, 163, 132)';
        this.levelAct.style.fontSize = '46px';
        this.levelAct.style.top = '345px';
        this.levelAct.style.right = '-2300px';
        this.levelAct.textContent = 'ACT';

        let levelActAnimation = setInterval(() => {
            if (parseInt(this.levelAct.style.right) == 300)
            {
                clearInterval(levelActAnimation);
            }
            this.levelAct.style.right = (parseInt(this.levelAct.style.right) + 10) + 'px';
        }, 1);

        this.levelActNumber = document.createElement("p");
        this.element.appendChild(this.levelActNumber);
        this.levelActNumber.style.position = 'absolute';
        this.levelActNumber.style.color = 'rgb(232, 163, 132)';
        this.levelActNumber.style.fontSize = '168px';
        this.levelActNumber.style.top = '250px';
        this.levelActNumber.style.left = '3600px';
        this.levelActNumber.textContent = act;

        let levelActNumberAnimation = setInterval(() => {
            if (parseInt(this.levelActNumber.style.left) == 680)
            {
                clearInterval(levelActNumberAnimation);
            }
            this.levelActNumber.style.left = (parseInt(this.levelActNumber.style.left) - 10) + 'px';
        }, 1);
    }
    
    Level_1()
    {
        this.levelPreview('Green Hill', 1);

        setTimeout(()=>
        {

            let field = new GameArena('field', this.height, this.width, './img/background1.png');
            let player = new GamePlayer('player', 130, 130, 300, 100, field, './img/sonicIdle.png', '1');
            

            //(name, player, field, height, width, top, left, img, zIndex)
            let ground1 = new GameCollision('ground1', player, field, 250, 4150, 600, 0, './img/ground1.png', '10');
            let ground2 = new GameCollision('ground2', player, field, 250, 550, 410, 400, './img/ground1.png', '5');
            let ground3 = new GameCollision('ground3', player, field, 250, 350, 410, 1550, './img/ground1.png', '5');
            let ground4 = new GameCollision('ground4', player, field, 250, 350, 410, 2150, './img/ground1.png', '5');
            let ground5 = new GameCollision('ground5', player, field, 250, 350, 410, 3450, './img/ground1.png', '5');

            let spring1 = new GameCollision('spring1', player, field, 50, 100, 562, 951, './img/objectSpring.png', '3', 'spring');
            let spring2 = new GameCollision('spring2', player, field, 50, 100, 562, 1300, './img/objectSpring.png', '3', 'spring');

            let monitor1 = new GameCollision('monitor1', player, field, 90, 90, 530, 300, './img/objectMonitorRing.png', '3', 'monitorRing');
            
            let temp = 50;
            for (let i = 0; i < 5; i++)
            {
                window['ring' + i] = new GameTrigger('ring' + i, player, field, 50, 50, 300, 500 + temp, './img/objectRing.gif', true, 'ring');
                i++;
                temp = temp + 100;
            }

        }, 2500);
    }
}

let game = new Game(720, 960);

