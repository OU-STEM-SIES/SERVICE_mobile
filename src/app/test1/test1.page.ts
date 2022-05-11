import { Component, OnInit } from '@angular/core';
// import { Plugins } from '@capacitor/core';

import { Storage } from '@capacitor/storage';

@Component({
  selector: 'app-test1',
  templateUrl: './test1.page.html',
  styleUrls: ['./test1.page.scss'],
})
export class Test1Page implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    // const storageObjHK = Plugins.Storage;
    // console.log('storageObjHK = ', storageObjHK);
    // const storageHK = Plugins.Storage.get({ key: 'authData' });
    // console.log('storageHK = ', storageHK);

    const storageObjHK2 = Storage;
    console.log('storageObjHK2 = ', storageObjHK2);
    const storageHK2 = Storage.get({ key: 'authData' });
    console.log('storageHK = ', storageHK2);
  }

}
