import { Route, Routes } from "react-router-dom";
import axios from "axios";
import IndexPage from "./pages/Home/IndexPage";
import { Layout } from "./components/Layout";
import { UserContextProvider } from "./utils/UserContext";
import { ProfilePage } from "./pages/Profile/ProfilePage";
import { PlacesPage } from "./pages/Places/PlacesPage";
import { PlacesFormPage } from "./pages/Places/PlacesFormPage";
import { PlacePage } from "./pages/Places/PlacePage";
import { BookingsPage, BookingPage } from "./pages/Bookings/index";
import { LoginPage, RegisterPage } from "./pages/Authentication/index";

axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/account" element={<ProfilePage />} />
          <Route path="/account/places" element={<PlacesPage />} />
          <Route path="/account/places/new" element={<PlacesFormPage />} />
          <Route path="/account/places/:id" element={<PlacesFormPage />} />
          <Route path="/place/:id" element={<PlacePage />} />
          <Route path="/account/bookings" element={<BookingsPage />} />
          <Route path="/account/bookings/:id" element={<BookingPage />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
