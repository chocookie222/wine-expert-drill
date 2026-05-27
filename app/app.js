const STORAGE_KEY = "wineExpertDrill.v1";
const inactiveQuestionIds = new Set([
  "jsa-gr-001",
  "jsa-pt-001",
  "jsa-nz-001",
  "jsa-cl-001",
  "jsa-general-010",
  "ocr-bordeaux-001",
  "phase1-balance-フランス-ボルドー-左岸で主体となりやすい黒ブドウ品種-0-a",
  "jsa-fr-001"
]);
const categoryLimits = new Map(Object.entries({
  "フランス総まとめ": 40,
  "イタリア総まとめ": 20
}));
const totalQuestionLimit = 800;
const importanceAQuotas = new Map(Object.entries({
  "フランス総まとめ": 20,
  "イタリア総まとめ": 12,
  "フランス / ボルドー": 4,
  "フランス / ブルゴーニュ": 4,
  "フランス / シャンパーニュ": 4,
  "フランス / ロワール": 4,
  "フランス / ローヌ": 4,
  "フランス / アルザス": 3,
  "フランス / ジュラ・サヴォワ": 3,
  "フランス / プロヴァンス": 3,
  "フランス / ラングドック・ルーション": 3,
  "フランス / 南西地方": 3,
  "イタリア / ピエモンテ": 4,
  "イタリア / トスカーナ": 4,
  "イタリア / ヴェネト": 4,
  "イタリア / ロンバルディア": 3,
  "イタリア / トレンティーノ・アルト・アディジェ": 3,
  "イタリア / フリウリ・ヴェネツィア・ジューリア": 3,
  "イタリア / マルケ": 3,
  "イタリア / アブルッツォ": 3,
  "イタリア / カンパーニア": 3,
  "イタリア / プーリア": 3,
  "イタリア / シチリア": 3,
  "イタリア / サルデーニャ": 2,
  "日本": 18,
  "ドイツ": 18,
  "スペイン": 18,
  "スペイン / 主要産地": 8,
  "スペイン / 法律": 4,
  "アメリカ": 16,
  "アメリカ / カリフォルニア": 6,
  "アメリカ / オレゴン": 3,
  "アメリカ / ワシントン": 3,
  "アメリカ / ニューヨーク": 3,
  "オーストラリア": 10,
  "ワイン概論 / 重要A": 18,
  "ワイン概論 / 気候": 5,
  "ワイン概論 / 醸造": 6,
  "ワイン概論 / 土壌": 5,
  "ワイン概論 / スパークリング": 3,
  "ワイン概論 / 栽培": 4,
  "ワイン概論 / 歴史": 3,
  "法律・格付け": 6,
  "フランス 歴史・概論": 4,
  "イタリア 歴史・概論": 3,
  "地域横断 / 品種判別": 6
}));
const categoryDisplayOrder = [
  "フランス",
  "イタリア",
  "スペイン",
  "ドイツ",
  "日本",
  "アメリカ",
  "オーストラリア"
];
const priorityCategoriesByGroup = {
  "フランス": ["フランス 歴史・概論", "フランス総まとめ"],
  "イタリア": ["イタリア 歴史・概論", "イタリア総まとめ"]
};

const seedQuestions = [
  {
    id: "seed-001",
    category: "フランス / ブルゴーニュ",
    question: "シャブリ地区の白ワインで主要なブドウ品種はどれですか？",
    choices: ["シャルドネ", "ソーヴィニヨン・ブラン", "リースリング", "シュナン・ブラン"],
    answer: 0,
    note: "シャブリはブルゴーニュ北部の冷涼な産地で、白はシャルドネから造られます。"
  },
  {
    id: "seed-002",
    category: "フランス / ボルドー",
    question: "ボルドー左岸で重要な黒ブドウ品種はどれですか？",
    choices: ["ピノ・ノワール", "カベルネ・ソーヴィニヨン", "ネッビオーロ", "サンジョヴェーゼ"],
    answer: 1,
    note: "メドックなどの左岸ではカベルネ・ソーヴィニヨン主体のブレンドが代表的です。"
  },
  {
    id: "seed-003",
    category: "イタリア / ピエモンテ",
    question: "バローロ、バルバレスコの主要品種はどれですか？",
    choices: ["ネッビオーロ", "バルベーラ", "サンジョヴェーゼ", "モンテプルチアーノ"],
    answer: 0,
    note: "ピエモンテを代表する長期熟成型赤ワインはネッビオーロから造られます。"
  },
  {
    id: "seed-004",
    category: "ドイツ",
    question: "ドイツで最も重要な白ブドウ品種として扱われるものはどれですか？",
    choices: ["ヴィオニエ", "リースリング", "アルバリーニョ", "フルミント"],
    answer: 1,
    note: "リースリングはドイツを代表する高品質白ワイン用品種です。"
  },
  {
    id: "seed-005",
    category: "スペイン",
    question: "リオハの赤ワインで中心的な品種はどれですか？",
    choices: ["テンプラニーリョ", "ガルナッチャ・ブランカ", "メンシア", "ボバル"],
    answer: 0,
    note: "リオハではテンプラニーリョが主要品種です。熟成表示も頻出事項です。"
  },
  {
    id: "seed-006",
    category: "酒類飲料概論",
    question: "スパークリングワインの瓶内二次発酵方式を示す用語として適切なものはどれですか？",
    choices: ["シャルマ方式", "トラディショナル方式", "ソレラ方式", "マセラシオン・カルボニック"],
    answer: 1,
    note: "瓶内二次発酵はトラディショナル方式、またはメトード・トラディショネルと呼ばれます。"
  },
  {
    id: "seed-007",
    category: "日本",
    question: "日本ワインにおける代表的な白ブドウ品種はどれですか？",
    choices: ["甲州", "マスカット・ベーリーA", "ツヴァイゲルト", "カベルネ・フラン"],
    answer: 0,
    note: "甲州は日本を代表する白ワイン用品種です。"
  },
  {
    id: "seed-008",
    category: "フランス / シャンパーニュ",
    question: "シャンパーニュで主に認められる品種の組み合わせはどれですか？",
    choices: ["シャルドネ、ピノ・ノワール、ムニエ", "リースリング、シルヴァーナー、ミュラー・トゥルガウ", "セミヨン、ミュスカデル、ユニ・ブラン", "ガメイ、シラー、グルナッシュ"],
    answer: 0,
    note: "シャンパーニュではシャルドネ、ピノ・ノワール、ムニエが主要品種です。"
  }
];

function collectBuiltInQuestions() {
  const baseQuestions = window.GENERATED_QUESTIONS || [];
  const packQuestions = (window.QUESTION_PACKS || []).flatMap((pack) => pack.questions || []);
  const seen = new Set();
  const seenQuestionTexts = new Set();
  const categoryCounts = new Map();
  let acceptedCount = 0;
  const active = [...baseQuestions, ...packQuestions].filter((question) => {
    if (acceptedCount >= totalQuestionLimit) return false;
    const id = questionId(question);
    const questionText = String(question.question).replace(/\s+/g, " ").trim();
    if (inactiveQuestionIds.has(id)) return false;
    if (seen.has(id)) return false;
    if (seenQuestionTexts.has(questionText)) return false;
    if (questionText.includes("左岸で主体となりやすい")) return false;
    if (questionText.includes("品種が属する地域")) return false;
    if (questionText.includes("Sauternesを含む組み合わせ")) return false;
    if (questionText.includes("ボルドー甘口白で中心となる品種とスタイル") && questionText.includes("組み合わせ")) return false;
    if (questionText.includes("手がかり")) return false;
    if (questionText.includes("判断する場合")) return false;
    if (questionText.includes("判別する事項")) return false;
    if (questionText.includes("正しく結びつく事項")) return false;
    if (questionText.includes("最も関係が深い事項")) return false;
    if (questionText.includes("重要なワインタイプ")) return false;
    if (!isUsefulExamQuestion(question)) return false;
    const limit = categoryLimits.get(question.category);
    const currentCount = categoryCounts.get(question.category) || 0;
    if (limit && currentCount >= limit) return false;
    seen.add(id);
    seenQuestionTexts.add(questionText);
    categoryCounts.set(question.category, currentCount + 1);
    acceptedCount += 1;
    return true;
  });
  const aCounts = new Map();
  return active.map((question) => {
    const quota = importanceAQuotas.get(question.category);
    if ((question.importance || "B") !== "A" || !quota) return question;
    const used = aCounts.get(question.category) || 0;
    aCounts.set(question.category, used + 1);
    if (used < quota) return question;
    return { ...question, importance: "B" };
  });
}

const builtInQuestions = collectBuiltInQuestions();
const deprecatedQuestionIds = new Set([
  "ocr-cheese-003",
  "ocr-service-002"
]);
const displayNames = new Map(Object.entries({
  "Sauvignon Blanc": "Sauvignon Blanc（ソーヴィニヨン・ブラン）",
  "Chardonnay": "Chardonnay（シャルドネ）",
  "Riesling": "Riesling（リースリング）",
  "Chenin Blanc": "Chenin Blanc（シュナン・ブラン）",
  "Gamay": "Gamay（ガメイ）",
  "Merlot": "Merlot（メルロ）",
  "Syrah": "Syrah（シラー）",
  "Cabernet Franc": "Cabernet Franc（カベルネ・フラン）",
  "Pinot Noir": "Pinot Noir（ピノ・ノワール）",
  "Meunier": "Meunier（ムニエ）",
  "Semillon": "Semillon（セミヨン）",
  "Muscadelle": "Muscadelle（ミュスカデル）",
  "Colombard": "Colombard（コロンバール）",
  "Grenache": "Grenache（グルナッシュ）",
  "Mourvedre": "Mourvedre（ムールヴェードル）",
  "Ugni Blanc": "Ugni Blanc（ユニ・ブラン）",
  "Aligote": "Aligote（アリゴテ）",
  "Gewurztraminer": "Gewurztraminer（ゲヴュルツトラミネール）",
  "Melon de Bourgogne": "Melon de Bourgogne（ムロン・ド・ブルゴーニュ）",
  "Koshu": "甲州",
  "Nebbiolo": "Nebbiolo（ネッビオーロ）",
  "Carmenere": "Carmenere（カルメネール）",
  "Muscat Bailey A": "マスカット・ベーリーA",
  "Albarino": "Albarino（アルバリーニョ）",
  "Sangiovese": "Sangiovese（サンジョヴェーゼ）",
  "Barbera": "Barbera（バルベーラ）",
  "Montepulciano": "Montepulciano（モンテプルチアーノ）",
  "Aglianico": "Aglianico（アリアニコ）",
  "Nero d'Avola": "Nero d'Avola（ネロ・ダーヴォラ）",
  "Primitivo": "Primitivo（プリミティーヴォ）",
  "Glera": "Glera（グレーラ）",
  "Moscato Bianco": "Moscato Bianco（モスカート・ビアンコ）",
  "Verdicchio": "Verdicchio（ヴェルディッキオ）",
  "Fiano": "Fiano（フィアーノ）",
  "Lagrein": "Lagrein（ラグレイン）",
  "Corvina": "Corvina（コルヴィーナ）",
  "Tempranillo": "Tempranillo（テンプラニーリョ）",
  "Mencia": "Mencia（メンシア）",
  "Bobal": "Bobal（ボバル）",
  "Monastrell": "Monastrell（モナストレル）",
  "Garnacha": "Garnacha（ガルナッチャ）",
  "Carinena": "Carinena（カリニェナ）",
  "Palomino": "Palomino（パロミノ）",
  "Godello": "Godello（ゴデーリョ）",
  "Macabeo": "Macabeo（マカベオ）",
  "Airen": "Airen（アイレン）",
  "Verdejo": "Verdejo（ベルデホ）",
  "Gruner Veltliner": "Gruner Veltliner（グリューナー・ヴェルトリーナー）",
  "Welschriesling": "Welschriesling（ヴェルシュリースリング）",
  "St. Laurent": "St. Laurent（ザンクト・ラウレント）",
  "Blaufrankisch": "Blaufrankisch（ブラウフレンキッシュ）",
  "Cabernet Sauvignon": "Cabernet Sauvignon（カベルネ・ソーヴィニヨン）",
  "Shiraz": "Shiraz（シラーズ）",
  "Pinotage": "Pinotage（ピノタージュ）",
  "Zinfandel": "Zinfandel（ジンファンデル）",
  "Touriga Nacional": "Touriga Nacional（トウリガ・ナショナル）",
  "Alvarinho": "Alvarinho（アルヴァリーニョ）",
  "Spatburgunder": "Spatburgunder（シュペートブルグンダー）",
  "Dornfelder": "Dornfelder（ドルンフェルダー）",
  "Lemberger": "Lemberger（レンベルガー）",
  "Portugieser": "Portugieser（ポルトギーザー）",
  "Viura": "Viura（ビウラ）",
  "Furmint": "Furmint（フルミント）",
  "Malbec": "Malbec（マルベック）",
  "Tannat": "Tannat（タナ）",
  "Torrontes": "Torrontes（トロンテス）",
  "Zweigelt": "Zweigelt（ツヴァイゲルト）",
  "Assyrtiko": "Assyrtiko（アシルティコ）",
  "Moschofilero": "Moschofilero（モスホフィレロ）",
  "Agiorgitiko": "Agiorgitiko（アギオルギティコ）",
  "Xinomavro": "Xinomavro（クシノマヴロ）",
  "Cataluna": "Cataluna（カタルーニャ）",
  "Galicia": "Galicia（ガリシア）",
  "Aragon": "Aragon（アラゴン）",
  "Castilla y Leon": "Castilla y Leon（カスティーリャ・イ・レオン）",
  "Douro": "Douro（ドウロ）",
  "Loire": "Loire（ロワール）",
  "Mosel": "Mosel（モーゼル）",
  "Murray": "Murray（マレー）",
  "Smaragd": "Smaragd（スマラクト）",
  "Federspiel": "Federspiel（フェーダーシュピール）",
  "Steinfeder": "Steinfeder（シュタインフェーダー）",
  "Ausbruch": "Ausbruch（アウスブルッフ）",
  "Kabinett": "Kabinett（カビネット）",
  "Spatlese": "Spatlese（シュペートレーゼ）",
  "Auslese": "Auslese（アウスレーゼ）",
  "Trockenbeerenauslese": "Trockenbeerenauslese（トロッケンベーレンアウスレーゼ）",
  "Botrytis cinerea": "Botrytis cinerea（ボトリティス・シネレア）",
  "Saccharomyces cerevisiae": "Saccharomyces cerevisiae（サッカロミセス・セレビシエ）",
  "Oenococcus oeni": "Oenococcus oeni（オエノコッカス・オエニ）",
  "Brettanomyces": "Brettanomyces（ブレタノマイセス）",
  "Traditional Method": "Traditional Method（トラディショナル方式）",
  "Charmat Method": "Charmat Method（シャルマ方式）",
  "Solera System": "Solera System（ソレラ・システム）",
  "Carbonic Maceration": "Carbonic Maceration（マセラシオン・カルボニック）"
}));
const choiceFacts = new Map(Object.entries({
  "Medoc": "ボルドー左岸の地区で、Pauillac、Margaux、Saint-Estephe などの村名A.O.C.が位置します",
  "Pauillac": "ボルドー左岸メドック地区の村名A.O.C.",
  "Margaux": "ボルドー左岸メドック地区の村名A.O.C.",
  "Saint-Estephe": "ボルドー左岸メドック地区の村名A.O.C.",
  "Pauillac、Margaux、Saint-Estephe が位置する地区": "Medoc 地区を指します",
  "右岸で主体となりやすい黒ブドウ品種": "ボルドー右岸では Merlot が主体になりやすいです",
  "メドック、グラーヴで主体となりやすい黒ブドウ品種": "Cabernet Sauvignon が主体になりやすいです",
  "Sauternes": "ボルドーのA.O.C.で、Semillon主体の貴腐甘口白で重要です",
  "Entre-Deux-Mers": "ボルドーの白ワイン産地として整理します",
  "Jurancon": "南西地方の白、特に甘口で重要なA.O.C.",
  "Cabernet Sauvignon": "ボルドー左岸やナパ・ヴァレーなどで重要な黒ブドウ品種",
  "Merlot": "ボルドー右岸で重要な黒ブドウ品種",
  "Gamay": "ボージョレで重要な黒ブドウ品種",
  "Nebbiolo": "バローロ、バルバレスコで重要な黒ブドウ品種",
  "Pinot Noir": "ブルゴーニュやオレゴンで重要な黒ブドウ品種",
  "Syrah": "北部ローヌで重要な黒ブドウ品種",
  "Grenache": "南部ローヌやスペインで重要な黒ブドウ品種",
  "Mourvedre": "南部ローヌやプロヴァンスで使われる黒ブドウ品種",
  "Cinsault": "南仏や南アフリカで知られる黒ブドウ品種",
  "Malbec": "アルゼンチンやカオールで重要な黒ブドウ品種",
  "Tannat": "ウルグアイや南西フランスで重要な黒ブドウ品種",
  "Carmenere": "チリで重要な黒ブドウ品種",
  "Zinfandel": "アメリカ・カリフォルニアで重要な黒ブドウ品種",
  "Primitivo": "プーリア州で重要で、Zinfandel と同一品種とされる黒ブドウ品種",
  "Sangiovese": "トスカーナで重要な黒ブドウ品種",
  "Barbera": "ピエモンテで重要な黒ブドウ品種",
  "Dolcetto": "ピエモンテで重要な黒ブドウ品種",
  "Montepulciano": "アブルッツォ州などで重要な黒ブドウ品種",
  "Corvina": "ヴァルポリチェッラやアマローネで重要な黒ブドウ品種",
  "Aglianico": "タウラージなど南イタリアで重要な黒ブドウ品種",
  "Nero d'Avola": "シチリア州で重要な黒ブドウ品種",
  "Nerello Mascalese": "エトナで重要な黒ブドウ品種",
  "Tempranillo": "リオハやリベラ・デル・ドゥエロで重要な黒ブドウ品種",
  "Mencia": "ビエルソなどスペイン北西部で重要な黒ブドウ品種",
  "Bobal": "スペイン東部で栽培される黒ブドウ品種",
  "Monastrell": "スペイン南東部で重要な黒ブドウ品種",
  "Shiraz": "オーストラリアで重要な黒ブドウ品種",
  "Pinotage": "南アフリカで生まれた重要な黒ブドウ品種",
  "Zweigelt": "オーストリアや北海道で見られる黒ブドウ品種",
  "Chardonnay": "ブルゴーニュやシャンパーニュで重要な白ブドウ品種",
  "Sauvignon Blanc": "ロワール上流やマールボロで重要な白ブドウ品種",
  "Chenin Blanc": "ロワールで重要な白ブドウ品種",
  "Riesling": "ドイツ、アルザス、クレア・ヴァレーで重要な白ブドウ品種",
  "Melon de Bourgogne": "ミュスカデで重要な白ブドウ品種",
  "Viognier": "北部ローヌで重要な白ブドウ品種",
  "Semillon": "ソーテルヌやハンター・ヴァレーで重要な白ブドウ品種",
  "Muscadelle": "ボルドー白やソーテルヌで補助的に使われる白ブドウ品種",
  "Aligote": "ブルゴーニュで見られる白ブドウ品種",
  "Ugni Blanc": "コニャックなどで重要な白ブドウ品種",
  "Palomino": "シェリーで重要な白ブドウ品種",
  "Glera": "プロセッコで重要な白ブドウ品種",
  "Moscato Bianco": "アスティやモスカート・ダスティで重要な白ブドウ品種",
  "Garganega": "ソアーヴェで重要な白ブドウ品種",
  "Trebbiano": "イタリアで広く栽培される白ブドウ品種",
  "Verdicchio": "マルケ州で重要な白ブドウ品種",
  "Fiano": "カンパーニア州で重要な白ブドウ品種",
  "Greco": "カンパーニア州で重要な白ブドウ品種",
  "Albarino": "リアス・バイシャスで重要な白ブドウ品種",
  "Verdejo": "ルエダで重要な白ブドウ品種",
  "Macabeo": "カバやスペイン北東部で重要な白ブドウ品種",
  "Airen": "スペイン中央部で栽培面積が大きい白ブドウ品種",
  "Godello": "バルデオラスなどで重要な白ブドウ品種",
  "Kerner": "ドイツや北海道の冷涼地で見られる白ブドウ品種",
  "Muller-Thurgau": "ドイツで広く栽培され、Rivaner とも呼ばれる白ブドウ品種",
  "Rivaner": "Muller-Thurgau の別名",
  "Spatburgunder": "Pinot Noir のドイツ名",
  "Dornfelder": "ドイツで見られる黒ブドウ品種",
  "Lemberger": "ドイツで見られる黒ブドウ品種",
  "Portugieser": "ドイツで見られる黒ブドウ品種",
  "Finger Lakes": "ニューヨーク州の冷涼産地",
  "Napa Valley": "カリフォルニアで Cabernet Sauvignon と結びつきやすい産地",
  "Columbia Valley": "ワシントン州の重要な広域A.V.A.",
  "Paso Robles": "カリフォルニアの内陸寄りの産地",
  "Willamette Valley": "オレゴン州で Pinot Noir と結びつきやすい産地",
  "Russian River Valley": "ソノマで冷涼系品種と結びつきやすいA.V.A.",
  "Walla Walla Valley": "ワシントン州とオレゴン州にまたがるA.V.A.",
  "Yakima Valley": "ワシントン州の重要なA.V.A.",
  "Santa Maria Valley": "カリフォルニアの冷涼なA.V.A.",
  "Kimmeridgian": "シャブリと結びつく石灰質土壌",
  "Terra rossa": "クナワラと結びつく赤色土壌",
  "Llicorella": "プリオラートで知られるスレート系土壌",
  "Galestro": "トスカーナで見られる土壌",
  "Phylloxera": "19世紀以降のワイン史と台木利用に結びつく害虫",
  "Botrytis cinerea": "貴腐菌として甘口ワインに関わる菌",
  "Oenococcus oeni": "マロラクティック発酵に関わる乳酸菌",
  "Brettanomyces": "ワインの欠陥臭と関係する酵母",
  "Saccharomyces cerevisiae": "アルコール発酵に関わる酵母",
  "Cabernet Franc": "ボルドー右岸やロワール中流で重要な黒ブドウ品種",
  "Lagrein": "アルト・アディジェで見られる黒ブドウ品種",
  "Koshu": "日本を代表する白ブドウ品種",
  "Muscat Bailey A": "日本を代表する赤ワイン用品種",
  "Delaware": "日本で生食用・醸造用として見られるブドウ品種",
  "Niagara": "日本でも見られるアメリカ系白ブドウ品種",
  "Garnacha": "スペインや南部ローヌで重要な黒ブドウ品種",
  "Silvaner": "ドイツのフランケンなどで重要な白ブドウ品種",
  "Viura": "Rioja の白ワインなどで使われる白ブドウ品種",
  "Furmint": "ハンガリーのトカイで重要な白ブドウ品種",
  "Marsanne": "北部ローヌで重要な白ブドウ品種",
  "Roussanne": "北部ローヌや南部ローヌで使われる白ブドウ品種",
  "Clairette": "南部ローヌなどで使われる白ブドウ品種",
  "Torrontes": "アルゼンチンで重要な白ブドウ品種",
  "Gruner Veltliner": "オーストリアを代表する白ブドウ品種",
  "Welschriesling": "オーストリアなど中欧で見られる白ブドウ品種",
  "Assyrtiko": "サントリーニ島で重要な白ブドウ品種",
  "Moschofilero": "ギリシャで重要な白ブドウ品種",
  "Agiorgitiko": "ギリシャで重要な黒ブドウ品種",
  "Xinomavro": "ギリシャ北部で重要な黒ブドウ品種",
  "Weissburgunder": "Pinot Blanc のドイツ名",
  "Grauburgunder": "Pinot Gris のドイツ名",
  "P.D.O.": "EUワイン法の保護原産地呼称を示す区分",
  "P.G.I.": "EUワイン法の保護地理的表示を示す区分",
  "A.V.A.": "アメリカの政府認定ブドウ栽培地域を示す制度",
  "I.G.T.": "イタリアの地理的表示ワインの区分",
  "D.O.C.G.": "イタリアの上位原産地呼称",
  "Vino": "イタリアの地理的表示を伴わない基礎的な区分",
  "Trockenbeerenauslese": "ドイツのプレディカーツヴァインで最も糖度が高い等級",
  "Auslese": "ドイツのプレディカーツヴァインの一等級",
  "Spatlese": "ドイツのプレディカーツヴァインで遅摘みを示す等級",
  "Kabinett": "ドイツのプレディカーツヴァインで比較的軽い等級",
  "Trocken": "ドイツ語の辛口表示",
  "Doux": "フランス語で甘口を示す表示",
  "Seco": "スペイン語・ポルトガル語圏で辛口を示す表示",
  "Amabile": "イタリア語でやや甘口を示す表示",
  "Traditional Method": "瓶内二次発酵によるスパークリングワイン製法",
  "Charmat Method": "タンク内二次発酵によるスパークリングワイン製法",
  "Solera System": "シェリーなどで用いられる熟成・ブレンド方式",
  "Carbonic Maceration": "ボージョレなどで知られる醸造法",
  "Loess": "ドイツやオーストリアなどで見られる黄土系土壌",
  "Basalt": "火山性土壌の一種",
  "Douro": "ポートワインで重要なポルトガルの産地",
  "Loire": "フランスの多様なワイン産地",
  "Mosel": "ドイツで Riesling と結びつきやすい冷涼産地",
  "Murray": "オーストラリア内陸部の河川・灌漑地域と結びつく名称",
  "Rioja": "スペインのD.O.Ca.として重要な産地",
  "Rueda": "スペインで Verdejo と結びつきやすい白ワイン産地",
  "Jerez": "シェリーで重要なスペイン南部の産地",
  "Rias Baixas": "Albarino と結びつきやすいスペイン北西部の産地",
  "砂利質土壌": "主にボルドー左岸のメドックやグラーヴで多く見られ、Cabernet Sauvignonと結びつけます",
  "粘土質・石灰質土壌": "主にボルドー右岸のサンテミリオンやポムロールで意識し、Merlotと結びつけます",
  "キンメリジャン石灰質": "主にシャブリで重要な石灰質土壌で、Chardonnayと結びつけます",
  "花崗岩質土壌": "北部ローヌなどで見られる土壌で、Syrahと結びつけて整理します",
  "火山性土壌": "EtnaやSantoriniなどで多く見られる土壌です",
  "スレート土壌": "PrioratやMoselなどで重要な土壌です",
  "粘土石灰質": "ボルドー右岸や一部の石灰質産地で見られる土壌表現です",
  "Chardonnay 主体の甘口白": "ブルゴーニュの基本的な赤ワインタイプではありません",
  "Pinot Noir 主体の赤": "ブルゴーニュ、とくにコート・ド・ニュイで重要な赤ワインタイプ",
  "Gamay 主体の赤": "ボージョレで重要な赤ワインタイプ",
  "Syrah 主体の赤": "北部ローヌで重要な赤ワインタイプ",
  "Chardonnay / Pinot Noir / Meunier": "シャンパーニュの主要3品種",
  "Riesling / Silvaner / Kerner": "ドイツで見られる白ブドウ品種の組み合わせ",
  "Semillon / Sauvignon Blanc / Muscadelle": "ボルドー白やソーテルヌで重要な組み合わせ",
  "Grenache / Syrah / Mourvedre": "南部ローヌで重要な黒ブドウ品種の組み合わせ",
  "Garnacha / Carinena": "プリオラートで重要な黒ブドウ品種の組み合わせ",
  "Tempranillo / Mencia": "スペイン北部の別産地で重要になる黒ブドウ品種の組み合わせ",
  "Bobal / Monastrell": "スペイン東部から南東部で重要な黒ブドウ品種の組み合わせ",
  "Palomino / Pedro Ximenez": "シェリーで重要な白ブドウ品種の組み合わせ",
  "Semillon / Sauvignon Blanc": "ソーテルヌやボルドー白で重要な組み合わせ",
  "Chardonnay / Aligote": "ブルゴーニュの白ブドウ品種の組み合わせ",
  "Riesling / Gewurztraminer": "アルザスで重要な白ブドウ品種の組み合わせ",
  "Chenin Blanc / Melon de Bourgogne": "ロワールで重要な白ブドウ品種の組み合わせ",
  "St. Laurent / Blaufrankisch": "Zweigelt の交配親",
  "Riesling / Chardonnay": "白ブドウ品種同士の組み合わせ",
  "Merlot / Syrah": "ボルドー系とローヌ系の黒ブドウ品種の組み合わせ",
  "Gamay / Pinot Noir": "ブルゴーニュ地方で重要な黒ブドウ品種の組み合わせ",
  "24カ月": "スペイン赤ワインのCrianzaで問われやすい最低熟成期間",
  "12カ月": "Crianza赤の最低総熟成期間としては短い期間",
  "36カ月": "Reserva赤で問われやすい最低熟成期間",
  "60カ月": "Gran Reserva赤で問われやすい最低熟成期間",
  "18カ月": "Gran Reserva赤の最低総熟成期間としては短い期間",
  "ブドウ栽培地域": "A.V.A.が示す内容",
  "甘口ワインの糖度等級": "ドイツなどの糖度分類で問われる内容",
  "瓶内二次発酵の方式": "スパークリングワインの製法で問われる内容",
  "熟成期間表示": "スペインなどの熟成表示で問われる内容",
  "V.D.N.": "南仏の酒精強化甘口ワイン",
  "瓶内二次発酵の白": "スパークリングワインの製法・タイプに関する表現",
  "貴腐甘口白": "ソーテルヌなどで重要な甘口白ワインのタイプ",
  "辛口シェリー": "ヘレスで重要な酒精強化ワインのタイプ",
  "ロゼ": "プロヴァンスで特に押さえたいワイン",
  "酒精強化赤": "ポートや一部V.D.N.で問われるワインタイプ",
  "酸化熟成白": "シェリーなどで問われる熟成タイプ",
  "日本ワイン": "国内収穫ブドウのみを国内で醸造したワイン",
  "国産ワイン": "海外原料を含む場合があるため日本ワインとは区別される表示",
  "輸入ワイン": "海外で造られ日本に輸入されたワイン",
  "果実酒": "酒税法上の分類で、産地表示そのものではありません",
  "山梨県": "甲州の重要産地",
  "北海道": "冷涼地品種や日本ワイン産地として重要な地域",
  "長野県": "日本ワインの重要産地",
  "山形県": "日本ワインの重要産地",
  "山梨": "日本ワインの地理的表示で重要な産地名",
  "長野": "日本ワインの重要産地名",
  "山形": "日本ワインの重要産地名",
  "瓶内二次発酵": "Cava やシャンパーニュで重要な製法",
  "シャルマ方式": "タンク内二次発酵の製法",
  "ソレラ方式": "シェリーなどで使われる熟成・ブレンド方式",
  "炭酸ガス注入方式のみ": "高品質スパークリングの代表的製法としては扱われにくい方式",
  "辛口": "甘味が少ない味わい",
  "中甘口": "辛口より甘味を感じる味わい",
  "甘口": "糖分を多く残した味わい",
  "極甘口": "貴腐ワインなどで問われる非常に甘い味わい",
  "アメリカ系台木への接ぎ木": "フィロキセラ対策として重要な方法",
  "収穫時期を遅らせる": "糖度を上げる目的では使われますが、フィロキセラ対策ではありません",
  "果汁を加熱する": "フィロキセラ対策とは関係しない醸造上の処理",
  "瓶内二次発酵を行う": "スパークリングワイン製法であり、フィロキセラ対策ではありません",
  "醸し": "赤ワインで色素やタンニンを抽出する工程",
  "補糖": "発酵前の果汁に糖分を補う工程",
  "澱引き": "澱からワインを分ける工程",
  "清澄": "ワイン中の濁り成分を取り除く工程",
  "川上善兵衛": "マスカット・ベーリーAを交配した人物",
  "麻井宇介": "日本ワインの普及や評論で知られる人物",
  "大村春夫": "山梨県勝沼のワイン産業で知られる人物",
  "土屋守": "ウイスキー評論などで知られる人物",
  "灰色がかった淡い赤紫色": "甲州の果皮色として重要な特徴",
  "濃い黒紫色": "一般的な黒ブドウを連想しやすい色調",
  "透明に近い緑色": "白ブドウの果皮を連想しやすい色調",
  "黄色がかった褐色": "成熟や酸化を連想しやすい色調",
  "年間の気温差が比較的小さく、降水量が多い": "海洋性気候の特徴",
  "夏と冬の気温差が極端に大きい": "大陸性気候を連想しやすい特徴",
  "降水量が極端に少なく灌漑が必須": "乾燥気候を連想しやすい特徴",
  "一年中高温多湿で雨季が長い": "一般的な高品質ワイン産地の気候説明としては不適切な特徴",
  "夏と冬の気温差が大きい": "大陸性気候の特徴",
  "海の影響で年較差が小さい": "海洋性気候の特徴",
  "年間を通じて雨季が続く": "ワイン用ブドウ栽培の一般的な気候分類では使いにくい特徴",
  "標高が低いほど必ず冷涼になる": "標高と気温の関係としては逆になりやすい説明",
  "リンゴ酸が乳酸に変わる": "マロラクティック発酵で起こる主な変化",
  "酒石酸が酢酸に変わる": "マロラクティック発酵の説明としては不適切な酸の変化",
  "乳酸がリンゴ酸に変わる": "マロラクティック発酵の説明とは逆の変化",
  "糖が酒石酸に変わる": "アルコール発酵やマロラクティック発酵の説明としては不適切な変化",
  "香り物質": "3MH、3MHA、4MMP などで問われる分野",
  "土壌分類": "キンメリジャンやテラロッサなどで問われる分野",
  "瓶形": "ボルドー型やブルゴーニュ型などで問われる分野",
  "剪定方法": "ギヨーやコルドンなどで問われる栽培分野",
  "気温が低くなりやすい": "標高が高い畑で起こりやすい条件",
  "夜温が必ず高くなる": "標高が高い畑の説明としては不適切な条件",
  "降水が完全になくなる": "標高だけで決まる条件ではありません",
  "日照が必ず減る": "標高だけで必ず決まる条件ではありません",
  "産地名と認められる品種・ワインタイプを結びつける": "地理的表示や原産地呼称の学習で重要な視点",
  "生産者名だけを暗記する": "一次試験の中心に置くには範囲が狭い学習視点",
  "ラベル色だけを覚える": "制度や産地理解にはつながりにくい学習視点",
  "ボトル重量だけを比較する": "原産地呼称や品種の理解とは関係が薄い視点"
}));
const pairChoiceFacts = new Map(Object.entries({
  "Pauillac、Margaux、Saint-Estephe が位置する地区 - Medoc": "Pauillac、Margaux、Saint-Estephe は、いずれもボルドー左岸のMedoc地区に位置する村名A.O.C.です。",
  "Pauillac、Margaux、Saint-Estephe が位置する地区 - Cabernet Sauvignon": "Pauillac、Margaux、Saint-Estephe が位置する地区はMedocです。Cabernet Sauvignonはメドックなど左岸で重要な品種ですが、地区名ではありません。",
  "Pauillac、Margaux、Saint-Estephe が位置する地区 - Syrah": "Pauillac、Margaux、Saint-Estephe はMedoc地区です。Syrahは北部ローヌの主要黒ブドウ品種です。",
  "Semillon主体の貴腐甘口白": "ボルドー甘口白ではSemillon主体の貴腐甘口白を整理します。",
  "ボルドー甘口白 - Semillon主体の貴腐甘口白": "ボルドー甘口白ではSemillon主体の貴腐甘口白を整理します。",
  "右岸で主体となりやすい黒ブドウ品種 - Merlot": "ボルドー右岸ではMerlotが主体になりやすく、Saint-EmilionやPomerolと結びつきます。",
  "メドック、グラーヴで主体となりやすい黒ブドウ品種 - Cabernet Sauvignon": "メドック、グラーヴではCabernet Sauvignonが主体になりやすく、砂利質土壌と結びつけます。"
}));
const soilFacts = [
  ["砂利質土壌", "主にボルドー左岸のメドックやグラーヴで多く見られ、Cabernet Sauvignonと結びつけます"],
  ["粘土質・石灰質土壌", "主にボルドー右岸のサンテミリオンやポムロールで意識し、Merlotと結びつけます"],
  ["キンメリジャン石灰質", "主にシャブリで重要な石灰質土壌で、Chardonnayと結びつけます"],
  ["花崗岩質土壌", "北部ローヌなどで見られる土壌で、Syrahと結びつけて整理します"],
  ["火山性土壌", "EtnaやSantoriniなどで多く見られる土壌です"],
  ["スレート土壌", "PrioratやMoselなどで重要な土壌です"],
  ["粘土石灰質", "ボルドー右岸や一部の石灰質産地で見られる土壌表現です"]
];

const state = loadState();
let currentQuestion = null;
let currentChoiceOrder = [];
let answeredCurrent = false;
let round = {
  ids: [],
  answered: 0,
  correct: 0,
  wrong: 0
};

const $ = (selector) => document.querySelector(selector);
const elements = {
  tabs: document.querySelectorAll(".tab"),
  views: document.querySelectorAll(".view"),
  roundProgress: $("#roundProgress"),
  reviewCount: $("#reviewCount"),
  missedCount: $("#missedCount"),
  categoryFilter: $("#categoryFilter"),
  modeSelect: $("#modeSelect"),
  questionCategory: $("#questionCategory"),
  questionProgress: $("#questionProgress"),
  questionText: $("#questionText"),
  choices: $("#choices"),
  answerBox: $("#answerBox"),
  answerResult: $("#answerResult"),
  choiceNotes: $("#choiceNotes"),
  bookmarkButton: $("#bookmarkButton"),
  nextButton: $("#nextButton"),
  skipButton: $("#skipButton"),
  resultPanel: $("#resultPanel"),
  resultAnswered: $("#resultAnswered"),
  resultAccuracy: $("#resultAccuracy"),
  resultWrong: $("#resultWrong"),
  restartRoundButton: $("#restartRoundButton"),
  missedList: $("#missedList"),
  analyticsList: $("#analyticsList"),
  resetButton: $("#resetButton"),
  clearReviewButton: $("#clearReviewButton")
};

function loadState() {
  const fallback = {
    questions: builtInQuestions,
    attempts: {},
    missed: [],
    bookmarked: [],
    queue: []
  };

  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!parsed || !Array.isArray(parsed.questions)) return fallback;
    const mergedQuestions = [...builtInQuestions];
    return {
      questions: mergedQuestions.length ? mergedQuestions : builtInQuestions,
      attempts: parsed.attempts || {},
      missed: Array.isArray(parsed.missed) ? parsed.missed.filter((id) => !deprecatedQuestionIds.has(id)) : [],
      bookmarked: Array.isArray(parsed.bookmarked) ? parsed.bookmarked.filter((id) => !deprecatedQuestionIds.has(id)) : [],
      queue: []
    };
  } catch {
    return fallback;
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({
    questions: state.questions,
    attempts: state.attempts,
    missed: state.missed,
    bookmarked: state.bookmarked
  }));
}

function questionId(question, index = 0) {
  return question.id || `${question.category}:${question.question}:${index}`;
}

function isUsefulExamQuestion(question) {
  const text = String(question.question || "");
  const choices = Array.isArray(question.choices) ? question.choices : [];
  if (text.includes("組み合わせ")) {
    const pairChoices = choices.map((choice) => String(choice).split(" - ").map((part) => part.trim()));
    const leftParts = pairChoices.map((parts) => parts[0]).filter(Boolean);
    const rightParts = pairChoices.map((parts) => parts[1]).filter(Boolean);
    if (leftParts.length >= 4 && new Set(leftParts).size <= 2) return false;
    if (rightParts.length >= 4 && new Set(rightParts).size <= 2) return false;
  }
  if (text.includes("と結びつく事項として適切なもの")) return false;
  if (text.includes("正しく結びつく事項")) return false;
  if (text.includes("判別する事項")) return false;
  if (text.includes("最も関係が深い事項")) return false;
  if (text.includes("と最も結びつきが強いもの")) return false;
  if (text.includes("説明として最も適切なもの") && choices.every((choice) => String(choice).length > 24)) return false;
  return true;
}

function getCategories() {
  return [...new Set(state.questions.map((q) => q.category))].sort((a, b) => a.localeCompare(b, "ja"));
}

function topCategory(category) {
  return String(category).split("/")[0].trim();
}

function groupedCategories() {
  const categories = getCategories();
  const topCounts = categories.reduce((map, category) => {
    const top = topCategory(category);
    map.set(top, (map.get(top) || 0) + 1);
    return map;
  }, new Map());

  return [...topCounts.entries()]
    .filter(([top, count]) => count > 1 || categories.some((category) => category.startsWith(`${top} /`)))
    .map(([top]) => top)
    .sort(compareCategoryNames);
}

function categoryQuestionCount(filterValue) {
  if (!filterValue || filterValue === "all") return state.questions.length;
  return state.questions.filter((question) => categoryMatches(question, filterValue)).length;
}

function compareCategoryNames(a, b) {
  const topA = topCategory(a);
  const topB = topCategory(b);
  const orderA = categoryDisplayOrder.indexOf(topA);
  const orderB = categoryDisplayOrder.indexOf(topB);
  if (orderA !== orderB) {
    if (orderA === -1) return 1;
    if (orderB === -1) return -1;
    return orderA - orderB;
  }
  return a.localeCompare(b, "ja");
}

function categoryMatches(question, filterValue) {
  if (!filterValue || filterValue === "all") return true;
  if (filterValue.startsWith("group:")) {
    return topCategory(question.category) === filterValue.replace("group:", "");
  }
  return question.category === filterValue;
}

function getAttempt(id) {
  return state.attempts[id] || { answered: 0, correct: 0, wrong: 0 };
}

function filteredQuestions() {
  const category = elements.categoryFilter.value;
  const scopedQuestions = category === "all"
    ? [...state.questions]
    : state.questions.filter((q) => categoryMatches(q, category));
  let questions = [...scopedQuestions];
  const mode = elements.modeSelect.value;

  if (mode === "review") {
    const reviewIds = getReviewIds();
    questions = questions.filter((q, index) => reviewIds.has(questionId(q, index)));
  }

  if (mode === "priority") {
    questions = questions.filter((q) => (q.importance || "B") === "A");
  }

  if (mode === "focus") {
    const reviewIds = getReviewIds();
    questions = questions.filter((q, index) => reviewIds.has(questionId(q, index)) || (q.importance || "B") === "A");
  }

  if (mode === "weak") {
    const weakCategories = categoryStats()
      .filter((item) => item.answered > 0)
      .sort((a, b) => a.rate - b.rate)
      .slice(0, 3)
      .map((item) => item.category);
    if (weakCategories.length) {
      questions = questions.filter((q) => weakCategories.includes(q.category));
    }
  }

  return questions.length ? questions : scopedQuestions.length ? scopedQuestions : [...state.questions];
}

function startRound() {
  const questions = filteredQuestions();
  const ids = questions.map((q) => questionId(q));
  state.queue = shuffle(ids);
  round = { ids, answered: 0, correct: 0, wrong: 0 };
  elements.resultPanel.hidden = true;
  $(".question-panel").hidden = false;
  renderStats();
}

function pickQuestion() {
  const questions = filteredQuestions();
  if (!state.queue.length && round.answered === 0) startRound();
  if (!state.queue.length) return null;

  const nextId = state.queue.shift();
  return questions.find((q) => questionId(q) === nextId) || questions[Math.floor(Math.random() * questions.length)];
}

function shuffle(items) {
  const list = [...items];
  for (let i = list.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [list[i], list[j]] = [list[j], list[i]];
  }
  return list;
}

function displayText(text) {
  let formatted = text;
  const keys = [...displayNames.keys()].sort((a, b) => b.length - a.length);
  keys.forEach((key) => {
    const escaped = key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    formatted = formatted.replace(new RegExp(`${escaped}(?!（)`, "g"), displayNames.get(key));
  });
  return formatted;
}

function choiceLabel(index) {
  return ["A", "B", "C", "D"][index] || String(index + 1);
}

function choiceExplanation(question, index) {
  const rawChoice = question.choices[index];
  const exactPairFact = pairChoiceFacts.get(String(rawChoice));
  if (exactPairFact) return exactPairFact;

  const savedNote = Array.isArray(question.choiceNotes) ? question.choiceNotes[index] : "";
  if (savedNote && !isGenericExplanation(savedNote)) {
    return savedNote;
  }

  const detailed = detailedChoiceExplanation(rawChoice);
  if (detailed) return detailed;

  const choice = displayText(rawChoice);
  if (index === question.answer) return question.note;

  const fact = choiceFacts.get(rawChoice);
  if (fact) return `${choice}は${fact}です。`;

  return `${choice}はこの設問の条件とは別の事項です。`;
}

function isGenericExplanation(note) {
  return /別の(産地・品種・制度|重要事項)/.test(String(note));
}

function detailedChoiceExplanation(rawChoice) {
  const choice = String(rawChoice);
  const pairFact = pairChoiceFacts.get(choice);
  if (pairFact) return pairFact;

  if (choice.includes(" - ")) {
    const [left, right] = choice.split(" - ").map((part) => part.trim());
    const leftFact = choiceFacts.get(left);
    const rightFact = choiceFacts.get(right);
    const soilFact = soilExplanationFor(left);
    if (leftFact && rightFact) return `${left}は${leftFact}。${right}は${rightFact}。`;
    if (soilFact && rightFact) return `${soilFact}。${right}は${rightFact}。`;
    if (soilFact) return `${soilFact}。`;
    if (leftFact) return `${left}は${leftFact}。`;
    if (rightFact) return `${right}は${rightFact}。`;
  }

  const soilFact = soilExplanationFor(choice);
  if (soilFact) return `${soilFact}。`;

  return "";
}

function soilExplanationFor(text) {
  const match = soilFacts.find(([soil]) => text.includes(soil));
  return match ? `${match[0]}は${match[1]}` : "";
}

function renderCategoryFilter() {
  const selected = elements.categoryFilter.value || "all";
  elements.categoryFilter.innerHTML = "";
  const allOption = new Option(`すべて (${categoryQuestionCount("all")})`, "all");
  elements.categoryFilter.add(allOption);
  const groups = groupedCategories();
  const groupSet = new Set(groups);
  const categories = getCategories().sort(compareCategoryNames);
  const renderedCategories = new Set();
  const addCategoryOption = (category) => {
    const label = groupSet.has(category) ? `${category} / 全般` : category;
    elements.categoryFilter.add(new Option(`${label} (${categoryQuestionCount(category)})`, category));
    renderedCategories.add(category);
  };
  groups.forEach((group) => {
    const value = `group:${group}`;
    elements.categoryFilter.add(new Option(`${group} (${categoryQuestionCount(value)})`, value));
    (priorityCategoriesByGroup[group] || [])
      .filter((category) => categories.includes(category))
      .forEach(addCategoryOption);
    categories
      .filter((category) => topCategory(category) === group)
      .forEach(addCategoryOption);
  });
  categories.filter((category) => !renderedCategories.has(category)).forEach((category) => {
    addCategoryOption(category);
  });
  elements.categoryFilter.value = [...elements.categoryFilter.options].some((option) => option.value === selected)
    ? selected
    : "all";
}

function renderQuestion(question = pickQuestion()) {
  if (!question) {
    showResult();
    return;
  }
  currentQuestion = question;
  answeredCurrent = false;
  const id = questionId(question);
  const total = filteredQuestions().length;
  const attempt = getAttempt(id);

  elements.questionCategory.textContent = `${question.category} ・ 重要度${question.importance || "B"}`;
  elements.questionProgress.textContent = `${round.answered + 1} / ${total}`;
  elements.questionText.textContent = question.question;
  renderBookmarkButton();
  elements.answerBox.hidden = true;
  elements.answerResult.textContent = "";
  elements.choiceNotes.innerHTML = "";
  elements.nextButton.hidden = true;
  elements.skipButton.hidden = false;
  elements.choices.innerHTML = "";
  currentChoiceOrder = shuffle(question.choices.map((_, index) => index));

  currentChoiceOrder.forEach((originalIndex, displayIndex) => {
    const choice = question.choices[originalIndex];
    const button = document.createElement("button");
    button.className = "choice";
    button.type = "button";
    button.textContent = `${choiceLabel(displayIndex)}. ${displayText(choice)}`;
    button.addEventListener("click", () => answerQuestion(originalIndex));
    elements.choices.append(button);
  });
}

function answerQuestion(choiceIndex) {
  if (!currentQuestion || answeredCurrent) return;
  answeredCurrent = true;

  const id = questionId(currentQuestion);
  const correct = choiceIndex === currentQuestion.answer;
  const attempt = getAttempt(id);
  attempt.answered += 1;
  attempt.correct += correct ? 1 : 0;
  attempt.wrong += correct ? 0 : 1;
  state.attempts[id] = attempt;
  round.answered += 1;
  round.correct += correct ? 1 : 0;
  round.wrong += correct ? 0 : 1;

  if (!correct && !state.missed.includes(id)) state.missed.unshift(id);

  [...elements.choices.children].forEach((button, displayIndex) => {
    const originalIndex = currentChoiceOrder[displayIndex];
    button.disabled = true;
    if (originalIndex === currentQuestion.answer) button.classList.add("is-correct");
    if (originalIndex === choiceIndex && !correct) button.classList.add("is-wrong");
  });

  elements.answerBox.hidden = false;
  elements.answerResult.textContent = correct ? "正解です。" : `不正解です。正解は「${displayText(currentQuestion.choices[currentQuestion.answer])}」です。`;
  elements.answerResult.style.color = correct ? "var(--good)" : "var(--bad)";
  renderChoiceNotes(choiceIndex);
  elements.nextButton.hidden = false;
  elements.skipButton.hidden = true;

  saveState();
  renderStats();
  renderMissed();
  renderAnalytics();
}

function renderChoiceNotes(selectedIndex) {
  elements.choiceNotes.innerHTML = "";

  currentChoiceOrder.forEach((originalIndex, displayIndex) => {
    const choice = currentQuestion.choices[originalIndex];
    const item = document.createElement("article");
    item.className = "choice-note";
    if (originalIndex === currentQuestion.answer) item.classList.add("is-correct");
    if (originalIndex === selectedIndex && originalIndex !== currentQuestion.answer) item.classList.add("is-selected-wrong");

    const title = document.createElement("h3");
    title.textContent = `${choiceLabel(displayIndex)}. ${displayText(choice)}`;

    const status = document.createElement("strong");
    if (originalIndex === currentQuestion.answer) {
      status.textContent = "正解です";
    } else if (originalIndex === selectedIndex) {
      status.textContent = "選んだ回答";
    } else {
      status.textContent = "不正解";
    }

    const explanation = document.createElement("p");
    explanation.textContent = displayText(choiceExplanation(currentQuestion, originalIndex));

    item.append(title, status, explanation);
    elements.choiceNotes.append(item);
  });
}

function categoryStats() {
  const map = new Map();
  state.questions.forEach((question) => {
    if (!map.has(question.category)) {
      map.set(question.category, { category: question.category, answered: 0, correct: 0, wrong: 0, rate: 0 });
    }
    const stats = map.get(question.category);
    const attempt = getAttempt(questionId(question));
    stats.answered += attempt.answered;
    stats.correct += attempt.correct;
    stats.wrong += attempt.wrong;
  });

  return [...map.values()].map((item) => ({
    ...item,
    rate: item.answered ? Math.round((item.correct / item.answered) * 100) : 0
  }));
}

function renderStats() {
  elements.roundProgress.textContent = `${round.answered} / ${round.ids.length || filteredQuestions().length}`;
  elements.reviewCount.textContent = getReviewIds().size;
  elements.missedCount.textContent = state.missed.length;
}

function getReviewIds() {
  return new Set([...state.missed, ...state.bookmarked]);
}

function findQuestionById(id) {
  return state.questions.find((question) => questionId(question) === id);
}

function renderMissed() {
  elements.missedList.innerHTML = "";
  const questions = [...getReviewIds()].map(findQuestionById).filter(Boolean);
  if (!questions.length) {
    elements.missedList.innerHTML = '<div class="empty">復習リストはまだ空です。</div>';
    return;
  }

  const template = $("#missedItemTemplate");
  questions.forEach((question) => {
    const node = template.content.firstElementChild.cloneNode(true);
    node.querySelector(".pill").textContent = question.category;
    node.querySelector("h3").textContent = question.question;
    const id = questionId(question);
    const source = state.missed.includes(id) ? "間違い保存" : "復習登録";
    node.querySelector("p").textContent = `${source} / 正解: ${displayText(question.choices[question.answer])}`;
    node.querySelector("button").addEventListener("click", () => {
      switchView("quizView");
      renderQuestion(question);
    });
    elements.missedList.append(node);
  });
}

function renderBookmarkButton() {
  if (!currentQuestion) return;
  const id = questionId(currentQuestion);
  const active = state.bookmarked.includes(id);
  elements.bookmarkButton.textContent = active ? "復習から外す" : "復習に追加";
  elements.bookmarkButton.classList.toggle("is-active", active);
}

function toggleBookmark() {
  if (!currentQuestion) return;
  const id = questionId(currentQuestion);
  if (state.bookmarked.includes(id)) {
    state.bookmarked = state.bookmarked.filter((savedId) => savedId !== id);
  } else {
    state.bookmarked.unshift(id);
  }
  saveState();
  renderBookmarkButton();
  renderStats();
  renderMissed();
}

function showResult() {
  $(".question-panel").hidden = true;
  elements.resultPanel.hidden = false;
  elements.resultAnswered.textContent = round.answered;
  elements.resultWrong.textContent = round.wrong;
  elements.resultAccuracy.textContent = round.answered ? `${Math.round((round.correct / round.answered) * 100)}%` : "0%";
  renderStats();
}

function restartRound() {
  state.queue = [];
  startRound();
  renderQuestion();
}

function renderAnalytics() {
  elements.analyticsList.innerHTML = "";
  const stats = categoryStats().sort((a, b) => a.rate - b.rate || b.answered - a.answered);
  if (!stats.length) {
    elements.analyticsList.innerHTML = '<div class="empty">問題データがありません。</div>';
    return;
  }

  stats.forEach((item) => {
    const article = document.createElement("article");
    article.className = "analytics-item";
    article.innerHTML = `
      <div class="analytics-title">
        <strong></strong>
        <span></span>
      </div>
      <div class="meter" aria-hidden="true"><i></i></div>
      <small></small>
    `;
    article.querySelector("strong").textContent = item.category;
    article.querySelector("span").textContent = item.answered ? `${item.rate}%` : "-";
    article.querySelector("i").style.width = `${item.rate}%`;
    article.querySelector("small").textContent = item.answered
      ? `${item.answered}回答 / 正解${item.correct} / 不正解${item.wrong}`
      : "未回答";
    elements.analyticsList.append(article);
  });
}

function switchView(viewId) {
  elements.tabs.forEach((tab) => tab.classList.toggle("is-active", tab.dataset.view === viewId));
  elements.views.forEach((view) => view.classList.toggle("is-active", view.id === viewId));
}

function resetStudyData() {
  if (!confirm("回答履歴と保存されたミスを初期化しますか？")) return;
  state.attempts = {};
  state.missed = [];
  state.bookmarked = [];
  state.queue = [];
  round = { ids: [], answered: 0, correct: 0, wrong: 0 };
  saveState();
  renderAll();
  renderQuestion();
}

function clearReview() {
  state.missed = [];
  state.bookmarked = [];
  saveState();
  renderAll();
}

function renderAll() {
  renderCategoryFilter();
  renderStats();
  renderMissed();
  renderAnalytics();
}

elements.tabs.forEach((tab) => {
  tab.addEventListener("click", () => switchView(tab.dataset.view));
});
elements.nextButton.addEventListener("click", () => renderQuestion());
elements.skipButton.addEventListener("click", () => renderQuestion());
elements.bookmarkButton.addEventListener("click", toggleBookmark);
elements.restartRoundButton.addEventListener("click", restartRound);
elements.categoryFilter.addEventListener("change", () => {
  startRound();
  renderQuestion();
});
elements.modeSelect.addEventListener("change", () => {
  startRound();
  renderQuestion();
});
elements.resetButton.addEventListener("click", resetStudyData);
elements.clearReviewButton.addEventListener("click", clearReview);

renderAll();
startRound();
renderQuestion();
