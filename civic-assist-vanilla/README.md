# Civic Assist — Capstone Project

**Name**: [Your Name]
**Roll Number**: [Your Roll Number]
**Course**: Web Technologies SP26

## Project Description
Civic Assist is a citizen reporting platform. The user panel allows citizens to report civic issues like broken streetlights or potholes. The admin panel allows city officials to review these complaints, edit their status, delete them, and view real-time statistics. 

## Technology Stack
- **HTML5 & CSS3** (Semantic HTML)
- **Vanilla JavaScript** (No Frameworks)
- **Bootstrap 5** (For layout and the +5 Bonus Marks)
- **JSON Server** (Mock REST API backend)

## Features
### User Panel (`index.html`)
- Submit a new complaint (POST) with inline validation.
- View a list of all complaints (GET).
- Filter complaints by status (All, Pending, In Progress, Resolved).
- Loading and error states handled gracefully.

### Admin Panel (`admin.html`)
- View a comprehensive database table of all complaints (GET).
- Update the status of a complaint (PATCH).
- Delete a complaint with a confirmation dialog (DELETE).
- Live Summary Statistics: Total Complaints, Resolved Percentage, and High Priority count.

## How to Install & Run
1. **Prerequisites**: Ensure you have [Node.js](https://nodejs.org/) installed on your computer.
2. **Start the Backend Database**:
   Open a terminal in this project folder and run:
   ```bash
   npx json-server --watch db.json
   ```
   *(This starts the JSON Server on `http://localhost:3000`)*
3. **Open the Application**:
   - Open `index.html` in your web browser (preferably using VS Code Live Server for the best experience).
   - From there, you can navigate to the Admin Panel via the button in the top navigation bar.

## Screenshots
*(Add screenshots of your User Panel and Admin Panel here before final zip submission)*
