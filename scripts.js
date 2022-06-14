
//#region Elementos DOM

const divTazas = document.getElementById('catalogo-tazas');
const botonesComprar = document.querySelectorAll('.boton-comprar');
// const botonesComprar = Array.from(document.getElementsByClassName('boton-comprar'));

const botonCarrito = document.querySelector('.boton-carrito');
const botonFinalizarCompra = document.getElementById('botonFinalizarCompra');
let totalUnidadesCarrito = document.querySelector('.total-unidades-carrito');
let totalUnidades = 0;

const botonBuscar = document.getElementById('botonBuscar');
const inputBuscar = document.getElementById('inputBuscar');

let carrito = [];

let productosList = [];

//#endregion Elementos DOM


//#region Carga Inicial

// (function load(){
    
//     cargarCarrito();

//     loadProductos();

//     return;
// })();

function load(){

    cargarCarrito();

    loadProductos();

    return;
};


//#endregion Carga Inicial


function cargarCarrito(){

    const carritoLocalStorage = JSON.parse(localStorage.getItem('carritoLocalStorage'));
    if(carritoLocalStorage){
        carrito = carritoLocalStorage;
        totalUnidades = carrito.length;
        totalUnidadesCarrito.innerHTML = totalUnidades;
    }

    return;
}

function loadProductos() {

    fetch('./productos.json')
        .then((response) => response.json())
        .then((jsondata) => {

            productosList = jsondata;

            renderizarProductos();

        })
        .catch((error) => console.log(error + " - No se pudieron cargar los productos."));

    return;

}

function renderizarProductos() {

    divTazas.innerHTML = '';

    productosList.forEach(producto => {

        divTazas.innerHTML += `
            <div class="card bg-light" id="${producto.id}">
                <div class="card-header">
                    <p class="card-text">Categoria: ${producto.categoria}</p>
                </div>
                <img class="card-img-top" src="${producto.imagen}" alt="Card image">
                <div class="card-body">
                    <h5 class="card-title">Modelo: ${producto.nombre}</h5>
                    <p class="card-text">Precio: $${producto.precio}</p>
                    <a href="#" class="btn btn-primary boton-comprar" id="${producto.id}">Comprar</a>
                </div>
                <div class="card-footer text-muted">
                    <p class="card-text">Stock: ${producto.stock}</p>
                </div>
            </div>
        `;
        
    });
    
    // Agregar al carrito
    addClickEventToBuyButtons(productosList);

    return;
}

function mostrarMensajeProductoAgregado(){

    Swal.fire({
        title: 'Felicidades!',
        text: 'Tu producto se ha agregado al carrito!',
        icon: 'success',
        confirmButtonText: 'Aceptar'
    })

    return;
}

function addClickEventToBuyButtons(list) {
    list.forEach(producto => {

        let boton = document.getElementById(producto.id);

        boton.addEventListener('click', () => {
            
            carrito.push(producto);
            
            // Guardamos 
            localStorage.setItem('carritoLocalStorage', JSON.stringify(carrito));

            totalUnidades ++;
            totalUnidadesCarrito.innerHTML = totalUnidades;

            mostrarMensajeProductoAgregado();
            return;

        });

        return;

    });

    return;
}




// Eventos

// Abrir carrito
// botonCarrito.addEventListener('click', () => {

//     console.log('Se abrio el carrito');
//     //location.href = "./carrito.html";

//     return;

// })


function mostrarMensajeErrorBusqueda(){

    Swal.fire({
        title: 'Ouch!',
        text: 'No se han encontrado productos. Intenta buscando algo mas..',
        icon: 'error',
        confirmButtonText: 'Aceptar'
    })

    return;
}

// FIltrar producto
botonBuscar.addEventListener('click', () => {

    let busqueda = inputBuscar.value;

    // Si no se ingresaron valores se renderizan todos los productos    
    if(!busqueda){

        console.log('Se busco lo siguiente: ' + busqueda);

        renderizarProductos();

    }
    else {

        console.log('Se busco lo siguiente: ' + busqueda);

        filtrarResultados(busqueda);

    }

    return;
})


function filtrarResultados(busqueda) {

    let productosFiltrados = productosList.filter(producto => {

        return producto.nombre.toLowerCase().includes(busqueda) || producto.categoria.toLowerCase().includes(busqueda)

    });

    if(productosFiltrados.length === 0) {
    
        console.log('Filtrados: ' + productosFiltrados.length);
        
        mostrarMensajeErrorBusqueda();

    } else {
        
        console.log('Filtrados: ' + productosFiltrados.length);

        renderizarProductosFiltrados(productosFiltrados);

    }
    
    return;
}

function renderizarProductosFiltrados(productosFiltrados) {

    divTazas.innerHTML = '';
 
    productosFiltrados.forEach(producto => {
 
        divTazas.innerHTML += `
                <div class="card bg-light" id="${producto.id}">
                    <div class="card-header">
                        <p class="card-text">Categoria: ${producto.categoria}</p>
                    </div>
                    <img class="card-img-top" src="${producto.imagen}" alt="Card image">
                    <div class="card-body">
                        <h5 class="card-title">Modelo: ${producto.nombre}</h5>
                        <p class="card-text">Precio: $${producto.precio}</p>
                        <a href="#" class="btn btn-primary boton-comprar" id="${producto.id}">Comprar</a>
                    </div>
                    <div class="card-footer text-muted">
                        <p class="card-text">Stock: ${producto.stock}</p>
                    </div>
                </div>
            `;
    });

    addClickEventToBuyButtons(productosFiltrados);

}

//------------------------------------------------------------------------------------  
//#region Carrito.HTML

function cargarCarritoHtml(){

    cargarCarrito();

    let tableProductosTBody = document.getElementById('detalleCarrito');
    let totalDetalleCarrito = document.getElementById('totalDetalleCarrito');

    let suma = 0;
    carrito.forEach(producto => {

        tableProductosTBody.innerHTML += `
        <tr>
            <td>${producto.nombre}</td>
            <td>${producto.precio}</td>
        </tr>`;

        suma += producto.precio;
        totalDetalleCarrito.innerHTML = suma;

        return;

    })

    addClickEventToFinalizar();

    return;
}


function addClickEventToFinalizar() {
    botonFinalizarCompra.addEventListener('click', () => {

        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
              confirmButton: 'btn btn-success',
              cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
          })
          
          swalWithBootstrapButtons.fire({
            title: 'Finalizar compra',
            text: "¿Deseas finalizar tu compra?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Si',
            cancelButtonText: 'No, continuar comprando',
            reverseButtons: true
          }).then((result) => {
            if (result.isConfirmed) {
              swalWithBootstrapButtons.fire(
                'Perfecto!',
                'Felicidades. Tu pedido está siendo procesado. Gracias por tu compra!',
                'success'
              )
              const carritoLocalStorage = JSON.parse(localStorage.getItem('carritoLocalStorage'));
              if(carritoLocalStorage){
          
                  localStorage.removeItem('carritoLocalStorage')
                  
                  carrito = carritoLocalStorage;
                  totalUnidades = 0;
                  totalUnidadesCarrito.innerHTML = totalUnidades;
              }
          
              setTimeout(() => {
    
                window.location.pathname = "./index.html";
    
              }, 3000);
    
    
            } else if (
              /* Read more about handling dismissals below */
              result.dismiss === Swal.DismissReason.cancel
            ) {
              swalWithBootstrapButtons.fire(
                'Cancelaste',
                'Puedes continuar comprando',
                'error'
              )
            }
          })
    
        return;
    })

    return;
}



//#endregion Carrito.HTML
//------------------------------------------------------------------------------------  

// load();
