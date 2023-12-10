  import { Injectable } from '@angular/core';
  import { HttpClient, HttpParams } from '@angular/common/http';
  import { Observable } from 'rxjs';
  import Users from '../models/Users';
  import Result from '../models/Result';
  import Exams from  '../models/Exams';
  import Questons from '../models/Questions';
  import Answers from '../models/Answers';
  import answers from '../models/Answers';
  import exams from '../models/Exams';
  import LoginDto from '../models/Users';
  import question from '../models/Questions';
  import results from '../models/Result';
  import exmaDto from '../models/examDto';
  import answerDto2 from '../models/answerDto2';
  //import  qustionDto2 from '../models/ qustionDto2';
  @Injectable({
    providedIn: 'root',
  })
  export class ApiService {
    rightAnswers: string[] = [];
    correctAnswers: string[] = [];
    private questionApiUrl = 'http://localhost/Training/api/questions/'; 
    private answerApiUrl='http://localhost/Training/api/answers/';
    private resultApiUrl='http://localhost/Training/api/results/';
    private userApiUrl = 'http://localhost/Training/api/users';
    private examApiUrl='http://localhost/Training/api/exams/';
   
   
    constructor(private http: HttpClient) {}
    getUserAnswers(userId: number, examId: number): Observable<any[]> {
      const theUserAnswer={userId,examId}
      return this.http.post<any[]>(`${this.resultApiUrl+"userAnswer"}`,theUserAnswer);
    }  
    getQuestionsWithAnswers(examId: number): Observable<any[]> {
      const ExamIdDto = {examId};
      return this.http.post<any[]>(`${this.questionApiUrl+'questionswithanswers'}`,ExamIdDto);
    }
    postResult(result: results[]): Observable<any> {
     //const resultDto={ result };
      return this.http.post<any>(`${this.resultApiUrl+ 'PostResult'}`, result);
    }
    getQuestions(endpoint: string): Observable<any> {
      return this.http.get(`${this.questionApiUrl + 'GetQuestions'}/${endpoint}`);
    }
    getAnswers(endpoint: string): Observable<any> {
      return this.http.get(`${this.answerApiUrl + 'GetAnswers'}/${endpoint}`);
    }
    getExamTitles(): Observable<exams[]> {
      return this.http.get<exams[]>(`${this.examApiUrl+ 'titles'}`);
    }
    getQuestionsByExamId(examId: number): Observable<any[]> {
      //const endpoint = 'questionsbyexamid';
      const ExamIdDto = {examId};
      return this.http.post<any[]>(`${this.questionApiUrl+'questionsbyexamid'}`,ExamIdDto);
    }
    getQuestionsByExamIdWhithoutAnswers(examId: number): Observable<any[]> {
      const ExamIdDto = {examId};
      return this.http.post<any[]>(`${this.questionApiUrl+'questionsbyexamidWhithoutAnswers'}`,ExamIdDto);
    }
    login(username: string, password: string): Observable<Users> {
      const loginDto = { username, password }; 
  
      const apiUrl = `${this.userApiUrl}/login`;
      return this.http.post<Users>(apiUrl, loginDto);
    }
      signUp(newUser: Users): Observable<Users> {
      return this.http.post<Users>(this.userApiUrl, newUser);
    }

    getCorrectAnswers(): Observable<answers[]> {
    return this.http.get<answers[]>(this.answerApiUrl + "CorrectAnswers");
    }
     postAnswers(userAnswers: string[]): Observable<any> {
      return this.http.post(`${this.answerApiUrl}/submit-answers`, userAnswers); 
    }
    getFinalMark(userId: number, examId: number): Observable<Result> {
      const theFinalMark={userId,examId}
      return this.http.post<Result>(`${this.resultApiUrl+"final-mark"}`,theFinalMark);
    }  
    getTotalMark( examId: number): Observable<question> {
      const theTotalMark={examId}
      return this.http.post<question>(`${this.questionApiUrl+"total-mark"}`,theTotalMark);
    }
    saveExam(exam: any): Observable<exmaDto> {
      return this.http.post<exmaDto>(`${this.questionApiUrl+"Postexam"}`,exam)}
      
      saveAnswers(answers: any[]): Observable<answerDto2[]> {

        return this.http.post<answerDto2[]>(`${this.answerApiUrl+"postNewAnswer"}`,answers)}
       
        getQuestionId(): Observable< question> {
          return this.http.get< question>(`${this.questionApiUrl+"getQuestionId"}`)
        }
      
  }



