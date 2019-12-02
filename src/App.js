import React, {Component} from 'react';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';


import logo from './logo.svg';
import './App.css';

class App extends Component {

    // Constructeur
    constructor(props) {
        super(props);

        // Initialisation du state
        this.state = {
            morningStart : new Date(),
            morningEnd : new Date(),
            afternoonStart : new Date(),
            afternoonEnd : new Date(),
            dureeMatin : 0,
            dureeMidi : 0,
            dureeJournee : 0,
            heuresATravailler : 8,
            heureMiniDepart : new Date()
        }
    }

    recalculDurees() {



    }

    handleDateMorningStartChange = date => {
            this.setState({
                morningStart : date
            });
    }

    handleDateMorningEndChange = date => {
            this.setState({
                morningEnd : date
            });
    }

    handleDateAfternoonStartChange = date => {
            this.setState({
                afternoonStart : date
            });
    }

    handleDateAfternoonEndChange = date => {
            this.setState({
                afternoonEnd : date
            });
    }

  render() {
  return (
    <div className="App">
        <div className="form-group">
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardTimePicker
                margin="normal"
                id="morningStart"
                label="Arrive matin"
                ampm={false}
                value={this.state.morningStart}
                onChange={this.handleDateMorningStartChange}
                KeyboardButtonProps={{
                'aria-label': 'change time',
                }}
                />
            </MuiPickersUtilsProvider>
        </div>
        <div className="form-group">
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardTimePicker
                margin="normal"
                id="morningEnd"
                label="Depart matin"
                ampm={false}
                value={this.state.morningEnd}
                onChange={this.handleDateMorningEndChange}
                KeyboardButtonProps={{
                'aria-label': 'change time',
                }}
                />
            </MuiPickersUtilsProvider>
        </div>
        <div>Durée matin : {this.state.dureeMatin}</div>
        <div className="form-group">
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardTimePicker
                margin="normal"
                id="afternoonStart"
                label="Arrive après-midi"
                ampm={false}
                value={this.state.afternoonStart}
                onChange={this.handleDateAfternoonStartChange}
                KeyboardButtonProps={{
                'aria-label': 'change time',
                }}
                />
            </MuiPickersUtilsProvider>
        </div>

        <div>Durée midi : {this.state.dureeMidi}</div>
        <div className="form-group">
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardTimePicker
                margin="normal"
                id="afternoonEnd"
                label="Depart après-midi"
                ampm={false}
                value={this.state.afternoonEnd}
                onChange={this.handleDateAfternoonEndChange}
                KeyboardButtonProps={{
                'aria-label': 'change time',
                }}
                />
            </MuiPickersUtilsProvider>
        </div>

        <div>Durée journée : {this.state.dureeJournee}</div>
    </div>
  );
  }
}

export default App;
