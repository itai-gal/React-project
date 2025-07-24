# React Business Cards Manager

A full-featured web application for managing business cards, built using React and TypeScript. The system supports multiple user roles (guest, user, business, admin) with distinct permissions and views.

🔐 **Authentication & Authorization**
- Register/Login with JWT-based auth
- Auto-login using AuthContext and token decoding
- Role-based rendering (Admin/Business/User/Guest)

📋 **Features**
- 🧾 View All Cards
- ❤️ Add/Remove Favorites (live update & toast feedback)
- ➕ Create New Business Card (Business/Admin)
- ✏️ Edit Your Cards (Business/Admin)
- 🗑️ Delete Your Cards (Business/Admin)
- 🔍 Live Search with auto-update in Navbar
- 🗂️ My Business Cards view
- ⭐ Favorites View for all liked cards
- 📍 Google Maps iframe per card (CardDetails view)

🧑‍💼 **Admin CRM**
- View all users in the system
- Toggle user `isBusiness` status
- Delete non-admin users
- Admins can perform all CRUD operations

🎨 **Design & Responsiveness**
- Fully responsive: Desktop + Mobile
- Floating labels, custom form validation (regex)
- Toast feedback on all key actions (create, edit, delete, like)
- Font Awesome 4 icons used throughout
- Dark Mode support via ThemeContext

📦 **Tech Stack**
- React with TypeScript
- React Router DOM
- Context API for global state
- Custom Toast and Form components
- Hosted API: [BCard API on Postman](https://documenter.getpostman.com/view/25008645/2s9YXcd5BL)

🚀 **Try It Locally**
```bash
git clone https://github.com/itai-gal/React-project.git
cd React-project
npm install
npm run dev
```

🔗 **Live Preview (Localhost only for now)**
This project uses a secure token-protected API and runs via Vite.

📁 **Project Structure**
```
src/
  components/
    Cards/
    Forms/
    Ui/
  Context/
    AuthContext.tsx
    CardsContext.tsx
    ThemeContext.tsx
  layouts/
    MainLayout.tsx
  pages/
    Cards.tsx
    Favorites.tsx
    MyCards.tsx
    CreateCardPage.tsx
    EditCards.tsx
    Admin.tsx
    LoginForm.tsx
    RegisterForm.tsx
  routes/
    routes.tsx
```

🧪 **Bonus Features**
- Floating "Add Card" button in business views
- Token decoding inside AuthContext
- Address stored as object (not string)
- Full CRUD support with toast + fallback for images

---

🌐 **GitHub Repo**: [itai-gal/React-project](https://github.com/itai-gal/React-project)

⭐️ Author Itai Gal
