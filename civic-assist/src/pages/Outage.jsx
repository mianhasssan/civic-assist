import React from 'react';
import { ArrowLeft, Zap, AlertTriangle, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Outage.css';

function Outage() {
  const outages = [
    {
      area: "Bahawalpur City",
      service: "Water Supply",
      status: "Active",
      restoreTime: "2026-04-05 10:00 AM"
    },
    {
      area: "Lahore North",
      service: "Electricity",
      status: "Active",
      restoreTime: "2026-04-05 02:00 PM"
    },
    {
      area: "Multan South",
      service: "Gas Supply",
      status: "Resolved",
      restoreTime: "Restored"
    }
  ];

  return (
    <div className="page-wrapper">
      <header className="page-header">
        <div className="page-header-content">
          <Link to="/" className="btn-back">
            <ArrowLeft size={16} /> Back to Home
          </Link>
          <h1>Service Outages</h1>
          <p>View current service disruptions and estimated restoration times.</p>
        </div>
      </header>

      <div className="page-container">
        <div className="outage-grid">
          {outages.map((outage, index) => (
            <div key={index} className="outage-card">
              <div className="outage-card-header">
                <div className="outage-icon" style={{ backgroundColor: outage.service === 'Electricity' ? '#fef3c7' : outage.service === 'Water Supply' ? '#e0f2fe' : '#ffedd5', color: outage.service === 'Electricity' ? '#d97706' : outage.service === 'Water Supply' ? '#0369a1' : '#c2410c' }}>
                  <Zap size={24} />
                </div>
                <span className={`status-badge ${outage.status.toLowerCase()}`}>
                  {outage.status === 'Active' ? <AlertTriangle size={14} /> : <CheckCircle size={14} />}
                  {outage.status}
                </span>
              </div>
              
              <h3 className="outage-service">{outage.service}</h3>
              
              <div className="outage-details">
                <div className="detail-row">
                  <span className="detail-label">Affected Area</span>
                  <span className="detail-value">{outage.area}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Est. Restoration</span>
                  <span className="detail-value highlight">{outage.restoreTime}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Outage;