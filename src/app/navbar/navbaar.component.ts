import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-navbaar',
  templateUrl: './navbaar.component.html',
  styleUrls: ['./navbaar.component.css']
})
export class NavbaarComponent implements OnInit, OnChanges{
  isloggedIn = false
  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    this.isloggedIn = true
  }

  ngOnInit(): void {
  }
  addItem(newItem: boolean) {
    this.isloggedIn = newItem;
  }

}
