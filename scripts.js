// Elementos
const divTazas = document.getElementById('catalogo-tazas');
const botonesComprar = document.querySelectorAll('.boton-comprar');
// const botonesComprar = Array.from(document.getElementsByClassName('boton-comprar'));

const botonCarrito = document.querySelector('.boton-carrito');
let totalUnidadesCarrito = document.querySelector('.total-unidades-carrito');
let totalUnidades = 0;

const botonBuscar = document.getElementById('botonBuscar');
const inputBuscar = document.getElementById('inputBuscar');


const carrito = [];

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
]

articulos.forEach(articulo => {

	divTazas.innerHTML += `
        <div class="card" id="${articulo.id}">
            <div class="card-header">
                ${articulo.nombre}
            </div>
            <div class="card-body">
            <h5 class="card-title">Taza modelo: ${articulo.nombre}</h5>
            <p class="card-text">Categoria: ${articulo.categoria}</p>
            <p class="card-text">Precio: $${articulo.precio}</p>
            <p class="card-text">Stock: ${articulo.stock}</p>
            <a href="#" class="btn btn-info boton-comprar" id="${articulo.id}">Comprar</a>
            </div>
            <div class="card-footer text-muted">
            </div>
        </div>
	`;
    
});

// Eventos

// Agregar al carrito
articulos.forEach(articulo => {

    let boton = document.getElementById(articulo.id);
    boton.addEventListener('click', () => {
        
    carrito.push(articulo);
    console.log(carrito);

    totalUnidades ++;
    totalUnidadesCarrito.innerHTML = totalUnidades;

    });

    return;

});

// Abrir carrito
botonCarrito.addEventListener('click', () => {

    console.log('Se abrio el carrito');

    let s = 'Hola';
    console.log(s.includes('a'))

    return;

})


// Buscar producto
botonBuscar.addEventListener('click', () => {

    let busqueda = inputBuscar.value;

    // Si no se ingresaron valores de busqueda se sale de la funcion
    if(!busqueda){
        
        return;
    }
    else{

        let articulosFiltrados = articulos.filter(articulo => {
        
            return articulo.nombre.toLowerCase().includes(busqueda) ||  articulo.categoria.toLowerCase().includes(busqueda)
             
         });
     
         console.log(articulosFiltrados);
         divTazas.innerHTML = '';
     
         articulosFiltrados.forEach(articulo => {
     
             divTazas.innerHTML += `
                 <div class="card" id="${articulo.id}">
                     <div class="card-header">
                         ${articulo.nombre}
                     </div>
                     <div class="card-body">
                     <h5 class="card-title">Taza modelo: ${articulo.nombre}</h5>
                     <p class="card-text">Categoria: ${articulo.categoria}</p>
                     <p class="card-text">Precio: $${articulo.precio}</p>
                     <p class="card-text">Stock: ${articulo.stock}</p>
                     <a href="#" class="btn btn-info boton-comprar" id="${articulo.id}">Comprar</a>
                     </div>
                     <div class="card-footer text-muted">
                     </div>
                 </div>
             `;
             
         });
    }

    return;
})



// Consultar que es lo que falla????

    // botonesComprar.forEach(boton => {

    //     console.log(botonesComprar.length);

    //     boton.addEventListener('click', (e) => {

    //         // Se agrega el producto al carrito
        
    //         carrito.push(e.target);
    //         console.log(carrito);
    //         sumarAlCarrito();
        
    //      })

    //     return;
    // }); 
    // 
    