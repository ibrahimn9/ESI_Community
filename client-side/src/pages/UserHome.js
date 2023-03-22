import { useEffect, useState } from 'react'
import userServices from '../services/userServices';
import { useNavigate, useParams } from 'react-router-dom'
import { createUser } from '../reducers/userReducer';
import { useDispatch, useSelector } from 'react-redux';
import { NavBar, Content } from '../containers/UserHome';
import {Box, Stack} from '@mui/material'

const UserHome = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const currUser = useSelector((state) => state);

  
  const getUser = async () => {
    const { data } = await userServices.getOne(id);
    dispatch(createUser(data));
  }
  
  const handleLogout = () => {
    window.localStorage.clear()
    navigate('/auth/login');
  }

  
  useEffect(() => {  
    getUser();
  }, [])

  return (
    <Box sx={{ background: '#F5F5F5', height: 'auto'}}>
     <NavBar />
     <Content />
    </Box>
  )
}

export default UserHome