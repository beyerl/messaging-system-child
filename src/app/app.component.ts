import { Component, HostListener, OnInit } from '@angular/core';

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

  handleMessage(event: any) {
    if (event.data === 'sendselecteditem') {
      this.sendSelectedItemToHost();
    }
  }

  onSample(): void {
    this.hostLogs.push(`Triggering send via button`);
    this.sendSelectedItemToHost()
  }

  sendSelectedItemToHost() {
    this.hostLogs.push(`Sending Item ${this.selectedItem} to host`);

    window.top?.postMessage(this.selectedItem, '*')

    if ((window as any)?.chrome?.webview) {
      (window as any).chrome.webview.postMessage(this.selectedItem)
    }
    if (!(window as any).chrome && !window.top) {
      console.log("Cannot find host connext.")
    }
  }

  onItemSelected(index: number): void {
    // Update the selected item index in the app component
    this.selectedItem = index;
  }
}
