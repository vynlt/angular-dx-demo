import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DxDataGridComponent, } from 'devextreme-angular';
import { AreaService } from '../../shared/services/area.service'
import DataSource from "devextreme/data/data_source";

@Component({
  templateUrl: 'display-data.component.html'
})

export class DisplayDataComponent implements OnInit {
  @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;
  dataSource: any;
  isCurrent: any[];
  exampleDatabase: AreaService | null;
  selectedItemKeys: any[] = [];

  ngOnInit() {
    this.loadData();
  }

  loadData = () => {
    this.exampleDatabase = new AreaService(this.http);
    this.exampleDatabase.getRepoIssues().subscribe(data => {
      this.dataSource = new DataSource({
        store: {
          type: "array",
          key: "Id",
          data: data.payload.value
        }
      });
    });

  }

  addNew(event: any) {
    const newArea = { Id: 0, Name: event.data.Name, CV: event.data.CV, IsCurrent: event.data.IsCurrent, LastUpdated: null };
    this.dataService.addItem(newArea).subscribe(data => {
      this.dataSource.store().remove(event.key)
      this.dataSource.store().insert(data.payload)
      this.dataGrid.instance.refresh();
    })
  }

  updateArea(event: any){
    const newArea = { Id: event.key, Name: event.data.Name, CV: event.data.CV, IsCurrent: event.data.IsCurrent, LastUpdated: (new Date()).toJSON() };
    this.dataService.updateItem(newArea).subscribe(() => {
      console.log("Update sucess")
    })
  }

  removeArea(event: any){
    this.dataService.deleteItem(event.data.Id).subscribe(data => {
      if(data.payload.value){
        this.dataSource.store().remove(event.key)
      }
    })
  }

  constructor(private http: HttpClient, public dataService: AreaService) {
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
