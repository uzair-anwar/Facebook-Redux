import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserProvider } from "./Context/userContext";
import Login from "./Components/Account/Login";
import Signup from "./Components/Account/Signup";
import Main from "./Pages/Main";
import EditPost from "./Components/Post/EditPost";
import EditDraftPost from "./Components/Draft/EditDraft";
import ProtectedRoute from "./Routes/ProtectedRoute";
import UndefineRoutes from "./Components/UndefineRoutes";

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route element={<ProtectedRoute />}>
            <Route path="posts" element={<Main />} />
            <Route path="drafts" element={<Main />} />
            <Route path="/Post/:id/edit" element={<EditPost />} />
            <Route path="/Draft/:id/edit" element={<EditDraftPost />} />
          </Route>
          <Route path="*" element={<UndefineRoutes />} />
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
