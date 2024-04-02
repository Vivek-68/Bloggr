import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Header from "./components/Header";
import Post from "./components/Post";
import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { UserContextProvider } from "./context/userContext";
import { AuthProvider } from "./auth/Auth";
import CreatePost from "./pages/CreatePost";
import PostPage from "./pages/PostPage";
import EditPage from "./pages/EditPage";
import RequireAuth from "./components/RequireAuth";
import PreventAuth from "./components/PreventAuth";

function App() {
  return (
    <UserContextProvider>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<IndexPage />} />
            <Route element={<PreventAuth/>}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            </Route>
            <Route path="/posts/:id" element={<PostPage />} />
            <Route element={<RequireAuth/>}>
            <Route path="/create" element={<CreatePost />} />
            <Route path="/edit/:id" element={<EditPage />} />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </UserContextProvider>
  );
}

export default App;
