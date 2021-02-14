import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SubProductsPage } from './sub-products.page';

describe('SubProductsPage', () => {
  let component: SubProductsPage;
  let fixture: ComponentFixture<SubProductsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubProductsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SubProductsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
