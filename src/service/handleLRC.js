//解析lrc歌词文本
// 输入：LRC 文本字符串
// 输出：数组 [{ time: 12.34, text: "第一句歌词" }, ...]

export function parseLRC(lrcText) {
  const lines = lrcText.split("\n");
  const result = [];

  lines.forEach((line) => {
    // 用正则表达式匹配 [mm:ss.xx] 格式
    const match = line.match(/\[(\d{2}):(\d{2})\.(\d{2,3})\](.*)/);
    if (match) {
      const minutes = parseInt(match[1]);
      const seconds = parseInt(match[2]);
      const milliseconds = parseInt(match[3]);
      const text = match[4];

      // 转换成秒数
      const time = minutes * 60 + seconds + milliseconds / 100;

      result.push({ time, text });
    }
  });

  return result;
}
