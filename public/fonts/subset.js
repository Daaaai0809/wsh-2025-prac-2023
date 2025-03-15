const fs = require('fs');
const subsetFont = require('subset-font');

// サブセット化する対象の文章（各フォントごとに）
const boldText = "ページが存在しません";
const regularText = "Not Found このサイトは架空のサイトであり、商品が発送されることはありません";

// 入力フォントファイルのパス
const boldFontPath = './NotoSerifJP-Bold.otf';
const regularFontPath = './NotoSerifJP-Regular.otf';

// 出力先の woff2 フォントファイルのパス
const boldOutputPath = './NotoSerifJP-Bold-subset.woff2';
const regularOutputPath = './NotoSerifJP-Regular-subset.woff2';

// サブセット化と書き出しを行う関数
(async () => {
    const boldFont = fs.readFileSync(boldFontPath);
    const regularFont = fs.readFileSync(regularFontPath);

    const boldSubset = await subsetFont(boldFont, boldText);
    fs.writeFileSync(boldOutputPath, boldSubset);
    
    const regularSubset = await subsetFont(regularFont, regularText);
    fs.writeFileSync(regularOutputPath, regularSubset);
})();
