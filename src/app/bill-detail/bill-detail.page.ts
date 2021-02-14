import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {EnvService} from "../services/env.service";
import {LoadingController} from "@ionic/angular";

@Component({
    selector: 'app-bill-detail',
    templateUrl: './bill-detail.page.html',
    styleUrls: ['./bill-detail.page.scss'],
})
export class BillDetailPage implements OnInit {
    id: any = null;
    bill: any = [];
    counter = 0;
    print = false

    constructor(private loadingController: LoadingController, private route: ActivatedRoute, private http: HttpClient, private env: EnvService) {

    }

    ngOnInit() {
        this.id = this.route.snapshot.paramMap.get('bill_id')
        this.getData()
    }


    async getData() {
        const load = await this.loadingController.create();
        load.present();
        this.http.get(this.env.apiUrl + 'bills/' + this.id).subscribe((res) => {
            load.dismiss();
            this.bill = res;
        })
    }

    cons() {
        console.log(this.bill)
    }

    getBillTotal() {

        let item = this.bill;
        if (!item)
            return;
        let sum = 0;
        if (item.bill_products)
            for (let i = 0; i < item.bill_products.length; i++) {
                sum += (item.bill_products[i].price * item.bill_products[i].quantity)
            }
        if (item.deliveryData == null) {

        } else {
            sum = (sum + parseFloat(item.deliveryData.delivery_fees));
        }

        return sum + item.extra_price;
    }

    printW() {
        window.print();
    }
}
