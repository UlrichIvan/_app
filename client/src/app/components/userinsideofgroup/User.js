import "./user.css"
import { UcFirst } from '../../helpers/UcFirst'
import { memo } from "react"

const User = ({ f = "", pre = "", title = "" }) => {
    return (
        <>
            <li className="f d-flex align-items-center justify-content-between">
                <div className="f-infos d-flex align-items-center">
                    <span
                        className="f-pre d-flex justify-content-center align-items-center"
                        title={UcFirst(title)}
                    >
                        {pre}
                    </span>
                    <span className="f-name">{f}</span>
                </div>
            </li>
        </>
    )
}

export default memo(User)
