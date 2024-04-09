//SUGERENCIA DEL ING una funcion no deberia de tener mas de dos funcionalidades
//poder agregar elementos al carrito
//tfoot se utiliza para mostrar totales

const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
//se especifica que es lo que se quiere dentro de la tabla

const btnVaciarCarrito = document.querySelector('#vaciar-carrito');

const listaCursos = document.querySelector('#lista-cursos');

//variable para guardar los datos de los cursos
let articulosCarrito = [];

//se hace para que se carguen todos los eventos
cargarEventListeners();

function cargarEventListeners() {
    listaCursos.addEventListener('click', agregarCurso);
    carrito.addEventListener('click', eliminarArticulo);
};

//Funciones 

function eliminarArticulo (evento) {
    
    if(evento.target.classList.contains('borrar-curso')){

        console.log(articulosCarrito);
        console.log('click en borrar');
        const articuloId = evento.target.getAttribute('data-id');

        //filter retorna un arreglo de acuerdo en la condicion, en este caso se añaden articulos diferentes al Id que se toco
        //lo que esta haciendo es creando un nuevo arreglo que no contenga el articulo que se presiono que se quiere eliminar
        articulosCarrito = articulosCarrito.filter(articulo => articulo.id !== articuloId);
        carritoHtml();
    }else{
        console.log('click en carrito');
    }
    
}


function agregarCurso(evento) {
    evento.preventDefault();

    if(evento.target.classList.contains('agregar-carrito')){

        //esto es por el html se necesita acceder al elemento que contiene todos los datos 
        //que se quieren guardar, en este caso todos se encuentran dentro del div con clase
        //info-card, que seria como el abuelo del boton que hizo que se generara el evento
        const cursoSeleccionado = evento.target.parentElement.parentElement;
        //console.log(cursoSeleccionado);
        leerDatosCurso(cursoSeleccionado);
        //console.log(evento.target);
    }

    //console.log(evento.target);
};

function leerDatosCurso(curso) {
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    };

    //esto se hace para verificar que el articulo seleccionado ya haya sido seleccionado anteriormente
    //esto para que en lugar de aumentar en la lista, aumente en la columna de cantidad
    //.some devuelve un booleano
    const existe = articulosCarrito.some((articulo) => {
        return articulo.id === infoCurso.id
    });
    //hay otra sintaxis que no implica return (creo)

    if(existe){
        //.map retorna un nuevo arreglo
        //en este caso se quiere que se retorne el curso que tenga el id y este se añada ya sea con la cantidad
        //aumentada o no
        const articulos = articulosCarrito.map((articulo) => {

            if(articulo.id === infoCurso.id){
                articulo.cantidad++;
                return articulo;
            } else{
                //si no se encuentra un id igual se devuelve el articulo
                return articulo;
            }

        });
        articulosCarrito = [... articulos];
    }else{
        //se genera un nuevo arreglo dentro del arreglo
        articulosCarrito = [... articulosCarrito, infoCurso];
    }

    //articulosCarrito.push(infoCurso);
    //el .push agrega los elementos

    //console.table(articulosCarrito);
    carritoHtml();
};

/* ctrl + shift + p
developer reload window*/

//HTML QUE VA DENTRO DEL CARRITO
function carritoHtml() {

    //se limpia para que no hayan duplicaciones
    limpiarHtml();

    //se ocupa recorrer entonces se usa foreach, si se necesita regresar algo se puediera usar un .map
    articulosCarrito.forEach((articulo) => {
        const row = document.createElement('tr')
        //tr es table row o fila de tabla

        //desestructurar las variables que tiene articulo para evitarse que poner articulo.titulo, articulo.imagen
        const {titulo, imagen, precio, id, cantidad} = articulo;

        //image
        row.innerHTML = `
            <td>
                <img src="${imagen}" width 100 />
            </td>        
            <td>
                ${titulo}
            </td>
            <td>
                ${precio}
            </td>
            <td>
                ${cantidad}
            </td>
            <td>
                <a href=# class="borrar-curso" data-id="${id}"}> X </a>
            </td>
        `;

        contenedorCarrito.appendChild(row); 
    });

};

function limpiarHtml() {
    // lo mas mas mas facil
    // afecta el rendimiento del renderizado del motor de HTML 
    // contenedorCarrito.innerHTML = ``;

    // forma eficiente, no tan tan facil (la use en el foro jajaj salu2)
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
};