import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {HttpClient} from "@angular/common/http";
import {EnvService} from "../services/env.service";
import {ActionSheetController, LoadingController, ModalController} from '@ionic/angular';
import {AlertController} from '@ionic/angular';
import {BillAddPage} from "./bill-add/bill-add.page";

@Component({
    selector: 'app-folder',
    templateUrl: './folder.page.html',
    styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
    public folder: string;
    categories: any = [];
    selectedCategory: any = null;
    bill: any = {
        delivery: {},
        sale: {},
        products: []
    }
    deliverychecked:false;
    private quantity: any;

    constructor(private loadingController: LoadingController, private activatedRoute: ActivatedRoute, private router: Router,
                private http: HttpClient, private env: EnvService, private actionSheetController: ActionSheetController,
                private alertController: AlertController, public modalController: ModalController) {
    }

    async getData() {
        const load = await this.loadingController.create();
        load.present();
        this.http.get(this.env.apiUrl + 'categories').subscribe((res) => {
            this.categories = res;
            load.dismiss();
            if (this.categories.length > 0) {
                this.selectedCategory = this.categories[0]
            }
        })
    }

    ngOnInit() {
        this.getData();
        this.folder = this.activatedRoute.snapshot.paramMap.get('id');
    }

    cons() {
        console.log(this.selectedCategory);
    }

    async presentActionSheet(product) {
        let buttons = [];
        for (let i = 0; i < product.sub_product.length; i++) {
            let sub = product.sub_product[i]
            buttons.push({
                text: sub.p_name,
                handler: () => {
                    this.addToBill(product, sub)
                }
            })
        }
        const actionSheet = await this.actionSheetController.create({
            header: 'menu',
            cssClass: 'my-custom-class',
            buttons
        });
        await actionSheet.present();
    }

    addToBill(product, sub) {

        let x = this.bill.products.find((item) => {
            console.log(item.id == product.id, item.sub_id == sub.id, item.sub_id, sub.id)
            return item.id == product.id && item.sub_product_id == sub.id
        })

        if (x) {
            x.quantity++;
            console.log(this.bill.products);
            return
        }
        this.bill.products.push({
            id: product.id,
            sub_product_id: sub.id,
            quantity: 1,
            price: product.price,
            name: product.p_name,
            sub_name: sub.p_name
        })
        console.log(this.bill.products);

    }


    get getTotal() {
        let sum = 0; //this.bill.products[0].quantity * this.bill.products[0].price;
        for (let i = 0; i < this.bill.products.length; i++) {
            sum = sum + (this.bill.products[i].price * this.bill.products[i].quantity)
        }
        return sum;
    }

    decrement(item) {
        item.quantity -= 1
        if (item.quantity == 0)
            this.deleteItem(item);
    }

    deleteItem(item) {
        let index = this.bill.products.indexOf(item);
        this.bill.products.splice(index, 1);
    }

    increment(item) {
        item.quantity += 1

    }

    async presentModal() {
        const modal = await this.modalController.create({
            component: BillAddPage,
            cssClass: 'my-custom-class',
            componentProps: {
                'bill_products': this.bill.products,
                'id': this.deliverychecked,
                'total': this.getTotal,
            }
        });
        modal.onDidDismiss().then((r) => {
            if (r && r.data && r.data.res) {
                if (r.data.res.deliveryData == null) {
                    let sum = (this.getTotal + r.data.res.extra_price) - r.data.res.sale
                    this.presentAlert(sum, r.data.res.id);
                } else {
                    let sum = (this.getTotal + parseFloat(r.data.res.deliveryData.delivery_fees + r.data.res.extra_price)) - r.data.res.sale
                    this.presentAlert(sum, r.data.res.id);

                }
            }
            if (r && r.data && r.data.res) {
                for (let i = 0; i < this.bill.products.length; i++) {
                    this.deleteItem(this.bill.products)
                }
            }
        })
        return await modal.present();
    }

    async presentAlert(total, id) {
        const alert = await this.alertController.create({
            cssClass: 'my-custom-class',
            message: 'قيمة الفاتورة' + total,
            buttons: [{
                text: 'طباعة الفاتورة',
                handler: () => {
                    this.router.navigate(['/bills/' + id]);
                }
            }]

        });

        await alert.present();
    }
}
