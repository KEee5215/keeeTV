// 移除不需要的导入

/**
 * 获取歌曲的LRC歌词
 * @param {string} songName - 歌曲名称
 * @param {string} singerName - 歌手名称
 * @returns {Promise<string>} 返回LRC格式的歌词文本
 */
async function getLRC(songName, singerName) {
  try {
    // 调试：打印请求参数
    const apiKey = localStorage.getItem("apiKey");
    const baseURL =
      localStorage.getItem("baseURL") ||
      "https://dashscope.aliyuncs.com/compatible-mode/v1";
    const model = localStorage.getItem("model") || "qwen-plus";

    console.log("=== 请求参数 ===");
    console.log(
      "API Key:",
      apiKey ? `${apiKey.substring(0, 10)}...` : "未设置",
    );
    console.log("Base URL:", baseURL);
    console.log("Model:", model);
    console.log("歌曲:", songName);
    console.log("歌手:", singerName);

    // 构建请求数据
    const requestData = {
      model: model,
      messages: [
        {
          role: "user",
          content: `请输出歌手 ${singerName} 的歌曲《${songName}》的track_name,artist_name,album_name,duration,以JSON格式返回,字段类型分别是string,string,string,number。请不要返回其他内容。`,
        },
      ],
    };

    console.log("请求体:", JSON.stringify(requestData));

    const fullURL = baseURL + "/chat/completions";
    console.log("完整URL:", fullURL);

    // 发送请求
    console.log("开始发送请求...");
    const response = await fetch(fullURL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });

    console.log("响应状态:", response.status);
    console.log("响应头:", response.headers);

    // 检查响应状态
    if (!response.ok) {
      const errorText = await response.text();
      console.error("错误响应内容:", errorText);
      throw new Error(
        `HTTP error! status: ${response.status}, message: ${errorText}`,
      );
    }

    const data = await response.json();
    // console.log("完整响应数据:", data);

    // 提取并返回歌词内容
    const songMeta = data.choices[0].message.content;
    console.log("获取到的歌曲信息:", songMeta);
    return songMeta;
  } catch (error) {
    console.error("获取meta失败:", error);
    console.error("错误堆栈:", error.stack);
    throw error;
  }
}

async function fetchLRC(songMeta) {
  console.log("开始获取歌词...");
  console.log("歌曲信息:", songMeta);
  const res = await fetch(
    `https://lrclib.net/api/get?artist_name=${songMeta.artist_name}&track_name=${songMeta.track_name}&album_name=${songMeta.album_name}&duration=${songMeta.duration}`,
  );
  console.log("获取歌词的响应:", res);
  return await res.json();
}

export { getLRC, fetchLRC };
