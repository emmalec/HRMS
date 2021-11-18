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
  sessionStorage.setItem("newEmpleado", true);
}

//GET EMPLEADO LOCALSTORAGE & MAP TO CLASS Empleado

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

//Traigo empleados desde el empleados.JSON con AJAX

$("#getEmpleadoDB").click(() => {
  //cambiar a success el btn
  $("#getEmpleadoDB").removeClass("btn-primary").addClass("btn-success");

  $.ajax({
    type: "GET",
    dataType: "json",
    url: "empleados.json",
    success: function (data) {
      console.log("funciona funcion axaj DB");
      localStorage.setItem("empleado", JSON.stringify(data));
    },
  });
  //almacenamos el true en el session
  sessionStorage.setItem("getEmpleadoDB", true);
  //delay en el reload
  setTimeout(() => location.reload(), 500);
});
