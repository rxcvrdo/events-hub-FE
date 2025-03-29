import { BookCheck, CandlestickChart, Home, List, LogOut, User2Icon, UsersRound } from 'lucide-react'
import React from 'react'

import { useLocation, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { toast } from 'react-toastify'
import usersGlobalStore, { UserStoreType } from '../../store/users-store'

const MenuItems = () => {
    const iconSize = 17
    const location = useLocation();
    const navigate = useNavigate();
    const currentPath = location.pathname;
    const {currentUser}: UserStoreType = usersGlobalStore() as UserStoreType

    const onLogout = () => {
        Cookies.remove('token');
        navigate('/login')
        toast.success('Logged out successfully')
    }

    const userMenu = [
        {
            name: 'Home',
            path: '/',
            icon: <Home size={iconSize} />,
            isActive: currentPath === '/',
            
        },
        {
            name: 'Profile',
            path: '/profile',
            icon: <User2Icon size={iconSize} />,
            isActive: currentPath === '/profile',
            
        },
        {
            name: 'Bookings',
            path: '/profile/bookings',
            icon: <List size={iconSize} />,
            isActive: currentPath === '/profile/bookings',
        },
        {
            name: 'Reports',
            path: '/profile/reports',
            icon: <CandlestickChart size={iconSize} />,
            isActive: currentPath === '/reports',

        },
        {
            name: 'Logout',
            path: '/logout',
            icon: <LogOut size={iconSize} />,
        }
    ]
    const adminMenu = [
        {
            name: 'Home',
            path: '/',
            icon: <Home size={iconSize} />,
            isActive: currentPath === '/',
            
        },
        {
            name: 'Events',
            path: 'admin/events',
            icon: <List size={iconSize} />,
            isActive: currentPath.includes('admin/events'),

        },
        {
            name:'Bookings',
            path: 'admin/bookings',
            icon: <BookCheck size={iconSize} />,
            isActive: currentPath.includes('admin/bookings'),
        },
        {
            name: 'Users',
            path: 'admin/users',
            icon: <UsersRound size={iconSize} />,
            isActive: currentPath.includes('admin/users'),
        },
        {
            name: 'Reports',
            path: '/admin/reports',
            icon: <CandlestickChart size={iconSize} />,
            isActive: currentPath.includes('/reports'),

        },
        {
            name: 'Logout',
            path: '/logout',
            icon: <LogOut size={iconSize} />,
        },
    ]

    const menuToRender = currentUser?.isAdmin ? adminMenu : userMenu;

  return (
    <div className='lg:bg-black lg:text-white h-full w-full '>
    <div className='flex flex-col gap-1  '>
        <h1 className='text-2xl font-bold text-orange-500 mt-5 ml-5'>EVENTS 
            <b className='text-white font-bold pl-2' >HUB</b> 
            </h1>
        <span className='text-sm text-gray-600 ml-5'>{currentUser?.name}</span>
    </div>

    <div className="flex flex-col ml-5 gap-10 mt-20">
        {menuToRender.map((item:any) => (
            <div className={`cursor-pointer px-5 py-2 rounded flex gap-5 mr-4 items-center ${item.isActive ? 'bg-orange-500' : ''}`}
            key={item.name}
            onClick={() => {
                if(item.name === 'Logout'){
                    onLogout()
                }else{
                    navigate(item.path)
                }
            }}
            >    
                <span>{item.icon}</span>
                <span>{item.name}</span>

            </div>
        ))}
    </div>
    </div>
  )
}

export default MenuItems