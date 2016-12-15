import React from 'react';

const TableHeader = (props) => {
    return (
        <th className={props.classType}>{props.date}</th>
    )
}

export default TableHeader;