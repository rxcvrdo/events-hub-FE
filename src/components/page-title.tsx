import React from 'react'

const PageTitle = ({title}: {title:string}) => {
  return (
    <div className='text-3xl font-bold uppercase text-orange-500'>
        {title}
        </div>
  )
}

export default PageTitle