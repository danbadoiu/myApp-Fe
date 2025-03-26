import { Pipe, PipeTransform } from '@angular/core';
import { MarkerService } from './services/marker.service';
import { UserService } from './services/user.service';

@Pipe({
  name: 'markerName',
  pure: false // Make it impure so it updates when data changes
})
export class MarkerNamePipe implements PipeTransform {
  markers: any[] = [];

  constructor(private markerService: MarkerService) {
    this.markerService.getUsers().subscribe((data) => {
      this.markers = data;
    });
  }

  transform(markerId: string): string {
    const marker = this.markers.find(marker => marker.id === markerId);
    return marker ? `${marker.name}` : 'Unknown Hospital';
  }
}
