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

// Array de Tazas para mostrar en catalogo
let articulos = [
    new Articulo('1', 'Taza 1', 'Peliculas', 550, 50),
    new Articulo('2', 'Taza 2', 'Peliculas', 550, 50),
    new Articulo('3', 'Taza 3', 'Peliculas', 550, 50),
    new Articulo('4', 'Taza 4', 'Peliculas', 550, 50),
    new Articulo('5', 'Taza 5', 'Musica', 750, 30),
    new Articulo('6', 'Taza 6', 'Musica', 750, 30),
    new Articulo('7', 'Taza 7', 'Musica', 750, 30),
    new Articulo('8', 'Taza 8', 'Musica', 750, 30),
    new Articulo('9', 'Taza 9', 'Arte', 600, 20),
    new Articulo('10', 'Taza 10', 'Arte', 600, 20),
    new Articulo('11', 'Taza 11', 'Arte', 600, 20),
    new Articulo('12', 'Taza 12', 'Arte', 600, 20),
    new Articulo('13', 'Taza 13', 'Arte', 600, 20),
    new Articulo('14', 'Taza 14', 'Profesiones', 550, 60),
    new Articulo('15', 'Taza 15', 'Profesiones', 550, 60),
    new Articulo('16', 'Taza 16', 'Profesiones', 550, 60)
];

// Carga el carrito de compras al ingresar al sitio
(function load(){
    
    cargarCarrito();

    renderizarProductos();

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

function renderizarProductos(){
    articulos.forEach(articulo => {

        divTazas.innerHTML += `
            <div class="card bg-light" id="${articulo.id}">
                <div class="card-header">
                    <p class="card-text">Categoria: ${articulo.categoria}</p>
                </div>
                <img class="card-img-top" src="https://place-hold.it/300" alt="Card image">
                <div class="card-body">
                    <h5 class="card-title">Modelo: ${articulo.nombre}</h5>
                    <p class="card-text">Precio: $${articulo.precio}</p>
                    <a href="#" class="btn btn-primary boton-comprar" id="${articulo.id}">Comprar</a>
                </div>
                <div class="card-footer text-muted">
                    <p class="card-text">Stock: ${articulo.stock}</p>
                </div>
            </div>
        `;
        
    });

    // Agregar al carrito
    articulos.forEach(articulo => {

        let boton = document.getElementById(articulo.id);
        boton.addEventListener('click', () => {
            
        carrito.push(articulo);
        
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

        let articulosFiltrados = articulos.filter(articulo => {

            return articulo.nombre.toLowerCase().includes(busqueda) || articulo.categoria.toLowerCase().includes(busqueda)

        });

        if(articulosFiltrados.length === 0) {
            mostrarMensajeErrorBusqueda();

            return;
        }

         divTazas.innerHTML = '';
     
         articulosFiltrados.forEach(articulo => {
     
            divTazas.innerHTML += `
                <div class="card bg-light" id="${articulo.id}">
                    <div class="card-header">
                        <p class="card-text">Categoria: ${articulo.categoria}</p>
                    </div>
                    <img class="card-img-top" src="https://place-hold.it/300" alt="Card image">
                    <div class="card-body">
                        <h5 class="card-title">Modelo: ${articulo.nombre}</h5>
                        <p class="card-text">Precio: $${articulo.precio}</p>
                        <a href="#" class="btn btn-primary boton-comprar" id="${articulo.id}">Comprar</a>
                    </div>
                    <div class="card-footer text-muted">
                        <p class="card-text">Stock: ${articulo.stock}</p>
                    </div>
                </div>
            `;
             
         });
    }

    return;
})


//------------------------------------------------------------------------------------  
//#region Carrito.HTML

function cargarCarritoHtml(){

    let tableProductosTBody = document.getElementById('detalleCarrito');
    let totalDetalleCarrito = document.getElementById('totalDetalleCarrito');

    let suma = 0;
    carrito.forEach(articulo => {

        tableProductosTBody.innerHTML += `
        <tr>
            <td>${articulo.nombre}</td>
            <td>${articulo.precio}</td>
        </tr>`;

        suma += articulo.precio;
        totalDetalleCarrito.innerHTML = suma;

        return;

    })

    return;
}

//#endregion Carrito.HTML
//------------------------------------------------------------------------------------  
