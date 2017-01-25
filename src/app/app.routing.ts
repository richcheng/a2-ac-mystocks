import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {AppComponent} from './app.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {AboutComponent} from './about/about.component';


const appRoutes: Routes = [
    {    
        path: '',
        component: DashboardComponent
    },

    {
       path:'about',
       component: AboutComponent
    }
];

export const routing : ModuleWithProviders = RouterModule.forRoot(appRoutes);