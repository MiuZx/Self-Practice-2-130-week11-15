async function declarePlan(studentId) {
  try {
    const planId = Number(dropdownEl.value);

    const res = await fetch(`${API_BASE_URL}/students/${studentId}/declared-plan`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${keycloak.token}`
      },
      body: JSON.stringify({ planId })
    });

    if (res.status === 201) {
      loadDeclaredPlan(studentId);
      return;
    }
    if (res.status === 409) {
      showDialog("You may have declared already.");
      return;
    }

    showDialog("Unable to declare study plan.");
  } catch (e) {
    showDialog("Error declaring study plan.");
  }
}