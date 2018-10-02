import React, { Component } from 'react';
import { Label } from './Label';
import { ClassNameCont, ClassNameInput } from './ClassName'; 0
import InputMask from 'react-input-mask';
import {
    addDays,
    addQuarters,
    addMonths,
    addYears,
    isEqual,
    isSameMonth,
    isFirstDayOfMonth,
    isLastDayOfMonth,
    isSameQuarter,
    isFirstDayOfQuarter,
    lastDayOfQuarter,
    isSameYear,
    startOfYear,
    endOfYear,
    differenceInDays,
    getMonth,
    format,
    getYear,
    getQuarter,
    endOfQuarter,
    startOfQuarter
} from 'date-fns'
import { BtnSpin } from './BtnSpin';
import { SvgPlus, SvgMinus } from './Svg';
//import './NumberField.css'



class PeriodField extends Component {

    constructor(props) {
        super(props)
        let dateFrom = props.dateFrom || new Date(),
            dateTo = props.dateTo || new Date(),
            { type, period } = this._setPeriod({ dateFrom, dateTo });
        this.state = {
            onFocus: false,
            dateFrom,
            dateTo,
            type,
            period,
            elem: null
        }
    }

    _setPeriod = ({ dateFrom, dateTo }) => {
        return isEqual(dateFrom, dateTo) && { type: 'day', period: 1 } ||
            (isSameMonth(dateFrom, dateTo)) && (isFirstDayOfMonth(dateFrom) && isLastDayOfMonth(dateTo)) && { type: 'month', period: 1 } ||
            (isSameQuarter(dateFrom, dateTo)) && (isEqual(startOfQuarter(dateFrom), dateFrom) && isEqual(endOfQuarter(dateTo), dateTo)) && { type: 'quarter', period: 1 } ||
            (isSameYear(dateFrom, dateTo)) && (isEqual(startOfYear(dateFrom), dateFrom) && isEqual(endOfYear(dateTo), dateTo)) && { type: 'year', period: 1 } || { type: 'days', period: differenceInDays(dateTo, dateFrom) }

    }

    _getPeriod = ({ type, dateFrom, dateTo }) => {
        var result = '';
        switch (type) {
            case 'day':
                result = format(dateFrom, 'DD-MM-YYYY');
                break;
            case 'month':
                result = format(dateFrom, 'MMMM YYYY')
                break;
            case 'year':
                result = getYear(dateFrom);
                break;
            case 'quarter':
                result = format(dateFrom, 'Q') + ' квартал ' + format(dateFrom, 'YYYY')
                break;
            case 'days':
                result = format(dateFrom, 'DD-MM-YYYY') + ' - ' + format(dateTo, 'DD-MM-YYYY')
        }
        //console.log('getPeriod', type, dateFrom, dateTo)
        return result;
    }

    _onFocus = (event) => {
        event.bubbles && event.preventDefault();
        var elem = this.state.elem;
        switch (event.type) {
            case 'focus':
            case 'click':
                if (!this.state.onFocus) {
                    this._generateEvent(this.state.currentValue)
                    this.setState({
                        onFocus: !this.state.onFocus,
                    })
                    elem.focus()
                }
                break;
            case 'blur':
                this.setState({
                    onFocus: !this.state.onFocus,
                })
                break;
        }
    }

    componentWillReceiveProps(nextProps) {
        // if (nextProps.value) {
        //     if ((nextProps.value !== this.props.value))
        // }
        let {
            dateFrom, dateTo
        } = nextProps
        this.setState({ dateFrom, dateTo, type: this._setPeriod({ dateFrom, dateTo }).type })
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
        } = this.state
        //console.log(this.state)
        const currentValue = this._getPeriod(this.state)
        const onActive = !!currentValue;
        return (
            <div className={ClassNameCont({ outlined: this.props.outlined, onFocus, onActive })} onMouseDown={this._onFocus} onBlur={this._onFocus} onClick={this._onFocus}>
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
                    {this._extSpinButton()}
                    {this._spinButtons()}
                </div>
            </div>
        )
    }
}
export default PeriodField;