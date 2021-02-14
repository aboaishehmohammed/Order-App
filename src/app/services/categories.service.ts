import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {EnvService} from "./env.service";

@Injectable({
    providedIn: 'root'
})
export class CategoriesService {

    categories: any = [];

    constructor(private http: HttpClient, private env: EnvService) {
    }

    getCategories() {
        console.log("GETCategories")
        this.http.get(this.env.apiUrl + 'categories').subscribe((res) => {
            this.categories = res;
        })
    }
}
