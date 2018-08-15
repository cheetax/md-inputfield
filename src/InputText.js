import React, { Component } from 'react';
//import { connect } from "react-redux";
import './InputText.css'

class InputText extends Component {

    constructor(props) {
        super(props)
        this.state = {
            onFocus: false,
            label: props.label,
            value: props.value,
            outlined: props.outlined,
            type: props.type,
            name: props.name,
            spinButtons: props.spinButtons,
            elem: null
        }
        this._onFocus = this._onFocus.bind(this)
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
        if ((nextProps.value != nextState.value)) 
            this.setState({ value: nextProps.value})
    }

    _onChange = (event) => {
        this.setState({
            value: event.target.value,
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

    _classNameInput = ({ outlined }) => (outlined) ? 'ch-input-outlined browser-default' : 'ch-input browser-default'

    _label = ({ outlined, onFocus, onActive, label }) => {
        if (outlined) {

            return (
                <div className={(onFocus || onActive) ? 'ch-label-outlined-cont active' : 'ch-label-outlined-cont'} >
                    <div className={(onFocus || onActive) ? 'ch-label-outlined-top active' : 'ch-label-outlined-top'} />
                    <div className={(() => {
                        var result = 'ch-label-outlined '
                        if (onFocus) result = result + 'focus ';
                        if (onActive) result = result + 'active ';
                        return result;
                    })()}>{label}</div>
                </div>)
        }
        else {
            return <div className={(onFocus || onActive) ? 'ch-label active' : 'ch-label'}>{label}</div>
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
            var value = this.state.value;
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
            var value = this.state.value;
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

    _onClickBtnSpin = (value) => {        
        var elem = this.state.elem;
        var evt = new Event('change', { bubbles: true });
        elem.value = value;
        var cancel = elem.dispatchEvent(evt);
        if (cancel) this._onChange(evt);
    }

    _ref = (elem) => this.setState({ elem })

    _spinButtons = () => (this.state.spinButtons) ? <div style={{ margin: 'auto 8px', display: 'flex' }} >
        {this._btn_spin_out()}
        {this._btn_spin_in()}
    </div> : null

    render() {
        const {
            onFocus,
            value,
            label,
            outlined,
            type,
            name } = this.state
        const onActive = (this.state.value) ? true : false;

        return (
            <div style={{}} className={this._classNameCont({ outlined, onFocus, onActive })} onBlur={this._onFocus} onFocus={this._onFocus}>
                {this._label({ outlined, onFocus, onActive, label })}
                <input ref={this._ref} name={name} value={value} type={type} className={this._classNameInput({ outlined })} onChange={this._onChange} />
                {this._spinButtons()}
            </div>
        )
    }
}
export default InputText;