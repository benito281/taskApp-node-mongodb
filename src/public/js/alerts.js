var modalWrap = null;
const alertMessage = (icon,message) => {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
  
      Toast.fire({
        icon: icon,
        title: message
      })
}

//Modal delete confirm
const modalDelete = (id) => {
    if (modalWrap !== null) {
        modalWrap.remove();
    }
    modalWrap = document.createElement('div');
    modalWrap.innerHTML = `
      <div class="modal fade modal-delete" tabindex="-1">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header bg-light">
              <h5 class="modal-title">Delete task</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <p>Are you sure you want to continue?</p>
            </div>
            <div class="modal-footer bg-light">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <button type="button" class="btn btn-danger modal-delete-btn" data-bs-dismiss="modal">Delete</button>
            </div>
          </div>
        </div>
      </div>
    `;
  
    modalWrap.querySelector('.modal-delete-btn').onclick = () => deleteTask(id);
  
    document.body.append(modalWrap);
  
    let modalDeleteShow = new bootstrap.Modal(modalWrap.querySelector('.modal-delete'));
    modalDeleteShow.show();
    viewTasks();
}
//Alert for inputs
const alertsInputs = (message,type,form) => {
  const alertInput = document.createElement('div');
  alertInput.innerHTML += `
  <div class="alert alert-${type} alert-dismissible fade show my-auto" role="alert">
    <p>${message}</p>
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>
  `;
  const parentDiv = form.parentNode;
  return parentDiv.insertBefore(alertInput,form);
}