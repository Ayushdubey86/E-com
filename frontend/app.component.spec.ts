import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { DashboardComponent } from './@shared/components/dashboard/dashboard.component';
import { HeaderComponent } from './@shared/components/header/header.component';
import { SharedModule } from './@shared/shared.module';
import { AppModule } from './app.module';
import { DiagnosticOrderModule } from './@core/DiagnostiOrder/diagnostic-order.module';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        SharedModule,
        AppModule,
        
      ],
      declarations: [
        AppComponent,
        DashboardComponent,
        HeaderComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'PRIS-UI'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('PRIS-UI');
  });

  
});
