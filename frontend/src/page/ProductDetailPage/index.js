import AbstractPage from '../AbstractPage';
import Controller from './Controller';

const tag = '[ProductDetailPage]';

export default class ProductDetailPage extends AbstractPage {
  constructor(params) {
    console.log(tag, 'contructor');
    super(params);
  }

  async render() {
    return `
    helloworld
    `;
  }

  async after_render() {
    const views = {};
    new Controller(views);
  }
}
