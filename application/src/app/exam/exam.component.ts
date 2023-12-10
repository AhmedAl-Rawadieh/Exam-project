import { Component, ElementRef, OnInit, QueryList, ViewChild } from '@angular/core';
import { ApiService } from '../Service/api.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { Title } from '@angular/platform-browser';
import questions from '../models/Questions';
import answers from '../models/Answers';
import results from '../models/Result';
import exams from '../models/Exams';
import resultDto from '../models/resultDto';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css'],

})
export class ExamComponent {
  timer: string = '0:00'; // Initial timer value
  timerStarted: boolean = false;
  timerExpired: boolean = false; // Track if the timer has expired
  timerInterval: any; // Hold the timer interval
  //questions: questions[] = []; // Define an array of Question type
  questionsWithAnswers: questions[] = [];
  // private correctAnswersSubscription: Subscription;
  private correctAnswers?: string[];
  radioSel: any;
  radioSelected!: boolean;
  radioSelectedString!: string;
  itemsList!: answers[];
  @ViewChild('radioB') radioValues!: QueryList<ElementRef>;
  selectedAnswers: answers[] = [];
  examTitles: exams[] = [];
  selectedExam: exams | null = null;


  constructor(private router: Router, private apiService: ApiService) {

    
  }


  startTimer() {

    if (this.selectedExam) {
      localStorage.setItem('currentUserExam', this.selectedExam.toString());
    }

    if (!this.timerStarted && !this.timerExpired) {


      const timerDisplay = document.getElementById('timer');
      let timeRemaining = 600; // 10 minutes in seconds

      this.timerInterval = setInterval(() => {
        const minutes = Math.floor(timeRemaining / 60);
        const seconds = timeRemaining % 60;
        this.timer = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        timeRemaining--;

        if (timeRemaining < 0) {
          clearInterval(this.timerInterval);
          this.timer = "Time's up!";
          this.timerExpired = true; // Set the timerExpired flag

          this.submitQuiz(); // Automatically submit the quiz
        }
      }, 1000);

      this.timerStarted = true;
    }
  }





  getSelecteditem(answer: answers[]) {
    this.radioSel = answer.find(Item => Item.isSelected);
    this.selectedAnswers.push(this.radioSel);
  }

  submitQuiz() {

    const selectedOption = this.radioValues;
    console.log(this.selectedAnswers);


    

    const result: results[] = [];
    let userIdStrng = localStorage.getItem('currentUser');
    this.questionsWithAnswers.forEach(qus => {
      let resultObj: results = new results();
      resultObj.userID = userIdStrng != null ? +userIdStrng : -1;
      resultObj.examID = qus.examID;
      resultObj.questionId = qus.id;
      let answerObj: answers = qus.answer.filter(x => x.isSelected == true)[0];
      resultObj.answerId = answerObj.id;
      resultObj.finalMark = answerObj.isCorrect ? qus.mark : 0;
      result.push(resultObj);
    });



    this.apiService.postResult(result).subscribe(
      (response: any) => {
        console.log('Marks submitted successfully');
        this.router.navigate(['/exam-result/']);
      },
      (error: any) => {
        console.error('Failed to submit marks', error);
      }
    );
  }


  ngOnInit() {
    this.loadExamTitles();
  }

  loadExamTitles() {
    this.apiService.getExamTitles().subscribe(
      (titles) => {
        this.examTitles = titles;

        if (this.examTitles.length > 0) {
          this.selectExam(this.examTitles[0]);
        }
      },
      (error) => {
        console.error('Failed to fetch exam titles', error);
      }
    );
  }

  selectExam(exam: exams | null) {
    if (exam) {
      this.selectedExam = exam;
      this.loadQuestions();
    }
  }

  loadQuestions() {
    if (this.selectedExam) {
      const examId = +this.selectedExam;

      this.apiService.getQuestionsByExamId(examId).subscribe(
        (questionsWithAnswers) => {
          this.questionsWithAnswers = questionsWithAnswers;

          this.timer = '0:00';
          this.timerStarted = false;
          this.timerExpired = false;
          clearInterval(this.timerInterval);

          this.selectedAnswers = this.questionsWithAnswers.map((q) => ({
            questionId: q.id,
            id: -1,
            text: '',
            isCorrect: false,
            isSelected: false,
          }));
        },
        (error) => {
          console.error('Failed to fetch questions', error);
        }
      );
    } else {
      console.error('Selected exam is null or has no ID');
    }
  }


}