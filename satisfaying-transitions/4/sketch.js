const path = [
  { x: 7, y: 3 },
  { x: 7, y: 2 },
  { x: 9, y: 2 },
  { x: 9, y: 0 },
  { x: 8, y: 0 },
  { x: 8, y: 1 },
  { x: 7, y: 1 },
  { x: 7, y: 0 },
  { x: 6, y: 0 },
  { x: 6, y: 2 },
  { x: 5, y: 2 },
  { x: 5, y: 0 },
  { x: 4, y: 0 },
  { x: 4, y: 2 },
  { x: 3, y: 2 },
  { x: 3, y: 0 },
  { x: 0, y: 0 },
  { x: 0, y: 1 },
  { x: 2, y: 1 },
  { x: 2, y: 2 },
  { x: 0, y: 2 },
  { x: 0, y: 6 },
  { x: 1, y: 6 },
  { x: 1, y: 5 },
  { x: 2, y: 5 },
  { x: 2, y: 6 },
  { x: 3, y: 6 },
  { x: 3, y: 5 },
  { x: 4, y: 5 },
  { x: 4, y: 6 },
  { x: 9, y: 6 },
  { x: 9, y: 3 },
  { x: 8, y: 3 },
  { x: 8, y: 5 },
  { x: 7, y: 5 },
  { x: 7, y: 4 },
  { x: 6, y: 4 },
  { x: 6, y: 5 },
  { x: 5, y: 5 },
  { x: 5, y: 4 },
  { x: 1, y: 4 },
  { x: 1, y: 3 },
  { x: 2, y: 3 },
];

let columns = 10;
let ranges = 7;
let totalD = 0;
let direction;

let ratio;

function setup() {
  createCanvas(windowWidth, windowHeight);

  stroke(0);
  strokeWeight(2);
  fill(0);
  angleMode(DEGREES);

  const sceneSize = min(width, height);

  const centerX = width / 2;
  const centerY = height / 2;
  const objSize = sceneSize / 2;

  // push(new Apple({ color: color("red"), way: -1 }));

  for (let i = 0; i < path.length - 1; i++) {
    const p1 = path[i];
    const p2 = path[i + 1];

    const d = dist(p1.x, p1.y, p2.x, p2.y);
    totalD += d;
  }
  ratio = columns / ranges;

  console.log(ratio);
  strokeJoin(ROUND);

  //strokeJoin(ROUND)
  strokeCap(PROJECT);
  //stroke
}

function getAngle(progress) {
  let reachD = 0;
  let p1, p2;

  for (let i = 0; i < path.length - 1; i++) {
    p1 = path[i];
    p2 = path[i + 1];

    const d = dist(p1.x, p1.y, p2.x, p2.y);
    reachD += d;

    if (reachD > progress) {
      break;
    }
  }

  const angle = atan2(p2.y - p1.y, p2.x - p1.x);
  // console.log(angle)
  return angle;
}

const keyMap = {
  ArrowLeft: 180,
  ArrowUp: -90,
  ArrowDown: 90,
  ArrowRight: 0,
};

let progress = 0;
let oldDirection;

function draw() {
  background("white");

  // stroke(0);
  // strokeWeight(2);
  // fill(0);

  // rectMode(CENTER);
  // rect(centerX, centerY, objSize, objSize / 4);

  stroke(255);
  noFill();
  strokeWeight(1 - 0.1);

  fill(255, 0, 0);
  stroke(255, 0, 0);
  ellipse(width / 1.05, height / 3, width / 36);

  //const isPointInPath = drawingContext.isPointInPath(circle, event.offsetX, event.offsetY);

  ratio = height / ranges / (width / columns);
  scale(width / columns, height / ranges);
  translate(0.5, 0.5);

  direction = getAngle(progress);

  let speed = 0;
  if (direction === keyMap[key]) {
    oldDirection = direction;
    speed = 0.1;
  }

  if (oldDirection === direction) speed = 0.1;

  //progress = map(mouseX, 0, width, 0, totalD)

  progress += speed;

  setLineDash([progress, totalD]);

  const c = drawingContext;

  const firstPos = path[0];
  c.beginPath();

  c.moveTo(firstPos.x, firstPos.y);

  path.forEach((pos) => {
    c.lineTo(pos.x, pos.y);
  });

  c.strokeStyle = "black";
  c.stroke();

  setLineDash();
  c.strokeStyle = "rgba(0, 0, 0, 0.09)";
  c.stroke();

  const isPointInPath = c.isPointInStroke(
    mouseX * pixelDensity(),
    mouseY * pixelDensity()
  );
  //console.log(isPointInPath)

  if (isPointInPath) fill("red");

  noStroke();
  //ellipse(pos.x, pos.y, 1)

  return;
  background("black");
  const thickness = 20;
  strokeWeight(thickness);
  setLineDash([0, mouseX, 1, width]); //another dashed line pattern
  line(0, height / 2, width, height / 2);

  ellipse(width / 2, height / 2, width);
}

function setLineDash(list = []) {
  drawingContext.setLineDash(list);
}

function screenToWorld(x, y) {
  const ctxOrMatrix = drawingContext.getTransform();
  const imatrix = ctxOrMatrix.invertSelf();

  x *= pixelDensity();
  y *= pixelDensity();

  return {
    x: x * imatrix.a + y * imatrix.c + imatrix.e,
    y: x * imatrix.b + y * imatrix.d + imatrix.f,
  };
}
