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

  function addDetailed(id, category, importance, question, choices, answer, note, notes) {
    questions.push({
      id: `phase1-exam-style-${id}`,
      category,
      importance,
      question,
      choices,
      answer,
      note,
      choiceNotes: notes
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

  const bordeauxReferenceQuestions = [
    {
      id: "fr-bdx-right-bank-soil",
      importance: "A",
      question: "ボルドー右岸の土壌傾向として、最も適切なものはどれですか？",
      choices: ["粘土質土壌", "砂礫質土壌", "花崗岩質土壌", "スレート土壌"],
      answer: 0,
      note: "ボルドー右岸では粘土質土壌が重要で、Merlot主体のワインと結びつけて整理します。",
      notes: [
        "正解です。ボルドー右岸では粘土質土壌が重要で、Merlot主体のワインと結びつけて整理します。",
        "砂礫質土壌はボルドー左岸のメドックやグラーヴで多く見られ、Cabernet Sauvignonと結びつけます。",
        "花崗岩質土壌は北部ローヌなどで意識する土壌で、ボルドー右岸の基本整理ではありません。",
        "スレート土壌はMoselやPrioratなどで重要な土壌として整理します。"
      ]
    },
    {
      id: "fr-bdx-climate",
      importance: "A",
      question: "ボルドー地方の気候として、最も適切なものはどれですか？",
      choices: ["海洋性気候", "大陸性気候", "地中海性気候", "高山性気候"],
      answer: 0,
      note: "ボルドーは大西洋の影響を受ける海洋性気候の産地です。",
      notes: [
        "正解です。ボルドーは大西洋の影響を受ける海洋性気候の産地です。",
        "大陸性気候はブルゴーニュやシャンパーニュなどで意識します。",
        "地中海性気候はプロヴァンスや南部ローヌなどで意識します。",
        "高山性気候はジュラ・サヴォワなど山地性の産地で整理します。"
      ]
    },
    {
      id: "fr-bdx-right-bank-aoc",
      importance: "A",
      question: "次のA.O.C.のうち、ボルドー右岸に位置するものはどれですか？",
      choices: ["Lalande-de-Pomerol", "Medoc", "Saint-Estephe", "Pessac-Leognan"],
      answer: 0,
      note: "Lalande-de-Pomerolはドルドーニュ川右岸側のA.O.C.です。",
      notes: [
        "正解です。Lalande-de-Pomerolはドルドーニュ川右岸側のA.O.C.です。",
        "Medocはジロンド川左岸の地区です。",
        "Saint-EstepheはMedoc地区の村名A.O.C.です。",
        "Pessac-LeognanはGraves地区に位置するA.O.C.です。"
      ]
    },
    {
      id: "fr-bdx-sweet-only-aoc",
      importance: "A",
      question: "ボルドー地方で甘口白ワインが中心となるA.O.C.はどれですか？",
      choices: ["Barsac", "Pomerol", "Cotes de Bourg", "Medoc"],
      answer: 0,
      note: "BarsacはSauternesと並び、Semillon主体の貴腐甘口白で整理します。",
      notes: [
        "正解です。BarsacはSauternesと並び、Semillon主体の貴腐甘口白で整理します。",
        "Pomerolはボルドー右岸の赤ワイン産地として整理します。",
        "Cotes de Bourgはボルドー右岸側の赤・白を含む産地で、甘口白中心ではありません。",
        "Medocはボルドー左岸の赤ワイン産地として整理します。"
      ]
    },
    {
      id: "fr-bdx-red-only-aoc",
      importance: "A",
      question: "ボルドー地方で赤ワインの産地として整理するA.O.C.はどれですか？",
      choices: ["Medoc", "Entre-Deux-Mers Haut-Benauge", "Bordeaux Haut-Benauge", "Sainte-Foy-Bordeaux"],
      answer: 0,
      note: "Medocはボルドー左岸の代表的な赤ワイン産地です。",
      notes: [
        "正解です。Medocはボルドー左岸の代表的な赤ワイン産地です。",
        "Entre-Deux-Mers Haut-Benaugeはアントル・ドゥー・メール周辺の白ワイン系A.O.C.として整理します。",
        "Bordeaux Haut-Benaugeは甘口白を含む白ワイン系A.O.C.として整理します。",
        "Sainte-Foy-Bordeauxは赤だけでなく白や甘口白も含むA.O.C.です。"
      ]
    },
    {
      id: "fr-bdx-pessac-leognan-area",
      importance: "A",
      question: "Pessac-Leognanが位置するボルドーの地区はどれですか？",
      choices: ["Graves", "Pomerol", "Medoc", "Entre-Deux-Mers"],
      answer: 0,
      note: "Pessac-LeognanはGraves地区の北部に位置するA.O.C.です。",
      notes: [
        "正解です。Pessac-LeognanはGraves地区の北部に位置するA.O.C.です。",
        "Pomerolはドルドーニュ川右岸の赤ワイン産地です。",
        "Medocはジロンド川左岸の地区で、PauillacやMargauxなどを含みます。",
        "Entre-Deux-Mersはガロンヌ川とドルドーニュ川の間の地区です。"
      ]
    },
    {
      id: "fr-bdx-medoc-order",
      importance: "B",
      question: "ボルドー左岸のA.O.C.を、ガロンヌ川・ジロンド川の上流から下流へ並べたものはどれですか？",
      choices: ["Sauternes、Cerons、Margaux、Saint-Estephe", "Margaux、Sauternes、Saint-Julien、Saint-Estephe", "Saint-Julien、Saint-Estephe、Margaux、Cerons", "Cerons、Pauillac、Barsac、Saint-Julien"],
      answer: 0,
      note: "上流側の甘口白産地から、下流側のMedoc村名A.O.C.へ向かう順で整理します。",
      notes: [
        "正解です。上流側の甘口白産地から、下流側のMedoc村名A.O.C.へ向かう順で整理します。",
        "SauternesはMargauxより上流側に位置します。",
        "CeronsはSaint-Estepheより上流側に位置します。",
        "BarsacはPauillacより上流側に位置します。"
      ]
    }
  ];

  bordeauxReferenceQuestions.forEach((item) => {
    addDetailed(item.id, "フランス / ボルドー", item.importance, item.question, item.choices, item.answer, item.note, item.notes);
  });

  const burgundyReferenceQuestions = [
    {
      id: "fr-bourgogne-charlemagne-color",
      importance: "B",
      question: "ブルゴーニュのGrand Cru「Charlemagne」で認められるワインの種類はどれですか？",
      choices: ["白ワインのみ", "赤ワインのみ", "赤・白ワイン", "赤・白・ロゼワイン"],
      answer: 0,
      note: "Charlemagneは白ワインのみのGrand Cruとして整理します。",
      notes: [
        "正解です。Charlemagneは白ワインのみのGrand Cruとして整理します。",
        "赤ワインのみではありません。Cote de Nuitsの多くのGrand Cruは赤のみで整理します。",
        "Charlemagneは赤・白両方ではなく、白のみで問われやすいGrand Cruです。",
        "ブルゴーニュGrand Cruの基本整理では、赤・白・ロゼすべてではありません。"
      ]
    },
    {
      id: "fr-bourgogne-romanee-saint-vivant-village",
      importance: "A",
      question: "Grand Cru「Romanee-Saint-Vivant」が属する村はどれですか？",
      choices: ["Vosne-Romanee", "Puligny-Montrachet", "Chambolle-Musigny", "Gevrey-Chambertin"],
      answer: 0,
      note: "Romanee-Saint-VivantはVosne-Romanee村のGrand Cruです。",
      notes: [
        "正解です。Romanee-Saint-VivantはVosne-Romanee村のGrand Cruです。",
        "Puligny-MontrachetはMontrachet系の白Grand Cruで重要な村です。",
        "Chambolle-MusignyはMusignyやBonnes-Maresと結びつけて整理します。",
        "Gevrey-ChambertinはChambertin系のGrand Cruで重要な村です。"
      ]
    },
    {
      id: "fr-bourgogne-bonnes-mares-villages",
      importance: "A",
      question: "Grand Cru「Bonnes-Mares」がまたがる村の組み合わせはどれですか？",
      choices: ["Morey-Saint-Denis / Chambolle-Musigny", "Gevrey-Chambertin / Morey-Saint-Denis", "Chambolle-Musigny / Vougeot", "Puligny-Montrachet / Chassagne-Montrachet"],
      answer: 0,
      note: "Bonnes-MaresはMorey-Saint-Denis村とChambolle-Musigny村にまたがるGrand Cruです。",
      notes: [
        "正解です。Bonnes-MaresはMorey-Saint-Denis村とChambolle-Musigny村にまたがるGrand Cruです。",
        "Gevrey-Chambertin / Morey-Saint-DenisはChambertin系やClos de la Rocheなどとの混同に注意します。",
        "VougeotはClos de Vougeotで重要ですが、Bonnes-Maresの組み合わせではありません。",
        "Puligny-Montrachet / Chassagne-MontrachetはMontrachet系Grand Cruで整理します。"
      ]
    },
    {
      id: "fr-bourgogne-meursault-grand-cru-count",
      importance: "B",
      question: "Meursault村に存在するGrand Cruの数はどれですか？",
      choices: ["0個", "3個", "6個", "9個"],
      answer: 0,
      note: "Meursault村にはGrand Cruがなく、Premier Cruと村名ワインで整理します。",
      notes: [
        "正解です。Meursault村にはGrand Cruがなく、Premier Cruと村名ワインで整理します。",
        "3個ではありません。Montrachet系Grand CruはPuligny-MontrachetやChassagne-Montrachet側で整理します。",
        "6個ではありません。Meursaultは白ワインで重要ですがGrand Cruはありません。",
        "9個ではありません。Gevrey-ChambertinのGrand Cru数などとの混同に注意します。"
      ]
    },
    {
      id: "fr-bourgogne-clos-saint-denis-color",
      importance: "B",
      question: "Grand Cru「Clos Saint-Denis」で認められるワインの種類はどれですか？",
      choices: ["赤ワインのみ", "白ワインのみ", "赤・白ワイン", "赤・白・ロゼワイン"],
      answer: 0,
      note: "Clos Saint-DenisはCote de Nuitsの赤ワインGrand Cruとして整理します。",
      notes: [
        "正解です。Clos Saint-DenisはCote de Nuitsの赤ワインGrand Cruとして整理します。",
        "白ワインのみではありません。白のみのGrand CruはMontrachet系やChablis Grand Cruなどで整理します。",
        "赤・白両方ではなく、赤ワインのみで問われやすいGrand Cruです。",
        "ブルゴーニュGrand Cruの基本整理では、赤・白・ロゼすべてではありません。"
      ]
    },
    {
      id: "fr-bourgogne-chablis-premier-cru",
      importance: "B",
      question: "次のうち、ChablisのPremier Cruとして整理する畑名はどれですか？",
      choices: ["Cote de Lechet", "Les Suchots", "Ile des Vergelesses", "Clos des Marechaudes"],
      answer: 0,
      note: "Cote de LechetはChablisのPremier Cruとして整理します。",
      notes: [
        "正解です。Cote de LechetはChablisのPremier Cruとして整理します。",
        "Les SuchotsはVosne-Romanee村のPremier Cruとして整理します。",
        "Ile des VergelessesはPernand-VergelessesのPremier Cruとして整理します。",
        "Clos des MarechaudesはAloxe-Corton周辺のPremier Cruとして整理します。"
      ]
    },
    {
      id: "fr-bourgogne-grand-cru-identification",
      importance: "A",
      question: "次のうち、ブルゴーニュのGrand Cruとして整理する畑名はどれですか？",
      choices: ["Mazis-Chambertin", "Les Suchots", "Champ Canet", "Les Bressandes"],
      answer: 0,
      note: "Mazis-ChambertinはGevrey-Chambertin村のGrand Cruです。",
      notes: [
        "正解です。Mazis-ChambertinはGevrey-Chambertin村のGrand Cruです。",
        "Les SuchotsはVosne-Romanee村のPremier Cruとして整理します。",
        "Champ CanetはPuligny-Montrachet村のPremier Cruとして整理します。",
        "Les BressandesはAloxe-Corton周辺のPremier Cruとして整理します。"
      ]
    },
    {
      id: "fr-bourgogne-montrachet-villages",
      importance: "A",
      question: "Grand Cru「Montrachet」がまたがる村の組み合わせはどれですか？",
      choices: ["Puligny-Montrachet / Chassagne-Montrachet", "Meursault / Volnay", "Gevrey-Chambertin / Morey-Saint-Denis", "Vosne-Romanee / Vougeot"],
      answer: 0,
      note: "MontrachetはPuligny-Montrachet村とChassagne-Montrachet村にまたがる白ワインGrand Cruです。",
      notes: [
        "正解です。MontrachetはPuligny-Montrachet村とChassagne-Montrachet村にまたがる白ワインGrand Cruです。",
        "Meursault / Volnayではありません。MeursaultにはGrand Cruがありません。",
        "Gevrey-Chambertin / Morey-Saint-DenisはCote de Nuitsの赤系Grand Cruとの混同に注意します。",
        "Vosne-Romanee / Vougeotではありません。Vosne-RomaneeはRomanee-Saint-Vivantなどで整理します。"
      ]
    }
  ];

  burgundyReferenceQuestions.forEach((item) => {
    addDetailed(item.id, "フランス / ブルゴーニュ", item.importance, item.question, item.choices, item.answer, item.note, item.notes);
  });

  const franceOverviewTrendQuestions = [
    {
      id: "fr-overview-vineyard-area-2023",
      importance: "A",
      question: "教本値で、フランスの2023年のブドウ畑総面積に最も近いものはどれですか？",
      choices: ["約75万ヘクタール", "約45万ヘクタール", "約123万ヘクタール", "約63万ヘクタール"],
      answer: 0,
      note: "2023年のフランスのブドウ畑総面積は約75万ヘクタールです。",
      notes: [
        "正解です。2023年のフランスのブドウ畑総面積は約75万ヘクタールです。",
        "約45万ヘクタールでは少なすぎます。",
        "約123万ヘクタールでは大きすぎます。",
        "約63万ヘクタールよりも大きく、約75万ヘクタールが目安です。"
      ]
    },
    {
      id: "fr-overview-export-value-2023",
      importance: "B",
      question: "教本値で、フランスの2023年のワイン輸出額に最も近いものはどれですか？",
      choices: ["約112億ユーロ", "約10億ユーロ", "約38億ユーロ", "約130億ユーロ"],
      answer: 0,
      note: "2023年のフランスのワイン輸出額は約112億ユーロが目安です。",
      notes: [
        "正解です。2023年のフランスのワイン輸出額は約112億ユーロが目安です。",
        "約10億ユーロでは小さすぎます。",
        "約38億ユーロでも小さすぎます。",
        "約130億ユーロは近いですが、教本値では約112億ユーロが目安です。"
      ]
    },
    {
      id: "fr-overview-red-variety-first",
      importance: "A",
      question: "フランスの黒ブドウ品種で、栽培面積が最も大きいものはどれですか？",
      choices: ["Merlot", "Grenache", "Syrah", "Cabernet Sauvignon"],
      answer: 0,
      note: "フランスの黒ブドウではMerlotの栽培面積が最大です。",
      notes: [
        "正解です。フランスの黒ブドウではMerlotの栽培面積が最大です。",
        "Grenacheは上位ですが、Merlotに次ぐ順位で問われます。",
        "Syrahは上位品種ですが、Merlotより栽培面積は小さいです。",
        "Cabernet Sauvignonは重要品種ですが、フランス全体の黒ブドウ1位ではありません。"
      ]
    },
    {
      id: "fr-overview-red-variety-second",
      importance: "A",
      question: "フランスの黒ブドウ品種で、栽培面積がMerlotに次ぐものはどれですか？",
      choices: ["Grenache", "Cabernet Sauvignon", "Syrah", "Pinot Noir"],
      answer: 0,
      note: "フランスの黒ブドウではMerlotに次いでGrenacheが大きい品種です。",
      notes: [
        "正解です。フランスの黒ブドウではMerlotに次いでGrenacheが大きい品種です。",
        "Cabernet Sauvignonは上位ですが、Grenacheより下位です。",
        "Syrahは3位付近で問われやすい品種です。",
        "Pinot Noirは重要品種ですが、全国の栽培面積順位では上位3品種より小さいです。"
      ]
    },
    {
      id: "fr-overview-red-variety-third",
      importance: "A",
      question: "フランスの黒ブドウ品種で、栽培面積が第3位に近いものはどれですか？",
      choices: ["Syrah", "Merlot", "Grenache", "Cabernet Franc"],
      answer: 0,
      note: "フランスの黒ブドウではSyrahが第3位付近の品種です。",
      notes: [
        "正解です。フランスの黒ブドウではSyrahが第3位付近の品種です。",
        "Merlotは黒ブドウの栽培面積1位です。",
        "GrenacheはMerlotに次ぐ2位付近の品種です。",
        "Cabernet Francも重要ですが、全国順位ではSyrahより下位です。"
      ]
    },
    {
      id: "fr-overview-first-viticulture",
      importance: "B",
      question: "フランスにブドウ栽培が初めてもたらされた時期として、最も適切なものはどれですか？",
      choices: ["紀元前6世紀頃", "紀元前3世紀頃", "紀元1世紀頃", "紀元4世紀頃"],
      answer: 0,
      note: "フランスへのブドウ栽培の伝来は、ギリシャ人による紀元前6世紀頃が基本です。",
      notes: [
        "正解です。フランスへのブドウ栽培の伝来は、ギリシャ人による紀元前6世紀頃が基本です。",
        "紀元前3世紀頃は最初の伝来時期としては遅い選択肢です。",
        "紀元1世紀頃はローマ人による栽培拡大の文脈で問われます。",
        "紀元4世紀頃は最初の伝来時期としては遅すぎます。"
      ]
    },
    {
      id: "fr-overview-roman-rhone",
      importance: "B",
      question: "ローマ人の影響でローヌ方面にブドウ栽培とワイン造りが広がった時期として、最も適切なものはどれですか？",
      choices: ["紀元1世紀頃", "紀元前6世紀頃", "紀元前3世紀頃", "紀元6世紀頃"],
      answer: 0,
      note: "ローマ人の影響によるローヌ方面への拡大は紀元1世紀頃で問われます。",
      notes: [
        "正解です。ローマ人の影響によるローヌ方面への拡大は紀元1世紀頃で問われます。",
        "紀元前6世紀頃はギリシャ人による伝来の時期です。",
        "紀元前3世紀頃ではありません。",
        "紀元6世紀頃では遅すぎます。"
      ]
    },
    {
      id: "fr-overview-revolution-year",
      importance: "B",
      question: "フランス革命が起きた年はどれですか？",
      choices: ["1789年", "1659年", "1508年", "1814年"],
      answer: 0,
      note: "フランス革命は1789年です。",
      notes: [
        "正解です。フランス革命は1789年です。",
        "1659年ではありません。",
        "1508年ではありません。",
        "1814年はナポレオン戦争後の時期で、フランス革命の年ではありません。"
      ]
    },
    {
      id: "fr-overview-vdqs-created",
      importance: "B",
      question: "A.O.C.より規制が緩やかで、原産地を指定する旧制度VDQSが制定された年はどれですか？",
      choices: ["1949年", "1935年", "1945年", "2009年"],
      answer: 0,
      note: "VDQSは1949年に制定された旧制度です。",
      notes: [
        "正解です。VDQSは1949年に制定された旧制度です。",
        "1935年はA.O.C.制度成立の文脈で重要です。",
        "1945年ではありません。",
        "2009年はEUワイン法改正の文脈で問われます。"
      ]
    },
    {
      id: "fr-overview-vdqs-disappeared",
      importance: "A",
      question: "A.O.C.の下位カテゴリーであったVDQSが消滅した年はどれですか？",
      choices: ["2011年", "2009年", "2006年", "2002年"],
      answer: 0,
      note: "VDQSは制度改正により2011年に消滅しました。",
      notes: [
        "正解です。VDQSは制度改正により2011年に消滅しました。",
        "2009年はEUワイン法の新分類が導入された年として重要です。",
        "2006年ではありません。",
        "2002年ではありません。"
      ]
    },
    {
      id: "fr-overview-variety-liberalization",
      importance: "B",
      question: "フランスで、地域にかかわらず植え付け可能なブドウ品種が自由化された年はどれですか？",
      choices: ["2009年", "2011年", "2006年", "2002年"],
      answer: 0,
      note: "地域にかかわらない植え付け品種の自由化は2009年です。",
      notes: [
        "正解です。地域にかかわらない植え付け品種の自由化は2009年です。",
        "2011年はVDQS消滅の年です。",
        "2006年ではありません。",
        "2002年ではありません。"
      ]
    },
    {
      id: "fr-overview-vin-de-table-successor",
      importance: "A",
      question: "EUレベルの新しい分類で、従来のVin de Tableに替わるフランスのカテゴリーはどれですか？",
      choices: ["Vin de France", "Vin Régional", "Vin de Pays", "Vin Ordinaire"],
      answer: 0,
      note: "従来のVin de Tableに替わるカテゴリーはVin de Franceです。",
      notes: [
        "正解です。従来のVin de Tableに替わるカテゴリーはVin de Franceです。",
        "Vin Régionalは現在の正式な置き換え名称ではありません。",
        "Vin de Paysは旧分類で、現在はI.G.P.に相当します。",
        "Vin Ordinaireは該当する正式カテゴリーではありません。"
      ]
    },
    {
      id: "fr-overview-aop-name",
      importance: "A",
      question: "フランスワイン法の分類で、原産地呼称保護ワインに相当する名称はどれですか？",
      choices: ["Appellation d'Origine Protégée", "Indication Géographique Protégée", "Vin de France", "Vin Sans Indication Géographique"],
      answer: 0,
      note: "原産地呼称保護ワインはAppellation d'Origine Protégée、略称A.O.P.です。",
      notes: [
        "正解です。原産地呼称保護ワインはAppellation d'Origine Protégée、略称A.O.P.です。",
        "Indication Géographique Protégéeは地理的表示保護ワイン、略称I.G.P.です。",
        "Vin de Franceは地理的表示のないワインのフランス名です。",
        "Vin Sans Indication Géographiqueは地理的表示のないワインを指します。"
      ]
    },
    {
      id: "fr-overview-igp-name",
      importance: "A",
      question: "EU分類で、地理的表示保護ワインに相当する名称はどれですか？",
      choices: ["Indication Géographique Protégée", "Appellation d'Origine Contrôlée", "Vin de France", "Vin Sans Indication Géographique"],
      answer: 0,
      note: "地理的表示保護ワインはIndication Géographique Protégée、略称I.G.P.です。",
      notes: [
        "正解です。地理的表示保護ワインはIndication Géographique Protégée、略称I.G.P.です。",
        "Appellation d'Origine ContrôléeはフランスのA.O.C.で、現在はA.O.P.と対応します。",
        "Vin de Franceは地理的表示のないワインのフランス名です。",
        "Vin Sans Indication Géographiqueは地理的表示のないワインです。"
      ]
    },
    {
      id: "fr-overview-vsig-name",
      importance: "B",
      question: "EU分類で、地理的表示のないワインに相当するものはどれですか？",
      choices: ["Vin Sans Indication Géographique", "Indication Géographique Protégée", "Appellation d'Origine Protégée", "Appellation d'Origine Contrôlée"],
      answer: 0,
      note: "地理的表示のないワインはVin Sans Indication Géographique、略称V.S.I.G.です。",
      notes: [
        "正解です。地理的表示のないワインはVin Sans Indication Géographique、略称V.S.I.G.です。",
        "Indication Géographique Protégéeは地理的表示保護ワインです。",
        "Appellation d'Origine Protégéeは原産地呼称保護ワインです。",
        "Appellation d'Origine ContrôléeはA.O.C.で、原産地呼称の制度です。"
      ]
    }
  ];

  franceOverviewTrendQuestions.forEach((item) => {
    addDetailed(item.id, "フランス 歴史・概論", item.importance, item.question, item.choices, item.answer, item.note, item.notes);
  });

  const champagneTrendQuestions = [
    {
      id: "champagne-avize-area",
      importance: "A",
      question: "Avizeが位置するシャンパーニュ地方の地区はどれですか？",
      choices: ["Côte des Blancs", "Montagne de Reims", "Vallée de la Marne", "Côte des Bar"],
      answer: 0,
      note: "AvizeはCôte des BlancsのGrand Cru村です。",
      notes: [
        "正解です。AvizeはCôte des BlancsのGrand Cru村です。",
        "Montagne de ReimsはPinot Noirも重要な北部の地区です。",
        "Vallée de la MarneはMeunierも重要なマルヌ川沿いの地区です。",
        "Côte des BarはAube県側の南部地区です。"
      ]
    },
    {
      id: "champagne-label-rm",
      importance: "A",
      question: "自社畑のブドウを主に用い、自ら醸造する栽培農家を示すシャンパーニュのラベル表示はどれですか？",
      choices: ["RM", "NM", "CM", "MA"],
      answer: 0,
      note: "RMはRécoltant-Manipulantで、自社栽培ブドウを用いて自ら醸造する生産者です。",
      notes: [
        "正解です。RMはRécoltant-Manipulantで、自社栽培ブドウを用いて自ら醸造する生産者です。",
        "NMはNégociant-Manipulantで、購入ブドウも用いるメゾン型の生産者です。",
        "CMはCoopérative de Manipulationで、協同組合による生産者表示です。",
        "MAはMarque d'Acheteurで、買い手ブランドを示す表示です。"
      ]
    },
    {
      id: "champagne-production-order",
      importance: "A",
      question: "シャンパーニュの製造工程として、最初から最後の順序で最も適切なものはどれですか？",
      choices: ["Pressurage → Tirage → Deuxième Fermentation en Bouteille → Bouchage", "Dosage → Pressurage → Fermentation Malolactique → Remuage", "Assemblage → Fermentation Alcoolique → Dosage → Remuage", "Pressurage → Fermentation Alcoolique → Bouchage → Dégorgement"],
      answer: 0,
      note: "圧搾後、瓶内二次発酵の準備であるTirageへ進み、瓶内二次発酵を経て打栓します。",
      notes: [
        "正解です。圧搾後、瓶内二次発酵の準備であるTirageへ進み、瓶内二次発酵を経て打栓します。",
        "Dosageは澱抜き後の甘味調整で、最初の工程ではありません。",
        "Dosageは瓶内二次発酵や澱抜きの後に行われます。",
        "Bouchageは最終的な打栓で、Dégorgementより前に置く流れではありません。"
      ]
    },
    {
      id: "champagne-montagne-grand-cru",
      importance: "A",
      question: "Montagne de Reims地区のGrand Cru村として正しいものはどれですか？",
      choices: ["Puisieulx", "Oger", "Cramant", "Aÿ"],
      answer: 0,
      note: "PuisieulxはMontagne de Reims地区のGrand Cru村です。",
      notes: [
        "正解です。PuisieulxはMontagne de Reims地区のGrand Cru村です。",
        "OgerはCôte des BlancsのGrand Cru村です。",
        "CramantはCôte des BlancsのGrand Cru村です。",
        "AÿはVallée de la Marne側のGrand Cru村です。"
      ]
    },
    {
      id: "champagne-press-cuvee",
      importance: "B",
      question: "シャンパーニュの圧搾で、最初に得られる果汁を何と呼びますか？",
      choices: ["Cuvée", "Taille", "Tranche", "Cube"],
      answer: 0,
      note: "最初に得られる上質な果汁はCuvéeです。",
      notes: [
        "正解です。最初に得られる上質な果汁はCuvéeです。",
        "TailleはCuvéeの後に得られる果汁です。",
        "Trancheはシャンパーニュの圧搾果汁名ではありません。",
        "Cubeはシャンパーニュの圧搾果汁名ではありません。"
      ]
    },
    {
      id: "champagne-reims-city",
      importance: "B",
      question: "歴代フランス王の戴冠式が行われた大聖堂で知られる、シャンパーニュ地方の中心都市はどれですか？",
      choices: ["Reims", "Troyes", "Châlons-en-Champagne", "Épernay"],
      answer: 0,
      note: "Reimsは大聖堂と戴冠式で知られるシャンパーニュ地方の中心都市です。",
      notes: [
        "正解です。Reimsは大聖堂と戴冠式で知られるシャンパーニュ地方の中心都市です。",
        "TroyesはAube県側で重要な都市ですが、戴冠式の大聖堂で問われる中心都市ではありません。",
        "Châlons-en-Champagneは行政上重要ですが、戴冠式の大聖堂ではReimsが重要です。",
        "Épernayはシャンパーニュの生産・流通で重要な町です。"
      ]
    },
    {
      id: "champagne-premier-cru-rate",
      importance: "B",
      question: "シャンパーニュでPremier Cruと表示される村の格付け条件として、最も適切なものはどれですか？",
      choices: ["格付け90〜99%の村", "格付け100%の村", "格付け80%未満の村", "格付け70%未満の村"],
      answer: 0,
      note: "Premier Cruは旧エシェル・デ・クリュで90〜99%の村に相当します。",
      notes: [
        "正解です。Premier Cruは旧エシェル・デ・クリュで90〜99%の村に相当します。",
        "格付け100%の村はGrand Cruです。",
        "80%未満はPremier Cruの条件ではありません。",
        "70%未満はPremier Cruの条件ではありません。"
      ]
    },
    {
      id: "champagne-three-varieties",
      importance: "A",
      question: "シャンパーニュ地方の主要3品種の別名として正しいものはどれですか？",
      choices: ["Schwarzriesling", "Furmint", "Monastrell", "Prugnolo Gentile"],
      answer: 0,
      note: "SchwarzrieslingはMeunierの別名です。",
      notes: [
        "正解です。SchwarzrieslingはMeunierの別名です。",
        "FurmintはハンガリーのTokajiなどで重要な白ブドウ品種です。",
        "MonastrellはMourvèdreのスペイン名です。",
        "Prugnolo GentileはSangiovese系品種の名称で、Vino Nobile di Montepulcianoで問われます。"
      ]
    },
    {
      id: "champagne-pas-dose",
      importance: "B",
      question: "シャンパーニュの甘辛度表示Pas Doséの残糖量として最も適切なものはどれですか？",
      choices: ["3g/L未満", "12〜17g/L", "17〜32g/L", "32〜50g/L"],
      answer: 0,
      note: "Pas Doséはドザージュなし、または極めて少ない残糖量の表示です。",
      notes: [
        "正解です。Pas Doséは3g/L未満の極辛口表示です。",
        "12〜17g/LはExtra Dryの範囲です。",
        "17〜32g/LはSecの範囲です。",
        "32〜50g/LはDemi-Secの範囲です。"
      ]
    },
    {
      id: "champagne-second-fermentation-term",
      importance: "A",
      question: "シャンパーニュの製造工程で、瓶内二次発酵を意味するフランス語はどれですか？",
      choices: ["Deuxième Fermentation en Bouteille", "Remuage", "Dosage", "Vendange"],
      answer: 0,
      note: "瓶内二次発酵はDeuxième Fermentation en Bouteilleです。",
      notes: [
        "正解です。瓶内二次発酵はDeuxième Fermentation en Bouteilleです。",
        "Remuageは澱を瓶口へ集める動瓶です。",
        "Dosageは澱抜き後に糖分を調整する工程です。",
        "Vendangeは収穫です。"
      ]
    }
  ];

  champagneTrendQuestions.forEach((item) => {
    addDetailed(item.id, "フランス / シャンパーニュ", item.importance, item.question, item.choices, item.answer, item.note, item.notes);
  });

  const focusedSinglePointQuestions = [
    {
      id: "it-veneto-prosecco-glera",
      category: "イタリア / ヴェネト",
      importance: "A",
      question: "Proseccoで主要品種として使用されるものはどれですか？",
      choices: ["Glera", "Corvina", "Garganega", "Trebbiano Toscano"],
      answer: 0,
      note: "Proseccoの主要品種はGleraです。",
      notes: [
        "正解です。Proseccoの主要品種はGleraです。",
        "CorvinaはValpolicellaやAmaroneで重要な黒ブドウ品種です。",
        "GarganegaはSoaveで重要な白ブドウ品種です。",
        "Trebbiano ToscanoはProseccoの主要品種ではありません。"
      ]
    },
    {
      id: "it-veneto-amarone-method",
      category: "イタリア / ヴェネト",
      importance: "A",
      question: "Amarone della Valpolicellaの製法として正しいものはどれですか？",
      choices: ["陰干しブドウを使用する", "瓶内二次発酵を行う", "貴腐ブドウを使用する", "マセラシオン・カルボニックを行う"],
      answer: 0,
      note: "Amarone della Valpolicellaは陰干しブドウから造る辛口赤ワインです。",
      notes: [
        "正解です。Amarone della Valpolicellaは陰干しブドウから造る辛口赤ワインです。",
        "瓶内二次発酵はFranciacortaやChampagneなどの発泡性ワインで重要です。",
        "貴腐ブドウはSauternesやTokajiなどの甘口ワインで問われます。",
        "マセラシオン・カルボニックはBeaujolaisなどで知られる醸造法です。"
      ]
    },
    {
      id: "it-veneto-soave-garganega",
      category: "イタリア / ヴェネト",
      importance: "A",
      question: "Soaveの主要品種として正しいものはどれですか？",
      choices: ["Garganega", "Glera", "Corvina", "Nebbiolo"],
      answer: 0,
      note: "Soaveの主要品種はGarganegaです。",
      notes: [
        "正解です。Soaveの主要品種はGarganegaです。",
        "GleraはProseccoで重要な品種です。",
        "CorvinaはValpolicellaやAmaroneで重要な品種です。",
        "NebbioloはピエモンテのBaroloやBarbarescoで重要な品種です。"
      ]
    },
    {
      id: "it-veneto-valpolicella-corvina",
      category: "イタリア / ヴェネト",
      importance: "A",
      question: "Valpolicellaで中心となる黒ブドウ品種はどれですか？",
      choices: ["Corvina", "Glera", "Garganega", "Sangiovese"],
      answer: 0,
      note: "ValpolicellaではCorvinaが中心品種です。",
      notes: [
        "正解です。ValpolicellaではCorvinaが中心品種です。",
        "GleraはProseccoで重要な白ブドウ品種です。",
        "GarganegaはSoaveで重要な白ブドウ品種です。",
        "Sangioveseはトスカーナで重要な黒ブドウ品種です。"
      ]
    },
    {
      id: "jp-koshu-leading-white",
      category: "日本",
      importance: "A",
      question: "日本を代表する白ブドウ品種として正しいものはどれですか？",
      choices: ["甲州", "マスカット・ベーリーA", "ヤマ・ソーヴィニヨン", "小公子"],
      answer: 0,
      note: "甲州は日本を代表する白ブドウ品種です。",
      notes: [
        "正解です。甲州は日本を代表する白ブドウ品種です。",
        "マスカット・ベーリーAは日本で重要な黒ブドウ品種です。",
        "ヤマ・ソーヴィニヨンは日本の交配品種ですが、代表的白品種ではありません。",
        "小公子は日本で見られる黒ブドウ品種です。"
      ]
    },
    {
      id: "jp-muscat-bailey-a-breeder",
      category: "日本",
      importance: "A",
      question: "マスカット・ベーリーAを交配した人物は誰ですか？",
      choices: ["川上善兵衛", "麻井宇介", "大日本山梨葡萄酒会社", "ルイ・パストゥール"],
      answer: 0,
      note: "マスカット・ベーリーAは川上善兵衛が交配した黒ブドウ品種です。",
      notes: [
        "正解です。マスカット・ベーリーAは川上善兵衛が交配した黒ブドウ品種です。",
        "麻井宇介は日本ワイン史で重要な人物ですが、マスカット・ベーリーAの交配者ではありません。",
        "大日本山梨葡萄酒会社は日本ワイン史で重要な会社名です。",
        "ルイ・パストゥールは発酵研究で重要な人物です。"
      ]
    },
    {
      id: "bordeaux-right-bank-merlot",
      category: "フランス / ボルドー",
      importance: "A",
      question: "ボルドー右岸で主体となりやすい黒ブドウ品種はどれですか？",
      choices: ["Merlot", "Cabernet Sauvignon", "Syrah", "Pinot Noir"],
      answer: 0,
      note: "ボルドー右岸ではMerlotが主体になりやすい品種です。",
      notes: [
        "正解です。ボルドー右岸ではMerlotが主体になりやすい品種です。",
        "Cabernet Sauvignonはボルドー左岸で主体になりやすい品種です。",
        "Syrahは北部ローヌで重要な黒ブドウ品種です。",
        "Pinot Noirはブルゴーニュで重要な黒ブドウ品種です。"
      ]
    },
    {
      id: "bordeaux-left-bank-cabernet",
      category: "フランス / ボルドー",
      importance: "A",
      question: "ボルドー左岸で主体となりやすい黒ブドウ品種はどれですか？",
      choices: ["Cabernet Sauvignon", "Merlot", "Gamay", "Nebbiolo"],
      answer: 0,
      note: "ボルドー左岸ではCabernet Sauvignonが主体になりやすい品種です。",
      notes: [
        "正解です。ボルドー左岸ではCabernet Sauvignonが主体になりやすい品種です。",
        "Merlotはボルドー右岸で主体になりやすい品種です。",
        "GamayはBeaujolaisで重要な黒ブドウ品種です。",
        "Nebbioloはピエモンテで重要な黒ブドウ品種です。"
      ]
    }
  ];

  focusedSinglePointQuestions.forEach((item) => {
    addDetailed(item.id, item.category, item.importance, item.question, item.choices, item.answer, item.note, item.notes);
  });

  const italyTrendQuestions = [
    {
      id: "italy-lombardia-franciacorta",
      category: "イタリア / ロンバルディア",
      importance: "A",
      question: "Franciacortaの産地として正しいイタリアの州はどれですか？",
      choices: ["ロンバルディア", "ヴァッレ・ダオスタ", "プーリア", "カンパーニア"],
      answer: 0,
      note: "Franciacortaはロンバルディア州の瓶内二次発酵による発泡性ワインです。",
      notes: [
        "正解です。Franciacortaはロンバルディア州の瓶内二次発酵による発泡性ワインです。",
        "ヴァッレ・ダオスタはイタリア北西部の山岳州です。",
        "プーリアはPrimitivoやNegroamaroで重要な南部の州です。",
        "カンパーニアはTaurasi、Fiano di Avellino、Greco di Tufoで重要です。"
      ]
    },
    {
      id: "italy-north-emilia-romagna",
      category: "イタリア / 中部",
      importance: "B",
      question: "イタリアで一般的に北部イタリアに分類される州はどれですか？",
      choices: ["エミリア・ロマーニャ", "モリーゼ", "バジリカータ", "トスカーナ"],
      answer: 0,
      note: "エミリア・ロマーニャは北部イタリアに分類されます。",
      notes: [
        "正解です。エミリア・ロマーニャは北部イタリアに分類されます。",
        "モリーゼは南部イタリアに分類されます。",
        "バジリカータは南部イタリアに分類されます。",
        "トスカーナは中部イタリアに分類されます。"
      ]
    },
    {
      id: "italy-veneto-capital",
      category: "イタリア / ヴェネト",
      importance: "B",
      question: "ヴェネト州の州都はどれですか？",
      choices: ["ヴェネツィア", "トリエステ", "ジェノヴァ", "ポテンツァ"],
      answer: 0,
      note: "ヴェネト州の州都はヴェネツィアです。",
      notes: [
        "正解です。ヴェネト州の州都はヴェネツィアです。",
        "トリエステはフリウリ・ヴェネツィア・ジューリア州の州都です。",
        "ジェノヴァはリグーリア州の州都です。",
        "ポテンツァはバジリカータ州の州都です。"
      ]
    },
    {
      id: "italy-trentino-dolomites",
      category: "イタリア / トレンティーノ・アルト・アディジェ",
      importance: "B",
      question: "トレンティーノ・アルト・アディジェ州と関係が深い世界遺産はどれですか？",
      choices: ["ドロミーティ山塊", "カステル・デル・モンテ", "チンクエ・テッレの段々畑", "ランゲ・ロエロ・モンフェッラートの葡萄畑"],
      answer: 0,
      note: "ドロミーティ山塊はトレンティーノ・アルト・アディジェ州と関係が深い世界遺産です。",
      notes: [
        "正解です。ドロミーティ山塊はトレンティーノ・アルト・アディジェ州と関係が深い世界遺産です。",
        "カステル・デル・モンテはプーリア州の世界遺産です。",
        "チンクエ・テッレはリグーリア州の海沿いの景観です。",
        "ランゲ・ロエロ・モンフェッラートはピエモンテ州の葡萄畑景観です。"
      ]
    },
    {
      id: "italy-vino-novello-vintage",
      category: "イタリア / 法律・格付け",
      importance: "B",
      question: "イタリアのVino Novelloに関する記述として正しいものはどれですか？",
      choices: ["収穫年の表示が必要である", "炭酸ガス浸漬法のワインを100%使用する", "D.O.C.G.ワインのみに認められる", "最低アルコール度数は8%である"],
      answer: 0,
      note: "Vino Novelloは収穫年の表示が必要です。",
      notes: [
        "正解です。Vino Novelloは収穫年の表示が必要です。",
        "炭酸ガス浸漬法のワインを100%使用する必要はありません。",
        "D.O.C.G.ワインのみに限定される表示ではありません。",
        "最低アルコール度数8%という条件ではありません。"
      ]
    },
    {
      id: "italy-brunello-sangiovese-synonym",
      category: "イタリア / トスカーナ",
      importance: "A",
      question: "Brunello di Montalcinoで用いられるSangioveseのこの地方での別名はどれですか？",
      choices: ["Brunello", "Prugnolo Gentile", "Spanna", "Chiavennasca"],
      answer: 0,
      note: "Brunello di MontalcinoではSangioveseをBrunelloと呼びます。",
      notes: [
        "正解です。Brunello di MontalcinoではSangioveseをBrunelloと呼びます。",
        "Prugnolo GentileはVino Nobile di Montepulcianoで用いられるSangiovese系の名称です。",
        "SpannaはNebbioloの別名です。",
        "ChiavennascaもNebbioloの別名です。"
      ]
    },
    {
      id: "italy-still-wine-sugar-amabile",
      category: "イタリア / 法律・格付け",
      importance: "B",
      question: "イタリアのスティルワインの風味表示で、残糖12〜45g/Lに該当するものはどれですか？",
      choices: ["Amabile", "Abboccato", "Secco", "Dolce"],
      answer: 0,
      note: "残糖12〜45g/Lの表示はAmabileです。",
      notes: [
        "正解です。残糖12〜45g/Lの表示はAmabileです。",
        "AbboccatoはAmabileより残糖が少ない範囲で用いられます。",
        "Seccoは辛口を示します。",
        "DolceはAmabileより甘い範囲で用いられます。"
      ]
    },
    {
      id: "italy-largest-variety-sangiovese",
      category: "イタリア総まとめ",
      importance: "A",
      question: "イタリアで栽培面積が最も大きいブドウ品種はどれですか？",
      choices: ["Sangiovese", "Trebbiano Toscano", "Barbera", "Merlot"],
      answer: 0,
      note: "イタリアで栽培面積が最も大きい品種はSangioveseです。",
      notes: [
        "正解です。イタリアで栽培面積が最も大きい品種はSangioveseです。",
        "Trebbiano Toscanoは白ブドウの主要品種ですが、全体1位ではありません。",
        "Barberaはピエモンテなどで重要な黒ブドウ品種です。",
        "Merlotも栽培されていますが、イタリア全体の1位ではありません。"
      ]
    },
    {
      id: "italy-lazio-est-est-est",
      category: "イタリア / 中部",
      importance: "B",
      question: "Est! Est!! Est!!!で知られる州はどれですか？",
      choices: ["ラツィオ", "リグーリア", "モリーゼ", "トレンティーノ・アルト・アディジェ"],
      answer: 0,
      note: "Est! Est!! Est!!!はラツィオ州の白ワインで問われます。",
      notes: [
        "正解です。Est! Est!! Est!!!はラツィオ州の白ワインで問われます。",
        "リグーリアはチンクエ・テッレやヴェルメンティーノで問われます。",
        "モリーゼは南部の小州です。",
        "トレンティーノ・アルト・アディジェは北部山岳地域です。"
      ]
    }
  ];

  italyTrendQuestions.forEach((item) => {
    addDetailed(item.id, item.category, item.importance, item.question, item.choices, item.answer, item.note, item.notes);
  });

  const italyDocgTrendQuestions = [
    {
      id: "italy-piemonte-flavored-barolo-chinato",
      category: "イタリア / ピエモンテ",
      importance: "B",
      question: "ピエモンテ州で生産されるフレーヴァードワインはどれですか？",
      choices: ["Barolo Chinato", "Nizza", "Erbaluce di Caluso", "Ruchè di Castagnole Monferrato"],
      answer: 0,
      note: "Barolo ChinatoはBaroloをベースに香草・スパイスで風味付けするピエモンテのフレーヴァードワインです。",
      notes: [
        "正解です。Barolo ChinatoはBaroloをベースに香草・スパイスで風味付けするピエモンテのフレーヴァードワインです。",
        "NizzaはBarberaによるピエモンテの赤ワインD.O.C.G.です。",
        "Erbaluce di CalusoはErbaluceを用いるピエモンテの白・発泡・甘口ワインです。",
        "Ruchè di Castagnole MonferratoはRuchèによるピエモンテの赤ワインD.O.C.G.です。"
      ]
    },
    {
      id: "italy-docg-barolo-red-only",
      category: "イタリア / ピエモンテ",
      importance: "A",
      question: "イタリアのD.O.C.G.のうち、赤ワインのみが認められているものはどれですか？",
      choices: ["Barolo", "Conegliano Valdobbiadene-Prosecco", "Soave Superiore", "Asti"],
      answer: 0,
      note: "BaroloはNebbioloから造られる赤ワインのみのD.O.C.G.です。",
      notes: [
        "正解です。BaroloはNebbioloから造られる赤ワインのみのD.O.C.G.です。",
        "Conegliano Valdobbiadene-ProseccoはGlera主体の発泡性ワインです。",
        "Soave SuperioreはGarganega主体の白ワインです。",
        "AstiはMoscato Bianco主体の発泡性甘口ワインで問われます。"
      ]
    },
    {
      id: "italy-frascati-malvasia",
      category: "イタリア / 中部",
      importance: "B",
      question: "Frascati Superioreで主要品種として使われるものはどれですか？",
      choices: ["Malvasia Bianca di Candia", "Sangiovese", "Nebbiolo", "Glera"],
      answer: 0,
      note: "Frascati SuperioreはMalvasia系品種を中心に造られるラツィオ州の白ワインです。",
      notes: [
        "正解です。Frascati SuperioreはMalvasia系品種を中心に造られるラツィオ州の白ワインです。",
        "Sangioveseはトスカーナなどで重要な黒ブドウ品種です。",
        "Nebbioloはピエモンテで重要な黒ブドウ品種です。",
        "GleraはProseccoで重要な白ブドウ品種です。"
      ]
    },
    {
      id: "italy-conegliano-valdobbiadene-veneto",
      category: "イタリア / ヴェネト",
      importance: "A",
      question: "Conegliano Valdobbiadene-Proseccoが生産される州はどれですか？",
      choices: ["ヴェネト", "トスカーナ", "カラブリア", "ピエモンテ"],
      answer: 0,
      note: "Conegliano Valdobbiadene-Proseccoはヴェネト州のD.O.C.G.です。",
      notes: [
        "正解です。Conegliano Valdobbiadene-Proseccoはヴェネト州のD.O.C.G.です。",
        "トスカーナはChianti ClassicoやBrunello di Montalcinoで重要です。",
        "カラブリアは南部イタリアの州です。",
        "ピエモンテはBaroloやBarbarescoで重要です。"
      ]
    },
    {
      id: "italy-asti-moscato-bianco",
      category: "イタリア / ピエモンテ",
      importance: "A",
      question: "Astiの主要品種はどれですか？",
      choices: ["Moscato Bianco", "Dolcetto", "Chiavennasca", "Cesanese"],
      answer: 0,
      note: "AstiはMoscato Biancoを用いるピエモンテの発泡性甘口ワインです。",
      notes: [
        "正解です。AstiはMoscato Biancoを用いるピエモンテの発泡性甘口ワインです。",
        "Dolcettoはピエモンテで重要な黒ブドウ品種です。",
        "ChiavennascaはNebbioloの別名です。",
        "Cesaneseはラツィオで重要な黒ブドウ品種です。"
      ]
    },
    {
      id: "italy-colli-bolognesi-pignoletto-spumante",
      category: "イタリア / 中部",
      importance: "B",
      question: "スプマンテが認められているD.O.C.G.はどれですか？",
      choices: ["Colli Bolognesi Pignoletto", "Torgiano Rosso Riserva", "Lison", "Sagrantino di Montefalco"],
      answer: 0,
      note: "Colli Bolognesi Pignolettoではスプマンテも認められています。",
      notes: [
        "正解です。Colli Bolognesi Pignolettoではスプマンテも認められています。",
        "Torgiano Rosso Riservaはウンブリア州の赤ワインD.O.C.G.です。",
        "Lisonは白ワインのD.O.C.G.です。",
        "Sagrantino di Montefalcoはウンブリア州の赤ワインD.O.C.G.です。"
      ]
    },
    {
      id: "italy-cuisine-pollo-alla-romana",
      category: "イタリア / 中部",
      importance: "C",
      question: "ピーマンとトマトで煮込んだ鶏肉料理はどれですか？",
      choices: ["Pollo alla Romana", "Ossobuco", "Pastissada de Caval", "Peperone Ripieno"],
      answer: 0,
      note: "Pollo alla Romanaはピーマンとトマトで煮込むローマ風の鶏肉料理です。",
      notes: [
        "正解です。Pollo alla Romanaはピーマンとトマトで煮込むローマ風の鶏肉料理です。",
        "Ossobucoは仔牛すね肉の煮込み料理です。",
        "Pastissada de Cavalはヴェネトの馬肉料理です。",
        "Peperone Ripienoは詰め物をしたピーマン料理です。"
      ]
    },
    {
      id: "italy-carmignano-cabernet",
      category: "イタリア / トスカーナ",
      importance: "B",
      question: "Carmignanoの主要品種に含まれるものはどれですか？",
      choices: ["Cabernet Sauvignon", "Manzoni Bianco", "Bellone", "Malvasia del Lazio"],
      answer: 0,
      note: "CarmignanoはSangioveseに加え、Cabernet SauvignonやCabernet Francを用いるトスカーナのD.O.C.G.です。",
      notes: [
        "正解です。CarmignanoはSangioveseに加え、Cabernet SauvignonやCabernet Francを用いるトスカーナのD.O.C.G.です。",
        "Manzoni Biancoは北部イタリアで見られる白ブドウ品種です。",
        "Belloneはラツィオで見られる白ブドウ品種です。",
        "Malvasia del Lazioはラツィオの白ワインで重要な品種です。"
      ]
    },
    {
      id: "italy-ruche-red-only",
      category: "イタリア / ピエモンテ",
      importance: "B",
      question: "赤ワインのみが認められているD.O.C.G.はどれですか？",
      choices: ["Ruchè di Castagnole Monferrato", "Conegliano Valdobbiadene-Prosecco", "Ramandolo", "Offida"],
      answer: 0,
      note: "Ruchè di Castagnole Monferratoはピエモンテ州の赤ワインD.O.C.G.です。",
      notes: [
        "正解です。Ruchè di Castagnole Monferratoはピエモンテ州の赤ワインD.O.C.G.です。",
        "Conegliano Valdobbiadene-Proseccoは発泡性ワインのD.O.C.G.です。",
        "Ramandoloはフリウリの甘口白ワインD.O.C.G.です。",
        "Offidaは複数タイプが認められるマルケ州のD.O.C.G.です。"
      ]
    },
    {
      id: "italy-lombardia-docg-franciacorta",
      category: "イタリア / ロンバルディア",
      importance: "A",
      question: "ロンバルディア州のD.O.C.G.として正しいものはどれですか？",
      choices: ["Franciacorta", "Gavi", "Rosazzo", "Aglianico del Vulture Superiore"],
      answer: 0,
      note: "Franciacortaはロンバルディア州のD.O.C.G.です。",
      notes: [
        "正解です。Franciacortaはロンバルディア州のD.O.C.G.です。",
        "Gaviはピエモンテ州のD.O.C.G.です。",
        "Rosazzoはフリウリ・ヴェネツィア・ジューリア州のD.O.C.G.です。",
        "Aglianico del Vulture Superioreはバジリカータ州のD.O.C.G.です。"
      ]
    }
  ];

  italyDocgTrendQuestions.forEach((item) => {
    addDetailed(item.id, item.category, item.importance, item.question, item.choices, item.answer, item.note, item.notes);
  });

  const burgundyAocTrendQuestions = [
    {
      id: "bourgogne-cote-dor-district",
      category: "フランス / ブルゴーニュ",
      importance: "A",
      question: "主にコート・ドール県に属するブルゴーニュ地方の生産地区はどれですか？",
      choices: ["Côte de Nuits", "Mâconnais", "Grand Auxerrois", "Chablis"],
      answer: 0,
      note: "Côte de NuitsはCôte de Beauneとともに主にコート・ドール県に属します。",
      notes: [
        "正解です。Côte de NuitsはCôte de Beauneとともに主にコート・ドール県に属します。",
        "Mâconnaisはソーヌ・エ・ロワール県側の地区です。",
        "Grand Auxerroisはヨンヌ県側の地区です。",
        "Chablisはヨンヌ県側の地区です。"
      ]
    },
    {
      id: "bourgogne-cote-chalonnaise-village",
      category: "フランス / ブルゴーニュ",
      importance: "B",
      question: "Côte Chalonnaise地区の村名A.O.C.はどれですか？",
      choices: ["Mercurey", "Pouilly-Fuissé", "Viré-Clessé", "Pouilly-Loché"],
      answer: 0,
      note: "MercureyはCôte Chalonnaise地区の村名A.O.C.です。",
      notes: [
        "正解です。MercureyはCôte Chalonnaise地区の村名A.O.C.です。",
        "Pouilly-FuisséはMâconnais地区の村名A.O.C.です。",
        "Viré-ClesséはMâconnais地区の村名A.O.C.です。",
        "Pouilly-LochéはMâconnais地区の村名A.O.C.です。"
      ]
    },
    {
      id: "bourgogne-chablis-premier-cru-color",
      category: "フランス / ブルゴーニュ",
      importance: "A",
      question: "Chablis Premier Cruで生産できるワインの種類はどれですか？",
      choices: ["白ワインのみ", "赤ワインのみ", "赤・白ワイン", "赤・白・ロゼワイン"],
      answer: 0,
      note: "Chablis Premier CruはChardonnayによる白ワインのみです。",
      notes: [
        "正解です。Chablis Premier CruはChardonnayによる白ワインのみです。",
        "赤ワインは認められていません。",
        "赤・白両方ではなく、白ワインのみです。",
        "ロゼワインも認められていません。"
      ]
    },
    {
      id: "bourgogne-chablis-description",
      category: "フランス / ブルゴーニュ",
      importance: "A",
      question: "冷涼な気候からミネラル感のあるChardonnayが生まれ、品質により4つのA.O.C.に分かれる地区はどれですか？",
      choices: ["Chablis", "Mâconnais", "Beaujolais", "Côte Chalonnaise"],
      answer: 0,
      note: "Chablisは冷涼な気候とChardonnayの白ワインで知られ、4段階のA.O.C.で問われます。",
      notes: [
        "正解です。Chablisは冷涼な気候とChardonnayの白ワインで知られ、4段階のA.O.C.で問われます。",
        "Mâconnaisはブルゴーニュ南部のChardonnay主体の産地ですが、この説明はChablisです。",
        "Beaujolaisは主にGamayの赤ワインで問われます。",
        "Côte ChalonnaiseはMercureyやRullyなどで問われる地区です。"
      ]
    },
    {
      id: "bourgogne-ladoix-color",
      category: "フランス / ブルゴーニュ",
      importance: "B",
      question: "Ladoixで生産できるワインの種類はどれですか？",
      choices: ["赤・白ワイン", "赤ワインのみ", "白ワインのみ", "赤・白・ロゼワイン"],
      answer: 0,
      note: "Ladoixでは赤ワインと白ワインが認められています。",
      notes: [
        "正解です。Ladoixでは赤ワインと白ワインが認められています。",
        "赤ワインのみではありません。",
        "白ワインのみではありません。",
        "ロゼワインは含みません。"
      ]
    },
    {
      id: "bourgogne-pommard-color",
      category: "フランス / ブルゴーニュ",
      importance: "A",
      question: "Pommardで生産できるワインの種類はどれですか？",
      choices: ["赤ワインのみ", "白ワインのみ", "赤・白ワイン", "赤・白・ロゼワイン"],
      answer: 0,
      note: "Pommardは赤ワインのみの村名A.O.C.です。",
      notes: [
        "正解です。Pommardは赤ワインのみの村名A.O.C.です。",
        "白ワインは認められていません。",
        "赤・白両方ではありません。",
        "ロゼワインも認められていません。"
      ]
    },
    {
      id: "bourgogne-cote-de-brouilly-color",
      category: "フランス / ブルゴーニュ",
      importance: "B",
      question: "Côte de Brouillyで生産できるワインの種類はどれですか？",
      choices: ["赤ワインのみ", "白ワインのみ", "ロゼワインのみ", "赤・白・ロゼワイン"],
      answer: 0,
      note: "Côte de BrouillyはBeaujolais地区のクリュで、赤ワインのみです。",
      notes: [
        "正解です。Côte de BrouillyはBeaujolais地区のクリュで、赤ワインのみです。",
        "白ワインは認められていません。",
        "ロゼワインのみではありません。",
        "赤・白・ロゼすべてではありません。"
      ]
    },
    {
      id: "bourgogne-nuits-saint-georges-color",
      category: "フランス / ブルゴーニュ",
      importance: "B",
      question: "Nuits-Saint-Georgesで生産できるワインの種類はどれですか？",
      choices: ["赤・白ワイン", "赤ワインのみ", "白ワインのみ", "ロゼワインのみ"],
      answer: 0,
      note: "Nuits-Saint-Georgesでは赤ワインと白ワインが認められています。",
      notes: [
        "正解です。Nuits-Saint-Georgesでは赤ワインと白ワインが認められています。",
        "赤ワインのみではありません。",
        "白ワインのみではありません。",
        "ロゼワインのみではありません。"
      ]
    },
    {
      id: "bourgogne-saint-bris-variety",
      category: "フランス / ブルゴーニュ",
      importance: "A",
      question: "Saint-Brisで用いられる主要品種はどれですか？",
      choices: ["Sauvignon Blanc", "Chardonnay", "Pinot Noir", "Gamay"],
      answer: 0,
      note: "Saint-Brisはブルゴーニュで例外的にSauvignon Blancを用いるA.O.C.です。",
      notes: [
        "正解です。Saint-Brisはブルゴーニュで例外的にSauvignon Blancを用いるA.O.C.です。",
        "ChardonnayはChablisや多くのブルゴーニュ白で重要ですが、Saint-Brisの主要品種ではありません。",
        "Pinot Noirはブルゴーニュ赤の基本品種です。",
        "GamayはBeaujolaisで重要な黒ブドウ品種です。"
      ]
    },
    {
      id: "bourgogne-rully-area",
      category: "フランス / ブルゴーニュ",
      importance: "B",
      question: "Rullyが位置するブルゴーニュ地方の地区はどれですか？",
      choices: ["Côte Chalonnaise", "Côte de Nuits", "Chablis", "Beaujolais"],
      answer: 0,
      note: "RullyはCôte Chalonnaise地区の村名A.O.C.です。",
      notes: [
        "正解です。RullyはCôte Chalonnaise地区の村名A.O.C.です。",
        "Côte de Nuitsではありません。",
        "Chablis地区ではありません。",
        "Beaujolais地区ではありません。"
      ]
    },
    {
      id: "bourgogne-pinot-noir-share",
      category: "フランス / ブルゴーニュ",
      importance: "B",
      question: "ボージョレ地区を除くブルゴーニュで、Pinot Noirが占める栽培比率に最も近いものはどれですか？",
      choices: ["39.5%", "30.5%", "51%", "62%"],
      answer: 0,
      note: "ボージョレを除くブルゴーニュでは、Pinot Noirの栽培比率は約39.5%が目安です。",
      notes: [
        "正解です。ボージョレを除くブルゴーニュでは、Pinot Noirの栽培比率は約39.5%が目安です。",
        "30.5%ではやや低い数値です。",
        "51%では高すぎます。",
        "62%では高すぎます。"
      ]
    },
    {
      id: "bourgogne-aoc-count",
      category: "フランス / ブルゴーニュ",
      importance: "B",
      question: "ブルゴーニュ地方のA.O.C.総数に最も近いものはどれですか？",
      choices: ["約80個", "約20個", "約40個", "約160個"],
      answer: 0,
      note: "ブルゴーニュ地方のA.O.C.総数は約80個が目安です。",
      notes: [
        "正解です。ブルゴーニュ地方のA.O.C.総数は約80個が目安です。",
        "約20個では少なすぎます。",
        "約40個では少なすぎます。",
        "約160個では多すぎます。"
      ]
    },
    {
      id: "bourgogne-cote-de-nuits-order",
      category: "フランス / ブルゴーニュ",
      importance: "A",
      question: "Côte de Nuits地区の村を北から南へ並べたものとして正しいものはどれですか？",
      choices: ["Fixin → Morey-Saint-Denis → Chambolle-Musigny → Vosne-Romanée", "Gevrey-Chambertin → Chambolle-Musigny → Marsannay → Morey-Saint-Denis", "Chambolle-Musigny → Vosne-Romanée → Marsannay → Vougeot", "Vosne-Romanée → Morey-Saint-Denis → Gevrey-Chambertin → Chambolle-Musigny"],
      answer: 0,
      note: "Côte de Nuitsは北からFixin、Gevrey-Chambertin、Morey-Saint-Denis、Chambolle-Musigny、Vougeot、Vosne-Romanée方面へ続きます。",
      notes: [
        "正解です。Fixinから南へMorey-Saint-Denis、Chambolle-Musigny、Vosne-Romanée方面へ続きます。",
        "MarsannayはCôte de Nuitsの北端側なので、この位置ではありません。",
        "MarsannayはChambolle-MusignyやVosne-Romanéeより北です。",
        "Vosne-RomanéeはGevrey-ChambertinやMorey-Saint-Denisより南です。"
      ]
    },
    {
      id: "bourgogne-red-only-aoc-gevery",
      category: "フランス / ブルゴーニュ",
      importance: "A",
      question: "次のうち、赤ワインのみを生産できるブルゴーニュのA.O.C.はどれですか？",
      choices: ["Gevrey-Chambertin", "Meursault", "Saint-Bris", "Chassagne-Montrachet"],
      answer: 0,
      note: "Gevrey-Chambertinは赤ワインのみの村名A.O.C.です。",
      notes: [
        "正解です。Gevrey-Chambertinは赤ワインのみの村名A.O.C.です。",
        "Meursaultは白ワインの村として重要です。",
        "Saint-BrisはSauvignon Blancの白ワインで問われます。",
        "Chassagne-Montrachetでは赤ワインと白ワインが認められます。"
      ]
    },
    {
      id: "bourgogne-red-white-aoc-mercurey",
      category: "フランス / ブルゴーニュ",
      importance: "B",
      question: "次のうち、赤ワインと白ワインを生産できるブルゴーニュのA.O.C.はどれですか？",
      choices: ["Mercurey", "Irancy", "Chénas", "Volnay"],
      answer: 0,
      note: "Mercureyでは赤ワインと白ワインが認められています。",
      notes: [
        "正解です。Mercureyでは赤ワインと白ワインが認められています。",
        "Irancyは赤ワインで問われるA.O.C.です。",
        "ChénasはBeaujolaisのクリュで赤ワインのみです。",
        "Volnayは赤ワインのみの村名A.O.C.です。"
      ]
    }
  ];

  burgundyAocTrendQuestions.forEach((item) => {
    addDetailed(item.id, item.category, item.importance, item.question, item.choices, item.answer, item.note, item.notes);
  });

  const burgundyGrandCruTrendQuestions = [
    {
      id: "bourgogne-la-grande-rue-village",
      category: "フランス / ブルゴーニュ",
      importance: "A",
      question: "Grand Cru「La Grande Rue」が属する村はどれですか？",
      choices: ["Vosne-Romanée", "Aloxe-Corton", "Gevrey-Chambertin", "Puligny-Montrachet"],
      answer: 0,
      note: "La Grande RueはVosne-Romanée村のGrand Cruです。",
      notes: [
        "正解です。La Grande RueはVosne-Romanée村のGrand Cruです。",
        "Aloxe-CortonはCortonの丘で重要な村です。",
        "Gevrey-ChambertinはChambertin系Grand Cruで重要な村です。",
        "Puligny-MontrachetはMontrachet系Grand Cruで重要な村です。"
      ]
    },
    {
      id: "bourgogne-clos-de-la-roche-grand-cru",
      category: "フランス / ブルゴーニュ",
      importance: "A",
      question: "次のうち、ブルゴーニュ地方のGrand Cruはどれですか？",
      choices: ["Clos de la Roche", "Aux Malconsorts", "Les Grands Champs", "Hervelets"],
      answer: 0,
      note: "Clos de la RocheはMorey-Saint-Denis村のGrand Cruです。",
      notes: [
        "正解です。Clos de la RocheはMorey-Saint-Denis村のGrand Cruです。",
        "Aux MalconsortsはVosne-RomanéeのPremier Cruで問われます。",
        "Les Grands ChampsはGrand Cru名ではありません。",
        "HerveletsはPremier Cru名として問われます。"
      ]
    },
    {
      id: "bourgogne-mazoyeres-chambertin-grand-cru",
      category: "フランス / ブルゴーニュ",
      importance: "A",
      question: "Gevrey-Chambertin村のGrand Cruとして正しいものはどれですか？",
      choices: ["Mazoyères-Chambertin", "Les Duresses", "Clos des Varoilles", "Perrières"],
      answer: 0,
      note: "Mazoyères-ChambertinはGevrey-Chambertin村のGrand Cruです。",
      notes: [
        "正解です。Mazoyères-ChambertinはGevrey-Chambertin村のGrand Cruです。",
        "Les DuressesはAuxey-Duressesで問われるPremier Cru名です。",
        "Clos des VaroillesはPremier Cru名として問われます。",
        "Perrièresは複数村に見られるPremier Cru名で、ここではGrand Cruではありません。"
      ]
    },
    {
      id: "bourgogne-chablis-premier-cru-beauroy",
      category: "フランス / ブルゴーニュ",
      importance: "B",
      question: "次のうち、Chablis Premier Cruとして正しいものはどれですか？",
      choices: ["Beauroy", "Clos Saint-Jacques", "Clos des 60 Ouvrées", "Perrières"],
      answer: 0,
      note: "BeauroyはChablis Premier Cruです。",
      notes: [
        "正解です。BeauroyはChablis Premier Cruです。",
        "Clos Saint-JacquesはGevrey-ChambertinのPremier Cruで問われます。",
        "Clos des 60 OuvréesはChablis Premier Cruではありません。",
        "PerrièresはMeursaultなどで重要なPremier Cru名です。"
      ]
    },
    {
      id: "bourgogne-corton-villages",
      category: "フランス / ブルゴーニュ",
      importance: "A",
      question: "Grand Cru「Corton」が属する村の組み合わせとして正しいものはどれですか？",
      choices: ["Pernand-Vergelesses / Aloxe-Corton / Ladoix-Serrigny", "Pernand-Vergelesses / Aloxe-Corton", "Pernand-Vergelesses / Ladoix-Serrigny", "Aloxe-Corton / Ladoix-Serrigny"],
      answer: 0,
      note: "CortonはPernand-Vergelesses、Aloxe-Corton、Ladoix-SerrignyにまたがるGrand Cruです。",
      notes: [
        "正解です。CortonはPernand-Vergelesses、Aloxe-Corton、Ladoix-SerrignyにまたがるGrand Cruです。",
        "Ladoix-Serrignyも含まれます。",
        "Aloxe-Cortonも含まれます。",
        "Pernand-Vergelessesも含まれます。"
      ]
    },
    {
      id: "bourgogne-chevalier-montrachet-village",
      category: "フランス / ブルゴーニュ",
      importance: "A",
      question: "Grand Cru「Chevalier-Montrachet」が属する村はどれですか？",
      choices: ["Puligny-Montrachet", "Chassagne-Montrachet", "Meursault / Puligny-Montrachet", "Puligny-Montrachet / Chassagne-Montrachet"],
      answer: 0,
      note: "Chevalier-MontrachetはPuligny-Montrachet村のGrand Cruです。",
      notes: [
        "正解です。Chevalier-MontrachetはPuligny-Montrachet村のGrand Cruです。",
        "Chassagne-Montrachet村単独ではありません。",
        "Meursault村にはGrand Cruがありません。",
        "Puligny-MontrachetとChassagne-MontrachetにまたがるのはMontrachetなどで問われます。"
      ]
    },
    {
      id: "bourgogne-la-moutonne",
      category: "フランス / ブルゴーニュ",
      importance: "B",
      question: "Chablis地区で、VaudésirとPreusesにまたがる非公式なGrand Cruはどれですか？",
      choices: ["La Moutonne", "Grenouilles", "Fourchaume", "Vaillons"],
      answer: 0,
      note: "La MoutonneはVaudésirとPreusesにまたがる非公式なGrand Cruとして問われます。",
      notes: [
        "正解です。La MoutonneはVaudésirとPreusesにまたがる非公式なGrand Cruとして問われます。",
        "GrenouillesはChablisの公式Grand Cruの一つです。",
        "FourchaumeはChablis Premier Cruです。",
        "VaillonsはChablis Premier Cruです。"
      ]
    },
    {
      id: "bourgogne-griotte-chambertin-color",
      category: "フランス / ブルゴーニュ",
      importance: "B",
      question: "Grand Cru「Griotte-Chambertin」で生産できるワインの種類はどれですか？",
      choices: ["赤ワインのみ", "白ワインのみ", "赤・白ワイン", "赤・白・ロゼワイン"],
      answer: 0,
      note: "Griotte-ChambertinはGevrey-Chambertin村の赤ワインGrand Cruです。",
      notes: [
        "正解です。Griotte-ChambertinはGevrey-Chambertin村の赤ワインGrand Cruです。",
        "白ワインは認められていません。",
        "赤・白両方ではありません。",
        "ロゼワインも認められていません。"
      ]
    }
  ];

  burgundyGrandCruTrendQuestions.forEach((item) => {
    addDetailed(item.id, item.category, item.importance, item.question, item.choices, item.answer, item.note, item.notes);
  });

  const freeRangeReferenceQuestions = [
    {
      id: "intro-brandy-cognac-variety",
      category: "酒類飲料概論",
      importance: "A",
      question: "Cognacの原料として中心となる白ブドウ品種はどれですか？",
      choices: ["Ugni Blanc", "Mauzac", "Altesse", "Pinot Blanc"],
      answer: 0,
      note: "Cognacでは酸が高くニュートラルなUgni Blancが中心品種です。",
      notes: [
        "正解です。Cognacでは酸が高くニュートラルなUgni Blancが中心品種です。",
        "Mauzacは南西フランスやLimouxなどで見られる品種で、Cognacの中心品種ではありません。",
        "Altesseはサヴォワで重要な白ブドウ品種です。",
        "Pinot Blancはアルザスなどで見られますが、Cognacの中心品種ではありません。"
      ]
    },
    {
      id: "intro-calvados-vieux-age",
      category: "酒類飲料概論",
      importance: "B",
      question: "Calvadosの表示「Vieux」に必要な最低熟成年数はどれですか？",
      choices: ["3年", "1年", "4年", "6年"],
      answer: 0,
      note: "CalvadosのVieuxは最低3年熟成です。",
      notes: [
        "正解です。CalvadosのVieuxは最低3年熟成です。",
        "1年はVieuxの最低熟成年数としては短すぎます。",
        "4年はV.O.やVieille Reserveなどで意識する年数です。",
        "6年はXO系の表示で意識する年数です。"
      ]
    },
    {
      id: "intro-hop-lupulin",
      category: "酒類飲料概論",
      importance: "B",
      question: "ビールのホップに含まれ、苦味や香りに関係する成分はどれですか？",
      choices: ["ルプリン", "ピート", "スターチ", "麦芽"],
      answer: 0,
      note: "ルプリンはホップの苦味や香りに関係する成分です。",
      notes: [
        "正解です。ルプリンはホップの苦味や香りに関係する成分です。",
        "ピートは主にウイスキーのスモーキーな香味で問われます。",
        "スターチはデンプンで、ホップの苦味成分ではありません。",
        "麦芽はビールの主原料ですが、ホップ由来の苦味成分ではありません。"
      ]
    },
    {
      id: "intro-cocktail-gin",
      category: "酒類飲料概論",
      importance: "B",
      question: "次のカクテルのうち、Ginをベースにするものはどれですか？",
      choices: ["Negroni", "Kir", "Black Russian", "Mimosa"],
      answer: 0,
      note: "NegroniはGin、Campari、Sweet Vermouthを用いるカクテルです。",
      notes: [
        "正解です。NegroniはGin、Campari、Sweet Vermouthを用いるカクテルです。",
        "Kirは白ワインとクレーム・ド・カシスを用いるカクテルです。",
        "Black RussianはVodkaとCoffee Liqueurを用いるカクテルです。",
        "MimosaはChampagneとOrange Juiceを用いるカクテルです。"
      ]
    },
    {
      id: "intro-cocktail-stir",
      category: "酒類飲料概論",
      importance: "B",
      question: "Stirで作る代表的なカクテルはどれですか？",
      choices: ["Manhattan", "Salty Dog", "Grasshopper", "Kir Royal"],
      answer: 0,
      note: "Manhattanはステアで作る代表的なカクテルです。",
      notes: [
        "正解です。Manhattanはステアで作る代表的なカクテルです。",
        "Salty DogはVodkaとGrapefruit Juiceを用いるカクテルです。",
        "Grasshopperはシェークで作るクリーム系カクテルです。",
        "Kir RoyalはChampagneとクレーム・ド・カシスを用いるカクテルです。"
      ]
    },
    {
      id: "intro-whisky-scotch",
      category: "酒類飲料概論",
      importance: "B",
      question: "Scotch Whiskyの味わいの特徴として、最も適切なものはどれですか？",
      choices: ["複雑で多彩な香味を持ち、スモーキーな香りも特徴になる", "ライトでスムーズで、主にカクテルベースに使われる", "穀物の穏やかな風味が中心で、クセが少ない", "甘味を加えて造る混成酒である"],
      answer: 0,
      note: "Scotch Whiskyは地域差が大きく、ピート由来のスモーキーな香りも重要です。",
      notes: [
        "正解です。Scotch Whiskyは地域差が大きく、ピート由来のスモーキーな香りも重要です。",
        "ライトでスムーズという説明はIrish Whiskeyなどとの比較で出やすい表現です。",
        "穀物の穏やかな風味という説明はCanadian Whiskyなどとの比較で意識します。",
        "甘味を加えた混成酒ではなく、穀物を原料にした蒸留酒です。"
      ]
    },
    {
      id: "intro-huangjiu",
      category: "酒類飲料概論",
      importance: "C",
      question: "中国酒「黄酒」の説明として、最も適切なものはどれですか？",
      choices: ["主に糯米などを原料とし、麹で発酵させる醸造酒", "高粱などを原料とする中国古来の蒸留酒", "米麹のみを原料にした蒸留酒", "ブドウを原料とする酒精強化ワイン"],
      answer: 0,
      note: "黄酒は主に糯米などを原料に発酵させる醸造酒です。",
      notes: [
        "正解です。黄酒は主に糯米などを原料に発酵させる醸造酒です。",
        "高粱などを原料とする蒸留酒は白酒で問われます。",
        "米麹のみを原料にした蒸留酒ではありません。",
        "ブドウを原料とする酒精強化ワインではありません。"
      ]
    },
    {
      id: "synonym-cot-malbec",
      category: "ワイン概論 / 品種別名",
      importance: "A",
      question: "Côtの別名として正しいものはどれですか？",
      choices: ["Malbec", "Muscadet", "Rulander", "Klevner"],
      answer: 0,
      note: "CôtはMalbecの別名です。",
      notes: [
        "正解です。CôtはMalbecの別名です。",
        "Muscadetはロワールのワイン名で、品種はMelon de Bourgogneです。",
        "RulanderはPinot Grisの別名です。",
        "Klevnerは地域によりPinot Blancなどと関係する名称で、Côtの別名ではありません。"
      ]
    },
    {
      id: "synonym-spanna-nebbiolo",
      category: "ワイン概論 / 品種別名",
      importance: "A",
      question: "Spannaの別名として正しいものはどれですか？",
      choices: ["Nebbiolo", "Cabernet Franc", "Chardonnay", "Pinot Blanc"],
      answer: 0,
      note: "SpannaはNebbioloの別名です。",
      notes: [
        "正解です。SpannaはNebbioloの別名です。",
        "Cabernet FrancはロワールなどでBretonとも呼ばれます。",
        "ChardonnayはSpannaの別名ではありません。",
        "Pinot BlancはSpannaの別名ではありません。"
      ]
    },
    {
      id: "synonym-monastrell-mourvedre",
      category: "ワイン概論 / 品種別名",
      importance: "A",
      question: "Monastrellの別名として正しいものはどれですか？",
      choices: ["Mourvedre", "Aragonez", "Tinto Fino", "Malvoisie de Corse"],
      answer: 0,
      note: "MonastrellはMourvedreのスペイン名です。",
      notes: [
        "正解です。MonastrellはMourvedreのスペイン名です。",
        "AragonezはポルトガルでのTempranillo系の別名です。",
        "Tinto FinoはRibera del Dueroなどで用いられるTempranillo系の名称です。",
        "Malvoisie de CorseはVermentino系の名称として問われます。"
      ]
    },
    {
      id: "synonym-serine-syrah",
      category: "ワイン概論 / 品種別名",
      importance: "B",
      question: "Serineの別名として正しいものはどれですか？",
      choices: ["Syrah", "Sangiovese", "Cabernet Franc", "Pinot Gris"],
      answer: 0,
      note: "SerineはSyrahの別名です。",
      notes: [
        "正解です。SerineはSyrahの別名です。",
        "SangioveseはBrunelloなどの別名と合わせて問われます。",
        "Cabernet FrancはBretonなどの別名で問われます。",
        "Pinot GrisはRulanderやGrauburgunderなどの別名で問われます。"
      ]
    },
    {
      id: "synonym-pinot-gris",
      category: "ワイン概論 / 品種別名",
      importance: "A",
      question: "Pinot Grisの別名の組み合わせとして正しいものはどれですか？",
      choices: ["Grauburgunder / Rulander", "Spanna / Chiavennasca", "Mazuelo / Carinena", "Shiraz / Serine"],
      answer: 0,
      note: "Pinot Grisはドイツ語圏でGrauburgunder、Rulanderなどと呼ばれます。",
      notes: [
        "正解です。Pinot Grisはドイツ語圏でGrauburgunder、Rulanderなどと呼ばれます。",
        "Spanna / ChiavennascaはNebbioloの別名です。",
        "Mazuelo / CarinenaはCarignanの別名です。",
        "Shiraz / SerineはSyrahの別名です。"
      ]
    },
    {
      id: "synonym-carignan-mazuelo",
      category: "ワイン概論 / 品種別名",
      importance: "B",
      question: "Carignanの別名として正しいものはどれですか？",
      choices: ["Mazuelo", "Rolle", "Meunier", "Cencibel"],
      answer: 0,
      note: "CarignanはスペインでMazueloなどと呼ばれます。",
      notes: [
        "正解です。CarignanはスペインでMazueloなどと呼ばれます。",
        "RolleはVermentino系の名称です。",
        "Meunierはシャンパーニュの主要品種の一つです。",
        "CencibelはTempranillo系の名称です。"
      ]
    },
    {
      id: "synonym-syrah-shiraz",
      category: "ワイン概論 / 品種別名",
      importance: "A",
      question: "Syrahの別名として正しいものはどれですか？",
      choices: ["Shiraz", "Auxerrois", "Muscadet", "Cabernet Franc"],
      answer: 0,
      note: "SyrahはオーストラリアなどでShirazと呼ばれます。",
      notes: [
        "正解です。SyrahはオーストラリアなどでShirazと呼ばれます。",
        "Auxerroisは複数の文脈で出る名称ですが、Syrahの別名ではありません。",
        "Muscadetはワイン名で、品種はMelon de Bourgogneです。",
        "Cabernet FrancはSyrahの別名ではありません。"
      ]
    },
    {
      id: "synonym-blauburgunder-pinot-noir",
      category: "ワイン概論 / 品種別名",
      importance: "A",
      question: "Blauburgunderの別名として正しいものはどれですか？",
      choices: ["Pinot Noir", "Mourvedre", "Furmint", "Mission"],
      answer: 0,
      note: "BlauburgunderはPinot Noirの別名です。",
      notes: [
        "正解です。BlauburgunderはPinot Noirの別名です。",
        "MourvedreはMonastrellとも呼ばれます。",
        "FurmintはハンガリーのTokajiなどで重要な白ブドウ品種です。",
        "MissionはPaísなどと関係する名称で、Pinot Noirの別名ではありません。"
      ]
    },
    {
      id: "bordeaux-classification-trigger",
      category: "フランス / ボルドー",
      importance: "A",
      question: "1855年のボルドー格付けが制定された契機はどれですか？",
      choices: ["パリ万国博覧会", "フィロキセラ被害の拡大", "A.O.C.制度の開始", "EUワイン法の改正"],
      answer: 0,
      note: "1855年格付けはパリ万国博覧会を契機に制定されました。",
      notes: [
        "正解です。1855年格付けはパリ万国博覧会を契機に制定されました。",
        "フィロキセラ被害は19世紀後半のブドウ栽培に大きな影響を与えましたが、1855年格付けの直接の契機ではありません。",
        "A.O.C.制度の開始は20世紀の原産地呼称制度の話です。",
        "EUワイン法の改正は1855年格付けとは時代が異なります。"
      ]
    },
    {
      id: "bordeaux-classification-sauternes",
      category: "フランス / ボルドー",
      importance: "B",
      question: "1855年格付けで、赤ワインとは別に格付け対象となった甘口白ワイン産地はどれですか？",
      choices: ["Sauternes / Barsac", "Pomerol / Fronsac", "Saint-Emilion / Pomerol", "Entre-Deux-Mers / Graves"],
      answer: 0,
      note: "1855年格付けではMedoc中心の赤に加え、SauternesとBarsacの甘口白が対象です。",
      notes: [
        "正解です。1855年格付けではMedoc中心の赤に加え、SauternesとBarsacの甘口白が対象です。",
        "PomerolとFronsacは1855年格付けの甘口白対象ではありません。",
        "Saint-Emilionは独自の格付けで問われ、Pomerolには公式格付けがありません。",
        "Entre-Deux-MersとGravesの組み合わせは1855年の甘口白格付け対象ではありません。"
      ]
    },
    {
      id: "bourgogne-village-grand-cru",
      category: "フランス / ブルゴーニュ",
      importance: "A",
      question: "Gevrey-Chambertin村のGrand Cruとして正しいものはどれですか？",
      choices: ["Chambertin", "Romanée-Saint-Vivant", "Montrachet", "Corton-Charlemagne"],
      answer: 0,
      note: "ChambertinはGevrey-Chambertin村の代表的なGrand Cruです。",
      notes: [
        "正解です。ChambertinはGevrey-Chambertin村の代表的なGrand Cruです。",
        "Romanée-Saint-VivantはVosne-Romanée村のGrand Cruです。",
        "MontrachetはPuligny-Montrachet村とChassagne-Montrachet村にまたがるGrand Cruです。",
        "Corton-CharlemagneはCortonの丘に位置する白ワインのGrand Cruです。"
      ]
    },
    {
      id: "bourgogne-grand-cru-color-comparison",
      category: "フランス / ブルゴーニュ",
      importance: "A",
      question: "次のGrand Cruとワインの種類の組み合わせで正しいものはどれですか？",
      choices: ["Clos Saint-Denis - 赤ワインのみ", "Charlemagne - 赤ワインのみ", "Montrachet - 赤・白ワイン", "Romanée-Saint-Vivant - 白ワインのみ"],
      answer: 0,
      note: "Clos Saint-DenisはCôte de Nuitsの赤ワインGrand Cruです。",
      notes: [
        "正解です。Clos Saint-DenisはCôte de Nuitsの赤ワインGrand Cruです。",
        "Charlemagneは白ワインのみのGrand Cruです。",
        "Montrachetは白ワインのGrand Cruです。",
        "Romanée-Saint-Vivantは赤ワインのGrand Cruです。"
      ]
    }
  ];

  freeRangeReferenceQuestions.forEach((item) => {
    addDetailed(item.id, item.category, item.importance, item.question, item.choices, item.answer, item.note, item.notes);
  });

  facts.forEach(([id, category, importance, subject, answer, wrongs, note], index) => {
    const next = facts[(index + 1) % facts.length];
    const third = facts[(index + 2) % facts.length];
    const fourth = facts[(index + 3) % facts.length];
    const customPair = customPairQuestions[id];
    if (customPair) {
      add(`${id}-pair`, category, importance, customPair.question, customPair.choices, 0, note);
    } else {
      add(`${id}-pair`, category, importance, `${category}について、次の組み合わせで正しいものはどれですか？`, wrongChoices(`${subject} - ${answer}`, [`${next[3]} - ${answer}`, `${third[3]} - ${wrongs[0]}`, `${fourth[3]} - ${wrongs[1] || wrongs[0]}`]), 0, note);
    }
    const customWrong = customWrongQuestions[id];
    if (customWrong) {
      add(`${id}-wrong`, category, importance === "A" ? "B" : importance, customWrong.question, customWrong.choices, 0, customWrong.note);
    } else {
      add(`${id}-wrong`, category, importance === "A" ? "B" : importance, `${subject}周辺の知識で、誤っている組み合わせはどれですか？`, wrongChoices(`${subject} - ${next[4]}`, [`${subject} - ${answer}`, `${next[3]} - ${next[4]}`, `${third[3]} - ${third[4]}`]), 0, `${subject}は${answer}と結びつけます。`);
    }
    add(`${id}-compare`, category, "B", `${category}について、次の組み合わせで正しいものはどれですか？`, wrongChoices(`${subject} - ${answer}`, [`${next[3]} - ${answer}`, `${third[3]} - ${wrongs[0]}`, `${fourth[3]} - ${wrongs[1] || wrongs[0]}`]), 0, note);
  });

  window.QUESTION_PACKS.push({
    id: "phase1-exam-style",
    title: "第1段階 試験形式補強",
    phase: 1,
    questions
  });
})();
