# Civic Assist - Public Utility Portal

Civic Assist is a modern, responsive, Citizen Service Portal designed to digitize and streamline public utilities and government interactions. Originally conceived as a React application, this project has been completely rebuilt in **Vanilla HTML, CSS, and JavaScript** to provide maximum performance, simplicity, and ease of deployment without relying on complex build steps.

## Features

- **Complaint Management:** Citizens can file, track, and filter complaints across various government departments and districts.
- **Service Outages:** Live monitoring of current service disruptions (Water, Electricity, Gas) with estimated restoration times.
- **Office Queues:** Citizens can view live token numbers and estimated waiting times for government offices, and even generate a self-token digitally.
- **Admin Dashboard:** A robust backend interface to easily manage Outages, Queues, and Complaint statuses with full CRUD functionality.

## Technology Stack

- **Frontend:** Pure HTML5, CSS3, and Vanilla JavaScript.
- **Backend Mocking:** JSON Server (`db.json`) for realistic API interactions (`GET`, `POST`, `PATCH`, `DELETE`).
- **Icons:** Lucide Icons.

## How to Run Locally

1. Clone this repository.
2. Navigate to the `civic-assist-vanilla` directory.
3. Start the JSON server to handle the backend data:
   ```bash
   npx json-server --watch db.json
   ```
4. Open `index.html` in your browser (or use the VS Code Live Server extension).
5. Access the Admin Panel by clicking "Admin Login" in the navbar, or by opening `admin.html` directly.

## Structure

All core logic is contained within the `civic-assist-vanilla` directory.
- `index.html` / `app.js` - Main citizen portal.
- `admin.html` / `admin.js` - Admin control panel.
- `style.css` - Global stylesheet including the modern UI design system.
- `db.json` - The local database structure powering the dynamic data.
