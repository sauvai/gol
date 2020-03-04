let pDraw;
const canvasWidth = 800;
const canvasHeight = 800;
let auto = false;
const fps = 20;
let g = new gol(20, 20, [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]);

// function initPDraw() {
//   pDraw = new PDraw();
//   pDraw.initCanvas(canvasWidth, canvasHeight, fps);
// }

document.getElementById("NextStep").onclick = function () {
  g.update();
};

document.getElementById("Start").onclick = function () {
  auto = !auto;
  document.getElementById("Start").innerHTML = (auto ? "Pause" : "Start");
};

document.getElementById("Reset").onclick = function () {
  g.reset();
  g.draw();
  auto = false;
  document.getElementById("Start").innerHTML = "Start";
};

function mouseClicked() {
  let thickness = 2;
  let boxSize = 20;
  let offset = boxSize + thickness;
  let mX = Math.floor(mouseX);
  let mY = Math.floor(mouseY);

  console.log(mX, mY);
  let x = Math.floor(mX / offset);
  let y = Math.floor(mY / offset);
  g.addCell(new Pos(x, y), 1);
  g.draw();
  console.log(x, y);
}

function mouseDragged() {
  let thickness = 2;
  let boxSize = 20;
  let offset = boxSize + thickness;
  let mX = Math.floor(mouseX);
  let mY = Math.floor(mouseY);

  console.log(mX, mY);
  let x = Math.floor(mX / offset);
  let y = Math.floor(mY / offset);
  g.addCell(new Pos(x, y), 1);
  g.draw();
  console.log(x, y);
}

function setup() {
  pDraw = new PDraw();
  pDraw.initCanvas(canvasWidth, canvasHeight, fps)
}

function draw() {
  g.draw();
  if (auto) g.update();
}