import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RepairComponent } from './repair.component';
import { SearchComponent } from './pages/search/search.component';
import { SaveComponent } from './pages/save/save.component';

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
            }
        },
        {
            path: 'save',
            component: SaveComponent,
            data: {
                breadcrumb: 'แจ้งซ่อม',
            }
        },
    ],
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RepairRoutingModule { }
