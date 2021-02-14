import {Component, OnInit} from '@angular/core';
import {IonItemSliding, LoadingController, ModalController, ToastController} from "@ionic/angular";
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {EnvService} from "../services/env.service";
import {ExpensesCategoryModalPage} from "../expenses-category-modal/expenses-category-modal.page";

@Component({
    selector: 'app-expenses-category',
    templateUrl: './expenses-category.page.html',
    styleUrls: ['./expenses-category.page.scss'],
})
export class ExpensesCategoryPage implements OnInit {
    categories: any = [];
    selectedItem: IonItemSliding;

    constructor(private loadingController: LoadingController, public toastController: ToastController
        , private activatedRoute: ActivatedRoute, private http: HttpClient,
                private env: EnvService, private modalController: ModalController) {
    }

    ngOnInit() {
        this.getData();
    }

    async getData() {
        const load = await this.loadingController.create();
        load.present();
        this.http.get(this.env.apiUrl + 'expenses-categories').subscribe((res) => {
            load.dismiss();
            this.categories = res;
        })
    }

    async destroy(item) {
        const load = await this.loadingController.create();
        load.present();
        this.http.delete(this.env.apiUrl + 'expenses-categories/' + item.id).subscribe((res: any) => {
            load.dismiss();
            this.deleteToast();
            this.categories.splice(this.categories.indexOf(item), 1)
        })
    }

    async presentModal() {
        const modal = await this.modalController.create({
            component: ExpensesCategoryModalPage,
            cssClass: 'my-custom-class',
        });
        modal.onDidDismiss().then((r) => {
            console.log(r.data)
            if (r && r.data && r.data.res) {
                this.categories.push({
                    id: r.data.res.id,
                    name: r.data.res.name
                })
                console.log("Ammar", r.data.res)
            }
        })
        return await modal.present();
    }

    async editModal(item, i) {
        console.warn(item)
        const modal = await this.modalController.create({
            component: ExpensesCategoryModalPage,
            cssClass: 'my-custom-class',
            componentProps: {
                'name': item.name,
                'id': item.id,
            }
        });
        modal.onDidDismiss().then((r) => {
            console.log(r.data)
            if (r && r.data && r.data.res) {
                item.name = r.data.res.name;


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
