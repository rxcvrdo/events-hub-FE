import { useState } from 'react'
import MenuItems from './menu-items'

import { Menu } from 'lucide-react'
import { Drawer } from 'antd'

const Sidebar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  return (
    <div >
      <div className='lg:flex hidden h-full lg:w-60 '>
        <MenuItems />
      </div>
      <div className='bg-black p-5 lg:hidden flex'>
        <Menu
          size={20}
          color='orange'
          className='cursor-pointer'
          onClick={() => setShowMobileMenu(!showMobileMenu)}
        />
      </div>
      {showMobileMenu && (
        <Drawer
        open={showMobileMenu}
        placement='left'
        onClose={() => setShowMobileMenu(false)}
        >
          <MenuItems/>
        </Drawer>)}
    </div>
  )
}

export default Sidebar