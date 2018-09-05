import React from 'react';

const _input = () => <input
    type='url'
    readOnly
    className='btn-spin browser-default'>
</input>

const BtnSpin = ({ onClick, onFocus, children }) => <div className='btn-spin browser-default'
    onClick={onClick ? (event) => onClick(event) : null}
    onFocus={(onFocus) ? onFocus : null}>
    {_input()}
    {children}</div>

const BtnCalendar = ({ onClick, onFocus, children }) => <div className='btn-spin browser-default'
    onClick={onClick ? (event) => onClick(event) : null}>
    {_input()}
    {children}</div>

export {
    BtnSpin,
    BtnCalendar,
}