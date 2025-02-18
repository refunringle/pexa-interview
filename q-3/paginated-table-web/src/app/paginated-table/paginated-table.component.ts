import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-paginated-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './paginated-table.component.html',
  styleUrls: ['./paginated-table.component.css'],
})
export class PaginatedTableComponent implements OnInit {
  data: any[] = [];
  page = 1;
  perPage = 5;
  totalPages = 0;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchData();
  }

  // Fetch data from the API
  fetchData(): void {
    const url = `https://reqres.in/api/users?page=${this.page}&per_page=${this.perPage}`;
    this.http.get(url).subscribe((response: any) => {
      this.data = response.data;
      this.totalPages = response.total_pages;
    });
  }

  // Handle page change
  onPageChange(newPage: number): void {
    this.page = newPage;
    this.fetchData();
  }

  // Handle rows per page change with debounce
  onPerPageChange(newPerPage: number): void {
    this.perPage = newPerPage;
    this.page = 1;
    this.debouncedFetchData();
  }

  // Generate an array of page numbers for pagination
  getPageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  // Debounce function to limit API calls
  debounce(func: Function, wait: number): Function {
    let timeout: any;
    return (...args: any[]) => {
      const context = this;
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(context, args), wait);
    };
  }
  debouncedFetchData = this.debounce(this.fetchData, 300);

  // Find a missing number
  findMissingNumber(arr: number[]): number {
    const n = arr.length + 1;
    const expectedSum = (n * (n + 1)) / 2;
    const actualSum = arr.reduce((sum, num) => sum + num, 0);
    return expectedSum - actualSum;
  }

  checkMissingNumber(): void {
    const arr1 = [3, 7, 1, 2, 8, 4, 5];
    const arr2 = [1, 2, 4, 5, 6];

    console.log('Missing number in arr1:', this.findMissingNumber(arr1));
    console.log('Missing number in arr2:', this.findMissingNumber(arr2));
    }
}