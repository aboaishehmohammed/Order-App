import {Component, OnInit, Input} from '@angular/core';
import {LoadingController, ModalController} from "@ionic/angular";
import {HttpClient} from "@angular/common/http";
import {EnvService} from "../services/env.service";
import {CategoriesService} from "../services/categories.service";
import { ToastController } from '@ionic/angular';

@Component({
    selector: 'app-add-modal',
    templateUrl: './add-modal.page.html',
    styleUrls: ['./add-modal.page.scss'],
})
export class AddModalPage implements OnInit {
    @Input() name: string;
    @Input() id: number;
    @Input() price: 0;
    @Input() category_id: number;
    categories = [];

    constructor(private loadingController: LoadingController,public modalController: ModalController, private http: HttpClient, private env: EnvService,
                private categoriesService: CategoriesService,public toastController: ToastController) {
        this.categories = this.categoriesService.categories;
    }
    ngOnInit() {
    }

    dismiss() {
        // using the injected ModalController this page
        // can "dismiss" itself and optionally pass back data
        this.modalController.dismiss({
            'dismissed': true
        });
    }

    async addProduct() {
        let str = "";
        if (this.id) {
            str = "/" + this.id;
        }
        const load = await this.loadingController.create();
        load.present();
        this.http.post(this.env.apiUrl + 'products', {
            name: this.name,
            category_id: this.category_id,
            price: this.price
        }).toPromise().then((res: any) => {
            load.dismiss();
            console.log(res)
            this.addToast()
            this.modalController.dismiss({
                'dismissed': true,
                res,
            });
        }).catch(() => {
            this.failToast();
        })
    }

    async editProduct() {
        const load = await this.loadingController.create();
        load.present();
        this.http.post(this.env.apiUrl + 'products/' + this.id, {
            name: this.name,
            category_id: this.category_id,
            price: this.price
        }).toPromise().then((res: any) => {
            load.dismiss();
            this.editToast()
            this.modalController.dismiss({
                'dismissed': true,
                res,
            });
        }).catch(() => {
this.failToast();
        })
    }

    cons() {
        console.log(this.category_id)
    }
    async addToast() {
        const toast = await this.toastController.create({
            message: 'تم الاضافة بنجاح',
            position: 'top',
            duration: 2000
        });
        toast.present();
    }

    async editToast() {
        const toast = await this.toastController.create({
            message: 'تم التعديل بنجاح',
            position: 'top',
            duration: 2000
        });
        toast.present();
    }
    async failToast() {
        const toast = await this.toastController.create({
            message: 'لم تتم العملية',
            position: 'top',
            duration: 2000
        });
        toast.present();
    }
}
