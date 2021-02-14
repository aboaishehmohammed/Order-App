import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {EnvService} from "../services/env.service";
import {LoadingController, NavController, ToastController} from "@ionic/angular";

@Component({
  selector: 'app-morts',
  templateUrl: './morts.page.html',
  styleUrls: ['./morts.page.scss'],
})
export class MortsPage implements OnInit {
  morts: any = []

  constructor(private loadingController: LoadingController,private activatedRoute: ActivatedRoute, private http: HttpClient,
              private env: EnvService, public navCtrl: NavController,public toastController: ToastController) { }

  ngOnInit() {
    this.getData()
  }
  async getData() {
    const load = await this.loadingController.create();
    load.present();
    this.http.get(this.env.apiUrl + 'bills/morts').subscribe((res) => {
      load.dismiss();
      this.morts = res;
    })
  }
  async destroy(item){
    const load = await this.loadingController.create();
    load.present();
    this.http.delete(this.env.apiUrl + 'bills/morts/' + item.id).subscribe((res: any) => {
      load.dismiss();
      this.deleteToast();
      this.morts.splice(this.morts.indexOf(item), 1)
    })
  }

  async deleteToast() {
    const toast = await this.toastController.create({
      message: 'تم الاستلام',
      position: 'top',
      duration: 2000
    });
    toast.present();
  }


}
