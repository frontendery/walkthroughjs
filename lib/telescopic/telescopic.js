import Backdrop from './models/backdrop';
import Frame from './models/frame';
import Target from './models/target';

export default class Telescopic {
  constructor(options) {
    this.config = {
      padding: '6',
      frameColor: 'white',
      backdropColor: 'black',
      animate: true,
      ...options,
    };
  }

  addBackdrop() {
    this.backdrop = new Backdrop(this.config);
    return this.backdrop.add();
  }

  removeBackdrop() {
    if (!this.backdrop) return;
    this.backdrop.remove();
  }

  focus(element, frameConfig = {}) {
    this.target = new Target(element);
    this.frame = new Frame(this.target.getCalculatedPosition(), {
      ...this.config,
      ...frameConfig,
    });

    this.target.promote();
    return this.frame.add();
  }

  unfocus() {
    this.frame.remove();
    this.target.restore();
  }

  refresh() {
    this.frame.update(this.target.getCalculatedPosition());
  }

  clear() {
    this.backdrop.remove();
    this.target.restore();
    this.frame.remove();
  }
}
