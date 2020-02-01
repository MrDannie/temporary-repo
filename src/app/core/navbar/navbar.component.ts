import { Component, OnInit } from '@angular/core';

@Component({
 selector: 'cm-navbar',
 templateUrl: 'navbar.component.html',
 styleUrls: ['navbar.component.css']
})
export class NavBarComponent implements OnInit {
 isCollapsed: boolean;

 constructor() { }

 ngOnInit() { 

 }

}