// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl : 'http://localhost:8100/',
  firebase: {
    apiKey: "AIzaSyA3HVdW6mpzwFV5uG5qsuoi-GGoRdn-99Y",
    authDomain: "pawtracker.firebaseapp.com",
    projectId: "pawtracker",
    storageBucket: "pawtracker.appspot.com",
    messagingSenderId: "800473162003",
    appId: "1:800473162003:web:6b66e23bb5126401573ae6",
    measurementId: "G-VHBLT1CCGT"
  }

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
