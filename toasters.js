//Notificacion base de datos
$(document).ready(function () {
  //get it if Status key found
  if (sessionStorage.getItem("getEmpleadoDB")) {
    console.log("trajiste empleados!");

    $("#toastContainer").append(`
      
        <div class="toast fade show align-items-center" data-bs-autohide="true" role="alert" aria-live="assertive" aria-atomic="true">
          <div class="d-flex">
            <div class="toast-body">
              La base de datos de empleados ha sido importada.
            </div>
            <button type="button" class="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
          </div>
        </div>
    `);
    sessionStorage.clear();
    toast.hide();
  }
});
