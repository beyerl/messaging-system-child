import { Component, HostListener, OnInit } from '@angular/core';
import { IInteractionMessage } from './models/IInteractionMessage';
import { InteractionType } from './models/InteractionType';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  ngOnInit(): void {
    if ((window as any)?.chrome?.webview) {
      (window as any).chrome.webview.addEventListener('message', (event: Event) => {
        this.handleMessage(event)
      });
    }
  }

  selectedItem: number | null = null;
  hostLogs: string[] = [];

  @HostListener('window:message', ['$event'])
  onMessage(event: MessageEvent): void {
    this.handleMessage(event)
  }

  handleMessage(message: any) {
    switch (message.data) {
      case 'sendselecteditem':
        this.sendSelectedItemToHost();
        break;
      case 'dragoverdroparea':
        this.setDropCursor();
        break;
    }
  }

  setDropCursor() {
    console.error("not implemented");
  }

  onSample(): void {
    this.hostLogs.push(`Triggering send via button`);
    this.sendSelectedItemToHost()
  }

  onItemDragStart(event: { dragEvent: DragEvent, index: number }) {
    let message: IInteractionMessage = {
      type: InteractionType.DragStart,
      payload: event.index.toString()
    }

    if ((window as any)?.chrome?.webview) {
      (window as any).chrome.webview.postMessage(message)
    }
  }

  onItemDragEnd($event: { dragEvent: DragEvent, index: number }) {
    let message: IInteractionMessage = {
      type: InteractionType.DragEnd,
      payload: $event.index.toString(),
      eventCoordinates: {
        x: $event.dragEvent.pageX,
        y: $event.dragEvent.pageY,
      }
    }

    window.top?.postMessage(message, '*')
  }

  sendSelectedItemToHost() {
    this.hostLogs.push(`Sending Item ${this.selectedItem} to host`);

    let message: IInteractionMessage = {
      type: InteractionType.Button,
      payload: this.selectedItem?.toString() ?? "0"
    }

    window.top?.postMessage(message, '*')

    if ((window as any)?.chrome?.webview) {
      (window as any).chrome.webview.postMessage(message)
    }
    if (!(window as any).chrome && !window.top) {
      console.log("Cannot find host connext.")
    }
  }

  onItemSelected(index: number): void {
    this.selectedItem = index;
  }
}
