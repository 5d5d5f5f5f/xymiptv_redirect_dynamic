const PASSWORD = "1215";
const TXT_URLS = [
  "data/10.txt",
  "data/gggg.nzk"
];

function verify() {
  const input = document.getElementById("pwd").value.trim();
  if (input !== PASSWORD) {
    alert("密码错误，请关注潇雨萌萌获取新密码！");
    return;
  }
  loadChannels();
}

async function loadChannels() {
  let output = "";
  let index = 0;
  const timestamp = Math.floor(Date.now());
  window.channelMap = []; // 存储频道名和URL对应关系

  for (const url of TXT_URLS) {
    try {
      const res = await fetch(url);
      const text = await res.text();
      const lines = text.split("\n").map(line => line.trim()).filter(Boolean);
      for (const line of lines) {
        if (line.endsWith(",#genre#")) {
          output += `${line}\n`;
        } else {
          const [name, realUrl] = line.split(",");
          index++;
          channelMap[index] = { name, realUrl };
          output += `${name},${location.origin}/player.html?i=${index}&t=${timestamp}\n`;
        }
      }
    } catch (e) {
      output += `加载失败: ${url}\n`;
    }
  }

  document.getElementById("result").textContent = output;
}