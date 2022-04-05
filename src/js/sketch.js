let currentImg;
let imgQT;
let toleranceInput;
let tolerance = 100;
let computedWidth;
let computedHeight;

function preload() {
  const img = loadImage("assets/choosen-one.jpeg");
  console.log(img);
}

function setup() {
  createCanvas(10, 10).parent("preview__canvas");

  // create file input
  const fileInput = createFileInput(handleFile, false);
  fileInput.parent("#form");
  fileInput.class("form__input");
  fileInput.id("file-input");

  // create tolerance input
  toleranceInput = createInput(null, "range");
  toleranceInput.attribute("min", 50);
  toleranceInput.attribute("max", 450);
  toleranceInput.attribute("value", tolerance);
  toleranceInput.parent("form__range-container");
  toleranceInput.class("form__range-input");
  toleranceInput.elt.addEventListener("input", (e) => {
    document.getElementById("tolerance-output").textContent = e.target.value;
    tolerance = e.target.value;
    if (imgQT) {
      const rect = new Rectangle(0, 0, computedWidth, computedHeight);
      imgQT = new ImageQT(currentImg, tolerance, rect);
    }
  });

  // create tolerance value output
  let toleranceSpan = createSpan("Tolerance: ");
  toleranceSpan.parent("#form__range-output");
  let outputSpan = createSpan(`${tolerance}`);
  outputSpan.id("tolerance-output");
  outputSpan.parent("#form__range-output");

  frameRate(5);
}

function draw() {
  if (imgQT) {
    imgQT.show();
  }
}

function handleFile(file) {
  if (file.subtype != "jpeg") return;

  // empty image container and show imaage
  emptyImageContainer();
  const url = file.data;
  const imgEl = document.createElement("img");
  imgEl.src = url;
  document.querySelector(".preview__img").appendChild(imgEl);

  loadImage(file.data, handleImage, handleImageFailure);
}

function handleImage(img) {
  currentImg = img;

  // set canvas width and height respect to image
  computedWidth = img.width % 2 != 0 ? img.width + 1 : img.width;
  computedHeight = img.height % 2 != 0 ? img.height + 1 : img.height;
  resizeCanvas(computedWidth, computedHeight);

  // create ImageQT
  const rect = new Rectangle(0, 0, computedWidth, computedHeight);
  imgQT = new ImageQT(currentImg, tolerance, rect);
}

function handleImageFailure(e) {
  console.warn("couldn't load the provided image.");
  console.error(e);
}

function emptyImageContainer() {
  const container = document.querySelector(".preview__img");
  if (!container.firstChild) return;
  container.removeChild(container.firstChild);
  emptyImageContainer();
}
