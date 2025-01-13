import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from './services/data.service';
import { MultiSelect } from 'primeng';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  evData: any[] = [];
  cols: any[] = [];
  globalFilterFields: string[] = [];
  selectedRow: any;
  emptyTable: boolean = false;
  error: boolean = false;
  loading: boolean = true;
  enableFilters: boolean = false;
  visibleColumns: any[] = [];
  selectedCategories: any[] = []; // Tracks selected columns
  preferencesSaved: boolean = false; // Tracks if preferences are saved
  @ViewChild('columnSelector') columnSelector!: MultiSelect;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.setupColumns();
    this.loadData();
  }

  setupColumns(): void {
    this.cols = [
      { field: 'VIN_(1-10)', header: 'VIN (1-10)', filter: true, width: '15%', visible: true },
      { field: 'County', header: 'County', filter: true, width: '15%', visible: true },
      { field: 'City', header: 'City', filter: true, width: '15%', visible: true },
      { field: 'State', header: 'State', filter: true, width: '15%', visible: true },
      { field: 'Postal_Code', header: 'Postal Code', filter: true, width: '15%', visible: true },
      { field: 'Model_Year', header: 'Model Year', filter: true, width: '15%', visible: true },
      { field: 'Make', header: 'Make', filter: true, width: '15%', visible: true },
      { field: 'Model', header: 'Model', filter: true, width: '15%', visible: true },
      { field: 'Electric_Range', header: 'Electric Range', filter: true, width: '15%', visible: true },
    ];
    this.selectedCategories = [...this.cols];
    this.updateColumnVisibility();
  }

  loadData(): void {
    this.dataService.getEVData().subscribe({
      next: (data) => {
        this.evData = this.parseCSV(data);
        this.emptyTable = this.evData.length === 0;
        this.globalFilterFields = this.cols.map((c) => c.field);
        this.loading = false;
      },
      error: () => {
        this.error = true;
        this.loading = false;
      },
    });
  }

  parseCSV(csv: string): any[] {
    const lines = csv.split('\n');
    const headers = lines[0].split(',').map((header) => header.trim());
    return lines
      .slice(1)
      .filter((line) => line.trim())
      .map((line) => {
        const values = line.split(',').map((value) => value.trim());
        let rowData: { [key: string]: string } = {};
        headers.forEach((header, idx) => {
          const normalizedHeader = header.replace(/\s+/g, '_');
          rowData[normalizedHeader] = values[idx] || '';
        });
        return rowData;
      });
  }

  applyColumnFilter(value: any, field: string): void {
    const table = document.querySelector('p-table');
    if (table) {
      (table as any).filter(value, field, 'contains');
    }
  }

  toggleFilters(): void {
    this.enableFilters = !this.enableFilters;
  }

  // Update visible columns based on selected categories
  updateColumnVisibility(): void {
    this.visibleColumns = this.cols.map((col) => {
      if (this.selectedCategories.find((selected) => selected.field === col.field)) {
        return col; // Include column if selected
      }
      return null; // Exclude column if not selected
    }).filter((col) => col !== null); // Remove nulls for excluded columns
  }
}

