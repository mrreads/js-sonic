class GameCollision 
{
    constructor(name, player, field, height, width, top, left, img, zIndex, type, deg) 
    {
        this.name = name;
        this.player = player.element;
        this.height = height;
        this.width = width;
        this.field = field.element;
        this.element = document.createElement("div");
        this.field.appendChild(this.element);
        this.element.classList.add('ground');
        this.element.classList.add(name);
        this.element = document.querySelector('.' + this.name);
        this.element.style.height = this.height + 'px';
        this.element.style.width = this.width + 'px';
        this.element.style.top = top + 'px';
        this.element.style.left = left + 'px';
        this.element.style.position = 'absolute';
        this.element.style.backgroundImage = 'url("'+img+'")';
        this.element.style.zIndex = 'unset';
        this.element.style.zIndex = zIndex;
        this.isGround = false;
        this.type = 'collision';
        this.type = type;
        if (type == 'spring')
        {
            this.element.style.backgroundPosition = 'center 10px';
            this.element.style.backgroundRepeat = 'no-repeat';
            this.element.style.backgroundSize = '100%';
        }
        if (type == 'monitorRing' || type == 'monitorLive')
        {
            this.element.style.backgroundSize = '100%';
            this.element.style.backgroundRepeat = 'no-repeat';
        }
        if (type == 'spike')
        {
            this.element.style.backgroundSize = '100%';
            this.element.style.backgroundRepeat = 'no-repeat';
        }
        let playSoundOnce = false;
        this.isDeleted = false;
        this.deg = 'default';
        this.deg = deg;

        // Каждые **ms проверяется, входит ли игрок в коллизию. Если входит - отталкивает обратно.
        setInterval(function () 
        {
            if (this.isDeleted == false)
            {
                // LEFT COLLISION
                // ЕСЛИ - ЛЕВЫЕ КООРДИНАТЫ ИГРОКА + ШИРИНА ИГРОКА >БОЛЬШЕ> ЛЕВЫЕ КООРДИНАТЫ ОБЬЕКТА (дальше логика на ограничения действия коллизии)
                if (((parseInt(this.player.style.left) + parseInt(this.player.style.width)) > parseInt(this.element.style.left)) && (parseInt(this.player.style.left) < (parseInt(this.element.style.left) + (parseInt(this.element.style.width) / 2)))) 
                {
                    // ограничение действия коллизии по вертикали
                    if (((parseInt(this.player.style.top) + parseInt(this.player.style.height) - 37) > parseInt(this.element.style.top)) && (parseInt(this.player.style.top) <= (parseInt(this.element.style.top) + parseInt(this.element.style.height) / 2))) 
                    {
                        if (this.name == this.element.classList[1])
                        {
                            let temp = (parseInt(this.element.style.left) - parseInt(this.player.style.width));
                            this.player.style.left = temp + 'px';
                        }
                    }
                }

                // RIGHT COLLISION
                // ЕСЛИ - ЛЕВЫЕ КООРДИНАТЫ ИГРОКА <МЕНЬШЕ< ЛЕВЫЕ КООРДИНАТЫ ОБЬЕКТА + ШИРИНА ОБЬЕКТА (дальше логика на ограничения действия коллизии)
                if (((parseInt(this.player.style.left)) < ((parseInt(this.element.style.left) + parseInt(this.element.style.width)))) && !(parseInt(this.player.style.left) < (parseInt(this.element.style.left) + (parseInt(this.element.style.width) / 2)))) 
                {
                    // ограничение действия коллизии по вертикали
                    if (((parseInt(this.player.style.top) + parseInt(this.player.style.height) - 37) > parseInt(this.element.style.top)) && (parseInt(this.player.style.top) <= (parseInt(this.element.style.top) + parseInt(this.element.style.height) / 2))) 
                    {
                        if (this.name == this.element.classList[1])
                        {
                            let temp = (parseInt(this.element.style.left) + parseInt(this.element.style.width));
                            this.player.style.left = temp + 'px';
                        }
                    }
                }
            

                // TOP COLLISION
                // ЕСЛИ - КООРДИНАТЫ ВЫСОТЫ ИГРОКА + ВЫСОТА ИГРОКА >БОЛЬШЕ> КООРДИНАТЫ ВЫСОТЫ ОБЬЕКТА (дальше логика на ограничения действия коллизии)
                if (((parseInt(this.player.style.top) + parseInt(this.player.style.height)) > (parseInt(this.element.style.top))) && (parseInt(this.player.style.top) < (parseInt(this.element.style.top) + (parseInt(this.element.style.height) / 2)))) 
                {
                    // ограничение действия коллизии по горизонтали
                    if (((parseInt(this.player.style.left) + parseInt(this.player.style.width)) > parseInt(this.element.style.left)) && (parseInt(this.player.style.left) < (parseInt(this.element.style.left) + parseInt(this.element.style.width)))) 
                    {
                        player.isFall = true;
                        
                        this.tempGround = this.element.classList[1];
                        if (this.tempGround == this.element.classList[1])
                        {
                            this.tempGround = this.name;
                            player.isGround = true;
                            player.mass = 2;
                            let temp = (parseInt(this.element.style.top) - parseInt(this.player.style.height));
                            this.player.style.top = temp + 'px';

                            let audioObjectSpring;

                            // left fall collision
                            if ((parseInt(this.player.style.left) + parseInt(this.player.style.width) / 2 + 10) < (parseInt(this.element.style.left)))
                            {
                                player.leftFall = true;
                            }
                            else
                            {
                                player.leftFall = false;
                            }

                            // right fall collision
                            if ((parseInt(this.player.style.left) + parseInt(this.player.style.width) - parseInt(this.player.style.width) / 2 + 10) > (parseInt(this.element.style.left) + parseInt(this.element.style.width)))
                            {
                                player.rightFall = true;
                            }
                            else
                            {
                                player.rightFall = false;
                            }

                            
                            if (type == 'monitorRing')
                            {
                                if (player.isJumping == true)
                                {
                                    this.isPickable = true;
                                    if (this.isPickable == true && this.isDeleted == false)
                                    {
                                        let audioMonitor = new Audio('./audio/objectMonitor.wav');
                                        audioMonitor.play();
                                        player.rings += 10;
                                        player.updateCounters();
                                        this.isDeleted = true;
                                        this.element.style.backgroundImage = 'url("./img/ObjectMonitorDestoyed.png")';
                                        this.element.style.backgroundSize = '90%';
                                        player.playVfx(this.element, 350, './img/ObjectMonitorVfx.gif');
                                        let audioRing = new Audio('./audio/objectRing.wav');
                                        audioRing.play();
                                    }
                                }
                            }

                            if (type == 'monitorLive')
                            {
                                if (player.isJumping == true)
                                {
                                    this.isPickable = true;
                                    if (this.isPickable == true && this.isDeleted == false)
                                    {
                                        let audioMonitor = new Audio('./audio/objectMonitor.wav');
                                        audioMonitor.play();
                                        player.lives += 1;
                                        player.updateCounters();
                                        this.isDeleted = true;
                                        this.element.style.backgroundImage = 'url("./img/ObjectMonitorDestoyed.png")';
                                        this.element.style.backgroundSize = '90%';
                                        player.playVfx(this.element, 350, './img/ObjectMonitorVfx.gif');
                                        let audioLive = new Audio('./audio/sonicExtraLive.mp3');
                                        audioLive.play();
                                    }
                                }
                            }

                            if (this.type == 'spring')
                            {   
                                player.jumpSoundDisabled = true;
                                player.jump(20);
                                if (playSoundOnce == false)
                                {
                                    audioObjectSpring = new Audio('./audio/objectSpring.wav');
                                    audioObjectSpring.play();
                                    this.element.style.backgroundPosition = 'center top';
                                    playSoundOnce = true;                     
                                }
                                this.tempGround = null;
                                player.jumpSoundDisabled = false;
                                setTimeout(() => { 
                                    playSoundOnce = false; 
                                    this.element.style.backgroundPosition = 'center 10px';
                                }, 100);
                            }

                            if (this.type == 'spike')
                            {
                                if (((parseInt(this.player.style.left) + parseInt(this.player.style.width)) > parseInt(this.element.style.left) + 10) && (parseInt(this.player.style.left) < (parseInt(this.element.style.left) + parseInt(this.element.style.width) - 10))) 
                                {

                                    if (playSoundOnce == false)
                                    {
                                        let audioSonicDamage = new Audio('./audio/sonicDamaged.wav');
                                        audioSonicDamage.play();

                                        playSoundOnce = true;
                                        player.rings = 0;
                                        player.updateCounters();
                                        player.jump(15);  
                                        if (player.direction == 'left') { player.move(-20, 10); }
                                        if (player.direction == 'right') { player.move(20, 10); }
                                        player.element.style.backgroundImage = 'url("./img/sonicHurt.png")';
                                    }

                                    setTimeout(() => { 
                                        playSoundOnce = false; 
                                        this.element.style.backgroundPosition = 'center 10px';
                                    }, 150);
                                }
                            }
                        }
                    }
                    else
                    {
                            playSoundOnce = false;
                            this.tempGround = null;
                    }
                }
                else
                {
                    if (this.tempGround == this.element.classList[1])
                    {
                        playSoundOnce = false;
                        player.isGround = false;
                    }

                    player.isFall = true;
                }

                // BOTTOM COLLISION
                // ЕСЛИ - КООРДИНАТЫ ВЫСОТЫ ИГРОКА  >МЕНЬШЕ> КООРДИНАТ ВЫСОТЫ ОБЬЕКТА + ВЫСОТА ОБЬЕКТА (дальше логика на ограничения действия коллизии)
                if (((parseInt(this.player.style.top)) > (parseInt(this.element.style.top))) && (parseInt(this.player.style.top) < (parseInt(this.element.style.top) + parseInt(this.element.style.height)))) 
                {
                    // ограничение действия коллизии по горизонтали
                    if (((parseInt(this.player.style.left) + parseInt(this.player.style.width)) > parseInt(this.element.style.left)) && (parseInt(this.player.style.left) < (parseInt(this.element.style.left) + parseInt(this.element.style.width)))) 
                    {
                        if (this.name == this.element.classList[1])
                        {
                            let temp = (parseInt(this.element.style.top) + parseInt(this.element.style.height));
                            this.player.style.top = temp + 'px';
                        }
                    }
                }
            }
        }.bind(this), 1000/60);
    }
}