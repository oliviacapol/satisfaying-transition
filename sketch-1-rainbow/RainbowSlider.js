const duration = 300; // ms
let activeEllipse = false;
class RainbowSlider {
  constructor({ color, way }) {
    this.t = 0;
    this.color = color;
    this.dragging = false;
    this.way = way;
    this.angle = 0; // 0 -180
    this.complete = false;
  }

  draw(x, y) {
    push();
    fill(0);

    const hitDiameter = 80;
    const arcDim = x * 2 - hitDiameter;
    const offset = arcDim / 2;
    const mappedMouse = screenToWorld(drawingContext, mouseX, mouseY);
    const way = x > 0 ? 1 : -1;

    // ellipse(hitDiameter / 2 ,0, 100)
    // ellipse(, mappedMouse.y, 100)
    // console.log();
    // console.log(mappedMouse.x);
    if (this.dragging) {
      this.angle =
        180 +
        atan2(
          min(mappedMouse.y, -Number.EPSILON),
          way * -(mappedMouse.x - hitDiameter / 2)
        );
    }

    if (this.complete) this.angle = 180;
    // let angle = ;
    let angle = this.angle;
    angle = constrain(angle, 0, 180);

    // console.log(angle);

    // if (this.way === 1) {
    //   if (angle > 90) angle = 180;
    //   else if (angle >= 0) angle = 0.001;
    //   else angle = constrain(-angle, 0, 180);
    // } else {
    //   if (angle >= 0) angle = 180 - 0.001;
    //   else angle = constrain(-angle, 0, 180);
    // }

    push();

    stroke(this.color);
    noFill();

    strokeWeight(hitDiameter);

    const arcX = x - offset;
    const arcY = 0;

    // if (this.way === 1) {
    //   arc(arcX, arcY, arcDim, arcDim, 360 - angle, 0);
    // } else {
    //   arc(arcX, arcY, arcDim, arcDim, 360 - angle, 0);
    // }
    translate(arcX, arcY);
    scale(way, -1);
    arc(0, 0, arcDim, arcDim, 0, angle);
    pop();

    const normalizedTime = constrain(this.t / duration, 0, 1);
    const dotX = arcX + (cos(angle) * arcDim) / 2;
    const dotY = arcY + (sin(-way * angle) * arcDim) / 2;

    const d = dist(dotX, dotY, mappedMouse.x, mappedMouse.y);
    const isHover = d < hitDiameter / 2;

    // circle(dotX, dotY, hitDiameter);
    fill(0);

    if (
      mouseIsPressed &&
      isHover &&
      !this.dragging &&
      !activeEllipse &&
      !this.complete
    ) {
      this.dragging = true;
      activeEllipse = true;
    } else if (!mouseIsPressed) {
      this.dragging = false;
      activeEllipse = false;
    }

    if (this.dragging) {
      cursor("grabbing");
    }

    if ((isHover && !activeEllipse && !this.complete) || this.dragging) {
      this.t += deltaTime;
    } else {
      this.t -= deltaTime;
    }

    this.done = angle == 180;
    this.t = constrain(this.t, 0, duration);
    if (!this.complete && this.angle === 180) {
      this.complete = true;
      console.log("complete!");
      onCompleteCircle();
    }

    let currDotDiam = angle < 180 ? dotDiameter : 0;

    circle(
      dotX,
      dotY,
      lerp(currDotDiam, hitDiameter, EASING.easeInOutCubic(normalizedTime))
    );

    pop();
  }
}
