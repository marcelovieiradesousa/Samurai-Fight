class Sprite{
    constructor({position, imageSrc}){
        this.position = position
        this.height = 150
        this.width = 50
        this.image = new Image()
        this.image.src = imageSrc
    }
    
    draw(){
        c.drawImage(this.image, this. position.x, this.position.y)
    }
    update(){
        this.draw()
    }
}
class Fighter{
    constructor({position, velocity, color = 'red', offset}){
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
    }
    
    draw(){
        c.fillStyle = this.color
        c.fillRect(this.position.x, this.position.y, this.width, this.height)

        //attack box
        if(this.isAttacking){
            c.fillStyle = 'white'
            c.fillRect(
                this.attackBox.position.x,
                this.attackBox.position.y,
                this.attackBox.width,
                this.attackBox.height
            )
        }
        
    }
    update(){
        this.draw()
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
