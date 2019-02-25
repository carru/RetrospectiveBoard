import { Component, OnInit, Inject } from '@angular/core';
import { Topic } from './models/Topic';
import { TopicService } from './services/topic.service';
import { Category } from './models/Category';
import { CategoryService } from './services/category.service';
import { MatDialog } from '@angular/material';
import { DeleteEverythingConfirmationDialogComponent } from './components/delete-everything-confirmation-dialog/delete-everything-confirmation-dialog.component';
import { SocketService } from './services/socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  uncategorizedTopics: Topic[];
  categories: Category[];
  ioConnection: any;

  constructor(private topicService: TopicService, private categoryService: CategoryService, public dialog: MatDialog, private socketService: SocketService) { }

  ngOnInit() {
    this.reloadData();
    this.initIoConnection();
  }

  private initIoConnection(): void {
    this.socketService.initSocket();

    this.ioConnection = this.socketService.onChangedData()
      .subscribe(() => {
        this.reloadData();
      });
  }

  reloadData() {
    this.topicService.getTopics().subscribe(topics => {
      this.uncategorizedTopics = topics.filter(t => t.categoryId == null);
    })
    this.categoryService.getCategories().subscribe(categories => {
      this.categories = categories;
    })
  }

  deleteEverything(): void {
    const dialogRef = this.dialog.open(DeleteEverythingConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.categories.forEach(c => this.deleteCategory(c));
        this.uncategorizedTopics.forEach((t, idx, array) => {
          if (idx === array.length - 1) {
            // Deleting the last topic, notify other clients
            this.topicService.deleteTopic(t).subscribe(() => {
              this.socketService.notifyDataHasChanged();
            })
          } else {
            // Not the last one, don't notify yet
            this.topicService.deleteTopic(t).subscribe()
          }
        });
        this.categories = [];
        this.uncategorizedTopics = [];
      }
    });
  }

  createTopic(topic: Topic) {
    this.topicService.addTopic(topic).subscribe(topic => {
      this.uncategorizedTopics.push(topic);
      this.socketService.notifyDataHasChanged();
    })
  }

  deleteUncategorizedTopic(topic: Topic) {
    this.uncategorizedTopics = this.uncategorizedTopics.filter(t => t.id !== topic.id);
    this.topicService.deleteTopic(topic).subscribe(() => {
      this.socketService.notifyDataHasChanged();
    });
  }

  createCategory(category: Category) {
    this.categoryService.addCategory(category).subscribe(category => {
      this.categories.push(category);
      this.socketService.notifyDataHasChanged();
    })
  }

  deleteCategory(category: Category) {
    this.categories = this.categories.filter(c => c.id !== category.id);
    this.categoryService.deleteTopicsOfCategory(category).subscribe(c => {
      this.categoryService.deleteCategory(category).subscribe(() => {
        this.socketService.notifyDataHasChanged();
      });
    })
  }

  deleteTopicInCategory(topic: Topic) {
    this.topicService.deleteTopic(topic).subscribe(() => {
      this.socketService.notifyDataHasChanged();
    });
  }
}