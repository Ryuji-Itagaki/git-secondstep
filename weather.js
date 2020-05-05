"use strcit";

const axios = require("axios");
const fs = require("fs"); //注: npm i 不要

//データ更新関数
async function updateData(newData) {
  const PATH = "./docs/data.json";
  fs.writeFileSync(PATH, JSON.stringify(newData));
}

// 実際にデータを取得する getRequest 関数
async function getRequest() {
  let response;
  try {
    response = await axios.get("http://weather.livedoor.com/forecast/webservice/json/v1?city=130010");

    let weatherData = response.data;
    
    let jikan = new Date().getTime(); // タイムスタンプを呼ぶので常に変わる

    const saveData = {
      date: jikan,
      msg: weatherData,
    };

    await updateData(saveData); //データ更新関数を実行
  } catch (error) {
    console.error(error);
  }
}

// getRequest を呼び出してデータを読み込む
getRequest();