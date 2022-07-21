const X_THRESHOLD = 150;

class Swipe {
  x;
  y;
  finalX;
  finalY;
  element;
  percentage;
  onAccept;
  constructor(event, element, onAccept) {
    const { x, y } = event;
    this.x = x;
    this.y = y;
    this.finalX = x;
    this.finalY = y;
    this.element = element;
    this.onAccept = onAccept;
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
      // Set the shadow around the card to either red or green based on whether they're swiping left or right
      // A hue of 100 is green, a hue of 360 is red. The absolute percentage affects Opacity, so the colour becomes more pronounced the further they swipe.
      this.element.style.boxShadow = `0 0 20px hsla(${
        percentage > 0 ? "100" : "360"
      }, 100%, 40%, ${Math.abs(percentage)})`;

      this.element.style.transform = `translate(-50%, -50%) translate(${deltaX}px, ${deltaY}px) rotate(${
        deltaX / 20
      }deg)`;
    });
  };

  onUp = () => {
    window.removeEventListener("pointerup", this.onUp);
    window.removeEventListener("pointermove", this.onMove);

    if (Math.abs(this.percentage) === 1) {
      const accept = this.percentage === 1;
      this.onAccept(accept, this.element);

      requestAnimationFrame(() => {
        // Disappear the card... with style 😎
        const neg = accept ? "" : "-";
        this.element.style.transition = "400ms";
        this.element.style.opacity = "0";

        this.element.style.transform =
          this.element.style.transform +
          `translate(${neg}200px, 150px) rotate(${neg}120deg) scale(0.5)`;
      });
    } else {
      // Card hasn't been swiped far enough, move it back to original position
      requestAnimationFrame(() => {
        this.element.style.transition = "400ms";
        this.element.style.transform = "translate(-50%, -50%)";
        this.element.style.boxShadow = null;
      });
    }
  };
}

export default Swipe;
