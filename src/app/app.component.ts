import { Component } from '@angular/core';
import { FormGroup, FormControl,FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'angular-problem';
  tCount = 1;
  maxlimit = 80;
  seatsBooked = 0;
  lastRowStatus =3;
  errorMessage = '';
  seatMessage = '\n\n';
  bookTicketForm = new FormGroup({
    personName: new FormControl(''),
    ticketCount: new FormControl('1')
  });

  seats = [
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0]
  ];

  //Increment Ticket Count
  addValue(){
    if(this.tCount <7 && this.tCount<this.maxlimit-this.seatsBooked) 
      this.tCount = this.tCount + 1;
  }

  //Decrement Ticket Count
  decrementValue(){
    if(this.tCount > 1) 
      this.tCount = this.tCount - 1;
  }

  //Checking for Free Row to accomodate booking
  checkFreeRow(){
    let status = 0, count=1;
    for( let i=0; i<7; i++){
      for(let j=0; j<7; j++){
        if(this.seats[i][j]==1 && this.tCount+j>=7){
          status=-1;
          break;
        }
        else if(status == -1){
            status = i;
        }
        else{
          count++;
        }
      }
      if(count< this.tCount)
        count = 1;

      else{
        break;
      }
    }
    if(status!=-1 && count==this.tCount){
      let message = this.continousBooking(status);
      return {status, message};
    }
    else {
      let message = this.continousBooking(status);
      return {status, message};
    }
  }

  //Random seats Booking
  bookRandom(){
    let seatToBeBooked = this.tCount, message='';
    this.seatsBooked+=seatToBeBooked;
    for( let i=0; i<7; i++){
      for(let j=0; j<7; j++){
        if(seatToBeBooked > 0 && this.seats[i][j]!=1){
          this.seats[i][j] = 1;
          message+= "Seat["+i+"]"+"["+j+"] ";
          seatToBeBooked-=1;
        }
      }
    }
  }

  //Booking in a row
  continousBooking(i:number){
    let seatToBeBooked = this.tCount, message='';this.seatsBooked+=seatToBeBooked;
    for(let j=0; j<7; j++){
      if(seatToBeBooked > 0 && this.seats[i][j]!=1){
         this.seats[i][j] = 1;
         message+= "Seat["+i+"]"+"["+j+"] ";
         seatToBeBooked-=1;
      }
    }
    return message;
  }

  BookLastRow(){
    let seatToBeBooked = this.tCount, message='';this.seatsBooked+=seatToBeBooked;
    this.lastRowStatus -= seatToBeBooked;
    for(let j=0; j<3; j++){
      if(seatToBeBooked > 0 && this.seats[8][j]!=1){
        this.seats[8][j] = 1;
        message+= "Seat[8]"+"["+j+"] ";
        seatToBeBooked-=1;
      }
    }
    return {status: 1,message};
  }

  //Book Seats
  booking(){
    if(this.maxlimit - this.seatsBooked == this.tCount){
      this.errorMessage = '';
      console.log(this.bookRandom());
    }
    else if(this.maxlimit - this.seatsBooked > this.tCount){
      if(this.tCount<=3 && this.lastRowStatus>=this.tCount){
        let rowStatus = this.BookLastRow();
        if(rowStatus.status==1){
          this.seatMessage +="\n Continuos seats Booked in  a row: "+rowStatus.message;
          return;
        }
      }
      this.errorMessage = '';
      let rowStatus = this.checkFreeRow();
      if(rowStatus.status != -1){
        this.seatMessage +="\n Continuos seats Booked in  a row: "+rowStatus.message;
      }
      else{
        this.seatMessage +="<br/> Seats booked in different rows: "+rowStatus.message;
      }
      console.log(this.seatMessage);
      console.log(this.seatsBooked);
    }
    else{
      this.errorMessage = 'Seats available are less than the requested amount...';
    }
    this.tCount = 1;
  }
}
