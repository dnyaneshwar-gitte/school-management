School Management API

This is a Node.js + Express.js REST API that allows users to manage school data, including adding, retrieving, and deleting schools. The API uses MongoDB Atlas as the database and is deployed on Railway.

📌 Features

Add a School (POST /addSchool)

List Schools with optional filtering by name and location (GET /listSchools)

Get a School by ID (GET /school/:id)

Delete a School (DELETE /school/:id)

Search Schools by Distance using the Haversine formula

🛠️ Installation & Setup

🔹 1. Clone the Repository

git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git
cd YOUR_REPO

🔹 2. Install Dependencies

npm install

🔹 3. Set Up Environment Variables

Create a .env file in the root folder and add:

MONGO_URI=your_mongodb_connection_string
PORT=3000  # or any port you prefer

🔹 4. Start the Server

npm start

The server will run on http://localhost:3000

📌 API Endpoints

1️⃣ Add a School

POST /addSchool

Request Body:

{
  "name": "Synergy National School",
  "address": "Reddy Educational Park, Waghala, Latur Road, Ambajogai",
  "latitude": 18.7300,
  "longitude": 76.4000
}

Response:

{
  "message": "School added successfully",
  "school": { "_id": "abc123", "name": "Synergy National School", ... }
}

2️⃣ List Schools (Optional Name & Location Filter)

GET /listSchools?name=Synergy&latitude=18.73&longitude=76.40

Response:

[
  {
    "_id": "abc123",
    "name": "Synergy National School",
    "address": "...",
    "latitude": 18.7300,
    "longitude": 76.4000,
    "distance": 1.2
  }
]

3️⃣ Get a Single School by ID

GET /school/:id

Response:

{
  "_id": "abc123",
  "name": "Synergy National School",
  "address": "..."
}

4️⃣ Delete a School

DELETE /school/:id

Response:

{
  "message": "School deleted successfully"
}

🚀 Deployment on Railway

1️⃣ Push Code to GitHub

git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main

2️⃣ Deploy to Railway

Go to Railway.app

Click "New Project" → "Deploy from GitHub"

Select your repository and deploy

3️⃣ Set Up Environment Variables

Go to "Settings" → "Environment Variables"

Add MONGO_URI=your_mongodb_connection_string

4️⃣ Define Start Command in Railway

Under "Settings" → "Variables & Build Commands", set:

node server.js

5️⃣ Get Public URL

After deployment, Railway provides a URL like:

https://your-app.up.railway.app

Replace http://localhost:3000 with this URL in your frontend or Postman.

📌 Technologies Used

Backend: Node.js, Express.js

Database: MongoDB Atlas

Deployment: Railway

📌 Next Steps

✅ Add authentication (JWT)
✅ Implement update school API (PUT /school/:id)
✅ Rate limiting for API security
✅ Implement pagination for large school lists

Made with ❤️ by Dnyaneshwar gitte

