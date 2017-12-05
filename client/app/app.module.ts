import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ModalModule } from 'angular2-modal';
import { RouterModule } from "@angular/router";
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';
import { SelectModule } from 'ng-select';
import { CalendarModule } from 'primeng/primeng';
// import { ButtonsModule } from '@progress/kendo-angular-buttons';

import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { AuthGuard } from "./guards/auth.guard";
import { AuthenticationService } from './services/authentication.service';
import { GenerateHeader } from './services/generate-header';
import { InputControlService } from './services/input-control.service';

import { DynamicFormComponent } from './components/dynamic-form/dynamic-form.component';
import { DynamicFormInputComponent } from './components/dynamic-form/dynamic-form-input.component';
import { IMDropdownComponent } from './components/input/im-dropdown.component';
import { IMTextboxComponent } from './components/input/im-textbox.component';
import { IMAutoTextboxComponent } from './components/input/im-auto-textbox.component';
import { AdditionCalculateWindow } from './components/modal/custom-modal-sample.component';
import { IMModal } from './components/modal/im-modal.component';
import { IMTableComponent } from './components/im-table/im-table.component';
import { IMPagination } from './components/im-table/im-pagination.component';
import { ManagementPageComponent } from './components/management-page/management-page.component';
import { LoginComponent } from './components/login/login.component';
import { ManagementComponent } from './components/management/management.component';
import { PasswordComponent } from './components/password/password.component';
import { SettingComponent } from "./components/setting/setting.component";
import { InfoComponent } from "./components/info/info.component";
import { ItemListComponent } from "./components/item-list/item-list.component";
import { ItemSupportingInformationComponent } from "./components/item-supporting-information/item-supporting-information.component";
import { ItemComponent } from './components/item/item.component';
import { ItemUnitConversionComponent } from "./components/item-unit-conversion/item-unit-conversion.component";
import { ItemSpecificationComponent } from "./components/item-specification/item-specification.component";
import { ItemCategoryListComponent } from "./components/item-category-list/item-category-list.component";
import { StakeholderListComponent } from "./components/stakeholder-list/stakeholder-list.component";
import { StockListComponent } from "./components/stock-list/stock-list.component";
import { UserListComponent } from "./components/user-list/user-list.component";
import { StakeholderTypeListComponent } from "./components/stakeholder-type-list/stakeholder-type-list.component";
import { OrderDetailComponent } from './components/order-detail/order-detail.component';
import { IMCustomDropdownComponent } from './components/input/im-custom-dropdown.component';
import { OrderDetailTableComponent } from './components/order-detail/order-detail-table.component';
import { IMFormDropdownComponent } from "./components/input/im-form-dropdown.component";
import { TransactionListComponent } from './components/transaction/transaction-list.component';
import { TransactionComponent } from "./components/transaction/transaction.component";
import { TestComponent } from './components/test-component/test-component.component';
import { TransactionDetailComponent } from "./components/transaction/transaction-detail.component";
import { TransactionDetailTableComponent } from "./components/transaction/transaction-detail-table.component";
import { TransactionRequestListComponent } from "./components/transaction-request/transaction-request-list.component";

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        FormsModule,
        ReactiveFormsModule,
        SelectModule,
        RouterModule,
        routing,
        ModalModule.forRoot(),
        BootstrapModalModule,
        ReactiveFormsModule,
        CalendarModule,
    ],
    declarations: [
        AppComponent,
        TestComponent,
        DynamicFormComponent,
        DynamicFormInputComponent,
        IMDropdownComponent,
        IMTextboxComponent,
        IMAutoTextboxComponent,
        AdditionCalculateWindow,
        IMModal,
        IMPagination,
        IMTableComponent,
        ManagementPageComponent,
        LoginComponent,
        ManagementComponent,
        PasswordComponent,
        SettingComponent,
        InfoComponent,
        ItemListComponent,
        ItemSupportingInformationComponent,
        ItemComponent,
        ItemUnitConversionComponent,
        ItemCategoryListComponent,
        ItemSpecificationComponent,
        StakeholderListComponent,
        StockListComponent,
        UserListComponent,
        StakeholderTypeListComponent,
        OrderDetailComponent,
        IMCustomDropdownComponent,
        OrderDetailTableComponent,
        IMFormDropdownComponent,
        TransactionListComponent,
        TransactionComponent,
        TransactionDetailComponent,
        TransactionDetailTableComponent,
        TransactionRequestListComponent
    ],
    providers: [
        AuthenticationService,
        AuthGuard,
        GenerateHeader,
        InputControlService
    ],
    bootstrap: [AppComponent],
    entryComponents: [AdditionCalculateWindow, IMModal],
})

export class AppModule { }