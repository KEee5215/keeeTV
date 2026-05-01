import { useState } from "react";
import "../style/home.css";
import { MoreIcon } from "./moreIcon";
import { Field } from "./filed";
import { getLRC, fetchLRC } from "../service/getLRC";
import { useNavigate } from "react-router";
function Home() {
  const navigate = useNavigate();
  const [isShow, setIsShow] = useState(false);

  const [songName, setSongName] = useState("");
  const [singerName, setSingerName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function showField() {
    console.log("showField");
    //设置field类的display属性为block
    setIsShow(() => !isShow);
  }

  async function getLyricsMeta() {
    try {
      if (!songName || !singerName) {
        alert("请输入歌曲名和歌手名");
        return;
      }
      // 跳转到歌词页面
      if (isLoading) return; // 防止重复触发

      setIsLoading(true); // 1. 锁定按钮

      const songMeta = await getLRC(songName, singerName);
      localStorage.setItem("currentSongMeta", songMeta);

      console.log(songMeta);
      const lrc = await fetchLRC(JSON.parse(songMeta));
      localStorage.setItem("currentLyrics", JSON.stringify(lrc));
      console.log(lrc);

      navigate("/lrc");
    } catch (error) {
      console.error("获取meta失败", error);
    } finally {
      setIsLoading(false); // 3. 无论成败，都解锁按钮
    }
  }

  return (
    <>
      <MoreIcon onClick={showField} className="more-icon"></MoreIcon>
      <Field isShow={isShow} close={showField}></Field>

      <div className="container">
        <h1 className="h1">你的智能提词器</h1>
        <label className="title">歌曲名</label>
        <input
          type="text"
          name="songName"
          id="songName"
          placeholder="例:爱在西元前"
          value={songName}
          onChange={(e) => setSongName(e.target.value)}
        />
        <label className="title">歌手名</label>
        <input
          type="text"
          name="singerName"
          id="singerName"
          placeholder="例:周杰伦"
          value={singerName}
          onChange={(e) => setSingerName(e.target.value)}
        />
        <button className="button" onClick={getLyricsMeta} disabled={isLoading}>
          {isLoading ? "Loading..." : "点击开始获取歌词"}
        </button>

        <button className="button" onClick={() => navigate("/lrc")}>
          点播最近一次的歌曲
        </button>
      </div>

      <div className="gif-animation"></div>
    </>
  );
}

export default Home;
