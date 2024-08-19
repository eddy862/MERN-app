# MERN apps
Full stack applications built with the MERN (MongoDB, Express, React, Node)

## 1. Notes App
A app focus on basic CRUD operation, user authentication using JWT

### Features: 
- Create, edit, and delete notes
- Search notes by title or description
- Responsive design for mobile and desktop
- User authentication (register, login, logout)
- Update user's profile (username, email, password)

### Installation:
#### Clone the Repository
```bash
git clone https://github.com/eddy862/MERN-app.git
cd MERN-app/Notes-app
```

#### Backend Setup
1. Navigate to 'backend' directory and install dependencies:
```bash
cd backend
npm install
```
2. Create a 'env.' file in the same directory with the following environment variables:
```plaintext
ACCESS_TOKEN_SECRET=<your_access_token_secret>
DB_CONNECTION_STRING=<your_mongo_uri>
```
3. Start the backend server:
```bash
npm start
```

#### Frontend Setup
1. Navigate to 'notes-app' directory and install dependencies:
```bash
cd ../frontend/notes-app
npm install
```
2. Start the fronted development server:
```bash
npm run dev
```

### Usage:
1. Make sure both the backedn and frontend servers are running.
2. Open browser and go to http://localhost:5173/login for login or http://localhost:5173/signup for new user registration
3. After login, start creating, editing, and organizing notes

### API Endpoint:
#### Authentication
- POST /auth/signup: register a new user
- POST /auth/login: login with existing credentials

#### User
- GET /user: get info of logged-in user
- PATCH /user: update info of logged-in user

#### Notes
- GET /notes: get all notes for logged-in user
- POST /notes: create a note
- PATCH /notes/:id: update an existing note
- DELETE /notes/:id: delete a note
