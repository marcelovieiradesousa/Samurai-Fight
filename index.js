const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576
c.fillRect(0, 0, canvas.width, canvas.height)

const gravity = 0.7

class Sprite{
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

        if(this.position.y + this.height + this.velocity.y >= canvas.height){
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

const player = new Sprite(
    {
        position: {
            x: 150,
            y: 150
        },
        velocity:{
            x: 0,
            y: 0
        },
        offset:{
            x: 0,
            y: 0
        }
    }
)


const enemy = new Sprite(
    {
        position: {
            x: 400,
            y: 100
        },
        velocity:{
            x: 0,
            y: 0
        },
        color: 'green',
        offset:{
            x: -50,
            y: 0
        }
    }
)

//CONTROLES ATIVACAO
const keys = {
    a: {
        pressed: false
    }, 
    d: {
        pressed: false
    },
    w:{
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    }, 
    ArrowRight: {
        pressed: false
    },
    ArrowUp:{
        pressed: false
    }
}

function rectangularCollision(
    {
        rectangle1,
        rectangle2
    }
){
    return (
        rectangle1.attackBox.position.x + rectangle1.attackBox.width >= rectangle2.position.x && 
        rectangle1.attackBox.position.x <= rectangle2.position.x + rectangle2.width && 
        rectangle1.attackBox.position.y + rectangle1.attackBox.height >= rectangle2.position.y &&
        rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height
    )
}

function animate(){
    window.requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)
    player.update()
    enemy.update()

    player.velocity.x = 0
    //ACAO DE MOVIMENTACAO
    //player movement
    if(keys.a.pressed && player.lastKey === 'a'){
        player.velocity.x = -5
    }else if(keys.d.pressed && player.lastKey === 'd'){
        player.velocity.x = 5
    }
    //enemy movement
    enemy.velocity.x = 0
    if(keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft'){
        enemy.velocity.x = -5
    }else if(keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight'){
        enemy.velocity.x = 5
    }

    //detect for collision
    if(rectangularCollision({
        rectangle1: player,
        rectangle2: enemy
    }) &&
        player.isAttacking){
            player.isAttacking = false
            console.log('go')
        }
    if(rectangularCollision({
        rectangle1: enemy,
        rectangle2: player
    }) &&
        enemy.isAttacking){
            enemy.isAttacking = false
            console.log('enemy attack successful')
        }
}
animate()
window.addEventListener('keydown', (event) => {
    switch(event.key){
        //PLAYER
        case 'a':
            keys.a.pressed = true
            player.lastKey = 'a'
            break
        case 'd':
            keys.d.pressed = true
            player.lastKey = 'd'
        break
        case 'w':
            player.velocity.y = -10
            lastKey = 'w'
        break
        case ' ':
            player.attack()
            break
        //ENEMY
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true
            enemy.lastKey = 'ArrowLeft'
            break
        case 'ArrowRight':
            keys.ArrowRight.pressed = true
            enemy.lastKey = 'ArrowRight'
        break
        case 'ArrowUp':
            enemy.velocity.y = -10 
            enemy.lastKey = 'ArrowUp'
        break
        case 'ArrowDown':
            enemy.attack()
            break
    }
}
)
window.addEventListener('keyup', (event) => {
    switch(event.key){
        case 'd':
            keys.d.pressed = false
        break
        case 'a':
            keys.a.pressed = false
        break
        case 'w':
            keys.w.pressed = false
        break

        //ENEMY KEYS
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false
            break
        case 'ArrowRight':
            keys.ArrowRight.pressed = false            
        break
        case 'ArrowUp':
            keys.ArrowUp.pressed = false
        break
    }
})