class Sprite {
  constructor({
    position,
    imageSrc,
    scale = 1,
    framesMax = 1,
    offset = { x: 0, y: 0 },
  }) {
    this.position = position;
    this.height = 150;
    this.width = 50;
    this.image = new Image();
    this.image.src = imageSrc;
    this.scale = scale;
    this.framesMax = framesMax;
    this.framesCurrent = 0;
    this.framesElapsed = 0;
    this.framesHold = 5;
    this.offset = offset;
  }

  draw() {
    c.drawImage(
      this.image,
      this.framesCurrent * (this.image.width / this.framesMax), //origem dos frames
      0, //origem dos frames
      this.image.width / this.framesMax, //até onde vai os frames
      this.image.height, //até onde vai os frames
      this.position.x - this.offset.x, //posisicao da img horizontal
      this.position.y - this.offset.y, //posisicao da img vertical
      (this.image.width / this.framesMax) * this.scale, // dimensão da img vertical
      this.image.height * this.scale
    ); // dimensão da img horizontal
  }
  animateFrames() {
    this.framesElapsed++;

    if (this.framesElapsed % this.framesHold === 0) {
      if (this.framesCurrent < this.framesMax - 1) {
        // -1 para não deslocar a img de fundo
        this.framesCurrent++;
      } else {
        this.framesCurrent = 0;
      }
    }
  }
  update() {
    this.draw();
    this.animateFrames();
  }
}
class Fighter extends Sprite {
  constructor({
    position,
    velocity,
    color = "red",
    imageSrc,
    scale = 1,
    framesMax = 1,
    offset = { x: 0, y: 0 },
    sprites,
    attackBox = { offset: {}, width: undefined, height: undefined },
  }) {
    super({
      position,
      imageSrc,
      scale,
      framesMax,
      offset,
    });

    // this.position = position;
    this.velocity = velocity;
    this.height = 150;
    this.width = 50;
    this.lastKey;
    this.attackBox = {
      position: {
        x: this.position.x,
        y: this.position.y,
      },
      offset: attackBox.offset,
      width: attackBox.width,
      height: attackBox.height,
    };
    this.color = color;
    this.isAttacking;
    this.health = 100;
    this.framesCurrent = 0;
    this.framesElapsed = 0;
    this.framesHold = 5;
    this.sprites = sprites;

    //instancia um obj Image para cada sprite
    for (const sprite in this.sprites) {
      sprites[sprite].image = new Image();
      sprites[sprite].image.src = sprites[sprite].imageSrc;
    }
  }

  update() {
    this.draw();
    this.animateFrames();

    //caixas de ataque
    this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
    this.attackBox.position.y = this.position.y + this.attackBox.offset.y;

    // desenho dos ataques
    // c.fillRect(
    //   this.attackBox.position.x,
    //   this.attackBox.position.y,
    //   this.attackBox.width,
    //   this.attackBox.height
    // );

    //MOVIMENTACAO
    this.position.x += this.velocity.x; //walk
    this.position.y += this.velocity.y; //jump

    if (this.position.y + this.height + this.velocity.y >= canvas.height - 96) {
      this.velocity.y = 0; // parar de cair
      this.position.y = 330; // parar de cair
    } else this.velocity.y += gravity; //cair com gravidade
  }
  attack() {
    this.switchSprite("attack1");
    this.isAttacking = true;
  }

  takeHit() {
    this.switchSprite("takeHit");
    this.health -= 20;
  }

  switchSprite(sprite) {
    //condicão para atacar e nao ser interrompido pelo switch
    if (
      this.image === this.sprites.attack1.image &&
      this.framesCurrent < this.sprites.attack1.framesMax - 1
    )
      return;

    // condicao para o dano nao ser interrompido
    if (
      this.image === this.sprites.takeHit.image &&
      this.framesCurrent < this.sprites.takeHit.framesMax - 1
    )
    return;
      switch (sprite) {
        case "idle":
          if (this.image !== this.sprites.idle.image) {
            this.image = this.sprites.idle.image;
            this.framesMax = this.sprites.idle.framesMax;
            this.framesCurrent = 0;
          }
          break;
        case "run":
          if (this.image !== this.sprites.run.image) {
            this.image = this.sprites.run.image;
            this.framesMax = this.sprites.run.framesMax;
            this.framesCurrent = 0;
          }
          break;
        case "jump":
          if (this.image !== this.sprites.jump.image) {
            this.image = this.sprites.jump.image;
            this.framesMax = this.sprites.jump.framesMax;
            this.framesCurrent = 0;
          }
          break;
        case "fall":
          if (this.image !== this.sprites.fall.image) {
            this.image = this.sprites.fall.image;
            this.framesMax = this.sprites.fall.framesMax;
            this.framesCurrent = 0;
          }
          break;
        case "attack1":
          if (this.image !== this.sprites.attack1.image) {
            this.image = this.sprites.attack1.image;
            this.framesMax = this.sprites.attack1.framesMax;
            this.framesCurrent = 0;
          }
          break;
        case "takeHit":
          if (this.image !== this.sprites.takeHit.image) {
            this.image = this.sprites.takeHit.image;
            this.framesMax = this.sprites.takeHit.framesMax;
            this.framesCurrent = 0;
          }
          break;
      }
  }
}
