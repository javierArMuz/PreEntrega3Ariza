
class Products {
  constructor(id, title, image, price, idcateg) {
    this.id = id,
      this.title = title,
      this.image = image,
      this.price = price,
      this.category = { id: idcateg }
  }
}

let products_list = [];

products_list.push(new Products('piano_1', 'Piano Yamaha PSR E473', 'https://belmusic.com.co/wp-content/uploads/2022/05/Yamaha-PSR-E473-imagen-1.jpg', 1600000, 'piano'));
products_list.push(new Products('piano_2', 'Teclado Casio CT-X700', 'https://www.pianosbogota.com/wp-content/uploads/2018/06/CASIO-CT-X700-bogota%CC%81-colombia.png', 1125000, 'piano'));
products_list.push(new Products('guitar_1', 'Guitarra electroacustica de nylon sdc', 'https://image.cdn1.buscalibre.com/3549458.__RS360x360__.jpg', 1500000, 'guitar'));
products_list.push(new Products('guitar_2', 'Guitarra eléctrica Yamaha PAC 112', 'https://tutempo.com.co/wp-content/uploads/2020/04/Yamaha-PAC-112-diag.png', 1200000, 'guitar'));
products_list.push(new Products('bass_1', 'Bajo electrico milestone 5 cuerdas Negro Peavey', 'https://tecnicalmusic.com/wp-content/uploads/2021/02/Bajo-Electrico-Milestone-5-cuerdas-Negro-Peavey.jpg', 1300000, 'bass'));
products_list.push(new Products('bass_2', ' Bajo eléctrico Ibanez 6 cuerdas GSR206B-WNF', 'https://duosonic.co/wp-content/uploads/2022/10/BAJO-ELECTRICO-6-CUERDAS-IBANEZ-GSR206B-WNF-Duosonic-Bogota.webp', 1400000, 'bass'));
products_list.push(new Products('drums_1', 'Batería acústica Yamaha RDP2F5 (5 Piezas)', 'https://belmusic.com.co/wp-content/uploads/2019/03/RDP2f5-imagen-1.jpg', 600000, 'drums'));
products_list.push(new Products('drums_2', 'Batería Electrónica CARLSBRO ROCK 50', 'https://www.pianosbogota.com/wp-content/uploads/2020/11/MODULO-BATERIA-ELECTRONICA-CARLSBRO-ROCK-50-002.jpg', 700000, 'drums'));
products_list.push(new Products('microphone_1', 'Micrófono Shure SM58-LC', 'https://cdn.shopify.com/s/files/1/0269/4178/4117/products/MIC014_800x800.png?v=1576616415', 600000, 'microphone'));
products_list.push(new Products('microphone_2', 'Micrófono Condensador K440BLACK Vento', 'https://www.sonomarcas.com/wp-content/uploads/2021/05/Microfono-de-condensador-Vento-K440.jpg', 650000, 'microphone'));


let containerProducts = document.querySelector('#containerProducts');
let categories = document.querySelectorAll('.categories');
let addCart;
let amountInCart = document.querySelector('#amount')
let deleteProduct;

// Cargamos los productos
function loadProducts(chooseProduct) {
  containerProducts.innerHTML = ''
  chooseProduct.forEach(product => {
    const article = document.createElement('article');
    article.classList.add('product');
    article.innerHTML = `
    <div class="imgProduct">
      <img src="${product.image}" alt="${product.title}">
    </div>
    <div class="content">
      <h2>${product.title}</h2>
      <p>$${product.price}</p>
      <button class="btn btn-secondary addCart" id="${product.id}">Agregar</button>
    </div>`
    containerProducts.append(article);
  })
  updateProducts()
}
loadProducts(products_list)

// Los categorizamos por instrumento
categories.forEach(category => {
  category.addEventListener('click', (e) => {
    categories.forEach(category => category.classList.remove('active'))
    e.target.classList.add('active')

    if (e.target.id != 'all') {
      const chooseCategory = products_list.filter(product => product.category.id == e.target.id)
      loadProducts(chooseCategory)
    } else {
      loadProducts(products_list)
    }
  })
})

let putCart;
let productCartLocalS = localStorage.getItem('products_in_cart')
if (productCartLocalS) {
  putCart = JSON.parse(productCartLocalS)
  updateAmount();
} else {
  putCart = [];
}

// Actualizamos los productos
function updateProducts() {
  addCart = document.querySelectorAll('.addCart')

  addCart.forEach(product => {
    product.addEventListener('click', (e) => {
      let idProduct = e.target.id;
      let addProduct = products_list.find(product => product.id == idProduct)

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
}

// Actualizamos en número del carrito
function updateAmount() {
  let amount = putCart.reduce((acu, product) => acu + product.amount, 0);
  amountInCart.innerText = amount;
}
