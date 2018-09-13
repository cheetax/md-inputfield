import { BtnSpin,  } from './BtnSpin';
import { SvgPlus, SvgMinus,  } from './Svg';
import { Calendar } from 'ch-calendar';
import { Label } from './Label';
import { ClassNameCont, ClassNameInput } from './ClassName';
import { startOfMonth, endOfMonth, addMonths, format, isEqual, isValid, isDate, startOfDay, endOfDay } from 'date-fns';
import { toDate } from './toDate';
import React, { Component } from 'react';
import InputMask from 'react-input-mask';
import { locales } from './locales';

class MonthField extends Component {

    constructor(props) {
        super(props)
        var date = startOfMonth(new Date());
        this.state = {
            onFocus: false,
            date: props.value && (isDate(props.value) ? startOfMonth(props.value) : date) || date,
            elem: null,
            openModalCalendar: false,
        }
    }

    _onFocus = (event) => {
        event.bubbles && event.preventDefault();
        var elem = this.state.elem;
        switch (event.type) {
            case 'focus':
            case 'click':
                if (!this.state.onFocus) {
                    this._generateEvent(format(this.state.date, 'DD-MM-YYYY'))
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
        if (nextProps.value) {
            if (isDate(nextProps.value)) {
                if (!isEqual(startOfMonth(nextProps.value), startOfMonth(this.props.value))) {
                    this.setState({
                        date: startOfMonth(nextProps.value)
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
            dateFrom: startOfMonth(date),
            dateTo: endOfMonth(date),
        }
        event.target.value = JSON.stringify(value);
        let props = this.props;
        props.onChange && props.onChange(event)
        props.onChangeObject && props.onChangeObject(value)
    }

    _btn_spin_in = () => <BtnSpin
        onClick={() => this._generateEvent(format(addMonths(this.state.date, 1), 'DD-MM-YYYY'))}
        onFocus={this._onFocus}
    ><SvgPlus /></BtnSpin>

    _btn_spin_out = () => <BtnSpin
        onClick={() => this._generateEvent(format(addMonths(this.state.date, -1), 'DD-MM-YYYY'))}
        onFocus={this._onFocus}
    ><SvgMinus /></BtnSpin>

    _btnCalendar = () => ((this.props.onCalendarButton) && <div style={{ position: 'relative', color: 'initial' }} >
        {this._ModalCalendar()}
        {/* <BtnCalendar onClick={() => this._onClickBtnCalendar()}
        ><SvgCalendar /></BtnCalendar> */}
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
        var elem = this.state.elem;
        this.setState({
            openModalCalendar: false,
            date,
        })
        this._generateEvent(format(date, 'DD-MM-YYYY'));
        elem.focus();
    }

    _ModalCalendar = () => <div >
        <Calendar isModal isMonth isButtonActive date={this.state.date} onSelect={this._onSelectCalendar} />
    </div>

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
            date
        } = this.state
        const currentValue = format(date, 'MMMM YYYY', { locale: locales[navigator.browserLanguage || navigator.language || navigator.userLanguage] });
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
                    className={ClassNameInput({ outlined: this.props.outlined })} />
                <div style={{ margin: 'auto 8px', display: 'flex' }} >
                    {this._btnCalendar()}
                    {this._spinButtons()}
                </div>
            </div>
        )
    }
}
export default MonthField;