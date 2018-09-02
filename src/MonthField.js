import { BtnSpin, BtnCalendar } from './BtnSpin';
import { SvgPlus, SvgMinus, SvgCalendar } from './Svg';
import { ModalCalendar } from './ModalCalendar';
import { Label } from './Label';
import { ClassNameCont, ClassNameInput } from './ClassName';
import { startOfMonth, endOfMonth, addMonths, format, isEqual, isValid, isDate } from 'date-fns';
// import moment from 'moment';
// import 'moment/locale/ru';
import React, { Component } from 'react';
import InputMask from 'react-input-mask';
//moment.locale('ru')

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

    componentWillcomponentWillReceivePropsUpdate(nextProps) {
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
        var date = (moment(value, 'DD-MM-YYYY').isValid()) ? moment(value, 'DD-MM-YYYY') : moment('01-01-1970');
        this.setState({
            date
        })
        value = {
            dateFrom: (moment(date, 'ru').startOf('month').toISOString(true)),
            dateTo: (moment(date, 'ru').endOf('month').toISOString(true)),
        }
        event.target.value = JSON.stringify(value);
        let props = this.props;
        props.onChange && props.onChange(event)
        props.onChangeObject && onChangeObject(value)
    }

    _btn_spin_in = () => <BtnSpin
        onClick={() => this._onClickBtnSpin(moment(this.state.date).add(1, 'month').format('DD-MM-YYYY'))}
        onFocus={this._onFocus}
    ><SvgPlus /></BtnSpin>

    _btn_spin_out = () => <BtnSpin
        onClick={() => this._onClickBtnSpin(moment(this.state.date).add(-1, 'month').format('DD-MM-YYYY'))}
        onFocus={this._onFocus}
    ><SvgMinus /></BtnSpin>

    _btnCalendar = () => ((this.props.onCalendarButton) && <div style={{ position: 'relative', color: 'initial' }} >
        {this._ModalCalendar()}
        <BtnCalendar onClick={() => this._onClickBtnCalendar()}
        ><SvgCalendar /></BtnCalendar>
    </div>)

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
        var elem = this.state.elem;
        this.setState({
            openModalCalendar: false,
            date: moment(date),
        })
        this._onClickBtnSpin(moment(date).format('DD-MM-YYYY'));
        elem.focus();
    }

    _ModalCalendar = () => <div >
        <ModalCalendar
            date={this.state.date}
            openModal={this.state.openModalCalendar}
            onSelect={this._onSelectCalendar}
            isMonth
            onClick={() => {
                this.setState({ openModalCalendar: false })
            }} />
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
        const currentValue = moment(date).format('MMMM YYYY')
        const onActive = !!currentValue;
        return (
            <div className={ClassNameCont({ outlined: this.props.outlined, onFocus, onActive })} onBlur={this._onFocus} onFocus={this._onFocus}>
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