import React from "react";
import { Route, Routes, Router } from "react-router";
import {
  PostsPage,
  NotFoundPage,
  WritePage,
  DetailPage,
  ModifyPage,
} from "./pages";
import DefaultTemplate from "./components/DefaultTemplate";

function App() {
  return (
    <DefaultTemplate>
      <Routes>
        <Route path="/" element={<h1>주영게시판</h1>} />
        <Route path="/posts" element={<PostsPage />} />
        <Route path="/write/new" element={<WritePage />} />
        <Route path="/post/:postId" element={<DetailPage />} />
        <Route path="/modify/:postId" element={<ModifyPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </DefaultTemplate>
  );
}

export default App;
