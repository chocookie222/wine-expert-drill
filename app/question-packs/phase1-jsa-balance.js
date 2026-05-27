(function () {
  window.QUESTION_PACKS = window.QUESTION_PACKS || [];

  const questions = [];
  const noteFor = (choice) => `${choice}は別の重要事項として整理します。`;
  const notes = (choices, answer, note) => choices.map((choice, index) => index === answer ? note : noteFor(choice));
  const choices = (answer, wrongs) => [answer, ...wrongs.filter((item) => item !== answer).slice(0, 3)];
  const slug = (text) => text.toLowerCase().replace(/[^a-z0-9ぁ-んァ-ン一-龥]+/g, "-").replace(/^-|-$/g, "");

  function add(id, category, question, answer, wrongs, note, importance = "B") {
    const list = choices(answer, wrongs);
    questions.push({
      id: `phase1-jsa-balance-${id}`,
      category,
      importance,
      question,
      choices: list,
      answer: 0,
      note,
      choiceNotes: notes(list, 0, note)
    });
  }

  function expand(category, prefix, rows, target, aCount) {
    let count = 0;
    let cursor = 0;
    while (count < target) {
      const row = rows[cursor % rows.length];
      const imp = count < aCount ? "A" : "B";
      const base = `${prefix}-${slug(row[0])}-${Math.floor(cursor / rows.length)}`;
      add(`${base}-a`, category, `${row[0]}として適切なものは？`, row[1], row[2], row[3], imp);
      count += 1;
      if (count >= target) break;
      add(`${base}-b`, category, `${row[1]}と最も結びつきが強いものは？`, row[0], rows.filter((item) => item[1] !== row[1]).map((item) => item[0]), row[3], imp);
      count += 1;
      cursor += 1;
    }
  }

  expand("日本", "jp", [
    ["甲州の主要産地", "山梨県", ["北海道", "長野県", "山形県"], "甲州は山梨県を代表する白ブドウ品種です。"],
    ["マスカット・ベーリーAの交配者", "川上善兵衛", ["麻井宇介", "土屋守", "大村春夫"], "マスカット・ベーリーAは川上善兵衛によって交配されました。"],
    ["GI山梨の位置づけ", "日本ワインの地理的表示", ["スペインの熟成表示", "ドイツの糖度等級", "シャンパーニュの製法"], "GI山梨は日本ワインの地理的表示として重要です。"],
    ["北海道で重要な冷涼地品種", "Zweigelt", ["Nebbiolo", "Tempranillo", "Carmenere"], "北海道では冷涼地に適した Zweigelt などを整理します。"],
    ["長野県で重要なワインバレー", "千曲川ワインバレー", ["Hunter Valley", "Napa Valley", "Mosel"], "長野県では千曲川ワインバレーなどの産地理解が重要です。"],
    ["山形県の位置づけ", "日本ワインの重要産地", ["イタリアのD.O.C.G.", "ドイツのAnbaugebiet", "スペインのD.O.Ca."], "山形県は日本ワインの重要産地として整理します。"],
    ["甲州の果皮色", "灰色がかった淡い赤紫色", ["濃い黒紫色", "透明に近い緑色", "黄色がかった褐色"], "甲州は白ブドウですが、果皮は灰色がかった淡い赤紫色を帯びます。"],
    ["日本ワインの定義", "国内収穫ブドウを国内で醸造", ["輸入濃縮果汁を国内で瓶詰め", "海外ワインを国内で販売", "米を主原料に醸造"], "日本ワインは国内収穫ブドウを国内で醸造した果実酒です。"],
    ["余市町で重要な気候条件", "冷涼で昼夜の寒暖差がある", ["熱帯性で雨季が長い", "砂漠性で高温乾燥のみ", "海洋性で年較差がほぼない"], "北海道の余市町は冷涼な気候を活かす産地として重要です。"],
    ["マスカット・ベーリーAの分類", "黒ブドウ品種", ["白ブドウ品種", "台木専用品種", "食用専用品種"], "マスカット・ベーリーAは日本で重要な黒ブドウ品種です。"],
    ["甲州のワインで整理したい特徴", "繊細な香味と穏やかな酸", ["強いタンニンと高アルコール", "酒精強化が必須", "瓶内二次発酵専用"], "甲州は繊細な香味を持つ日本の代表的白ブドウ品種です。"],
    ["長野県の主要産地理解", "標高差を活かした栽培", ["海抜ゼロメートルの湿地栽培", "熱帯雨林での栽培", "ソレラ熟成が中心"], "長野県は標高差や冷涼さを活かす産地として整理します。"],
    ["山梨県で特に重要な白品種", "甲州", ["Albariño", "Palomino", "Glera"], "山梨県では甲州の産地・品種理解が頻出です。"],
    ["北海道で増えている欧州系品種", "Pinot Noir", ["Airen", "Monastrell", "Palomino"], "北海道では冷涼性を活かした Pinot Noir などの栽培が重要です。"]
  ], 42, 10);

  expand("ドイツ", "de", [
    ["Moselで最重要の品種", "Riesling", ["Chardonnay", "Viura", "Furmint"], "Mosel は冷涼な急斜面と Riesling で重要です。"],
    ["Rheingauで重要な品種", "Riesling", ["Palomino", "Glera", "Airen"], "Rheingau は Riesling の銘醸地として整理します。"],
    ["Ahrで重要な黒ブドウ品種", "Spatburgunder", ["Dornfelder", "Portugieser", "Lemberger"], "Ahr は Spatburgunder の赤で重要です。"],
    ["Frankenで重要な品種", "Silvaner", ["Riesling", "Muller-Thurgau", "Kerner"], "Franken は Silvaner とボックスボイテルで整理します。"],
    ["Pradikatsweinで最高糖度の等級", "Trockenbeerenauslese", ["Kabinett", "Spatlese", "Auslese"], "Trockenbeerenauslese はプレディカーツヴァインで最も糖度が高い等級です。"],
    ["辛口表示", "Trocken", ["Doux", "Seco", "Amabile"], "Trocken はドイツ語の辛口表示です。"],
    ["Muller-Thurgauの別名", "Rivaner", ["Spatburgunder", "Weissburgunder", "Grauburgunder"], "Muller-Thurgau は Rivaner とも呼ばれます。"],
    ["Badenの気候上の特徴", "ドイツの中では温暖", ["最北で極寒", "熱帯性", "雨季だけで栽培"], "Baden はドイツの中では温暖な産地として整理します。"],
    ["Naheの位置づけ", "多様な土壌を持つRiesling産地", ["Sherryの産地", "Portの産地", "Cavaの中心地"], "Nahe は Riesling と多様な土壌で整理します。"],
    ["Pfalzの特徴", "温暖で生産量も多い産地", ["極端に冷涼な北端産地", "酒精強化ワイン専用産地", "海洋性の島しょ産地"], "Pfalz はドイツの中では温暖で重要な産地です。"],
    ["Rheinhessenの位置づけ", "ドイツ最大級の生産地域", ["最小の単一畑", "スペインのD.O.Ca.", "フランスのGrand Cru"], "Rheinhessen はドイツの主要生産地域として重要です。"],
    ["Spatburgunderの意味", "Pinot Noir", ["Syrah", "Merlot", "Gamay"], "Spatburgunder はドイツにおける Pinot Noir の名称です。"],
    ["Weissburgunderの意味", "Pinot Blanc", ["Pinot Gris", "Chardonnay", "Sauvignon Blanc"], "Weissburgunder は Pinot Blanc のドイツ語名です。"],
    ["Grauburgunderの意味", "Pinot Gris", ["Pinot Blanc", "Riesling", "Silvaner"], "Grauburgunder は Pinot Gris のドイツ語名です。"]
  ], 41, 10);

  expand("スペイン", "es", [
    ["Riojaの中心品種", "Tempranillo", ["Albarino", "Palomino", "Verdejo"], "Rioja の赤は Tempranillo と熟成表示が重要です。"],
    ["Ribera del Dueroの品種名", "Tinto Fino", ["Palomino", "Airen", "Godello"], "Ribera del Duero では Tempranillo 系の Tinto Fino を整理します。"],
    ["Rias Baixasの主要品種", "Albarino", ["Verdejo", "Macabeo", "Bobal"], "Rias Baixas は Albarino の白で重要です。"],
    ["Jerezの主要品種", "Palomino", ["Tempranillo", "Garnacha", "Mencia"], "Jerez は Sherry と Palomino、ソレラシステムで整理します。"],
    ["Ruedaの主要品種", "Verdejo", ["Albarino", "Godello", "Airen"], "Rueda は Verdejo の白で重要です。"],
    ["Prioratの土壌", "Llicorella", ["Kimmeridgian", "Terra rossa", "Galestro"], "Priorat では Llicorella と呼ばれるスレート系土壌が重要です。"],
    ["Cavaの製法", "瓶内二次発酵", ["シャルマ方式", "ソレラ方式", "酒精強化"], "Cava は瓶内二次発酵で造られるスペインの発泡性ワインです。"],
    ["赤のGran Reserva最低熟成期間", "60カ月", ["24カ月", "36カ月", "18カ月"], "スペイン赤ワインの Gran Reserva は最低60カ月熟成が基本です。"],
    ["Toroで重要な品種", "Tinta de Toro", ["Albarino", "Palomino", "Parellada"], "Toro では Tempranillo 系の Tinta de Toro が重要です。"],
    ["Bierzoで重要な黒ブドウ品種", "Mencia", ["Bobal", "Airen", "Xarel-lo"], "Bierzo は Mencia の赤で整理します。"],
    ["Penedesと関係が深いワイン", "Cava", ["Port", "Sherry", "Tokaji"], "Penedes は Cava と結びつけて整理します。"],
    ["Prioratの格付け上の位置づけ", "D.O.Ca.", ["V.D.P.", "D.A.C.", "Q.m.P."], "Priorat は Rioja と並ぶスペインのD.O.Ca.として重要です。"],
    ["Rias Baixasが属する地方", "ガリシア地方", ["アンダルシア地方", "カスティーリャ・ラ・マンチャ", "カタルーニャ地方"], "Rias Baixas はガリシア地方の白ワイン産地です。"],
    ["Txakoliで重要な白品種", "Hondarrabi Zuri", ["Palomino", "Verdejo", "Macabeo"], "Txakoli では Hondarrabi Zuri を整理します。"]
  ], 36, 9);

  expand("アメリカ", "us", [
    ["A.V.A.が示すもの", "ブドウ栽培地域", ["糖度等級", "熟成期間表示", "瓶内二次発酵"], "A.V.A.はAmerican Viticultural Areasの略で、政府認定ブドウ栽培地域です。"],
    ["Napa Valleyで重要な品種", "Cabernet Sauvignon", ["Pinot Noir", "Riesling", "Albarino"], "Napa Valley は Cabernet Sauvignon で重要です。"],
    ["Russian River Valleyの位置", "Sonoma", ["Oregon", "New York", "Washington"], "Russian River Valley は Sonoma の冷涼系品種で重要なA.V.A.です。"],
    ["Willamette Valleyで重要な品種", "Pinot Noir", ["Cabernet Sauvignon", "Zinfandel", "Merlot"], "Willamette Valley は Oregon の Pinot Noir で重要です。"],
    ["Columbia Valleyの州", "Washington", ["California", "Oregon", "New York"], "Columbia Valley は Washington State の重要な広域A.V.A.です。"],
    ["Finger Lakesで重要な品種", "Riesling", ["Shiraz", "Glera", "Palomino"], "Finger Lakes は New York の冷涼産地で Riesling が重要です。"],
    ["Zinfandelと同一品種とされるもの", "Primitivo", ["Aglianico", "Corvina", "Nerello Mascalese"], "Zinfandel は Primitivo と同一品種とされます。"],
    ["California Central Coastで重要な理解", "冷涼から温暖まで多様なA.V.A.", ["ドイツの糖度等級", "スペインの熟成表示", "フランスのV.D.N."], "Central Coast は広域で、多様なA.V.A.を持つカリフォルニアの重要地域です。"],
    ["Sonomaで整理したい特徴", "冷涼から温暖まで多様なA.V.A.", ["全域が酒精強化専用", "ドイツの単一等級", "Cavaの中心地"], "Sonoma は海や霧の影響を含む多様なA.V.A.で重要です。"],
    ["Carnerosで重要な品種", "Pinot NoirとChardonnay", ["NebbioloとBarbera", "TempranilloとGarnacha", "PalominoとPedro Ximenez"], "Carneros は冷涼で Pinot Noir と Chardonnay が重要です。"],
    ["Paso Roblesの位置づけ", "Central Coastの温暖な産地", ["New Yorkの冷涼産地", "Oregonの北部産地", "Washingtonの広域A.V.A."], "Paso Robles は Central Coast の温暖なA.V.A.として整理します。"],
    ["Santa Barbaraで重要な冷涼品種", "Pinot Noir", ["Tannat", "Malbec", "Touriga Nacional"], "Santa Barbara は海風の影響を受ける冷涼産地として重要です。"],
    ["Oregonで最重要の産地", "Willamette Valley", ["Napa Valley", "Finger Lakes", "Columbia Valley"], "Willamette Valley は Oregon の Pinot Noir で最重要です。"],
    ["Washingtonで重要な広域A.V.A.", "Columbia Valley", ["Russian River Valley", "Carneros", "Santa Maria Valley"], "Columbia Valley は Washington の広域A.V.A.として頻出です。"]
  ], 38, 9);

  expand("ワイン概論 / 重要A", "gen", [
    ["海洋性気候の特徴", "年較差が小さく降水量が比較的多い", ["夏冬の差が極端に大きい", "夏に乾燥し冬に雨が多い", "年間を通じて高温多湿"], "海洋性気候は海の影響で年較差が緩和されます。"],
    ["大陸性気候の特徴", "夏冬の気温差が大きい", ["海の影響で年較差が小さい", "一年中雨季", "必ず灌漑不要"], "大陸性気候は夏冬の気温差が大きくなりやすい気候です。"],
    ["地中海性気候の特徴", "夏は乾燥し冬に降水が多い", ["年中高温多湿", "夏冬差がない", "降水が完全にない"], "地中海性気候は夏の乾燥と冬の降水が重要です。"],
    ["マロラクティック発酵の変化", "リンゴ酸が乳酸に変わる", ["乳酸がリンゴ酸に変わる", "糖が酒石酸に変わる", "酒石酸がアルコールになる"], "マロラクティック発酵ではリンゴ酸が乳酸に変わります。"],
    ["貴腐菌", "Botrytis cinerea", ["Saccharomyces cerevisiae", "Oenococcus oeni", "Brettanomyces"], "Botrytis cinerea は貴腐菌として甘口ワインに関わります。"],
    ["瓶内二次発酵の代表例", "Champagne", ["Cahors", "Barolo", "Sancerre"], "Champagne は瓶内二次発酵の理解が重要です。"],
    ["酒精強化ワインの代表例", "Port", ["Chablis", "Chianti Classico", "Vouvray"], "Port は酒精強化ワインとして整理します。"],
    ["フィロキセラ対策", "アメリカ系台木への接ぎ木", ["瓶内二次発酵", "澱引き", "清澄"], "フィロキセラ対策ではアメリカ系台木への接ぎ木が重要です。"],
    ["アルコール発酵で主に働くもの", "酵母", ["乳酸菌", "酢酸菌", "貴腐菌"], "アルコール発酵では酵母が糖をアルコールと二酸化炭素に変えます。"],
    ["白ワイン醸造で一般的に重視される操作", "低温発酵", ["長期果皮浸漬が必須", "酒精強化が必須", "炭酸ガス浸漬のみ"], "白ワインでは香りを保つため低温発酵が用いられることがあります。"],
    ["赤ワインの色素抽出に関わる工程", "果皮との接触", ["デゴルジュマン", "補糖禁止", "瓶内熟成のみ"], "赤ワインの色は果皮由来の成分抽出で理解します。"],
    ["瓶内二次発酵後の澱抜き", "デゴルジュマン", ["ピジャージュ", "ルモンタージュ", "マセラシオン"], "デゴルジュマンは瓶内二次発酵後の澱抜き工程です。"],
    ["補糖の目的", "発酵前の糖度を補う", ["酸を完全に消す", "タンニンを抽出する", "瓶内の澱を抜く"], "補糖はアルコール発酵前に糖度を補う操作です。"],
    ["酸化を抑える目的で使われるもの", "二酸化硫黄", ["酒石酸カルシウム", "糖蜜", "食塩"], "二酸化硫黄は酸化防止や微生物管理の目的で使われます。"]
  ], 38, 8);

  window.QUESTION_PACKS.push({
    id: "phase1-jsa-balance",
    title: "第1段階 JSA全体配分調整",
    phase: 1,
    questions
  });
})();
