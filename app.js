

const API_URL = "http://localhost:3000/complaints";
let currentComplaints = [];

lucide.createIcons();

//ROUTING  
function navigateTo(pageId) {
  
  document.querySelectorAll('.page-view').forEach(page => {
    page.classList.remove('active');
  });
  
  document.getElementById('view-' + pageId).classList.add('active');

  
  document.querySelectorAll('.nav-item').forEach(nav => {
    nav.classList.remove('active');
  });
  const activeNav = document.getElementById('nav-' + pageId);
  if (activeNav) activeNav.classList.add('active');

 
  window.scrollTo(0,0);
}

//  COMPLAINTS TAB 
function switchComplaintTab(tabId) {
  
  document.getElementById('tab-view-btn').classList.remove('active');
  document.getElementById('tab-form-btn').classList.remove('active');
  document.getElementById('tab-' + tabId + '-btn').classList.add('active');

  
  document.getElementById('pane-view').style.display = 'none';
  document.getElementById('pane-form').style.display = 'none';
  document.getElementById('pane-' + tabId).style.display = 'block';
}

// FETCH COMPLAINTS 
async function fetchComplaints() {
  document.getElementById('complaints-list').innerHTML = `
    <tr><td colspan="8" style="text-align:center; padding: 24px; color: #64748b;">Loading complaints...</td></tr>
  `;
  try {
    await new Promise(r => setTimeout(r, 800)); // Artificial delay for viva
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Network response was not ok");
    
    currentComplaints = await response.json();
    renderComplaints(currentComplaints);
  } catch (error) {
    console.error("Fetch error:", error);
    document.getElementById('complaints-list').innerHTML = `
      <tr><td colspan="8" style="color:red; text-align:center; padding: 24px;">Error loading complaints.</td></tr>
    `;
  }
}

// RENDER COMPLAINTS
function renderComplaints(dataList) {
  const list = document.getElementById('complaints-list');
  list.innerHTML = "";

  dataList.forEach(c => {
    const tr = document.createElement('tr');
    
    
    let pillClass = "pending";
    let icon = "clock";
    if (c.status === "In Progress") { pillClass = "in-progress"; icon = "activity"; }
    if (c.status === "Resolved") { pillClass = "resolved"; icon = "check-circle"; }

    tr.innerHTML = `
      <td class="font-medium text-blue">${c.appNo || c.id}</td>
      <td>${c.name}</td>
      <td>${c.department}</td>
      <td>${c.district}</td>
      <td class="truncate-cell">${c.details || c.description}</td>
      <td class="text-gray">${c.date}</td>
      <td>
        <span class="status-pill ${pillClass}">
          <i data-lucide="${icon}" width="12" height="12"></i> ${c.status}
        </span>
      </td>
      <td>
        <button class="btn-view-modern" onclick="viewComplaint('${c.id}')">View</button>
      </td>
    `;
    list.appendChild(tr);
  });

  document.getElementById('table-footer-text').textContent = `Showing ${dataList.length} records`;
  
 
  lucide.createIcons();
}

//  FILTERING
function applyFilters() {
  const fromDate = document.getElementById('filter-from').value;
  const toDate = document.getElementById('filter-to').value;
  const dept = document.getElementById('filter-dept').value;

  let filtered = currentComplaints;

  if (dept) {
    filtered = filtered.filter(c => c.department === dept);
  }
  if (fromDate) {
    filtered = filtered.filter(c => new Date(c.date) >= new Date(fromDate));
  }
  if (toDate) {
    filtered = filtered.filter(c => new Date(c.date) <= new Date(toDate));
  }

  renderComplaints(filtered);
}

function clearFilters() {
  document.getElementById('filter-from').value = "";
  document.getElementById('filter-to').value = "";
  document.getElementById('filter-dept').value = "";
  renderComplaints(currentComplaints);
}

// VALIDATION HELPERS 
function showError(inputEl, errorId, message) {
  inputEl.classList.add("input-error");
  const span = document.getElementById(errorId);
  span.textContent = message;
  span.classList.add("visible");
}

function clearError(inputEl, errorId) {
  inputEl.classList.remove("input-error");
  const span = document.getElementById(errorId);
  span.textContent = "";
  span.classList.remove("visible");
}

function validateComplaintForm() {
  let isValid = true;
  
  const nameInput = document.getElementById('input-name');
  if (!nameInput.value.trim()) {
    showError(nameInput, "err-name", "Full Name is required.");
    isValid = false;
  } else {
    clearError(nameInput, "err-name");
  }

  const genderInput = document.getElementById('input-gender');
  if (!genderInput.value) {
    showError(genderInput, "err-gender", "Please select a gender.");
    isValid = false;
  } else {
    clearError(genderInput, "err-gender");
  }

  const phoneInput = document.getElementById('input-phone');
  const phoneVal = phoneInput.value.trim();
  if (!phoneVal) {
    showError(phoneInput, "err-phone", "Mobile Number is required.");
    isValid = false;
  } else if (!/^\d+$/.test(phoneVal.replace(/\D/g, ''))) {
    showError(phoneInput, "err-phone", "Phone number must be valid digits.");
    isValid = false;
  } else {
    clearError(phoneInput, "err-phone");
  }

  const districtInput = document.getElementById('input-district');
  if (!districtInput.value) {
    showError(districtInput, "err-district", "Please select a district.");
    isValid = false;
  } else {
    clearError(districtInput, "err-district");
  }

  const deptInput = document.getElementById('input-department');
  if (!deptInput.value) {
    showError(deptInput, "err-department", "Please select a department.");
    isValid = false;
  } else {
    clearError(deptInput, "err-department");
  }

  const detailsInput = document.getElementById('input-details');
  if (!detailsInput.value.trim()) {
    showError(detailsInput, "err-details", "Complaint details cannot be empty.");
    isValid = false;
  } else {
    clearError(detailsInput, "err-details");
  }

  return isValid;
}

// FORM SUBMIT (POST) 
document.getElementById('complaint-form').addEventListener('submit', async function(e) {
  e.preventDefault();

  if (!validateComplaintForm()) {
    return;
  }

  const name = document.getElementById('input-name').value.trim();
  const gender = document.getElementById('input-gender').value;
  const phone = document.getElementById('input-phone').value.trim();
  const district = document.getElementById('input-district').value;
  const department = document.getElementById('input-department').value;
  const details = document.getElementById('input-details').value.trim();

  let newAppId = "";
  let isUnique = false;
  while (!isUnique) {
    newAppId = "CMP-" + String(Math.floor(Math.random() * 9000) + 1000);
    isUnique = !currentComplaints.some(c => c.appNo === newAppId || c.id === newAppId);
  }

  const newComplaint = {
    appNo: newAppId,
    name, gender, phone, district, department, details,
    date: new Date().toISOString().split("T")[0],
    status: "Pending"
  };

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newComplaint)
    });

    if (!response.ok) throw new Error("Failed to submit");

    document.getElementById('complaint-form').reset();
    
    // Show success briefly
    const successDiv = document.getElementById('form-success');
    successDiv.textContent = `Complaint submitted successfully! Application No: ${newAppId}`;
    successDiv.style.display = 'block';
    
    setTimeout(() => {
      successDiv.style.display = 'none';
    }, 5000);

    fetchComplaints();

  } catch (err) {
    alert("Error submitting. Make sure JSON Server is running.");
  }
});

//  MODAL LOGIC 
function viewComplaint(id) {
  const c = currentComplaints.find(x => x.id === id);
  if (!c) return;

  document.getElementById('modal-id').textContent = c.appNo || c.id;
  document.getElementById('modal-name').textContent = c.name;
  document.getElementById('modal-date').textContent = c.date;
  document.getElementById('modal-dept').textContent = c.department;
  document.getElementById('modal-dist').textContent = c.district;
  document.getElementById('modal-desc').textContent = c.details || c.description;

  const statusEl = document.getElementById('modal-status');
  statusEl.textContent = c.status;
  statusEl.className = "status-pill";
  if (c.status === "Pending") statusEl.classList.add('pending');
  if (c.status === "In Progress") statusEl.classList.add('in-progress');
  if (c.status === "Resolved") statusEl.classList.add('resolved');

  document.getElementById('view-modal').classList.add('active');
}

function closeModal() {
  document.getElementById('view-modal').classList.remove('active');
}

//  FETCH OUTAGES & QUEUES
async function fetchOutages() {
  try {
    const res = await fetch("http://localhost:3000/outages");
    if (res.ok) {
      const outages = await res.json();
      renderOutages(outages);
    }
  } catch (err) {
    console.error("Error fetching outages", err);
  }
}

async function fetchQueues() {
  try {
    const res = await fetch("http://localhost:3000/queues");
    if (res.ok) {
      const queues = await res.json();
      renderQueues(queues);
    }
  } catch (err) {
    console.error("Error fetching queues", err);
  }
}

//   DATA RENDER OutagesQueues
function renderOutages(outages) {
  const grid = document.getElementById('outage-grid');
  grid.innerHTML = "";
  outages.forEach(o => {
    let bgColor = o.service === 'Electricity' ? '#fef3c7' : o.service === 'Water Supply' ? '#e0f2fe' : '#ffedd5';
    let iconColor = o.service === 'Electricity' ? '#d97706' : o.service === 'Water Supply' ? '#0369a1' : '#c2410c';
    let statusClass = o.status.toLowerCase();
    let statusIcon = o.status === 'Active' ? 'alert-triangle' : 'check-circle';

    grid.innerHTML += `
      <div class="outage-card">
        <div class="outage-card-header">
          <div class="outage-icon" style="background-color: ${bgColor}; color: ${iconColor};">
            <i data-lucide="zap" width="24" height="24"></i>
          </div>
          <span class="status-badge ${statusClass}">
            <i data-lucide="${statusIcon}" width="14" height="14"></i> ${o.status}
          </span>
        </div>
        <h3 class="outage-service">${o.service}</h3>
        <div class="outage-details">
          <div class="detail-row">
            <span class="detail-label">Affected Area</span>
            <span class="detail-value">${o.area}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Est. Restoration</span>
            <span class="detail-value highlight">${o.restoreTime}</span>
          </div>
        </div>
      </div>
    `;
  });
  lucide.createIcons();
}

function renderQueues(queues) {
  const grid = document.getElementById('queue-grid');
  grid.innerHTML = "";
  queues.forEach(q => {
    let isClosed = q.status === 'Closed' ? 'closed' : 'open';
    
    grid.innerHTML += `
      <div class="queue-card ${q.status === 'Closed' ? 'closed' : ''}">
        <div class="queue-header">
          <div class="queue-office">
            <i data-lucide="building" width="20" height="20" class="office-icon"></i>
            <h3>${q.office}</h3>
          </div>
          <span class="status-dot ${isClosed}">${q.status}</span>
        </div>
        <div class="queue-body">
          <div class="queue-metric">
            <span class="metric-label">Current Token</span>
            <div class="metric-value token-value">
              <i data-lucide="users" width="20" height="20"></i> ${q.token}
            </div>
          </div>
          <div class="queue-divider"></div>
          <div class="queue-metric">
            <span class="metric-label">Est. Wait Time</span>
            <div class="metric-value time-value">
              <i data-lucide="clock" width="20" height="20"></i> ${q.waitingTime}
            </div>
          </div>
        </div>
      </div>
    `;
  });
  lucide.createIcons();
}


fetchComplaints();
fetchOutages();
fetchQueues();
lucide.createIcons();

//  QUEUE TAB 
function switchQueueTab(tabId) {
  document.getElementById('tab-queue-live-btn').classList.remove('active');
  document.getElementById('tab-queue-token-btn').classList.remove('active');
  document.getElementById('tab-queue-' + tabId + '-btn').classList.add('active');

  document.getElementById('pane-queue-live').style.display = 'none';
  document.getElementById('pane-queue-token').style.display = 'none';
  document.getElementById('pane-queue-' + tabId).style.display = 'block';
}

document.getElementById('token-form').addEventListener('submit', async function(e) {
  e.preventDefault();
  
  const dist = document.getElementById('token-district').value;
  const dept = document.getElementById('token-department').value;
  const name = document.getElementById('token-name').value;

  if (!dist || !dept || !name) return;


  let generatedToken = "";
  let isUniqueToken = false;
  
  let currentQueues = [];
  try {
    const res = await fetch("http://localhost:3000/queues");
    if (res.ok) currentQueues = await res.json();
  } catch(e) {}

  while (!isUniqueToken) {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const letter = letters.charAt(Math.floor(Math.random() * letters.length));
    const num = Math.floor(Math.random() * 90) + 10;
    generatedToken = letter + "-" + num;
    isUniqueToken = !currentQueues.some(q => q.token === generatedToken);
  }

  document.getElementById('generated-token-number').textContent = generatedToken;
  document.getElementById('generated-token-office').textContent = dept + ", " + dist;
  
  document.getElementById('token-form').style.display = 'none';
  document.getElementById('token-result').style.display = 'block';

 
  const newQueue = {
    id: "Q-" + String(Math.floor(Math.random() * 9000) + 1000),
    office: dept + ", " + dist,
    token: generatedToken,
    waitingTime: "15 mins",
    status: "Open"
  };

  try {
    await fetch("http://localhost:3000/queues", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newQueue)
    });
    fetchQueues(); 
  } catch(err) {
    console.error("Error saving token", err);
  }
});
