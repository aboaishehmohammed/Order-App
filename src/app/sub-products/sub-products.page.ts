import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {EnvService} from "../services/env.service";
import {ActivatedRoute} from "@angular/router";
import {IonItemSliding, LoadingController, ModalController, ToastController} from '@ionic/angular';
import { SubProductModalPage } from '../sub-product-modal/sub-product-modal.page';
import {AddModalPage} from "../add-modal/add-modal.page";

@Component({
  selector: 'app-sub-products',
  templateUrl: './sub-products.page.html',
  styleUrls: ['./sub-products.page.scss'],
})
export class SubProductsPage implements OnInit {
  public folder: string;
  name:any;
  subProducts:any=[];
  products:any=[]
  selectedItem: IonItemSliding;
  constructor(private loadingController: LoadingController,public toastController: ToastController,private http: HttpClient, private env: EnvService,private activatedRoute: ActivatedRoute,private modalController: ModalController) {

  }
  async getData() {
    const load = await this.loadingController.create();
    load.present();
    this.http.get(this.env.apiUrl + 'sub-products').subscribe((res) => {
      load.dismiss();
      this.subProducts = res;
    })
  }
  async getProduct() {
    const load = await this.loadingController.create();
    load.present();
    this.http.get(this.env.apiUrl + 'products').subscribe((res) => {
      load.dismiss();
      this.products = res;
    })
  }
  ngOnInit() {
    this.getData();
this.getProduct()
  }
cons(){
    console.log(this.subProducts)
}

async destroy(item){
  const load = await this.loadingController.create();
  load.present();
  this.http.delete(this.env.apiUrl + 'sub-products/'+item.id).subscribe((res:any)=>{
    load.dismiss();
this.deleteToast();
this.subProducts.splice(this.subProducts.indexOf(item), 1)

  })
}
  async presentModal() {
    const modal = await this.modalController.create({
      component: SubProductModalPage,
      cssClass: 'my-custom-class',
      componentProps: {
        'products': this.products,
      }
    });
    modal.onDidDismiss().then((r) => {
      console.log(r.data)
      if (r && r.data &&r.data.res) {
        this.subProducts.push({
          p_name:r.data.res.p_name
        })

        /*let staff = this.staffs.find((s) => {
            return s.id == item.id
        });
        console.log("Staff", staff)*/

      }
    })

    return await modal.present();
  }

  async editModal(item,i) {
    const modal = await this.modalController.create({
      component: SubProductModalPage,
      cssClass: 'my-custom-class',
      componentProps: {
        'products': this.products,
        'name': item.p_name,
        'id':item.id
      }
    });
    modal.onDidDismiss().then((r) => {
      console.log(r.data)
      if (r && r.data &&r.data.res) {
        item.p_name=r.data.res.p_name;

       i.close();
      }
    })

    return await modal.present();
  }
  async deleteToast() {
    const toast = await this.toastController.create({
      message: 'تم الحذف',
      position: 'top',
      duration: 2000
    });
    toast.present();
  }
}

