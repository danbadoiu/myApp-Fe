import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-location',
  // template:`<div id="map" style="height: 500px; width: 100%;"></div>`,
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
    const myLatLng = { lat: this.latitude, lng: this.longitude };
    const mapOptions = {
      center: myLatLng,
      zoom: 8
    };
    const map = new google.maps.Map(
      document.getElementById('map')!,
      mapOptions
    );
    const marker = new google.maps.Marker({
      position: myLatLng,
      map: map
    });
  }

   x = document.getElementById("demo");
getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(this.showPosition);
  } else {
    this.x!.innerHTML = "Geolocation is not supported by this browser.";
  }
}

showPosition(position: any) {
  //  "Latitude: " + position.coords.latitude +
  // "<br>Longitude: " + position.coords.longitude;
  console.log(position.coords.latitude)
}
}
