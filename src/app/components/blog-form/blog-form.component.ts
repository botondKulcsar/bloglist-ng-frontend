import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-blog-form',
  templateUrl: './blog-form.component.html',
  styleUrls: ['./blog-form.component.css']
})
export class BlogFormComponent implements OnInit {

  constructor() { }

  visible: boolean = false;

  title: string = '';
  author: string = '';
  url: string = '';

  ngOnInit(): void {
  }

  onSubmit(form: NgForm): void {
    console.log(form.value)
    // todo get authenticated user and post new blog to server
  }

}
