import { Box } from '@mui/material'
import { NavBar, Footer } from '../containers/Home'
import Header from '../containers/Contact/Header'

const Contact = () => {
  return (
    <Box sx={{
      width: '100%',
      height: 'auto',
    }}>
       <NavBar />
       <Header />
       <Footer />
    </Box>
  )
}

export default Contact