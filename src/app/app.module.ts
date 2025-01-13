import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// PrimeNG Modules
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

// Chart.js Module
// import { ChartModule } from 'ng2-charts';

// Application Component
import { AppComponent } from './app.component';

// Services
import { DataService } from './services/data.service';
import { TooltipModule } from 'primeng/tooltip';
import { MatTooltipModule } from '@angular/material/tooltip';
import { OverlayPanelModule } from 'primeng';
import { CheckboxModule } from 'primeng';
import { MultiSelectModule } from 'primeng';


@NgModule({
  declarations: [
    AppComponent, // Declare your root component
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    TableModule,
    DropdownModule,
    ButtonModule,
    InputTextModule,
    TooltipModule,
    MatTooltipModule,
    OverlayPanelModule,
    CheckboxModule,
    MultiSelectModule
  ],
  providers: [
    DataService, // Add your service here
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
