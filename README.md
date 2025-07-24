# 💼 BCard - Business Card Manager (React Project)

Welcome to **BCard**, a responsive and feature-rich web application built with **React** for managing business cards. Whether you're an individual, a business owner, or an admin — BCard allows you to create, view, favorite, and manage digital business cards.

> 🚀 [View the project on GitHub](https://github.com/itai-gal/React-project.git)
The app will be available at: http://localhost:5173
## 📦 Features

✅ Full authentication & authorization (JWT-based)\
✅ Role-based access: Guest / User / Business / Admin\
✅ CRUD operations on cards (Create, Read, Update, Delete)\
✅ Favorite (Like) system for logged-in users\
✅ Mobile-responsive design\
✅ Light/Dark mode toggle 🌙/🌞\
✅ Context API state management\
✅ Realtime toast notifications\
✅ Input validation with floating labels\
✅ Google Maps integration on card details\
✅ Fully modular with reusable components

---

🔐 Authentication
Authentication is JWT-based. Upon successful login or signup, the token is stored and decoded to extract user information and permissions. This governs access to pages, buttons, and actions throughout the app.

⚠️ Notes
This project uses a demo API (https://monkfish-app-z9uza.ondigitalocean.app/bcard2/) that may have limited capabilities.

Admin users can manage all cards, including deleting cards created by others.

Favorites are user-specific and managed via PATCH requests.

## 🧪 Roles & Permissions

| Role        | Can View Cards | Can Like | Can Create/Edit/Delete Own Cards | Admin Panel Access |
|-------------|----------------|----------|----------------------------------|---------------------|
| Guest       | ✅             | ❌       | ❌                               | ❌                  |
| User        | ✅             | ✅       | ❌                               | ❌                  |
| Business    | ✅             | ✅       | ✅                               | ❌                  |
| Admin       | ✅             | ✅       | ✅ *(All Cards)*                 | ✅                  |

---

## 🧰 Tech Stack

- **React** + **Vite**
- **React Router**
- **TypeScript**
- **CSS Modules**
- **Context API**
- **Font Awesome** for icons
- **Fetch API** for HTTP requests

---

## 📁 Folder Structure

src/
├── components/ # Reusable UI components (Card, Toast, Header...)
├── pages/ # Page views (Cards, MyCards, Favorites, About...)
├── layouts/ # Layout wrappers (MainLayout)
├── Context/ # Auth & Cards contexts
├── routes/ # App routes
├── styles/ # CSS files
├── App.tsx
├── main.tsx
└── index.css


⭐️ Author
Itai Gal
