import ImageInput from "./ImageInput.js";

const image_input = document.getElementById("file-input");
const image_receiver = new ImageInput(image_input);

image_receiver.on_image_change = (image) => {
  console.log(image);

  // construir el quadtree

  // en base al quadtree creamos un imagedata o array ui8clamp mierda
  // renderizamos la imagen en el canvas

  const canvas = document.getElementById("canvas");
  console.log("bitmap.width % 2: " + (image.bitmap.width % 2));
  console.log("bitmap.height % 2: " + (image.bitmap.height % 2));
  canvas.width = image.bitmap.width;
  canvas.height = image.bitmap.height;

  const ctx = canvas.getContext("2d");
  ctx.putImageData(image.data, 0, 0);
};

/*
  TODO

    QuadTree:
    - implement the image compress algorithm

    Drawer:
    - draw the compression process to a canvas

  emptyPreview() {
    if (!this.preview_container.firstChild) return;
    this.preview_container.removeChild(this.preview_container.firstChild);
    this.emptyPreview();
  }

  updateFilePreview() {
    // in this case in only an image
    const image = document.createElement("img");
    image.src = URL.createObjectURL(this.file);

    this.fileDOMElement = image;
    // console.log(this.preview_container)
    this.preview_container.appendChild(image);
  }

  empty_canvas_container() {
    if (!this.canvas_container.firstChild) return;
    this.canvas_container.removeChild(this.canvas_container.firstChild);
    this.empty_canvas_container();
  }
*/
