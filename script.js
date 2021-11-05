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
  //agregar metodos ej. calculo edad
}

// localStorage de array de objetos

let formularioEmpleado = document.getElementById("formEmp");
formularioEmpleado.addEventListener("submit", storageEmpleado);

function storageEmpleado() {
  //declaro array
  let empleados = [];
  empleados = JSON.parse(localStorage.getItem("empleado")) || [];
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
  localStorage.setItem("empleado", JSON.stringify(empleados));
  //el test no se ve por el refresh del submit
  console.log(empleados);
}

//Render table con boton mostrarlista
let mostrarLista = document.getElementById("mostrarLista");
mostrarLista.addEventListener("click", renderEmpleados);

//Render table con boton *empleados
let mostrarListaSidebar = document.getElementById("mostrarEmpleados");
mostrarListaSidebar.addEventListener("click", renderEmpleados);

function renderEmpleados() {
  let empleados = [];
  empleados = JSON.parse(localStorage.getItem("empleado"));
  tableBody.innerHTML = "";
  for (const empleado of empleados) {
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
