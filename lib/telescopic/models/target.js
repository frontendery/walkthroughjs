import { TARGET_CLASS, Z_TOP } from '../constants';

export default class Target {
  constructor(element) {
    this.node = element;
  }

  promote() {
    this.node.classList.add(TARGET_CLASS);
    this.node.style.zIndex = Z_TOP;
    if (getComputedStyle(this.node).position === 'static') {
      this.node.style.position = 'relative';
    }
  }

  restore() {
    this.node.classList.remove(TARGET_CLASS);
    this.node.style.removeProperty('z-index');
    this.node.style.removeProperty('position');
  }

  getCalculatedPosition() {
    const { pageYOffset, pageXOffset } = window;
    const elementRect = this.node.getBoundingClientRect();

    return {
      top: elementRect.top + pageYOffset,
      left: elementRect.left + pageXOffset,
      right: elementRect.left + pageXOffset + elementRect.width,
      bottom: elementRect.top + pageYOffset + elementRect.height,
    };
  }
}
