import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RepairComponent } from './repair.component';
import { SearchComponent } from './pages/search/search.component';
import { SaveComponent } from './pages/save/save.component';
import { ManageComponent } from './pages/manage/manage.component';
import { StepOneComponent } from './components/step-one/step-one.component';
import { StepTwoComponent } from './components/step-two/step-two.component';
import { StepTreeComponent } from './components/step-tree/step-tree.component';

const routes: Routes = [
    {
        path: '',
        component: RepairComponent,
        children: [
            {
                path: '',
                component: SearchComponent,
                data: {
                    breadcrumb: 'ค้นหา',
                },
            },
            {
                path: 'save',
                component: SaveComponent,
                data: {
                    breadcrumb: 'แจ้งซ่อม',
                },
            },
            {
                path: 'status',
                component: ManageComponent,
                children: [
                    {
                        path: '',
                        component: StepOneComponent,
                    },
                    {
                        path: 'step2',
                        component: StepTwoComponent,
                        data: {
                            breadcrumb: 'ดำเนินการ',
                        },
                    },
                    {
                        path: 'step3',
                        component: StepTreeComponent,
                        data: {
                            breadcrumb: 'สำเร็จ',
                        },
                    },
                ],
                data: {
                    breadcrumb: 'รอรับเรื่อง',
                },
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class RepairRoutingModule {}
