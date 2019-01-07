import { Component, HostBinding } from '@angular/core';
import { AuthService, ScreenService, AppInfoService } from './shared/services';
import { Service, Employee, State } from './app.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    providers: [Service]
})
export class AppComponent  {
  dataSource: Employee[];
  states: State[];
  events: Array<string> = [];

  constructor(service: Service) {
      this.dataSource = service.getEmployees();
      this.states = service.getStates();
  }
  
  logEvent(eventName) {
      this.events.unshift(eventName);
  }

  clearEvents() {
      this.events = [];
  }
}
