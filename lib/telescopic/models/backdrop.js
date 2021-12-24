import { BACKDROP_ID, Z_BOTTOM } from '../constants';

export default class Background {
  constructor(config) {
    this.config = config;
  }

  attachNode() {
    this.node = document.createElement('div');
    this.node.id = BACKDROP_ID;
    document.body.appendChild(this.node);
  }

  add() {
    if (document.getElementById(BACKDROP_ID)) {
      return Promise.resolve(null);
    }

    this.attachNode();

    this.node.style.opacity = '0';

    if (this.config.animate) {
      this.node.style.transition = 'opacity .3s';
    }

    return new Promise(resolve => {
      window.setTimeout(() => {
        this.node.style.zIndex = Z_BOTTOM;
        this.node.style.opacity = '0.75';
        this.node.style.position = 'fixed';
        this.node.style.inset = '0';
        this.node.style.backgroundColor = this.config.backdropColor;

        resolve();
      });
    });
  }

  remove() {
    if (!this.node || !this.node.parentElement) return;
    this.node.parentElement.removeChild(this.node);
  }
}
