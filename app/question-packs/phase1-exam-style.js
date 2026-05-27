(function () {
  window.QUESTION_PACKS = window.QUESTION_PACKS || [];

  const questions = [];
  const noteFor = (choice) => `${choice}は別の産地・品種・制度と結びつけて整理します。`;
  const choiceNotes = (choices, answer, note) => choices.map((choice, index) => index === answer ? note : noteFor(choice));
  const wrongChoices = (answer, wrongs) => [answer, ...wrongs.filter((item) => item !== answer).slice(0, 3)];

  function add(id, category, importance, question, choices, answer, note) {
    questions.push({
      id: `phase1-exam-style-${id}`,
      category,
      importance,
      question,
      choices,
      answer,
      note,
      choiceNotes: choiceNotes(choices, answer, note)
    });
  }

  const facts = [
    ["fr-bdx-left", "フランス / ボルドー", "A", "ボルドー左岸", "Cabernet Sauvignon", ["Merlot", "Pinot Noir", "Gamay"], "ボルドー左岸はCabernet Sauvignon主体になりやすく、メドックやグラーヴと結びつけます。"],
    ["fr-bdx-right", "フランス / ボルドー", "A", "ボルドー右岸", "Merlot", ["Cabernet Sauvignon", "Syrah", "Nebbiolo"], "ボルドー右岸はMerlot主体になりやすく、Saint-EmilionやPomerolが重要です。"],
    ["fr-sauternes", "フランス総まとめ", "A", "ボルドー甘口白", "Semillon主体の貴腐甘口白", ["Cabernet Sauvignon主体の辛口赤", "Chardonnay主体の瓶内二次発酵", "Grenache主体のロゼ"], "ボルドー甘口白はSemillon主体の貴腐甘口白を軸に整理します。"],
    ["fr-chablis", "フランス / ブルゴーニュ", "A", "Chablis", "Chardonnayと石灰質土壌", ["Pinot Noirと花崗岩", "Sauvignon Blancと火山性土壌", "Gamayと砂利質土壌"], "ChablisはChardonnayとキンメリジャン系石灰質土壌が重要です。"],
    ["fr-sancerre", "フランス / ロワール", "A", "Sancerre", "Sauvignon Blanc", ["Chenin Blanc", "Melon de Bourgogne", "Viognier"], "Sancerreはロワール上流のSauvignon Blancで重要です。"],
    ["fr-vouvray", "フランス / ロワール", "A", "Vouvray", "Chenin Blanc", ["Sauvignon Blanc", "Chardonnay", "Semillon"], "VouvrayはChenin Blancの白、甘口、発泡で整理します。"],
    ["fr-rhone-n", "フランス / ローヌ", "A", "北部ローヌの赤", "Syrah", ["Grenache", "Pinot Noir", "Cabernet Franc"], "北部ローヌの赤はSyrahを軸に判別します。"],
    ["fr-rhone-s", "フランス / ローヌ", "A", "南部ローヌ", "Grenache系ブレンド", ["Nebbiolo単一", "Riesling主体", "Palomino主体"], "南部ローヌはGrenacheを中心としたブレンドが重要です。"],
    ["it-barolo", "イタリア / ピエモンテ", "A", "Barolo", "Nebbiolo", ["Sangiovese", "Corvina", "Aglianico"], "BaroloはピエモンテのNebbioloから造られるD.O.C.G.です。"],
    ["it-chianti", "イタリア / トスカーナ", "A", "Chianti Classico", "Sangiovese", ["Nebbiolo", "Glera", "Nero d'Avola"], "Chianti ClassicoはトスカーナのSangioveseを軸に整理します。"],
    ["it-soave", "イタリア / ヴェネト", "A", "Soave", "Garganega", ["Glera", "Corvina", "Moscato Bianco"], "SoaveはヴェネトのGarganega主体の白です。"],
    ["it-amarone", "イタリア / ヴェネト", "A", "Amarone della Valpolicella", "陰干しブドウによる辛口赤", ["瓶内二次発酵の白", "貴腐甘口白", "酒精強化白"], "Amaroneは陰干しブドウから造るヴェネトの力強い辛口赤です。"],
    ["jp-koshu", "日本", "A", "甲州", "山梨県と結びつく白ブドウ", ["北海道の主要黒ブドウ", "スペインの酒精強化用品種", "南アフリカの交配品種"], "甲州は山梨県を代表する日本の白ブドウ品種です。"],
    ["jp-mba", "日本", "A", "マスカット・ベーリーA", "川上善兵衛が交配した黒ブドウ", ["ドイツの糖度等級", "フランスの格付け", "スペインの熟成表示"], "マスカット・ベーリーAは川上善兵衛による日本の重要な黒ブドウ品種です。"],
    ["de-mosel", "ドイツ", "A", "Mosel", "Rieslingと急斜面", ["Palominoとソレラ", "Gleraと発泡性ワイン", "Tannatと高タンニン赤"], "MoselはRieslingと急斜面の冷涼産地として重要です。"],
    ["de-ahr", "ドイツ", "B", "Ahr", "Spatburgunder", ["Riesling", "Silvaner", "Muller-Thurgau"], "AhrはドイツのSpatburgunderの赤で重要です。"],
    ["es-rioja", "スペイン", "A", "Rioja", "Tempranilloと熟成表示", ["Albarinoと海洋性白", "Palominoと酒精強化", "Verdejoと辛口白"], "RiojaはTempranilloと熟成表示を軸に整理します。"],
    ["es-rias", "スペイン", "A", "Rias Baixas", "Albarino", ["Tempranillo", "Palomino", "Garnacha"], "Rias Baixasはガリシア地方のAlbarinoの白で重要です。"],
    ["es-jerez", "スペイン", "A", "Jerez", "Palominoとソレラシステム", ["Nebbioloと長期熟成赤", "Gleraとシャルマ方式", "Chenin Blancと貴腐"], "JerezはSherry、Palomino、ソレラシステムを結びつけます。"],
    ["us-napa", "アメリカ", "A", "Napa Valley", "Cabernet Sauvignon", ["Pinot Noir", "Riesling", "Albarino"], "Napa ValleyはCabernet Sauvignonの産地として頻出です。"],
    ["us-willamette", "アメリカ", "A", "Willamette Valley", "OregonのPinot Noir", ["CaliforniaのZinfandel", "New YorkのRiesling", "WashingtonのMerlot"], "Willamette ValleyはOregonのPinot Noirで重要です。"],
    ["au-hunter", "オーストラリア", "B", "Hunter Valley", "Semillon", ["Nebbiolo", "Palomino", "Glera"], "Hunter ValleyはオーストラリアのSemillonで重要です。"],
    ["au-coonawarra", "オーストラリア", "B", "Coonawarra", "Terra rossaとCabernet Sauvignon", ["LlicorellaとGarnacha", "KimmeridgianとChardonnay", "火山性土壌とNerello Mascalese"], "CoonawarraはTerra rossaとCabernet Sauvignonで整理します。"],
    ["nz-marlborough", "ニュージーランド", "B", "Marlborough", "Sauvignon Blanc", ["Shiraz", "Palomino", "Nebbiolo"], "MarlboroughはニュージーランドのSauvignon Blancで重要です。"],
    ["cl-carmenere", "チリ", "B", "Carmenere", "チリで重要な黒ブドウ", ["ウルグアイのTannat", "アルゼンチンのMalbec", "ドイツのRiesling"], "Carmenereはチリで重要な黒ブドウ品種です。"],
    ["ar-malbec", "アルゼンチン", "B", "Mendoza", "Malbecと高標高産地", ["Tannatと海洋性産地", "Pinotageと地中海性産地", "Gleraと発泡性ワイン"], "MendozaはアルゼンチンのMalbecと高標高の理解が重要です。"],
    ["za-pinotage", "南アフリカ", "B", "Pinotage", "南アフリカの代表的黒ブドウ", ["チリの代表的黒ブドウ", "日本の白ブドウ", "スペインの酒精強化用品種"], "Pinotageは南アフリカで重要な黒ブドウ品種です。"],
    ["pt-douro", "ポルトガル", "B", "Douro", "PortとTouriga Nacional", ["SherryとPalomino", "CavaとXarel-lo", "TokajiとFurmint"], "DouroはPortとポルトガル品種の理解が重要です。"],
    ["at-wachau", "オーストリア", "B", "Wachau", "Gruner VeltlinerとRiesling", ["PalominoとPedro Ximenez", "GleraとCorvina", "TannatとMalbec"], "WachauはオーストリアのGruner VeltlinerやRieslingで重要です。"],
    ["gr-santorini", "ギリシャ", "C", "Santorini", "Assyrtikoと火山性土壌", ["Garganegaと石灰質土壌", "Rieslingとスレート土壌", "Sangioveseと粘土石灰質"], "SantoriniはAssyrtikoと火山性土壌で整理します。"],
    ["gen-oceanic", "ワイン概論 / 気候", "A", "海洋性気候", "年較差が小さく降水量が比較的多い", ["夏冬差が大きい", "夏は乾燥し冬に降水が多い", "降水がほぼない"], "海洋性気候は海の影響で年較差が緩和されます。"],
    ["gen-continental", "ワイン概論 / 気候", "A", "大陸性気候", "夏冬の気温差が大きい", ["年較差が小さい", "年間を通じて高温多湿", "海風で常に温暖"], "大陸性気候は夏冬の気温差が大きくなりやすい気候です。"],
    ["gen-med", "ワイン概論 / 気候", "A", "地中海性気候", "夏は乾燥し冬に降水が多い", ["一年中雨季", "夏冬差がない", "極端な寒冷気候"], "地中海性気候は夏の乾燥と冬の降水が重要です。"],
    ["gen-phylloxera", "ワイン概論 / 歴史", "A", "フィロキセラ被害への対応", "アメリカ系台木への接ぎ木", ["瓶内二次発酵", "ソレラシステム", "長期瓶熟成"], "フィロキセラ対策ではアメリカ系台木への接ぎ木が重要です。"],
    ["gen-fortified", "ワイン概論 / 醸造", "B", "酒精強化ワイン", "PortやSherry", ["ChablisやSancerre", "BaroloやBrunello", "MuscadetやSoave"], "酒精強化ワインはPortやSherryなどで整理します。"],
    ["gen-carbonic", "ワイン概論 / 醸造", "B", "マセラシオン・カルボニック", "ボージョレで知られる醸造法", ["貴腐甘口白の必須条件", "瓶内二次発酵の澱抜き", "酒精強化の添加工程"], "マセラシオン・カルボニックはボージョレなどで知られる醸造法です。"],
    ["gen-mlf", "ワイン概論 / 重要A", "A", "マロラクティック発酵", "リンゴ酸が乳酸に変わる", ["糖がアルコールに変わる", "澱を瓶口に集める", "果皮を除去する"], "マロラクティック発酵ではリンゴ酸が乳酸に変わり酸味がやわらぎます。"],
    ["gen-cava", "ワイン概論 / 重要A", "A", "Cava", "瓶内二次発酵", ["シャルマ方式のみ", "酒精強化", "酸化熟成のみ"], "Cavaはスペインの瓶内二次発酵による発泡性ワインです。"],
    ["gen-priorat", "ワイン概論 / 土壌", "B", "Priorat", "Llicorella", ["Kimmeridgian", "Terra rossa", "Galestro"], "PrioratではLlicorellaと呼ばれるスレート系土壌が重要です。"]
  ];
  const customPairQuestions = {
    "fr-bdx-left": {
      question: "ボルドー左岸について、土壌傾向と主要品種の組み合わせで最も適切なものはどれですか？",
      choices: [
        "砂利質土壌 - Cabernet Sauvignon",
        "粘土質・石灰質土壌 - Merlot",
        "キンメリジャン石灰質 - Chardonnay",
        "花崗岩質土壌 - Syrah"
      ]
    },
    "fr-bdx-right": {
      question: "ボルドー右岸について、土壌傾向と主要品種の組み合わせで最も適切なものはどれですか？",
      choices: [
        "粘土質・石灰質土壌 - Merlot",
        "砂利質土壌 - Cabernet Sauvignon",
        "キンメリジャン石灰質 - Chardonnay",
        "花崗岩質土壌 - Syrah"
      ]
    }
  };
  const customWrongQuestions = {
    "fr-bdx-left": {
      question: "ボルドー左岸・右岸の土壌傾向と主要品種の組み合わせで、誤っているものはどれですか？",
      choices: [
        "砂利質土壌 - Merlot",
        "砂利質土壌 - Cabernet Sauvignon",
        "粘土質・石灰質土壌 - Merlot",
        "キンメリジャン石灰質 - Chardonnay"
      ],
      note: "ボルドー左岸は砂利質土壌とCabernet Sauvignon、右岸は粘土質・石灰質土壌とMerlotを軸に判別します。"
    },
    "fr-bdx-right": {
      question: "ボルドー左岸・右岸の土壌傾向と主要品種の組み合わせで、誤っているものはどれですか？",
      choices: [
        "粘土質・石灰質土壌 - Cabernet Sauvignon",
        "粘土質・石灰質土壌 - Merlot",
        "砂利質土壌 - Cabernet Sauvignon",
        "キンメリジャン石灰質 - Chardonnay"
      ],
      note: "ボルドー右岸は粘土質・石灰質土壌とMerlot、左岸は砂利質土壌とCabernet Sauvignonを軸に判別します。"
    }
  };

  add(
    "fr-bdx-medoc-graves-region",
    "フランス / ボルドー",
    "A",
    "メドック、グラーヴが位置するフランスの主要ワイン産地はどれですか？",
    ["ボルドー", "ブルゴーニュ", "シャンパーニュ", "ロワール"],
    0,
    "メドック、グラーヴはボルドー左岸に位置する重要地区です。"
  );

  facts.forEach(([id, category, importance, subject, answer, wrongs, note], index) => {
    const next = facts[(index + 1) % facts.length];
    const third = facts[(index + 2) % facts.length];
    const fourth = facts[(index + 3) % facts.length];
    const customPair = customPairQuestions[id];
    if (customPair) {
      add(`${id}-pair`, category, importance, customPair.question, customPair.choices, 0, note);
    } else {
      add(`${id}-pair`, category, importance, `${subject}を含む組み合わせで、正しいものはどれですか？`, wrongChoices(`${subject} - ${answer}`, [`${next[3]} - ${answer}`, `${third[3]} - ${wrongs[0]}`, `${fourth[3]} - ${wrongs[1] || wrongs[0]}`]), 0, note);
    }
    const customWrong = customWrongQuestions[id];
    if (customWrong) {
      add(`${id}-wrong`, category, importance === "A" ? "B" : importance, customWrong.question, customWrong.choices, 0, customWrong.note);
    } else {
      add(`${id}-wrong`, category, importance === "A" ? "B" : importance, `${subject}周辺の知識で、誤っている組み合わせはどれですか？`, wrongChoices(`${subject} - ${next[4]}`, [`${subject} - ${answer}`, `${next[3]} - ${next[4]}`, `${third[3]} - ${third[4]}`]), 0, `${subject}は${answer}と結びつけます。`);
    }
    add(`${id}-compare`, category, "B", `次の組み合わせで正しいものはどれですか？`, wrongChoices(`${subject} - ${answer}`, [`${next[3]} - ${answer}`, `${third[3]} - ${wrongs[0]}`, `${fourth[3]} - ${wrongs[1] || wrongs[0]}`]), 0, note);
  });

  window.QUESTION_PACKS.push({
    id: "phase1-exam-style",
    title: "第1段階 試験形式補強",
    phase: 1,
    questions
  });
})();
