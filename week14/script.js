function showDialog(msg) {
  const dialog = document.getElementById("ecors-dialog");
  const msgElement = document.getElementById("ecors-dialog-message");

  if (!dialog) return;

  msgElement.textContent = msg;
  dialog.classList.remove("hidden");


  try {
    if (typeof dialog.showModal === "function") dialog.showModal();
  } catch (e) {
    dialog.classList.remove("hidden");
  }

  function close() {
    try {
      if (typeof dialog.close === "function") dialog.close();
    } catch (e) {}
    dialog.classList.add("hidden");
    document.removeEventListener("keydown", escHandler);
  }

  function escHandler(e) {
    if (e.key === "Escape") close();
  }

  document.getElementById("ecors-button-dialog").onclick = close;
  document.addEventListener("keydown", escHandler);
}
