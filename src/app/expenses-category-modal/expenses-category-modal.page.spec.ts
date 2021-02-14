import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExpensesCategoryModalPage } from './expenses-category-modal.page';

describe('ExpensesCategoryModalPage', () => {
  let component: ExpensesCategoryModalPage;
  let fixture: ComponentFixture<ExpensesCategoryModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpensesCategoryModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ExpensesCategoryModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
