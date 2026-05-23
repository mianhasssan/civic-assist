import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Plus, List, Filter, FileText, CheckCircle, Clock, X } from 'lucide-react';
import './Complaint.css';

function Complaint() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('view');
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  
  // Existing state logic...
  const [complaints, setComplaints] = useState([
    {
      id: "CMP-001",
      name: "Mian Muhammad Hassan",
      department: "WASA",
      district: "Bahawalpur",
      details: "No water supply in area for 3 days",
      date: "2026-04-04",
      status: "Pending"
    },
    {
      id: "CMP-002",
      name: "Fatima Khan",
      department: "DC Office",
      district: "Lahore",
      details: "Road damaged near market",
      date: "2026-04-03",
      status: "In Progress"
    },
    {
      id: "CMP-003",
      name: "Ahmed Ali",
      department: "Education",
      district: "Multan",
      details: "School building maintenance issue",
      date: "2026-04-02",
      status: "Resolved"
    }
  ]);

  const [formData, setFormData] = useState({
    name: '', gender: '', phone: '', address: '',
    district: '', department: '', details: '', file: ''
  });

  const [filterData, setFilterData] = useState({
    fromDate: '', toDate: '', deptFilter: ''
  });

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilterData(prev => ({ ...prev, [name]: value }));
  };

  const clearFormData = () => {
    setFormData({ name: '', gender: '', phone: '', address: '', district: '', department: '', details: '', file: '' });
  };

  const clearFilter = () => {
    setFilterData({ fromDate: '', toDate: '', deptFilter: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.gender || !formData.phone.trim() || !formData.district || !formData.department || !formData.details.trim()) {
      alert("❌ Please fill all required fields");
      return;
    }
    const newComplaint = {
      id: "CMP-" + String(Math.floor(Math.random() * 9000) + 1000),
      ...formData,
      date: new Date().toISOString().split("T")[0],
      status: "Pending"
    };
    setComplaints([newComplaint, ...complaints]);
    alert(`✅ Complaint submitted successfully!\n\nApplication No: ${newComplaint.id}`);
    clearFormData();
    setActiveTab('view');
  };

  return (
    <div className="page-wrapper">
      <header className="page-header">
        <div className="page-header-content">
          <Link to="/" className="btn-back">
            <ArrowLeft size={16} /> Back to Home
          </Link>
          <h1>Complaint Management</h1>
          <p>Submit and track issues with public utilities and services.</p>
        </div>
      </header>

      <div className="page-container">
        
        {/* Modern Segmented Control for Tabs */}
        <div className="tab-control">
          <button 
            className={`tab-btn ${activeTab === 'view' ? 'active' : ''}`}
            onClick={() => setActiveTab('view')}
          >
            <List size={18} /> View Complaints
          </button>
          <button 
            className={`tab-btn ${activeTab === 'form' ? 'active' : ''}`}
            onClick={() => setActiveTab('form')}
          >
            <Plus size={18} /> Register Complaint
          </button>
        </div>

        {activeTab === 'view' && (
          <div className="tab-pane animate-fade-in">
            {/* Filter Card */}
            <div className="card filter-card">
              <div className="card-header">
                <Filter size={20} className="card-icon" />
                <h2>Filter Complaints</h2>
              </div>
              <div className="filter-grid">
                <div className="input-group">
                  <label>From Date</label>
                  <input type="date" name="fromDate" value={filterData.fromDate} onChange={handleFilterChange} className="modern-input" />
                </div>
                <div className="input-group">
                  <label>To Date</label>
                  <input type="date" name="toDate" value={filterData.toDate} onChange={handleFilterChange} className="modern-input" />
                </div>
                <div className="input-group">
                  <label>Department</label>
                  <select name="deptFilter" value={filterData.deptFilter} onChange={handleFilterChange} className="modern-select">
                    <option value="">All Departments</option>
                    <option value="DC Office">DC Office</option>
                    <option value="Health">Health</option>
                    <option value="Police">Police</option>
                    <option value="Education">Education</option>
                    <option value="WASA">WASA</option>
                  </select>
                </div>
                <div className="filter-actions-modern">
                  <button className="btn-modern btn-primary-outline" onClick={clearFilter}>Apply Filter</button>
                  <button className="btn-modern btn-secondary-outline" onClick={clearFilter}>Clear</button>
                </div>
              </div>
            </div>

            {/* Table Card */}
            <div className="card table-card">
              <div className="card-header">
                <FileText size={20} className="card-icon" />
                <h2>Complaints Directory</h2>
              </div>
              <div className="table-responsive">
                <table className="modern-table">
                  <thead>
                    <tr>
                      <th>App No</th>
                      <th>Name</th>
                      <th>Department</th>
                      <th>District</th>
                      <th>Details</th>
                      <th>Date</th>
                      <th>Status</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {complaints.map(complaint => (
                      <tr key={complaint.id}>
                        <td className="font-medium text-blue">{complaint.id}</td>
                        <td>{complaint.name}</td>
                        <td>{complaint.department}</td>
                        <td>{complaint.district}</td>
                        <td className="truncate-cell">{complaint.details}</td>
                        <td className="text-gray">{complaint.date}</td>
                        <td>
                          <span className={`status-pill ${complaint.status.toLowerCase().replace(' ', '-')}`}>
                            {complaint.status === 'Resolved' && <CheckCircle size={12} />}
                            {complaint.status === 'Pending' && <Clock size={12} />}
                            {complaint.status}
                          </span>
                        </td>
                        <td>
                          <button 
                            className="btn-view-modern"
                            onClick={() => setSelectedComplaint(complaint)}
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="table-footer">
                Showing {complaints.length} records
              </div>
            </div>
          </div>
        )}

        {activeTab === 'form' && (
          <div className="tab-pane animate-fade-in">
            <div className="card form-card">
              <div className="card-header border-bottom">
                <Plus size={20} className="card-icon" />
                <h2>Register New Complaint</h2>
              </div>
              <form onSubmit={handleSubmit} className="modern-form">
                <div className="form-grid">
                  <div className="input-group">
                    <label>Full Name <span className="required">*</span></label>
                    <input type="text" name="name" value={formData.name} onChange={handleFormChange} className="modern-input" placeholder="e.g. Ali Khan" />
                  </div>
                  <div className="input-group">
                    <label>Gender <span className="required">*</span></label>
                    <select name="gender" value={formData.gender} onChange={handleFormChange} className="modern-select">
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                  <div className="input-group">
                    <label>Mobile Number <span className="required">*</span></label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleFormChange} className="modern-input" placeholder="0300-0000000" />
                  </div>
                  <div className="input-group">
                    <label>District <span className="required">*</span></label>
                    <select name="district" value={formData.district} onChange={handleFormChange} className="modern-select">
                      <option value="">Select District</option>
                      <option value="Lahore">Lahore</option>
                      <option value="Bahawalpur">Bahawalpur</option>
                      <option value="Multan">Multan</option>
                    </select>
                  </div>
                </div>

                <div className="input-group full-width mt-4">
                  <label>Department <span className="required">*</span></label>
                  <select name="department" value={formData.department} onChange={handleFormChange} className="modern-select">
                    <option value="">Select Department</option>
                    <option value="DC Office">DC Office</option>
                    <option value="WASA">WASA</option>
                    <option value="Police">Police</option>
                    <option value="Education">Education</option>
                  </select>
                </div>

                <div className="input-group full-width mt-4">
                  <label>Address</label>
                  <input type="text" name="address" value={formData.address} onChange={handleFormChange} className="modern-input" placeholder="Complete address" />
                </div>

                <div className="input-group full-width mt-4">
                  <label>Complaint Details <span className="required">*</span></label>
                  <textarea name="details" rows="4" value={formData.details} onChange={handleFormChange} className="modern-textarea" placeholder="Describe the issue in detail..."></textarea>
                </div>

                <div className="form-actions mt-6">
                  <button type="submit" className="btn-modern btn-submit">Submit Complaint</button>
                  <button type="button" className="btn-modern btn-cancel" onClick={clearFormData}>Clear</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>

      {/* Modern Modal for Viewing Complaint Details */}
      {selectedComplaint && (
        <div className="modal-overlay" onClick={() => setSelectedComplaint(null)}>
          <div className="modal-content animate-fade-in" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Complaint Details</h2>
              <button className="btn-close-modal" onClick={() => setSelectedComplaint(null)}>
                <X size={20} />
              </button>
            </div>
            
            <div className="modal-body">
              <div className="modal-status-bar">
                <div>
                  <span className="modal-label">Application Number</span>
                  <div className="modal-value font-medium text-blue">{selectedComplaint.id}</div>
                </div>
                <div>
                  <span className="modal-label">Status</span>
                  <div className={`status-pill ${selectedComplaint.status.toLowerCase().replace(' ', '-')}`}>
                    {selectedComplaint.status}
                  </div>
                </div>
              </div>

              <div className="modal-grid">
                <div className="modal-info-group">
                  <span className="modal-label">Complainant Name</span>
                  <span className="modal-value">{selectedComplaint.name}</span>
                </div>
                <div className="modal-info-group">
                  <span className="modal-label">Date Submitted</span>
                  <span className="modal-value">{selectedComplaint.date}</span>
                </div>
                <div className="modal-info-group">
                  <span className="modal-label">Department</span>
                  <span className="modal-value">{selectedComplaint.department}</span>
                </div>
                <div className="modal-info-group">
                  <span className="modal-label">District</span>
                  <span className="modal-value">{selectedComplaint.district}</span>
                </div>
              </div>

              <div className="modal-info-group full-width" style={{ marginTop: '20px' }}>
                <span className="modal-label">Description of Issue</span>
                <div className="modal-description-box">
                  {selectedComplaint.details}
                </div>
              </div>
            </div>
            
            <div className="modal-footer">
              <button className="btn-modern btn-secondary-outline" onClick={() => setSelectedComplaint(null)}>
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Complaint;