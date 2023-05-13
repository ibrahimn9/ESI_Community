import { useState, useEffect } from "react";
import { Box, Stack } from "@mui/material";
import postService from "../services/postService";
import userServices from "../services/userServices";
import { Footer } from "../containers/Home";
import { useNavigate, Link } from "react-router-dom";
import { images } from "../constants";

import {
  years,
  modules,
  semesters,
  specialities,
  folders,
} from "../constants/docPath";
import { BiLoaderAlt } from "react-icons/bi";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [tagsArr, setTagsArr] = useState("");
  const [file, setFile] = useState();
  const [user, setUser] = useState();
  const [emails, setEmails] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const loggedUser = JSON.parse(window.localStorage.getItem("loggedUser"));
  const navigate = useNavigate();

  const [year, setYear] = useState("");
  const [semester, setSemester] = useState("");
  const [speciality, setSpeciality] = useState("");
  const [module, setModule] = useState("");
  const [folder, setFolder] = useState("");

  const getUsers = async () => {
    const { data } = await userServices.getAll();
    const user = data?.find((user) => user.id === loggedUser.id);
    let max = 5 - user.class.class;
    for (let i = 0; i < max; i++) {
      years.pop();
    }
    setUser(user);
    const folowers = data?.filter((u) => user.folowers.includes(u.id));
    const emails = folowers?.map((u) => u.email);
    setEmails(emails);
  };

  const handleTagsChange = (e) => {
    const tagRegex = /^#[a-zA-Z0-9]+$/;
    const tags = e.target.value;
    setTags(tags);
    const tagsSpt = tags.split(" ").filter((tag) => tagRegex.test(tag));
    setTagsArr(tagsSpt);
  };

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
    setIsLoading(true);
    const { token } = JSON.parse(window.localStorage.getItem("loggedUser"));
    file.append("title", title);
    file.append("description", description);
    file.append("tags", JSON.stringify(tagsArr));
    file.append("year", year);
    file.append("semester", semester);
    file.append("speciality", speciality);
    file.append("module", module);
    file.append("folder", folder);
    const { data } = await postService.createPost(file, token);
    if (data) setIsLoading(false);
    const { res } = await userServices.updateUser({
      ...user,
      points: user.points + 5,
    });
    const message = {
      subject: `${user?.name.toUpperCase()} posted a new document`,
      text: `<p>Hi</p>
            <p>Just wanted to let you know that ${user?.name.toUpperCase()}, who you follow on our platform,
            has posted a new document titled <b>"${title}"</b>.
            Check it out here [Link] and feel free to leave a comment if you have any feedback.</p>
            <p>Thanks for being a part of our community. Let us know if you have any questions.</p>
            <p>Best regards,</p>
            <p>ESI Community</p>`,
    };
    const { response } = await userServices.sendMessage(message, emails);

    navigate(`/post_detail/${data.id}`);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <Box sx={{ background: "#EDF1F2", height: "auto", width: "100%" }}>
      <Stack
        direction="row"
        sx={{
          top: 0,
          mx: { xs: 2, md: 4 },
          alignItems: "center",
        }}
      >
        <Link to={`/user_home/${loggedUser.id}`}>
          <img src={images.logo} height={55} />
        </Link>
        <h2 style={{ marginLeft: "15px", color: "#04396a" }}>Create Post</h2>
      </Stack>
      <Stack
        direction="row"
        sx={{ mx: { xs: 2, md: 2 }, justifyContent: { xs: "center", lg: "" } }}
      >
        <Box
          sx={{
            background: "#FFFFFF",
            height: "auto",
            borderRadius: 2,
            border: "1px solid rgba(153, 169, 183, 0.7)",
            mt: 2,
            p: { xs: 4, lg: 10 },
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
              onChange={handleTagsChange}
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
          <label style={{ color: "#04396a", fontWeight: "600" }}>
            Document path:
          </label>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <select
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="select-input"
            >
              <option value="">Select Year</option>
              {years.map((year) => (
                <option value={year} key={year}>
                  {year}
                </option>
              ))}
            </select>
            {(year && year === "1CP") || year === "2CP" || year === "1CS" ? (
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <select
                  value={semester}
                  onChange={(e) => setSemester(e.target.value)}
                  className="select-input"
                >
                  <option value="">Select Semester</option>
                  {semesters.map((s) => (
                    <option value={s} key={s}>
                      {s}
                    </option>
                  ))}
                </select>
                {semester && (
                  <select
                    value={module}
                    onChange={(e) => setModule(e.target.value)}
                    className="select-input"
                  >
                    <option value="">Select Module</option>
                    {modules[year][semester].map((m) => (
                      <option value={m} key={m}>
                        {m}
                      </option>
                    ))}
                  </select>
                )}
                {module && (
                  <select
                    value={folder}
                    onChange={(e) => setFolder(e.target.value)}
                    className="select-input"
                  >
                    <option value="">Select Folder</option>
                    {folders.map((f) => (
                      <option value={f} key={f}>
                        {f}
                      </option>
                    ))}
                  </select>
                )}
              </Box>
            ) : (
              year && (
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <select
                    value={speciality}
                    onChange={(e) => setSpeciality(e.target.value)}
                    className="select-input"
                  >
                    <option value="">Select Speciality</option>
                    {specialities.map((s) => (
                      <option value={s} key={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                  {year && speciality && (
                    <select
                      value={semester}
                      onChange={(e) => setSemester(e.target.value)}
                      className="select-input"
                    >
                      <option value="">Select Semester</option>
                      {semesters.map((s) => (
                        <option value={s} key={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  )}
                  {speciality && semester && (
                    <select
                      value={module}
                      onChange={(e) => setModule(e.target.value)}
                      className="select-input"
                    >
                      <option value="">Select Module</option>
                      {modules[year][speciality][semester].map((m) => (
                        <option value={m} key={m}>
                          {m}
                        </option>
                      ))}
                    </select>
                  )}
                </Box>
              )
            )}
          </Box>
        </Box>
        <Box
          sx={{
            flexBasis: "20%",
            display: { xs: "none", lg: "block" },
            ml: 5,
            mt: 4,
          }}
        >
          <h3 className="post-tags">Writing a Great Post Title </h3>
          <p
            className="post-static"
            style={{ fontWeight: "600", textAlign: "left" }}
          >
            Think of your post title as a super short (but compelling!)
            description — like an overview of the actual post in one short
            sentence. Use keywords where appropriate to help ensure people can
            find your post by search.
          </p>
        </Box>
      </Stack>
      <button
        className="post-btn btn"
        type="submit"
        onClick={handlePublish}
        disabled={isLoading}
        style={{ display: "flex", alignItems: "center" }}
      >
        Publish
        {isLoading && <BiLoaderAlt className="loading" />}
      </button>
      <Footer />
    </Box>
  );
};

export default CreatePost;
