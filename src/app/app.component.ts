import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  selectedItem: number | null = null;
  hostLogs: string[] = [];

  @HostListener('window:message', ['$event'])
  onMessage(event: MessageEvent): void {
    if (event.data === 'sendselecteditem' && event instanceof MessageEvent) {
      this.sendSelectedItemToHost();
    }
  }

  onSample(): void {
    this.sendSelectedItemToHost()
  }

  sendSelectedItemToHost() {
    this.hostLogs.push(`Sending Item ${this.selectedItem} to host`);

    if (!(window as any).chrome && !window.top) {
      console.log("Cannot find host connext.")
    }

    if ((window as any).chrome) {
      (window as any).chrome.webview.postMessage(this.selectedItem)
    }
    if (window.top) {
      window.top.postMessage(this.selectedItem)
    }
  }

  onItemSelected(index: number): void {
    // Update the selected item index in the app component
    this.selectedItem = index;
  }
}
