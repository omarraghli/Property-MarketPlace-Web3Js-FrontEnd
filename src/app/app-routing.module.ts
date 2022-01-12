import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddItemToMarketPlaceComponent } from './add-item-to-market-place/add-item-to-market-place.component';
import { AddPropertyComponent } from './add-property/add-property.component';
import { AllTransactionsComponent } from './all-transactions/all-transactions.component';
import { CurrentSellsComponent } from './current-sells/current-sells.component';
import { DisplayMarketItemsComponent } from './display-market-items/display-market-items.component';
import { HomePageComponent } from './home-page/home-page.component';
import { InterfaceUserComponent } from './interface-user/interface-user.component';
import { MyPropretiesComponent } from './my-propreties/my-propreties.component';
import { IsSignedInGuardService } from './Services/is-signed-in-guard.service';
import { SignInFormComponent } from './sign-in-form/sign-in-form.component';

const routes: Routes = [
  {
    path: 'AddProprety',
    component: AddPropertyComponent,
    canActivate: [IsSignedInGuardService],
  },
  {
    path: 'MarketPlace',
    component: DisplayMarketItemsComponent,
    canActivate: [IsSignedInGuardService],
  },
  {
    path: 'SellingProprety',
    component: AddItemToMarketPlaceComponent,
    canActivate: [IsSignedInGuardService],
  },
  {
    path: 'MyPropreties',
    component: MyPropretiesComponent,
    canActivate: [IsSignedInGuardService],
  },
  {
    path: 'CurrentSells',
    component: CurrentSellsComponent,
    canActivate: [IsSignedInGuardService],
  },
  {
    path: 'InterfaceUser',
    component: InterfaceUserComponent,
    canActivate: [IsSignedInGuardService],
  },
  { path: 'FormSignIn', component: SignInFormComponent },
  { path: 'AllTransactions', component: AllTransactionsComponent },

  { path: '', component: HomePageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
