import { useEffect, useState } from 'react'
import user from '../services/user';
import { useNavigate, useParams } from 'react-router-dom'

const UserHome = () => {
  const [name, setName] = useState("");
  const [classObj, setClassObj] = useState({});
  const [loggedUserJSON, setLoggedUserJSON] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  
  const getUser = async () => {
    const { data } = await user.getOne(id);
    setName(data.name);
    setClassObj(data.class)
  }
  
  const handleLogout = () => {
    window.localStorage.clear()
    navigate('/auth/login');
  }
  

  
  useEffect(() => {  
    getUser();
  }, [])

  return (
    <div style={{ color: 'white'}}>
      <h1>Username: {name}</h1>
      <h1>User class: {classObj.class}CP</h1>
      <button onClick={handleLogout}>logout</button>
    </div>
  )
}

export default UserHome