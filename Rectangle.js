export default class Rectangle {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  contains(point) {
    return point.x >= this.x - this.width && 
    point.x < this.x + this.width && 
    point.y >= this.y - this.height && 
    point.y < this.y + this.height;
  }

  intersects(range) {
    return !(
      range.x - range.width > this.x + this.width ||
      range.x + range.width < this.x - this.width ||
      range.y - range.height > this.y + this.height ||
      range.y + range.height < this.y - this.height
    );
  }
}
