import { MdOutlineTipsAndUpdates } from "react-icons/md";
import { AiOutlineFire } from "react-icons/ai";
import { FaDatabase } from "react-icons/fa";
import { FaUserAlt } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { MdLogout } from "react-icons/md";


const style = {
    fontSize: '21px',
    marginRight: '20px',
}

export const homeCategory = [
    {name: 'Latest', icon: <MdOutlineTipsAndUpdates style={style} /> },
    {name: 'Database', icon: <FaDatabase style={style} /> },
]

export const profileCategory = [
    {name: 'Profile', icon: <FaUserAlt style={style} /> },
    {name: 'Setting', icon: <IoMdSettings style={style} /> },
]

export const toggleCategory = [
    {name: 'Profile', icon: <FaUserAlt style={style} /> },
    {name: 'Settings', icon: <IoMdSettings style={style} /> },
    {name: 'Logout', icon: <MdLogout style={style} /> },
]



