const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576
c.fillRect(0, 0, canvas.width, canvas.height)

const gravity = 0.2

class Sprite{
    constructor({position, velocity}){
        this.position = position
        this.velocity = velocity
        this.height = 150
    }
    
    draw(){
        c.fillStyle = 'red'
        c.fillRect(this.position.x, this.position.y, 50, this.height)
    }
    update(){
        this.draw()

        //MOVIMENTACAO
        this.position.x += this.velocity.x  
        this.position.y += this.velocity.y 

        if(this.position.y + this.height + this.velocity.y >= canvas.height){
            this.velocity.y = 0 // parar de cair
        }else this.velocity.y += gravity //cair com gravidade
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
    }
}

let lastKey

function animate(){
    window.requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)
    player.update()
    enemy.update()

    //ACAO DE MOVIMENTACAO
    player.velocity.x = 0
    if(keys.a.pressed && lastKey === 'a'){
        player.velocity.x = -1
    }else if(keys.d.pressed && lastKey === 'd'){
        player.velocity.x = 1
    }
}
animate()

window.addEventListener('keydown', (event) => {
    switch(event.key){
        case 'a':
            keys.a.pressed = true
            lastKey = 'a'
            break
        case 'd':
            keys.d.pressed = true
            lastKey = 'd'
        break
        case 'w':
            player.velocity.y = -5 
            lastKey = 'w'
        break
    }
    console.log(event.key)
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
    }
})