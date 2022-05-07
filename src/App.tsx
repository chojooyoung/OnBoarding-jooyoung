import React from "react";
import { Route, Routes } from "react-router";
import { PostsPage, NotFoundPage } from "./pages";
import DefaultTemplate from "./components/DefaultTemplate";

function App() {
  return (
    <div>
      <DefaultTemplate>
        <Routes>
          <Route path="/" element={<h1>Home</h1>} />
          <Route path="/posts" element={<PostsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </DefaultTemplate>
    </div>
  );
}

export default App;
