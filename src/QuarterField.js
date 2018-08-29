
import moment from 'moment';
import 'moment/locale/ru';
import React, { Component } from 'react';
import InputMask from 'react-input-mask';
//import './btnSpin.css';
//import './QuarterField.css';
moment.locale('ru')

class QuarterField extends Component {

    constructor(props) {
        super(props)
        var date = moment().startOf('quarter');
        //console.log(date)
        this.state = {
            onFocus: false,
            label: props.label,
            value: moment(props.value).startOf('quarter') || date,
            date,
            outlined: props.outlined,
            type: props.type,
            name: props.name,
            spinButtons: props.onSpinButtons,
            elem: null,
            openModalCalendar: false,
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

    componentWillUpdate(nextProps, nextState) {
        //console.log(nextProps.value+ ' ' + this.state.value)

        if (nextProps.value) {
            var value = moment(nextProps.value).startOf('quarter');
            //console.log(moment(value).isSame(this.state.value))
            if (!moment(value).isSame(this.state.value))
                this.setState({ value })
        }
        else {

        }
    }

    _onChange = (event) => {
        var value = event.target.value;
        var date = this.state.date
        //console.log(value);
        if (moment(value, 'DD-MM-YYYY').isValid()) {
            date = moment(value, 'DD-MM-YYYY');
        }
        else {
            date = moment('01-01-1970');
        }
        value = {
            dateFrom: (moment(date, 'ru').startOf('quarter').toISOString(true)),
            dateTo: (moment(date).endOf('quarter').toISOString(true)),
        }
        event.target.value = JSON.stringify(value);
        //console.log(value);

        if (this.props.onChange) this.props.onChange(event)
        if (this.props.onChangeObject) this.props.onChangeObject(value)
        this.setState({
            date
        })
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

    _btn_spin_in = () => <div className='btn-spin browser-default'
        onClick={(event) => {
            var value = this.state.date;
            value = moment(value).add(1, 'quarter');
            this._onClickBtnSpin(value.format('DD-MM-YYYY'))
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
        onClick={(event) => {
            var value = this.state.date;
            value = moment(value).add(-1, 'quarter');
            this._onClickBtnSpin(value.format('DD-MM-YYYY'))
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
        //console.log('calendar - ' + value)
        if (cancel) this._onChange(evt);
    }

    _onClickBtnCalendar = () => {
        var openModalCalendar = !this.state.openModalCalendar;

        this.setState({
            openModalCalendar
        })
    }

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
                {/* <Calendar isMonth date={date} onSelect={this._onSelectCalendar} /> */}
            </div>
        </div>
    }

    _ref = (elem) => {
        //elem.mask("99.99.9999", {placeholder: "ДД.ММ.ГГГГ" })
        this.setState({ elem })
    }

    _spinButtons = () => (this.state.spinButtons) ? <div style={{ margin: 'auto 8px', display: 'flex' }} >
        {/* {this._btnCalendar()} */}
        {this._btn_spin_out()}
        {this._btn_spin_in()}
    </div> : <div style={{ margin: 'auto 8px', display: 'flex' }} >
            {/* {this._btnCalendar()} */}
        </div>

    render() {
        const {
            onFocus,
            label,
            outlined,
            date,
            type,
            name } = this.state
        const currentValue = moment(date).format('Q') + ' квартал ' + moment(date).format('YYYY')
        const onActive = (this.state.date) ? true : false;

        //console.log('render - ' + currentValue)
        //if (currentValue === typeof())
        return (
            <div style={{}} className={this._classNameCont({ outlined, onFocus, onActive })} onBlur={this._onFocus} onFocus={this._onFocus}>
                {this._label({ outlined, onFocus, onActive, label })}
                {/* <input ref={this._ref} name={name} value={currentValue.toLocaleDateString()} type='text' className={this._classNameInput({ outlined })} onChange={this._onChange} /> */}
                <InputMask
                    readOnly
                    inputRef={this._ref}
                    name={name}
                    value={currentValue}
                    type='text'
                    className={this._classNameInput({ outlined })}
                    />
                {this._spinButtons()}
            </div>
        )
    }
}
export default QuarterField;