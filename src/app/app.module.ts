import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar'
import { MatTableModule} from '@angular/material/table'
import { MatColumnDef } from '@angular/material/table';

import {MatButtonModule} from '@angular/material/button'
import {MatIconModule} from '@angular/material/icon'
import { UserService } from './user.service';
import { AuthGuard } from './modules/admin/authguard.guard';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';


@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        RegisterComponent

    ],
    providers: [UserService, AuthGuard, { provide: LocationStrategy, useClass: PathLocationStrategy }],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        MatTableModule,
        MatIconModule,
    ]
})
export class AppModule { }
