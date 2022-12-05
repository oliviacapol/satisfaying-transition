let angle = -90;
let relou = angle - 90;
let base = -180;

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background(255);

  noStroke();
  const sceneSize = min(width, height);
  const centerX = width / 2;
  const centerY = height / 2;
  const objSize = sceneSize / 3;
  const size = 30 * 4.5;

  circles();

  //   la condition pour l'arc exterieur
  if (
    mouseIsPressed == true &&
    mouseX < centerX - objSize + size / 2 + size / 2 &&
    mouseX > centerX - objSize
  ) {
    bigArc();
  }

  if (mouseIsPressed == false && relou == 360) {
    strokeWeight(size + 2);
    stroke("violet");
    noFill();
    arc(centerX, centerY, sceneSize / 1.88, sceneSize / 1.88, 180, 360);
  }

  // la condition pour l'arc intérieur
  if (
    mouseIsPressed == true &&
    mouseX < centerX - objSize / 2 + size / 4 + size / 2 &&
    mouseX > centerX - objSize / 2 - size / 4
  ) {
    littleArc();
  }
}

function circles() {
  const sceneSize = min(width, height);
  const centerX = width / 2;
  const centerY = height / 2;
  const objSize = sceneSize / 3;
  const size = 30 * 4.5;
  //   les cercles à la base des arcs
  fill("violet");
  circle(centerX - objSize + size / 2, centerY, size);
  fill("green");
  circle(centerX - objSize / 2 + size / 4, centerY, size);
  fill("blue");
  circle(centerX, centerY, size);
  fill("green");
  circle(centerX + objSize / 2 - size / 4, centerY, size);
  fill("violet");
  circle(centerX + objSize - size / 2, centerY, size);
}

function bigArc() {
  let relou = angle - 90;
  let base = -180;

  const sceneSize = min(width, height);
  const centerX = width / 2;
  const centerY = height / 2;
  const objSize = sceneSize / 3;
  const size = 30 * 4.5;

  strokeWeight(size + 2);
  stroke("violet");
  noFill();
  arc(centerX, centerY, sceneSize / 1.88, sceneSize / 1.88, base, relou);

  // l'évolution de l'angle d'arrivée
  if (relou <= 0) {
    angle++;
  } else {
    relou = 360;
  }

  console.log(relou);
}

function littleArc() {
  let relou1 = angle - 90;
  let base1 = -180;

  const sceneSize = min(width, height);
  const centerX = width / 2;
  const centerY = height / 2;
  const objSize = sceneSize / 3;
  const size = 30 * 4.5;

  strokeWeight(size + 2);
  stroke("green");
  noFill();
  arc(centerX, centerY, sceneSize / 3.78, sceneSize / 3.78, base1, relou1);

  // l'évolution de l'angle d'arrivée
  if (relou1 <= 0) {
    angle++;
  } else {
    relou1 = 360;
  }
}
