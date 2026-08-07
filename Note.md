# server.js
Flow
1. Load Config
- Read PORT, MONGODB_URI, JWT_SECRET from .env
2. Create Express Application
- const app = express()
3. Register Middleware
- cors() -> Allow frontend to communicate with backend
- express.json() -> Parse incoming JSON so req.body can be used
4. Register Routes
- "/" -> Default route for testing server
- "/api/auth" -> Forward requests to authRoutes
- "/api/books" -> Forward requests to bookRoutes
5. Connect MongoDB
6. Listen Port
- Start the server and wait for browser/frontend requests
# bookRoutes.js
Purpose:
Map HTTP Request to Controller.
Route does NOT contain business logic.
Flow:
Client
↓
Route
↓
Authentication (protect)
↓
Authorization (authorize)
↓
Controller
↓
Response:
HTTP Methods:
GET /books
→ getAllBooks()
GET /books/:id
→ getBookById()
POST /books
→ protect()
→ authorize(admin)
→ createBook()
PUT /books/:id
→ protect()
→ authorize(admin)
→ updateBook()
DELETE /books/:id
→ protect()
→ authorize(admin)
→ deleteBook()
# authRoutes.js
Purpose:
Map authentication requests to authController.
Flow:
Client
↓
POST /api/auth/register
↓
register()
-----------------------
Client
↓
POST /api/auth/login
↓
login()
-----------------------
Notes:
- router.post(path, controller) is a shortcut for a single POST endpoint.
- export default router allows other files (server.js) to import this router.
- server.js mounts this router using:
  app.use('/api/auth', authRoutes)

# bookController.js
Purpose:
Receive request from Route.
Call Mongoose Model.
Handle business logic.
Handle errors.
Return HTTP Response.
General Flow:
Client
↓
Route
↓

Controller
↓
Mongoose Model
↓
MongoDB
↓
Controller
↓
HTTP Response
↓
Client
CRUD:

GET All
→ Book.find()

GET By Id
→ Book.findById()

POST
→ new Book()
→ save()

PUT
→ findByIdAndUpdate()

DELETE
→ findByIdAndDelete()

Controller Responsibilities

- Receive Request
- Call Model
- Handle Business Logic
- Return HTTP Status Code
- Handle Errors