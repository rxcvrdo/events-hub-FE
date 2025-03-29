import React, { useEffect, useState } from 'react'

import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
import Sidebar from './sidebar'
import { getCurrentUser } from '../api-services/users-sercive'
import { message } from 'antd'
import usersGlobalStore, { UserStoreType } from '../store/users-store'
import Spinner from '../components/spinner'

const PrivateLayout = ({children} : {children: React.ReactNode}) => {
    const {setCurrentUser, currentUser}:UserStoreType = usersGlobalStore() as UserStoreType

    const [loading, setLoading] = useState(false)

    const getData = async () => {
        try {
          setLoading(true);
          const response = await getCurrentUser();
          setCurrentUser(response.data);
        } catch (error: any) {
          message.error(
            error?.response?.data?.message ||
              error.message ||
              "Something went wrong"
          );
          console.log(error);
        }finally{
            setLoading(false)
        }
      };


    const [showContent, setShowContent] = useState(false)
    const navigate = useNavigate()
    useEffect(() => {

        const token = Cookies.get('token');
        if (!token) {
            navigate('/login')
        }else{
            getData()
            setShowContent(true)
        }
       
    }, [])

    if(loading){
      return (
        <div className='flex items-center justify-center h-screen'>
        <Spinner />
      </div>
      ) 
    }

  return showContent && currentUser && (
    <div className='flex lg:flex-row flex-col gap-5 h-screen'>
        <Sidebar />
    <div className='flex-1 px-5 lg:mt-3 overflow-y-scroll'>
        {children}
    </div>
    </div>
  )
}

export default PrivateLayout