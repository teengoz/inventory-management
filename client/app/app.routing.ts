import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { ManagementComponent } from './components/management/management.component';
import { PasswordComponent } from './components/password/password.component';
import { SettingComponent } from "./components/setting/setting.component";
import { InfoComponent } from "./components/info/info.component";
import { ItemListComponent } from "./components/item-list/item-list.component";
import { ItemComponent } from './components/item/item.component';
import { ItemCategoryListComponent } from "./components/item-category-list/item-category-list.component";
import { StockListComponent } from "./components/stock-list/stock-list.component";
import { UserListComponent } from "./components/user-list/user-list.component";
import { StakeholderTypeListComponent } from "./components/stakeholder-type-list/stakeholder-type-list.component";
import { StakeholderListComponent } from "./components/stakeholder-list/stakeholder-list.component";
import { OrderDetailComponent } from './components/order-detail/order-detail.component';
import { TransactionListComponent } from "./components/transaction/transaction-list.component";
import { TransactionComponent } from "./components/transaction/transaction.component";
import { TestComponent } from './components/test-component/test-component.component';

import { AuthGuard } from './guards/auth.guard';
import { TransactionRequestListComponent } from "./components/transaction-request/transaction-request-list.component";

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'management',
    component: ManagementComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'password',
        component: PasswordComponent
      },
      {
        path: 'test',
        component: TestComponent
      },
      {
        path: 'setting',
        component: SettingComponent
      },
      {
        path: 'info',
        component: InfoComponent
      },
      {
        path: 'users',
        component: UserListComponent
      },
      {
        path: 'stocks',
        component: StockListComponent
      },
      {
        path: 'item-categories',
        component: ItemCategoryListComponent
      },
      {
        path: 'stakeholders',
        component: StakeholderListComponent
      },
      {
        path: 'stakeholder-types',
        component: StakeholderTypeListComponent
      },
      {
        path: 'items',
        children: [
          {
            path: '',
            component: ItemListComponent
          },
          {
            path: 'categories',
            component: ItemCategoryListComponent
          },
          {
            path: 'add',
            component: ItemComponent
          },
          {
            path: 'edit/:_code',
            component: ItemComponent
          }
        ]
      },
      {
        path: 'transactions',
        children: [
          {
            path: '',
            component: TransactionListComponent
          },
          {
            path: 'create',
            component: TransactionComponent
          },
          {
            path: 'edit/:_id',
            component: TransactionComponent
          }
        ]
      },
      {
        path: 'transaction-requests',
        children: [
          {
            path: '',
            component: TransactionRequestListComponent
          },
          {
            path: 'record/:_id',
            component: TransactionComponent
          }
        ]
      }
    ]
  }
];

export const routing = RouterModule.forRoot(appRoutes, { useHash: false });