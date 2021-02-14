import {Component, Input, OnInit} from '@angular/core';
import {LoadingController, ModalController, ToastController} from "@ionic/angular";
import {HttpClient} from "@angular/common/http";
import {EnvService} from "../services/env.service";

@Component({
    selector: 'app-staff-modal',
    templateUrl: './staff-modal.page.html',
    styleUrls: ['./staff-modal.page.scss'],
})
export class StaffModalPage implements OnInit {

    @Input() name: string;
    @Input() id: number;
    @Input() salary: number;

    constructor(private loadingController: LoadingController,public toastController: ToastController,public modalController: ModalController, private http: HttpClient,
                private env: EnvService) {
    }

    ngOnInit() {
    }

  async  store() {
        let str = "";
        if (this.id) {
            str = "/" + this.id;
        }
      const load = await this.loadingController.create();
      load.present();
        this.http.post(this.env.apiUrl + 'staffs', {
            name: this.name,
            salary: this.salary,
        }).toPromise().then((res: any) => {
            load.dismiss()
this.addToast();
this.modalController.dismiss({
                'dismissed': true,
                res,
            });
        }).catch(() => {
            this.failToast();
        })
    }

   async edit() {
        const load = await this.loadingController.create();
        load.present();
        this.http.post(this.env.apiUrl + 'staffs/' + this.id, {
            name: this.name,
            salary: this.salary
        }).toPromise().then((res: any) => {
            load.dismiss()
this.editToast();
this.modalController.dismiss({
                'dismissed': true,
                res, /// send to الالبيج هههه مش عارف غلط املائي  page
            });
        }).catch(() => {
            this.failToast();
        })
    }

    dismiss() {
        // using the injected ModalController this page
        // can "dismiss" itself and optionally pass back data
        this.modalController.dismiss({
            'dismissed': true
        });
    }

    async addToast() {
        const toast = await this.toastController.create({
            message: 'تم الاضافة بنجاح',
            position: 'top',
            duration: 2000
        });
        toast.present();
    }

    async editToast() {
        const toast = await this.toastController.create({
            message: 'تم التعديل بنجاح',
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
