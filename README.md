# Angular Fakebook Ninja

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.x.

This is the application `Django Fakebook Ninja`, for generating fakebook jazz charts.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Docker based development

Build environment: `docker-compose build`

Run service: `docker-compose up [-d]` you can background the job by using `-d` flag

Run `ng` commands if service is up: `docker-compose exec ng help`  Note that this directory is mounted into container so you can change code live.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

Or run one single test:  `ng test --main ./src/app/auth/auth.component.spec.ts`

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

When developing with a running Docker container,  you might need hot reload: 
https://stackoverflow.com/questions/44176922/docker-container-doesnt-reload-angular-app
