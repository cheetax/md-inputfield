import React from 'react';

const BtnSpin = ({ onClick, onFocus, children }) => <div className='btn-spin browser-default'
    onClick={onClick ? (event) => onClick(event) : null}
    onFocus={(onFocus) ? onFocus : null}>
    <input
        type='url'
        className='btn-spin browser-default'>
    </input>{children}</div>

const BtnCalendar = ({ onClick, onFocus, children }) => <div className='btn-spin browser-default'
    onClick={onClick ? (event) => onClick(event) : null}>
    <input
        type='url'
        className='btn-spin browser-default'>
    </input>{children}</div>

export {
    BtnSpin,
    BtnCalendar,
}