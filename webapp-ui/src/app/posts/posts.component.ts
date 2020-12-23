import { PostService } from './../post.service';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { AppError } from '../common/app-error';
import { NotFoundError } from '../common/not-found-error';
import { BadInputError } from '../common/bad-input';

@Component({
  selector: 'posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts: any
  constructor(private service: PostService) {

  }
  ngOnInit(): void {
    this.service.getAll()
      .subscribe(post => {
        this.posts = post
      })
  }

  createPost(title: HTMLInputElement) {
    let postTitle = { title: title.value }
    this.service.create(postTitle)
      .subscribe(response => {
        this.posts.splice(0, 0, response)
      },
      (error : AppError) => {
        if (error instanceof BadInputError) {
          alert("Bad input")
        } else throw error;
      })
  }

  updatePost(post) {
    console.log(post)
    post.id = 1000
    this.service.update(post)
      .subscribe(response => {
        console.log(JSON.stringify(response))
      },
      (error : AppError) => {
        console.log(error)
        if (error instanceof NotFoundError ) {
          alert("The post is not existed")
        } else {
          alert("Bad Request")
        }
        
      })
  }

  deletePost(post) {
    this.service.delete(345).subscribe(
      response => {
        console.log('Response ok')
        // this.posts = this.posts.filter(i => i.id !== post.id)
      },
      (error: Response) => {
        // console.log(error)
        if (error.status === 404) {
          alert("This port has already been deleted")
        } else {
          alert("An unexpected error occurred")
        }
      }
    )
    
  }
}
