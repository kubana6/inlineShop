import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ChildComponent } from './child/child.component';
import { SecondComponent } from './second/second.component';
import {MainComponent} from './main/main.component'
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './login/login.component';
import { HomePageComponent } from './home-page/home-page.component';
const routes: Routes = [{path:'login',component:LoginComponent},
{path:'second/:id',component:SecondComponent, canActivate:[AuthGuard]},
{path:'',component:HomePageComponent,canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
