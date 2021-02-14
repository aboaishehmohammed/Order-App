import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {EnvService} from "../services/env.service";
import {LoadingController, ToastController} from "@ionic/angular";

@Component({
    selector: 'app-delivery',
    templateUrl: './delivery.page.html',
    styleUrls: ['./delivery.page.scss'],
})
export class DeliveryPage implements OnInit {
    deliveries: any = [];

    constructor(private loadingController: LoadingController,public toastController: ToastController,private route: ActivatedRoute, private http: HttpClient, private env: EnvService) {

    }

    ngOnInit() {
        this.getData()
    }

   async getData() {
       const load = await this.loadingController.create();
       load.present();
        this.http.get(this.env.apiUrl + 'bills/delivery').subscribe((res) => {
            load.dismiss();
            this.deliveries = res;
        })
    }

   async orderDone(item) {
       const load = await this.loadingController.create();
       load.present();
        this.http.post(this.env.apiUrl + 'bills/order/' + item.id, 1).toPromise().then((res: any) => {
            load.dismiss();
            this.doneToast();
this.deliveries.splice(this.deliveries.indexOf(item), 1)

        })
    }
    async doneToast() {
        const toast = await this.toastController.create({
            message: 'تم توصيل الطلب',
            position: 'top',
            duration: 2000
        });
        toast.present();
    }



}
