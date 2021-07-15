import View from '@/page/View';

import { qs } from '@/helper/selectHelpers';

import exampleCooler from '@/public/image/example-cooler.svg';
import interestIcon from '@/public/svg/interest.svg';
import chatIcon from '@/public/svg/chat.svg';
import interestSmallIcon from '@/public/svg/interest-small.svg';

const tag = '[ProductList]';

export default class ProductListView extends View {
  constructor(
    element = qs('#product-list-container'),
    template = new Template(),
  ) {
    console.log(tag, 'constructor');
    super(element);
    this.template = template;
  }

  show(data = []) {
    this.element.innerHTML = this.template.getProductItems(data);
    super.show();
  }
}

class Template {
  getProductItems(products) {
    const result = products.map((product) => this.getProductItem(product));
    return result.join('');
  }
  getProductItem(product) {
    const {
      id,
      title,
      cost,
      location,
      updatedAt,
      thumbnail,
      countOfChat,
      countOfInterest,
    } = product;

    return `
    <article class="content--product" data-id=${id}>
        <div class="content--product--thumbnail">
          ${exampleCooler}
          <!-- TODO img 태그로 교체 후 thumbnail 적용 -->
        </div>
        <div class="content--product--info">
          <div class="content--product--info--top">
            <div>
              <h1>${title}</h1>
              <div class="content--product--info--top--interest" data-id=${id}>
                ${interestIcon}
              </div>
            </div>
            <div>
              <span class="location">${location}</span>
              <span class="time">
              <!-- TODO helper의 메서드 이용-->
              2시간 전
                
                </span>
            </div>
            <div>
              <strong> ${cost} 원 </strong>
            </div>
          </div>
          <div class="content--product--info--bottom">
            ${
              countOfChat &&
              `
                <div>
                    <div class="chat-icon">${chatIcon}</div>
                    <span>${countOfChat}</span>
                </div>
                `
            }
            ${
              countOfInterest &&
              `
                <div>
                    <div class="interest-small-icon">${interestSmallIcon}</div>
                    <span>${countOfInterest}</span>
                </div>
                `
            }
            
          </div>
        </div>
    </article>
    `;
  }
}
