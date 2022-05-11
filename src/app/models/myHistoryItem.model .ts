/* eslint-disable no-underscore-dangle */

// Contains data (one record) for 'My History'
export class MyHistoryItem {
  constructor(
    public currentMood: string,
    public time: Date,
    public includeWellbeing: boolean,
    public wellbeing: number,
    public previousWellbeing: number,
    public loneliness: number,
    public previousLoneliness: number,
    public activitiesAndPeople: Map<string, number[]>,
    public hoursBed: number,
    public hoursSofa: number,
    public hoursKitchen: number,
    public hoursGarden: number
  ) {}

}
