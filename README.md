# Momentum App 🚀📊✨

Momentum is a modern, full-stack project management application that helps teams and individuals organize tasks, track project progress, and boost productivity with an intuitive Kanban board interface. Create projects, manage tasks with drag-and-drop functionality, and gain insights into your productivity with real-time analytics.

## 🔗 [Live App](https://momentum-bd1d7.web.app/)

## 🚀 Features

- 🔐 Firebase Authentication (Google Sign-In, Email/Password)
- 📊 **Project Management:** Create, edit, and organize projects with detailed descriptions and progress tracking.
- 📋 **Task Management:** Add, edit, and delete tasks within projects with priority levels and status tracking.
- 🎯 **Kanban Board View:** Drag-and-drop task organization with customizable columns (To Do, In Progress, Done).
- 📝 **List View:** Alternative table-style task display for detailed task management.
- 📈 **Real-time Analytics:** Track completion rates, task counts, and overall project progress.
- 📱 **User Dashboard:** Overview of all projects and tasks with personal productivity metrics.
- 🔄 **Real-time Updates:** Live synchronization across all users and devices.
- 📱 Fully responsive design for use on various devices.

---

## 🧰 Tech Stack

- **Frontend:** React.js, Tailwind CSS, React Router, React Icons, React Hook Form
- **Backend/Services:** Firebase (Authentication, Firestore, Hosting)
- **State Management:** React Context API with custom providers
- **Form Handling:** React Hook Form with Yup validation
- **UI/UX:** Tailwind CSS 4, React Hot Toast for notifications

---

## ⚙️ Getting Started

To run Momentum locally:

```bash
# Clone the repository
git clone https://github.com/yourusername/momentum-app.git
cd momentum-app

# Install dependencies
npm install

# Start the development server
npm run dev
```

# 🔑 Environment Variables

Create a `.env` file in the root directory and add your Firebase config:

```env
VITE_FIREBASE_API_KEY=your_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

## 🚀 Deploying to Firebase

To deploy the application to Firebase Hosting:

```bash
# Install Firebase CLI (if not installed already):
npm install -g firebase-tools

# Login to firebase
firebase login

# Initialize Firebase (if not already done):
firebase init

# Build the project
npm run build

# Deploy to Firebase Hosting
firebase deploy
```

# 📝 Notes

This project was fun to make as I find making productivity apps fun. One thing to note was this was my first time working with firestore sub collections so that was cool to learn about and see why theyre useful and how it makes data fetching a lot more effecient by only fetching things you need specifically instead of having it as one doc and needing to fetch the whole thing when I dont need it.

# 📌 Future Improvement Ideas

- Team collaboration features
- Project templates
- More customization options on tasks
- Be able to add own statuses/ columns
