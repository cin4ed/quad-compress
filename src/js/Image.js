export default class ImageApp {
  constructor(file) {
    this.file = file;
    this.bitmap;
    this.data;
  }

  async on_ready() {
    this.bitmap = await createImageBitmap(this.file);
    this.data = this.get_image_data(this.bitmap);
  }

  get_image_data(bitmap) {
    const canvas = document.createElement("canvas");

    canvas.width = bitmap.width;
    canvas.height = bitmap.height;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(bitmap, 0, 0);

    const image_data = ctx.getImageData(0, 0, bitmap.width, bitmap.height);
    return image_data;
  }
}
