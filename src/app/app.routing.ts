import {ModuleWithProviders} from '@angular/core';
import {Routes,Route, RouterModule} from '@angular/router';

import {AppComponent} from './app.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {AboutComponent} from './about/about.component';
import {ProfileComponent} from './profile/profile.component';
import {HomeComponent} from './home/home.component';

import {AuthGuard} from './auth.guard';

const indexRoute:Route ={
    path:'',
    component:HomeComponent
};

const fallbackRoute:Route = {
    path:'**',
    component:HomeComponent
};

const appRoutes: Routes = [  
    {    
        path: 'home',
        component: HomeComponent
    },    
    {    
        path: 'profile',
        component: ProfileComponent,        
        canActivate: [AuthGuard]
    },    
    {    
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard]        
    },
    {
       path:'about',
       component: AboutComponent
    },
    fallbackRoute,
    indexRoute
];

export const appRoutingProviders: any[]=[];
export const routing : ModuleWithProviders = RouterModule.forRoot(appRoutes);