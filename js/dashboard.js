/* 
DASHBOARD VIEW
 */
$(document).ready(function () {
  $("#dashboard").on("click", () => {
    $("#banner")
      .empty()
      .prepend(
        `<div id="bannerDashboard" class="d-flex justify-content-between align-items-center pt-4">
            <div>
              <p class="fs-1">Dashboard</p>
            </div>
          </div>
          <hr class="bg-secondary">`
      )
      .hide()
      .slideDown(370);

    //borro buttons en la view Dashboard
    $("#buttons").empty();

    $("#globalContainer")
      .empty() //para borrar el contenido de globalContainer
      .append(
        `<div id="globalContainer_dash" class="row">
                <div class="col-10 card shadow ms-3">
                  <h3 class="card-title py-3">Bienvenido a <span class="titleLucida"> Human Resources Managment System</span></h3>
                    <p>Como verás el simulador se encuentra vacío, y tenemos varias opciones:<p>
                    <div>
                      <p>Podés importar una base de datos de empleados desde la pestaña <span>&#x2699;</span><b class="text-success">Configuración - Importar empleados.</b></p>
                      <p>Tambien podés eliminar la base de datos de empleados desde la pestaña <span>&#x2699;</span><b class="text-danger">Configuración - Borrar base de datos.</b></p>
                      <p>Para agregar un nuevo colaborador al sim usá el botón <b>+ Nuevo Colaborador.</b></p>
                      <p>En la pestaña <span>&#x1F477;</span> <b>Empleados</b> puedes visualizar los colaboradores cargados e importados.</p>
                      <p>Espero que lo disfrutes &#128512</p>
                    </div>
                </div>    
              </div>`
      )
      .hide()
      .fadeIn(800)
      .delay(500);

    //reloj
    let date = new Date();
    let hrs = date.getHours();
    let mins = date.getMinutes();
    mins = mins < 10 ? `0${mins}` : mins;
    let hora = `${hrs}:${mins}`;

    //aca comienza el API de openWeatherMap
    let clima =
      "https://api.openweathermap.org/data/2.5/weather?q=Buenos%20Aires&units=metric&appid=50a1e5e1973f426349dc3d7b8e08f97e&lang=sp";

    $.ajax({
      method: "GET",
      url: clima,
      success: function (data) {
        console.log(data.main.temp);
        console.log(data.weather[0].main);
        console.log(data.weather[0].description);

        //append al banner
        $("#bannerDashboard").append(`
        <div class="titleLucida">
          <h2 class="mb-0">${hora}</h2>
          <div class="d-flex flex-row justify-content-center mb-0">
            <h2>${data.main.temp} C°</h2>
            <img id="wicon" src="https://openweathermap.org/img/w/${data.weather[0].icon}.png" alt="Weather icon">
          </div>  
            <h4>${data.name}</h4>
        </div>
          `);
      },
    });
  });
});
