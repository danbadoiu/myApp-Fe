import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { DataSource } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { map, Observable, of } from 'rxjs';
import { Role, User } from 'src/app/login/models/login.model';
import { UserService } from 'src/app/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  animations: [
    trigger('detailExpand', [
      state(
        'collapsed',
        style({ height: '0px', minHeight: '0', visibility: 'hidden' })
      ),
      state('expanded', style({ height: '*', visibility: 'visible' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class TableComponent implements OnInit {
  data: User[] | undefined=[];
  constructor(private userService: UserService, private http: HttpClient) {}
  async ngOnInit() {
    this.data = await this.http
      .get<{ items: User[] }>(`${environment.apiUrl}/core/api/v1/users`)
      .pipe(
        map((responseData) => {
          // console.log(responseData.items)
          return responseData.items;
        })
      )
      .toPromise();
    this.dataSource = new MatTableDataSource(this.data);
  }
  displayedColumns = ['id', 'firstName', 'lastName', 'username', 'email'];

  dataSource = new ExampleDataSource();

  isExpansionDetailRow = (i: number, row: Object) =>
    row.hasOwnProperty('detailRow');
  expandedElement: any;

  
}

// const data: User[] = 
// [
//   {
//     id: 'dfs',
//     firstName: 'Hydrogen',
//     lastName: 'sd',
//     username: 'H',
//     email: 'sdas',
//     role: Role.DOCTOR,
//   },
//   {
//     id: 'dfs',
//     firstName: 'Hydrogen',
//     lastName: 'sd',
//     username: 'H',
//     email: 'sdas',
//     role: Role.PATIENT,
//   },
// ];
export class ExampleDataSource extends DataSource<any> {
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<User[]> {
    const rows: any[] = [];
    // data.forEach((element) => rows.push(element, { detailRow: true, element }));
    return of(rows);
  }

  disconnect() {}
}

