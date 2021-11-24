//Notificacion base de datos
$(document).ready(function () {
  //get it if getEmpleadoDB key is found
  if (sessionStorage.getItem("getEmpleadoDB")) {
    console.log("trajiste empleados!");

    $("#toastContainer").append(`
        <div id="toastDB" class="toast fade show align-items-center" role="alert" aria-live="assertive" aria-atomic="true" data-bs-autohide="true">
          <div class="d-flex">
            <div class="toast-body">
              La base de datos de empleados ha sido importada.
            </div>
            <button type="button" class="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
          </div>
        </div>
    `);
    sessionStorage.clear();
    setTimeout(
      () => $("#toastDB").attr("class", "toast fade hide align-items-center"),
      5000
    );
  }
});
