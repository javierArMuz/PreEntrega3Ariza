let productsInCart = JSON.parse(localStorage.getItem('products_in_cart'));

let emptyCart = document.querySelector('#emptyCart');
let productsCart = document.querySelector('#productsCart');
let cartActions = document.querySelector('#cartActions');
let cleanCart = document.querySelector('.cleanCart');
let total = document.querySelector('#total');
let buyProducts = document.querySelector('#buyProducts');
let calculateTotal;


function loadCart() {
  if (productsInCart && productsInCart.length > 0) {
    emptyCart.classList.add('disabled');
    productsInCart.innerHTML = '';

    productsInCart.forEach(product => {
      const div = document.createElement('div')
      div.classList.add('productCart')
      div.innerHTML = `
      <div class="img">
        <img src="${product.image}" alt="producto">
      </div>
      <div>
        <small>Producto</small>
        <p>${product.title}</p>
        <p>${product.ref}</p>
      </div>
      <div>
        <small>Cant.</small>
        <p class='text-center'>
          <i title="Disminuir" id="${product.id}" class="bi bi-dash lessAmount"></i>
          ${product.amount}
          <i title="Aumentar" id="${product.id}" class="bi bi-plus moreAmount"></i>
        </p>
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
    cartActions.classList.add('disabled');
    productsCart.classList.add('disabled');
    emptyCart.classList.remove('disabled');
  }
  deleteProd();
  updateTotal();
  amountProd();
}
loadCart();

// Eliminando producto del carrito
function deleteProd() {
  let deleteProduct = document.querySelectorAll('.btnDelete');
  deleteProduct.forEach(button => {
    button.addEventListener('click', (e) => {
      const idButton = e.target.id;
      const index = productsInCart.findIndex(product => product.id == idButton)
      productsInCart.splice(index, 1)
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
  // Librería sweetAlert2
  Swal.fire({
    title: 'Está seguro?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, vaciar carrito!'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: 'Carrito vacío!',
        text: 'Se han eliminado todos los productos del carrito.',
        icon: 'success',
        showConfirmButton: false,
        timer: 2500
      })
      productsInCart.length = 0;
      localStorage.setItem('products_in_cart', JSON.stringify(productsInCart));
      loadCart();
    }
  })
})

// Actualizando el valor total
function updateTotal() {
  calculateTotal = productsInCart.reduce((acu, product) => acu + (product.price * product.amount), 0);
  total.innerText = `$${calculateTotal}`
}

// Comprando los productos
buyProducts.addEventListener('click', () => {
  if (calculateTotal > 0) {
    productsInCart.length = 0;
    localStorage.setItem('products_in_cart', JSON.stringify(productsInCart));
    // Librería sweetAlert2
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Compra exitosa!',
      text: 'Muchas gracias por su confianza!',
      showConfirmButton: false,
      timer: 2500
    })
    emptyCart.classList.add('disabled');
    productsCart.classList.add('disabled');
    cartActions.classList.add('disabled');
  } else {
    // Librería sweetAlert2
    Swal.fire({
      icon: 'error',
      title: 'Compra no realizada',
      text: 'Le sugerimos añadir productos al carrito'
    })
  }
})

// Botones para incrementar o disminuir la cantidad del mismo producto
function amountProd() {
  let lessAmount = document.querySelectorAll('.lessAmount');
  let moreAmount = document.querySelectorAll('.moreAmount');
  function updateCart() {
    localStorage.setItem('products_in_cart', JSON.stringify(productsInCart));
    location.reload();
  }
  if (lessAmount) {
    lessAmount.forEach(button => {
      button.addEventListener('click', (e) => {
        const idButtonLess = e.target.id;
        const index = productsInCart.findIndex(product => product.id == idButtonLess)
        if (productsInCart[index].amount > 0) {
          productsInCart[index].amount--;
          updateCart();
        }
      })
    })
  } if (moreAmount) {
    moreAmount.forEach(button => {
      button.addEventListener('click', (e) => {
        const idButtonMore = e.target.id;
        const index = productsInCart.findIndex(product => product.id == idButtonMore)
        if (productsInCart[index].amount < productsInCart[index].stock) {
          productsInCart[index].amount++;
          updateCart();
        }
      })
    })
  }
}

