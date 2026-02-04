import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {
  SkyPagesModule
} from './sky-pages.module';

import {
  BrowserAnimationsModule
} from '@angular/platform-browser/animations';

import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

@NgModule({
    imports: [
        BrowserAnimationsModule,
        SkyPagesModule,
        BrowserModule,
        AppRoutingModule,
        AppComponent
    ],
    bootstrap: [AppComponent],
    providers: [provideHttpClient(withInterceptorsFromDi())]
})
export class AppModule { }
