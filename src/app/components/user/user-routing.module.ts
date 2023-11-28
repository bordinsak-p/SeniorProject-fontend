import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { SearchComponent } from './pages/search/search.component';
import { SaveComponent } from './pages/save/save.component';

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
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
                breadcrumb: 'บันทึก',
            }
        },
    ],
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
