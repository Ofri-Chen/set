import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'time'
})
export class TimePipe implements PipeTransform {

  transform(seconds: any, args?: any): any {
    let hours = Math.floor(seconds / 3600);
    seconds = Math.floor(seconds % 3600);
    let minutes = Math.floor(seconds / 60);
    seconds = Math.floor(seconds % 60);
    
    return `${this.addLeadingZeros(hours)}:${this.addLeadingZeros(minutes)}:${this.addLeadingZeros(seconds)}`;
  }

  private addLeadingZeros(value) {
    return value.toString().length < 2 ? "0" + value : value;
  }

}
