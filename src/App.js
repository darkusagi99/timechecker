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
            afternoonEnd : new Date(),
            dureeMatin : 0,
            dureeMidi : 0,
            dureeJournee : 0,
            heuresATravailler : 8,
            heureMiniDepart : ""
        }
    }

    recalculDurees() {
        var dureeMatinTmp = this.state.morningEnd - this.state.morningStart;
        var dureePause = this.state.afternoonStart - this.state.morningEnd;
        var debutAfternoonMini = new Date(this.state.morningEnd.getTime() + dureeMidiMini);

        var debutAfternoonReference;

        if (debutAfternoonMini > this.state.afternoonStart) {
            debutAfternoonReference = debutAfternoonMini;
        } else {
            debutAfternoonReference = this.state.afternoonStart;
        }

        var dureeAfternoon = dureeJourneeStd - dureeMatinTmp;
        var heureDepartTmp = new Date(debutAfternoonReference.getTime() + (dureeJourneeStd - dureeMatinTmp));

        var dureeMatinHoursTmp = Math.floor(dureeMatinTmp / 3600000);
        var dureeMatinMinutesTmp = (dureeMatinTmp - (dureeMatinHoursTmp * 3600000)) / 60000;

        var dureeMidiHoursTmp = Math.floor(dureePause / 3600000);
        var dureeMidiMinutesTmp = (dureePause - (dureeMidiHoursTmp * 3600000)) / 60000;

        console.log("debutAfternoonReference : ", debutAfternoonReference);
        console.log("dureeAfternoon : ", dureeAfternoon);


        console.log("dureeJourneeStd : ", dureeJourneeStd);

        console.log("heureDepartTmp : ", heureDepartTmp);

        this.setState({
                        dureeMatin : dureeMatinHoursTmp + "h " + dureeMatinMinutesTmp + " min",
                        dureeMidi : dureeMidiHoursTmp + "h " + dureeMidiMinutesTmp + " min",
                        heureMiniDepart : heureDepartTmp.getHours() + "h " + heureDepartTmp.getMinutes() + " min"
                    });


    }

    handleDateMorningStartChange = date => {
            this.setState({
                morningStart : date
            });

            this.recalculDurees();
    }

    handleDateMorningEndChange = date => {
            this.setState({
                morningEnd : date
            });

            this.recalculDurees();
    }

    handleDateAfternoonStartChange = date => {
            this.setState({
                afternoonStart : date
            });

            this.recalculDurees();
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

        <div>Durée journée : {this.state.heureMiniDepart}</div>
    </div>
  );
  }
}

export default App;
