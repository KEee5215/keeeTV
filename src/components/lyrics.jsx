import { useState, useEffect, useRef } from "react";
import { parseLRC } from "../service/handleLRC";
import "../style/lyrics.css";
import { useNavigate } from "react-router";

function Lyrics() {
  const navigate = useNavigate();

  const [parsedLyrics, setParsedLyrics] = useState([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const lrcText = localStorage.getItem("currentLyrics");
    if (lrcText) {
      const parsed = parseLRC(JSON.parse(lrcText).syncedLyrics);
      console.log("parsedLyrics:", parsed);
      setParsedLyrics(parsed);

      // 计算音频需要的总时长（最后一行歌词的时间 + 5秒缓冲）
      const totalDuration =
        parsed.length > 0 ? parsed[parsed.length - 1].time + 5 : 60; // 默认60秒

      // 设置音频源（这里需要一个静音音频文件）
      // 你可以准备一个 silence.mp3 放在 public 文件夹
      if (audioRef.current) {
        audioRef.current.src = "/silence.mp3"; // 或者在线URL
      }
    }
  }, []);

  // 监听音频播放进度
  function handleTimeUpdate(e) {
    const currentTime = e.target.currentTime;

    // 找到当前时间对应的歌词行
    const index = parsedLyrics.findIndex((line, i) => {
      const nextLine = parsedLyrics[i + 1];
      return (
        currentTime >= line.time && (!nextLine || currentTime < nextLine.time)
      );
    });

    if (index !== -1 && index !== currentLineIndex) {
      setCurrentLineIndex(index);

      // 自动滚动到当前行
      const element = document.getElementById(`line-${index}`);
      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }
  }

  // 播放/暂停控制
  function togglePlay() {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  }

  // 点击歌词跳转到对应时间
  function handleLineClick(index) {
    const targetTime = parsedLyrics[index].time;
    if (audioRef.current) {
      audioRef.current.currentTime = targetTime;
      setCurrentLineIndex(index);

      // 滚动到该行
      const element = document.getElementById(`line-${index}`);
      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }
  }
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("用户选择了音频文件:", file.name);
      const audioUrl = URL.createObjectURL(file);

      if (audioRef.current) {
        audioRef.current.src = audioUrl;
        // 重置状态，准备从头播放
        setCurrentLineIndex(0);
        setIsPlaying(true); // 标记为正在播放

        // 尝试播放
        audioRef.current.play().catch((err) => {
          console.error("自动播放失败，可能需要用户交互:", err);
        });
      }
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      const totalDuration = audioRef.current.duration;
      console.log("音频总时长:", totalDuration, "秒");
    }
  };
  return (
    <div className="lyrics-page">
      {/* 隐藏的音频元素 */}
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata} // 添加这一行
        onEnded={() => setIsPlaying(false)}
      />
      <input type="file" accept="audio/*" onChange={handleFileUpload}></input>

      {/* 控制按钮 */}
      <div className="controls">
        <button onClick={togglePlay}>{isPlaying ? "暂停" : "播放"}</button>
        <span>{parsedLyrics[currentLineIndex]?.text}</span>
      </div>

      {/* 歌词列表 */}
      <div className="lyrics-container">
        {parsedLyrics.map((line, index) => (
          <div
            key={index}
            id={`line-${index}`}
            className={`lyric-line ${index === currentLineIndex ? "active" : ""}`}
            onClick={() => handleLineClick(index)}
          >
            <span className="time">
              {Math.floor(line.time / 60)
                .toString()
                .padStart(2, "0")}
              :{(line.time % 60).toFixed(2).padStart(5, "0")}
            </span>
            <span className="text">{line.text}</span>
          </div>
        ))}
      </div>
      <button
        style={{ position: "fixed", right: "5px", top: "5px", width: "50px" }}
        onClick={() => navigate("/")}
      >
        返回
      </button>
    </div>
  );
}

export default Lyrics;
