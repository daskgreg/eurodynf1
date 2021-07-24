import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css'],
})
export class ResultsComponent implements OnInit {
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.update('');
  }

  formulaYears: any;
  years: any;
  pista = 'Bahrain Grand Prix';
  selectedYear = 2021;
  raceTable: any;

  everyFormulaYearAr() {
    this.years = function (startYear) {
      var currentYear = new Date().getFullYear(),
        years = [];
      while (startYear <= currentYear) {
        years.push(startYear++);
      }
      return years;
    };
    this.formulaYears = [...this.years(2021 - 71)];
    return this.formulaYears;
  }

  update(e) {
    if (e) {
      this.selectedYear = e.target.value;
      this.pista = 'Circuit';
      this.tableCircuit = false;
      this.driversName = 'Driver';
    } else {
      this.selectedYear = 2021;
    }

    this.http
      .get(
        'http://ergast.com/api/f1/' +
          this.selectedYear +
          '/results.json?limit=400&offset=0'
      )
      .subscribe((data) => {
        this.raceTable = data;
        this.raceTable = this.raceTable.MRData.RaceTable.Races;
        if (this.pista == 'Bahrain Grand Prix') {
          this.searchRace('');
        }
      });
  }

  drivid: any;
  tableCircuit: boolean = true;
  driverInformatione: any;
  driverCircuitInfo: any;
  driversName = 'Driver';

  driverNameFunction(e) {
    this.driversName = e.target.value;

    if (this.driversName) {
      this.tableCircuit = false;
    }

    for (const driver of this.grandPrixInfo) {
      if (driver.Driver.driverId == this.driversName) {
        this.driverInformatione = driver.Driver;
        this.driverCircuitInfo = driver;
      }
    }
  }
  grandPrixInfo: any;
  buttonsCircuit: boolean = true;

  circuitInfo: any;
  buttonSearchRace(e) {
    if (e) {
      this.pista = e.target.value;
    } else {
      this.pista = 'Bahrain Grand Prix';
      this.buttonsCircuit = false;
    }

    for (const rn of this.raceTable) {
      if (rn.raceName == this.pista) {
        this.grandPrixInfo = rn.Results;
      }
    }
  }
  circuitData: any;
  circuitDataTime: any;
  searchRace(e) {
    if (e) {
      this.pista = e.target.value;
      this.tableCircuit = true;
      this.driversName = 'Driver';
    } else {
      this.pista = 'Bahrain Grand Prix';
      this.buttonsCircuit = false;
    }

    for (const rn of this.raceTable) {
      if (rn.raceName == this.pista) {
        this.circuitData = rn;
        this.circuitDataTime = rn.time.slice(0, -1);
        this.circuitInfo = rn.Circuit;

        this.grandPrixInfo = rn.Results;
      }
    }
  }
}
