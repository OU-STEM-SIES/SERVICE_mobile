//
// supporterRecordId - id of the data that will be edited or deleted on the page. It is used also on DailyRecords
// lookup values for 'group' are defined in SOCIAL_GROUPS_CHOICES in config_hk.ts
// lookup values for 'howClose' are defined in HOW_CLOSE in config_hk.ts
// lookup values for 'howOften' are defined in HOW_OFTEN in config_hk.ts
export class PersonInTheCircle {
  constructor(
    public id: number,
    public supporterRecordId: number,
    public firstName: string,
    public lastName: string,
    public group: string,
    public howClose: number,
    public howOften: number
  ) {}
}
