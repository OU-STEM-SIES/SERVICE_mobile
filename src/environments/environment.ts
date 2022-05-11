// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// THE ABOVE IS DEPRECIATED !. NOW YOU SHOULD RUN:
// ng build --configuration=production

// !!!!!!  IMPORTANT CHANGES TO MAKE:   !!!!!!!!!
// Insted of BACKEND_SERVER_URL text string insert your own server url.
// It will allow for API calls.
// For example instead of:
// loginApiUrl: 'BACKEND_SERVER_URL/api-auth/',
// there might be:
// loginApiUrl: 'https://service-project.uni.ac.uk/api-auth/',


export const environment = {
  production: false,
  loginApiUrl: 'BACKEND_SERVER_URL/api-auth/',
  userProfileDataApiUrl: 'BACKEND_SERVER_URL/api/profile/?id=',
  moodsUrl: 'BACKEND_SERVER_URL/api/moods/',
  myCircleReadingUrl: 'BACKEND_SERVER_URL/api/cos/',
  addToMyCircleUrl: 'BACKEND_SERVER_URL/api/add_supporter',
  removeFromMyCircleUrl: 'BACKEND_SERVER_URL/api/remove_supporter',
  editDataMyCircleUrl: 'BACKEND_SERVER_URL/api/edit_supporter',
  myHistoryUrl: 'BACKEND_SERVER_URL/api/pagedmoods/',
};


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
