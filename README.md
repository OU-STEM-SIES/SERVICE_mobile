# CircleApp v1.3 (released Dec 2021)

This repository contains the client-side code for the [SERVICE project](https://serviceproject.org.uk).  

The application allows sharing of experiences with supporters in a secure and private environment.

There is a separate repository for the corresponding [server-side code](https://stem-ts-gitlab.open.ac.uk/jal58/SERVICE).

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. 
See *deployment* section for notes on how to deploy the project on a live system.

These instructions are for a MacOS machine and most Linux setups. They will probably require extensive tweaks to paths, filenames,
executables, and so on to run under Windows. I'll give Windows hints where I can, but it will be patchy, and I can't guarantee the 
code will work on Windows without quite a few changes.

### Prerequisites

This version of the CircleApp has been created in the following environment:
* Angular CLI: 12.1.0
* Ionic CLI: 6.17.1
* Node.js: 14.17.0
* npm 7.14.0

### Node.js and npm installing

Because the app is [Angular](https://angular.io) and [Ionic](https://ionicframework.com/) based then you need to have them installed on your machine.

But before proceeding to Angular and Ionic installing, make sure your computer has [Node.js](https://nodejs.org) and [npm](https://www.npmjs.com) installed. 

To see if you already have [Node.js](https://nodejs.org) and [npm](https://www.npmjs.com) installed 
and check the installed version, open a terminal window and run the following commands:
```
node -v
npm -v
```

**DON'T download Node.js version 17!** At the moment Angular doesn't work with that version.
Use the [LTS version](https://nodejs.org/en/download/) of Node.js, instead. 

**[It is strongly recommended](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)** using 
a Node Version Manager like [nvm](https://github.com/nvm-sh/nvm) to install [Node.js](https://nodejs.org) and [npm](https://www.npmjs.com).

To see if you have nvm (Node Version Manager) installed, open a terminal window and run: 
```
nvm -v
```

If you don’t have nvm installed, follow:
* https://github.com/nvm-sh/nvm#install...

To use nvm to install the latest LTS release of Node.js, open a terminal window and run:
```
nvm install --lts
```

To use nvm to install the latest version of npm, open a terminal window and run:
```
npm install -g npm
```

There are rumours that npm v7 can cause issues. However it was working correctly on this project. In case of troubles 
you should be able to use npm v6 as well:
```
npm install npm@6.x.x -g  
```

On Mac OS, you might need to add *sudo* in front of those commands.

Windows users may try to follow [this documentation](https://docs.microsoft.com/en-us/windows/dev-environment/javascript/nodejs-on-windows).


### Angular and Ionic installing

To see if you already have [Angular](https://angular.io)  and [Ionic](https://ionicframework.com/) installed and 
check the installed version, open a terminal window and run the following commands:
```
ng v
ionic -v
```

To install the latest version of Angular, open a terminal window and run:
```
npm install -g @angular/cli
```

If you encounter any dependency errors with the lastest Angular version, run the following as a workaround:
```
npm i -g @angular/cli@12.1.0 
```

To install the latest version of Ionic, open a terminal window and run:
```
npm install -g @ionic/cli
```

On Mac OS, you might need to add *sudo* in front of those commands.

In order to get more details about installing [Angular](https://angular.io) or [Ionic](https://ionicframework.com/) 
go to the following webistes and follow the relevant documentation:
* https://angular.io/guide/setup-local
* https://ionicframework.com/docs/intro/cli


## Installing the app on the local machine

### Common steps after downloading from the git repository
The following steps have to be done before proceeding to *running the app* section.
1. After unpacking the project just enter the project's folder:
```
cd 'your project name'
```
2.  Update the content of environment.ts and environment.prod.ts files (just follow
   the 'IMPORTANT CHANGES TO MAKE' section there) located in  ./src/environments folder.
3. Then install the packages and dependencies:
```
npm install
```


## Running the app

### Running the app in the web browser 
Make sure that you are in the project's folder, then run the command to start a development server:
```
ionic serve
```
Once the server starts, the command automatically opens the application URL http://localhost:8100, in the browser.


### Running the app with [Xcode](https://developer.apple.com/xcode/)
Xcode requires MacOS to run.

Make sure that you are in the project's folder, then run the commands:
```
ionic capacitor sync ios
ionic capacitor open ios
```
Once Xcode launches, you can run the app through the standard Xcode workflow.
If this is new for you, follow [iOS Development](https://ionicframework.com/docs/developing/ios).
Then in Xcode, select a target simulator or device and click the play button.

### Running the app with [Android Studio](https://developer.android.com/studio/)
Make sure that you are in the project's folder, then run the commands:
```
ionic capacitor sync android
ionic capacitor open android
```
Once Android Studio launches, you can run your app through the standard Android Studio workflow.
If this is new for you, follow [Android Development](https://ionicframework.com/docs/developing/android).
Then in Android Studio, click the Run button and then select the target simulator or device.

### Running the app on iOS device connected via USB cable
Make sure that you are in the project's folder, then run the commands:
```
ionic capacitor sync ios
ionic capacitor run ios
```
It will show the list of devices. You then select your device name and click Enter.

### Running the app on Android device connected via USB cable
Make sure that you are in the project's folder, then run the commands:
```
ionic capacitor sync android
ionic capacitor run android 
```
It will show the list of devices. You then select your device name and click Enter.

**Remember** to turn on *Developer options* on your Android device as described [here](https://developer.android.com/studio/debug/dev-options). 

For more details go to *Ionic CLI Capacitor Commands* section of  [Using Capacitor with Ionic Framework](https://capacitorjs.com/docs/getting-started/with-ionic).

In case of troubles consult [iOS Troubleshooting Guide](https://capacitorjs.com/docs/ios/troubleshooting) or 
[Troubleshooting Android Issues](https://capacitorjs.com/docs/android/troubleshooting) of [Capacitor docs](https://capacitorjs.com/docs).

## Deployment

In order to deploy the app for:
* Android devices to [Google Play Console](https://play.google.com/console/about/)
* iOS devices to [Apple Store Connect](https://developer.apple.com/app-store-connect/) 

To start, consult the official Apple documentation on [Submitting Apps to the App Store](https://developer.apple.com/app-store/submitting/).
Consult also the official Google documentation on the [launch checklist](https://play.google.com/console/about/releasewithconfidence/).
 
 You need to set up [Google developer account](https://developers.google.com) 
 and [Apple developer account](https://developer.apple.com/programs/) as the first step. There are some fees to pay for that.

For start have a look at the following parts on Ionic doc:
* [Android Play Store Deployment](https://ionicframework.com/docs/deployment/play-store)
* [iOS App Store Deployment](https://ionicframework.com/docs/deployment/app-store)

 Icons and splashscreens for both environments are included in the project and should be available when the project is opened in Xcode or Android Studio.

## Contributing

If you wish to contribute, please contact the [SERVICE project team](mailto:STEM-SERVICE-Project@open.ac.uk).

## License of the CircleApp

This project is owned by the [SERVICE project](https://serviceproject.org.uk) team at [The Open University](https://www.open.ac.uk).

This project is licensed under the Open Source License.

## Licensing of the software used for the app development

* [Angular MIT License](https://angular.io/license)
* [Ionic MIT License](https://github.com/ionic-team/ionic-framework/blob/main/LICENSE)
* [Node.js License](https://raw.githubusercontent.com/nodejs/node/master/LICENSE)
* [npm  Artistic License 2.0 (subject to additional terms)](https://docs.npmjs.com/policies/npm-license)
* [Capacitor MIT License](https://github.com/ionic-team/capacitor/blob/main/LICENSE)

## Credits

**OU HCI/Design Team**
* Blaine Price
* Daniel Gooch
* Dmitri Katz
* Mark Hall
* Sarat Sarvepalli
* Yasmin Morgan
* Mohamed Bennasar
* Emilie Giles
* Vikram Mehta

**Software Innovation and Engineering Services Team**
* Henryk Krajinski
* Jef Lay
* Michelle Bachler
            
**NTU Social Psychology Team**
* Clifford Stevenson
* Lydia Harkin
* Miriam Park
* Ronnie Jieru Yan

**Exeter Psychology Team**
* Avelie Stuart

**Advisors**
* Age UK Exeter
* Wellmoor

**Icons made by**
* Freepik from [www.flaticon.com](https://www.flaticon.com)
* Smashicons from [www.flaticon.com](https://www.flaticon.com)
* Darius Dan from [www.flaticon.com](https://www.flaticon.com)

**And special thanks to all the participants who have given generously of their time and opinions.**

## Acknowledgments

This project was developed under the auspices of the [SERVICE project](https://serviceproject.org.uk) 
team by the STEM SIES (Software Innovation and Engineering Services) Team.
