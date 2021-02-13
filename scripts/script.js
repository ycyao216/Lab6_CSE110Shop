// Script.js
var container = document.getElementById('product-list');
var item_list = [];

function populate() {
  for (let index in item_list) {
    let product = item_list[index];
    let start_in_cart = false;
    if (ProductItem.cart_table[index] === true) {
      start_in_cart = true;
    }
    let product_element = new ProductItem(
      index,
      product['id'],
      product['title'],
      product['price'],
      product['description'],
      product['category'],
      product['image'],
      start_in_cart
    );
    container.appendChild(product_element);

  }
  ProductItem.item_count = Number(localStorage.getItem('cart_count'));
  ProductItem.cart_count.innerHTML = ProductItem.item_count;
};

function string_to_bool_array(stringified_array) {
  let result = [];
  let string_array = stringified_array.split(',');
  for (let values in string_array) {
    if (string_array[values] === "true") {
      result.push(true);
    }
    else {
      result.push(false);
    }
  }
  return result;
}

window.addEventListener('DOMContentLoaded', () => {
  // TODO
  fetch("https://fakestoreapi.com/products")
    .then(response => response.json())
    .then(data => {
      for (let i = 0; i < data.length; i++) {
        item_list.push(data[i]);
        ProductItem.cart_table.push(false);
        localStorage.setItem(i.toString(), JSON.stringify(data[i]));
      }
      if (localStorage.getItem('existance') != null) {
        console.log(localStorage.getItem('existance'));
        ProductItem.cart_table = string_to_bool_array(localStorage.getItem('existance'));
      }
      console.log(ProductItem.cart_table);
      populate();
    });


});