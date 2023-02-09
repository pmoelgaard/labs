import { Component, OnDestroy, OnInit } from '@angular/core'
import { MessageEventType } from '@libs/core'
import { isArray } from 'lodash'

@Component({
  selector: 'app-events-overview',
  templateUrl: './events-overview.component.pug',
  styleUrls: ['./events-overview.component.sass']
})
export class EventsOverviewComponent implements OnInit, OnDestroy {
  eventSrc = new EventSource('//localhost:3000/events')
  public messages: unknown[] = []

  ngOnInit (): void {
    this.onMessage = this.onMessage.bind(this);
    this.eventSrc.addEventListener(MessageEventType.Message, this.onMessage)
  }

  ngOnDestroy (): void {
    this.eventSrc.removeEventListener(MessageEventType.Message, this.onMessage)
  }

  protected onMessage (event: MessageEvent): void {
    let data: unknown[] | unknown = JSON.parse(event.data);
    if (!isArray(data)) {
      data = [data];
    }
    (data as unknown[]).forEach((msg: unknown) => { this.messages.push(msg) })
  }
}
