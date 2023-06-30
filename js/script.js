let containerProducts = document.querySelector('#containerProducts');
let categories = document.querySelectorAll('.categories');
let amountInCart = document.querySelector('#amount');
let navbarNav = document.querySelector('#navbarNav');
let navbar_toggler = document.querySelector('.navbar-toggler');
let nameProd = document.querySelector('.nameProd');
let addCart;

// Capturamos todos los productos desde products.json
fetch('js/products.json')
  .then(res => res.json())
  .then(products => {
    loadProducts(products)
    categoriesFunc(products)
  })

// Cargamos los productos
function loadProducts(products) {
  containerProducts.innerHTML = '';
  products.forEach(product => {
    if (product.stock > 0) {
      const article = document.createElement('article');
      article.classList.add('product');
      article.innerHTML = `
    <div class="imgProduct">
      <img src="${product.image}" alt="${product.title}">
    </div>
    <div class="content">
      <h2>${product.title}</h2>
      <h3>${product.ref}</h3>
      <p>${formatterPeso.format(product.price)}</p>
      <button class="btn btn-secondary addCart" id="${product.id}">Agregar</button>
    </div>`
      containerProducts.append(article);
    }
  })
  updateProducts(products)
};

// Convertimos el valor en pesos
const formatterPeso = new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
  minimumFractionDigits: 0
})

// Los categorizamos por instrumento
function categoriesFunc(products_cat) {
  categories.forEach(category => {
    category.addEventListener('click', (e) => {
      categories.forEach(category => category.classList.remove('active'))
      e.target.classList.add('active')
      if (e.target.id != 'all') {
        const chooseCategory = products_cat.filter(product => product.category.id == e.target.id)
        loadProducts(chooseCategory);
        nameProd.innerText = chooseCategory[0].category.name;
      } else {
        loadProducts(products_cat);
        nameProd.innerText = 'Todos los Productos';
      }
      navbarNav.classList.remove('show');
      navbar_toggler.classList.add('collapsed');
    })
  })
};

let putCart;
let productCartLocalS = localStorage.getItem('products_in_cart')
if (productCartLocalS) {
  putCart = JSON.parse(productCartLocalS)
  updateAmount();
} else {
  putCart = [];
};

// Actualizamos los productos
function updateProducts(products_up) {
  addCart = document.querySelectorAll('.addCart')
  addCart.forEach(product => {
    product.addEventListener('click', (e) => {
      let idProduct = e.target.id;
      let addProduct = products_up.find(product => product.id == idProduct)
      if (putCart.some(product => product.id == idProduct)) {
        addProduct.amount++;
      } else {
        addProduct.amount = 1;
        putCart.push(addProduct)
      }
      updateAmount();
      localStorage.setItem('products_in_cart', JSON.stringify(putCart))
    })
  })
};

// Actualizamos en número del carrito
function updateAmount() {
  let amount = putCart.reduce((acu, product) => acu + product.amount, 0);
  amountInCart.innerText = amount;
};
