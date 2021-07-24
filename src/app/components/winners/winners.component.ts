import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-winners',
  templateUrl: './winners.component.html',
  styleUrls: ['./winners.component.css']
})
export class WinnersComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.update('');
  }
  formulaYears: any;
  years: any;
  selectedYear: any;
  standingsLists: any;
  // showMoreDetails: boolean =false;
  public showMoreDetails = {};
  everyFormulaYearAr() {
    this.years = function(startYear) {
      var currentYear = new Date().getFullYear(), years = [];
      while ( startYear <= currentYear ) {
        years.push(startYear++);
      }   
      return years;
    }
    this.formulaYears = [...this.years(2021 - 71)];
    return this.formulaYears;
  }

update(e) {
  if (e) {
    this.selectedYear = e.target.value
  } else {
    this.selectedYear = 2021;
  }
  console.log(this.selectedYear);

  this.http.get('http://ergast.com/api/f1/' + this.selectedYear + '/driverStandings.json?limit=400&offset=0').subscribe(data => {
    this.standingsLists = data;
    this.standingsLists = this.standingsLists.MRData.StandingsTable.StandingsLists[0].DriverStandings;
    console.log(this.standingsLists)
  })
}
}