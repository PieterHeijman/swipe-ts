class SwipeEvent {
  sX: number;
  dX: number;
  sY: number;
  dY: number;
  el: EventTarget;

  constructor() {
    document.addEventListener('touchstart', this.tS, false);
    document.addEventListener('touchmove', this.tM, false);
    document.addEventListener('touchend', this.tE, false);
  }

  private tS = (e: TouchEvent) => {
    this.el = e.target;
    this.dX = 0;
    this.dY = 0;
    this.sX = e.touches[0].clientX;
    this.sY = e.touches[0].clientY;
  }

  private tM = (e: TouchEvent) => {
    if (this.el === e.target) {
      this.dX = this.sX - e.touches[0].clientX;
      this.dY = this.sY - e.touches[0].clientY;
    }
  }

  private tE = (e: TouchEvent) => {
    const dx = Math.abs(this.dX);
    const dy = Math.abs(this.dY);
    const conf = { bubbles: true };
    let ev = null;

    if (dx > dy) {
      (this.sX - dx) > 0
        ? ev = 'left'
        : ev = 'right';
    } else if (dx < dy) {
      (this.sY - dy) > 0
      ? ev = 'up'
      : ev = 'down';
    }

    if (ev) {
      this.el.dispatchEvent(new CustomEvent(`swipe-${ev}`, conf))
    }
  }
}

new SwipeEvent();
