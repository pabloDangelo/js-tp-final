// Elementos

const divTazas = document.getElementById('catalogo-tazas');
const botonesComprar = document.querySelectorAll('.boton-comprar');
// const botonesComprar = Array.from(document.getElementsByClassName('boton-comprar'));

const botonCarrito = document.querySelector('.boton-carrito');
let totalUnidadesCarrito = document.querySelector('.total-unidades-carrito');
let totalUnidades = 0;

const botonBuscar = document.getElementById('botonBuscar');
const inputBuscar = document.getElementById('inputBuscar');

let carrito = [];

let productosList = [];


// Carga el carrito de compras al ingresar al sitio
(function load(){
    
    cargarCarrito();

    loadProductos();

    return;
})();

function cargarCarrito(){

    const carritoLocalStorage = JSON.parse(localStorage.getItem('carritoLocalStorage'));
    if(carritoLocalStorage){
        carrito = carritoLocalStorage;
        totalUnidades = carrito.length
        totalUnidadesCarrito.innerHTML = totalUnidades;
    }

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

function loadProductos() {

    fetch('./productos.json')
    .then((response) => response.json())
    .then((productos) => {

        productosList = productos;

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

        return;
        
    });
    
    // Agregar al carrito
    addCarritoEvent(productosList);

    return;
}

function addCarritoEvent(list) {
    list.forEach(producto => {

        let boton = document.getElementById(producto.id);
        boton.addEventListener('click', () => {
            
        carrito.push(producto);
        
        // Guardamos 
        localStorage.setItem('carritoLocalStorage', JSON.stringify(carrito));

        totalUnidades ++;
        totalUnidadesCarrito.innerHTML = totalUnidades;

        mostrarMensajeProductoAgregado();

        });

        return;

    });
}

// Eventos

// Abrir carrito
botonCarrito.addEventListener('click', () => {

    console.log('Se abrio el carrito');
    //location.href = "./carrito.html";

    return;

})


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
    console.log(busqueda);

    // Si no se ingresaron valores de busqueda se sale de la funcion
    if(!busqueda){

        renderizarProductos();

    }
    else {

        filtrarResultados(busqueda);

    }

    return;
})


function filtrarResultados(busqueda) {

    let productosFiltrados = productosList.filter(producto => {

        return producto.nombre.toLowerCase().includes(busqueda) || producto.categoria.toLowerCase().includes(busqueda)

    });

    console.log(productosFiltrados);

    if(productosFiltrados.length === 0) {
        
        mostrarMensajeErrorBusqueda();

    } else {

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

    addCarritoEvent(productosFiltrados);

}

//------------------------------------------------------------------------------------  
//#region Carrito.HTML

function cargarCarritoHtml(){

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

    return;
}

//#endregion Carrito.HTML
//------------------------------------------------------------------------------------  

