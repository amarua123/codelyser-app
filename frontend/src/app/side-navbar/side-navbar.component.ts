// side-navbar.component.ts

import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-side-navbar',
  templateUrl: './side-navbar.component.html',
  styleUrls: ['./side-navbar.component.scss']
})
export class SideNavbarComponent {
  @ViewChild('sidenav')
  sidenav!: MatSidenav;

  toggleSidenav() {
    this.sidenav.toggle();
  }
}
