class SrtParser {
    parse(srt) {
      const lines = srt.split(/\r?\n/); // 處理不同的換行符
      const result = [];
      let entry = null;
  
      lines.forEach((line) => {
        // 如果是新的字幕塊
        if (/^\d+$/.test(line)) {
          if (entry) {
            result.push(entry); // 將前一個條目加入結果
          }
          entry = { id: parseInt(line, 10), text: '' }; // 初始化新條目
        }
        // 如果是時間範圍
        else if (line.includes('-->')) {
          if (entry) {
            const [start, end] = line.split('-->').map((t) => this.timeToSeconds(t.trim()));
            entry.start = start;
            entry.end = end;
          }
        }
        // 處理字幕文字（可能是多行）
        else if (line.trim() !== '') {
          if (entry) {
            entry.text += (entry.text ? '\n' : '') + line.trim(); // 保留多行文字
          }
        }
      });
  
      // 將最後一個條目加入結果
      if (entry) {
        result.push(entry);
      }
  
      return result;
    }
  
    timeToSeconds(time) {
      const [hours, minutes, seconds] = time.split(':');
      const [sec, ms] = seconds.split(',');
      return (
        parseInt(hours, 10) * 3600 +
        parseInt(minutes, 10) * 60 +
        parseInt(sec, 10) +
        parseInt(ms, 10) / 1000
      );
    }
  }
  
  module.exports = SrtParser;