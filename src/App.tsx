import { MainLayout } from "./components/layout/MainLayout/MainLayout";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { NotFoundPage } from "./pages/NotFoundPage";

import { DetailedWishPage } from "./pages/DetailedWishPage";
import { AddWishpage } from "./pages/AddWishpage";
import { EditWishPage } from "./pages/EditWishPage";
import { AuthProvider } from "./auth/AuthProvider";
import { SignInPage } from "./pages/SignInPage";
import { SignUpPage } from "./pages/SignUpPage";

import { VerifyEmailPage } from "./pages/VerifyEmailPage";
import { PublicOnlyRoute } from "./components/auth/PublicOnlyRoute";
import { RootRedirect } from "./components/auth/RootRedirect";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import { AppToaster } from "./components/ui/AppToaster/AppToaster";
import { lazy, Suspense } from "react";
import { Loader } from "./components/ui/Loader";

const HomePage = lazy(() => import("./pages/HomePage").then((m) => ({ default: m.HomePage })));
const MyWishesPage = lazy(() =>
  import("./pages/MyWishesPage").then((m) => ({ default: m.MyWishesPage })),
);
const IdeasPage = lazy(() => import("./pages/IdeasPage").then((m) => ({ default: m.IdeasPage })));

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route element={<MainLayout />}>
              <Route path="/" element={<RootRedirect />} />
              <Route path="/about" element={<HomePage />} />
              <Route path="/ideas" element={<IdeasPage />} />

              <Route element={<PublicOnlyRoute />}>
                <Route path="/signin" element={<SignInPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/verify-email" element={<VerifyEmailPage />} />
              </Route>

              <Route element={<ProtectedRoute />}>
                <Route path="/mywishes" element={<MyWishesPage />} />
                <Route path="/addwish" element={<AddWishpage />} />
                <Route path="/editwish/:id" element={<EditWishPage />} />
                <Route path="/more/:id" element={<DetailedWishPage />} />
              </Route>

              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </Suspense>
      </AuthProvider>
      <AppToaster />
    </BrowserRouter>
  );
}

export default App;
