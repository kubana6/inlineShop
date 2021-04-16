import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LogInComponent } from './log-in/log-in.component';
import { CartComponent } from './cart/cart.component';
import { MainComponent } from './main/main.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuComponent } from './menu/menu.component';
import { SliderComponent } from './slider/slider.component';
import { CategoryComponent } from './category/category.component';
import { ChoiceGoodsComponent } from './choice-goods/choice-goods.component';
import { FooterComponent } from './footer/footer.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { HomePageComponent } from './home-page/home-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthorizationComponent } from './authorization/authorization.component';
import { MatIconModule } from '@angular/material/icon';
import { ShopingCartComponent } from './shoping-cart/shoping-cart.component';
import { ImagePipe } from './pipes/image.pipe';
import { SmartphonesComponent } from './smartphones/smartphones.component';
import {ZoomDirective} from './services/zoom.directive';
import {ContentDirective} from './services/content.directive';
import { CartItemComponent } from './cart-item/cart-item.component';
import { FormOrderInformationComponent } from './form-order-information/form-order-information.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LogInComponent,
    CartComponent,
    MainComponent,
    MenuComponent,
    SliderComponent,
    CategoryComponent,
    ChoiceGoodsComponent,
    FooterComponent,
    HomePageComponent,
    AuthorizationComponent,
    ShopingCartComponent,
    ImagePipe,
    SmartphonesComponent,
    ZoomDirective,
    ContentDirective,
    CartItemComponent,
    FormOrderInformationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    ReactiveFormsModule,
    MatIconModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
