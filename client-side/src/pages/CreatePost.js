import { useState } from "react";
import { Box, Stack } from "@mui/material";
import postService from "../services/postService";


const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [file, setFile] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    setFile(formData);
  };

  const handlePublish = async () => {
    const { token } = JSON.parse(window.localStorage.getItem('loggedUser'))
    file.append("title", title);
    file.append("description", description);
    const { data } = await postService.createPost(file, token);
  };

  return (
    <Box sx={{ background: "#F5F5F5", height: "100vh" }}>
      <Stack
        direction="row"
        sx={{ top: 0, mx: { xs: 2, md: 4, alignItems: "center" } }}
      >
        <h2 style={{ marginRight: "25px" }}>Logo</h2>
        <h3>Create Post</h3>
      </Stack>
      <Box
        sx={{
          background: "#FFFFFF",
          height: "auto",
          width: "60%",
          ml: 14,
          borderRadius: 2,
          border: "1px solid #DEDEDE",
          mt: 2,
          p: 10,
        }}
      >
        <form onSubmit={handleSubmit}>
          <input
            className="header-input non-border-input"
            placeholder="New post title here..."
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            className="sub-input non-border-input"
            placeholder="Add up to 4 tags..."
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
          <input
            type="file"
            style={{ marginBottom: "50px" }}
            onChange={handleFileInputChange}
          />
          <input
            className="sub-input non-border-input"
            placeholder="Write your post description here..."
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </form>
      </Box>
      <button className="post-btn btn" type="submit" onClick={handlePublish}>
        Publish
      </button>
    </Box>
  );
};

export default CreatePost;
