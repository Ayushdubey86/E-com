import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DiagnosticOrderComponent } from './@core/DiagnostiOrder/component/diagnostic-order/diagnostic-order.component';
import { PartsRequestComponent } from './@core/PartsRequest/component/parts-request/parts-request.component';
import { PartsInspectionComponent } from './@core/PartsInspection/component/parts-inspection/parts-inspection.component';
import { LogisticsComponent } from './@core/Logistics/component/logistics/logistics.component';
import { ReportingComponent } from './@core/Reporting/component/reporting/reporting.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './@shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import {MatDialogModule} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { DiagnosticOrderDialogContentComponent } from './@core/DiagnostiOrder/component/diagnostic-order-dialog-content/diagnostic-order-dialog-content.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatSelectModule} from '@angular/material/select';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatDividerModule} from '@angular/material/divider';
import { DiagnosticOrderTitlecasePipe } from './@core/DiagnostiOrder/pipes/diagnostic-order-titlecase.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatExpansionModule} from '@angular/material/expansion';
import { PartsRequestService } from './@core/PartsRequest/services/parts-request.service';
import{DiagnosticOrderAddReasonDialogComponent} from './@core/DiagnostiOrder/component/diagnostic-order-add-reason-dialog/diagnostic-order-add-reason-dialog.component';
import { DiagnosticOrderPartsNumberComponent } from './@core/DiagnostiOrder/component/diagnostic-order-parts-number/diagnostic-order-parts-number.component';
import { CreateDiagnosticOrderComponent } from './@core/DiagnostiOrder/component/create-diagnostic-order/create-diagnostic-order.component';
import { CreatePartsInspectionComponent } from './@core/PartsInspection/component/create-parts-inspection/create-parts-inspection.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AcceptDenyInspectionComponent } from './@core/PartsInspection/component/accept-deny-inspection/accept-deny-inspection.component';
import { PartsInspectionService } from './@core/PartsInspection/services/parts-inspection.service';
import { UploadeFileComponent } from './@core/PartsInspection/component/uploade-file/uploade-file.component';

import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatSortModule } from '@angular/material/sort';
import { RoutingsComponent } from './@core/Routings/components/routings/routings.component';
import { CreateManualRoutingRequestComponent } from './@core/Routings/components/create-manual-routing-request/create-manual-routing-request.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

@NgModule({
  declarations: [
    AppComponent,
    DiagnosticOrderComponent,
    LogisticsComponent,
    PartsInspectionComponent,
    PartsRequestComponent,
    ReportingComponent,
    DiagnosticOrderDialogContentComponent,
    DiagnosticOrderAddReasonDialogComponent,
    DiagnosticOrderPartsNumberComponent,
    DiagnosticOrderTitlecasePipe,
    CreateDiagnosticOrderComponent,
    CreatePartsInspectionComponent,
    AcceptDenyInspectionComponent,
    UploadeFileComponent,
    RoutingsComponent,
    CreateManualRoutingRequestComponent
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatDatepickerModule,
    MatSelectModule,
    MatCardModule,
    MatGridListModule,
    MatNativeDateModule,
    MatDividerModule,
    FormsModule,
    ReactiveFormsModule,
    MatExpansionModule ,
    DragDropModule ,
    MatExpansionModule,
    MatChipsModule,
    MatSortModule,
    MatTableModule,
    MatSlideToggleModule,
    MatAutocompleteModule
  ],
  providers: [PartsRequestService, PartsInspectionService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ]
})
export class AppModule { }
