import {  OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, HostListener } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  contactForm: FormGroup;
  disabledSubmitButton: boolean = true;
  optionsSelect: Array<any>;
  
    @HostListener('input') oninput() {
  
    if (this.contactForm.valid) {
      this.disabledSubmitButton = false;
      }
    }
  
  constructor(private router: Router, private http:HttpClient,private fb: FormBuilder) {
  
    this.contactForm = fb.group({
      'contactFormName': ['', Validators.required],
      'contactFormEmail': ['', Validators.compose([Validators.required, Validators.email])],
      'contactFormSubjects': ['', Validators.required],
      'contactFormMessage': ['', Validators.required],
      'contactFormCopy': [''],
      });
    }
  standingsLists: any;
  
  ngOnInit(): void {

    this.http.get('http://ergast.com/api/f1/2021/driverStandings.json?limit=400&offset=0').subscribe(data => {
      this.standingsLists = data;
      this.standingsLists = this.standingsLists.MRData.StandingsTable.StandingsLists[0].DriverStandings;
    })
  }

  onSubmit() {
    this.router.navigate(['homepage']);
  }
}
