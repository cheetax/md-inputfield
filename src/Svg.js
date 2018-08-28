import React from 'react';

const Svg = ({ children }) => <svg xmlns="http://www.w3.org/2000/svg"
    style={{ position: 'absolute', fill: '#013a81' }}
    width="24"
    height="24"
    viewBox="0 0 24 24">{children}</svg>

const SvgPlus = () => <Svg><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" /></Svg>

const SvgMinus = () => <Svg ><path d="M19 13H5v-2h14v2z" /></Svg>

const SvgCalendar = () => <Svg ><path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z" /></Svg>

export {
    SvgPlus,
    SvgMinus,
    SvgCalendar,
}