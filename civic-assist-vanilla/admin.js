// ================================================================
//  Civic Assist — admin.js (Admin Panel)
// ================================================================

// ==================== TAB LOGIC ====================
function switchAdminTab(tabId) {
  // Buttons
  document.getElementById('tab-complaints-btn').classList.remove('active');
  document.getElementById('tab-outages-btn').classList.remove('active');
  document.getElementById('tab-queues-btn').classList.remove('active');
  document.getElementById('tab-' + tabId + '-btn').classList.add('active');

  // Panes
  document.getElementById('pane-complaints').style.display = 'none';
  document.getElementById('pane-outages').style.display = 'none';
  document.getElementById('pane-queues').style.display = 'none';
  document.getElementById('pane-' + tabId).style.display = 'block';
}

// ==================== COMPLAINTS LOGIC ====================
const API_COMPLAINTS = "http://localhost:3000/complaints";
const adminList = document.getElementById("admin-list");
const form = document.getElementById("admin-form");
const editIdInput = document.getElementById("edit-id");
const editName = document.getElementById("edit-name");
const editDistrict = document.getElementById("edit-district");
const editStatus = document.getElementById("edit-status");
const submitBtn = document.getElementById("submit-btn");
const clearBtn = document.getElementById("clear-btn");
let currentComplaints = [];

async function fetchComplaints() {
  try {
    const response = await fetch(API_COMPLAINTS);
    if (!response.ok) throw new Error("Network response was not ok");
    currentComplaints = await response.json();
    calculateStats();
    renderAdminTable();
  } catch (error) {
    adminList.innerHTML = `<tr><td colspan="6" style="color:red; text-align:center;">Failed to load data. Is JSON server running?</td></tr>`;
  }
}

function calculateStats() {
  const total = currentComplaints.length;
  const resolvedCount = currentComplaints.filter((c) => c.status === "Resolved").length;
  const pendingCount = currentComplaints.filter((c) => c.status === "Pending").length;
  let resolvedPercent = total > 0 ? Math.round((resolvedCount / total) * 100) : 0;

  document.getElementById("stat-total").textContent = total;
  document.getElementById("stat-resolved").textContent = `${resolvedPercent}%`;
  document.getElementById("stat-pending").textContent = pendingCount;
}

function renderAdminTable() {
  adminList.innerHTML = "";
  if (currentComplaints.length === 0) {
    adminList.innerHTML = `<tr><td colspan="6" style="text-align:center; color:#64748b;">No complaints found.</td></tr>`;
    return;
  }

  currentComplaints.forEach(function (complaint) {
    let pillClass = "pending";
    let icon = "clock";
    if (complaint.status === "In Progress") { pillClass = "in-progress"; icon = "activity"; }
    if (complaint.status === "Resolved") { pillClass = "resolved"; icon = "check-circle"; }

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td class="font-medium text-blue">${complaint.appNo || complaint.id}</td>
      <td>${complaint.name}</td>
      <td>${complaint.department}</td>
      <td>${complaint.district}</td>
      <td>
        <span class="status-pill ${pillClass}">
          <i data-lucide="${icon}" width="12" height="12"></i> ${complaint.status}
        </span>
      </td>
      <td style="display: flex; gap: 8px; align-items: center;">
        <button class="btn-view-modern btn-edit" data-id="${complaint.id}">Edit</button>
        <button class="btn-view-modern btn-delete" data-id="${complaint.id}" style="color: #ef4444; border-color: #fecaca; background: #fff5f5;">Delete</button>
      </td>
    `;
    adminList.appendChild(tr);
  });
  lucide.createIcons();
}

adminList.addEventListener("click", async function (e) {
  const editBtnTarget = e.target.closest(".btn-edit");
  const deleteBtnTarget = e.target.closest(".btn-delete");

  if (editBtnTarget) {
    const id = editBtnTarget.getAttribute("data-id");
    const rec = currentComplaints.find((c) => c.id == id);
    if (!rec) return;
    editIdInput.value = rec.id;
    editName.value = rec.name;
    editDistrict.value = rec.district;
    editStatus.value = rec.status;
    submitBtn.disabled = false;
    clearBtn.disabled = false;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  if (deleteBtnTarget) {
    const id = deleteBtnTarget.getAttribute("data-id");
    if (confirm("Are you sure you want to delete complaint " + id + "?")) {
      await fetch(`${API_COMPLAINTS}/${id}`, { method: "DELETE" });
      fetchComplaints();
      if (editIdInput.value === id) {
        form.reset();
        submitBtn.disabled = true;
        clearBtn.disabled = true;
      }
    }
  }
});

form.addEventListener("submit", async function (e) {
  e.preventDefault();
  const id = editIdInput.value;
  if (!id) return;
  await fetch(`${API_COMPLAINTS}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status: editStatus.value })
  });
  form.reset();
  submitBtn.disabled = true;
  clearBtn.disabled = true;
  fetchComplaints();
});

clearBtn.addEventListener("click", function () {
  form.reset();
  submitBtn.disabled = true;
  clearBtn.disabled = true;
});


// ==================== OUTAGES LOGIC ====================
const API_OUTAGES = "http://localhost:3000/outages";
const outagesList = document.getElementById("admin-outages-list");
const outageForm = document.getElementById("outage-form");
const editOutageId = document.getElementById("edit-outage-id");
const outageCancelBtn = document.getElementById("outage-cancel-btn");
let currentOutages = [];

async function fetchOutages() {
  const res = await fetch(API_OUTAGES);
  currentOutages = await res.json();
  outagesList.innerHTML = "";
  
  currentOutages.forEach(o => {
    let statusClass = o.status.toLowerCase();
    let statusIcon = o.status === 'Active' ? 'alert-triangle' : 'check-circle';
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td class="font-medium">${o.area}</td>
      <td>${o.service}</td>
      <td class="text-blue font-medium">${o.restoreTime}</td>
      <td>
        <span class="status-badge ${statusClass}">
          <i data-lucide="${statusIcon}" width="14" height="14"></i> ${o.status}
        </span>
      </td>
      <td style="display: flex; gap: 8px;">
        <button class="btn-view-modern btn-edit-outage" data-id="${o.id}" style="padding: 4px 8px;">Edit</button>
        <button class="btn-view-modern btn-delete-outage" data-id="${o.id}" style="color: #ef4444; border-color: #fecaca; background: #fff5f5; padding: 4px 8px;">Delete</button>
      </td>
    `;
    outagesList.appendChild(tr);
  });
  lucide.createIcons();
}

outageCancelBtn.addEventListener("click", () => {
  outageForm.reset();
  editOutageId.value = "";
  outageCancelBtn.style.display = "none";
});

outageForm.addEventListener("submit", async function(e) {
  e.preventDefault();
  
  const id = editOutageId.value;
  const outageData = {
    area: document.getElementById('outage-area').value,
    service: document.getElementById('outage-service').value,
    restoreTime: document.getElementById('outage-time').value,
    status: document.getElementById('outage-status').value
  };

  if (id) {
    // Update existing
    await fetch(`${API_OUTAGES}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(outageData)
    });
    outageCancelBtn.style.display = "none";
    editOutageId.value = "";
  } else {
    // Add new
    let newId = "";
    let isUnique = false;
    while (!isUnique) {
      newId = "OUT-" + String(Math.floor(Math.random() * 9000) + 1000);
      isUnique = !currentOutages.some(o => o.id === newId);
    }
    outageData.id = newId;
    
    await fetch(API_OUTAGES, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(outageData)
    });
  }
  
  outageForm.reset();
  fetchOutages();
});

outagesList.addEventListener("click", async function(e) {
  const delBtn = e.target.closest(".btn-delete-outage");
  const editBtn = e.target.closest(".btn-edit-outage");

  if (editBtn) {
    const id = editBtn.getAttribute("data-id");
    const rec = currentOutages.find(o => o.id === id);
    if (rec) {
      editOutageId.value = rec.id;
      document.getElementById('outage-area').value = rec.area;
      document.getElementById('outage-time').value = rec.restoreTime;
      
      const s = document.getElementById('outage-service');
      s.value = rec.service;
      const stat = document.getElementById('outage-status');
      stat.value = rec.status;

      s.dispatchEvent(new Event('change', { bubbles: true }));
      stat.dispatchEvent(new Event('change', { bubbles: true }));
      
      outageCancelBtn.style.display = "block";
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  if (delBtn) {
    const id = delBtn.getAttribute("data-id");
    if(confirm("Delete outage?")) {
      await fetch(`${API_OUTAGES}/${id}`, { method: "DELETE" });
      if (editOutageId.value === id) {
        outageForm.reset();
        editOutageId.value = "";
        outageCancelBtn.style.display = "none";
      }
      fetchOutages();
    }
  }
});


// ==================== QUEUES LOGIC ====================
const API_QUEUES = "http://localhost:3000/queues";
const queuesList = document.getElementById("admin-queues-list");
const queueForm = document.getElementById("queue-form");
const editQueueId = document.getElementById("edit-queue-id");
const queueCancelBtn = document.getElementById("queue-cancel-btn");
let currentQueues = [];

async function fetchQueues() {
  const res = await fetch(API_QUEUES);
  currentQueues = await res.json();
  queuesList.innerHTML = "";
  
  currentQueues.forEach(q => {
    let isClosed = q.status === 'Closed' ? 'closed' : 'open';
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td class="font-medium">${q.office}</td>
      <td class="text-blue font-medium">${q.token}</td>
      <td>${q.waitingTime}</td>
      <td>
        <span class="status-dot ${isClosed}">${q.status}</span>
      </td>
      <td style="display: flex; gap: 8px;">
        <button class="btn-view-modern btn-edit-queue" data-id="${q.id}" style="padding: 4px 8px;">Edit</button>
        <button class="btn-view-modern btn-delete-queue" data-id="${q.id}" style="color: #ef4444; border-color: #fecaca; background: #fff5f5; padding: 4px 8px;">Delete</button>
      </td>
    `;
    queuesList.appendChild(tr);
  });
  lucide.createIcons();
}

queueCancelBtn.addEventListener("click", () => {
  queueForm.reset();
  editQueueId.value = "";
  queueCancelBtn.style.display = "none";
});

queueForm.addEventListener("submit", async function(e) {
  e.preventDefault();
  
  const id = editQueueId.value;
  const queueData = {
    office: document.getElementById('queue-office').value,
    token: document.getElementById('queue-token').value,
    waitingTime: document.getElementById('queue-time').value,
    status: document.getElementById('queue-status').value
  };

  if (id) {
    await fetch(`${API_QUEUES}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(queueData)
    });
    queueCancelBtn.style.display = "none";
    editQueueId.value = "";
  } else {
    let newId = "";
    let isUnique = false;
    while (!isUnique) {
      newId = "Q-" + String(Math.floor(Math.random() * 9000) + 1000);
      isUnique = !currentQueues.some(q => q.id === newId);
    }
    queueData.id = newId;
    
    await fetch(API_QUEUES, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(queueData)
    });
  }
  
  queueForm.reset();
  fetchQueues();
});

queuesList.addEventListener("click", async function(e) {
  const delBtn = e.target.closest(".btn-delete-queue");
  const editBtn = e.target.closest(".btn-edit-queue");

  if (editBtn) {
    const id = editBtn.getAttribute("data-id");
    const rec = currentQueues.find(q => q.id === id);
    if (rec) {
      editQueueId.value = rec.id;
      document.getElementById('queue-office').value = rec.office;
      document.getElementById('queue-token').value = rec.token;
      document.getElementById('queue-time').value = rec.waitingTime;
      
      const stat = document.getElementById('queue-status');
      stat.value = rec.status;
      stat.dispatchEvent(new Event('change', { bubbles: true }));
      
      queueCancelBtn.style.display = "block";
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  if (delBtn) {
    const id = delBtn.getAttribute("data-id");
    if(confirm("Delete queue?")) {
      await fetch(`${API_QUEUES}/${id}`, { method: "DELETE" });
      if (editQueueId.value === id) {
        queueForm.reset();
        editQueueId.value = "";
        queueCancelBtn.style.display = "none";
      }
      fetchQueues();
    }
  }
});


// ==================== INIT ====================
fetchComplaints();
fetchOutages();
fetchQueues();
lucide.createIcons();
