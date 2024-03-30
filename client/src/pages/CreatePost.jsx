import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Navigate } from "react-router-dom";

const CreatePost = () => {
  const [inputHeader, setInputHeader] = useState({
    title: "",
    summary: "",
  });
  const [content, setContent] = useState("");
  const [files, setFiles] = useState();
  const [redirect, setRedirect] = useState(false);
  const [route, setRoute] = useState(false);

  const createNewPost = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.set("title", inputHeader.title);
    data.set("summary", inputHeader.summary);
    data.set("content", content);
    data.set("files", files[0]);
    try {
      const response = await fetch("http://localhost:3000/post", {
        method: "POST",
        body: data,
        credentials: "include",
      });
      if (response.status === 302) {
        setRoute(true);
      } else if (response.ok) {
        setRedirect(true);
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  const modules = {
    toolbar: {
      container: [
        [{ header: [2, 3, 4, false] }],
        ["bold", "italic", "underline", "blockquote"],
        [{ color: [] }],
        [
          { list: "ordered" },
          { list: "bullet" },
          { indent: "-1" },
          { indent: "+1" },
        ],
        ["link", "image"],
        ["clean"],
      ],
    },
    clipboard: {
      matchVisual: true,
    },
  };
  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "color",
    "clean",
  ];

  if (route) {
    return <Navigate to="/login" />;
  }

  if (redirect) {
    return <Navigate to="/" />;
  }
  return (
    <div className="flex flex-col gap-4 md:gap-8">
      <form>
        <p>Title</p>
        <input
          className="mb-4 w-[85%] rounded-sm border-2 border-gray-200 p-2 sm:w-[75%]"
          type="text"
          placeholder="Title"
          name="title"
          value={inputHeader.title}
          onChange={(e) =>
            setInputHeader((prev) => ({
              ...prev,
              [e.target.name]: e.target.value,
            }))
          }
        />
        <p>Summary</p>
        <input
          className="mb-4 w-[85%] rounded-sm border-2 border-gray-200 p-2 sm:w-[75%]"
          type="summary"
          name="summary"
          value={inputHeader.summary}
          onChange={(e) =>
            setInputHeader((prev) => ({
              ...prev,
              [e.target.name]: e.target.value,
            }))
          }
        />
        <p>File</p>
        <input
          className="mb-4 w-[85%] rounded-sm border-2 border-gray-200 p-2 sm:w-[75%]"
          type="file"
          name="file"
          onChange={(e) => setFiles(e.target.files)}
        />
      </form>
      <ReactQuill
        value={content}
        modules={modules}
        formats={formats}
        onChange={(value) => setContent(value)}
      />
      <button
        className="mt-6 rounded-md border-2 border-black p-1.5 hover:bg-black hover:text-white"
        type="submit"
        onClick={createNewPost}
      >
        Create Post
      </button>
    </div>
  );
};

export default CreatePost;
