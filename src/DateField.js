import { Calendar } from 'ch-calendar';
import 'ch-calendar/dist/ch-calendar.css';
import { BtnSpin, BtnCalendar } from './BtnSpin';
import { SvgPlus, SvgMinus, SvgCalendar } from './Svg';
import moment from 'moment';
import 'moment/locale/ru';
import React, { Component } from 'react';
import InputMask from 'react-input-mask';
import './btnSpin.css';
import './DateField.css';
moment.locale('ru')

class DateField extends Component {

    constructor(props) {
        super(props)
        var date = moment().startOf('day');
        //console.log(date)
        this.state = {
            onFocus: false,
            label: props.label,
            value: moment(props.value).startOf('day') || date,
            currentValue: moment(props.value).format('DD-MM-YYYY') || date.format('DD-MM-YYYY'),
            date,
            outlined: props.outlined,
            type: props.type,
            name: props.name,
            spinButtons: props.onSpinButtons,
            elem: null,
            openModalCalendar: false,
            onCalendarButton: props.onCalendarButton,
        }
        // this._onFocus = this._onFocus.bind(this)
        //this._ref = this._ref.bind(this)
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
            case 'blur':
                if (this.state.openModalCalendar) {
                    onFocus = true;
                    elem.focus();
                }

        }

        this.setState({
            onFocus,
        })

    }

    componentWillUpdate(nextProps, nextState) {
        //console.log(nextProps.value+ ' ' + this.state.value)

        if (nextProps.value) {
            var value = moment(nextProps.value).startOf('day');
            //console.log(moment(value).isSame(this.state.value))
            if (!moment(value).isSame(this.state.value))
                this.setState({ value })
        }
        else {

        }
    }

    _onChange = (event) => {
        var value = event.target.value;
        var date = moment(value, 'DD-MM-YYYY').isValid() ? moment(value, 'DD-MM-YYYY') : moment('01-01-1970');
        console.log(moment(value, 'DD-MM-YYYY'));
        this.setState({
            currentValue: value,
            date
        })

        event.target.value = JSON.stringify({
            dateFrom: (moment(date).startOf('day').toISOString(true)),
            dateTo: (moment(date).endOf('day').toISOString(true)),
        });

        this.props.onChange && this.props.onChange(event)
        this.props.onChangeObject && this.props.onChangeObject(value)
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

    _btn_spin_in = () =>
        <BtnSpin
            onClick={() => this._onClickBtnSpin(moment(this.state.date).add(1, 'day').format('DD-MM-YYYY'))}
            onFocus={this._onFocus}
        ><SvgPlus /></BtnSpin>

    _btn_spin_out = () => <BtnSpin
        onClick={() => this._onClickBtnSpin(moment(this.state.date).add(-1, 'day').format('DD-MM-YYYY'))}
        onFocus={this._onFocus}
    ><SvgMinus /></BtnSpin>

    _btnCalendar = () => ((this.state.onCalendarButton) ? <div style={{ position: 'relative', color: 'initial' }} >
        {this._ModalCalendar()}
        <BtnCalendar
            onClick={(event) => this._onClickBtnCalendar()}
        ><SvgCalendar /></BtnCalendar>
    </div> : null)

    _onClickBtnSpin = (value) => {
        var elem = this.state.elem;
        var evt = new Event('change', { bubbles: true });
        elem.value = value;
        elem.dispatchEvent(evt) && this._onChange(evt);
    }

    _onClickBtnCalendar = () => this.setState({
        openModalCalendar: !this.state.openModalCalendar
    })

    _onSelectCalendar = (date) => {
        var currentValue = moment(date).format('DD-MM-YYYY');
        var elem = this.state.elem;
        this.setState({
            openModalCalendar: false,
            date: moment(date),
            currentValue,
        })
        this._onClickBtnSpin(currentValue);
        elem.focus();
    }

    _ModalCalendar = () => {
        var openModal = this.state.openModalCalendar
        var date = this.state.date;
        //console.log(date)
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
                onClick={() => {
                    this.setState({ openModalCalendar: false })
                }} />
            <div className='modal-dialog' style={openModal ? {
                display: 'block',
                opacity: '1',
                padding: '8px 0px'
            } : {
                    display: 'none',
                    opacity: '1',
                    padding: '8px 0px'
                }} >
                <Calendar date={date} onSelect={this._onSelectCalendar} />
            </div>
        </div>
    }

    _ref = (elem) => {
        //elem.mask("99.99.9999", {placeholder: "ДД.ММ.ГГГГ" })
        this.setState({ elem })
    }

    _spinButtons = (() => (this.state.spinButtons) ? <div style={{ display: 'flex' }} >
        {this._btn_spin_out()}
        {this._btn_spin_in()}
    </div> : null)

    render() {
        const {
            onFocus,
            currentValue,
            label,
            outlined,
            type,
            name } = this.state;
        const onActive = !!this.state.currentValue;
        return (
            <div style={{}} className={this._classNameCont({ outlined, onFocus, onActive })} onBlur={this._onFocus} onFocus={this._onFocus}>
                {this._label({ outlined, onFocus, onActive, label })}
                {/* <input ref={this._ref} name={name} value={currentValue.toLocaleDateString()} type='text' className={this._classNameInput({ outlined })} onChange={this._onChange} /> */}
                <InputMask
                    mask="99-99-9999"
                    inputRef={this._ref}
                    name={name}
                    value={currentValue}
                    type='text'
                    className={this._classNameInput({ outlined })}
                    onChange={(event) => {
                        //console.log('event - ' + event.target.value)
                        return this._onChange(event)
                    }} />
                <div style={{ margin: 'auto 8px', display: 'flex' }} >
                    {this._btnCalendar()}
                    {this._spinButtons()}
                </div>
            </div >
        )
    }
}
export default DateField;