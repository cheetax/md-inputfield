# material-inputfield

#### [Demo](https://cheetax.github.io/reactapp/)

# Install
```npm install material-inputfield --save```

# Use
```js
import { DateField, NumberField, MonthField, QuarterField, YearField } from 'material-inputfield';
import 'material-inputfield/dist/material-inputfield.css';
import React, { Component } from 'react';
import './App.css';

class App extends Component {

  render() {
    const date = new Date()
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Test Input Field</h1>
        </header>
        <h3>Filled text fields</h3>
        <div className='App-intro' >
          <NumberField onSpinButtons onChange={(event) => console.log(event)} name='label' value={123456789} type='number' label='Label' />
          <DateField onCalendarButton onSpinButtons onChange={(event) => console.log(event.target.value)} name='date' value={date} label='Date' />
          <MonthField onCalendarButton onSpinButtons onChange={(event) => console.log(event.target.value)} name='month' value={date} label='Month' />
          <QuarterField onSpinButtons onChangeObject={(obj) => console.log(obj)} name='quarter' value={date} label='Quarter' /> 
          <YearField onSpinButtons onChangeObject={(obj) => console.log(obj)} name='year' value={date} label='Year' />
        </div>
        <h3>Outlined text fields</h3>
        <div className='App-intro' >
          <NumberField outlined onSpinButtons onChange={(event) => console.log(event)} name='label' value={123456789} type='number' label='Label' />
          <DateField outlined onCalendarButton onSpinButtons onChange={(event) => console.log(event.target.value)} onChangeObject={(obj) => console.log(obj)} name='date' value={date} label='Date' />
          <MonthField outlined onCalendarButton onSpinButtons onChange={(event) => console.log(event.target.value)} onChangeObject={(obj) => console.log(obj)} name='month' value={date} label='Month' />
          <QuarterField outlined onSpinButtons onChange={(event) => console.log(event.target.value)} onChangeObject={(obj) => console.log(obj)} name='quarter' value={date} label='Quarter' /> 
          <YearField outlined onSpinButtons onChange={(event) => console.log(event.target.value)} onChangeObject={(obj) => console.log(obj)} name='year' value={date} label='Year' />
        </div>
      </div>
    );
  }
}

export default App;
```
