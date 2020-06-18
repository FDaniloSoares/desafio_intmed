import { NgModule } from '@angular/core';
import {RouterModule, Routes } from '@angular/router';

import {
    ConsultasComponent,
    AgendamentoComponent,
    ListagemComponent,

} from './components';

export const ConsultasRoutes: Routes = [
    {
        path: 'consultas',
        component: ConsultasComponent,
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