// product-item.js
const ADD_BTN_MSG = 'Add to Cart';
const RMV_BTN_MSG = 'Remove from Cart';
const OCC_GRID_ID = 'existance';
const COUNT_ID = 'cart_count';
const STYLE_PATH = 'styles/styles.css'
/* Constants */



class ProductItem extends HTMLElement {
  // TODO
  static item_count = 0;
  static cart_count = document.getElementById('cart-count');
  static cart_table = [];
  constructor(index, id, title, price, description, category, image, start_in_cart) {
    super();
    let in_cart = start_in_cart;
    let styling = document.createElement('link');
    styling.setAttribute('rel', 'stylesheet');
    styling.setAttribute('href', STYLE_PATH);

    let root = this.attachShadow({ mode: 'open' });
    let product = document.createElement('li');
    product.setAttribute('class', 'product');
    let product_img = document.createElement('img');
    product_img.setAttribute('src', image);
    product_img.setAttribute('alt', title);
    let product_title = document.createElement('p');
    product_title.setAttribute('class', 'title');
    product_title.innerHTML = title;
    let product_price = document.createElement('p');
    product_price.setAttribute('class', 'price');
    product_price.innerHTML = price;
    let add_button = document.createElement('button');
    add_button.innerHTML = ADD_BTN_MSG;
    if (in_cart === true) {
      add_button.innerHTML = RMV_BTN_MSG;
    }


    product.appendChild(product_img);
    product.appendChild(product_title);
    product.appendChild(product_price);
    product.appendChild(add_button);
    root.appendChild(product);
    root.appendChild(styling);

    function add_item() {
      if (in_cart === false) {
        add_button.innerHTML = RMV_BTN_MSG;
        in_cart = true;
        ProductItem.item_count += 1;
        ProductItem.cart_count.innerHTML = ProductItem.item_count;
        ProductItem.cart_table[index] = true;
      }
      else if (in_cart === true) {
        add_button.innerHTML = ADD_BTN_MSG;
        in_cart = false;
        ProductItem.item_count -= 1;
        ProductItem.cart_count.innerHTML = ProductItem.item_count;
        ProductItem.cart_table[index] = false;

      }
      localStorage.setItem(OCC_GRID_ID, ProductItem.cart_table.toString());
      localStorage.setItem(COUNT_ID, ProductItem.item_count.toString());
    }
    add_button.addEventListener('click', add_item);
  }


}

customElements.define('product-item', ProductItem);