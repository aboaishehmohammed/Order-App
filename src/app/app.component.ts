import {Component, OnInit} from '@angular/core';

import {Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {CategoriesService} from "./services/categories.service";

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
    public selectedIndex = 0;
    public appPages = [
        {
            title: 'الطلبات',
            url: '/folder/Inbox',
            icon: 'create'
        },
        {
            title: "الفواتير",
            url: '/bills',
            icon: "receipt"
        },
        {
            title: "الوجبات",
            url: '/products',
            icon: "fast-food"
        },
        {
            title: "انواع الوجبات",
            url: '/sub-products',
            icon: "restaurant"
        },
        {
            title: "الموظفين",
            url: '/staffs',
            icon: "person"
        },
        {
            title: "المصاريف",
            url: '/expenses',
            icon: "cash"
        },
        {
            title: "delivery",
            url: '/delivery',
            icon: "car"
        },
        {
            title: "الرهونات",
            url: '/morts',
            icon: "bookmark"
        },
        {
            title: "التقارير",
            url: '/reports',
            icon: "document-lock"
        },
        {
            title: "نوع المصاريف",
            url: '/expenses-category',
            icon: "document-lock"
        }
    ];
    public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar, private categoriesServices: CategoriesService,/* private screenOrientation: ScreenOrientation*/
    ) {
        this.initializeApp();
       /* this.screenOrientation.lock("landscape");
*/
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
            this.categoriesServices.getCategories();
        });
    }

    ngOnInit() {
        const path = window.location.pathname.split('folder/')[1];
        if (path !== undefined) {
            this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
        }
    }
}
