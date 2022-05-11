
// To test the production environment run:
// ionic serve --configuration=production

// !!!!!!  IMPORTANT CHANGES TO MAKE:   !!!!!!!!!
// Insted of BACKEND_SERVER_URL text string insert your own server url.
// It will allow for API calls.
// For example instead of:
// loginApiUrl: 'BACKEND_SERVER_URL/api-auth/',
// there might be:
// loginApiUrl: 'https://service-project.uni.ac.uk/api-auth/',

export const environment = {
  production: true,
  loginApiUrl: 'BACKEND_SERVER_URL/api-auth/',
  userProfileDataApiUrl: 'BACKEND_SERVER_URL/api/profile/?id=',
  moodsUrl: 'BACKEND_SERVER_URL/api/moods/',
  myCircleReadingUrl: 'BACKEND_SERVER_URL/api/cos/',
  addToMyCircleUrl: 'BACKEND_SERVER_URL/api/add_supporter',
  removeFromMyCircleUrl: 'BACKEND_SERVER_URL/api/remove_supporter',
  editDataMyCircleUrl: 'BACKEND_SERVER_URL/api/edit_supporter',
  myHistoryUrl: 'BACKEND_SERVER_URL/api/pagedmoods/',
};


