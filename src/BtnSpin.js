import React from 'react';

const _input = () => <input
    type='url'
    readOnly
    className='btn-spin browser-default'>
</input>

const BtnSpin = ({ onClick, onFocus, children }) => <div className='btn-spin browser-default'
    onClick={onClick && ((event) => onClick(event))}
    onFocus={(onFocus) && onFocus}>
    {_input()}
    {children}</div>

const BtnCalendar = ({ onClick, onFocus, children }) => <div className='btn-spin browser-default'
    onClick={onClick && ((event) => onClick(event))}>
    {_input()}
    {children}</div>

export {
    BtnSpin,
    BtnCalendar,
}