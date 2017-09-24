import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

// import rxjs functions
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';

import 'hammerjs'; // import hammerjs for animations support

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
