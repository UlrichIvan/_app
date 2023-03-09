import React from 'react'
import "./form.css"
function Form({ children, title, ...props }) {
    return (
        <div className="form-user d-flex justify-content-center align-items-center">
            <form className="form-connect" {...props}>
                <h1 className='title'>{title}</h1>
                {children}
            </form>
        </div>
    )
}

export default Form
