import {Component, OnInit} from '@angular/core';
import {IonItemSliding, LoadingController, ModalController, ToastController} from "@ionic/angular";
import {HttpClient} from "@angular/common/http";
import {EnvService} from "../services/env.service";
import {ActivatedRoute} from "@angular/router";
import {StaffModalPage} from "../staff-modal/staff-modal.page";

@Component({
    selector: 'app-staffs',
    templateUrl: './staffs.page.html',
    styleUrls: ['./staffs.page.scss'],
})
export class StaffsPage implements OnInit {
    staffs: any = [];
    selectedItem: IonItemSliding;

    constructor(private loadingController: LoadingController,public toastController: ToastController,private activatedRoute: ActivatedRoute, private http: HttpClient, private env: EnvService, private modalController: ModalController) {
    }

    ngOnInit() {
        this.getData();
    }

   async getData() {
       const load = await this.loadingController.create();
       load.present();
        this.http.get(this.env.apiUrl + 'staffs').subscribe((res) => {
            load.dismiss();
            this.staffs = res;
        })
    }

    async destroy(staff) {
        const load = await this.loadingController.create();
        load.present();
        this.http.delete(this.env.apiUrl + 'staffs/' + staff.id).subscribe((res: any) => {
            load.dismiss
this.deleteToast();
this.staffs.splice(this.staffs.indexOf(staff), 1)
        })
    }
    async presentModal() {
        const modal = await this.modalController.create({
            component: StaffModalPage,
            cssClass: 'my-custom-class',
        });
        modal.onDidDismiss().then((r) => {
            console.log(r.data)
            if (r && r.data &&r.data.res) {
                this.staffs.push({
                    id:r.data.res.id,
                    name:r.data.res.name,
                    salary:r.data.res.salary
                })
            }
        })

        return await modal.present();
    }

    async editModal(item,i) {
        const modal = await this.modalController.create({
            component: StaffModalPage,
            cssClass: 'my-custom-class',
            componentProps: {
                'name': item.name,
                //salary
                'salary': item.salary,
                'id': item.id
            }
        });
        modal.onDidDismiss().then((r) => {
            console.log(r.data)
            if (r && r.data && r.data.res) {
                item.name=r.data.res.name;
                item.salary=r.data.res.salary;
               i.close();
            }
        })
        return await modal.present();
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
