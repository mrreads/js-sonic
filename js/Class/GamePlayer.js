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
        this.element.style.top = 155 + 'px';
        this.element.style.left = (field.width / 2 - this.width) + 'px';
        this.element.style.backgroundImage = 'url("'+img+'")';
        this.element.style.backgroundSize = '156%';
        this.element.style.transform = 'scaleX(1)';

        this.score = 0;
        this.rings = 0;
        this.lives = 3;
        this.minutes = 0;
        this.seconds = 0;

        this.isGround = false;
        this.jumpForce = 15;
        this.mass = 2;
        this.keyboardControl();
        this.isJumping = false;
        this.canMove = true;
        this.isCrouch = false;
        this.isRoll = false;
        this.initGravitation();
        this.initHud();
        this.initScroll();

        setInterval(function () {
            this.checkIdle();
        }.bind(this), 150);

        this.isMove = false;
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
        }
    }

    keyboardControl()
    {
        document.addEventListener('keypress', function (event) 
        {
            if (event.code == 'KeyA') 
            {
                this.move(-25);
            }
            if (event.code == 'KeyD') 
            {
                this.move(25);
            }

            if (event.code == 'Space') 
            {
                if (this.isJumping == false & this.isGround == true)
                {
                    this.jump();
                }
            }
            
            if (event.code == 'KeyS' && this.isMove == false) 
            {
                this.crouch();
            }
            if (event.code == 'KeyS' && this.isMove == true) 
            {
                this.isRoll = true; 
                this.startAnimate('jump');
            }
        }.bind(this));
        
    }

    initHud()
    {

        this.hud = document.createElement("div");
        this.field.appendChild(this.hud);
        this.hud.classList.add('hud');
        this.hudText = document.createElement("p");
        document.querySelector('.hud').appendChild(this.hudText);
        this.hudText = document.createElement("p");
        document.querySelector('.hud').appendChild(this.hudText);
        this.hudText = document.createElement("p");
        document.querySelector('.hud').appendChild(this.hudText);
        document.querySelector(".hud p:nth-child(2)").innerHTML = `Time: <span>${this.minutes}:${this.seconds + '0'}</span>`;

        setInterval(function()
        {   
            document.querySelector(".hud p:nth-child(1)").innerHTML = `Score: <span> ${this.score} </span>`;
            document.querySelector(".hud p:nth-child(3)").innerHTML = `Rings: <span class="rings"> ${this.rings} </span>`;
        }.bind(this), 1000/60);

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
        }.bind(this), 1000);
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
                    
                    if (this.isGround == false) { this.startAnimate('jump'); }

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
        let audioJump = new Audio('./audio/sonicJump.wav');
        audioJump.play();
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

    crouch()
    {
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

    startAnimate(arg)
    {
        if (arg == 'jump')
        {
            this.element.style.backgroundImage = 'url("./img/sonicJump.gif")';
            this.element.style.backgroundPosition = 'center -20px';
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
        }
        if (arg == 'crouch')
        {
            this.element.style.backgroundImage = 'url("./img/sonicCrouch.png")';
            this.element.style.backgroundPosition = 'center center';
            this.element.style.backgroundSize = '156%';
        }
    }

    initScroll()
    {
        this.objects = [];
        setInterval(function()
        {
            if ((parseInt(this.element.style.left) + parseInt(this.element.style.width)) > (parseInt(this.field.style.width) / 2 + 150))
            {
                this.temp = ((parseInt(this.field.style.width) / 2 + 150) - parseInt(this.element.style.width));
                this.element.style.left = this.temp + 'px';

                this.objects = this.field.children;

                for (let i = 1; i < this.objects.length; i++)
                {
                    this.temp = parseInt(this.objects[i].style.left) - 2;
                    this.objects[i].style.left = this.temp + "px";
                }
            }

            if ((parseInt(this.element.style.left) < 2))
            {
                this.element.style.left = 2 + 'px';

                this.objects = this.field.children;

                for (let i = 1; i < this.objects.length; i++)
                {
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

        if (this.isMove == false && this.isGround == true && this.isCrouch == false)
        {
            this.startAnimate('idle');
        }
        
        if (this.isJumping == true)
        {
            this.startAnimate('jump');
        }
    }
}