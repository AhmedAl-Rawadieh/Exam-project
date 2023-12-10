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
import qustionDto2 from '../models/qustionDto2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-setup-answer',
  templateUrl: './setup-answer.component.html',
  styleUrls: ['./setup-answer.component.css']
})
export class SetupAnswerComponent {
    selectedQuestion: qustionDto2[] = []; 
    examTitles: exams[] = [];
    selectedExam: exams | null = null;
    examName: string = '';
    answerText: string = '';
    isCorrect: boolean = false;
    id : number = 0;
    questionsWithAnswers: qustionDto2[] = [];
  
  
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
        this.resetForm();
      }
    }
    loadQuestions() {
      if (this.selectedExam) {
        const examId = +this.selectedExam;
  
        this.apiService.getQuestionsByExamIdWhithoutAnswers(examId).subscribe(
          (questionsWithAnswers) => {
            this.questionsWithAnswers = questionsWithAnswers;
  
            
  
           
          },
          (error) => {
            console.error('Failed to fetch questions', error);
          }
        );
      } else {
        console.error('Selected exam is null or has no ID');
      }
    }
  
    newAnswers: { text: string; isCorrect: boolean; questionID: number } = {
      text: '',
      isCorrect: false,
      questionID: 0,
    };
    ans: {text: string; isCorrect: boolean; questionID: number }[] = [];
    
       
    constructor( private router: Router,private apiService: ApiService,private formBuilder: FormBuilder ) {
     
    }
    addAnswer() {
      if (this.newAnswers.text.trim() !== '') {
        this.ans.push({ ...this.newAnswers });
        this.newAnswers.text = '';
        this.newAnswers.isCorrect = false;
      }
    }
    

   saveExam() {
      if (this.ans.length > 0 && this.selectedQuestion) {
        const answers = this.ans.map(answer => {
          return {
            text: answer.text,
            isCorrect: answer.isCorrect,
            questionID: this.selectedQuestion
          };
        });
    
        this.apiService.saveAnswers(answers).subscribe(
          (response: any) => {
            alert('Answers saved successfully!');
            this.resetForm();
          },
          (error) => {
            console.error('Error saving answers:', error);
          }
        );
      } else {
        alert('Please add at least one answer before saving the exam.');
      }
    }
    navigateBack() {
      this.router.navigate(['/login']);
    }
    private resetForm() {
      this.examName = '';
      this.ans = [];
      this.newAnswers = { text: '', isCorrect: false, questionID: 0 };
     
}
}