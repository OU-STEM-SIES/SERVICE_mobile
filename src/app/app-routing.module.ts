/* eslint-disable max-len */
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home-screen', pathMatch: 'full' },
  {
    path: 'login-screen',
    loadChildren: () => import('./login-screen/login-screen.module').then( m => m.LoginScreenPageModule)
  },
  {
    path: 'home-screen',
    loadChildren: () => import('./home-screen/home-screen.module').then( m => m.HomeScreenPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'my-mood-screen1',
    loadChildren: () => import('./my-mood-screen1/my-mood-screen1.module').then( m => m.MyMoodScreen1PageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'daily-record-screen1',
    loadChildren: () => import('./daily-record-screen1/daily-record-screen1.module').then( m => m.DailyRecordScreen1PageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'daily-record-screen2',
    loadChildren: () => import('./daily-record-screen2/daily-record-screen2.module').then( m => m.DailyRecordScreen2PageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'daily-record-screen3',
    loadChildren: () => import('./daily-record-screen3/daily-record-screen3.module').then( m => m.DailyRecordScreen3PageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'daily-record-screen4',
    loadChildren: () => import('./daily-record-screen4/daily-record-screen4.module').then( m => m.DailyRecordScreen4PageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'daily-record-who-with-screen1/:whatActivityCode',
    loadChildren: () => import('./daily-record-who-with-screen1/daily-record-who-with-screen1.module').then( m => m.DailyRecordWhoWithScreen1PageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'daily-record-add-person-screen1/:whatActivityCode',
    loadChildren: () => import('./daily-record-add-person-screen1/daily-record-add-person-screen1.module').then( m => m.DailyRecordAddPersonScreen1PageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'daily-record-screen5',
    loadChildren: () => import('./daily-record-screen5/daily-record-screen5.module').then( m => m.DailyRecordScreen5PageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'my-circle-screen1',
    loadChildren: () => import('./my-circle-screen1/my-circle-screen1.module').then( m => m.MyCircleScreen1PageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'my-history-screen1',
    loadChildren: () => import('./my-history-screen1/my-history-screen1.module').then( m => m.MyHistoryScreen1PageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'add-edit-circle1/:mode/:supporterRecordId',
    loadChildren: () => import('./add-edit-circle1/add-edit-circle1.module').then( m => m.AddEditCircle1PageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'profile-screen1',
    loadChildren: () => import('./profile-screen1/profile-screen1.module').then( m => m.ProfileScreen1PageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'credits-screen1',
    loadChildren: () => import('./credits-screen1/credits-screen1.module').then( m => m.CreditsScreen1PageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'test1',
    loadChildren: () => import('./test1/test1.module').then( m => m.Test1PageModule)
  },
  { path: '**', redirectTo: 'home-screen'},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
