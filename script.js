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

//AJAX & JQuery

$("#dashboard").on("click", () => {
  $("#globalContainer")
    .empty() //para borrar el contenido de globalContainer
    .append(`<div id="globalContainer_dash" class="row"></div>`);

  let clima =
    "https://api.openweathermap.org/data/2.5/weather?q=Buenos%20Aires&units=metric&appid=50a1e5e1973f426349dc3d7b8e08f97e&lang=sp";

  $.ajax({
    method: "GET",
    url: clima,
    success: function (data) {
      console.log(data.main.temp);
      console.log(data.weather[0].main);
      console.log(data.weather[0].description);

      $("#globalContainer_dash").append(`
      <div class="card col-lg-4 shadow ms-4">
        <div class="card-body">
          <div class="card-title d-flex align-items-center">
            <h6 class="text-capitalize"> El clima de hoy: ${data.weather[0].description}</h6>
          </div>
          <div class="d-flex align-items-center">
            <h2>${data.main.temp} C°</h2>
            <img id="wicon" src="https://openweathermap.org/img/w/${data.weather[0].icon}.png" alt="Weather icon">
            </div>
          <p>Min: ${data.main.temp_min}</p>
          <p>Max: ${data.main.temp_max}</p>
          <h4>${data.name}</h4>
        </div>
      </div>`);
    },
  });
});

//document ready para asegurarnos que el DOM esta listo
$("#mostrarCards").on("click", () => {
  let empleadosCard = getEmpleado();

  $("#globalContainer")
    .empty() //para borrar el contenido de globalContainer
    .append(`<div id="globalContainer_cards" class="row"></div>`);

  for (const empleado of empleadosCard) {
    let edadEmpleado = empleado.calcularAnios(empleado.fechaNacimiento);
    let antiguedadEmpleado = empleado.calcularAnios(empleado.fechaIngreso);

    $("#globalContainer_cards").append(`<div class="col-lg-2 pb-3 card-group">
      <div class="card">
        <img src="https://media.istockphoto.com/vectors/missing-image-of-a-person-placeholder-vector-id1288129985?k=20&m=1288129985&s=612x612&w=0&h=OHfZHfKj0oqIDMl5f_oRqH13MHiB63nUmySYILbWbjE=" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${empleado.nombre} ${empleado.apellido}</h5>
          <p class="card-text mb-0"> Edad: ${edadEmpleado} años</p>
          <p class="card-text mb-0"> Antiguedad: ${antiguedadEmpleado} años</p>
        </div>
      </div>
    </div>`);
  }

  //CARD ANIMATION

  $(".card").slideDown(200, function () {
    $(this).slideUp(0).slideDown(300).toggleClass("shadow-sm");
  });
});

//Mostrar empleados JQuery sidebar y boton

$(document).ready(function () {
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

    function mostrarLista() {
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
          <td><button type="button" id="deleteEmpleado${empleado.id}" class="btn btn-danger deleteEmpleado">Delete<i class="far fa-trash-alt"></i></button>
          </td></tr>`);
      }
    }

    //Delete empleado Jquery

    function deleteEmpleado() {
      let empleados = JSON.parse(localStorage.getItem("empleado"));
      console.log("esto funciona!");

      for (const empleado of empleados) {
        $(`#deleteEmpleado${empleado.id}`).on("click", function () {
          console.log(`Empleado ${empleado.id}`);
          //eliminamos el value asicoado al id
          empleados.splice(empleado, 1);
          //update del localStorage
          localStorage.setItem("empleado", JSON.stringify(empleados));
          //para refresh
          location.reload();
        });
      }
    }
    mostrarLista();
    deleteEmpleado();
  });
});

//Delete empleado Vanilla

/* document.addEventListener("DOMContentLoaded", function (event) {
  function deleteEmpleadoVan() {
    let empleados = JSON.parse(localStorage.getItem("empleado"));

    for (const empleado of empleados) {
      let boton = document.getElementById(`deleteEmpleado${empleado.id}`);
      console.log(empleado.id);
      boton.addEventListener("click", eliminarEmp);

      function eliminarEmp() {
        console.log("aca estoy!");
      }
    }
  }
  console.log("DOM ready");
  deleteEmpleadoVan();
}); */

//Clear el localStorage

let clearStorageEmpleado = document.getElementById("clrLocalStorage");
clearStorageEmpleado.addEventListener("click", clearStorage);

function clearStorage() {
  localStorage.clear("empleado");
}
