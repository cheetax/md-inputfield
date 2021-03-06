import { BtnSpin, } from './BtnSpin';
import { SvgPlus, SvgMinus, } from './Svg';
import { Calendar } from 'ch-calendar'
import { Label } from './Label';
import { ClassNameCont, ClassNameInput } from './ClassName';
import { startOfDay, endOfDay, addDays, format, isEqual, isValid, isDate } from 'date-fns';
import { toDate } from './toDate';
import React, { Component } from 'react';
import InputMask from 'react-input-mask';

class DateField extends Component {

    constructor(props) {
        super(props)
        var date = startOfDay(new Date());
        this.state = {
            onFocus: false,
            currentValue: props.value && (isDate(props.value) ? format(startOfDay(props.value), 'DD-MM-YYYY') : format(date, 'DD-MM-YYYY')) || format(date, 'DD-MM-YYYY'),
            date: props.value && (isDate(props.value) ? startOfDay(props.value) : date) || date,
            elem: null,
        }
    }

    _onFocus = (event) => {
        event.stopPropagation();
        event.preventDefault();
        //event.preventDefault()
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
            if (isValid(nextProps.value)) {
                if (!isEqual(startOfDay(nextProps.value), startOfDay(this.props.value))) {
                    this.setState({
                        currentValue: format(nextProps.value, 'DD-MM-YYYY'),
                        date: startOfDay(nextProps.value)
                    })
                }
            }
        }
    }

    _onChange = (event) => {
        var value = event.target.value;
        var date = isValid(toDate(value)) ? toDate(value) : toDate('01-01-1970');
        this.setState({
            currentValue: value,
            date
        })
        value = {
            dateFrom: startOfDay(date),
            dateTo: endOfDay(date),
        }
        event.target.value = JSON.stringify(value);
        let props = this.props;
        props.onChange && props.onChange(event)
        props.onChangeObject && props.onChangeObject(value)
    }

    _btn_spin_in = () => {
        return <BtnSpin
            onClick={() => this._generateEvent(format(addDays(this.state.date, 1), 'DD-MM-YYYY'))}
            onFocus={this._onFocus}
        ><SvgPlus /></BtnSpin>
    }

    _btn_spin_out = () => <BtnSpin
        onClick={() => this._generateEvent(format(addDays(this.state.date, -1), 'DD-MM-YYYY'))}
        onFocus={this._onFocus}
    ><SvgMinus /></BtnSpin>

    _btnCalendar = () => ((this.props.onCalendarButton) && <div style={{ position: 'relative', color: 'initial' }} >
        {this._ModalCalendar()}
    </div>)

    _generateEvent = (value) => {
        var elem = this.state.elem;
        var evt = new Event('change', { bubbles: true });
        elem.value = value;
        elem.dispatchEvent(evt) && this._onChange(evt);
    }

    _onClickBtnCalendar = () => this.setState({
        openModalCalendar: !this.state.openModalCalendar
    })

    _onSelectCalendar = (date) => {
        //console.log(date)
        var currentValue = format(date, 'DD-MM-YYYY');
        var elem = this.state.elem;
        this.setState({
            openModalCalendar: false,
            date,
            currentValue,
        })
        this._generateEvent(currentValue);
        elem.focus();
    }

    _ModalCalendar = () => <div >
        <Calendar isModal isClose={!this.state.onFocus} isButtonActive date={this.state.date} onSelect={this._onSelectCalendar} />
    </div>

    _ref = (elem) => {
        this.setState({ elem })
    }

    _spinButtons = () => (this.props.onSpinButtons) && <div style={{ display: 'flex' }} >
        {this._btn_spin_out()}
        {this._btn_spin_in()}
    </div>

    render() {
        const {
            onFocus,
            currentValue, } = this.state;
        const onActive = !!this.state.currentValue;
        return (
            <div className={ClassNameCont({ outlined: this.props.outlined, onFocus, onActive })} onMouseDown={this._onFocus} onBlur={this._onFocus} onClick={this._onFocus}>
                {Label({ outlined: this.props.outlined, onFocus, onActive, label: this.props.label })}
                <InputMask
                    mask="99-99-9999"
                    inputRef={this._ref}
                    name={this.props.name}
                    value={currentValue}
                    type={this.props.type}
                    className={ClassNameInput({ outlined: this.props.outlined })}
                    onChange={(event) => this._onChange(event)} />
                <div style={{ margin: 'auto 8px', display: 'flex' }} >
                    {this._btnCalendar()}
                    {this._spinButtons()}
                </div>
            </div >
        )
    }
}

export default DateField;