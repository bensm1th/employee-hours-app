import React from 'react';

const ClockMessage = (props) => {

    const messageType = props.success.state ? "ui positive message" : "ui warning message";
    const messageText = props.success.state ? props.success.message : props.error.message;
    const header = props.success.state ? "Great!" : "Warning!";

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

export default ClockMessage;