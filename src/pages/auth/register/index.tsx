import { useState } from 'react'
import WelcomeContent from '../common/welcome-content'
import { Button, Form, Input, message } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { registerUser } from '../../../api-services/users-sercive'
import { toast } from 'react-toastify'

const RegisterPage = () => {
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
   const onFinish = async (values: never) => {
    try{
        setLoading(true)
        const response = await registerUser(values);

        toast.success( response.message || "registered successfully")
        navigate("/login")

    } catch (error: any) {
        message.error(error.response?.data.message || error.message)
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
                    Register your account
                </h1>
                <Form.Item name='name' label='Name' required
                rules={[{required: true}]}
                >
                    <Input placeholder='Full Name' />
                </Form.Item >

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
                    Register
                </Button>

                <Link to='/login'>
                 Already have an account? Login here 
                </Link>
            </Form>
        </div>
    </div>
  )
}

export default RegisterPage