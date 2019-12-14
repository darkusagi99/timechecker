import React, {Component} from 'react';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker
} from '@material-ui/pickers';

import './App.css';

// Constantes
const dureeJourneeStd = 28800000; // 8 Heures
const dureeMidiMini = 1800000; // 30 Minutes

class App extends Component {


    // Constructeur
    constructor(props) {
        super(props);

        // Initialisation du state
        this.state = {
            morningStart : new Date(),
            morningEnd : new Date(),
            afternoonStart : new Date(),
            dureeMatin : 0,
            dureeMidi : 0,
            heureMiniDepart : ""
        }
    }

    // Methode affichage heures
    getDisplayTime(timeInterval) {

        var timeHoursTmp = Math.floor(timeInterval / 3600000);
        var timeMinutesTmp = (timeInterval - (timeHoursTmp * 3600000)) / 60000;

        return timeHoursTmp + "h " + timeMinutesTmp + " min";
    }

    // Calcul et affichage heure de depart
    getLeaveTime(dateReference, afternoonDuration) {

        var leaveTimeTmp = new Date(dateReference.getTime() + afternoonDuration);
        return leaveTimeTmp.getHours() + "h " + leaveTimeTmp.getMinutes() + " min";
    }

    // Calcul des durees
    recalculDurees(morningStartDate, morningEndDate, afternoonStartDate) {
        var dureeMatinTmp = morningEndDate - morningStartDate;
        var dureePause = afternoonStartDate - morningEndDate;
        var debutAfternoonMini = new Date(morningEndDate.getTime() + dureeMidiMini);

        var debutAfternoonReference;

        if (debutAfternoonMini > afternoonStartDate) {
            debutAfternoonReference = debutAfternoonMini;
        } else {
            debutAfternoonReference = afternoonStartDate;
        }

        this.setState({
                        dureeMatin : this.getDisplayTime(dureeMatinTmp),
                        dureeMidi : this.getDisplayTime(dureePause),
                        heureMiniDepart : this.getLeaveTime(debutAfternoonReference, (dureeJourneeStd - dureeMatinTmp))
                    });


    }

    // Methodes de mise a jour des dates
    handleDateMorningStartChange = date => {
            this.setState({
                morningStart : date
            });

            this.recalculDurees(date, this.state.morningEnd, this.state.afternoonStart);
    }

    handleDateMorningEndChange = date => {
            this.setState({
                morningEnd : date
            });

            this.recalculDurees(this.state.morningStart , date, this.state.afternoonStart);
    }

    handleDateAfternoonStartChange = date => {
            this.setState({
                afternoonStart : date
            });

            this.recalculDurees(this.state.morningStart, this.state.morningEnd, date);
    }

    // Methode de rendu
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

        <div>Durée journée : {this.state.heureMiniDepart}</div>
    </div>
  );
  }
}

export default App;
