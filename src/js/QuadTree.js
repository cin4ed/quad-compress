import Boundary from "./Boundary.js";

export default class QuadTree {
  constructor(x, y, w, h, cap) {
    this.boundary = new Boundary(x, y, w, h);
    this.cap = cap;
    this.pixels = [];
    this.subdivided = false;
    this.nw = null;
    this.ne = null;
    this.sw = null;
    this.se = null;
  }

  insert(pixel) {
    if (!this.boundary.contains(pixel)) return false;

    if (this.subdivided) {
      return (
        this.nw.insert(pixel) ||
        this.ne.insert(pixel) ||
        this.sw.insert(pixel) ||
        this.se.insert(pixel)
      );
    }

    this.pixels.push(pixel);

    if (this.pixels.length > this.cap) {
      this.subdivide();
      this.subdivided = true;
      for (let p of this.pixels) {
        this.nw.insert(p) ||
          this.ne.insert(p) ||
          this.sw.insert(p) ||
          this.se.insert(p);
        // this.nw.insert(p);
        // this.ne.insert(p);
        // this.sw.insert(p);
        // this.se.insert(p);
      }
      this.pixels = [];
      return true;
    }

    return true;
  }

  subdivide() {
    const x = this.boundary.x;
    const y = this.boundary.y;
    const w = this.boundary.w;
    const h = this.boundary.h;

    this.nw = new QuadTree(x, y, w / 2, h / 2, this.cap);
    this.ne = new QuadTree(x + w / 2, y, w / 2, h / 2, this.cap);
    this.sw = new QuadTree(x, y + h / 2, w / 2, h / 2, this.cap);
    this.se = new QuadTree(x + w / 2, y + h / 2, w / 2, h / 2, this.cap);
  }

  show() {
    noFill();
    rect(this.boundary.x, this.boundary.y, this.boundary.w, this.boundary.h);
    for (let p of this.pixels) {
      square(p.x, p.y, 1);
    }
    if (this.subdivided) {
      this.nw.show();
      this.ne.show();
      this.sw.show();
      this.se.show();
    }
  }
}
