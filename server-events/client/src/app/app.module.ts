import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { BrowserModule } from '@angular/platform-browser'
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin'
import { NgxsModule } from '@ngxs/store'
import { AppRoutingModule } from '@app/app-routing.module'
import { AppComponent } from '@app/app.component'
import { EventsOverviewComponent } from '@app/events-overview/events-overview.component'

@NgModule({
  declarations: [
    AppComponent,
    EventsOverviewComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    [
      NgxsModule.forRoot([]),
      NgxsStoragePluginModule.forRoot()
    ]
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
