# Events Hub Client
Events Hub Client is the front-end application for the Events Hub platform. It provides an intuitive user interface for both regular users and admins to interact with event data, book events, and manage event-related activities.

## Live site:

live site can be accessed here : https://events-hub-9l8kmb7ah-rxcvrdos-projects.vercel.app

# IMPORTANT

sometimes when login in users are hit with server error. Simply log into render (https://render.com/) and login using these credentials 

EMAIL: Eventshub1212@gmail.com
Password: EventsHub!1212? 

redeploy server and it should work fine! 

### Admin login details for live version testing:

test1@gmail.com
password: 12345678

### User login details for live version testing: 
test3@gmail.com
password: 12345678

Or register and make your own user account!



## Features
### For Admins
Event Management: Create, edit, and delete events.

User Management: View all users and all events.

Admin Privileges: Promote other users to admin status.

### For Users
Event Booking: Book events easily.

Cancellation: Cancel event bookings.

Calendar Integration: Add events directly to your calendar.

## Technologies Used
React & React DOM: Building the user interface.

Vite: Fast development server and build tool.

TypeScript: Enhancing code quality with static type checking.

Tailwind CSS: Utility-first CSS framework for rapid UI styling.

Ant Design (antd): UI components library.

Stripe: Payment integration via @stripe/react-stripe-js and @stripe/stripe-js.

Firebase: Integration for backend services.

Axios: Handling HTTP requests.

React Router DOM: Client-side routing.

React Toastify: Notifications and alerts.

Zustand: State management.

ESLint: Code linting and quality control.

### Installation
Clone the Repository:

bash
Copy
git clone <repository-url>
cd <repository-directory>/client
Install Dependencies:

bash
Copy
npm install
Configure Environment Variables:

Create a .env file in the root of the client directory with any necessary environment variables.



# React + TypeScript + Vite


This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
exportdefault tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
# events-hub-FE
