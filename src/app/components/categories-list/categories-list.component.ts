import { Component, OnInit } from '@angular/core';
import { Category } from '../../models/Category';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.css']
})
export class CategoriesListComponent implements OnInit {
  categories:Category[];

  constructor(private categoryService:CategoryService) { }

  ngOnInit() {
    this.categoryService.getCategories().subscribe(categories => {
      this.categories = categories;
    })
  }

  deleteCategory(category:Category) {
    this.categories = this.categories.filter(c => c.id !== category.id);
    this.categoryService.deleteCategory(category).subscribe();
  }

  addCategory(category:Category) {
    this.categoryService.addCategory(category).subscribe(category => {
      this.categories.push(category);
    })
  }

}
