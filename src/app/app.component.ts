import { Component } from '@angular/core';
import { AppService } from './app.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Front-Angular';

  numeroA: String = "0";
  numeroB: String = "0";
  resultado: String = "0"

  constructor(
    public appService:AppService,
    private snackBar: MatSnackBar
  ){}

  async multiplicar() {
    this.resultado = this.multiply(this.numeroA, this.numeroB)
    this.appService.almacenar(this.resultado).subscribe((result: any) => {
      this.snackBar.open(result.result, 'cerrar');
      setTimeout(() => {
        this.snackBar.dismiss();
      }, 3000);
    })
  }

  async eliminar(){
    this.appService.eliminar().subscribe((result: any) => {
      this.snackBar.open(result.result, 'cerrar');
      setTimeout(() => {
        this.snackBar.dismiss();
      }, 3000);
    })
  }

  async consultar(){
    this.appService.consultar().subscribe((result: any) => {
      this.snackBar.open(result.result, 'cerrar');
      setTimeout(() => {
        this.snackBar.dismiss();
      }, 3000);
    })
  }

  multiply(a: any, b: any) {

    let isASingleDigit = 0, isBSingleDigit = 0;
    if (a < 9) { a *= 10; isASingleDigit = 1 }
    if (b < 9) { b *= 10; isBSingleDigit = 1 }

    let aInArry: any = []
    let bInArry: any = [];

    console.log(a, b);

    while (a.length > 7) {
      aInArry.push(a.substring(a.length - 7, a.length));
      a = a.substring(0, a.length - 7)
    }
    aInArry.push(a)

    while (b.length > 7) {
      bInArry.push(b.substring(b.length - 7, b.length));
      b = b.substring(0, b.length - 7)
    }
    bInArry.push(b)

    aInArry = aInArry.reverse();
    bInArry = bInArry.reverse();

    let answerLines = [];

    for (var i = aInArry.length - 1, j = 0; i >= 0; i--, j++) {
      answerLines[j] = bInArry.map((n: any) => n * aInArry[i] === NaN ? '0000000' : n * aInArry[i]);
      var k = 0;
      while (k < j) {
        answerLines[j].push(0);
        k += 1
      }
    }

    var answerInArray = answerLines[answerLines.length - 1];

    for (var j = 1; j < answerInArray.length; j++) {
      for (var i = 0; i < answerLines.length - 1; i++) {
        if (answerLines[i].length >= j) {
          answerInArray[answerInArray.length - j] += answerLines[i][answerLines[i].length - j]
        }
      }
    }

    let answerIn7DigitBlocksArray = []

    for (var i = 0; i < answerInArray.length; i++) {
      answerIn7DigitBlocksArray.push('')
    }

    for (var i = 1; i <= answerInArray.length; i++)
      if (i !== answerInArray.length) {
        answerIn7DigitBlocksArray[answerIn7DigitBlocksArray.length - i] = answerInArray[answerInArray.length - i].toString().substring(answerInArray[answerInArray.length - i].toString().length - 7, answerInArray[answerInArray.length - i].toString().length);
        answerInArray[answerInArray.length - i - 1] += parseInt(answerInArray[answerInArray.length - i].toString().substring(0, answerInArray[answerInArray.length - i].toString().length - 7))
      } else {
        answerIn7DigitBlocksArray[0] = answerInArray[0]
      }

    if (isASingleDigit) { answerIn7DigitBlocksArray[answerIn7DigitBlocksArray.length - 1] /= 10 }
    if (isBSingleDigit) { answerIn7DigitBlocksArray[answerIn7DigitBlocksArray.length - 1] /= 10 }

    return answerIn7DigitBlocksArray.join('')
  }
}
