import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DailyRecordAddPersonScreen1Page } from './daily-record-add-person-screen1.page';

describe('DailyRecordAddPersonScreen1Page', () => {
  let component: DailyRecordAddPersonScreen1Page;
  let fixture: ComponentFixture<DailyRecordAddPersonScreen1Page>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DailyRecordAddPersonScreen1Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DailyRecordAddPersonScreen1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
