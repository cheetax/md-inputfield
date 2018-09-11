import { BtnSpin } from './BtnSpin';
import { SvgPlus, SvgMinus } from './Svg';
import { startOfYear, endOfYear, addYears, format, isEqual, isValid, isDate } from 'date-fns';
import { toDate } from './toDate';
import { Label } from './Label';
import { ClassNameCont, ClassNameInput } from './ClassName';
import React, { Component } from 'react';
import InputMask from 'react-input-mask';
import './btnSpin.css';

class YearField extends Component {

    constructor(props) {
        super(props)
        var date = startOfYear(new Date());
        //console.log(date)
        this.state = {
            onFocus: false,
            date,
            elem: null,
        }
    }

    _onFocus = (event) => {
        var onFocus = false;
        var elem = this.state.elem;
        //console.log('focus click - ' + event.type)
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

    componentWillReceiveProps(nextProps) {
        if (nextProps.value) {
            if (isDate(nextProps.value)) {
                if (!isEqual(startOfYear(nextProps.value), startOfYear(this.props.value))) {
                    this.setState({
                        date: startOfYear(nextProps.value)
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
            dateFrom: startOfYear(date),
            dateTo: endOfYear(date),
        }
        event.target.value = JSON.stringify(value);
        let props = this.props
        props.onChange && props.onChange(event)
        props.onChangeObject && props.onChangeObject(value)
    }

    _btn_spin_in = () => <BtnSpin
        onClick={() => this._onClickBtnSpin(format(addYears(this.state.date, 1), 'DD-MM-YYYY'))}
        onFocus={this._onFocus}
    ><SvgPlus /></BtnSpin>

    _btn_spin_out = () => <BtnSpin
        onClick={() => this._onClickBtnSpin(format(addYears(this.state.date, -1), 'DD-MM-YYYY'))}
        onFocus={this._onFocus}
    ><SvgMinus /></BtnSpin>

    _onClickBtnSpin = (value) => {
        var elem = this.state.elem;
        var evt = new Event('change', { bubbles: true });
        elem.value = value;
        elem.dispatchEvent(evt) && this._onChange(evt);
    }    

    _ref = (elem) => {
        this.setState({ elem })
    }

    _spinButtons = (() => (this.props.onSpinButtons) ? <div style={{ display: 'flex' }} >
        {this._btn_spin_out()}
        {this._btn_spin_in()}
    </div> : null)

    render() {
        const {
            onFocus,
            date,
        } = this.state
        const currentValue = format(date,'YYYY')
        const onActive = !!currentValue;

        return (
            <div style={{}} className={ClassNameCont({ outlined: this.props.outlined, onFocus, onActive })} onBlur={this._onFocus} onFocus={this._onFocus}>
                {Label({ outlined: this.props.outlined, onFocus, onActive, label: this.props.label })}
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
export default YearField;