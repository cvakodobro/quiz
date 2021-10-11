import React from 'react';

const Select = ({ options, value, onChange }) => {
    return (
        <select value={value} onChange={onChange}>
            {options.map((item, i) => {
                return (
                    <option key={i} value={item}>{item}</option>
                )
            })}
        </select>
    );
};

export default Select;
