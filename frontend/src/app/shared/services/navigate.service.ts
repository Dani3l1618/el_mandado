import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AppRoutes } from 'src/app/AppRoutes';


@Injectable({
  providedIn: 'root'
})
export class NavigateService {
  private router = inject(Router);

  async navigateTo(url:AppRoutes) {
    console.log("url", {url})
    await this.router.navigateByUrl(url);
  }
}
