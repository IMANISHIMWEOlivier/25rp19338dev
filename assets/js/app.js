// Simple shared JS for the prototype
document.addEventListener("DOMContentLoaded", () => {
  // Dynamic year in footer
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear().toString();
  }

  // Bootstrap-style custom form validation
  const forms = document.querySelectorAll(".needs-validation");
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        } else {
          // For this prototype, prevent real submission and show a message
          event.preventDefault();
          alert("Form validation passed. In a real system, data would be saved now.");
        }
        form.classList.add("was-validated");
      },
      false
    );
  });

  // Family members dynamic section (system.html)
  const membersContainer = document.getElementById("membersContainer");
  const addMemberBtn = document.getElementById("addMemberBtn");
  const memberCountLabel = document.getElementById("memberCount");

  let memberIndex = 0;

  function updateMemberCount() {
    if (memberCountLabel) {
      memberCountLabel.textContent = memberIndex.toString();
    }
  }

  function createMemberCard(index) {
    const wrapper = document.createElement("div");
    wrapper.className = "member-card";
    wrapper.dataset.memberIndex = String(index);

    wrapper.innerHTML = `
      <div class="member-card-header">
        <div class="d-flex align-items-center gap-2">
          <span class="member-index-pill">${index}</span>
          <span class="fw-semibold small">Member ${index}</span>
        </div>
        <button type="button" class="btn btn-link btn-sm text-danger p-0 remove-member-btn">
          Remove
        </button>
      </div>
      <div class="row g-2">
        <div class="col-md-6">
          <label class="form-label small">Full Name</label>
          <input type="text" class="form-control form-control-sm" required />
          <div class="invalid-feedback">Name is required.</div>
        </div>
        <div class="col-md-3">
          <label class="form-label small">Relation</label>
          <input type="text" class="form-control form-control-sm" placeholder="e.g. Child" required />
          <div class="invalid-feedback">Relation is required.</div>
        </div>
        <div class="col-md-3">
          <label class="form-label small">Age</label>
          <input type="number" min="0" class="form-control form-control-sm" required />
          <div class="invalid-feedback">Valid age required.</div>
        </div>
        <div class="col-md-6">
          <label class="form-label small">National ID (optional)</label>
          <input type="text" class="form-control form-control-sm" />
        </div>
        <div class="col-md-3">
          <label class="form-label small">Gender</label>
          <select class="form-select form-select-sm" required>
            <option value="">Select</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
          <div class="invalid-feedback">Select gender.</div>
        </div>
        <div class="col-md-3">
          <label class="form-label small">Education</label>
          <select class="form-select form-select-sm" required>
            <option value="">Select</option>
            <option>None</option>
            <option>Primary</option>
            <option>Secondary</option>
            <option>Tertiary</option>
          </select>
          <div class="invalid-feedback">Select education level.</div>
        </div>
      </div>
    `;

    return wrapper;
  }

  if (membersContainer && addMemberBtn) {
    addMemberBtn.addEventListener("click", () => {
      memberIndex += 1;
      const card = createMemberCard(memberIndex);
      membersContainer.appendChild(card);
      updateMemberCount();
    });

    membersContainer.addEventListener("click", (event) => {
      const target = event.target;
      if (target instanceof HTMLElement && target.classList.contains("remove-member-btn")) {
        const card = target.closest(".member-card");
        if (card && membersContainer.contains(card)) {
          membersContainer.removeChild(card);
          memberIndex = Math.max(0, memberIndex - 1);
          updateMemberCount();
        }
      }
    });
  }

  // Shared duties dynamic section
  const sharedDutiesContainer = document.getElementById("sharedDutiesContainer");
  const addSharedDutyBtn = document.getElementById("addSharedDutyBtn");
  const sharedDutyCountLabel = document.getElementById("sharedDutyCount");
  let sharedDutyIndex = 0;

  function updateSharedDutyCount() {
    if (sharedDutyCountLabel) {
      sharedDutyCountLabel.textContent = sharedDutyIndex.toString();
    }
  }

  function createSharedDutyRow(index) {
    const row = document.createElement("div");
    row.className = "shared-duty-row";
    row.dataset.sharedDutyIndex = String(index);

    row.innerHTML = `
      <div class="d-flex justify-content-between align-items-center mb-2">
        <span class="small fw-semibold">Duty ${index}</span>
        <button type="button" class="btn btn-link btn-sm text-danger p-0 remove-shared-duty-btn">
          Remove
        </button>
      </div>
      <div class="row g-2">
        <div class="col-md-8">
          <label class="form-label small">Description</label>
          <input type="text" class="form-control form-control-sm" required />
          <div class="invalid-feedback">Duty description is required.</div>
        </div>
        <div class="col-md-4">
          <label class="form-label small">Target Date</label>
          <input type="date" class="form-control form-control-sm" required />
          <div class="invalid-feedback">Target date is required.</div>
        </div>
        <div class="col-md-4">
          <label class="form-label small">Category</label>
          <select class="form-select form-select-sm" required>
            <option value="">Select</option>
            <option>Education</option>
            <option>Health</option>
            <option>Agriculture</option>
            <option>Income</option>
            <option>Hygiene</option>
            <option>Social</option>
          </select>
          <div class="invalid-feedback">Select a category.</div>
        </div>
        <div class="col-md-4">
          <label class="form-label small">Status</label>
          <select class="form-select form-select-sm" required>
            <option value="">Select</option>
            <option>Not started</option>
            <option>In progress</option>
            <option>Completed</option>
          </select>
          <div class="invalid-feedback">Select status.</div>
        </div>
        <div class="col-md-4">
          <label class="form-label small">Responsible Members (note)</label>
          <input
            type="text"
            class="form-control form-control-sm"
            placeholder="e.g. All / Parents"
          />
        </div>
      </div>
    `;

    return row;
  }

  if (sharedDutiesContainer && addSharedDutyBtn) {
    addSharedDutyBtn.addEventListener("click", () => {
      sharedDutyIndex += 1;
      const row = createSharedDutyRow(sharedDutyIndex);
      sharedDutiesContainer.appendChild(row);
      updateSharedDutyCount();
    });

    sharedDutiesContainer.addEventListener("click", (event) => {
      const target = event.target;
      if (target instanceof HTMLElement && target.classList.contains("remove-shared-duty-btn")) {
        const row = target.closest(".shared-duty-row");
        if (row && sharedDutiesContainer.contains(row)) {
          sharedDutiesContainer.removeChild(row);
          sharedDutyIndex = Math.max(0, sharedDutyIndex - 1);
          updateSharedDutyCount();
        }
      }
    });
  }
});


