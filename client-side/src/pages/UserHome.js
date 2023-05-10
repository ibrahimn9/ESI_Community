import { useEffect, useState } from 'react'
import userServices from '../services/userServices';
import postService from '../services/postService';
import { useNavigate, useParams } from 'react-router-dom'
import { createUser } from '../reducers/userReducer';
import { fetchPosts } from '../reducers/postReducer';
import { fetchUsers } from '../reducers/usersReducer';
import { useDispatch, useSelector } from 'react-redux';
import { NavBar, Content } from '../containers/UserHome';
import {Box, Stack} from '@mui/material'


const UserHome = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();


  
  const getUser = async () => {
    const { data } = await userServices.getOne(id);
    dispatch(createUser(data));
  }

  const getUsers = async () => {
    const { data } = await userServices.getAll();
    dispatch(fetchUsers(data));
  }

  const getPosts = async () => {
    const posts = await postService.getAll();
    dispatch(fetchPosts(posts));
  }
  
 







  
  useEffect(() => { 
    getUsers(); 
    getUser();
    getPosts();
  }, [])

  return (
    <Box sx={{ background: '#EDF1F2', height: 'auto'}}>
     <NavBar />
     <Content />
    </Box>
  )
}

export default UserHome