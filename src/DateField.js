import { BtnSpin, BtnCalendar } from './BtnSpin';
import { SvgPlus, SvgMinus, SvgCalendar } from './Svg';
import { ModalCalendar } from './ModalCalendar';
import { Label } from './Label';
import { ClassNameCont, ClassNameInput } from './ClassName';
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
            value: moment(props.value).startOf('day') || date,
            currentValue: moment(props.value).format('DD-MM-YYYY') || date.format('DD-MM-YYYY'),
            date,
            elem: null,
            openModalCalendar: false,
        }
    }

    _onFocus = (event) => {
        var onFocus = false;
        var elem = this.state.elem;
        switch (event.type) {
            case 'focus':
            case 'click':
                onFocus = true;
                elem.focus();
                break;
            case 'blur':
                if (this.state.openModalCalendar) {
                    onFocus = true;
                    elem.focus();
                }
                break;
        }
        this.setState({
            onFocus,
        })
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.value) {
            if (!moment(moment(nextProps.value).startOf('day')).isSame(moment(this.props.value).startOf('day'))) {
                this.setState({ currentValue: moment(nextProps.value).startOf('day').format('DD-MM-YYYY') })
            }
        }
    }

    _onChange = (event) => {
        var value = event.target.value;
        var date = moment(value, 'DD-MM-YYYY').isValid() ? moment(value, 'DD-MM-YYYY') : moment('01-01-1970');
        this.setState({
            currentValue: value,
            date
        })
        event.target.value = JSON.stringify({
            dateFrom: (moment(date).startOf('day').toISOString(true)),
            dateTo: (moment(date).endOf('day').toISOString(true)),
        });
        let props = this.props;
        props.onChange && props.onChange(event)
        props.onChangeObject && props.onChangeObject(value)
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

    _btnCalendar = () => ((this.props.onCalendarButton) ? <div style={{ position: 'relative', color: 'initial' }} >
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
        return <div >
            <ModalCalendar
                date={this.state.date}
                openModal={this.state.openModalCalendar}
                onSelect={this._onSelectCalendar}
                onClick={() => {
                    this.setState({ openModalCalendar: false })
                }} />
        </div>
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
            currentValue, } = this.state;
        const onActive = !!this.state.currentValue;
        return (
            <div className={ClassNameCont({ outlined: this.props.outlined, onFocus, onActive })} onBlur={this._onFocus} onFocus={this._onFocus}>
                {Label({ outlined: this.props.outlined, onFocus, onActive, label: this.props.label })}
                <InputMask
                    mask="99-99-9999"
                    inputRef={this._ref}
                    name={this.props.name}
                    value={currentValue}
                    type={this.props.type}
                    className={ClassNameInput({ outlined: this.props.outlined })}
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