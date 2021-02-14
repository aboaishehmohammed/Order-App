import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'folder/Inbox',
        pathMatch: 'full'
    },
    {
        path: 'folder/:id',
        loadChildren: () => import('./folder/folder.module').then(m => m.FolderPageModule)
    },
    {
        path: 'add-modal',
        loadChildren: () => import('./add-modal/add-modal.module').then(m => m.AddModalPageModule)
    },
    {
        path: 'bills',
        loadChildren: () => import('./bills/bills.module').then(m => m.BillsPageModule)
    },
    {
        path: 'products',
        loadChildren: () => import('./products/products.module').then(m => m.ProductsPageModule)
    },
    {
        path: 'sub-products',
        loadChildren: () => import('./sub-products/sub-products.module').then(m => m.SubProductsPageModule)
    },
    {
        path: 'expenses',
        loadChildren: () => import('./expenses/expenses.module').then(m => m.ExpensesPageModule)
    },
    {
        path: 'sub-product-modal',
        loadChildren: () => import('./sub-product-modal/sub-product-modal.module').then(m => m.SubProductModalPageModule)
    },
    {
        path: 'staff-modal',
        loadChildren: () => import('./staff-modal/staff-modal.module').then(m => m.StaffModalPageModule)
    },
    {
        path: 'staffs',
        loadChildren: () => import('./staffs/staffs.module').then(m => m.StaffsPageModule)
    },
    {
        path: 'expenses-modal',
        loadChildren: () => import('./expenses-modal/expenses-modal.module').then(m => m.ExpensesModalPageModule)
    },
    {
        path: 'bills/:bill_id',
        loadChildren: () => import('./bill-detail/bill-detail.module').then(m => m.BillDetailPageModule)
    },
  {
    path: 'delivery',
    loadChildren: () => import('./delivery/delivery.module').then( m => m.DeliveryPageModule)
  },
  {
    path: 'product/:product_id',
    loadChildren: () => import('./product-details/product-details.module').then( m => m.ProductDetailsPageModule)
  },
  {
    path: 'morts',
    loadChildren: () => import('./morts/morts.module').then( m => m.MortsPageModule)
  },
  {
    path: 'reports',
    loadChildren: () => import('./reports/reports.module').then( m => m.ReportsPageModule)
  },
  {
    path: 'expenses-category',
    loadChildren: () => import('./expenses-category/expenses-category.module').then( m => m.ExpensesCategoryPageModule)
  },
  {
    path: 'expenses-category-modal',
    loadChildren: () => import('./expenses-category-modal/expenses-category-modal.module').then( m => m.ExpensesCategoryModalPageModule)
  },
  {
    path: 'expenses-details/:expenses_category_id',
    loadChildren: () => import('./expenses-details/expenses-details.module').then( m => m.ExpensesDetailsPageModule)
  }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
