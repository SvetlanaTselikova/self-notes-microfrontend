import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  GoogleLoginProvider,
  SocialAuthService,
} from '@abacritt/angularx-social-login';
import { EMPTY, Subject, from, switchMap, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from 'packages/core-client/src/app/auth/services/auth.service';
import { NOTES_LIST_PATH } from '@self-notes/utils';

@Component({
  selector: 'app-google-login',
  templateUrl: './google-login.component.html',
  styleUrls: ['./google-login.component.sass'],
})
export class GoogleLoginComponent implements OnInit, OnDestroy {
  constructor(
    private socialAuthService: SocialAuthService,
    private router: Router,
    private authService: AuthService
  ) {}

  destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.subscribeAuthState();
  }

  subscribeAuthState() {
    this.socialAuthService.authState
      .pipe(
        switchMap((user) => {
          if (user) {
            return from(
              this.socialAuthService.getAccessToken(
                GoogleLoginProvider.PROVIDER_ID
              )
            ).pipe(
              switchMap((accessToken) =>
                this.authService.authenticationControllerAuthenticate({
                  token: accessToken,
                })
              )
            );
          } else return EMPTY;
        }),
        switchMap(() => from(this.router.navigate([this.getRedirectPath()]))),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  getRedirectPath() {
    const urlTree = this.router.parseUrl(this.router.url);
    const queryParams = urlTree.queryParams;
    return queryParams?.['redirect'] || NOTES_LIST_PATH;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}