import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: 'diagnosticOrder', loadChildren: () => import('./@core/DiagnostiOrder/diagnostic-order.module').then( mod => mod.DiagnosticOrderModule)},
  {path: 'partsRequest',loadChildren: () => import('./@core/PartsRequest/parts-request.module').then(mod => mod.PartsRequestModule), },
  {path: 'partsInspection', loadChildren: () => import('./@core/PartsInspection/parts-inspection.module').then(mod => mod.PartsInspectionModule)},
  {path: 'logistics', loadChildren: () => import('./@core/Logistics/logistics.module').then(mod => mod.LogisticsModule)},
  {path: 'reporting', loadChildren: () => import('./@core/Reporting/reporting.module').then(mod => mod.ReportingModule)},  
  {path: 'routing', loadChildren: () => import('./@core/Routings/routings.module').then(mod => mod.RoutingsModule)},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
