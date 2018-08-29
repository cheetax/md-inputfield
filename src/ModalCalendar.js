import React from 'react'
import { Calendar } from 'ch-calendar';
import 'ch-calendar/dist/ch-calendar.css';

export const ModalCalendar = ({ openModal, date, onClick, onSelect }) => {
    return <div >
        <div style={openModal ? {
            position: 'fixed',
            background: 'black',
            opacity: '0',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            zIndex: '999',
        } : null}
            onClick={onClick} />
        <div className='modal-dialog' style={openModal ? {
            display: 'block',
            opacity: '1',
            padding: '8px 0px'
        } : {
                display: 'none',
                opacity: '1',
                padding: '8px 0px'
            }} >
            <Calendar date={date} onSelect={onSelect} />
        </div>
    </div>
}