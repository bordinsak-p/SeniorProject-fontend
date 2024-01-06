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
                path: 'repair', component: AppLayoutComponent,
                canActivate: [AuthGuard],
                children: [
                    { path: '', loadChildren: () => import('./components/repair/repair.module').then(m => m.RepairModule) },
                ],
                data: {
                    breadcrumb: 'จัดการข้อมูลการแจ้งซ่อม'
                }
            },
            {
                path: 'user', component: AppLayoutComponent,
                canActivate: [AuthGuard],
                children: [
                    { path: '', loadChildren: () => import('./components/user/user.module').then(m => m.UserModule) },
                ],
                data: {
                    breadcrumb: 'จัดการข้อมูลสมาชิก'
                }
            },
            {
                path: 'qrcode', component: AppLayoutComponent,
                canActivate: [AuthGuard],
                children: [
                    { path: '', loadChildren: () => import('./components/qrcode/qrcode.module').then(m => m.QrcodeModule) },
                ],
                data: {
                    breadcrumb: 'สร้าง QR Code'
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
