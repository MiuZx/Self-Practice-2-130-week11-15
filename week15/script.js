async function changePlan(studentId) {
  const planId = Number(dropdownEl.value);

  try {
    const res = await fetch(`${API_BASE_URL}/students/${studentId}/declared-plan`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${keycloak.token}`
      },
      body: JSON.stringify({ planId })
    });

    if (res.status === 200) {
      showDialog("Declaration updated.");
      loadDeclaredPlan(studentId);
    } 
 
    else if (res.status === 404) {
      const err = await res.json();
      showDialog(err.message || `No declared plan found for student with id=${studentId}.`);
      // Update display to "Not Declared"
      declaredPlanEl.textContent = "Declaration Status: Not Declared";
      currentPlanId = null;
      updateButtons();
    } 
   
    else if (res.status === 409) {
      const err = await res.json();
      showDialog(err.message || "Cannot update the declared plan because it has been cancelled.");
    } 
    
    else {
      showDialog("There is a problem. Please try again later.");
    }

  } catch (e) {
    console.error(e);
    showDialog("There is a problem. Please try again later.");
  }
}