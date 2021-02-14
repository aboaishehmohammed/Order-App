import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {EnvService} from "../services/env.service";
import {LoadingController} from "@ionic/angular";

@Component({
    selector: 'app-product-details',
    templateUrl: './product-details.page.html',
    styleUrls: ['./product-details.page.scss'],
})
export class ProductDetailsPage implements OnInit {
    item: any = []
    bills: any = []
    id: any = null;
    currentPage = 0;

    constructor(private loadingController: LoadingController,private route: ActivatedRoute, private http: HttpClient, private env: EnvService) {
    }

    ngOnInit() {
        this.id = this.route.snapshot.paramMap.get('product_id')
        this.getData()
        this.getBills()
    }

    async getData() {
        const load = await this.loadingController.create();
        load.present();
        this.http.get(this.env.apiUrl + 'products/' + this.id).subscribe((res) => {
            load.dismiss();
            this.item = res;

        })

    }

    async getBills() {
        const load = await this.loadingController.create();
        load.present();
        this.http.get<any>(this.env.apiUrl + 'products/'+this.id+'/paginate' ).subscribe((res) => {
            load.dismiss()
            this.bills = res.data;
            this.currentPage = res.current_page;
            this.currentPage++;
        })
    }

    loadData(event) {
        this.http.get<any>(this.env.apiUrl + 'products/' + this.id + '/paginate?page=' + this.currentPage).subscribe((res) => {
            this.bills = [...this.bills, ...res.data];
            this.currentPage = res.data.currentPage++;
            event.target.complete();
            if (!res.data.next_page_url) {
                event.target.disabled = true;
            }
        });
    }

    cons() {
        console.log(this.item)
    }
}
