import ImageApp from "./Image.js";

export default class ImageInput {
  constructor(input) {
    this.acceptedFileTypes = ["image/jpeg"];
    this.input = input;
    this.input.addEventListener("change", this.handle_input_change());
    this.on_image_change = null;
    this.on_image_change_error = null;
  }

  handle_input_change() {
    let self = this;
    return function () {
      let file = self.input.files[0];

      if (!self.valid_file_type(file)) {
        if (self.on_image_change_error) self.on_image_change_error();
        return;
      }

      const image = new ImageApp(file);

      image.on_ready().then(() => {
        if (self.on_image_change) self.on_image_change(image);
      });
    };
  }

  valid_file_type(file) {
    return this.acceptedFileTypes.includes(file.type);
  }
}
