import { Component, OnInit } from '@angular/core';
import { Course, sortCoursesBySeqNo } from '../model/course';
import { interval, noop, Observable, of, throwError, timer } from 'rxjs';
import {
  catchError,
  delay,
  delayWhen,
  filter,
  finalize,
  map,
  retryWhen,
  shareReplay,
  tap,
} from 'rxjs/operators';
import { CoursesService } from '../services/courses.service';
import { LoadingService } from '../loading/laoding.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  beginnerCourses$: Observable<Course[]>;
  advancedCourses$: Observable<Course[]>;

  constructor(
    private courseService: CoursesService,
    private loadingService: LoadingService
  ) {}

  ngOnInit() {
    this.reloadCourses();
  }

  reloadCourses() {
    this.loadingService.loadingOn();
    const courses$ = this.courseService.loadAllCourses().pipe(
      map((courses) => courses.sort(sortCoursesBySeqNo)),
      finalize(() => this.loadingService.loadingOff())
    );

    //courses$.subscribe((val) => console.log(val));

    this.beginnerCourses$ = courses$.pipe(
      map((courses) =>
        courses.filter((course) => course.category == 'BEGINNER')
      )
    );

    this.advancedCourses$ = courses$.pipe(
      map((courses) =>
        courses.filter((course) => course.category == 'ADVANCED')
      )
    );
  }
}
