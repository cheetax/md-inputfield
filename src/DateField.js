import React, { Component } from 'react';
import { Calendar } from 'ch-calendar';
import './DateField.css'
import 'ch-calendar/dist/ch-calendar.css'

class DateField extends Component {

    constructor(props) {
        super(props)
        var date = new Date();
        this.state = {
            onFocus: false,
            label: props.label,
            value: props.value || date,
            currentValue: props.value || date,
            outlined: props.outlined,
            type: props.type,
            name: props.name,
            spinButtons: props.onSpinButtons,
            elem: null,
            openModalCalendar: false,
        }
        // this._onFocus = this._onFocus.bind(this)
        //this._ref = this._ref.bind(this)
    }

    _onFocus = (event) => {
        var onFocus = false;
        var elem = this.state.elem;
        switch (event.type) {
            case 'focus':
            case 'click':
                onFocus = true;
                elem.focus();
        }

        this.setState({
            onFocus,
        })

    }

    componentWillUpdate(nextProps, nextState) {
        if (nextProps.value) {
            if ((nextProps.value != nextState.value))
                this.setState({ currentValue: nextProps.value })
        }
        else {

        }
    }

    _onChange = (event) => {
        this.setState({
            currentValue: event.target.value,
        })
        if (this.props.onChange) this.props.onChange(event)
    }

    _classNameCont = ({ outlined, onFocus, onActive }) => {
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

    _classNameInput = ({ outlined }) => (outlined) ? 'ch-input outlined browser-default' : 'ch-input browser-default'

    _label = ({ outlined, onFocus, onActive, label }) => {
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

    _btn_spin_in = () => <div className='btn-spin browser-default'
        style={{
            position: 'relative',
            height: 24,
            width: 24,
            margin: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }}
        onClick={(event) => {
            var value = this.state.currentValue;
            value++
            this._onClickBtnSpin(value)
        }}
        onFocus={this._onFocus}
    >
        <input
            type='url'
            className='btn-spin browser-default'>
        </input>
        <svg xmlns="http://www.w3.org/2000/svg"
            style={{ position: 'absolute', fill: '#013a81' }}
            width="24"
            height="24"

            viewBox="0 0 24 24">
            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
        </svg>
    </div>

    _btn_spin_out = () => <div className='btn-spin browser-default'
        style={{
            position: 'relative',
            height: 24,
            width: 24,
            margin: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }}
        onClick={(event) => {
            var value = this.state.currentValue;
            value--
            this._onClickBtnSpin(value)
            //this._onChange(event)
        }}
        onFocus={this._onFocus}
    >
        <input
            type='url'
            className='btn-spin browser-default'>
        </input>
        <svg xmlns="http://www.w3.org/2000/svg"
            style={{ position: 'absolute', fill: '#013a81' }}
            width="24"
            height="24"

            viewBox="0 0 24 24">
            <path d="M19 13H5v-2h14v2z" />
        </svg>
    </div>

    _btnCalendar = () => <div style={{ position: 'relative' }} >
        {this._ModalCalendar()}
        <div className='btn-spin browser-default'
            style={{
                position: 'relative',
                height: 24,
                width: 24,
                margin: 1,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
            onClick={(event) => {
                this._onClickBtnCalendar();
                //this._onChange(event)
            }}
            onFocus={this._onFocus}
        >
            <input
                type='url'
                className='btn-spin browser-default'>
            </input>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path d="M20 3h-1V1h-2v2H7V1H5v2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 18H4V8h16v13z" />
            </svg>

        </div>
    </div>

    _onClickBtnSpin = (value) => {
        var elem = this.state.elem;
        var evt = new Event('change', { bubbles: true });
        elem.value = value;
        var cancel = elem.dispatchEvent(evt);
        if (cancel) this._onChange(evt);
    }

    _onClickBtnCalendar = () => {
        var openModalCalendar = !this.state.openModalCalendar
        this.setState({
            openModalCalendar
        })
    }

    _ModalCalendar = () => {
        var openModal = this.state.openModalCalendar
        var date = this.state.currentValue;
        return <div >
            <div style={openModal ? {
                position: 'fixed',
                background: 'black',
                opacity: '0.0',
                top: '0px',
                left: '0px',
                width: '100%',
                height: '100%',
                zIndex: '999',
            } : null}
                onClick={() => {
                    this.setState({ openModalCalendar: false })
                }} />
            <div className='modal-dialog' style={openModal ? {
                display: 'block',
                opacity: '1',
                padding: '8px 0px'
            } : null} >
                <Calendar date={date} onSelect={(date) => {
                    this.setState({ currentValue: date })
                    console.log(date)
                }} />

            </div>
        </div>
    }

    _ref = (elem) => this.setState({ elem })

    _spinButtons = () => (this.state.onSpinButtons) ? <div style={{ margin: 'auto 8px', display: 'flex' }} >
        {this._btnCalendar()}
        {this._btn_spin_out()}
        {this._btn_spin_in()}
    </div> : <div style={{ margin: 'auto 8px', display: 'flex' }} >
            {this._btnCalendar()}
        </div>

    render() {
        const {
            onFocus,
            currentValue,
            label,
            outlined,
            type,
            name } = this.state
        const onActive = (this.state.currentValue) ? true : false;

        return (
            <div style={{}} className={this._classNameCont({ outlined, onFocus, onActive })} onBlur={this._onFocus} onFocus={this._onFocus}>
                {this._label({ outlined, onFocus, onActive, label })}
                <input ref={this._ref} name={name} value={currentValue} type={type} className={this._classNameInput({ outlined })} onChange={this._onChange} />
                {this._spinButtons()}
            </div>
        )
    }
}
export default DateField;