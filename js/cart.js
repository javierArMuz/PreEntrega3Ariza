let productsInCart = JSON.parse(localStorage.getItem('products_in_cart'));

let emptyCart = document.querySelector('#emptyCart');
let productsCart = document.querySelector('#productsCart');
let cartActions = document.querySelector('#cartActions');
let boughtProduct = document.querySelector('#boughtProduct');
let cleanCart = document.querySelector('.cleanCart');
let total = document.querySelector('#total');
let buyProducts = document.querySelector('#buyProducts');


function loadCart() {

  if (productsInCart && productsInCart.length > 0) {
    productsCart.classList.remove('disabled')
    cartActions.classList.remove('disabled')

    productsInCart.innerHTML = '';

    productsInCart.forEach(product => {
      const div = document.createElement('div')
      div.classList.add('productCart')
      div.innerHTML = `
    <div class="img">
        <img src="${product.image}" alt="producto">
      </div>
      <div>
        <small>Titulo</small>
        <p>${product.title}</p>
      </div>
      <div>
        <small>Cant.</small>
        <p class='text-center'>${product.amount}</p>
      </div>
      <div>
        <small>Precio</small>
        <p>$${product.price}</p>
       </div>
      <div>
        <small>Subtotal</small>
        <p>$${product.price * product.amount}</p>
      </div>
      <a href="cart.html">
        <i id="${product.id}" class="bi bi-trash-fill btnDelete"></i>
      </a> `;
      productsCart.append(div)
    });
  } else {
    emptyCart.classList.remove('disabled');
    productsCart.classList.add('disabled');
    cartActions.classList.add('disabled');
  }
  deleteProd();
  updateTotal();
}
loadCart();

// Eliminando producto del carrito
function deleteProd() {
  deleteProduct = document.querySelectorAll('.btnDelete');
  deleteProduct.forEach(button => {
    button.addEventListener('click', (e) => {
      const idButton = e.target.id;
      const index = productsInCart.findIndex(product => product.id == idButton)
      productsInCart.splice(index, 1)
      loadCart()
      localStorage.setItem('products_in_cart', JSON.stringify(productsInCart));
    })
  })
}

// botón de seguir comprando
let btnKeepBuying = document.querySelector('.btnKeepBuying');
btnKeepBuying.addEventListener('click', () => {
  window.location.assign('../index.html')
})

// Limpiar el carrito
cleanCart.addEventListener('click', () => {
  productsInCart.length = 0;
  localStorage.setItem('products_in_cart', JSON.stringify(productsInCart));
  loadCart()
})

// Actualizando el valor total
function updateTotal() {
  const calculateTotal = productsInCart.reduce((acu, product) => acu + (product.price * product.amount), 0);
  total.innerText = `$${calculateTotal}`
}

// Comprando los productos
buyProducts.addEventListener('click', () => {
  productsInCart.length = 0;
  localStorage.setItem('products_in_cart', JSON.stringify(productsInCart));
  emptyCart.classList.add('disabled');
  productsCart.classList.add('disabled');
  cartActions.classList.add('disabled');
  boughtProduct.classList.remove('disabled');
})
