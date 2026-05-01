import { useEffect } from "react";
import { useState } from "react";

export function Field(props) {
  const [baseUrl, setBaseUrl] = useState("");
  const [model, setModel] = useState("");
  const [apiKey, setApiKey] = useState("");

  //   console.log(props);
  function handleSubmit(e) {
    e.preventDefault();
    // console.log(baseUrl, model, apiKey);
    // 储存到localStorage
    localStorage.setItem("baseUrl", baseUrl);
    localStorage.setItem("model", model);
    localStorage.setItem("apiKey", apiKey);
  }

  useEffect(() => {
    // 从localStorage中获取数据
    const baseUrl = localStorage.getItem("baseUrl");
    const model = localStorage.getItem("model");
    const apiKey = localStorage.getItem("apiKey");

    if (baseUrl) {
      setBaseUrl(baseUrl);
    }
    if (model) {
      setModel(model);
    }
    if (apiKey) {
      setApiKey(apiKey);
    }
  }, []);

  return (
    <>
      <div
        className="field"
        style={{ display: props.isShow ? "flex" : "none" }}
      >
        <div onClick={props.close} className="close">
          X
        </div>
        <label>Base URL</label>
        <input
          type="text"
          value={baseUrl}
          onChange={(e) => setBaseUrl(e.target.value)}
        ></input>

        <label>Model</label>
        <input
          type="text"
          value={model}
          onChange={(e) => setModel(e.target.value)}
        ></input>

        <label>API Key</label>
        <input
          type="password"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
        ></input>
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </>
  );
}
