import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {EnvService} from "../services/env.service";
import {IonItemSliding, LoadingController, ModalController, ToastController} from "@ionic/angular";
import {StaffModalPage} from "../staff-modal/staff-modal.page";
import {ExpensesModalPage} from "../expenses-modal/expenses-modal.page";

@Component({
    selector: 'app-expenses',
    templateUrl: './expenses.page.html',
    styleUrls: ['./expenses.page.scss'],
})
export class ExpensesPage implements OnInit {
    expenses: any = [];
    categories:any=[];
    private currentPage: number = 1;
    selectedItem: IonItemSliding;

    constructor(private loadingController: LoadingController, public toastController: ToastController, private activatedRoute: ActivatedRoute, private http: HttpClient,
                private env: EnvService, private modalController: ModalController) {
    }

    ngOnInit() {
        this.loadData()
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
        this.http.delete(this.env.apiUrl + 'expenses/' + item.id).subscribe((res: any) => {
            load.dismiss();
            this.deleteToast();
            this.expenses.splice(this.expenses.indexOf(item), 1)
        })
    }

    async presentModal() {
        const modal = await this.modalController.create({
            component: ExpensesModalPage,
            cssClass: 'my-custom-class',
            componentProps: {
                'categories': this.categories,
            }
        });
        modal.onDidDismiss().then((r) => {
            console.log(r.data)
            if (r && r.data && r.data.res) {
                this.expenses.push({
                    id: r.data.res.id,
                    name: r.data.res.name,
                    price: r.data.res.price
                })
                console.log("Ammar", r.data.res)
            }
        })
        return await modal.present();
    }

    async editModal(item, i) {
        const modal = await this.modalController.create({
            component: ExpensesModalPage,
            cssClass: 'my-custom-class',
            componentProps: {
                'name': item.name,
                'price': item.price,
                'categories':this.categories,
                'expenses_category_id':item.expenses_category_id,
                'id': item.id
            }
        });
        modal.onDidDismiss().then((r) => {
            console.log(r.data)
            if (r && r.data && r.data.res) {
                item.name = r.data.res.name;
                item.price = r.data.res.price;
                i.close()

            }
        })
        return await modal.present();
    }

    loadData(event?) {
        console.warn("ammar", event)
        this.http.get<any>(this.env.apiUrl + 'expenses/paginate?page=' + this.currentPage).subscribe((res) => {
            this.expenses = [...this.expenses, ...res.data];
            this.currentPage += 1;
            if (event) {
                event.target.complete();
                if (!res.next_page_url) {
                    console.log("Disabled")
                    event.target.disabled = true;
                }
            }
        });
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
