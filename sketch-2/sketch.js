"use strict";
let layer;

let sceneSize, centerX, centerY, objSize, halfWidth;

let waterdrops = [];

let fillAmount = 1;
let waterDropped = 0;
let totalWaterDrops = 5;
let fillY = 0;
let easeFill, easeTriangle;

let liquidColor;
let colorTarget;

let states = {
  WATER_DROP: 0,
  TRIANGLE: 1,
};

let colorPalette;

let currState = states.WATER_DROP;

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);

  colorPalette = [
    color("yellow"),
    color("green"),
    color("blue"),
    color("orange"),
    color("red"),
  ];

  liquidColor = color("black");
  colorTarget = color("black");

  layer = createGraphics(width, height);

  sceneSize = min(width, height);

  centerX = width / 2;
  centerY = height / 2;
  objSize = sceneSize / 2;
  halfWidth = objSize / tan(60);

  layer.angleMode(DEGREES);

  calcFill();
  easeFill = new Easing({
    duration: 1000,
    from: fillY,
  });

  easeTriangle = new Easing({
    from: 0,
    to: 1,
    duration: 1000,
  });

  easeTriangle.onEnd = () => {
    console.log("transition NOW");
    // window.location.reload();
  };
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function changeState(newState) {
  currState = newState;

  switch (currState) {
    case states.TRIANGLE:
      colorTarget = color("black");
      easeTriangle.start({});
      break;
  }
}

function draw() {
  background(255);

  liquidColor = lerpColor(liquidColor, colorTarget, 0.05);

  switch (currState) {
    case states.WATER_DROP:
      layer.push();

      layer.clear();
      layer.fill(liquidColor);
      layer.noStroke();

      sceneSize = min(width, height);

      centerX = width / 2;
      centerY = height / 2;
      objSize = sceneSize / 2;
      halfWidth = objSize / tan(60);

      drawArc(layer);
      drawArc();

      fill(liquidColor);
      noStroke();

      waterdrops.forEach((waterdrop) => waterdrop.draw());

      drawingContext.filter = "url(#metaball)";
      image(layer, 0, 0);
      drawingContext.filter = "none";
      //   drawArc();
      //   centerX/2
      //   let y = centerY / 2;

      push();
      fill(255);

      //   const y = lerp( - objSize, centerY / 2, fillAmount);

      //   console.log(y);

      rect(0, easeFill.value - objSize, width, objSize);
      pop();

      //   ellipse(centerX, centerY, sceneSize);

      easeFill.update(deltaTime);
      //   ellipse(mouseX, y, 100);

      layer.pop();
      break;
    case states.TRIANGLE:
      easeTriangle.update(deltaTime);

      const t = easeTriangle.value;

      fill(liquidColor);

      let x = centerX;
      let y = lerp(height, centerY, t);
      let s = lerp(0.2, 1, t);

      translate(x, y);
      scale(s);

      triangle(
        0,
        -objSize / 2,
        halfWidth,
        objSize / 2,
        -halfWidth,
        objSize / 2
      );

      break;
  }
}

function checkCollision() {
  return (
    dist(mouseX, mouseY, centerX, centerY * 0.5) < sceneSize / 2 &&
    mouseY > fillY
  );
}

function drawArc(layer = window) {
  layer.fill(liquidColor);
  layer.arc(centerX, centerY * 0.5, sceneSize, sceneSize, 0, 180);
}

function calcFill() {
  fillY = centerY / 2 - fillAmount * objSize + objSize;
}

function mousePressed() {
  const collided = checkCollision();

  //   fillAmount = totalWaterDrops - waterDropped;

  //   const angle = atan2(mouseY - y, mouseX - centerX);
  //   translate(centerX, y);
  //   rotate(angle);
  //   ellipse(sceneSize / 3, 0, 100);

  if (collided) {
    colorTarget = colorPalette[waterDropped];
    waterDropped++;
    fillAmount = pow(map(waterDropped, 0, totalWaterDrops, 1, 0), 0.6);

    // console.log(fillAmount, pow(fillAmount, 0.5));

    calcFill();
    // console.log(fillAmount);
    const isLast = fillAmount === 0;

    easeFill.start({
      to: fillY,
    });

    const radius = sceneSize / 2;
    const x = centerX;

    let innerRadius = radius - 10;

    let distX = constrain(x - mouseX, -innerRadius, innerRadius);

    const y = Math.sqrt(innerRadius ** 2 - distX ** 2);

    //   let angle = map(mouseX, x - radius, x + radius, 180, 0, true);

    //   const x1 = x + cos(angle) * radius;
    //   const y1 = y + sin(angle) * radius;

    waterdrops.push(
      new WaterDrop({
        x: mouseX,
        y: y + centerY / 2,
        last: isLast,
      })
    );
  }
}

function dropLanded() {
  setTimeout(() => {
    changeState(states.TRIANGLE);
  }, 1000);
}

// function draw() {

//     drawwater();
//     if (mouseIsPressed) {
//     if (level2>50){
//     level1 -= 1.5;
//     level2 -= 1.5;}
//     }
//   }

//   function drawwater() {

//       background(254,254,255);

//       fill(100,200,255,200);

//       beginShape();
//       var xoff = 0;
//       // Iterate over horizontal pixels
//       for (var x = 0; x <= width; x += 10) {
//           // Calculate a y value according to noise, map to

//           // Option #1: 2D Noise
//            y = map(noise(xoff, yoff), 0, 1, level1, level2);

//           // Set the vertex
//           vertex(x, y);
//           // Increment x dimension for noise
//           xoff += 0.05;
//       }
//       // increment y dimension for noise
//       yoff += 0.03;
//       vertex(width, height);
//       vertex(0, height);
//       endShape(CLOSE);
//   }
