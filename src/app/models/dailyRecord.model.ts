/* eslint-disable no-trailing-spaces */
// here 'wellbeing' and 'loneliness' are defined as strings because for <ion-radio-group
// we have to use strings not numbers on the html page.
// During submit to the server they will be converted to a number (eq. +this.dailyRecordData.wellbeing)

import { MOODS_FOR_DISPLAY } from 'src/environments/config_hk';

// Contains data (one record) for 'Daily Record'
export class DailyRecord {

  // for page 1/5
  public moodToday: string;
   // THE COORDINATES ARE NOT BEING SENT TO THE SERVER AT THE MOMENT:
  // stores (x,y) coordinates of the selected mood value (cliked)
  // This is also the location of the pointer
  selectedMoodValueLocation: {x: number; y: number};

  // for page 2/5
  public wellbeing: string;
  // for page 3/5
  public loneliness: string;

  // for page 4/5
  // For each activity code the user selected there is an array of supporterRecordId.
  // If the activity was done alone then the arry is empty: []
  // Activity codes are in PASTIME_CHOICES
  public activitiesAndPeople: Map<string, number[]>;

  // for page 5/5
  // For a location there is a number of hours spent in that location
  public locationsAndHours: Map<string, number>;

  constructor() {
    // NONE is defined in config_hk.ts in MOODS_FOR_DISPLAY
    this.moodToday = 'NONE';
    this.selectedMoodValueLocation = {x: null, y: null};
    this.wellbeing = '0';
    this.loneliness = '0';
    this.activitiesAndPeople = new Map<string, number[]>();

    this.locationsAndHours = new Map<string, number>();
    this.locationsAndHours.set('hours_bed', 0);
    this.locationsAndHours.set('hours_sofa', 0);
    this.locationsAndHours.set('hours_kitchen', 0);
    this.locationsAndHours.set('hours_garden', 0);
  }

}
