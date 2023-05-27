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
  ForgetPasword,
  EmailForPassword,
  Admin,
  ReportedPost,
  AdminNotification,
  PostsList,
  UsersList,
  Dashboard
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
      <Route path="/send_email" element={<EmailForPassword />} />
      <Route path="/forget_password/:token" element={<ForgetPasword />}  />
      <Route path="/admin/:id" element={<Admin />}  />
      <Route path="/admin/reported_posts" element={<ReportedPost />}  />
      <Route path="/admin/notification" element={<AdminNotification />}  />
      <Route path="/admin/posts" element={<PostsList />}  />
      <Route path="/admin/users" element={<UsersList />}  />
      <Route path="/admin/dashboard" element={<Dashboard />}  /> 
    </Routes>
  </BrowserRouter>
);

export default App;
