import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExpensesModalPage } from './expenses-modal.page';

describe('ExpensesModalPage', () => {
  let component: ExpensesModalPage;
  let fixture: ComponentFixture<ExpensesModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpensesModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ExpensesModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
