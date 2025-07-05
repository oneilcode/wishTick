import { useState } from "react";
import { MainLayout } from "./components/MainLayout/MainLayout";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<p>главная</p>} />
            <Route path="/about" element={<p>о приложении</p>} />
            <Route path="/addwish" element={<p>добавь желание</p>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
