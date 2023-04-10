import { Component, OnInit, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { Marker } from 'src/app/shared/models/marker.model';
import { MarkerService } from 'src/app/shared/services/marker.service';
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
  lat = 46.7633466134;
  lng = 23.6205449;
  zoom = 12;
  marker: mapboxgl.Marker | undefined;
  marker2: mapboxgl.Marker | undefined;
  markers: mapboxgl.Marker[] = [];
  closestMarker: mapboxgl.Marker | undefined;
  closestDistance: number | undefined;
  closestMarkerName: Marker | undefined;
  markersList: Marker[] | undefined;
  @ViewChild('exampleModal') exampleModal: any;
  closeModal() {
    this.exampleModal.nativeElement.click();
  }

  constructor(private markerService: MarkerService) {
    navigator.geolocation.getCurrentPosition((position) => {
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;
    });
    (mapboxgl as any).accessToken = environment.mapbox.accessToken;
  }

  ngOnInit() {
    this.buildMap();
    this.markerService.getUsers().subscribe((data) => {
      this.markersList = data;
      this.markersList?.forEach((marker) => {
        console.log(marker);
        this.markers.push(
          new mapboxgl.Marker({
            color: '#FFFFFF',
            draggable: true,
          })
            .setLngLat([marker.longitude, marker.latitude])
            .addTo(this.map!)
        );
      });
    });
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
    this.map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: { enableHighAccuracy: true },
        trackUserLocation: true,
        showUserHeading: true,
      })
    );
    // this.marker?.push(
    //   new mapboxgl.Marker({
    //     color: '#FFFFFF',
    //     draggable: true,
    //   })
    //     .setLngLat([23.6205449, 46.7633466134])
    //     .addTo(this.map!)
    // );
    // this.marker = new mapboxgl.Marker({
    //   color: '#FFFFFF',
    //   draggable: true,
    // })
    //   .setLngLat([23.6205449, 46.7633466134])
    //   .addTo(this.map!);
    // this.markers.push(this.marker);
    // this.marker2 = new mapboxgl.Marker({
    //   color: '#FFFFFF',
    //   draggable: true,
    // })
    //   .setLngLat([23.5872364478, 46.7761506])
    //   .addTo(this.map!);
    // this.markers.push(this.marker2);
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
  onFindClosestHospital() {
    const myLocation = new mapboxgl.LngLat(this.longitude, this.latitude);
    const markerLocation = new mapboxgl.LngLat(
      this.marker?.getLngLat().lng!,
      this.marker?.getLngLat().lat!
    );
    const locations: number[] | undefined = [];
    myLocation.distanceTo(markerLocation);
    console.log(myLocation.distanceTo(markerLocation));

    const markerLocation2 = new mapboxgl.LngLat(
      this.marker2?.getLngLat().lng!,
      this.marker2?.getLngLat().lat!
    );
    const locations2: number[] | undefined = [];
    myLocation.distanceTo(markerLocation2);
    console.log(myLocation.distanceTo(markerLocation2));
    myLocation.distanceTo(markerLocation) >
    myLocation.distanceTo(markerLocation2)
      ? console.log('marker1')
      : console.log('marker2');

  }
  findClosestMarker() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const myLocation = new mapboxgl.LngLat(
          position.coords.longitude,
          position.coords.latitude
        );

        // Loop through all markers to find the closest one
        for (const marker of this.markers) {
          const markerLocation = new mapboxgl.LngLat(
            marker.getLngLat().lng!,
            marker.getLngLat().lat!
          );
          const distance = myLocation.distanceTo(markerLocation);
          if (!this.closestDistance || distance < this.closestDistance) {
            this.closestDistance = distance;
            this.closestMarker = marker;
          }
        }
        this.closestMarkerName = this.markersList!.find(
          (marker) =>
            marker.latitude == this.closestMarker?.getLngLat().lat &&
            marker.longitude == this.closestMarker?.getLngLat().lng
        );

        console.log(
          `The closest marker is at (${this.closestMarker?.getLngLat().lat},${
            this.closestMarker?.getLngLat().lng
          }) and is ${this.closestDistance} meters away from you.`
        );
      });
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  }
  onCloseModal() {}

  onSolicitaProgramare() {
    this.closeModal()
  }
}
