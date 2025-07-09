import { useState } from "react";
import { MainLayout } from "./components/MainLayout/MainLayout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { AboutPage } from "./pages/AboutPage";
import { IdeasPage } from "./pages/IdeasPage";
import { DetailedWishPage } from "./pages/DetailedWishPage";
import { AddWishpage } from "./pages/AddWishpage";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/ideas" element={<IdeasPage />} />
            <Route path="/addwish" element={<AddWishpage />} />
            <Route path="/more/:id" element={<DetailedWishPage />} />

            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
