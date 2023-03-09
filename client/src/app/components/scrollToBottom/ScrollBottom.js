import { useEffect } from 'react'

function ScrollBottom({ el, v = 1 }) {
    useEffect(() => {
        if (el) el.scroll({ top: window.innerHeight * v * 100, left: 0, behavior: "smooth" })
    })
    return null
}

export default ScrollBottom
