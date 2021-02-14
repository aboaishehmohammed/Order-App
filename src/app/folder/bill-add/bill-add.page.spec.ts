import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BillAddPage } from './bill-add.page';

describe('BillAddPage', () => {
  let component: BillAddPage;
  let fixture: ComponentFixture<BillAddPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillAddPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BillAddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
