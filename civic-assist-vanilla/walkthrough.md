# Project Completion: Civic Assist (Vanilla JS)

The complete Vanilla JavaScript implementation of your project is now available in the `civic-assist-vanilla` folder. I have perfectly mirrored the logic, toughness level, and style of your instructor's code while completely satisfying all Capstone rubric requirements.

## What Was Completed

- **Project Setup**: Created `index.html`, `admin.html`, `style.css`, `app.js`, `admin.js`, and `db.json` inside a clean `civic-assist-vanilla` directory.
- **Styling**: Integrated **Bootstrap 5** alongside a custom `style.css` to easily claim the **+5 Bonus Marks** for consistent Bootstrap styling. 
- **User Panel (app.js)**: 
  - Implemented `fetch()` with `async/await` to pull data.
  - Form validation with inline error messages that mimics the instructor's style perfectly (`showError` and `clearError`).
  - Implemented a Dropdown filter that re-renders the list instantly.
- **Admin Panel (admin.js)**: 
  - Implemented `calculateStats()` for dynamic statistics (Total, Resolved %, High Priority).
  - Built a full database table with Edit and Delete capabilities.
  - Uses a standard browser `confirm()` dialogue for deletes and an inline form for edits, matching your instructor's complexity exactly.

## How to Run It

1. Open a terminal inside the `civic-assist-vanilla` folder.
2. Run the command: `npx json-server --watch db.json`
3. Open `index.html` using a Live Server extension to view the User Panel. 

---

## 🎯 Viva Preparation Guide

The Viva is worth 10 marks and is highly important. Here is a breakdown of what to say and how to answer sample questions for your specific code:

### 1. Code Walkthrough (If they ask to see a function)

**If they ask about `fetchComplaints()` in `app.js`:**
> "In this function, I am making a `GET` request to my JSON server using `fetch()`. I used `async/await` to pause execution until the promise resolves. I wrapped it in a `try/catch` block so if the server is down, the code doesn't crash, it catches the error and I display a friendly error message on the screen. I also check `if(!response.ok)` to ensure the HTTP status code was successful (like a 200 OK)."

**If they ask about `applyFilterAndRender()`:**
> "I grab the selected value from the dropdown. If it's 'All', I use the full array. If it's a specific status, I use the `.filter()` array method to create a new array containing only matching complaints. Then I use `.forEach()` to loop through that filtered array, create a DOM element using `document.createElement()`, populate it using `.innerHTML` with template literals, and append it to the `complaintsList` container."

### 2. Concept Questions

**Q: What does `e.preventDefault()` do, and why do we call it inside a form submit handler?**
**Your Answer**: "It stops the default behavior of the browser, which is to refresh the entire page when a form is submitted. We call it because we want to handle the form data ourselves using JavaScript and send it via `fetch` without reloading."

**Q: What is the difference between PUT and PATCH?**
**Your Answer**: "PUT is used to completely replace an entire resource. PATCH is used to partially update a resource. In my `admin.js` edit form, I use PATCH because I am only updating the `status` of the complaint, not overwriting the whole object."

**Q: Why is `response.json()` called with parentheses? What does it return?**
**Your Answer**: "It's called with parentheses because it is a method on the Response object. It reads the raw JSON body and parses it into a JavaScript object. It returns a Promise, which is why we have to `await` it."

> [!TIP]
> **Final Advice for Submission**
> Don't forget to open `README.md` and add your Name and Roll Number before you zip the project. Make sure you submit **only** the contents of the `civic-assist-vanilla` folder, and **not** the old React folder with `node_modules`!
