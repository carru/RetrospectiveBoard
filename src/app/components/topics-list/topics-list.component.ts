import { Component, Input, Output, EventEmitter } from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { Topic } from '../../models/Topic';

@Component({
  selector: 'app-topics-list',
  templateUrl: './topics-list.component.html',
  styleUrls: ['./topics-list.component.css']
})
export class TopicsListComponent {
  @Input() topics:Topic[];
  @Output() deleteTopic: EventEmitter<Topic> = new EventEmitter();

  deleteTopicInList(topic:Topic) {
    this.deleteTopic.emit(topic);
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.topics, event.previousIndex, event.currentIndex);
  }
}