import React from 'react';

export default (props) => {
    console.log('props', props);
    console.log(props.druzyna);
    const druzyna = props.druzyna;
    return (
        <tr>
            <td>{druzyna.Id}</td>
            <td>{druzyna.nazwa}</td>
            <td>{druzyna.lastName}</td>
        </tr>
    );
}