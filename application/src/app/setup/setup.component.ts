  import { Component, ElementRef, ViewChild } from '@angular/core';
  import { ApiService } from '../Service/api.service';
import { Router } from '@angular/router';

  @Component({
    selector: 'app-setup',
    templateUrl: './setup.component.html',
    styleUrls: ['./setup.component.css'],
  })
  export class SetupComponent {
    examName: string = '';
    answerText: string = '';
    isCorrect: boolean = false;
    id : number = 0;
    newQuestion: { id: number; text: string; mark: number; answers?: { text: string; isCorrect: boolean; questionID: number }[] } = {
      id: 0,
      text: '',
      mark: 0,
    };
    question: {id: number; text: string; mark: number }[] = [];
    selectedQuestionIndex: number = -1;
    questionValues: { id: number; title: string; questions: any[] } = { id: 0, title: '', questions: [] };
   
   
  

    constructor(private router: Router,private apiService: ApiService) {}

    

    addQuestion() {
      if (this.newQuestion.text && this.newQuestion.mark) {
        this.question.push({ ...this.newQuestion });
        this.newQuestion.text = '';
        this.newQuestion.mark = 0;
      }
    }
  
    saveExam() {
      if (this.question.length > 0) {
        
    
        const exam = {
          title: this.examName,
          question: this.question,
        };
    
        this.apiService.saveExam(exam).subscribe(
          (response: any) => {
            const questionValues = {
              id: response.id,
              title: response.title,
              questions: response.questions.map((q: any) => ({
                id: q.id,
                text: q.text,
                mark: q.mark,
                examID: q.examID,
              })),
            };
            this.questionValues = questionValues;
    
            alert('Exam saved successfully! , Now please save the answers');
            this.router.navigate(['/setup-answer/']);
          },
          (error) => {
            console.error('Error saving exam:', error);
          }
        );
      } else {
        alert('Please add at least one question before saving the exam.');
      }
    }
    
    
    

    private resetForm() {
      this.examName = '';
      this.question = [];
      this.newQuestion = { id: 0, text: '', mark: 0 };
    
      this.selectedQuestionIndex = -1;

    
    }
  }
