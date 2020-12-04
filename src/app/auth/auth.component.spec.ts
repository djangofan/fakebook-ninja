import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFactoryResolver } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthResponseData, AuthService } from './auth.service';
import { AuthComponent } from './auth.component';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { Observable, of } from 'rxjs';

describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;

  beforeEach(() => {
    TestBed.resetTestEnvironment();
    TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());

    const componentFactoryResolverStub = () => ({
      resolveComponentFactory: alertComponent => ({})
    });
    const routerStub = () => ({ navigate: array => ({}) });
    const authServiceStub = () => ({
      login: (email, password) => ({}),
      signup: (email, password) => ({})
    });

    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [AuthComponent],
      imports: [FormsModule, ReactiveFormsModule],
      providers: [
        { provide: ComponentFactoryResolver, useFactory: componentFactoryResolverStub },
        { provide: Router, useFactory: routerStub },
        { provide: AuthService, useFactory: authServiceStub }
      ]
    });

    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`isLoginMode has default value`, () => {
    expect(component.isLoginMode).toEqual(true);
  });

  it(`isLoading has default value`, () => {
    expect(component.isLoading).toEqual(false);
  });

  describe('onSubmit', () => {

    const stubNgForm: NgForm = <NgForm>{
      resetForm: () => null,
      value: {
        email: "test@test.com",
        password: "password"
      },
      valid: true
    };

    const stubLoginResponse: AuthResponseData = {
      email: "test@test.com",
      expiresIn: "3600",
      idToken: "eyJhbGciOiJSUzB...",
      localId: "LQNVjXSWBQSOVvYBydLOVoo41gy1",
      kind: "",
      refreshToken: "",
      displayName: "",
      registered: true
    }
    var stubAuthObs$: Observable<AuthResponseData>;

    it('makes expected calls while in login mode', () => {
      stubLoginResponse.registered = true;
      stubAuthObs$ = of(stubLoginResponse);
      component.isLoginMode = true;
      const routerStub: Router = fixture.debugElement.injector.get(Router);
      const authServiceStub: AuthService = fixture.debugElement.injector.get(AuthService);
      spyOn(routerStub, 'navigate').and.callThrough();
      spyOn(authServiceStub, 'login').and.returnValue(stubAuthObs$);
      spyOn(stubNgForm, 'resetForm').and.callThrough();
      component.onSubmit(stubNgForm);
      fixture.detectChanges();
      expect(routerStub.navigate).toHaveBeenCalled();
      expect(authServiceStub.login).toHaveBeenCalled();
      //expect(authServiceStub.signup).not.toHaveBeenCalled();
      expect(stubNgForm.resetForm).toHaveBeenCalled();
    });

    it('makes expected calls while in signup mode', () => {
      stubLoginResponse.registered = false;
      stubAuthObs$ = of(stubLoginResponse);
      component.isLoginMode = false;
      const routerStub: Router = fixture.debugElement.injector.get(Router);
      const authServiceStub: AuthService = fixture.debugElement.injector.get(AuthService);
      spyOn(routerStub, 'navigate').and.callThrough();
      spyOn(authServiceStub, 'signup').and.returnValue(stubAuthObs$);
      spyOn(stubNgForm, 'resetForm').and.callThrough();
      component.onSubmit(stubNgForm);
      fixture.detectChanges();
      expect(routerStub.navigate).toHaveBeenCalled();
      expect(authServiceStub.signup).toHaveBeenCalled();
      //expect(authServiceStub.login).not.toHaveBeenCalled();
      expect(stubNgForm.resetForm).toHaveBeenCalled();
    });

  });

});
