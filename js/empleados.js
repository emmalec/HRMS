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
              <p class="fs-1"><span>&#x1F477;</span> Empleados</p>
            </div>
          </div>`
      );

    //banner animation
    $("#bannerDashboard").hide().slideDown(250);

    $("#buttons")
      .empty()
      .prepend(
        `
      <button id="mostrarCards" type="button" class="btn btn-primary">Mostrar cards</button>
      `
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
        <th>Eliminar</th></thead>`);

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
            <td>$ ${empleado.sueldoBasico}</td>
            <td><button type="button" id="deleteEmpleado${empleado.id}" class="btn btn-outline-danger deleteEmpleado"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16"><path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"></path></svg></button>
            </td></tr>`);
      }
    }

    //Mostrar cards

    $("#mostrarCards").on("click", () => {
      $("#buttons").empty();

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
                <h5 class="card-title">${empleado.nombre} ${empleado.apellido} <span class="text-muted">| ${empleado.id}</span></h5>
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
          //eliminamos el value asociado al id
          empleados.splice(index, 1);
          //update del localStorage
          localStorage.setItem("empleado", JSON.stringify(empleados));
          //para cerrar el tr
          $(this).closest("tr").fadeOut(350);
        });
      }
    }
    mostrarLista();
    deleteEmpleado();
  });
});
