import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  Home,
  Auth,
  Contact,
  Docs,
  Security,
  UserHome,
  CreatePost,
  UserProfile,
  PostDetail,
  Search,
  Settings,
} from "./pages";
import {
  Login,
  Signup,
  EmailConfirmation,
  SubmitUser,
} from "./containers/Auth";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/docs" element={<Docs />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/security" element={<Security />} />
      <Route path="/auth/signup" element={<Signup />} />
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/email_confirmation" element={<EmailConfirmation />} />
      <Route path="/auth/complete_submition" element={<SubmitUser />} />
      <Route path="/user_home/:id" element={<UserHome />} />
      <Route path="/user_home/create_post" element={<CreatePost />} />
      <Route path="/user_profile/:id" element={<UserProfile />} />
      <Route path="/post_detail/:id" element={<PostDetail />} />
      <Route path="/search/:searchTerm" element={<Search />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  </BrowserRouter>
);

export default App;
