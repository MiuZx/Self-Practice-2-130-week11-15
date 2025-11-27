async function loadDeclaredPlan(studentId) {
  try {
    const res = await fetch(`${API_BASE_URL}/students/${studentId}/declared-plan`, {
      headers: { Authorization: `Bearer ${keycloak.token}` }
    });

    if (res.status === 404) {
      declaredPlanEl.textContent = "Declaration Status: Not Declared";
      declareBtn.style.display = "inline-block";
      return;
    }

    const result = await res.json();

    const userTz = Intl.DateTimeFormat().resolvedOptions().timeZone;

    const dt = new Date(result.data.updatedAt).toLocaleString("th-TH", {
      timeZone: userTz,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false
    });

    declaredPlanEl.textContent =
      `Declaration Status: Declared ${result.data.planCode} - ${result.data.nameEng} plan on ${dt} (${userTz})`;

    declareBtn.style.display = "none";
  } catch (e) {
    showDialog("Unable to load declared plan.");
  }
}
