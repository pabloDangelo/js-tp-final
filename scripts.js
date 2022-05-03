
let botonAgregar = document.getElementById('botonAgregar');
let botonMostrar = document.getElementById('botonMostrar');
let botonBuscar = document.getElementById('botonBuscar');


// Inputs personajes
class Personaje {
    
    constructor(nombre, planeta, arma, bando){
        this.nombre = nombre;
        this.planeta = planeta;
        this.arma = arma;
        this.bando = bando;
    }
}

let nombre, planeta, arma, habilidades, personajesList;
personajesList = [];

// Agregar personaje
botonAgregar.addEventListener('click', () => {
    
    nombre = prompt('Ingrese el nombre del Personaje');
    planeta = prompt('Ingrese el planeta del Personaje');
    arma = prompt('Ingrese el arma del Personaje');
    bando = prompt('Ingrese el bando del Personaje');
    
    let personaje = new Personaje(nombre, planeta, arma, bando);

    
    personajesList.push(personaje);

    return;
});



// Mostrar Listado de Personajes
botonMostrar.addEventListener('click', () => {
    if(personajesList.length == 0)
        alert('No existen personajes cargados');
    else
        console.log(personajesList);

    return;
});


// Buscar personajes

let mostrarFiltrados = (lista) => {
    if(lista.length == 0)
        alert('No existen personajes cargados');
    else
        console.log(lista);

    return;
}

botonBuscar.addEventListener('click', () => {

    let criterioNum = prompt('Ingrese criterio de busqueda: 1) Nombre, 2) Planeta, 3) Arma, 4) Bando.');
    let criterioString;
    let filtro;
    switch(criterioNum){
        case '1':
            criterioString = 'nombre';
            filtro = prompt('Busqueda por nombre: Ingrese un nombre');
            break;
        case '2':
            criterioString = 'planeta';
            filtro = prompt('Busqueda por planeta: Ingrese un planeta');
            break;
        case '3':
            criterioString = 'arma';
            filtro = prompt('Busqueda por arma: Ingrese un arma');
            break;
        case '4':
            criterioString = 'bando';
            filtro = prompt('Busqueda por bando: Ingrese un bando');
            break;
        default:
            'No ingreso un criterio valido'
            break;
    }

    let listaFiltrada = personajesList.filter(personaje => personaje[criterioString].toLowerCase() == filtro.toLowerCase());
    mostrarFiltrados(listaFiltrada);

})