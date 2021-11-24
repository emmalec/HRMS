/* 
EMPLEADOS VIEW
 */

$(document).ready(function () {
  //Mostrar empleados
  $("#mostrarEmpleados").on("click", function () {
    $("#banner")
      .empty()
      .prepend(
        `<div id="bannerDashboard" class="d-flex flex-row">
            <div class="pt-4 pb-1">
              <p class="fs-1">Empleados</p>
            </div>
          </div>`
      );

    //banner animation
    $("#bannerDashboard").hide().slideDown(250); //agregar CSS;

    $("#buttons")
      .empty()
      .prepend(
        `
      <div>
        <button id="mostrarCards" type="button" class="btn btn-primary">Mostrar cards</button>
      </div>`
      )
      .hide()
      .fadeIn(700)
      .delay(400);

    $("#globalContainer")
      .empty()
      .append(
        `<table id='tableSide' class='table table-hover'><tbody id='tb'></tbody></table>`
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

    //Mostrar cards

    $("#mostrarCards").on("click", () => {
      let empleadosCard = getEmpleado();

      $("#globalContainer")
        .empty() //para borrar el contenido de globalContainer
        .append(`<div id="globalContainer_cards" class="row"></div>`);

      for (const empleado of empleadosCard) {
        let edadEmpleado = empleado.calcularAnios(empleado.fechaNacimiento);
        let antiguedadEmpleado = empleado.calcularAnios(empleado.fechaIngreso);

        $("#globalContainer_cards")
          .append(`<div class="col-lg-2 pb-3 card-group">
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

    //Delete empleado Jquery

    function deleteEmpleado() {
      let empleados = getEmpleado();

      for (const empleado of empleados) {
        $(`#deleteEmpleado${empleado.id}`).on("click", function () {
          //buscamos el index del array mediante el id de empleado
          index = empleados.findIndex((x) => x.id === empleado.id);
          //eliminamos el value asicoado al id
          empleados.splice(index, 1);
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