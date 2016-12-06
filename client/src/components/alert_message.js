import React from 'react';

const AlertMessage = (props) => {
    
    const messageType = props.success ? "ui positive message" : "ui negative message";
    const messageText = props.success ? props.successMessage : props.errorMessage;
    const header = props.success ? "Great!" : "Warning!";
    return (
        <div className={messageType}> 
            <div className="header">
                {header}
            </div>
            <i className="close icon" onClick={()=>props.handleMessageClose()}></i>
            {messageText} 
        </div>
    )
}

export default AlertMessage;