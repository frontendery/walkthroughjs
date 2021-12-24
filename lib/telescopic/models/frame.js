import { FRAME_ID, Z_MIDDLE } from '../constants';

export default class Sight {
  constructor(position, config) {
    this.position = position;
    this.config = config;
  }

  attachNode() {
    this.node = document.createElement('div');
    this.node.id = FRAME_ID;
    document.body.appendChild(this.node);
  }

  add() {
    if (document.getElementById(FRAME_ID)) {
      return Promise.resolve(null);
    }

    this.attachNode();

    this.node.style.opacity = '0';

    if (this.config.animate) {
      this.node.style.transition = 'opacity .3s';
    }

    // Show the frame element
    return new Promise(resolve => {
      window.setTimeout(() => {
        this._applyStyle();
        resolve(this.node);
      });
    });
  }

  update(position) {
    this.position = position;
    this._applyStyle();
  }

  remove() {
    if (!this.node || !this.node.parentElement) return;
    this.node.parentElement.removeChild(this.node);
  }

  _applyStyle() {
    const { top, left, right, bottom } = this.position;

    const sidePadding = this.config.padding;
    const totalPadding = this.config.padding * 2;

    // Take into account padding when calculating dimensions
    const width = right - left + totalPadding;
    const height = bottom - top + totalPadding;

    this.node.style.zIndex = Z_MIDDLE;
    this.node.style.opacity = '1';
    this.node.style.display = 'block';
    this.node.style.position = 'absolute';
    this.node.style.width = `${width}px`;
    this.node.style.height = `${height}px`;
    this.node.style.top = `${top - sidePadding}px`;
    this.node.style.left = `${left - sidePadding}px`;
    this.node.style.backgroundColor = this.config.frameColor;
    this.node.style.borderRadius = '4px';
  }
}
