import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, Auth, Contact, Docs, Security} from './pages'
import { Signin, Signup, EmailVerification } from "./containers/Auth";


const App = () => (
  <BrowserRouter>
    <Routes>
      <Route exact path='/' element={<Home />} />
      <Route path='/auth' element={<Auth />} />
      <Route path='/docs' element={<Docs />} />
      <Route path='/contact' element={<Contact />} />
      <Route path='/security' element={<Security />} />
      <Route path='/auth/signup' element={<Signup />} />
      <Route path='/auth/signin' element={<Signin />} />
      <Route path='auth/email_verification' element={<EmailVerification />} />
    </Routes>
  </BrowserRouter>
);

export default App;
