import { Injectable } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const username = localStorage.getItem('username') ?? 'admin';
  const password = localStorage.getItem('password') ?? 'admin123';
  const societyId = localStorage.getItem('societyId') ?? '';

  const basicAuth = 'Basic ' + btoa(`${username}:${password}`);

  const clonedRequest = req.clone({
    setHeaders: {
      Authorization: basicAuth,
      'Society-Id': societyId
    }
  });

  return next(clonedRequest);
};
