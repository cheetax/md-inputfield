import React, { Component } from 'react';
import { Label } from './Label';
import { ClassNameCont, ClassNameInput } from './ClassName';
import { BtnSpin } from './BtnSpin';
import { SvgPlus, SvgMinus } from './Svg';
//import './NumberField.css'

class NumberField extends Component {

    constructor(props) {
        super(props)
        this.state = {
            onFocus: false,
            currentValue: (props.value !== undefined) ? props.value : '',
            elem: null
        }
    }

    _onFocus = (event) => {
        event.stopPropagation();
        event.preventDefault();
        var elem = this.state.elem;
        switch (event.type) {
            case 'focus':
            case 'click':
                if (!this.state.onFocus) {
                    this._generateEvent(this.state.currentValue)
                    this.setState({
                        onFocus: !this.state.onFocus,
                    })
                    
                }    
                elem.focus()
                break;
            case 'blur':
                this.setState({
                    onFocus: false,
                })                
                break;
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.value) {
            if ((nextProps.value !== this.props.value))
                this.setState({ currentValue: nextProps.value })
        }
    }

    _onChange = (event) => {
        this.setState({
            currentValue: event.target.value,
        })
        this.props.onChange && this.props.onChange(event)
    }

    _btn_spin_in = () => <BtnSpin
        onClick={(event) => {
            var value = this.state.currentValue;
            value++
            this._generateEvent(value)
        }}
        onFocus={this._onFocus}
    ><SvgPlus /></BtnSpin>

    _btn_spin_out = () => <BtnSpin
        onClick={(event) => {
            var value = this.state.currentValue;
            value--
            this._generateEvent(value)
        }}
        onFocus={this._onFocus}
    ><SvgMinus /></BtnSpin>

    _generateEvent = (value) => {
        var elem = this.state.elem;
        var evt = new Event('change', { bubbles: true });
        elem.value = value;
        elem.dispatchEvent(evt) && this._onChange(evt);
    }

    _ref = (elem) => this.setState({ elem })

    _spinButtons = () => (this.props.onSpinButtons) && <div style={{ display: 'flex' }} >
        {this._btn_spin_out()}
        {this._btn_spin_in()}
    </div>

    _extSpinButton = () => (this.props.extSpinButton) && this.props.extSpinButton()

    render() {
        const {
            onFocus,
            currentValue,
        } = this.state
        const onActive = !!currentValue;
        return (
            <div className={ClassNameCont({ outlined: this.props.outlined, onFocus, onActive  })} onMouseDown={this._onFocus} onBlur={this._onFocus} onClick={this._onFocus}>
                {Label({ outlined: this.props.outlined, onFocus, onActive, label: this.props.label })}
                <input ref={this._ref} name={name} value={currentValue} type={this.props.type} className={ClassNameInput({ outlined: this.props.outlined })} onChange={this._onChange} />
                <div style={{ margin: 'auto 8px', display: 'flex' }} >
                    {this._extSpinButton()}
                    {this._spinButtons()}
                </div>
            </div>
        )
    }
}
export default NumberField;