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
import { VerifyEmailPage } from "./pages/VerifyEmailPage";
import { Toaster } from "sonner";
import { PublicOnlyRoute } from "./components/PublicOnlyRoute";
import { RootRedirect } from "./components/RootRedirect";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<RootRedirect />} />

            <Route path="/about" element={<HomePage />} />

            <Route element={<PublicOnlyRoute />}>
              <Route path="/signin" element={<SignInPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/verify-email" element={<VerifyEmailPage />} />
            </Route>

            <Route path="/ideas" element={<IdeasPage />} />

            <Route element={<ProtectedRoute />}>
              <Route path="/mywishes" element={<MyWishesPage />} />
              <Route path="/addwish" element={<AddWishpage />} />
              <Route path="/editwish/:id" element={<EditWishPage />} />
              <Route path="/more/:id" element={<DetailedWishPage />} />
            </Route>

            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </AuthProvider>
      <Toaster position="top-right" richColors closeButton />
    </BrowserRouter>
  );
}

export default App;
