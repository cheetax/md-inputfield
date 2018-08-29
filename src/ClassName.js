import React from 'react'

const ClassNameCont = ({ outlined, onFocus, onActive }) => {
    var result = 'ch-field '

    if (outlined) {
        result = result + 'outlined '
        if (onFocus) result = result + 'focus '
        if (onActive) result = result + 'active '
    }
    else {
        if (onFocus) result = result + 'focus '
        if (onActive) result = result + 'active '
    }
    return result;
}

const ClassNameInput = ({ outlined }) => (outlined) ? 'ch-input outlined browser-default' : 'ch-input browser-default'

export {
    ClassNameCont,
    ClassNameInput,
}