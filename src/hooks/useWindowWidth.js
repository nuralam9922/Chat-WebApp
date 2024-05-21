import { useEffect } from "react";
import { useState } from "react"

const useWindowWidth = () => {
    const [width, setWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 0);

    const handleWindowSizeChange = () => {
        setWidth(window.innerWidth)
    }


    useEffect(() => {
      window.addEventListener('resize', handleWindowSizeChange)
      
    
      return () => {
      window.removeEventListener('resize', handleWindowSizeChange)
      }
    }, [])

    return [width]
    
    
}

export default useWindowWidth