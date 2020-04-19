export default class Circle {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.rSquared = this.r * this.r;
  }

  contains(point) {
    const deltaX = point.x - this.x;
    const deltaY = point.y - this.y;
    const distance = deltaX ** 2 + deltaY ** 2;
    return distance <= this.rSquared;
  }

  intersects(range) {
    //detects intersection between axis-aligned rectangle (range) and this circle
    const deltaX = Math.abs(range.x - this.x);
    const deltaY = Math.abs(range.y - this.y);
    const edges = (deltaX - range.width) ** 2 + (deltaY - range.height) ** 2;

    if (deltaX > (this.r + range.width) || deltaY > (this.r + range.height)) return false; //circle completely outside rectangle
    if (deltaX <= range.width || deltaY <= range.height) return true; //circle center inside rectangle
    return edges <= this.rSquared; //rectangle passes through circle, just not center of it
  }
}
