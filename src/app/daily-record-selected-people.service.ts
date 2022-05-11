import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DailyRecordSelectedPeopleService {

  // Here will be stored IDs of people that already were selected DailyRecordAddPersonScreen1Page.
  // Otherwise they will be forgotton (for those who were not saved) when we go
  //  from DailyRecordWhoWithScreen1Page to DailyRecordAddPersonScreen1Page and back to DailyRecordWhoWithScreen1Page
  selectedPeopleIDs: Set<number>;

  constructor() {
    this.selectedPeopleIDs = new Set<number>();
   }

  deleteData() {
    this.selectedPeopleIDs.clear();
  }
}
