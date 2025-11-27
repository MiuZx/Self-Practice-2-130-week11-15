const API_BASE_URL = "/intproj25/kk4/itb-ecors/api/v1";

async function loadStudyPlans() {
  const tableBody = document.getElementById("ecors-table-body");
  const dialog = document.getElementById("ecors-dialog");

  try {
    const response = await fetch(`${API_BASE_URL}/study-plans`);
    const data = await response.json();

    tableBody.innerHTML = "";
    data.forEach(plan => {
      const row = document.createElement("tr");
      row.classList.add("ecors-row");

      row.innerHTML = `
        <td class="ecors-id">${plan.id}</td>
        <td class="ecors-planCode">${plan.planCode}</td>
        <td class="ecors-nameEng">${plan.nameEng}</td>
        <td class="ecors-nameTh">${plan.nameTh}</td>
      `;

      tableBody.appendChild(row);
    });

    dialog.classList.add("hidden");
  } catch (e) {
    dialog.classList.remove("hidden");
  }
}
