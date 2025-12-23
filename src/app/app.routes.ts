import { Routes } from '@angular/router';
import { RegistrationComponent } from './Sign/registration/registration.component';
import { LoginComponent } from './Sign/login/login.component';

export const routes: Routes = [

    {path: 'registration' , component: RegistrationComponent},
    {path: 'login' , component: LoginComponent},
    
];
