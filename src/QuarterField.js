import { BtnSpin } from './BtnSpin';
import { SvgPlus, SvgMinus } from './Svg';
import { startOfQuarter, endOfQuarter, addQuarters, format, isEqual, isValid, isDate } from 'date-fns';
import { toDate } from './toDate';
import { Label } from './Label';
import { ClassNameCont, ClassNameInput } from './ClassName';
import React, { Component } from 'react';
import InputMask from 'react-input-mask';

//import './btnSpin.css';
//import './QuarterField.css';
//moment.locale('ru')

class QuarterField extends Component {

    constructor(props) {
        super(props)
        var date = startOfQuarter(new Date());
        //console.log(date)
        this.state = {
            onFocus: false,
            date: props.value && (isDate(props.value) ? startOfQuarter(props.value) : date) || date,
            elem: null,
        }
        // this._onFocus = this._onFocus.bind(this)
        //this._ref = this._ref.bind(this)
    }

    _onFocus = (event) => {
        event.stopPropagation();
        event.preventDefault();
        var elem = this.state.elem;
        switch (event.type) {
            case 'focus':
            case 'click':
                if (!this.state.onFocus) {
                    this._generateEvent(format(this.state.date, 'DD-MM-YYYY'))
                    this.setState({
                        onFocus: true,
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
            if (isDate(nextProps.value)) {
                if (!isEqual(startOfQuarter(nextProps.value), startOfQuarter(this.props.value))) {
                    this.setState({
                        date: startOfQuarter(nextProps.value)
                    })
                }
            }
        }
    }

    _onChange = (event) => {
        var value = event.target.value;
        var date = isValid(toDate(value)) ? toDate(value) : toDate('01-01-1970');
        this.setState({
            date
        })
        value = {
            dateFrom: startOfQuarter(date),
            dateTo: endOfQuarter(date),
        }
        event.target.value = JSON.stringify(value);
        let props = this.props
        props.onChange && props.onChange(event)
        props.onChangeObject && props.onChangeObject(value)
    }

    _btn_spin_in = () => <BtnSpin
        onClick={() => this._generateEvent(format(addQuarters(this.state.date, 1), 'DD-MM-YYYY'))}
        onFocus={this._onFocus}
    ><SvgPlus /></BtnSpin>

    _btn_spin_out = () => <BtnSpin
        onClick={() => this._generateEvent(format(addQuarters(this.state.date, -1), 'DD-MM-YYYY'))}
        onFocus={this._onFocus}
    ><SvgMinus /></BtnSpin>

    _generateEvent = (value) => {
        var elem = this.state.elem;
        var evt = new Event('change', { bubbles: true });
        elem.value = value;
        elem.dispatchEvent(evt) && this._onChange(evt);
    }

    _ref = (elem) => {
        //elem.mask("99.99.9999", {placeholder: "ДД.ММ.ГГГГ" })
        this.setState({ elem })
    }

    _spinButtons = (() => (this.props.onSpinButtons) ? <div style={{ display: 'flex' }} >
        {this._btn_spin_out()}
        {this._btn_spin_in()}
    </div> : null)

    render() {
        const {
            onFocus,
            date
        } = this.state
        const currentValue = format(date, 'Q') + ' квартал ' + format(date, 'YYYY')
        const onActive = !!currentValue;
        return (
            <div style={{}} className={ClassNameCont({ outlined: this.props.outlined, onFocus, onActive })} onMouseDown={this._onFocus} onBlur={this._onFocus} onClick={this._onFocus}>
                {Label({ outlined: this.props.outlined, onFocus, onActive, label: this.props.label })}
                {/* <input ref={this._ref} name={name} value={currentValue.toLocaleDateString()} type='text' className={this._classNameInput({ outlined })} onChange={this._onChange} /> */}
                <InputMask
                    readOnly
                    inputRef={this._ref}
                    name={name}
                    value={currentValue}
                    type='text'
                    className={ClassNameInput({ outlined: this.props.outlined })}
                />
                <div style={{ margin: 'auto 8px', display: 'flex' }} >
                    {this._spinButtons()}
                </div>
            </div>
        )
    }
}
export default QuarterField;