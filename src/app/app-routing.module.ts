import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { AuthenticationGuard } from './authentication.guard';
import { UnauthorizedComponent } from './shared/unauthorized/unauthorized.component';
import { AuthComponent } from './login/auth/auth.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'auth', component: AuthComponent },
  {
    path: 'main',
    loadChildren: () => import('./main/main.module').then((x) => x.MainModule),
    canActivate: [AuthenticationGuard],
  },
  { path: 'unauthorized', component: UnauthorizedComponent },
  { path: '**', component: NotFoundComponent }, // For 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
