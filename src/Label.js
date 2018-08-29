import React from 'react';

export const Label = ({ outlined, onFocus, onActive, label }) => {
    if (outlined) {
        return (
            <div className={(onFocus || onActive) ? 'ch-label-outlined-cont active' : 'ch-label-outlined-cont'} >
                <div className={(onFocus || onActive) ? 'ch-label-outlined-top active' : 'ch-label-outlined-top'} />
                <div className={(() => {
                    var result = 'ch-label outlined '
                    if (onFocus) result += 'focus ';
                    if (onActive) result += 'active ';
                    return result;
                })()}>{label}</div>
            </div>)
    }
    else {
        return <div className={(onFocus || onActive) ? 'ch-label active ' : 'ch-label'}>{label}</div>
    }
}