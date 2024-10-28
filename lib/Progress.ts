import ansiEscapes from 'ansi-escapes';
import { EOL } from 'os';

interface Props {
  cursorHide?: boolean;
}

const write = process.stdout.write.bind(process.stdout);
const BAR_SIZE = 40;
const BAR_COMPLETE_CHAR = '\u2588';
const BAR_INCOMPLETE_CHAR = '\u2591';

class Progress {
  private _cursorHide: boolean = true;
  private _total: number = 0;
  private _val: number = 0;

  constructor(props: Props) {
    const { cursorHide = true } = props;

    this._cursorHide = cursorHide;
  }

  start (total: number, initVal: number) {
    this._total = total;
    this._val = initVal;
    
    this._cursorHide && write(ansiEscapes.cursorHide);
    write(ansiEscapes.cursorSavePosition);

    this.render();
  }

  render () {
    write(ansiEscapes.cursorRestorePosition);

    let percent = this._val / this._total;
    if (percent < 0) {
      percent = 0;
    } else if (percent > 1) {
      percent = 1;
    }

    const completedCharCount = Math.floor(percent * BAR_SIZE);

    const completed = BAR_COMPLETE_CHAR.repeat(completedCharCount);
    const uncompleted = BAR_INCOMPLETE_CHAR.repeat(BAR_SIZE - completedCharCount);

    write(completed + uncompleted);
  }

  update (val: number) {
    this._val = val;

    this.render();
  }

  stop () {
    write(ansiEscapes.cursorShow);
    write(EOL);
  }
}

export default Progress;