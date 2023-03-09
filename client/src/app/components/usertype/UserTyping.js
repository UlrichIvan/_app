import { memo, useEffect } from 'react'
import { TypingStyle } from '../../utils/utils'

function UserTyping({ sms = "", time = 100, reset }) {


    useEffect(() => {
        let id = window.setTimeout(reset, time)
        return () => window.clearTimeout(id)
    }, [time, reset])

    return (
        <>
            <p style={TypingStyle}>{sms}</p>
        </>
    )
}

export default memo(UserTyping)
