class Rectangle {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }
}

class ImageQT {
  constructor(img, tolerance, rect) {
    this.img = img;
    this.tolerance = tolerance;
    this.rect = rect;
    this.avgColor = null;
    this.subdivided = null;
    this.nw = null;
    this.ne = null;
    this.sw = null;
    this.se = null;
    this.analize();
  }

  show() {
    if (this.subdivided) {
      this.nw.show();
      this.ne.show();
      this.sw.show();
      this.se.show();
      return;
    } else {
      fill(this.avgColor.r, this.avgColor.g, this.avgColor.b);
      stroke(this.avgColor.r, this.avgColor.g, this.avgColor.b);
      rect(this.rect.x, this.rect.y, this.rect.w, this.rect.h);
      return;
    }
  }

  analize() {
    this.avgColor = this.getAvgColor();

    if (this.imageViolateTolerance()) {
      this.subdivide();
      this.img = null;
      this.subdivided = true;
      return;
    }

    this.img = null;
  }

  subdivide() {
    const x = this.rect.x;
    const y = this.rect.y;
    const w = this.rect.w;
    const h = this.rect.h;

    const nwRect = new Rectangle(x, y, w / 2, h / 2);
    const neRect = new Rectangle(x + w / 2, y, w / 2, h / 2);
    const swRect = new Rectangle(x, y + h / 2, w / 2, h / 2);
    const seRect = new Rectangle(x + w / 2, y + h / 2, w / 2, h / 2);

    // i need to round these bc img.get() doesn't accept float numbers
    const hW = Math.floor(w / 2);
    const hH = Math.floor(h / 2);

    const nwImg = this.img.get(0, 0, hW, hH);
    const neImg = this.img.get(hW, 0, hW, hH);
    const swImg = this.img.get(0, hH, hW, hH);
    const seImg = this.img.get(hW, hH, hW, hH);

    this.nw = new ImageQT(nwImg, this.tolerance, nwRect);
    this.ne = new ImageQT(neImg, this.tolerance, neRect);
    this.sw = new ImageQT(swImg, this.tolerance, swRect);
    this.se = new ImageQT(seImg, this.tolerance, seRect);
  }

  getAvgColor() {
    // OPTIMIZE THIS
    this.img.loadPixels();

    let avgRed = 0;
    let avgGreen = 0;
    let avgBlue = 0;

    for (let y = 0; y < this.img.height; y++) {
      for (let x = 0; x < this.img.width; x++) {
        const i = (y * this.img.width + x) * 4;
        avgRed += this.img.pixels[i + 0];
        avgGreen += this.img.pixels[i + 1];
        avgBlue += this.img.pixels[i + 2];
      }
    }

    const numPixels = this.img.pixels.length / 4;

    avgRed /= numPixels;
    avgGreen /= numPixels;
    avgBlue /= numPixels;

    this.img.updatePixels();

    return {
      r: Math.floor(avgRed),
      g: Math.floor(avgGreen),
      b: Math.floor(avgBlue),
    };
  }

  imageViolateTolerance() {
    // OPTIMIZE THIS

    // could improve this (better method for shit)
    this.img.loadPixels();
    for (let i = 0; i < this.img.pixels.length; i += 4) {
      const r = this.img.pixels[i + 0];
      const g = this.img.pixels[i + 1];
      const b = this.img.pixels[i + 2];

      // const rgbSum = r + g + b;
      // const avgRgbSum = this.avgColor.r + this.avgColor.g + this.avgColor.b;
      // if (Math.abs(rgbSum - avgRgbSum) > this.tolerance) return true;

      if (
        Math.abs(this.avgColor.r - r) > this.tolerance ||
        Math.abs(this.avgColor.g - g) > this.tolerance ||
        Math.abs(this.avgColor.b - b) > this.tolerance
      )
        return true;
    }
    this.img.updatePixels();
    return false;
  }
}
