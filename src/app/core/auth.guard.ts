import { Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export function authGuard(auth: AuthService, router: Router): CanActivateFn {
  return () => {
    if (auth.isLoggedIn()) {
      return true;
    } else {
      router.navigate(['/login']);
      return false;
    }
  };
} 