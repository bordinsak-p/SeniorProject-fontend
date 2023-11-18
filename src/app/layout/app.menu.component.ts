import { OnInit , Component} from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

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
                    { label: 'จัดการข้อมูลสมาชิก', icon: 'pi pi-fw pi-id-card', routerLink: ['/uikit/formlayout'] },
                    { label: 'จัดการข้อมูลครุภัณฑ์', icon: 'pi pi-fw pi-server', routerLink: ['/uikit/formlayout'] },
                    { label: 'จัดการข้อมูลการแจ้งซ่อม', icon: 'pi pi-fw pi-wrench', routerLink: ['/uikit/formlayout'] },
                    { label: 'สร้าง QR Code', icon: 'pi pi-fw pi-qrcode', routerLink: ['/uikit/formlayout'] },
                ]
            },
        ];
    }
}
