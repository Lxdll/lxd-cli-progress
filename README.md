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

TODO:
1. 发布包
2. 支持多个 progress