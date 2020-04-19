export default class Particle {
  constructor(x, y, velocityX, velocityY, size, color) {
    this.x = x;
    this.y = y;
    this.velocityX = velocityX;
    this.veloctyY = velocityY;
    this.size = size;
    this.color = color;
    this.dodge = 7.5;         //how much the particle tries to dodge the mouse
  }

  draw(ctx){
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  update(mouse) {
    if (this.x < 0 || this.x > window.innerWidth) this.velocityX *= -1; //flip direction moving when approaching window
    if (this.y < 0 || this.y > window.innerHeight) this.veloctyY *= -1;

    const distance = this.calcDistance(mouse.x, mouse.y);                    //if
    if (distance < mouse.radius + this.size) {
      if (mouse.x < this.x) {
        this.x += this.dodge;
      } else {
        this.x -= this.dodge;
      }
      if (mouse.y < this.y) {
        this.y += this.dodge;
      } else {
        this.y -= this.dodge;
      }

      if (this.x < 0) this.x = 0 + this.size / 2;
      if (this.x > window.innerWidth) this.x = window.innerWidth - this.size / 2;
      if (this.y < 0) this.y = 0 + this.size / 2;
      if (this.y > window.innerHeight) this.y = window.innerHeight - this.size / 2;
    } else{
      this.x += this.velocityX;
      this.y += this.veloctyY;
    }
  }

  calcDistance(otherX, otherY) {
    let deltaX = otherX - this.x;
    let deltaY = otherY - this.y;
    return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
  }
}
