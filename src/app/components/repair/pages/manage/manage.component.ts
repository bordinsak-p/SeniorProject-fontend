import { Component } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';

@Component({
    selector: 'app-manage',
    templateUrl: './manage.component.html',
    // styleUrls: ['./manage.component.scss'],
})
export class ManageComponent {
    items: MenuItem[];

    constructor(public messageService: MessageService) {}

    ngOnInit() {
        this.items = [
            {
                label: 'รับเรื่อง',
                routerLink: '',
            },
            {
                label: 'ดำเนินการ',
                routerLink: 'step2',
            },
            {
                label: 'สำเร็จ',
                routerLink: 'step2/step3',
            },
        ];
    }
}
