// item-list.component.ts

import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {
  @Output() selectedItemChange = new EventEmitter<number>();

  ngOnInit(): void {
    this.selectedItemChange.emit(this.selectedItem + 1);
  }

  items = Array.from({ length: 10 }).fill(0);
  selectedItem: number = 0;

  onItemClick(index: number): void {
    // You can update your variable here (e.g., using a service or emitting an event)
    this.selectedItem = index;
    this.selectedItemChange.emit(index + 1);
  }

  onDrag(ev: any): void {
    console.log("🚀 ~ ItemListComponent ~ drag ~ ev:", ev)
    ev.dataTransfer?.setData("MyDragData", ev.target?.id);
  }
}
