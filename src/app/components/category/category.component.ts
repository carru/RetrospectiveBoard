import { Component, OnInit, Input, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import { Category } from '../../models/Category';
import { Topic } from 'src/app/models/Topic';
import { TopicService } from 'src/app/services/topic.service';
import { CategoryService } from 'src/app/services/category.service';
import { SocketService } from 'src/app/services/socket.service';

export const PRESET_COLOURS = ['#90a4ae', '#ff8a65', '#ffd54f', '#aed581', '#4db6ac', '#4fc3f7', '#7986cb', '#ba68c8', '#e57373'];

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  @Input() category:Category;
  @Output() deleteCategory: EventEmitter<Category> = new EventEmitter();
  @Output() deleteTopicInCategory: EventEmitter<Topic> = new EventEmitter();
  @Output() onPlusOneCategory: EventEmitter<any> = new EventEmitter();

  topics:Topic[];
  presetColours: string[];
  topicBackground: string;
  isEditMode: boolean;

  constructor(private topicService:TopicService, private categoryService:CategoryService, private socketService:SocketService) { }

  ngOnInit() {
    this.isEditMode = false;
    this.topics = this.category.topics;
    this.onColorPickerChange(this.category.colour);
    this.presetColours = PRESET_COLOURS;
  }

  onDelete(category:Category) {
    this.deleteCategory.emit(category);
  }

  deleteTopic(topic:Topic) {
    this.deleteTopicInCategory.emit(topic);
  }

  onColorPickerClose(colour:string) {
    this.category.colour = colour;
    this.saveCategory(this.category);
  }

  onColorPickerChange(colour:string) {
    this.topicBackground = `${colour}aa`;
  }

  saveCategory(category:Category) {
    this.categoryService.updateCategory(category).subscribe( () => {
      this.socketService.notifyDataHasChanged();
    });
  }

  onClickPlusOne() {
    if (typeof this.category.points == 'undefined') {
      this.category.points = 0;
    }
    this.category.points++;
    this.saveCategory(this.category);
    this.onPlusOneCategory.emit()
  }

  @ViewChild("name") nameInput: ElementRef;
  onClickEdit() {
    this.toggleEditMode();
    if (this.isEditMode) {
      setTimeout(() => this.nameInput.nativeElement.focus(), 0);
    }
  }

  toggleEditMode() {
    this.isEditMode = !this.isEditMode;
  }

  onSubmit() {
    this.categoryService.updateCategory(this.category).subscribe( () => {
      this.toggleEditMode();
      this.socketService.notifyDataHasChanged();
    });
  }
}
