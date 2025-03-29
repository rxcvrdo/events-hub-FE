import React from 'react'

const WelcomeContent = () => {
  return (
    <div className='h-screen flex items-center justify-center bg-black w-full'>
        <div className='flex flex-col gap-2'>
            image
            <h1 className="text-orange-500 text-6xl font-semibold">EVENTS-HUB </h1>
            <p className='text-gray-400 text-sm'>
                Welcome to Events-Hub, the greatest platform to create and manage events.
            </p>
        </div>
       
    </div>
  )
}

export default WelcomeContent