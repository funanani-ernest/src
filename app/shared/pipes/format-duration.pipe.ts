import { Pipe, PipeTransform } from '@angular/core';
import { toNumber } from 'lodash';

@Pipe({
  name: 'formatDuration'
})
export class FormatDurationPipe implements PipeTransform {
  getTimeFormat(timesplit: Array<string>): string {
    const [hours, minutes, _] = timesplit

    let timerFormat = ``

    if (toNumber(hours) > 0)
      timerFormat += `${toNumber(hours)} hr `

    if (toNumber(minutes) > 0)
      timerFormat += `${toNumber(minutes)} min`

    return timerFormat;
  }

  transform(value: string, ...args: unknown[]): unknown {
    return this.getTimeFormat(value.split(':'));
  }
}
