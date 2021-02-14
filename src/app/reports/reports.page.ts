import { Component, OnInit } from '@angular/core';
import {LoadingController} from "@ionic/angular";
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {EnvService} from "../services/env.service";

@Component({
  selector: 'app-reports',
  templateUrl: './reports.page.html',
  styleUrls: ['./reports.page.scss'],
})
export class ReportsPage implements OnInit {
  selectedReportes: any = 'daily';
  clicked=false;
  expenses:any;
  bills:any;
  month:1;
  year:2020;
  constructor(private loadingController: LoadingController, private activatedRoute: ActivatedRoute,
              private http: HttpClient, private env: EnvService) { }

  ngOnInit() {
    this.getData();
    this.getExpenses()
  }
  async getData() {
    const load = await this.loadingController.create();
    load.present();
    this.http.post(this.env.apiUrl + 'bills/reports',{
      type:this.selectedReportes
    }).subscribe((res) => {
      load.dismiss();
      this.bills = res;
    })
  }
  async getExpenses() {
    const load = await this.loadingController.create();
    load.present();
    this.http.post(this.env.apiUrl + 'expenses/reports',{
      type:this.selectedReportes
    }).subscribe((res) => {
      load.dismiss();
      this.expenses = res;
    })
  }

  async getMonth() {
    const load = await this.loadingController.create();
    load.present();
    this.http.post(this.env.apiUrl + 'expenses/reports',{
      type:this.selectedReportes,
      month:this.month,
      year:this.year
    }).subscribe((res) => {
      load.dismiss();
      this.expenses = res;
    })
    this.http.post(this.env.apiUrl + 'bills/reports',{
      type:this.selectedReportes,
      month:this.month,
      year:this.year
    }).subscribe((res) => {
      load.dismiss();
      this.bills = res;
    })
    this.clicked=true;
  }
  async getYear() {
    const load = await this.loadingController.create();
    load.present();
    this.http.post(this.env.apiUrl + 'expenses/reports',{
      type:this.selectedReportes,
      year:this.year
    }).subscribe((res) => {
      load.dismiss();
      this.expenses = res;
    })
    this.http.post(this.env.apiUrl + 'bills/reports',{
      type:this.selectedReportes,
      year:this.year
    }).subscribe((res) => {
      load.dismiss();
      this.bills = res;
    })
    this.clicked=true;
  }

  cons() {
    console.log(this.selectedReportes);
  }
}
