import Rectangle from "./Rectangle.js";

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
    const width = this.boundary.width;
    const height = this.boundary.height;

    const NERect = new Rectangle(x + width / 2, y - height / 2, width / 2, height / 2);
    const NWRect = new Rectangle(x - width / 2, y - height / 2, width / 2, height / 2);
    const SERect = new Rectangle(x + width / 2, y + height / 2, width / 2, height / 2);
    const SWRect = new Rectangle(x - width / 2, y + height / 2, width / 2, height / 2);

    this.northEast = new QuadTree(NERect, this.capacity);
    this.northWest = new QuadTree(NWRect, this.capacity);
    this.southEast = new QuadTree(SERect, this.capacity);
    this.southWest = new QuadTree(SWRect, this.capacity);
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
    if (!this.boundary.intersects(range)) {
      return;
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
}
