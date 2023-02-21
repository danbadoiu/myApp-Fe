import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-location',
  // template:`<div id="map" style="height: 500px; width: 100%;"></div>`,
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css'],
})
export class LocationComponent implements OnInit {
  title = 'user_location_map';
  latitude: number = 0;
  longitude: number = 0;
  map: mapboxgl.Map | undefined;
  style = 'mapbox://stylee/mapbox/streets-v11';
  lat =  46.770439;
  lng = 23.591423;
  zoom = 5;
  constructor() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;
    });
    (mapboxgl as any).accessToken = environment.mapbox.accessToken;
  }

  ngOnInit() {
    // console.log(this.latitude)
    // const myLatLng = { lat: this.latitude, lng: this.longitude };
    // const mapOptions = {
    //   center: myLatLng,
    //   zoom: 8
    // };
    // const map = new google.maps.Map(
    //   document.getElementById('map')!,
    //   mapOptions
    // );
    // const marker = new google.maps.Marker({
    //   position: myLatLng,
    //   map: map
    // });
    this.buildMap();
  }
  buildMap() {
    const navControl = new mapboxgl.NavigationControl({
      visualizePitch: true,
    });
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: this.zoom,
      center: [this.lng, this.lat],
      attributionControl: false,
    });
    this.map.addControl(navControl, 'top-right');
    this.map.addControl(new mapboxgl.GeolocateControl({
      positionOptions:{enableHighAccuracy:true},
      trackUserLocation:true,
      showUserHeading:true
    }))
  }

  x = document.getElementById('demo');
  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.showPosition);
    } else {
      this.x!.innerHTML = 'Geolocation is not supported by this browser.';
    }
  }

  showPosition(position: any) {
    //  "Latitude: " + position.coords.latitude +
    // "<br>Longitude: " + position.coords.longitude;
    console.log(position.coords.latitude);
  }
}
