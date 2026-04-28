# CampusMate AI Assistant

CampusMate AI Assistant is a smart task and study management dashboard designed to help students organize their academic life.

## Chosen Vertical
**EdTech / Student Productivity**

## Approach
This project is built using a modern full-stack architecture:
- **Frontend**: React (via Vite) with Tailwind CSS v4 for a responsive, accessible, and dynamic UI. Lucide-react is used for clean iconography.
- **Backend**: Node.js and Express to handle task classification logic and provide a REST API.
- **Database**: Firebase Admin SDK is configured for Firestore. A mock in-memory database is provided as a fallback if Firebase credentials are not supplied, ensuring the application runs smoothly out of the box.

## Smart Decision Logic
The application automatically classifies tasks into three categories:
1. **Urgent**: If the deadline is within 48 hours from the current time.
2. **Important**: If the task's priority is set to 'High' OR if the category is 'Exam'.
3. **Normal**: Any task that doesn't meet the above criteria.

*Conflict Resolution*: If a task meets the criteria for both Urgent and Important, it is classified as **"Urgent & Important"**.

## Google Services Used
- **Google Calendar**: The app features a "Add to Google Calendar" button. It dynamically generates an event template URL (`calendar.google.com/calendar/render`) to seamlessly open a pre-filled Google Calendar event in a new tab without requiring complex OAuth flows.

## Assumptions
- The application defaults to an in-memory database if `serviceAccountKey.json` is missing, so reviewers can easily test the UI and logic without setting up a Firebase project.
- Tasks added to Google Calendar default to a 1-hour duration starting at the exact deadline specified.

## Setup Steps

### 1. Clone the repository
\`\`\`bash
git clone <repository_url>
cd campusmate-ai-assistant
\`\`\`

### 2. Backend Setup
\`\`\`bash
cd backend
npm install

# (Optional) Firebase Setup: 
# Place your 'serviceAccountKey.json' from Firebase Console inside the 'backend/config' folder or root 'backend' folder.
# If you skip this step, the app will run using a Mock in-memory database.

npm run dev # or node index.js
# Runs on http://localhost:5000
\`\`\`

### 3. Frontend Setup
Open a new terminal tab:
\`\`\`bash
cd frontend
npm install
npm run dev
# Vite runs on http://localhost:5173
\`\`\`

### 4. Access the App
Open your browser and navigate to the frontend URL provided by Vite (e.g., `http://localhost:5173`).
