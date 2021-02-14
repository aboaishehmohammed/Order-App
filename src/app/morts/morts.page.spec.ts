import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MortsPage } from './morts.page';

describe('MortsPage', () => {
  let component: MortsPage;
  let fixture: ComponentFixture<MortsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MortsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MortsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
