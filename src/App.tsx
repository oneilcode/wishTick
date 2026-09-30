import { MainLayout } from "./components/MainLayout/MainLayout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { IdeasPage } from "./pages/IdeasPage";
import { DetailedWishPage } from "./pages/DetailedWishPage";
import { AddWishpage } from "./pages/AddWishpage";
import { EditWishPage } from "./pages/EditWishPage";
import { AuthProvider } from "./auth/AuthProvider";
import { SignInPage } from "./pages/SignInPage";
import { SignUpPage } from "./pages/SignUpPage";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { MyWishesPage } from "./pages/MyWishesPage";

function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<MainLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/signin" element={<SignInPage />} />
              <Route path="/ideas" element={<IdeasPage />} />

              <Route element={<ProtectedRoute />}>
                <Route path="/mywishes" element={<MyWishesPage />} />
                <Route path="/addwish" element={<AddWishpage />} />
                <Route path="/editwish/:id" element={<EditWishPage />} />
              </Route>

              <Route path="/more/:id" element={<DetailedWishPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
