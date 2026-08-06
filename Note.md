# Authentication

Flow:
Vue Login
→ Axios POST /login
→ authRoutes
→ authController
→ userModel
→ bcrypt.compare()
→ jwt.sign()
→ Response
→ localStorage
→ Authorization Header

Possible demo questions:
- Vì sao hash password?
- JWT lưu ở đâu?
- Middleware verify token hoạt động thế nào?