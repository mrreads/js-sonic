class GamePlayer
{
    constructor(id, height, width, top, left, field, img, zIndex)
    {
        this.field =  field.element;
        this.height = height;
        this.width = width;
        if (!document.querySelector(`#${id}`)) { this.field.innerHTML += `<div id="${ id }"></div>`; }
        this.element = document.querySelector(`#${id}`);
        this.element.style.width = width + 'px';
        this.element.style.height = height + 'px';
        this.element.style.position = "absolute";
        this.element.style.top = top + 'px';
        this.element.style.left = left + 'px';
        this.element.style.backgroundImage = 'url("'+img+'")';
        this.element.style.backgroundSize = '156%';
        this.element.style.transform = 'scaleX(1)';
        this.element.style.zIndex = 'unset';
        this.element.style.zIndex = zIndex;

        this.score = 0;
        this.rings = 0;
        this.lives = 3;
        this.minutes = 0;
        this.seconds = 0;

        this.isFall = false;
        this.isGround = false;
        this.jumpForce = 15;
        this.mass = 2;
        this.keyboardControl();
        this.isJumping = false;
        this.canMove = true;
        this.isCrouch = false;
        this.isRoll = false;
        this.isLookUp = false;
        this.initGravitation();
        this.initHud();
        this.initScroll();
        this.checkedKeys = false;

        setInterval(() => {
            this.checkIdle();
            this.checkWalk();
        }, 150);

        setInterval(() => {
            this.checkMove();
        }, 50);

        this.isMove = false;
        this.jumpSoundDisabled = false;
        this.leftFall = false;
        this.rightFall = false;

        this.keyA = false;
        this.keyD = false;
    }

    move(value)
    {
        if (this.isCrouch == false)
        {
            if (((parseInt(this.element.style.left) + parseInt(value)) > (parseInt(this.field.style.width) - parseInt(this.element.style.width))) == false) 
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
                            this.element.style.transform = 'scaleX(1)';
                            temp = parseInt(this.element.style.left) + 1;
                        } 
                        else 
                        {
                            this.element.style.transform = 'scaleX(-1)';
                            temp = parseInt(this.element.style.left) - 1;
                        }
                        if (temp > 0) 
                        {
                            this.isMove = true;
                            this.element.style.left = temp + "px";
                            if (this.isJumping == false && this.isRoll == false) { this.startAnimate('walk'); }
                        }
                    }

                    if ((parseInt(this.element.style.left) + parseInt(this.width)) > parseInt(this.field.style.width))
                    {
                        let temp = (parseInt(this.field.style.width) - parseInt(this.element.style.width));
                        this.element.style.left = temp + 'px';
                    }
                }.bind(this), 1000/60);
            }
        }
        else
        {
            this.isCrouch = false;
            this.isLookUp = false;
        }
    }

    checkMove()
    {
        if (this.keyD == true)
        {
            this.move(25);
        }
        if (this.keyA == true)
        {
            this.move(-25);
        }
    }
    
    keyboardControl()
    {
        document.addEventListener("keydown", function (event)
        {
            if (event.code == 'KeyA') 
            {
                this.keyA = true;
            }
            if (event.code == 'KeyD') 
            {
                this.keyD = true;
            }
            this.checkMove();
        }.bind(this));

        document.addEventListener("keyup", function (event)
        {
            if (event.code == 'KeyA') 
            {
                this.keyA = false;
            }
            if (event.code == 'KeyD') 
            {
                this.keyD = false;
            }
            this.checkMove();
        }.bind(this));

        document.addEventListener('keypress', function (event)
        {      
            if (event.code == 'Space') 
            {
                this.checkedKeys = true;
                if (this.isJumping == false & this.isGround == true)
                {
                    this.jump();
                }
            }
            if (event.code == 'KeyS' && this.isMove == false && this.isJumping == false) 
            {
                this.crouch();
            }
            if (event.code == 'KeyS' && this.isMove == true && this.isJumping == false && this.isRoll == false) 
            {
                if (this.isRollable == true)
                {
                    this.isRoll = true;
                    let audioRoll = new Audio('./audio/sonicRoll.wav');
                    audioRoll.play();
                    this.startAnimate('jump');
                }
            }
            if ((event.code == 'KeyW' && this.isMove == false && this.isJumping == false && this.isGround == true))
            {
                this.lookUp();
            }
        }.bind(this));
    }

    initHud()
    {

        this.hud = document.createElement("div");
        this.hud.style.position = 'relative';
        this.hud.style.height = '100%';
        this.field.appendChild(this.hud);
        this.hud.classList.add('hud');
        this.hudText = document.createElement("p");
        document.querySelector('.hud').appendChild(this.hudText);
        this.hudText = document.createElement("p");
        document.querySelector('.hud').appendChild(this.hudText);
        this.hudText = document.createElement("p");
        document.querySelector('.hud').appendChild(this.hudText);
        document.querySelector(".hud p:nth-child(2)").innerHTML = `Time: <span>${this.minutes}:${this.seconds + '0'}</span>`;

        this.livesIcon = document.createElement("div");
        document.querySelector('.hud').appendChild(this.livesIcon);
        this.livesIcon.style.position = 'absolute';
        this.livesIcon.style.width = '75px';
        this.livesIcon.style.height = '75px';
        this.livesIcon.style.left = '45px';
        this.livesIcon.style.bottom = '80px';
        this.livesIcon.style.zIndex = '100';
        this.livesIcon.style.backgroundImage = 'url("./img/hudLives.png")';
        this.livesIcon.style.backgroundRepeat = 'no-repeat';

        this.hidLivesSonic = document.createElement("p");
        document.querySelector('.hud').appendChild(this.hidLivesSonic);
        this.hidLivesSonic.textContent = "sonic";
        this.hidLivesSonic.style.fontSize = '36px';
        this.hidLivesSonic.style.position = 'absolute';
        this.hidLivesSonic.style.bottom = '110px';
        this.hidLivesSonic.style.left = '135px';
        this.hidLivesSonic.style.zIndex = '100';

        this.hidLivesCounter = document.createElement("p");
        document.querySelector('.hud').appendChild(this.hidLivesCounter);
        this.hidLivesCounter.textContent = `x          ${this.lives}`;
        this.hidLivesCounter.style.fontSize = '36px';
        this.hidLivesCounter.style.position = 'absolute';
        this.hidLivesCounter.style.bottom = '68px';
        this.hidLivesCounter.style.left = '135px';
        this.hidLivesCounter.style.zIndex = '100';
        this.hidLivesCounter.style.color = 'white';
        this.hidLivesCounter.style.letterSpacing = '17px';

        document.querySelector(".hud p:nth-child(1)").innerHTML = `Score: <span> ${this.score} </span>`;
        document.querySelector(".hud p:nth-child(3)").innerHTML = `Rings: <span class="rings"> ${this.rings} </span>`;
        this.hidLivesCounter.textContent = `x          ${this.lives}`;

        let ringFlag = false;
        setInterval(function()
        {
            ++this.seconds;
            if (this.seconds.toString().length == 1)
            {
                this.seconds = '0' + this.seconds;
            }
            if (parseInt(this.seconds) == 61)
            {
                this.minutes++;
                this.seconds = '0' + 0;
            }
            document.querySelector(".hud p:nth-child(2)").innerHTML = `Time: <span>${this.minutes}:${this.seconds}</span>`;

            if (parseInt(this.rings) === 0)
            {
                if (ringFlag == true)
                {
                    document.querySelector(".hud p:nth-child(3)").style.color = "red";
                    ringFlag = false;
                    
                }
                else
                {
                    document.querySelector(".hud p:nth-child(3)").style.color = "#e8e400";
                    ringFlag = true;
                }
                
            }
            else
            {
                ringFlag = false;
                document.querySelector(".hud p:nth-child(3)").style.color = "#e8e400";
            }
        }.bind(this), 1000);
    }

    updateCounters()
    {
        document.querySelector(".hud p:nth-child(1)").innerHTML = `Score: <span> ${this.score} </span>`;
        document.querySelector(".hud p:nth-child(3)").innerHTML = `Rings: <span class="rings"> ${this.rings} </span>`;
        this.hidLivesCounter.textContent = `x ${this.lives}`;
    }

    initGravitation()
    {
        self = this;
        let temp;
    
        function startGravity() 
        {
            self.gravity = setInterval(function () 
            {
                if ((parseInt(self.element.style.top) + parseInt(self.element.style.height)) < (parseInt(self.field.style.height)))
                {
                    
                    temp = parseInt(self.element.style.top) + self.mass;
                    self.element.style.top = temp + 'px';
                    
                    if (this.isGround == false && this.isFall == true) { this.startAnimate('jump'); }

                    if (self.isGround != true || self.isJumping == true)
                    {
                        self.mass = self.mass + 1;
                    }
                    else
                    {
                        self.mass = 2;
                    }
                }
            }, 1000/60);
        }

        setTimeout(startGravity, 1);
    }

    jump()
    {
        if (this.jumpSoundDisabled == false)
        {
            let audioJump = new Audio('./audio/sonicJump.wav');
            audioJump.play();
        }
        let counter = 0;
        this.isJumping = true;
        this.isCrouch = false;
        let jump = setInterval(function () 
        {
            if (counter == 20) 
            {
                this.isJumping = false;
                clearInterval(jump);
                this.initGravitation();
            }
            let temp;
            temp = parseInt(this.element.style.top) - parseInt(this.jumpForce);
            this.element.style.top = temp + 'px';
            counter++;
            clearInterval(this.gravity);
            
        }.bind(this), 1000/60);
    }

    lookUp()
    {
        if (this.leftFall == false && this.rightFall == false)
        {
            this.startAnimate('up');
            this.isLookUp = true;
            this.isCrouch = false;
        }
    }

    crouch()
    {
        if (this.leftFall == false && this.rightFall == false)
        {
            this.isLookUp = false;
            this.isCrouch = true;
            setInterval(() =>
            {
                if (this.isCrouch == true)
                {
                    this.canMove = false;
                    this.startAnimate('crouch');
                }
            }, 1000/60);
        }
    }

    checkWalk()
    {
        setInterval(() => {
            this.moveOld = this.isMove;
            
            setTimeout(() => {
                this.moveNew = this.isMove;
            }, 100);
    
            if ((this.moveOld == this.moveNew && this.isGround == true)) 
            {
                this.isRollable = true;
            }
            else
            {
                this.isRollable = false;
            }
        }, 150);
    }

    startAnimate(arg)
    {
        if (arg == 'jump')
        {
            this.element.style.backgroundImage = 'url("./img/sonicJump.gif")';
            this.element.style.backgroundPosition = 'center -30px';
            this.element.style.backgroundSize = '165%';
        }
        if (arg == 'walk')
        {
            this.element.style.backgroundImage = 'url("./img/sonicWalk.gif")';
            this.element.style.backgroundPosition = 'center center';
            this.element.style.backgroundSize = '156%';
        }
        if (arg == 'idle')
        {
            this.element.style.backgroundImage = 'url("./img/sonicIdle.png")';
            this.element.style.backgroundPosition = 'center center';
            this.element.style.backgroundSize = '156%';
            if (this.leftFall == true)
            {
                this.element.style.transform = 'scaleX(-1) translateX(-55px)';
                this.element.style.backgroundImage = 'url("./img/sonicBalance.gif")';
                this.element.style.backgroundPosition = '-5px center';
                this.element.style.backgroundSize = '156%';
            }
            if (this.rightFall == true)
            {
                this.element.style.transform = 'scaleX(1) translateX(-40px)';
                this.element.style.backgroundImage = 'url("./img/sonicBalance.gif")';
                this.element.style.backgroundPosition = '-5px center';
                this.element.style.backgroundSize = '156%';
            }
        }
        if (arg == 'crouch')
        {
            this.element.style.backgroundImage = 'url("./img/sonicCrouch.png")';
            this.element.style.backgroundPosition = 'center center';
            this.element.style.backgroundSize = '156%';
        }
        if (arg == 'up')
        {
            this.element.style.backgroundImage = 'url("./img/sonicLookUp.png")';
            this.element.style.backgroundPosition = 'center center';
            this.element.style.backgroundSize = '156%';
        }
    }
    
    playVfx(elem, time, img)
    {
        let vfx = document.createElement('div');
        elem.appendChild(vfx);
        vfx.style.height = '100%';
        vfx.style.width = '100%';
        vfx.style.backgroundImage = 'url("'+img+'")';
        setTimeout(() => { vfx.remove(); }, time);
    }

    initScroll()
    {
        this.startScreen = -150;
        this.objects = [];
        setInterval(function()
        {   
            if ((parseInt(this.element.style.left) + parseInt(this.element.style.width)) > (parseInt(this.field.style.width) / 2 + 150))
            {
                this.backgroundTemp = parseInt(this.field.style.backgroundPosition) - 1;
                this.field.style.backgroundPosition = this.backgroundTemp + 'px center';

                this.temp = ((parseInt(this.field.style.width) / 2 + 150) - parseInt(this.element.style.width));
                this.element.style.left = this.temp + 'px';

                this.objects = this.field.children;

                for (let i = 1; i < this.objects.length; i++)
                {
                    this.startScreen = this.startScreen + 2;
                    this.temp = parseInt(this.objects[i].style.left) - 2;
                    this.objects[i].style.left = this.temp + "px";
                    let backgroundTemp = parseInt(this.field.backgroundPosition);
                }
            }

            if ((parseInt(this.element.style.left) < 200) && (this.startScreen > 2))
            {
                this.backgroundTemp = parseInt(this.field.style.backgroundPosition) + 1;
                this.field.style.backgroundPosition = this.backgroundTemp + 'px center';

                this.element.style.left = 200 + 'px';

                this.objects = this.field.children;

                for (let i = 1; i < this.objects.length; i++)
                {
                    this.startScreen = this.startScreen - 2;
                    this.temp = parseInt(this.objects[i].style.left) + 2;
                    this.objects[i].style.left = this.temp + "px";
                }
            }

        }.bind(this), 1);
    }

    checkIdle() 
    {
        this.tempOld = this.element.style.left;

        setTimeout(function () 
        {
            this.tempNew = this.element.style.left;
        }.bind(this), 100);

        if ((this.tempOld == this.tempNew)) 
        {
            this.isMove = false;
            this.isRoll = false;
        }
        
        if (this.isMove == true)
        {
            this.isLookUp = false;
            this.isCrouch = false;
        }

        if (this.isMove == false && this.isGround == true && this.isCrouch == false && this.isLookUp == false)
        {
            this.startAnimate('idle');
        }
        
        if (this.isJumping == true)
        {
            this.startAnimate('jump');
        }
    }
}