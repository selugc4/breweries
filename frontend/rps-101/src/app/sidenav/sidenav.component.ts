import { Component } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {

  sidebarContent: string = '';



  loadSidebarContent() {
    // Load the sidebar content from the component or service
    this.sidebarContent = 'Sidebar content loaded!';
  }

}
