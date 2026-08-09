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
Client (Browser)
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

Controller Responsibilities:
- Receive Request
- Call Model
- Handle Business Logic
- Return HTTP Status Code
- Handle Errors

# authController.js
Purpose
Handle user authentication.
Functions:
Register
↓
Receive user info
↓
Check duplicated email
↓
Hash password
↓
Create user
↓
Generate JWT
↓
Return User + Token
--------------------------------
Login
↓
Receive email/password
↓
Find User
↓
Compare Password
↓
Generate JWT
↓
Return User + Token
--------------------------------
createToken()
↓
Generate JWT
Payload
- id
- role
- name
Signed by JWT_SECRET
Expire in 1 day

# authMiddleware.js

Purpose:
Protect API before Controller

Flow:
Receive Request
↓
Check Authorization Header
↓
Verify JWT Token
↓
Decode User ID
↓
Query User from Database
↓
Store User into req.user
↓
next()
↓
Check User Role
↓
If Role Allowed
↓
next()
↓
Controller
↓
MongoDB
↓
Response

Note:
JWT only proves the user has logged in before.
Always query database to get the latest user information
(current role, account status, deleted account).
Remove password before storing user into req.user for security.

# bookModel.js and userModel.js
Flow:
Define MongoDB document structure
↓
Validation
↓
Create Mongoose Model
↓
Export for Controllers

# main.js: Entry Point of Vue
Create Vue App
↓
Import Bootstrap
↓
Import Router
↓
Mount App into index.html (#app)

# router/index.js
Purpose
Map URL to corresponding View and protect frontend pages before rendering.

Flow:
Browser URL
↓
Vue Router
↓
Match Route
↓
beforeEach()
↓
Read User from localStorage
↓
Authentication Check
(requiresAuth)
↓
If not logged in
↓
Redirect to Login
↓
Authorization Check
(meta.roles)
↓
If role not allowed
↓
Redirect to Books
↓
Guest Check
(guestOnly)
↓
If already logged in
↓
Redirect to Books
↓
Render Corresponding View

Note:
routes[] maps URL paths to Vue Views.
meta stores custom route information (authentication, roles, guest-only, etc.).
beforeEach() works as Frontend Middleware.
localStorage stores the logged-in user information.
requiresAuth checks whether the page requires login.
roles checks whether the current user has permission to access the page.
guestOnly prevents logged-in users from visiting Login/Register pages.
createWebHistory() uses the Browser History API so URL changes without reloading the page, while supporting Back/Forward navigation.

guestOnly:
Only users who are NOT logged in can access this page (e.g. Login, Register).
Logged-in users are automatically redirected to the main page.

Architecture:
Browser
↓
Vue Router
↓
beforeEach()  (Frontend Middleware)
↓
Authentication
↓
Authorization
↓
Render View
Backend Equivalent
Frontend                     Backend

Router                       Express Route
↓                            ↓
beforeEach()                 protect()
↓                            ↓
meta.roles                   authorize()
↓                            ↓
Render View                  Controller

# App.vue
Purpose:
Root component of the Vue application.
Provide the common layout shared by all pages.

Flow:
main.js
↓
createApp(App)
↓
App.vue
↓
Display Navigation Bar
↓
Check Login Status
↓
Show Login/Register
OR
Show User Information/Logout
↓
RouterView
↓
Render Current View

Note:
Root component of the entire application.
Created automatically by createApp(App) in main.js.
Navbar is shared by every page.
RouterView is the placeholder where Vue Router renders the current page.
useRouter() gets the global router instance registered in main.js.
Authentication state (currentUser, isLoggedIn) is imported from the authentication service.
handleLogout() clears the login session and redirects the user to the Login page.

Architecture:
main.js
↓
App.vue
↓
Navbar
↓
RouterView
↓
Current View

Nếu backend là:
server.js
↓
"Tao quản lý toàn bộ Backend."

Thì frontend là:
App.vue
↓
"Tao quản lý toàn bộ UI."

# services/api.js
Purpose

Create a shared Axios instance for the entire application and automatically attach the JWT token to every API request.

Flow
Vue Component
↓
bookApi / authApi
↓
Axios Instance
↓
Load Base URL from .env
↓
Request Interceptor
↓
Read JWT Token from localStorage
↓
If Token Exists
↓
Add Authorization Header
(Bearer Token)
↓
Send HTTP Request
↓
Backend API
↓
protect() Middleware
↓
Controller
↓
Response

Note:
Create a reusable Axios instance for the whole project.
baseURL is loaded from the frontend .env file (VITE_API_URL).
All API requests automatically use the same base URL.
interceptors.request.use() runs before every outgoing request.
The interceptor reads the current JWT token from localStorage.

If a token exists, it automatically adds:
Authorization: Bearer <JWT Token>
to the request header.
This avoids writing the Authorization header in every axios.get(), axios.post(), axios.put() and axios.delete().
The backend then reads this header in protect() to authenticate the request.

Architecture:
Vue
↓
bookApi / authApi
↓
Axios Instance
↓
Request Interceptor
↓
Authorization Header
↓
Express API
↓
protect()
↓
Controller

# services/bookApi.js
Purpose:
Provide reusable Book CRUD API functions for all Views.

Flow:
Books View
↓
Book API Function
↓
Axios Instance (api.js)
↓
HTTP Request
↓
Backend Route
↓
Controller
↓
MongoDB
↓
Response

Note:
Wrap all Book CRUD requests into reusable functions.
Reuse the shared Axios instance.
No authentication logic is written here.
JWT is automatically attached by the Axios Request Interceptor.

# services/authApi.js
Purpose:
Provide reusable authentication API functions.

Flow
Login/Register View
↓
Auth API Function
↓
Axios Instance (api.js)
↓
HTTP Request
↓
Auth Controller
↓
JWT Token
↓
Response

Note:
Wrap Login and Register API requests.
Receive JWT token and user information from the backend.
Reuse the shared Axios instance.
Keep authentication logic separated from UI.

HTTP Communication Summary (Important):
Vue
↓
Axios
↓
Browser (HTTP)
↓
Internet
↓
Express
↓
Controller
↓
MongoDB
↓
Response
↓
Browser
↓
Axios
↓
Vue

Notes:
Frontend only knows the API address (baseURL).
Backend does not know Vue or React.
Browser manages the HTTP request/response lifecycle.
HTTP automatically returns the response to the correct request.
CORS allows the browser to send requests across different origins.
Axios only creates and sends HTTP requests.
Backend only receives requests and returns responses.
The browser matches every response to the original request automatically.

JWT Flow Summary:
Login
↓
Backend creates JWT
↓
Frontend stores JWT in localStorage
↓
Axios Request Interceptor
↓
Attach JWT to Authorization Header
↓
Backend protect()
↓
Verify JWT
↓
Controller
↓
Response

Notes:
JWT is stored once after login.
Every new request automatically carries the JWT token.
The Axios Interceptor attaches the token.
The backend protect() middleware verifies the token.
authorize() checks whether the authenticated user has permission to access the requested resource.

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
Client (Browser)
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

Controller Responsibilities:
- Receive Request
- Call Model
- Handle Business Logic
- Return HTTP Status Code
- Handle Errors

# authController.js
Purpose
Handle user authentication.
Functions:
Register
↓
Receive user info
↓
Check duplicated email
↓
Hash password
↓
Create user
↓
Generate JWT
↓
Return User + Token
--------------------------------
Login
↓
Receive email/password
↓
Find User
↓
Compare Password
↓
Generate JWT
↓
Return User + Token
--------------------------------
createToken()
↓
Generate JWT
Payload
- id
- role
- name
Signed by JWT_SECRET
Expire in 1 day

# authMiddleware.js

Purpose:
Protect API before Controller

Flow:
Receive Request
↓
Check Authorization Header
↓
Verify JWT Token
↓
Decode User ID
↓
Query User from Database
↓
Store User into req.user
↓
next()
↓
Check User Role
↓
If Role Allowed
↓
next()
↓
Controller
↓
MongoDB
↓
Response

Note:
JWT only proves the user has logged in before.
Always query database to get the latest user information
(current role, account status, deleted account).
Remove password before storing user into req.user for security.

# bookModel.js and userModel.js
Flow:
Define MongoDB document structure
↓
Validation
↓
Create Mongoose Model
↓
Export for Controllers

# main.js: Entry Point of Vue
Create Vue App
↓
Import Bootstrap
↓
Import Router
↓
Mount App into index.html (#app)

# router/index.js
Purpose
Map URL to corresponding View and protect frontend pages before rendering.

Flow:
Browser URL
↓
Vue Router
↓
Match Route
↓
beforeEach()
↓
Read User from localStorage
↓
Authentication Check
(requiresAuth)
↓
If not logged in
↓
Redirect to Login
↓
Authorization Check
(meta.roles)
↓
If role not allowed
↓
Redirect to Books
↓
Guest Check
(guestOnly)
↓
If already logged in
↓
Redirect to Books
↓
Render Corresponding View

Note:
routes[] maps URL paths to Vue Views.
meta stores custom route information (authentication, roles, guest-only, etc.).
beforeEach() works as Frontend Middleware.
localStorage stores the logged-in user information.
requiresAuth checks whether the page requires login.
roles checks whether the current user has permission to access the page.
guestOnly prevents logged-in users from visiting Login/Register pages.
createWebHistory() uses the Browser History API so URL changes without reloading the page, while supporting Back/Forward navigation.

guestOnly:
Only users who are NOT logged in can access this page (e.g. Login, Register).
Logged-in users are automatically redirected to the main page.

Architecture:
Browser
↓
Vue Router
↓
beforeEach()  (Frontend Middleware)
↓
Authentication
↓
Authorization
↓
Render View
Backend Equivalent
Frontend                     Backend

Router                       Express Route
↓                            ↓
beforeEach()                 protect()
↓                            ↓
meta.roles                   authorize()
↓                            ↓
Render View                  Controller

# App.vue
Purpose:
Root component of the Vue application.
Provide the common layout shared by all pages.

Flow:
main.js
↓
createApp(App)
↓
App.vue
↓
Display Navigation Bar
↓
Check Login Status
↓
Show Login/Register
OR
Show User Information/Logout
↓
RouterView
↓
Render Current View

Note:
Root component of the entire application.
Created automatically by createApp(App) in main.js.
Navbar is shared by every page.
RouterView is the placeholder where Vue Router renders the current page.
useRouter() gets the global router instance registered in main.js.
Authentication state (currentUser, isLoggedIn) is imported from the authentication service.
handleLogout() clears the login session and redirects the user to the Login page.

Architecture:
main.js
↓
App.vue
↓
Navbar
↓
RouterView
↓
Current View

Nếu backend là:
server.js
↓
"Tao quản lý toàn bộ Backend."

Thì frontend là:
App.vue
↓
"Tao quản lý toàn bộ UI."

# services/api.js
Purpose

Create a shared Axios instance for the entire application and automatically attach the JWT token to every API request.

Flow
Vue Component
↓
bookApi / authApi
↓
Axios Instance
↓
Load Base URL from .env
↓
Request Interceptor
↓
Read JWT Token from localStorage
↓
If Token Exists
↓
Add Authorization Header
(Bearer Token)
↓
Send HTTP Request
↓
Backend API
↓
protect() Middleware
↓
Controller
↓
Response

Note:
Create a reusable Axios instance for the whole project.
baseURL is loaded from the frontend .env file (VITE_API_URL).
All API requests automatically use the same base URL.
interceptors.request.use() runs before every outgoing request.
The interceptor reads the current JWT token from localStorage.

If a token exists, it automatically adds:
Authorization: Bearer <JWT Token>
to the request header.
This avoids writing the Authorization header in every axios.get(), axios.post(), axios.put() and axios.delete().
The backend then reads this header in protect() to authenticate the request.

Architecture:
Vue
↓
bookApi / authApi
↓
Axios Instance
↓
Request Interceptor
↓
Authorization Header
↓
Express API
↓
protect()
↓
Controller

# services/bookApi.js
Purpose:
Provide reusable Book CRUD API functions for all Views.

Flow:
Books View
↓
Book API Function
↓
Axios Instance (api.js)
↓
HTTP Request
↓
Backend Route
↓
Controller
↓
MongoDB
↓
Response

Note:
Wrap all Book CRUD requests into reusable functions.
Reuse the shared Axios instance.
No authentication logic is written here.
JWT is automatically attached by the Axios Request Interceptor.

# services/authApi.js
Purpose:
Provide reusable authentication API functions.

Flow
Login/Register View
↓
Auth API Function
↓
Axios Instance (api.js)
↓
HTTP Request
↓
Auth Controller
↓
JWT Token
↓
Response

Note:
Wrap Login and Register API requests.
Receive JWT token and user information from the backend.
Reuse the shared Axios instance.
Keep authentication logic separated from UI.

HTTP Communication Summary (Important):
Vue
↓
Axios
↓
Browser (HTTP)
↓
Internet
↓
Express
↓
Controller
↓
MongoDB
↓
Response
↓
Browser
↓
Axios
↓
Vue

Notes:
Frontend only knows the API address (baseURL).
Backend does not know Vue or React.
Browser manages the HTTP request/response lifecycle.
HTTP automatically returns the response to the correct request.
CORS allows the browser to send requests across different origins.
Axios only creates and sends HTTP requests.
Backend only receives requests and returns responses.
The browser matches every response to the original request automatically.

JWT Flow Summary:
Login
↓
Backend creates JWT
↓
Frontend stores JWT in localStorage
↓
Axios Request Interceptor
↓
Attach JWT to Authorization Header
↓
Backend protect()
↓
Verify JWT
↓
Controller
↓
Response

Notes:
JWT is stored once after login.
Every new request automatically carries the JWT token.
The Axios Interceptor attaches the token.
The backend protect() middleware verifies the token.
authorize() checks whether the authenticated user has permission to access the requested resource.

# RegisterView.vue:
Purpose:
Provide the Register UI and collect user information before sending it to the backend.

Flow
User enters Name / Email / Password
↓
v-model stores input in Vue ref()
↓
Submit Register Form
↓
register()
↓
apiRegister(accountData)
↓
Axios
↓
Backend
↓
Auth Controller
↓
User Model
↓
MongoDB
↓
Response

Note:
v-model connects form inputs to reactive Vue state.
@submit.prevent calls register() and prevents browser page reload.
View collects user input and sends it through authApi.js.
Axios handles the HTTP request.
View does not directly access the User Model or MongoDB.
v-if="errorMessage" displays an error only when an error message exists.
ref() makes input/state reactive so Vue automatically updates the UI when values change.

# =)))) Ừ, **đống này nhìn dài vì nó đang ghi trùng flow 2–3 lần**. Thực tế project chỉ có **một đường đi chính**. Tao nén toàn bộ thành cái này:

# MEVN — MASTER FLOW

## 1. Backend khởi động

```text
.env
↓
server.js
↓
Express
├── CORS
├── express.json()
└── Routes
↓
MongoDB
↓
Listen Port
```

`server.js` là **entry point/backend manager**: cấu hình Express, middleware, routes, MongoDB và port. 

---

# 2. Request đi vào Backend

### Public CRUD

```text
GET /books
↓
bookRoutes
↓
bookController
↓
Book Model
↓
MongoDB
↓
Response
```

### Protected CRUD

```text
POST /books
↓
bookRoutes
↓
protect()
↓
authorize('admin')
↓
bookController
↓
Book Model
↓
MongoDB
↓
Response
```

**Route chỉ định request đi đâu. Controller mới xử lý logic.** 

---

# 3. Controller

```text
Request
↓
Controller
↓
Model
↓
MongoDB
↓
Controller
↓
HTTP Response
```

CRUD:

```text
GET       → find()
GET /id   → findById()
POST      → new Model() → save()
PUT       → findByIdAndUpdate()
DELETE    → findByIdAndDelete()
```

Controller = **business logic + gọi Model + xử lý lỗi + trả response**. 

---

# 4. Model

```text
Schema
↓
Validation
↓
Mongoose Model
↓
MongoDB
```

Model định nghĩa **database document structure** và được Controller sử dụng. 

---

# 5. Authentication

### Register

```text
Register
↓
Check email
↓
Hash password
↓
Create User
↓
Generate JWT
↓
Return User + Token
```

### Login

```text
Login
↓
Find User
↓
Compare Password
↓
Generate JWT
↓
Return User + Token
```

JWT chứa:

```text
id
role
name
```

và được ký bằng `JWT_SECRET`, hết hạn sau 1 ngày theo sample. 

---

# 6. Authentication vs Authorization

### Authentication

> **Mày là ai?**

```text
Authorization Header
↓
protect()
↓
Verify JWT
↓
Get User
↓
req.user
```

### Authorization

> **Mày được phép làm gì?**

```text
req.user.role
↓
authorize()
↓
Allowed Roles?
├── YES → next()
└── NO  → 403
```

`protect()` còn query User từ database để lấy thông tin hiện tại thay vì chỉ tin dữ liệu trong JWT. 

---

# 7. Frontend khởi động

```text
main.js
↓
createApp(App)
↓
Import Bootstrap
↓
Import Router
↓
mount('#app')
↓
App.vue
```



---

# 8. Frontend Routing

```text
Browser URL
↓
Vue Router
↓
beforeEach()
↓
Authentication
↓
Authorization
↓
Render View
```

### `requiresAuth`

```text
Chưa login
↓
Login
```

### `roles`

```text
Role không hợp lệ
↓
Redirect
```

### `guestOnly`

```text
Đã login
↓
Không cho vào Login/Register
```

`beforeEach()` chính là **frontend middleware**. 

---

# 9. App.vue

```text
main.js
↓
App.vue
├── Navbar
├── Login/Register hoặc User/Logout
└── RouterView
       ↓
   Current View
```

`App.vue` = **root component + common layout**. `RouterView` là chỗ Vue render page hiện tại. 

---

# 10. Axios

Đây là **cầu nối Frontend ↔ Backend**.

```text
View
↓
bookApi / authApi
↓
api.js
↓
Axios
↓
HTTP
↓
Backend
```

`api.js` tạo **shared Axios instance**.

```text
.env
↓
baseURL
↓
Request Interceptor
↓
localStorage
↓
JWT
↓
Authorization: Bearer <JWT>
↓
Backend
```

Interceptor tự attach JWT vào **mọi request**, nên không cần viết Authorization header trong từng API call. 

---

# 11. API Services

### `bookApi.js`

```text
Books View
↓
apiGetBooks()
apiGetBook()
apiCreateBook()
apiEditBook()
apiDeleteBook()
↓
api.js
↓
Axios
```

### `authApi.js`

```text
Login/Register View
↓
apiLogin()
apiRegister()
↓
api.js
↓
Axios
```

Chúng chỉ là **API wrappers**, giúp View không phải gọi Axios trực tiếp. 

---

# 12. View

Ví dụ `RegisterView.vue`:

```text
User nhập data
↓
v-model
↓
Vue ref()
↓
register()
↓
apiRegister()
↓
Axios
↓
Backend
```

View chủ yếu làm:

```text
UI
+
Reactive State
+
Nhận Input
+
Gọi API
```

Nó **không đụng trực tiếp Model/MongoDB**. 

---

# 13. Toàn bộ project trong MỘT flow

Đây mới là cái mày cần thuộc:

```text
USER
 ↓
Vue View
 ↓
API Service
 ↓
Axios
 ↓
Browser HTTP
 ↓
Express Route
 ↓
Middleware
 ├── protect()
 └── authorize()
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
Browser
 ↓
Axios
 ↓
Vue
 ↓
UI Update
```

---

# 14. Gia phả — nhớ đúng vai trò

| Thành phần     | Nhiệm vụ                       |
| -------------- | ------------------------------ |
| **JavaScript** | Ngôn ngữ                       |
| **Vue**        | Frontend UI                    |
| **Vue Router** | Routing + frontend guard       |
| **Axios**      | HTTP client                    |
| **Vite**       | Frontend build/dev tool        |
| **Node.js**    | Backend runtime                |
| **Express**    | Backend framework              |
| **Mongoose**   | ODM cho MongoDB                |
| **MongoDB**    | Database                       |
| **JWT**        | Authentication token           |
| **Route**      | Chọn Controller                |
| **Middleware** | Check request trước Controller |
| **Controller** | Business logic                 |
| **Model**      | Database structure/access      |
| **View**       | UI + input + gọi API           |

---

## Và 5 câu mày phải nhớ để demo

**1. Route làm gì?**

> Map HTTP request tới Controller, không chứa business logic.

**2. Controller làm gì?**

> Nhận request, xử lý business logic, gọi Model và trả HTTP response.

**3. Authentication vs Authorization?**

> Authentication xác minh **ai đang đăng nhập**; Authorization kiểm tra **user đó được phép làm gì**.

**4. Axios để làm gì?**

> Gửi HTTP request từ frontend tới backend; shared interceptor tự attach JWT.

**5. Frontend có truy cập MongoDB không?**

> **Không.** Frontend chỉ giao tiếp với Backend API; Backend mới dùng Controller → Mongoose → MongoDB.

---

💀 **Thế là hết đống của nợ.**

Mày không cần nhớ 1,000 dòng note. Chỉ cần nhớ:

```text
VIEW
 ↓
SERVICE
 ↓
AXIOS
 ↓
ROUTE
 ↓
MIDDLEWARE
 ↓
CONTROLLER
 ↓
MODEL
 ↓
MONGODB
```

**Đây là xương sống của toàn bộ project.** Còn từng file chỉ là một biến thể của cái flow đó.

# TODO: (Deepdive later):

#
