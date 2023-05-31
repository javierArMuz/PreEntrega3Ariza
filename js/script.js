
class Products {
  constructor(name, price, stock) {
    this.name = name,
      this.price = price,
      this.stock = stock
  }

  update_stock(unit) {
    this.stock -= unit
  }

  get_data() {
    console.log('===================');
    console.log('Nombre: ', this.name);
    console.log('Precio: $', this.price);
    console.log('Stock: ', this.stock);
  }
}

let products_list = [];

products_list.push(new Products('Piano', 800000, 2));
products_list.push(new Products('Guitarra', 600000, 2));
products_list.push(new Products('Bajo', 900000, 1));
products_list.push(new Products('Batería', 1300000, 0));
products_list.push(new Products('Micrófono', 600000, 5));

// Mostramos por consola la lista de cada instrumentos
console.log('LISTA DE INSTRUMENTOS');
for (const product of products_list) {
  product.get_data()
}

// Capitalizamos la primera letra y el resto con minúscula
function capitalizarPrimerLetra(str) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

// Actualización de la lista de productos
function update_list() {
  console.log('===================');
  console.log('LISTA ACTUALIZADA DE INSTRUMENTOS');
  for (const product of products_list) {
    product.get_data()
  }
}

// Agregamos en este array cada producto adquirido
let carrito = [];

let name_product = '';


while (name_product != null) {

  name_product = prompt(`Bienvenido/a a la Casa de Instrumentos Musicales.
  ¿Qué instrumento desea adquirir?`);

  if (name_product == null) {
    alert('Gracias por su visita')
    break;
  }

  name_product = capitalizarPrimerLetra(name_product);

  // Utilizando el método find() buscamos el producto en la lista de productos
  result_serch = products_list.find(product => product.name == name_product);

  if (result_serch != undefined && result_serch.stock > 0) {
    let unity = parseInt(prompt(`${result_serch.name} tiene un valor de $${result_serch.price}.
        En el momento contamos con ${result_serch.stock} ${(result_serch.stock > 1) ? 'unidades' : 'unidad'}.
        ¿Cuántas unidades desea adquirir?
        (Ingrese la cantidad en números)`));
    if (unity <= result_serch.stock) {
      result_serch.update_stock(unity)
      update_list();
      let res = result_serch.price * unity;
      carrito.push({ name: result_serch.name, price: res, unity: unity });
      let confirm = parseInt(prompt(`Ha adquirido ${unity} ${result_serch.name} por valor de $${res}.
          ¿Desea adquirir algo más?
          Marque número:
          1 - Si
          2 - No`));
      if (confirm == 1) {
        continue;
      } else {
        // Utilizando el método reduce() sumamos el precio de los productos depositados en el carrito
        let total_result = carrito.reduce((acc, product) => acc += product.price, 0);
        alert(`Detalle de compra:
        El valor total de su compra fue $${total_result}.
        Gracias por su adquisición`);

        console.log('===================');
        console.log('Detalle de compra:');
        for (const product of carrito) {
          console.log(`${product.unity} ${product.name} $${product.price}`)
        }
        console.log(`Valor total: ${total_result}`);
        break;
      }
    } else {
      alert(`En este momento solo contamos con ${result_serch.stock} ${(result_serch.stock > 1) ? 'unidades' : 'unidad'}`);
    }

  } else if (result_serch != undefined && result_serch.stock <= 0) {
    alert('Lo sentimos, en el momento está agotado');
    break;
  } else {
    alert('Producto no encontrado o inténtelo de nuevo');
    continue;
  }
}
