import { OnInit , Component} from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import { AuthService } from 'src/shared/auth.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];
    modelUsers: any[] = []
    role = ''

    constructor(public layoutService: LayoutService, private auth: AuthService) { 
        auth.getUserData().subscribe(
            (res) => {
                this.role = res.role
            }
        )
    }

    ngOnInit() {
        this.model = [
            {
                label: 'Home',
                items: [
                    { label: 'หน้าหลัก', icon: 'pi pi-fw pi-home', routerLink: ['/'] },
                ]
            },
            {
                label: 'Managements',
                items: [
                    { label: 'จัดการข้อมูลสมาชิก', icon: 'pi pi-fw pi-id-card', routerLink: ['/user'] },
                    { label: 'จัดการข้อมูลครุภัณฑ์', icon: 'pi pi-fw pi-server', routerLink: ['/equipment'] },
                    { label: 'จัดการข้อมูลการแจ้งซ่อม', icon: 'pi pi-fw pi-wrench', routerLink: ['/repair'] },
                    { label: 'สร้าง QR Code', icon: 'pi pi-fw pi-qrcode', routerLink: ['/creatqrcode'] },
                ]
            },
        ];
        this.modelUsers = [
            {
                label: 'Home',
                items: [
                    { label: 'หน้าหลัก', icon: 'pi pi-fw pi-home', routerLink: ['/'] },
                ]
            },
            {
                label: 'Managements',
                items: [
                    { label: 'ข้อมูลสมาชิก', icon: 'pi pi-fw pi-id-card', routerLink: ['/'] },
                    { label: 'ข้อมูลการแจ้งซ่อม', icon: 'pi pi-fw pi-id-card', routerLink: ['/'] },
                ]
            },
        ];
    }
}
