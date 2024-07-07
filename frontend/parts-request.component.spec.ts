import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DiagnosticOrderPartsNumberComponent } from 'src/app/@core/DiagnostiOrder/component/diagnostic-order-parts-number/diagnostic-order-parts-number.component';
import { PartsRequestComponent } from './parts-request.component';
import { AppModule } from 'src/app/app.module';
import { PartsRequestService } from '../../services/parts-request.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { of } from 'rxjs';

describe('PartsRequestComponent', () => {
  let component: PartsRequestComponent;
  let fixture: ComponentFixture<PartsRequestComponent>;
  let dialog:MatDialog;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartsRequestComponent ],
      imports: [AppModule],
      providers: [PartsRequestService,
        { provide: MatDialog, useValue: { open: () => ({ afterClosed: () => of([{ partNumber: '1', partName: 'Part 1' }]) }) } }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PartsRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

    it('function to call fetchManualRuleById', () => {
    const manualID = {'id':'1' };
    const resManualID= spyOn(component, 'fetchManualRuleById');
    component.fetchManualRuleById(manualID);
    expect(resManualID).toHaveBeenCalled();
  });
  it('should open dialog and update values',()=>{
    spyOn(dialog, 'open').and.returnValue({afterClosed:()=> of([{partNumber: '1', partName: 'Part 1'}])} as MatDialogRef<DiagnosticOrderPartsNumberComponent>);
    component.partsNumberModel();
    expect(dialog.open).toHaveBeenCalled();
    expect(component.partsNumberValue).toEqual([{partNumber:'1',partName:'Part 1'}]);
    expect(component.value).toBe('1 | Part 1')
   })
});  
