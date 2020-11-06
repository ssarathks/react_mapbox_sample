import React from 'react'
import classes from './Modal.module.css'
const modal = (props) => {
    let modalClasses = [classes.Modal , classes.Close].join(' ')
    if (props.show) {
        modalClasses = [classes.Modal, classes.Open].join(' ')
    }
    return(
        <div className={modalClasses}>
            {props.children}
        </div>
    )
}

export default modal