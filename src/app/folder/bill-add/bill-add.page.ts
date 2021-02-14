import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {LoadingController, ModalController, ToastController} from "@ionic/angular";
import {HttpClient} from "@angular/common/http";
import {EnvService} from "../../services/env.service";
import {FormGroup, FormBuilder, Validators, NgForm} from '@angular/forms';

@Component({
    selector: 'app-bill-add',
    templateUrl: './bill-add.page.html',
    styleUrls: ['./bill-add.page.scss'],
})
export class BillAddPage implements OnInit {
    constructor(private loadingController: LoadingController,public toastController: ToastController,public modalController: ModalController, private http: HttpClient, private env: EnvService) {
    }
checked_extra=false;
    sale = 0;
    extra_name:'';
    extra_price=0;
    checked_morts=false
    morts_label='';
    morts_qty=0;
    morts_price=0;
    @Input() total: [];

    @Input() bill_products: [];
    @Input() id: number;
    delivery: any = {
        'name': '',
        'address': '',
        'delivery_fees': '',
        'delivery_time': '',
        'delivery_date': '',
        'mobile': ''
    }

    ngOnInit() {
        console.log(this.bill_products)
    }


   async store() {
       const load = await this.loadingController.create();
       load.present();
        if (this.id) {
            let toParse = (new Date(this.delivery.delivery_time));
            if(this.morts_label){
            this.http.post(this.env.apiUrl + 'bills', {
                delivery: this.delivery,
                sale: this.sale,
                products: this.bill_products,
                extra_name:this.extra_name,
                extra_price:this.extra_price,
                label:this.morts_label,
                price:this.morts_price,
                qty:this.morts_qty
            }).toPromise().then((res: any) => {
                load.dismiss();
                this.doneToast();
                this.modalController.dismiss({
                    'dismissed': true,
                    res,
                });
            })}
            else{
                this.http.post(this.env.apiUrl + 'bills', {
                    delivery: this.delivery,
                    sale: this.sale,
                    products: this.bill_products,
                    extra_name:this.extra_name,
                    extra_price:this.extra_price,
                }).toPromise().then((res: any) => {
                    load.dismiss();
                    this.doneToast();
                    this.modalController.dismiss({
                        'dismissed': true,
                        res,
                    });
                })

            }
        } else {
            this.http.post(this.env.apiUrl + 'bills', {
                sale: this.sale,
                products: this.bill_products,
                extra_name:this.extra_name,
                extra_price:this.extra_price
            }).toPromise().then((res: any) => {
                load.dismiss();
                this.doneToast();
                this.modalController.dismiss({
                    'dismissed': true,
                    res,
                });
            })
        }
    }
    async doneToast() {
        const toast = await this.toastController.create({
            message: 'تم اضافة الفاتورة ',
            position: 'top',
            duration: 2000
        });
        toast.present();
    }
    dismiss() {
        // using the injected ModalController this page
        // can "dismiss" itself and optionally pass back data
        this.modalController.dismiss({
            'dismissed': true
        });
    }

}
