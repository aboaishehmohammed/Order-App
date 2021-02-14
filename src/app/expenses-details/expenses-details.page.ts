import {Component, OnInit} from '@angular/core';
import {LoadingController, ToastController} from "@ionic/angular";
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {EnvService} from "../services/env.service";

@Component({
    selector: 'app-expenses-details',
    templateUrl: './expenses-details.page.html',
    styleUrls: ['./expenses-details.page.scss'],
})
export class ExpensesDetailsPage implements OnInit {
    expenses: any = [];
    category: any = [];
    filters: any = [];
    filter_dates = {start_date: null, end_date: null}
expense={
        name:'',
    price:null,
    expenses_category_id:null
}
    checked: false;
    checked_expense: false;

    id: any = null;
    private currentPage = 1;

    constructor(public toastController: ToastController,private loadingController: LoadingController, private route: ActivatedRoute, private http: HttpClient, private env: EnvService) {
    }
    cons(){
        console.log(this.expense)
    }

    ngOnInit() {
        this.id = this.route.snapshot.paramMap.get('expenses_category_id');
        this.loadData();
        this.getCategory()
    }

    async filterExpenses() {
        this.currentPage = 1;
        this.expenses = []
        this.loadData();
    }

    async getCategory() {
        const load = await this.loadingController.create();
        load.present();
        this.http.get(this.env.apiUrl + 'expenses-categories/' + this.id).subscribe((res) => {
            load.dismiss();
            this.category = res;
            this.expense={
                name:this.category.name,
                price:null,
                expenses_category_id:this.category.id
            }
        })
    }

    async loadData(event?) {
        console.warn("ammar", event)
        const load = await this.loadingController.create({});
        if (this.currentPage == 1) {
            load.present();
        }
        this.http.post<any>(this.env.apiUrl + 'expenses-categories/' + this.id + '/paginate?page=' + this.currentPage, this.filter_dates).subscribe((res) => {
            this.expenses = [...this.expenses, ...res.data];
            if (this.currentPage == 1) {
                load.dismiss();
            }
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

    async store() {
        const load = await this.loadingController.create();
        load.present();
        this.http.post(this.env.apiUrl + 'expenses', {
            name: this.expense.name,
            price: this.expense.price,
            expenses_category_id:this.expense.expenses_category_id
        }).toPromise().then((res: any) => {
            load.dismiss();
            this.addExpenses(res)
            this.addToast();
        }).catch(() => {
            this.failToast();
        })
    }
    addExpenses(item){
        this.expenses.push({
            id: item.id,
            name: item.name,
            price: item.price
        });
        console.log(this.expenses)
    }
    async addToast() {
        const toast = await this.toastController.create({
            message: 'تم الاضافة بنجاح',
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
