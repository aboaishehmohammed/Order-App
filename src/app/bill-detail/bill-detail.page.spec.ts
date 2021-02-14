import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BillDetailPage } from './bill-detail.page';

describe('BillDetailPage', () => {
  let component: BillDetailPage;
  let fixture: ComponentFixture<BillDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BillDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
