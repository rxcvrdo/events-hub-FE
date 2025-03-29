import { BrowserRouter, Route, Routes } from "react-router-dom";
import ThemeProvider from "./theme";
import LoginPage from "./pages/auth/login";
import HomePage from "./pages/private/home";
import RegisterPage from "./pages/auth/register";
import ProfilePage from "./pages/private/profile";
import EventsPage from "./pages/private/admin/events";
import CreateEventPage from "./pages/private/admin/events/create";
import EditEventPage from "./pages/private/admin/events/edit";
import { ToastContainer } from "react-toastify";
import PublicLayout from "./layouts/public-layout";
import PrivateLayout from "./layouts/private-layout";
import EventInfoPage from "./pages/private/event";
import UserBookingPage from "./pages/private/profile/bookings";
import AdminBookingsPage from "./pages/private/admin/bookings";
import UsersPage from "./pages/private/admin/users";


function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
       
        <Routes>
          <Route
            path="/login"
            element={
              <PublicLayout>
                <LoginPage />
              </PublicLayout>
            }
          />
          <Route
            path="/register"
            element={
              <PublicLayout>
                <RegisterPage />
              </PublicLayout>
            }
          />
          <Route
            path="/"
            element={
              <PrivateLayout>
                <HomePage />
              </PrivateLayout>
            }
          />
          <Route
            path="/event/:id"
            element={
              <PrivateLayout>
                <EventInfoPage />
              </PrivateLayout>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateLayout>
                <ProfilePage />
              </PrivateLayout>
            }
          />
          <Route
            path="/profile/bookings"
            element={
              <PrivateLayout>
                <UserBookingPage />
              </PrivateLayout>
            }
          />
          <Route
            path="/admin/events/create"
            element={
              <PrivateLayout>
                <CreateEventPage />
              </PrivateLayout>
            }
          />
          <Route
            path="/admin/events/edit/:id"
            element={
              <PrivateLayout>
                <EditEventPage />
              </PrivateLayout>
            }
          />
          <Route
            path="/admin/events"
            element={
              <PrivateLayout>
                <EventsPage />
              </PrivateLayout>
            }
          />
          <Route
            path="/admin/bookings"
            element={
              <PrivateLayout>
                <AdminBookingsPage />
              </PrivateLayout>
            }
          />
          <Route
            path="/admin/users"
            element={
              <PrivateLayout>
                <UsersPage />
              </PrivateLayout>
            }
          />
        </Routes>
        <ToastContainer position="top-center" autoClose={3000} theme="colored" />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
