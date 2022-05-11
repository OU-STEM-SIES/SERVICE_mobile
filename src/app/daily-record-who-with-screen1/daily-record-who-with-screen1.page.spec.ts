import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DailyRecordWhoWithScreen1Page } from './daily-record-who-with-screen1.page';

describe('DailyRecordWhoWithScreen1Page', () => {
  let component: DailyRecordWhoWithScreen1Page;
  let fixture: ComponentFixture<DailyRecordWhoWithScreen1Page>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DailyRecordWhoWithScreen1Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DailyRecordWhoWithScreen1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
