import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Topic } from '../../models/Topic';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.css']
})
export class TopicComponent implements OnInit {
  @Input() topic:Topic;
  @Output() deleteTopic: EventEmitter<Topic> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onDelete(topic:Topic) {
    this.deleteTopic.emit(topic);
  }

}
