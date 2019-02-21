import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Topic } from '../../models/Topic';

@Component({
  selector: 'app-topics-list',
  templateUrl: './topics-list.component.html',
  styleUrls: ['./topics-list.component.css']
})
export class TopicsListComponent implements OnInit {
  @Input() topics: Topic[];
  @Output() deleteTopic: EventEmitter<Topic> = new EventEmitter();

  ngOnInit() {
    if (typeof this.topics == 'undefined') {
      this.topics = [];
    }
  }

  deleteTopicInList(topic: Topic) {
    this.topics = this.topics.filter(t => t.id != topic.id);
    this.deleteTopic.emit(topic);
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }
}