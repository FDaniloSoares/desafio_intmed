import { NgModule } from '@angular/core';
import {RouterModule, Routes } from '@angular/router';

import {
    ConsultasComponent,
    AgendamentoComponent,
    ListagemComponent,

} from './components';
import { Guard } from '../shared';

export const ConsultasRoutes: Routes = [
    {
        path: 'consultas',
        component: ConsultasComponent,
        canActivate: [ Guard ],
        children: [
            {
                path: '',
                component: ListagemComponent
            },
            {
                path: 'agendamento',
                component: AgendamentoComponent
            }
        ]
    }
];

@NgModule ({
    imports:[
        RouterModule.forChild(ConsultasRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class ConsultasRoutingModule {}