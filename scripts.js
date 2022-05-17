
// let botonAgregar = document.getElementById('botonAgregar');
// let botonMostrar = document.getElementById('botonMostrar');
// let botonBuscar = document.getElementById('botonBuscar');
// let personajesDiv = document.getElementById('personajes');


// // Inputs personajes
// class Personaje {
    
//     constructor(nombre, planeta, arma, bando){
//         this.nombre = nombre;
//         this.planeta = planeta;
//         this.arma = arma;
//         this.bando = bando;
//     }
// }

// let nombre, planeta, arma, habilidades, personajesList;
// personajesList = [];

// // Agregar personaje
// botonAgregar.addEventListener('click', () => {
    
//     nombre = prompt('Ingrese el nombre del Personaje');
//     planeta = prompt('Ingrese el planeta del Personaje');
//     arma = prompt('Ingrese el arma del Personaje');
//     bando = prompt('Ingrese el bando del Personaje');
    
//     let personaje = new Personaje(nombre, planeta, arma, bando);
    
//     personajesList.push(personaje);

    

//     return;
// });



// // Mostrar Listado de Personajes
// botonMostrar.addEventListener('click', () => {
//     if(personajesList.length == 0)
//         alert('No existen personajes cargados');
//     else

//         for(let p of personajesList){

//             let li = document.createElement('li');
//             li.innerHTML = (`<li>Nombre:${p.nombre}, Planeta:${p.planeta}, Arma:${p.arma}, Bando:${p.bando}</li>`);
            
//             personajesDiv.append(li);
//         }

//     return;
// });


// // Eliminar Personajes
// botonEliminar.addEventListener('click', () => {
//     if(personajesList.length == 0)
//         alert('No existen personajes cargados');

//     else {

//         // Elimino los items de la lista HTML

//         let liList = document.getElementsByTagName("li");
        
//         for(let li of liList){

//             li.remove();            
//         }
        
//         // Vacio la lista
//         personajesList = [];
//     }

        

//     return;
// });



// // Buscar personajes

// let mostrarFiltrados = (lista) => {
//     if(lista.length == 0)
//         alert('No existen personajes cargados');
//     else
//         console.log(lista);

//     return;
// }

// botonBuscar.addEventListener('click', () => {

//     let criterioNum = prompt('Ingrese criterio de busqueda: 1) Nombre, 2) Planeta, 3) Arma, 4) Bando.');
//     let criterioString;
//     let filtro;
//     switch(criterioNum){
//         case '1':
//             criterioString = 'nombre';
//             filtro = prompt('Busqueda por nombre: Ingrese un nombre');
//             break;
//         case '2':
//             criterioString = 'planeta';
//             filtro = prompt('Busqueda por planeta: Ingrese un planeta');
//             break;
//         case '3':
//             criterioString = 'arma';
//             filtro = prompt('Busqueda por arma: Ingrese un arma');
//             break;
//         case '4':
//             criterioString = 'bando';
//             filtro = prompt('Busqueda por bando: Ingrese un bando');
//             break;
//         default:
//             'No ingreso un criterio valido'
//             break;
//     }

//     let listaFiltrada = personajesList.filter(personaje => personaje[criterioString].toLowerCase() == filtro.toLowerCase());
//     mostrarFiltrados(listaFiltrada);

// })

// // let obj =  {
// //     name: 'Pablo'
// // }

// // obj.apellido = 'DAngelo';

// // console.log(obj);


// Tienda de regalos

// Elementos
let divTazas = document.getElementById('catalogo-tazas');

// Array de Tazas para mostrar en catalogo
let articulos = [
    new Articulo('Taza 1', 'Peliculas', 550, 50),
    new Articulo('Taza 2', 'Peliculas', 550, 50),
    new Articulo('Taza 3', 'Peliculas', 550, 50),
    new Articulo('Taza 4', 'Peliculas', 550, 50),
    new Articulo('Taza 5', 'Musica', 750, 30),
    new Articulo('Taza 6', 'Musica', 750, 30),
    new Articulo('Taza 7', 'Musica', 750, 30),
    new Articulo('Taza 8', 'Musica', 750, 30),
    new Articulo('Taza 9', 'Arte', 600, 20),
    new Articulo('Taza 10', 'Arte', 600, 20),
    new Articulo('Taza 11', 'Arte', 600, 20),
    new Articulo('Taza 12', 'Arte', 600, 20),
    new Articulo('Taza 13', 'Arte', 600, 20),
    new Articulo('Taza 14', 'Profesiones', 550, 60),
    new Articulo('Taza 15', 'Profesiones', 550, 60),
    new Articulo('Taza 16', 'Profesiones', 550, 60)
];

articulos.forEach(articulo => {
	divTazas.innerHTML += `
        <div class="card" id="${articulo.nombre}">
            <div class="card-header">
                ${articulo.nombre}
            </div>
            <div class="card-body">
            <h5 class="card-title">Taza modelo: ${articulo.nombre}</h5>
            <p class="card-text">Categoria: ${articulo.categoria}</p>
            <p class="card-text">Precio: $${articulo.precio}</p>
            <p class="card-text">Stock: ${articulo.stock}</p>
            <a href="#" class="btn btn-info">Comprar</a>
            </div>
            <div class="card-footer text-muted">
            </div>
        </div>
	`;
});