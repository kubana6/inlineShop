import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTreeModule } from '@angular/material/tree';
import { MatExpansionModule } from '@angular/material/expansion';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LogInComponent } from './log-in/log-in.component';
import { CartComponent } from './cart/cart.component';
import { MainComponent } from './main/main.component';
import { SliderComponent } from './slider/slider.component';
import { CategoryComponent } from './category/category.component';
import { ChoiceGoodsComponent } from './choice-goods/choice-goods.component';
import { FooterComponent } from './footer/footer.component';
import { environment } from '../environments/environment';
import { HomePageComponent } from './home-page/home-page.component';
import { AuthorizationComponent } from './authorization/authorization.component';
import { ShopingCartComponent } from './shoping-cart/shoping-cart.component';
import { ImagePipe } from './pipes/image.pipe';
import { SmartphonesComponent } from './smartphones/smartphones.component';
import { CartItemComponent } from './cart-item/cart-item.component';
import { FormOrderInformationComponent } from './form-order-information/form-order-information.component';
import { SidenavListComponent } from './sidenav-list/sidenav-list.component';
import { CharacteristicsComponent } from './characteristics/characteristics.component';
import { DetailsComponent } from './details/details.component';
import { AccountComponent } from './account/account.component';
import { TreeOrdersComponent } from './account/tree-orders/tree-orders.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LogInComponent,
    CartComponent,
    MainComponent,
    SliderComponent,
    CategoryComponent,
    ChoiceGoodsComponent,
    FooterComponent,
    HomePageComponent,
    AuthorizationComponent,
    ShopingCartComponent,
    ImagePipe,
    SmartphonesComponent,
    CartItemComponent,
    FormOrderInformationComponent,
    SidenavListComponent,
    CharacteristicsComponent,
    DetailsComponent,
    AccountComponent,
    TreeOrdersComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    ReactiveFormsModule,
    MatIconModule,
    MatSliderModule,
    MatToolbarModule,
    MatButtonModule,
    MatBadgeModule,
    MatCardModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    MatSidenavModule,
    MatListModule,
    MatTabsModule,
    MatTreeModule,
    MatExpansionModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
