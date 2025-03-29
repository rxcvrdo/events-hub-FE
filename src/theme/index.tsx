import React from 'react'
import {ConfigProvider} from 'antd'

function ThemeProvider ({children}: {children: React.ReactNode}){
    
  return (
    <ConfigProvider
    theme={{
      token: {
        colorPrimary: '#080808',
        borderRadius: 3,
      },
      components: {
        Button:{
          controlHeight: 45,
          controlOutline: 'none'
        },
        Input: {
          controlHeight: 45,
          controlOutline: 'none'
        }
      }
    }}
    >{children}</ConfigProvider>
  )
}

export default ThemeProvider