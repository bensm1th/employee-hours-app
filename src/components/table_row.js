import React from 'react';
import { v4 } from 'node-uuid';

const TableRow = (props) => {
    return (
        <tr key={v4()}>{props.children}</tr>
    )
}

export default TableRow;