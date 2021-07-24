import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver) {}

  showWinnersComp: boolean = true;
  showResultsComp: boolean = false;
  showContactComp: boolean = false;
  winners() {
    this.showWinnersComp = true;
    this.showResultsComp = false;
    this.showContactComp = false;
  }
  results() {
    this.showWinnersComp = false;
    this.showResultsComp = true;
    this.showContactComp = false;
  }
  contact() {
    this.showWinnersComp = false;
    this.showResultsComp = false;
    this.showContactComp = true;
  }
}
