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

import {MatButtonModule} from '@angular/material/button'
import {MatIconModule} from '@angular/material/icon'
import { UserService } from './user.service';
import { AuthguardGuard } from './authguard.guard';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        RegisterComponent,

    ],
    providers: [UserService, AuthguardGuard],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        MatButtonModule,
        MatIconModule
    ]
})
export class AppModule { }
