import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventsOverviewComponent } from '@app/events-overview/events-overview.component';

const routes: Routes = [
  { path: 'events', component: EventsOverviewComponent },
  { path: '', redirectTo: '/events', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
