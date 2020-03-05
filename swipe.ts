class SwipeEvent {
  startX: number;
  deltaX: number;
  startY: number;
  deltaY: number;
  elem: EventTarget;

  constructor() {
    document.addEventListener('touchstart', this.tStart, false);
    document.addEventListener('touchmove', this.tMove, false);
    document.addEventListener('touchend', this.tEnd, false);
  }

  private tStart = (e: TouchEvent) => {
    this.elem = e.target;
    this.deltaX = 0;
    this.deltaY = 0;
    this.startX = e.touches[0].clientX;
    this.startY = e.touches[0].clientY;
  }

  private tMove = (e: TouchEvent) => {
    if (this.elem === e.target) {
      this.deltaX = this.startX - e.touches[0].clientX;
      this.deltaY = this.startY - e.touches[0].clientY;
    }
  }

  private tEnd = (e: TouchEvent) => {
    const dX = Math.abs(this.deltaX);
    const dY = Math.abs(this.deltaY);
    if (dX > dY) {
      (this.startX - dX) > 0
        ? this.elem.dispatchEvent(new CustomEvent('swipe-left', { bubbles: true }))
        : this.elem.dispatchEvent(new CustomEvent('swipe-right', { bubbles: true }));
    } else if (dX < dY) {
      (this.startY - dY) > 0
      ? this.elem.dispatchEvent(new CustomEvent('swipe-up', { bubbles: true }))
      : this.elem.dispatchEvent(new CustomEvent('swipe-down', { bubbles: true }));
    }
  }
}

new SwipeEvent();