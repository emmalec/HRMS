//Class Empleado con metodo constructor
class Empleado {
  constructor(
    id,
    nombre,
    apellido,
    fechaIngreso,
    fechaNacimiento,
    email,
    sueldoBasico
  ) {
    this.id = id;
    this.nombre = nombre;
    this.apellido = apellido;
    this.fechaIngreso = fechaIngreso;
    this.fechaNacimiento = fechaNacimiento;
    this.email = email;
    this.sueldoBasico = sueldoBasico;
  }
  //Method para calcular años
  calcularAnios(anioInicio) {
    let today = new Date();
    let fechaInicio = new Date(anioInicio);
    let anios = today.getFullYear() - fechaInicio.getFullYear();
    return anios;
  }
}

//SUBMIT & SET LOCALSTORAGE

let formularioEmpleado = document.getElementById("formEmp");
formularioEmpleado.addEventListener("submit", storageEmpleado);

function storageEmpleado() {
  //declaro array que se ejecuta con la funcion
  let empleados = [];
  //obtiene por key "empleado" y lo parsea o el array vacio - si no hago esto en el refresh me hace clear del localStorage
  empleados = JSON.parse(localStorage.getItem("empleado")) || [];
  //pushea el objeto instanciado al array "empleados"
  empleados.push(
    new Empleado(
      IDform.value,
      nombreForm.value,
      apellidoForm.value,
      ingresoForm.value,
      BDForm.value,
      emailForm.value,
      suelForm.value
    )
  );
  //setea el objeto creado con el key "empleado" dentro del array "empleados"
  localStorage.setItem("empleado", JSON.stringify(empleados));
  sessionStorage.setItem("success", true);
}

//GET EMPLEADO LOCALSTORAGE

function getEmpleado() {
  //traigo el array desde el localStorage por la key "empleado"
  let empleados = JSON.parse(localStorage.getItem("empleado"));
  //mapeo el array para convertiro a la class Empleado y poder usar metodos
  let empleadosMap = empleados.map(
    (empleado) =>
      new Empleado(
        empleado.id,
        empleado.nombre,
        empleado.apellido,
        empleado.fechaIngreso,
        empleado.fechaNacimiento,
        empleado.email,
        empleado.sueldoBasico
      )
  );
  return empleadosMap;
}

//document ready para asegurarnos que el DOM esta listo
$(document).ready(function () {
  $("#mostrarCards").on("click", () => {
    let empleadosCard = getEmpleado();

    $("#globalContainer")
      .empty() //para borrar el contenido de globalContainer
      .append(`<div id="globalContainer_cards" class="row"></div>`);

    for (const empleado of empleadosCard) {
      let edadEmpleado = empleado.calcularAnios(empleado.fechaNacimiento);
      let antiguedadEmpleado = empleado.calcularAnios(empleado.fechaIngreso);

      $("#globalContainer_cards").append(`<div class="col-lg-2 pb-3">
      <div class="shadow-sm card">
        <img src="https://media.istockphoto.com/vectors/missing-image-of-a-person-placeholder-vector-id1288129985?k=20&m=1288129985&s=612x612&w=0&h=OHfZHfKj0oqIDMl5f_oRqH13MHiB63nUmySYILbWbjE=" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${empleado.nombre} ${empleado.apellido}</h5>
          <p class="card-text mb-0"> Edad: ${edadEmpleado} años</p>
          <p class="card-text mb-0"> Antiguedad: ${antiguedadEmpleado} años</p>
        </div>
      </div>
    </div>`);
    }
  });

  console.log("DOM ready!");
});

//Mostrar empleados JQUery sidebar

$("#mostrarEmpleados, #mostrarLista").on("click", function () {
  $("#globalContainer")
    .empty()
    .append(
      "<table id='tableSide' class='table table-hover'><tbody id='tb'></tbody></table>"
    );

  //armando el header de la table
  $("#tableSide").prepend(`<thead><th>#id</th>
  <th>Nombre</th>
  <th>Apellido</th>
  <th>Edad</th>
  <th>Antiguedad</th>
  <th>e-mail</th>
  <th>Sueldo Basico</th>
  <th>Delete</th></thead>`);

  let empleadosTable = getEmpleado();

  for (const empleado of empleadosTable) {
    let edadEmpleado = empleado.calcularAnios(empleado.fechaNacimiento);
    let antiguedadEmpleado = empleado.calcularAnios(empleado.fechaIngreso);

    $("#tb").append(`<tr><td> ${empleado.id}</td>
    <td>${empleado.nombre}</td>
    <td>${empleado.apellido}</td>
    <td>${edadEmpleado} años</td>
    <td>${antiguedadEmpleado} años</td>
    <td>${empleado.email}</td>
    <td>${empleado.sueldoBasico}</td>
    <td id="deleteEmpleado"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" class="bi bi-trash-fill" viewBox="0 0 16 16">
    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
    </svg></td></tr>`);
  }
});

//Bootstrap toast para cuando cargamos un empleado - no me funciona con el refresh del submit

$(document).ready(function () {
  let toastLiveExample = document.getElementById("liveToast");
  if (formularioEmpleado) {
    formularioEmpleado.addEventListener("submit", function () {
      var toast = new bootstrap.Toast(toastLiveExample);

      toast.show();
    });
  }
});

//Clear el localStorage

let clearStorageEmpleado = document.getElementById("clrLocalStorage");
clearStorageEmpleado.addEventListener("click", clearStorage);

function clearStorage() {
  localStorage.clear("empleado");
}
