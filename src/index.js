import Rectangle from './rectangle';
import './index.scss';

export default class SimpleMath {
  constructor(args) {
    console.log(args);
  }

  getRectangle(x, y) {
    const fx = new Rectangle();

    return fx.calculate(x, y);
  }
}
