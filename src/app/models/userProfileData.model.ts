import {
  GENDER_CHOICES,
  ETHNIC_CHOICES,
  EDUCATION_CHOICES,
  DISABILITY_CHOICES,
  MARITAL_CHOICES,
  HEALTH_CHOICES,
} from '../../environments/config_hk';

export class UserProfileData {
  public userId: string;
  public userName: string;
  public firstName: string;
  public lastName: string;
  public email: string;
  public role: string;
  public phone: string;
  public image: string;
  public dateOfBirth: string;
  public gender: string;
  public ethnicity: string;
  public education: string;
  public disability: string;
  public maritalStatus: string;
  public smoking: string;
  public alcoholUnitsPerWeek: string;
  public healthConditions: string[];

  // responseDataObj is the data that comes from the server as response
  constructor(responseDataObj) {
    for (const key in responseDataObj) {
      if (responseDataObj.hasOwnProperty(key)) {
        const userObj = responseDataObj[key].user;
        this.userId = userObj.id;
        this.userName = userObj.username;
        this.firstName = userObj.first_name;
        this.lastName = userObj.last_name;
        this.email = userObj.email;

        this.role = responseDataObj[key].role;
        this.phone = responseDataObj[key].phone;
        this.image = responseDataObj[key].image;
        this.dateOfBirth = responseDataObj[key].date_of_birth;
        this.gender = GENDER_CHOICES[responseDataObj[key].gender];
        console.log('GENDER TEST1: ', this.gender = GENDER_CHOICES[responseDataObj[key].gender]);
        this.ethnicity = ETHNIC_CHOICES[responseDataObj[key].ethnicity];
        this.education = EDUCATION_CHOICES[responseDataObj[key].education];
        this.disability = DISABILITY_CHOICES[responseDataObj[key].disability];
        this.maritalStatus =
          MARITAL_CHOICES[responseDataObj[key].marital_status];
        this.smoking = responseDataObj[key].smoking ? 'Yes' : 'No';
        this.alcoholUnitsPerWeek = responseDataObj[key].alcohol_units_per_week;


        this.healthConditions = [];
        const data = responseDataObj[key].health_conditions;
        console.log('data: ', JSON.stringify(data, null ,2));
        if (data) {
          console.log('data:', data);
          console.log('TYPE data:', typeof data);
          data.forEach((item) => {
            console.log('item:', item);
            console.log('TYPE item:', typeof item);
            console.log('cond descr:', HEALTH_CHOICES[item]);
            this.healthConditions.push(HEALTH_CHOICES[item]);
          });
        }

        // this.healthConditions = [];
        // const healthConditionsObj = responseDataObj[key].health_conditions;
        // console.log(JSON.stringify(healthConditionsObj, null ,2));
        // healthConditionsObj.forEach((key, value) => {
        //   console.log('value:', value);
        //   console.log('TYPE value:', typeof value);
        //   console.log('TYPE item:', HEALTH_CHOICES[value]);
        //   this.healthConditions.push(HEALTH_CHOICES[value]);
        // });
      }
    }
  }
}
