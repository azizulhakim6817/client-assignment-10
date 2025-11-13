## 🌐 Client side Live Link :

## Server side Live Link :

---

## [Add your deployed client URL here]

# Food Donation Platform

A full-stack food donation platform where users can donate surplus food, request food, and manage their donations. Built with React, Firebase Authentication, Node.js, Express, and MongoDB.

# 🛠️ Tech Stack

- **Frontend:** React, React Router, Axios, TanStack Query (optional), Tailwind CSS
- **Backend:** Node.js, Express
- **Database:** MongoDB, Mongoose
- **Authentication:** Firebase Authentication (Email/Password + Google Sign-In)
- **Image Hosting:** imgbb API
- **State Management:** React Context API
- **Notifications:** react-toastify
- **Animations:** AOS / Framer Motion

---

# ✨ Features

- User authentication (Email/Password + Google Sign-In)
- Add food donation with image upload (imgbb)
- View available foods (public)
- Food details page (private)
- Request food as a user
- Donator can accept/reject requests
- Manage your foods (update/delete)
- Protected routes with token validation
- Responsive UI with Loader & custom toasts
- Featured foods sorted by servings
- 404 error page with navigation back home

---

# 📂 Project Structure

# Client (`/client`)

/client
/public
/src
/api // Axios/TanStack query setup
/assets
/components // Navbar, Footer, FoodCard, FoodGrid, Loader, ProtectedRoute
/pages // Home, AvailableFoods, FoodDetails, AddFood, ManageFoods, UpdateFood, Login, Register, Profile, Error404
/context // AuthProvider (Firebase + user context)
App.jsx
index.jsx

### Server (`/server`)

/server
/src
/controllers // food.controller.js, request.controller.js
/models // food.model.js, request.model.js
/routes // food.routes.js, request.routes.js
/middlewares // verifyToken.js
server.js
package.json

yaml
Copy code

---

# 🔑 Environment Variables

Create a `.env` file in both **client** and **server** with the following keys:

# Client

VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
VITE_IMGBB_KEY=your_imgbb_api_key
VITE_SERVER_URL=http://localhost:5000

# Server

PORT=5000
MONGO_URI=your_mongodb_connection_string
FIREBASE_SERVICE_ACCOUNT_PATH=path/to/firebase-service-account.json

> `FIREBASE_SERVICE_ACCOUNT_PATH` points to your Firebase Admin SDK JSON file.

---

## 🚀 Setup Instructions

### 1️⃣ Backend

````bash
cd server
npm install
npm run dev   # start in development mode (nodemon)
2️⃣ Frontend
bash
Copy code
cd client
npm install
npm run dev
Frontend runs on http://localhost:5173 (Vite default).
Server runs on http://localhost:5000.

# 📝 API Endpoints
Foods
Method	Endpoint	Description
GET	/api/foods/featured	Get 6 featured foods sorted by servings
GET	/api/foods	Get all available foods
GET	/api/foods/:id	Get single food by ID
POST	/api/foods	Add food (protected)
PATCH	/api/foods/:id	Update food (protected, only owner)
DELETE	/api/foods/:id	Delete food (protected, only owner)

Requests
Method	Endpoint	Description
POST	/api/requests	Create food request (protected)
GET	/api/requests/food/:foodId	Get requests for a food (owner only)
PATCH	/api/requests/:id/accept	Accept request (set request & food status)
PATCH	/api/requests/:id/reject	Reject request

🔐 Authentication
Firebase Web SDK (v9 modular)
Get ID token: user.getIdToken()
Attach in request headers: Authorization: Bearer <idToken>
Private routes use ProtectedRoute component
User persists after page reload using onAuthStateChanged
🖼️ Image Upload (AddFood)
Image uploaded to imgbb via API
Response contains image_url → saved in MongoDB

Example:
const formData = new FormData();
formData.append('image', selectedFile);

```js
const res = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_KEY}`, {
  method: 'POST',
  body: formData
});
````

const data = await res.json();
const image_url = data.data.url;
⚡ UI/UX Highlights
Navbar adjusts based on login state
Footer with logo, social links, copyright
Home: Hero + featured 6 cards + "Show All" button
FoodDetails: requester modal + request table for donato
ManageFoods: update/delete with SweetAlert confirmation
AddFood: prefill donator info + validate expire date
Loader component for async fetches
Toast notifications for actions
Responsive design (2/3 column grid for foods)
404 page with image & back-to-home button

# 🧪 Testing Checklist

Register/Login (email + Google)
Add food with valid expire date
View available foods
Request food as another user
Accept/Reject requests as donator
Confirm food_status updates after accept
Refresh private route → should remain logged in
Image upload & responsiveness check
404 page navigation

# 📌 GitHub Commit Suggestions

Client (≥15 meaningful commits)
init: create react app + base structure
add: Navbar + Footer
add: Firebase auth setup + AuthProvider
add: Login page + Google Sign-In
add: Register page + password validation
add: ProtectedRoute + route config
add: Home page + hero section
add: Featured foods cards + fetch API
add: AvailableFoods page + grid layout
add: AddFood page + imgbb upload
add: FoodDetails page + request modal
add: ManageFoods page + fetch user foods
add: UpdateFood page + prefill form
add: Loader + toast notifications
add: 404 page + responsive styles

Server (≥8 meaningful commits)
init: express server + mongoose connection
add: Food model + CRUD
add: Request model + create request endpoint
add: verifyToken middleware (Firebase Admin)
add: accept/reject request endpoints + transactional logic
add: CORS/security headers + env config
add: pagination/filter for available foods
add: deploy configuration + README update

```

```
