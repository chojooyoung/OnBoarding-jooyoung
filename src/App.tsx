import React from "react";
import { Route, Routes } from "react-router";
import { PostsPage, NotFoundPage, WritePage, DetailPage } from "./pages";
import DefaultTemplate from "./components/DefaultTemplate";

function App() {
  return (
    <div>
      <DefaultTemplate>
        <Routes>
          <Route path="/" element={<h1>Home</h1>} />
          <Route path="/posts" element={<PostsPage />} />
          <Route path="/write" element={<WritePage />} />
          <Route path="/post/:postId" element={<DetailPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </DefaultTemplate>
    </div>
  );
}

export default App;
