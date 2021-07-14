function hideModal() {
  const $modal = document.querySelector("#alert-modal");
  $modal.style.visibility = "hidden";
}

function showModal() {
  const $modal = document.querySelector("#alert-modal");
  $modal.style.visibility = "visible";
}

function chatOutClickEventBinding() {
  const $outBtn = document.querySelector("#out-btn");

  $outBtn.addEventListener("click", () => {
    showModal();
  });
}

function modalEventsBinding() {
  const $cancelBtn = document.querySelector("#cancel-btn");
  const $acceptBtn = document.querySelector("#accept-btn");

  $cancelBtn.addEventListener("click", () => {
    hideModal();
  });
  $acceptBtn.addEventListener("click", () => {
    // TODO: Navigate
    hideModal();
  });
}

function eventsBinding() {
  chatOutClickEventBinding();
  modalEventsBinding();
}

window.addEventListener("DOMContentLoaded", () => {
  eventsBinding();
});
