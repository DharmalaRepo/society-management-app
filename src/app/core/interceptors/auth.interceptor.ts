import { Injectable } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from 'src/environments/environment';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const username = environment.basicAuth.username;
  const password = environment.basicAuth.password;
  const societyId = sessionStorage.getItem('societyIdentifier') ?? '';

  const basicAuth = 'Basic ' + btoa(`${username}:${password}`);

  const clonedRequest = req.clone({
    setHeaders: {
      Authorization: basicAuth,
      'societyIdentifier': societyId
    }
  });

  return next(clonedRequest);
};
