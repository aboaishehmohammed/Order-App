import {Component, OnInit, ViewChild} from '@angular/core';
import {IonInfiniteScroll, LoadingController, ToastController} from '@ionic/angular';

import {NavController} from '@ionic/angular';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {EnvService} from "../services/env.service";
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-bills',
    templateUrl: './bills.page.html',
    styleUrls: ['./bills.page.scss'],
})
export class BillsPage implements OnInit {
    @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

    bills: any = []
    bill_products: any = []
    currentPage = 0;

    constructor(private loadingController: LoadingController,private activatedRoute: ActivatedRoute, private http: HttpClient, private env: EnvService, public navCtrl: NavController
    ,public toastController: ToastController) {
    }

    ngOnInit() {
        this.getData()
    }

    async getData() {
        const load = await this.loadingController.create();
        load.present();
        this.http.get<any>(this.env.apiUrl + 'bills/paginate').subscribe((res) => {
            this.bills = res.data;
            load.dismiss();
            this.currentPage = res.current_page;
            this.currentPage++;
        })
    }

    loadData(event) {
        this.http.get<any>(this.env.apiUrl + 'bills/paginate?page=' + this.currentPage).subscribe((res) => {
            this.bills = [...this.bills, ...res.data];
            this.currentPage = res.data.currentPage++;

            event.target.complete();
            if (!res.data.next_page_url) {
                event.target.disabled = true;
            }
        });
    }

    toggleInfiniteScroll() {
        this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
    }


    getBillTotal(item) {
        let sum = 0;
        for (let i = 0; i < item.bill_products.length; i++) {
            sum += (item.bill_products[i].price * item.bill_products[i].quantity)
        }
        if (item.deliveryData == null) {
            sum -= item.sale
        } else {
            sum = (sum + parseFloat(item.deliveryData.delivery_fees)) - item.sale;
        }

        return sum+item.extra_price;
    }

    async destroy(item) {
        const load = await this.loadingController.create();
        load.present();
        this.http.delete(this.env.apiUrl + 'bills/' + item.id).subscribe((res: any) => {
            load.dismiss();
this.deleteToast();
this.bills.splice(this.bills.indexOf(item), 1)
        })
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

