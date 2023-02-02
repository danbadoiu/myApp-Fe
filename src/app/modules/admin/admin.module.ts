import { CommonModule, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashbordComponent } from './components/admin-dashbord/admin-dashbord.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TableComponent } from './components/home/table/table.component';
import { MatTableModule } from '@angular/material/table';
import { ServicesComponent } from './components/services/services.component';
import { ProfileComponent } from './components/profile/profile.component';
import { MessageDetailComponent } from './components/services/message-detail/message-detail.component';
import { MessageListComponent } from './components/services/message-list/message-list.component';
import { LocationComponent } from './components/location/location.component';
import { AuthGuard } from './authguard.guard';



// Material Modules


@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    MatTableModule,
    MatButtonModule
    

  ],
  declarations: [
    AdminDashbordComponent,
    FooterComponent,
    HeaderComponent,
    HomeComponent,
    TableComponent,
    ServicesComponent,
    ProfileComponent,
    MessageDetailComponent,
    MessageListComponent,
    LocationComponent
  ],

  providers: [{ provide: LocationStrategy, useClass: PathLocationStrategy }]
})
export class AdminModule {}
