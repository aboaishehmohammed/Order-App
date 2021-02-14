import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {EnvService} from "../services/env.service";
import {ActivatedRoute} from '@angular/router';
import {AlertController, IonItemSliding, LoadingController, ModalController, ToastController} from '@ionic/angular';
import {AddModalPage} from '../add-modal/add-modal.page';


@Component({
    selector: 'app-products',
    templateUrl: './products.page.html',
    styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {
    public folder: string;
    products: any = [];
    selectedItem: IonItemSliding;

    constructor(private loadingController: LoadingController,public toastController: ToastController,private activatedRoute: ActivatedRoute, private http: HttpClient, private env: EnvService, private modalController: ModalController, private alertController: AlertController) {
    }

    ngOnInit() {
        this.getData();
        this.folder = this.activatedRoute.snapshot.paramMap.get('id');
    }

    async getData() {
        const load = await this.loadingController.create();
        load.present();
        this.http.get(this.env.apiUrl + 'products').subscribe((res) => {
            load.dismiss();
            this.products = res;
        })
    }

  async  destroy(item) {
      const load = await this.loadingController.create();
      load.present();
        this.http.delete(this.env.apiUrl + 'products/' + item.id).subscribe((res: any) => {
            load.dismiss();
            this.deleteToast();
this.products.splice(this.products.indexOf(item), 1)
        })
    }

    cons() {
        console.log(this.products);

    }

    async presentModal() {
        const modal = await this.modalController.create({
            component: AddModalPage,
            cssClass: 'my-custom-class',
        });
        modal.onDidDismiss().then((r) => {
            console.log(r.data)
            if (r && r.data &&r.data.res) {
                this.products.push(
                    r.data.res
                )
            }
        })
        return await modal.present();
    }

    async editModal(item, i) {
        console.log()
        const modal = await this.modalController.create({
            component: AddModalPage,
            cssClass: 'my-custom-class',
            componentProps: {
                'name': item.p_name,
                'category_id': item.category_id,
                'price': item.price,
                'id': item.id
            }
        });
        modal.onDidDismiss().then((r) => {
            console.log(r.data)
            if (r && r.data && r.data.res) {
                item.p_name = r.data.res.p_name;
                item.price = r.data.res.price;
                item.category_id = r.data.res.category_id;
                item.category.name = r.data.res.category.name
                console.log("Ammar", r.data.res)
            }
            i.close()

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
