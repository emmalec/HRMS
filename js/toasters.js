/* 
TOASTERS
 */

$(document).ready(function () {
  //traer si encuentra true en session
  if (sessionStorage.getItem("getEmpleadoDB")) {
    $("#toastContainer").append(`
        <div id="toastDB" class="toast fade show align-items-center bg-success bg-gradient text-white" role="alert" aria-live="assertive" aria-atomic="true" data-bs-autohide="true">
          <div class="d-flex">
            <div class="toast-body">
              La base de datos de empleados ha sido importada.
            </div>
            <button type="button" class="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
          </div>
        </div>
    `);
    //session storage clear para eliminar el true
    sessionStorage.clear();
    setTimeout(
      () => $("#toastDB").attr("class", "toast fade hide align-items-center"),
      5000
    );
  }

  if (sessionStorage.getItem("deleteEmpleadoDB")) {
    $("#toastContainer").append(`
        <div id="toastDB" class="toast fade show align-items-center bg-danger bg-gradient text-white" role="alert" aria-live="assertive" aria-atomic="true" data-bs-autohide="true">
          <div class="d-flex">
            <div class="toast-body">
              La base de datos de empleados ha sido eliminada.
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

  if (sessionStorage.getItem("newEmpleado")) {
    $("#toastContainer").append(`
        <div id="toastDB" class="toast fade show align-items-center text-success" role="alert" aria-live="assertive" aria-atomic="true" data-bs-autohide="true">
          <div class="d-flex">
            <div class="toast-body">
              Se ha ingresado el colaborador con exito.
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
