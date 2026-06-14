<div align="center">
  <img src="https://img.icons8.com/color/96/000000/city-buildings.png" alt="City Logo"/>
  <h1>🏛️ Civic Assist - Public Utility Portal</h1>
  <p><strong>A Modern, High-Performance Citizen Service Dashboard</strong></p>

  <p>
    <a href="#features">Features</a> • 
    <a href="#tech-stack">Tech Stack</a> • 
    <a href="#installation--usage">Installation</a> • 
    <a href="#contact--author">Contact</a>
  </p>

  ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
  ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
  ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
  ![JSON Server](https://img.shields.io/badge/JSON_Server-323330?style=for-the-badge&logo=json&logoColor=white)
</div>

---

## 📌 Overview
Civic Assist is a streamlined, responsive web application designed to digitize government interactions and public utilities. By migrating away from complex frontend frameworks, this project utilizes pure Vanilla web technologies to deliver blazing fast load times, zero build steps, and maximum accessibility. 

The entire source code for this project is located in this directory.

---

## ✨ Core Features

### 📋 1. Digital Complaint Management
- Citizens can file, track, and manage complaints across multiple distinct government divisions (e.g., *HUD & PHE, Punjab Police, Revenue Board, Education Sector*).
- Features dynamic, searchable dropdowns and rigorous ID generation to ensure completely unique tracking numbers (e.g., `CMP-8214`).

### ⚡ 2. Live Service Outages
- A real-time grid monitoring active utility disruptions (Electricity, Water Supply).
- Displays exact affected areas, live status badges, and estimated restoration times to keep the public informed.

### 🎟️ 3. Smart Queue System
- Citizens can monitor live digital queues at physical government offices (e.g., *DC Office, Lahore*).
- Includes the ability to **Self-Generate a Digital Token** from home, drastically reducing physical waiting times in government buildings.

### 🔐 4. Secure Admin Dashboard
- A dedicated backend interface (`admin.html`) allowing administrative staff to securely manage the database.
- Features complete **CRUD capabilities**: Admin can dynamically add, edit, or resolve complaints, queues, and outages on the fly.
- ⭐ **Bonus Feature:** Quickly **Export to CSV** from the Admin panel to download complaint records.

---

## 🛠️ Tech Stack

This project was intentionally designed without a build step for maximum portability.

- **Frontend Architecture:** Vanilla HTML5, CSS3, ES6 JavaScript
- **Backend / Database:** [JSON Server](https://github.com/typicode/json-server) providing a full REST API (`GET`, `POST`, `PATCH`, `DELETE`)
- **Iconography:** [Lucide Icons](https://lucide.dev/)
- **Typography:** Inter (Google Fonts)

---

## 🚀 Installation & Usage

To run this project locally, follow these simple steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/mianhasssan/civic-assist.git
   ```

2. **Navigate into the project folder:**
   ```bash
   cd civic-assist
   ```

3. **Start the backend JSON Database:**
   *(Ensure you have Node.js installed)*
   ```bash
   npx json-server --watch db.json
   ```

4. **Launch the Frontend:**
   Simply open `index.html` in your favorite web browser, or use the **Live Server** extension in VS Code.

---

## 📞 Contact & Author

**Mian Muhammad Hassan**  
*AI Developer*

- 🌐 **GitHub:** [@mianhasssan](https://github.com/mianhasssan)
- 💼 **LinkedIn:** [https://www.linkedin.com/in/mianmuhammadhassan322]
- 📧 **Email:** [mmh427726@gmail.com]
- 🎓 **Roll Number:** F24BDOCS1M-01322


> *Feel free to reach out for collaborations, feedback, or inquiries regarding this Project!*
