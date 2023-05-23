

import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoaderService } from './loader.service';
import { finalize } from 'rxjs/operators';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  private excludedUrls = ['/admin/messages', '/public']; // Add the URLs you want to exclude

  constructor(private loaderService: LoaderService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const isExcludedUrl = this.excludedUrls.some(url => request.url.includes(url));

    if (isExcludedUrl) {
      return next.handle(request);
    }

    this.loaderService.setLoading(true);

    return next.handle(request).pipe(
      finalize(() => {
        this.loaderService.setLoading(false);
      })
    );
  }
}
