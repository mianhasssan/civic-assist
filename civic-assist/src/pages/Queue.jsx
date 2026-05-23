import React from 'react';
import { ArrowLeft, Clock, Building, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Queue.css';

function Queue() {
  const queues = [
    {
      office: "DC Office, Bahawalpur",
      token: "A-45",
      waitingTime: "15 mins",
      status: "Open"
    },
    {
      office: "WASA, Lahore",
      token: "W-32",
      waitingTime: "25 mins",
      status: "Open"
    },
    {
      office: "Police Station, Multan",
      token: "P-18",
      waitingTime: "0 mins",
      status: "Closed"
    }
  ];

  return (
    <div className="page-wrapper">
      <header className="page-header">
        <div className="page-header-content">
          <Link to="/" className="btn-back">
            <ArrowLeft size={16} /> Back to Home
          </Link>
          <h1>Queue Status</h1>
          <p>Check live token numbers and estimated waiting times at government offices.</p>
        </div>
      </header>

      <div className="page-container">
        <div className="queue-grid">
          {queues.map((queue, index) => (
            <div key={index} className={`queue-card ${queue.status === 'Closed' ? 'closed' : ''}`}>
              <div className="queue-header">
                <div className="queue-office">
                  <Building size={20} className="office-icon" />
                  <h3>{queue.office}</h3>
                </div>
                <span className={`status-dot ${queue.status.toLowerCase()}`}>
                  {queue.status}
                </span>
              </div>
              
              <div className="queue-body">
                <div className="queue-metric">
                  <span className="metric-label">Current Token</span>
                  <div className="metric-value token-value">
                    <Users size={20} />
                    {queue.token}
                  </div>
                </div>
                
                <div className="queue-divider"></div>
                
                <div className="queue-metric">
                  <span className="metric-label">Est. Wait Time</span>
                  <div className="metric-value time-value">
                    <Clock size={20} />
                    {queue.waitingTime}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Queue;