import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';
import { AreaService } from '../../shared/services/area.service'
import DataSource from "devextreme/data/data_source";

@Component({
  templateUrl: 'display-data.component.html'
})

export class DisplayDataComponent implements OnInit {
  dataSource: any;
  isCurrent: any[];
  exampleDatabase: AreaService | null;


  ngOnInit() {
    this.loadData();
  }

  loadData = () => {
    this.exampleDatabase = new AreaService(this.http);
    this.exampleDatabase.getRepoIssues().pipe(
      map(data => {
        return data.payload.value;
      })
    ).subscribe(data => {
      this.dataSource = new DataSource({
        store: {
            type: "array",
            key: "Id",
            data: data
        }
    });
    });
  }

  constructor(private http: HttpClient, ) {
    /*
    this.dataSource = {
      store: {
        type: 'odata',
        key: 'Task_ID',
        url: 'https://js.devexpress.com/Demos/DevAV/odata/Tasks'
      },
      expand: 'ResponsibleEmployee',
      select: [
        'Task_ID',
        'Task_Subject',
        'Task_Start_Date',
        'Task_Due_Date',
        'Task_Status',
        'Task_Priority',
        'Task_Completion',
        'ResponsibleEmployee/Employee_Full_Name'
      ]
    };
    this.priority = [
      { name: 'High', value: 4 },
      { name: 'Urgent', value: 3 },
      { name: 'Normal', value: 2 },
      { name: 'Low', value: 1 }
    ];
    */

    

   this.isCurrent = [
    { name: 'Yes', value: true },
    { name: 'No', value: false },
    
  ];
  }
  
}
