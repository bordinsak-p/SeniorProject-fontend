import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { AppLayoutComponent } from "./layout/app.layout.component";
import { AuthGuard } from './guard/auth.guard';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', component: AppLayoutComponent,
                canActivate: [AuthGuard],
                children: [
                    { path: '', loadChildren: () => import('./components/dashboard/dashboard.module').then(m => m.DashboardModule) },
                ],
                data: {
                    breadcrumb: 'หน้าหลัก',
                }
            },
            {
                path: 'equipment', component: AppLayoutComponent,
                canActivate: [AuthGuard],
                children: [
                    { path: '', loadChildren: () => import('./components/equipment/equipment.module').then(m => m.EquipmentModule) },
                ],
                data: {
                    breadcrumb: 'จัดการข้อมูลครุภัณฑ์'
                }
            },
            { 
                path: 'auth',
                loadChildren: () => import('./components/auth/auth.module').then(m => m.AuthModule) 
            },
            { 
                path: 'notfound',
                canActivate: [AuthGuard], 
                component: NotfoundComponent 
            },
            { path: '**', redirectTo: '/notfound' },
        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
