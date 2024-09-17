https://www.gerome.dev/blog/standalone-angular-folder-structure/
https://github.com/gothinkster/angular-realworld-example-app

src/
├── app/
│ ├── core/ # Core services, guards, interceptors
│ │ ├── services/
│ │ │ ├── auth.service.ts # Global services (e.g., AuthService)
│ │ ├── guards/
│ │ │ └── auth.guard.ts # Global route guards
│ │ ├── interceptors/
│ │ │ └── token.interceptor.ts # HTTP interceptors
│ │ └── core.module.ts # (optional) if using a CoreModule
│ ├── shared/ # Shared components, directives, pipes
│ │ ├── components/
│ │ │ ├── button/
│ │ │ │ ├── button.component.ts # Standalone ButtonComponent
│ │ │ ├── modal/
│ │ │ │ ├── modal.component.ts # Standalone ModalComponent
│ │ ├── directives/
│ │ │ └── highlight.directive.ts # Standalone HighlightDirective
│ │ ├── pipes/
│ │ │ └── date.pipe.ts # Standalone DatePipe
│ │ └── shared.module.ts # (optional) if grouping shared items
│ ├── features/ # Feature-specific directories
│ │ ├── home/
│ │ │ ├── home.component.ts # HomeComponent (Standalone)
│ │ │ ├── home.component.html # Home template
│ │ │ └── home.component.scss # Home styles
│ │ ├── user/
│ │ │ ├── user.component.ts # UserComponent (Standalone)
│ │ │ ├── user.component.html # User template
│ │ │ └── user.component.scss # User styles
│ │ └── feature.module.ts # (optional) for lazy-loading features
│ ├── app.component.ts # Standalone root AppComponent
│ ├── app.component.html
│ ├── app.component.scss
├── assets/ # Static assets
│ ├── logo.png
├── environments/ # Environment configurations
│ ├── environment.ts # Development environment
│ └── environment.prod.ts # Production environment
├── index.html # Main HTML entry point
├── main.ts # Application bootstrap
└── styles.scss # Global styles
