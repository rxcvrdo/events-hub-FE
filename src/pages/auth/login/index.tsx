import { useState } from 'react'
import WelcomeContent from '../common/welcome-content'
import { Button, Form, Input} from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { loginUser } from '../../../api-services/users-sercive'
import Cookies from 'js-cookie'
import { toast } from 'react-toastify'

const LoginPage = () => {

    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
   const onFinish = async (values: never) => {
    try{
        
        setLoading(true)
        const response = await loginUser(values)
        toast.success("Login successful")
        console.log("Response:", response);
        Cookies.set("token", response.token)
        navigate("/")
    } catch(error: any) {
        toast.error(error?.response?.data?.message || error.message || "Something went wrong");
        console.log("❌ Error:", error);
    } finally {
        setLoading(false)
    }
} 
  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 '>
        <div className='col-span-1 lg:flex hidden'>
        <WelcomeContent />
        </div>
        <div className='h-screen flex items-center justify-center'>
            <Form className='flex flex-col gap-5 w-96'
            layout='vertical'
            onFinish={onFinish}
            >
                <h1 className='text-2xl font-bold text-gray-600' >
                    Login to your account
                </h1>
               
                <Form.Item name='email' label='Email' required 
                rules={[{required: true}]}
                >
                    <Input placeholder='Email' />
                </Form.Item>

                <Form.Item name='password' label='Password' required
                rules={[{required: true}]}
                >
                    <Input.Password placeholder='Password' />
                </Form.Item>

                <Button type='primary' htmlType='submit' block
                loading={loading}
                >
                    Login
                </Button>

                <Link to='/register'>
                Don't have an account? sign up here 
                </Link>
            </Form>
        </div>
    </div>
  )
}

export default LoginPage