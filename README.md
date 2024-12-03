
# Youtube 字幕同步工具

這是一個基於 **Electron** 的字幕同步工具，可用於與 YouTube 影片同步顯示字幕。適合用於 OBS 直播或錄製。

## 功能特性

- 支援 YouTube 網址播放影片。
- 可匯入 `.srt` 字幕檔案，並根據影片播放時間顯示字幕。
- 字幕樣式支援日文字體 **Noto Serif JP**，並包含黑色外框。
- 可選擇透明或綠色背景，方便在 OBS 中進行 Chroma Key 抠像。

---

## 預覽

### 主視窗
- 用於輸入 YouTube 網址及匯入字幕檔案。

### 字幕視窗
- 動態同步字幕，顯示於頁面底部。
- 支援字體外框與多行字幕。

---

## 製作過程直播連結

- [https://yutaii.run/v/705](https://yutaii.run/v/705)

---

## 下載點

- [https://github.com/YuutaTsubasa/YoutubeSubtitleDisplayer/releases](https://github.com/YuutaTsubasa/YoutubeSubtitleDisplayer/releases)

---

## 安裝與運行

### 1. 環境需求
- **Node.js**：請先安裝 [Node.js](https://nodejs.org/)（建議使用 LTS 版本）。
- **npm** 或 **yarn**：Node.js 安裝後會附帶 `npm`，也可選擇安裝 `yarn`。

### 2. 專案克隆
使用 Git 將此專案克隆到本地：
```bash
git clone https://github.com/YuutaTsubasa/YoutubeSubtitleDisplayer.git
cd YoutubeSubtitleDisplayer
```

### 3. 安裝依賴
在專案目錄中執行以下指令安裝所需依賴：
```bash
npm install
```

### 4. 運行專案
啟動應用：
```bash
npx electron .
```

---

## 使用方法

1. 啟動應用後，主視窗會顯示輸入欄位與按鈕：
   - 輸入 YouTube 網址。
   - 點擊「匯入字幕檔案」按鈕，選擇 `.srt` 文件。
2. 點擊「開始」按鈕後：
   - 一個視窗顯示 YouTube 影片。
   - 另一個視窗顯示同步的字幕內容。
3. 在 OBS 中：
   - 新增「視窗擷取」，選擇字幕視窗。
   - 新增「色度鍵」過濾器過濾背景。

---

## 常見問題

### 1. 如何調整字幕樣式？
- 編輯 `subtitles.html` 中的 `<style>` 區塊。
- 可調整字體大小、顏色、外框或背景透明度。

### 2. 為什麼字幕沒有正確同步？
- 確保 `.srt` 檔案格式正確，並使用內建的 `SrtParser` 驗證格式。
- 檢查影片的播放時間與字幕時間是否一致。

---

## 貢獻

歡迎對本專案提出問題或進行改進：
1. Fork 此專案。
2. 建立新分支進行修改。
3. 提交 Pull Request。

---

## 聯絡方式

如有問題，歡迎聯絡開發者：
- **Email**: [yuuta.tsubasa.knight@gmail.com](mailto://yuuta.tsubasa.knight@gmail.com)
- **Website**: [https://yuuta-tsubasa.studio/](https://yuuta-tsubasa.studio/)
