# lxd-cli-progress
实现一个 cli-progress

```typescript
import cliProgress from 'lxd-cli-progress';

// create a new progress bar instance.
const bar = new cliProgress({ cursorHide: true });

// start the progress bar with a total value of 100 and start value of 0.
bar.start(100, 0);

// update the current value in your application.
bar.update(100);

// stop the progress bar.
bar.stop();
```

# 实现思路
- 依赖 `ansi-escapes` 这个库：
  - 在控制台开始绘制时，我们使用 `ansiEscapes.cursorSavePosition` 保存光标的起始位置，并且使用 `ansiEscapes.cursorHide` 来隐藏光标。
  - 每次绘制时，我们使用 `ansiEscapes.cursorRestorePosition)` 来恢复光标的位置。
  - 在最后 `stop` 执行后，我们使用 `ansiEscapes.cursorShow` 将光标进行显示，并且使用 `process.stdout.write(EOL);` 进行换行操作。

- 显示已经下载的部分，我们使用 `█` 这个字符进行 repeat，未下载的部分，我们使用 `░` 这个字符进行 repeat。
- 字符总数为 `40`, 按当前值和总和的比例进行两个字符的绘制。

TODO:
1. 发布包
2. 支持多个 progress