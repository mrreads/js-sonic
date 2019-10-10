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
        this.element.style.transform = 'scaleX(1)';

        this.rings = 0;
        this.lives = 3;
        this.isGround = false;
        this.jumpForce = 10;
        this.mass = 2;
        this.keyboardControl();
        this.isJumping = false;
        this.initGravitation();
        this.initDebug();
        this.initScroll();

        setInterval(function () {
            this.checkIdle();
        }.bind(this), 1000/60);

        this.isMove = false;
        this.direction;
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
                        this.spriteAnimate(66, 66, 1, 6, './img/sonicWalk.png');
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

    spriteAnimate(height, width, margin, count, img)
    {
        this.element.style.backgroundPosition = '0px'
        this.element.style.backgroundSize = (count * width) + 'px';
        this.element.style.backgroundImage = 'url("'+img+'")';
        
        let temp;
        this.spriteInterval = setInterval(() => {
            temp = parseInt(this.element.style.backgroundPosition) + width;
            this.element.style.backgroundPosition = temp + 'px';
        }, )
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
            if (event.code == 'Space') 
            {
                if (this.isJumping == false & this.isGround == true)
                {
                    this.jump();
                }
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
            document.querySelector(".debug p:nth-child(1)").textContent = `Rings: ${this.rings}`;
            document.querySelector(".debug p:nth-child(2)").textContent = `Lives: ${this.lives}`;
        }.bind(this), 1000/60);
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
        let counter = 0;
        this.isJumping = true;
        
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
                    this.temp = parseInt(this.objects[i].style.left) - 1;
                    this.objects[i].style.left = this.temp + "px";
                }
            }

            if ((parseInt(this.element.style.left) < 2))
            {
                this.element.style.left = 2 + 'px';

                this.objects = this.field.children;

                for (let i = 1; i < this.objects.length; i++)
                {
                    this.temp = parseInt(this.objects[i].style.left) + 1;
                    this.objects[i].style.left = this.temp + "px";
                }
            }

        }.bind(this), 1);
    }

    checkIdle() 
    {
        this.tempOldOne = this.element.style.top;
        this.tempOldTwo = this.element.style.left;

        setTimeout(function () 
        {
            this.tempNewOne = this.element.style.top;
            this.tempNewTwo = this.element.style.left;
        }.bind(this), 1000/60);

        if ((this.tempOldOne == this.tempNewOne) && (this.tempOldTwo == this.tempNewTwo)) 
        {
            this.isMove = false;
        }

        if (this.isMove == false)
        {
            clearInterval(this.spriteInterval);
            this.element.style.backgroundPosition = '0px'
            this.element.style.backgroundSize = '100%';
            this.element.style.backgroundImage = 'url("./img/sonicIdle.png")';
        }
    }
}