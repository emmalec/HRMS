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

  calcularEdad(fechaNacimiento) {
    let today = new Date();
    let birthDate = new Date(fechaNacimiento);
    let age = today.getFullYear() - birthDate.getFullYear();
    let m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  concatenarNombre() {
    return this.nombre + this.apellido;
  }
}

// localStorage de array de objetos

let formularioEmpleado = document.getElementById("formEmp");
formularioEmpleado.addEventListener("submit", storageEmpleado);

function storageEmpleado() {
  //declaro array que se ejecuta con la funcion
  let empleados = [];
  //obtiene por key "empleado" y lo parsea o el array vacio - si no hago esto en el refresh me hace clear del localStorage
  empleados = JSON.parse(localStorage.getItem("empleado")) || [];
  //pushea el objeto creado al array "empleados"
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
}

//Render table con boton mostrarlista
let mostrarLista = document.getElementById("mostrarLista");
mostrarLista.addEventListener("click", renderEmpleados);

//Render table con boton *empleados
let mostrarListaSidebar = document.getElementById("mostrarEmpleados");
mostrarListaSidebar.addEventListener("click", renderEmpleados);

function renderEmpleados() {
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
  // borra todo contenido anterior a que se ejecute el for, para que no traiga toda la table
  tableBody.innerHTML = "";
  for (const empleado of empleadosMap) {
    let row = document.createElement("tr");
    row.innerHTML = `<td> ${empleado.id}</td>
    <td>${empleado.nombre}</td>
    <td>${empleado.apellido}</td>
    <td>${empleado.fechaNacimiento}</td>
    <td>${empleado.fechaIngreso}</td>
    <td>${empleado.email}</td>
    <td>${empleado.sueldoBasico}</td>
    <td id="deleteEmpleado"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" class="bi bi-trash-fill" viewBox="0 0 16 16">
    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
    </svg></td>`;
    tableBody.appendChild(row);
    console.log(empleado.calcularEdad(empleado.fechaNacimiento));
  }
}

//DOM

let table = document.createElement("table");
let tableBody = document.createElement("tbody");
table.setAttribute("class", "table table-hover");

//Armando el header
let tableHead = document.createElement("thead");
tableHead.innerHTML = `<th>#id</th>
<th>Nombre</th>
<th>Apellido</th>
<th>Fecha nacimiento</th>
<th>Fecha ingreso</th>
<th>e-mail</th>
<th>Sueldo Basico</th>
<th>Delete</th>`;

table.appendChild(tableBody);
table.appendChild(tableHead);
document.getElementById("tableContainer").appendChild(table);

//Clear el localStorage

let clearStorageEmpleado = document.getElementById("clrLocalStorage");
clearStorageEmpleado.addEventListener("click", clearStorage);

function clearStorage() {
  localStorage.clear("empleado");
}
