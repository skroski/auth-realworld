import { ArticlesService } from './articles.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-articles',
  standalone: true,
  imports: [],
  template: `

  @for (article of articles; track article.slug) {
   <h2>{{ article.title }}</h2>
   <p>{{ article.body }}</p>
  }

  `,
  styleUrl: './articles.component.scss'
})

export class ArticlesComponent implements OnInit {
  articles: any[] = [];
  constructor(private articleService: ArticlesService) {}
  ngOnInit(){
    this.articleService.getAllArticles().subscribe(
      (response) => {
        this.articles = response.articles;
      },
      (error) => {
        console.error('An error occurred:', error);
      });

  }

}
