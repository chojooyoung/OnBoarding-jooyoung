import React from "react";
import { Route, Routes, Router } from "react-router";
import HomeText from "@components/Home";
import DefaultTemplate from "@components/DefaultTemplate";
import {
  PostsPage,
  NotFoundPage,
  WritePage,
  DetailPage,
  ModifyPage,
} from "./pages";

function App() {
  return (
    <DefaultTemplate>
      <Routes>
        <Route path="/" element={<HomeText />} />
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
