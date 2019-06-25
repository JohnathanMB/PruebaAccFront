import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistroComponent} from './componentes/registro/registro.component';
import { HomeComponent } from './componentes/home/home.component';
import { LoginComponent } from './componentes/login/login.component';

const routes: Routes = [
  
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'registro',
    component: RegistroComponent
  },
  {
    path: '**',
    component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
