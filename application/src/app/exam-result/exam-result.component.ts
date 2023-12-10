import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../Service/api.service';
import Result from '../models/Result';
import qustionDto from '../models/qustionDto';

@Component({
  selector: 'app-exam-result',
  templateUrl: './exam-result.component.html',
  styleUrls: ['./exam-result.component.css'],
})
export class ExamResultComponent implements OnInit {
  finalMark: number = 0;
  percentage: number = 0;
  userAnswers: any[] = [];
  correctAnswers: any[] = [];
  totalMarks: number = 0;

  constructor(private router: Router, private apiService: ApiService) {}

  ngOnInit() {
    const userIdStrng = localStorage.getItem('currentUser');
    const examIdStrng = localStorage.getItem('currentUserExam');

    if (!userIdStrng || !examIdStrng) {
      console.error('User ID or Exam ID is missing.');
      return;
    }

    const userId = +userIdStrng;
    const examId = +examIdStrng;

    this.apiService.getTotalMark(examId).subscribe(
      (totalMark: any) => {
        this.totalMarks = totalMark;

        this.apiService.getFinalMark(userId, examId).subscribe(
          (result: Result) => {
            this.finalMark = +result;
            this.percentage = (this.finalMark / this.totalMarks) * 100;
          },
          (error: any) => {
            console.error('Failed to fetch final mark', error);
          }
        );

        this.apiService.getUserAnswers(userId, examId).subscribe(
          (userAnswers: any[]) => {
            this.userAnswers = userAnswers;
          },
          (error: any) => {
            console.error('Failed to fetch user answers', error);
          }
        );

        this.apiService.getQuestionsWithAnswers(examId).subscribe(
          (correctAnswers: any[]) => {
            this.correctAnswers = correctAnswers;
          },
          (error: any) => {
            console.error('Failed to fetch correct answers', error);
          }
        );
      },
      (error: any) => {
        console.error('Failed to fetch total mark', error);
      }
    );
  }

  navigateBack() {
    this.router.navigate(['/login']);
  }
}
