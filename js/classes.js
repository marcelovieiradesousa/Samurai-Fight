class Sprite{
    constructor({position, imageSrc, scale = 1, framesMax = 1, offset = {x: 0, y:0 }}){
        this.position = position
        this.height = 150
        this.width = 50
        this.image = new Image()
        this.image.src = imageSrc
        this.scale = scale
        this.framesMax = framesMax
        this.framesCurrent = 0
        this.framesElapsed = 0
        this.framesHold = 5
        this.offset = offset
    }
    
    draw(){
        c.drawImage(
            this.image, 
            this.framesCurrent * (this.image.width / this.framesMax), //origem dos frames
            0, //origem dos frames
            this.image.width / this.framesMax, //até onde vai os frames
            this.image.height, //até onde vai os frames
            this. position.x - this.offset.x, //posisicao da img horizontal
            this.position.y - this.offset.y, //posisicao da img vertical
            (this.image.width / this.framesMax) * this.scale, // dimensão da img vertical
            this.image.height * this.scale) // dimensão da img horizontal
    }
    animateFrames(){
        this.framesElapsed++
        
        if(this.framesElapsed % this.framesHold === 0){
            if(this.framesCurrent < this.framesMax - 1){ // -1 para não deslocar a img de fundo
                this.framesCurrent++
            }else{
                this.framesCurrent = 0
            }
        }
    }
    update(){
        this.draw()
        this.animateFrames()
    }
}
class Fighter extends Sprite{
    constructor({position, velocity, color = 'red', imageSrc, scale = 1, framesMax = 1, offset = {x: 0, y:0 }}){
        super({
            position,
            imageSrc,
            scale,
            framesMax,
            offset
        })

        this.position = position
        this.velocity = velocity
        this.height = 150
        this.width = 50
        this.lastKey
        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            offset,
            width: 100,
            height: 50,
        }
        this.color = color
        this.isAttacking
        this.health = 100
        this.framesCurrent = 0
        this.framesElapsed = 0
        this.framesHold = 5
    }
    
        update(){
        this.draw()
        this.animateFrames()
        this.attackBox.position.x = this.position.x + this.attackBox.offset.x
        this.attackBox.position.y = this.position.y


        //MOVIMENTACAO
        this.position.x += this.velocity.x  //walk
        this.position.y += this.velocity.y  //jump

        if(this.position.y + this.height + this.velocity.y >= canvas.height - 96){
            this.velocity.y = 0 // parar de cair
        }else this.velocity.y += gravity //cair com gravidade
    }
    attack(){
        this.isAttacking = true
        setTimeout(()=> {
            this.isAttacking = false
        }, 100)
    }
}
