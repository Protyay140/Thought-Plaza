import React from 'react'
import { useSelector } from 'react-redux'

const ThemeProvider = ({ children }) => {
    const { theme } = useSelector(state => state.theme);
    return (
        <div className={theme}>
            <div className='bg-white dark:bg-gradient-to-r dark:from-[#0b2130] dark:via-[#0f3b53] dark:via-20% dark:to-[#0b2130] min-h-screen dark:text-white'>
                {children}
            </div>
        </div>
    )
}

export default ThemeProvider