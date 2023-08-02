import { Pipe, PipeTransform } from '@angular/core';
import { toNumber } from 'lodash';

@Pipe({
  name: 'formatRemainingTime'
})
export class FormatRemainingTimePipe implements PipeTransform {
  getTimeFormat(timesplit: Array<string>): string {
    const [hours, minutes, seconds] = timesplit

    let timerFormat = ``

    if (toNumber(hours) > 0)
      timerFormat += `${toNumber(hours)} hr ${toNumber(minutes)} min `
    else if (toNumber(minutes) > 0)
      timerFormat += `${toNumber(minutes)} min `

    timerFormat += `${toNumber(seconds)} sec`

    return timerFormat;
  }

  transform(value: string, ...args: unknown[]): unknown {
    return this.getTimeFormat(value.split(':'));
  }

}
