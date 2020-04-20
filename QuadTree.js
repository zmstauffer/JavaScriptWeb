import Rectangle from "./Rectangle.js";
import Point from "./Point.js";

export default class QuadTree {
  constructor(boundary, n) {
    this.boundary = boundary;
    this.capacity = n;
    this.points = [];
    this.divided = false;
  }

  subdivide() {
    const x = this.boundary.x; //setup some local vars to make code more readable (hopefully)
    const y = this.boundary.y;
    const halfWidth = this.boundary.width / 2;
    const halfHeight = this.boundary.height / 2;

    const NERect = new Rectangle(x + halfWidth, y - halfHeight, halfWidth, halfHeight);
    const NWRect = new Rectangle(x - halfWidth, y - halfHeight, halfWidth, halfHeight);
    const SERect = new Rectangle(x + halfWidth, y + halfHeight, halfWidth, halfHeight);
    const SWRect = new Rectangle(x - halfWidth, y + halfHeight, halfWidth, halfHeight);

    this.northEast = new QuadTree(NERect, this.capacity);
    this.northWest = new QuadTree(NWRect, this.capacity);
    this.southEast = new QuadTree(SERect, this.capacity);
    this.southWest = new QuadTree(SWRect, this.capacity);

    this.divided = true;
  }

  insert(point) {
    if (!this.boundary.contains(point)) {
      return false;
    }
    if (this.points.length < this.capacity) {
      this.points.push(point);
      return true;
    } else {
      if (!this.divided) {
        this.subdivide();
      }
      if (this.northEast.insert(point) || this.northWest.insert(point) || this.southEast.insert(point) || this.southWest.insert(point)) return true;
    }
  }

  query(range, found) {
    if (!found) {
      found = [];
    }
    if (!range.intersects(this.boundary)) {
      return found;
    } else {
      for (let p of this.points) {
        if (range.contains(p)) {
          found.push(p);
        }
      }
      if (this.divided) {
        this.northWest.query(range, found);
        this.northEast.query(range, found);
        this.southWest.query(range, found);
        this.southEast.query(range, found);
      }
    }
    return found;
  }

  draw(ctx){
    ctx.strokeStyle = "#fff";
    ctx.beginPath();
    ctx.rect(this.boundary.x - this.boundary.width, this.boundary.y - this.boundary.height, this.boundary.width*2, this.boundary.height*2);
    ctx.stroke();

    if (this.divided){
      this.northEast.draw(ctx);
      this.northWest.draw(ctx);
      this.southEast.draw(ctx);
      this.southWest.draw(ctx);
    }
  }
}
