import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {
  latitude: number = 0;
  longitude: number =0;
  constructor() { navigator.geolocation.getCurrentPosition(position => {
    this.latitude = position.coords.latitude;
    this.longitude = position.coords.longitude;
    
  }); }

  ngOnInit() {
    console.log(this.latitude)
  }

}
