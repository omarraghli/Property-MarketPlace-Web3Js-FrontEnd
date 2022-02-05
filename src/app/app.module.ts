import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContractService } from './Services/contract.service';
import { AddPropertyComponent } from './add-property/add-property.component';
import { FormsModule } from '@angular/forms';
import { DisplayMarketItemsComponent } from './display-market-items/display-market-items.component';
import { HttpClientModule } from '@angular/common/http';
import { AddItemToMarketPlaceComponent } from './add-item-to-market-place/add-item-to-market-place.component';
import { MyPropretiesComponent } from './my-propreties/my-propreties.component';
import { CurrentSellsComponent } from './current-sells/current-sells.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { SignInFormComponent } from './sign-in-form/sign-in-form.component';
import { HomePageComponent } from './home-page/home-page.component';
import { InterfaceUserComponent } from './interface-user/interface-user.component';
import { AllTransactionsComponent } from './all-transactions/all-transactions.component';
import { EditeProfileComponent } from './edite-profile/edite-profile.component';
import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    AddPropertyComponent,
    DisplayMarketItemsComponent,
    AddItemToMarketPlaceComponent,
    MyPropretiesComponent,
    CurrentSellsComponent,
    FooterComponent,
    NavbarComponent,
    SignInFormComponent,
    HomePageComponent,
    InterfaceUserComponent,
    AllTransactionsComponent,
    EditeProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatOptionModule,
    MatCardModule,
    MatTabsModule,
    MatInputModule,
    MatCheckboxModule,
    FormsModule,
    HttpClientModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatDialogModule
  ],
  providers: [ContractService],
  bootstrap: [AppComponent],
})
export class AppModule {}
