import React from 'react';

const InputSelect = (props) => {

    const renderOptions = (props) => {
        let options = [];
        if (props.options) {
            for ( let i = 0; i < props.options.length; i++ ) {
                options.push(<option key={i} value={props.options[i]}>{props.options[i]}</option>)
            }
            return options;
        } if (props.start) {
            for ( let i = props.start; i <= props.choices + props.start; i++ ) {
                options.push(<option key={i} value={i}>{i}</option>)
            }
            return options;
        } else {
            for ( let i = 0; i < props.choices; i++ ) {
                options.push(<option key={i} value={i}>{i}</option>)
            }
            return options;
        }
    }

    return (
        <select 
            name={props.category}
            className='ui search dropdown timeSelect'
            onChange={e => props.logValue(e.target.value, props.category, props.type, props.unit)}
        >   
            <option value="">{props.category}</option>
            {renderOptions(props)}
        </select>
    )
}

export default InputSelect;