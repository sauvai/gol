let pDraw;
let fps = parseInt(document.getElementById("Framerate").value, 10)
// let fps = 30;

let lastFps = fps;

const thickness = 2;
const boxSize = 20;

let width = parseInt(document.getElementById("Width").value, 10);
let height = parseInt(document.getElementById("Height").value, 10);

let canvasWidth = width * (boxSize + thickness) + thickness;
let canvasHeight = height * (boxSize + thickness) + thickness;

let auto = false;

let g = new gol(width, height);

document.getElementById("NextStep").onclick = function() {
  g.update();
};

document.getElementById("Start").onclick = function() {
  auto = !auto;
  document.getElementById("Start").innerHTML = (auto ? "Pause" : "Start");
};

document.getElementById("Set").onclick = function() {
  width = parseInt(document.getElementById("Width").value, 10);
  height = parseInt(document.getElementById("Height").value, 10);

  g = new gol(width, height);
  canvasWidth = width * (boxSize + thickness) + thickness;
  canvasHeight = height * (boxSize + thickness) + thickness;
  resizeCanvas(canvasWidth, canvasHeight);
  auto = false;
  document.getElementById("Start").innerHTML = "Start";
  g.clear();
  g.draw();
};

document.getElementById("LoadSave").onclick = function() {
  g.reset();
  g.draw();
  auto = false;
  document.getElementById("Start").innerHTML = "Start";
  document.getElementById("NextStep").innerHTML = "Next Step (0)";
};

document.getElementById("Save").onclick = function() {
  g.save();
};

document.getElementById("Clear").onclick = function() {
  g.clear();
  g.draw();
  auto = false;
  document.getElementById("NextStep").innerHTML = "Next Step (0)";
  document.getElementById("Start").innerHTML = "Start";
};

function addOrRemoveCellFromMouse() {

  let offset = boxSize + thickness;
  let mX = Math.floor(mouseX);
  let mY = Math.floor(mouseY);

  let x = Math.floor(mX / offset);
  let y = Math.floor(mY / offset);
  g.addCell(new Pos(x, y));
  g.draw();
}

function mouseClicked() {
  addOrRemoveCellFromMouse()
}

function setup() {
  pDraw = new PDraw();
  pDraw.initCanvas(canvasWidth, canvasHeight, fps);
}

function draw() {
  lastFps = parseInt(document.getElementById("Framerate").value, 10);

  if (lastFps != fps) {
    fps = lastFps;
    frameRate(fps);
    console.log(frameRate());
    console.log(fps);
  }

  g.draw();
  if (auto) g.update();
}