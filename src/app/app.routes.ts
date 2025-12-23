import { Routes } from '@angular/router';
import { RegistrationComponent } from './Sign/registration/registration.component';
import { LoginComponent } from './Sign/login/login.component';
import { HomeComponent } from './User Layout/home/home.component';
import { HomeComponent as dashboardHome } from './Dashboard/home/home.component';
import { LayoutComponent } from './User Layout/layout/layout.component';
import { RestaurantsComponent as DashboardRestaurant } from './Dashboard/restaurants/restaurants.component';
import { ProfileComponent } from './User Layout/profile/profile.component';
import { DashboardLayoutComponent } from './Dashboard/dashboard-layout/dashboard-layout.component';
import { RestaurantFormComponent } from './Dashboard/restaurants/restaurant-form/restaurant-form.component';
import { ItemFormComponent } from './Dashboard/restaurants/restaurant-form/item-form/item-form.component';
import { ListRestaurantsComponent } from './User Layout/list-restaurants/list-restaurants.component';
import { RestaurantComponent } from './User Layout/list-restaurants/restaurant/restaurant.component';

export const routes: Routes = [

    {path: 'registration' , component: RegistrationComponent},
    {path: 'login' , component: LoginComponent},

    // USER LAYOUT Routes
    {path: '' , component: LayoutComponent , children:[
        {path: 'home' , component: HomeComponent},
        {path: 'restaurants' , component: ListRestaurantsComponent},
        {path: 'restaurants/:id' , component: RestaurantComponent},
        {path: 'profile' , component: ProfileComponent},
        {path:'',redirectTo:'home',pathMatch:'full'},
    ]},

    // ADMIN Routes
    {path: 'dashboard' , component: DashboardLayoutComponent , children:[
        {path: 'home' , component: dashboardHome},
        {path: 'restaurants' , component: DashboardRestaurant},
        {path: 'addRestaurant/form' , component: RestaurantFormComponent },
        {path: 'addRestaurant/form/:id' , component: RestaurantFormComponent },
        {path: 'addItem/form' , component: ItemFormComponent},
        {path: 'addItem/form/:id' , component: ItemFormComponent},
        {path: '' , component: dashboardHome},
        {path: '**' , redirectTo: 'dashboard/home'}
    ]}
];
