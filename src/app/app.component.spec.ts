import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'skyux-app-shell',
  template: '<div class="shell-wrapper"><ng-content></ng-content></div>'
})
class MockShellComponent { }

@Component({
  selector: 'app-mock-shell',
  template: '<div class="hello-test">Hello</div>'
})
class AppRouteTestComponent { }

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          {
            component: AppRouteTestComponent,
            path: ''
          }
        ])
      ],
      declarations: [
        MockShellComponent,
        AppRouteTestComponent,
        AppComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should contain a router outlet wrapped by the app shell component', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    const compiled = fixture.nativeElement;

    const router = TestBed.inject(Router);
    await router.navigate(['']);

    expect(
      compiled.querySelector('.hello-test').textContent
    ).toContain('Hello');
  });
});
