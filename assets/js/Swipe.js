const X_THRESHOLD = 300;

class Swipe {
  x;
  y;
  finalX;
  finalY;
  element;
  percentage;
  constructor(x, y, element) {
    this.x = x;
    this.y = y;
    this.finalX = x;
    this.finalY = y;
    this.element = element;
    this.percentage = 0;
    element.style.transition = "none";
    window.addEventListener("pointermove", this.onMove);
    window.addEventListener("pointerup", this.onUp);
  }
  onMove = e => {
    const { x, y, pressure } = e;
    this.finalX = x;
    this.finalY = y;
    if (!(pressure > 0)) return;
    let percentage = (this.finalX - this.x) / X_THRESHOLD;
    if (percentage > 1) percentage = 1;
    if (percentage < -1) percentage = -1;
    this.percentage = percentage;

    requestAnimationFrame(() => {
      const deltaX = x - this.x;
      const deltaY = y - this.y;
      this.element.style.boxShadow = `0 0 20px hsla(${
        percentage > 0 ? "100" : "360"
      }, 100%, 40%, ${Math.abs(percentage)})`;
      console.log(this.element.style.transform);
      this.element.style.transform = `translate(-50%, -50%) translate(${deltaX}px, ${deltaY}px) rotate(${
        deltaX / 20
      }deg)`;
    });
  };

  onUp = () => {
    window.removeEventListener("pointerup", this.onUp);
    window.removeEventListener("pointermove", this.onMove);
    console.log(this.percentage);
    if (this.percentage === 1) this.accept();
    if (this.percentage === -1) this.reject();
    requestAnimationFrame(() => {
      this.element.style.transition = "400ms";
      this.element.style.transform = "translate(-50%, -50%)";
      this.element.style.boxShadow = null;
    });
  };

  accept = () => {
    console.log("accepted");
  };
  reject = () => {
    console.log("rejected");
  };
}

export default Swipe;
