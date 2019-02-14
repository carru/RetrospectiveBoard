import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Topic } from 'src/app/models/Topic';

@Component({
  selector: 'app-new-topic',
  templateUrl: './new-topic.component.html',
  styleUrls: ['./new-topic.component.css']
})
export class NewTopicComponent implements OnInit {
  @Output() addTopic: EventEmitter<any> = new EventEmitter();

  text:string;

  constructor() { }

  ngOnInit() {
  }

  onSubmit() {
    this.addTopic.emit({
      text: this.text
    });
  }

}
