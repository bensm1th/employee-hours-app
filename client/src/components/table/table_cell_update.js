import React from 'react';

const CellUpdate = (props) => {
    const { type } = props;
    if (!props.state.hours.data.finalized.status) {
        return (
            <div id='misc'>
                <br />
                {props[type]} {type}
                <i 
                    id="commentRemove" 
                    className="large remove icon"
                    onClick={()=>props.deleteHours(props.employeeId, props.date, props.id, {type: `${props.type}Time`} )}
                ></i>
            </div>
        )
    }
    if (props.state.hours.data.finalized.status) {
        return (
            <div>
                <br />
                {props[type]} {type}
                <i 
                    id="commentRemove" 
                    className="large remove icon"
                ></i>
            </div>
        )
    }
}

export default CellUpdate;