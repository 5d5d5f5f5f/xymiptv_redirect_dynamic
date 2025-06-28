const PASSWORD = "1215";
const TXT_URLS = [
  "https://123.tv1288.xyz/10.txt",
  "http://rihou.cc:555/gggg.nzk"
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
  const timestamp = Date.now();

  const responses = await Promise.all(TXT_URLS.map(url => fetch(url).then(r => r.text()).catch(() => "")));
  const combinedLines = responses.join("\n").split("\n").map(l => l.trim()).filter(Boolean);

  for (const line of combinedLines) {
    if (line.endsWith(",#genre#")) {
      output += `${line}\n`;
    } else if (line.includes(",")) {
      const [name, realUrl] = line.split(",");
      index++;
      output += `${name},${location.origin}/player.html?i=${index}&t=${timestamp}\n`;
    }
  }

  document.getElementById("result").textContent = output;
}