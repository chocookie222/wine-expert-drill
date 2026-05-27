(function () {
  window.QUESTION_PACKS = window.QUESTION_PACKS || [];

  const regionNotes = {
    "ボルドー": "Cabernet Sauvignon、Merlot、1855年格付け、甘口白を横断して問われる地域です。",
    "ブルゴーニュ": "Pinot Noir、Chardonnay、クリマ、村名・畑名の判別が重要な地域です。",
    "シャンパーニュ": "瓶内二次発酵と Chardonnay、Pinot Noir、Meunier が軸になる地域です。",
    "ロワール": "Sauvignon Blanc、Chenin Blanc、Cabernet Franc、Melon de Bourgogne を産地ごとに判別する地域です。",
    "ローヌ": "北部の Syrah と南部の Grenache 系ブレンドを比較する地域です。",
    "アルザス": "単一品種表示、Riesling、Gewurztraminer、Pinot Gris が重要な地域です。",
    "ジュラ・サヴォワ": "Vin Jaune、Savagnin、山地性産地の品種が重要な地域です。",
    "プロヴァンス": "ロゼと Bandol、Mourvedre を結びつけて整理する地域です。",
    "ラングドック・ルーション": "地中海性気候、広域産地、V.D.N. が重要な地域です。",
    "南西地方": "Cahors、Madiran、Jurancon など地方品種と産地判別が重要です。",
    "ピエモンテ": "Barolo、Barbaresco、Asti と Nebbiolo、Moscato Bianco が重要な州です。",
    "トスカーナ": "Chianti Classico、Brunello、Vino Nobile と Sangiovese が重要な州です。",
    "ヴェネト": "Valpolicella、Amarone、Soave、Prosecco を横断して判別する州です。",
    "ロンバルディア": "Franciacorta と瓶内二次発酵が重要な州です。",
    "トレンティーノ・アルト・アディジェ": "北部山岳地域で、国際品種と地方品種を整理する州です。",
    "フリウリ・ヴェネツィア・ジューリア": "白ワインと国境地域の品種理解が重要な州です。",
    "マルケ": "Verdicchio を中心に白ワインで問われる州です。",
    "アブルッツォ": "Montepulciano d'Abruzzo を品種名と地名の混同に注意して整理する州です。",
    "カンパーニア": "Taurasi、Fiano di Avellino、Greco di Tufo が重要な州です。",
    "プーリア": "Primitivo、Negroamaro など南部の黒ブドウ品種が重要な州です。",
    "シチリア": "Nero d'Avola、Etna、Nerello Mascalese、Marsala が重要な州です。",
    "サルデーニャ": "Cannonau、Vermentino di Gallura が重要な島の州です。",
    "日本": "甲州、マスカット・ベーリーA、GI、主要産地の判別が重要です。",
    "スペイン": "Rioja、Ribera del Duero、Rias Baixas、Jerez、Cava、熟成表示が重要です。",
    "ドイツ": "Riesling、Pradikatswein、Anbaugebiet、辛口表示の理解が重要です。",
    "アメリカ": "A.V.A.、カリフォルニア、オレゴン、ワシントン、ニューヨークを判別します。",
    "オーストラリア": "Shiraz、Semillon、Cabernet Sauvignon、主要産地の判別が重要です。",
    "ニュージーランド": "Marlborough と Sauvignon Blanc、Central Otago と Pinot Noir が重要です。",
    "チリ": "Carmenere、Maipo、Casablanca などの品種・産地判別が重要です。",
    "アルゼンチン": "Malbec、Mendoza、高標高の理解が重要です。",
    "南アフリカ": "Pinotage、Chenin Blanc、Stellenbosch などが重要です。",
    "ポルトガル": "Port、Douro、Vinho Verde、Madeira が重要です。",
    "オーストリア": "Gruner Veltliner、Wachau、DAC を整理します。",
    "ギリシャ": "Assyrtiko、Xinomavro、Santorini などが重要です。"
  };

  const conceptNotes = {
    "P.D.O.": "EUの保護原産地呼称で、A.O.C.やD.O.C.G.などと対応します。",
    "P.G.I.": "EUの保護地理的表示で、I.G.T.などと対応します。",
    "A.O.C.": "フランスの原産地呼称で、産地・品種・製法などを規定します。",
    "D.O.C.G.": "イタリアの上位原産地呼称で、D.O.C.より厳格な管理を示します。",
    "I.G.T.": "イタリアの地理的表示ワインで、D.O.C.より自由度の高いワインを含みます。",
    "D.O.Ca.": "スペインの上位原産地呼称で、Rioja と Priorat が重要です。",
    "Pradikatswein": "ドイツの肩書付き高品質ワインで、果汁糖度による等級を整理します。",
    "Trocken": "ドイツ語の辛口表示です。",
    "Reserva": "スペインなどで熟成期間と結びつく表示です。",
    "Crianza": "スペインの熟成表示で、赤は最低24カ月が基本です。",
    "Gran Reserva": "スペインの熟成表示で、赤は最低60カ月が基本です。",
    "瓶内二次発酵": "シャンパーニュやCavaなどで重要なスパークリング製法です。",
    "シャルマ方式": "タンク内二次発酵によるスパークリング製法です。",
    "酒精強化": "発酵途中または後にアルコールを加える製法で、Port、Sherry、V.D.N.などで重要です。",
    "貴腐": "Botrytis cinerea による甘口ワインの重要な現象です。",
    "マロラクティック発酵": "リンゴ酸が乳酸に変わり、酸味がやわらぐ変化です。",
    "マセラシオン・カルボニック": "ボージョレなどで知られる醸造法です。",
    "フィロキセラ": "ブドウ樹に被害を与え、アメリカ系台木への接ぎ木と結びつく害虫です。",
    "海洋性気候": "年較差が比較的小さく、降水量が比較的多い気候です。",
    "大陸性気候": "夏冬の気温差が大きくなりやすい気候です。",
    "地中海性気候": "夏は乾燥し、冬に降水が多い傾向の気候です。",
    "石灰質土壌": "ブルゴーニュやシャンパーニュなどで重要な土壌です。",
    "火山性土壌": "Etna、Santorini、Soave などで問われやすい土壌です。",
    "スレート土壌": "Priorat や Mosel などで重要な土壌です。"
  };

  const phase1 = [];
  const push = (q) => phase1.push(q);
  const noteFor = (choice) => regionNotes[choice] || conceptNotes[choice] || `${choice}は別の重要事項として整理します。`;
  const notes = (choices, answer, correctNote) => choices.map((choice, index) => index === answer ? correctNote : noteFor(choice));
  const q = (id, category, question, choices, answer, note, importance = "A") => push({
    id: `phase1-${id}`,
    category,
    importance,
    question,
    choices,
    answer,
    note,
    choiceNotes: notes(choices, answer, note)
  });

  const regionChoicesFr = ["ボルドー", "ブルゴーニュ", "シャンパーニュ", "ロワール", "ローヌ", "アルザス", "ジュラ・サヴォワ", "プロヴァンス", "ラングドック・ルーション", "南西地方"];
  const frAocs = [
    ["fr-aoc-001", "Pauillac", "ボルドー", "Pauillac はメドック地区の村名A.O.C.で、ボルドー左岸として整理します。"],
    ["fr-aoc-002", "Margaux", "ボルドー", "Margaux はメドック地区の村名A.O.C.で、1855年格付けとも結びつきます。"],
    ["fr-aoc-003", "Saint-Emilion", "ボルドー", "Saint-Emilion はボルドー右岸の重要A.O.C.です。"],
    ["fr-aoc-004", "Pomerol", "ボルドー", "Pomerol は Merlot 主体で問われやすいボルドー右岸の重要A.O.C.です。"],
    ["fr-aoc-005", "Sauternes", "ボルドー", "Sauternes は Semillon 主体の貴腐甘口白で重要なボルドーのA.O.C.です。"],
    ["fr-aoc-006", "Chablis", "ブルゴーニュ", "Chablis はブルゴーニュ北部の Chardonnay の白で重要です。"],
    ["fr-aoc-007", "Gevrey-Chambertin", "ブルゴーニュ", "Gevrey-Chambertin はコート・ド・ニュイの村名A.O.C.です。"],
    ["fr-aoc-008", "Meursault", "ブルゴーニュ", "Meursault はコート・ド・ボーヌの白で重要な村名A.O.C.です。"],
    ["fr-aoc-009", "Pouilly-Fuisse", "ブルゴーニュ", "Pouilly-Fuisse はマコネ地区の Chardonnay の白で重要です。"],
    ["fr-aoc-010", "Moulin-a-Vent", "ブルゴーニュ", "Moulin-a-Vent はボージョレのクリュとして重要です。"],
    ["fr-aoc-011", "Champagne", "シャンパーニュ", "Champagne は瓶内二次発酵と主要3品種で整理します。"],
    ["fr-aoc-012", "Sancerre", "ロワール", "Sancerre はロワール上流の Sauvignon Blanc で重要です。"],
    ["fr-aoc-013", "Pouilly-Fume", "ロワール", "Pouilly-Fume はロワール上流の Sauvignon Blanc で重要です。"],
    ["fr-aoc-014", "Vouvray", "ロワール", "Vouvray は Chenin Blanc の白で重要なロワールのA.O.C.です。"],
    ["fr-aoc-015", "Chinon", "ロワール", "Chinon は Cabernet Franc の赤で重要なロワール中流のA.O.C.です。"],
    ["fr-aoc-016", "Muscadet Sevre et Maine", "ロワール", "Muscadet Sevre et Maine は Melon de Bourgogne の白で重要です。"],
    ["fr-aoc-017", "Cote-Rotie", "ローヌ", "Cote-Rotie は北部ローヌの Syrah と Viognier の混醸で問われます。"],
    ["fr-aoc-018", "Hermitage", "ローヌ", "Hermitage は北部ローヌの Syrah の赤で重要です。"],
    ["fr-aoc-019", "Condrieu", "ローヌ", "Condrieu は北部ローヌの Viognier の白で重要です。"],
    ["fr-aoc-020", "Chateauneuf-du-Pape", "ローヌ", "Chateauneuf-du-Pape は南部ローヌの代表的A.O.C.です。"],
    ["fr-aoc-021", "Alsace Grand Cru", "アルザス", "Alsace Grand Cru はアルザスの品種・畑名と結びつけて整理します。"],
    ["fr-aoc-022", "Chateau-Chalon", "ジュラ・サヴォワ", "Chateau-Chalon はジュラの Vin Jaune で重要です。"],
    ["fr-aoc-023", "Arbois", "ジュラ・サヴォワ", "Arbois はジュラの代表的A.O.C.です。"],
    ["fr-aoc-024", "Bandol", "プロヴァンス", "Bandol はプロヴァンスで Mourvedre 主体の赤・ロゼが重要です。"],
    ["fr-aoc-025", "Cotes de Provence", "プロヴァンス", "Cotes de Provence はロゼで重要なプロヴァンスのA.O.C.です。"],
    ["fr-aoc-026", "Banyuls", "ラングドック・ルーション", "Banyuls はルーションのV.D.N.として重要です。"],
    ["fr-aoc-027", "Corbieres", "ラングドック・ルーション", "Corbieres はラングドックの広域的な赤で重要です。"],
    ["fr-aoc-028", "Minervois", "ラングドック・ルーション", "Minervois はラングドックの重要A.O.C.です。"],
    ["fr-aoc-029", "Cahors", "南西地方", "Cahors は Malbec の赤で重要な南西地方のA.O.C.です。"],
    ["fr-aoc-030", "Madiran", "南西地方", "Madiran は Tannat の赤で重要な南西地方のA.O.C.です。"],
    ["fr-aoc-031", "Jurancon", "南西地方", "Jurancon は南西地方の白・甘口で重要です。"],
    ["fr-aoc-032", "Bergerac", "南西地方", "Bergerac はボルドー周辺の南西地方として整理します。"]
  ];
  frAocs.forEach(([id, item, correct, note]) => q(id, "フランス総まとめ", `${item} が属する地域は？`, [correct, ...regionChoicesFr.filter((r) => r !== correct).slice(0, 3)], 0, note));

  const frVarieties = [
    ["fr-var-001", "Cabernet Sauvignon と Merlot の左右岸比較", "ボルドー", "Cabernet Sauvignon は左岸、Merlot は右岸を軸にボルドーで整理します。"],
    ["fr-var-002", "Pinot Noir と Chardonnay の村名・畑名判別", "ブルゴーニュ", "Pinot Noir と Chardonnay の産地判別はブルゴーニュの基本です。"],
    ["fr-var-003", "Chardonnay、Pinot Noir、Meunier の主要3品種", "シャンパーニュ", "主要3品種の組み合わせはシャンパーニュの最重要事項です。"],
    ["fr-var-004", "Sauvignon Blanc の Sancerre、Pouilly-Fume", "ロワール", "Sancerre と Pouilly-Fume はロワール上流で Sauvignon Blanc と結びつきます。"],
    ["fr-var-005", "Chenin Blanc の Vouvray、Savennieres", "ロワール", "Chenin Blanc はロワール中流の白・甘口・発泡で重要です。"],
    ["fr-var-006", "Syrah 単一または主体の Cote-Rotie、Hermitage", "ローヌ", "北部ローヌでは Syrah が赤ワインの中心です。"],
    ["fr-var-007", "Grenache を中心とする南部ブレンド", "ローヌ", "南部ローヌでは Grenache、Syrah、Mourvedre などのブレンドを整理します。"],
    ["fr-var-008", "Riesling、Gewurztraminer、Pinot Gris の単一品種表示", "アルザス", "アルザスは白品種の単一品種表示で頻出です。"],
    ["fr-var-009", "Savagnin と Vin Jaune", "ジュラ・サヴォワ", "Savagnin と Vin Jaune はジュラの重要な結びつきです。"],
    ["fr-var-010", "Mourvedre 主体の Bandol", "プロヴァンス", "Bandol と Mourvedre はプロヴァンスで重要です。"],
    ["fr-var-011", "Grenache 系の V.D.N.", "ラングドック・ルーション", "Banyuls などのV.D.N.はラングドック・ルーションで重要です。"],
    ["fr-var-012", "Malbec の Cahors、Tannat の Madiran", "南西地方", "Cahors と Madiran は南西地方の地方品種判別で頻出です。"]
  ];
  frVarieties.forEach(([id, clue, correct, note]) => q(id, "フランス総まとめ", `${clue} で判別する地域は？`, [correct, ...regionChoicesFr.filter((r) => r !== correct).slice(0, 3)], 0, note));

  const frHistory = [
    ["fr-hist-a-001", "フィロキセラ被害後に広く定着した栽培上の対応は？", ["アメリカ系台木への接ぎ木", "すべての畑の灌漑義務化", "瓶内二次発酵の義務化", "白品種への全面転換"], "フィロキセラ被害の結果、耐性を持つアメリカ系台木への接ぎ木が広まりました。"],
    ["fr-hist-a-002", "A.O.C.制度が目指したこととして適切なものは？", ["原産地と品種・製法・品質条件を結びつけて保護する", "全産地の品種を統一する", "生産者名だけで品質を決める", "輸出価格を統一する"], "A.O.C.制度は産地らしさを保護するため、原産地と生産条件を結びつけます。"],
    ["fr-hist-a-003", "1855年格付けと最も強く結びつく対象は？", ["ボルドーのメドックとソーテルヌ／バルサック", "ブルゴーニュの全グラン・クリュ", "アルザスの品種表示", "ロワールの全A.O.C."], "1855年格付けはボルドーのメドック格付けとソーテルヌ／バルサックを軸に整理します。"],
    ["fr-hist-a-004", "ブルゴーニュで修道院が残した歴史的影響として適切なものは？", ["畑ごとの個性の観察と記録", "1855年格付けの制定", "Cava製法の普及", "A.V.A.制度の制定"], "修道院の畑ごとの観察はブルゴーニュのクリマ理解につながります。"],
    ["fr-hist-a-005", "A.O.C.制度の理解で、単純な暗記より優先すべき視点は？", ["産地名と認められる品種・ワインタイプを結びつける", "ラベルの色だけを覚える", "ボトル重量を比較する", "生産者名だけを覚える"], "一次試験では産地、品種、製法、ワインタイプの対応関係が重要です。"],
    ["fr-hist-a-006", "フランスの格付け学習で混同しやすいが別物として整理すべきものは？", ["ボルドー1855年格付けとブルゴーニュの畑の格付け", "SancerreとPouilly-Fume", "SyrahとShiraz", "P.D.O.とA.O.C."], "1855年格付けはボルドー、ブルゴーニュは畑単位の格付けとして整理します。"],
    ["fr-hist-a-007", "フランスワイン史でフィロキセラがもたらした結果として適切なものは？", ["台木利用と接ぎ木の重要性が増した", "全ワインが甘口になった", "A.V.A.制度が導入された", "シャンパーニュだけが生産可能になった"], "フィロキセラは栽培技術に大きな影響を与え、台木利用と結びつきます。"],
    ["fr-hist-a-008", "原産地呼称制度が試験で重要な理由は？", ["地域ごとの品種・製法・ワインタイプの判別に直結するため", "生産者名の人気順を示すため", "ワインの価格だけを決めるため", "ボトル形状だけを規定するため"], "原産地呼称は地域判別問題の土台になります。"]
  ];
  frHistory.forEach(([id, question, choices, note]) => q(id, "フランス 歴史・概論", question, choices, 0, note));

  const italyChoices = ["ピエモンテ", "トスカーナ", "ヴェネト", "ロンバルディア", "トレンティーノ・アルト・アディジェ", "フリウリ・ヴェネツィア・ジューリア", "マルケ", "アブルッツォ", "カンパーニア", "プーリア", "シチリア", "サルデーニャ"];
  const itItems = [
    ["it-reg-001", "Barolo", "ピエモンテ", "Barolo は Nebbiolo から造られるピエモンテ州のD.O.C.G.です。"],
    ["it-reg-002", "Barbaresco", "ピエモンテ", "Barbaresco は Nebbiolo から造られるピエモンテ州のD.O.C.G.です。"],
    ["it-reg-003", "Asti", "ピエモンテ", "Asti は Moscato Bianco の発泡性ワインでピエモンテ州です。"],
    ["it-reg-004", "Gavi", "ピエモンテ", "Gavi は Cortese の白でピエモンテ州の重要D.O.C.G.です。"],
    ["it-reg-005", "Chianti Classico", "トスカーナ", "Chianti Classico は Sangiovese 主体のトスカーナ州のD.O.C.G.です。"],
    ["it-reg-006", "Brunello di Montalcino", "トスカーナ", "Brunello di Montalcino はトスカーナ州で Sangiovese 系品種を用います。"],
    ["it-reg-007", "Vino Nobile di Montepulciano", "トスカーナ", "Vino Nobile di Montepulciano はトスカーナ州のD.O.C.G.です。"],
    ["it-reg-008", "Bolgheri", "トスカーナ", "Bolgheri は国際品種の赤で問われやすいトスカーナ州の産地です。"],
    ["it-reg-009", "Valpolicella", "ヴェネト", "Valpolicella は Corvina を中心とするヴェネト州の赤です。"],
    ["it-reg-010", "Amarone della Valpolicella", "ヴェネト", "Amarone は陰干しブドウから造るヴェネト州の重要赤ワインです。"],
    ["it-reg-011", "Soave", "ヴェネト", "Soave は Garganega 主体のヴェネト州の白です。"],
    ["it-reg-012", "Prosecco", "ヴェネト", "Prosecco は Glera から造られる発泡性ワインでヴェネト州を中心に整理します。"],
    ["it-reg-013", "Franciacorta", "ロンバルディア", "Franciacorta はロンバルディア州の瓶内二次発酵の発泡性ワインです。"],
    ["it-reg-014", "Trento", "トレンティーノ・アルト・アディジェ", "Trento は北部山岳地域の瓶内二次発酵スパークリングで重要です。"],
    ["it-reg-015", "Collio", "フリウリ・ヴェネツィア・ジューリア", "Collio はフリウリ・ヴェネツィア・ジューリア州の白で重要です。"],
    ["it-reg-016", "Verdicchio dei Castelli di Jesi", "マルケ", "Verdicchio dei Castelli di Jesi はマルケ州の白ワインです。"],
    ["it-reg-017", "Montepulciano d'Abruzzo", "アブルッツォ", "Montepulciano d'Abruzzo はアブルッツォ州の赤で、品種名との混同に注意します。"],
    ["it-reg-018", "Taurasi", "カンパーニア", "Taurasi は Aglianico から造られるカンパーニア州の赤です。"],
    ["it-reg-019", "Fiano di Avellino", "カンパーニア", "Fiano di Avellino はカンパーニア州の重要白ワインです。"],
    ["it-reg-020", "Greco di Tufo", "カンパーニア", "Greco di Tufo はカンパーニア州の重要白ワインです。"],
    ["it-reg-021", "Primitivo di Manduria", "プーリア", "Primitivo di Manduria はプーリア州の重要赤ワインです。"],
    ["it-reg-022", "Salice Salentino", "プーリア", "Salice Salentino は Negroamaro と結びつくプーリア州の産地です。"],
    ["it-reg-023", "Etna", "シチリア", "Etna は火山性土壌と Nerello Mascalese で重要なシチリア州の産地です。"],
    ["it-reg-024", "Cerasuolo di Vittoria", "シチリア", "Cerasuolo di Vittoria はシチリア州のD.O.C.G.です。"],
    ["it-reg-025", "Marsala", "シチリア", "Marsala はシチリア州の酒精強化ワインです。"],
    ["it-reg-026", "Vermentino di Gallura", "サルデーニャ", "Vermentino di Gallura はサルデーニャ州の白ワインです。"]
  ];
  itItems.forEach(([id, item, correct, note]) => q(id, "イタリア総まとめ", `${item} が属する州は？`, [correct, ...italyChoices.filter((r) => r !== correct).slice(0, 3)], 0, note));

  const itVarieties = [
    ["it-var-001", "Nebbiolo", "Barolo、Barbaresco", "ピエモンテ", "Nebbiolo は Barolo、Barbaresco と結びつけてピエモンテで整理します。"],
    ["it-var-002", "Sangiovese", "Chianti Classico、Brunello di Montalcino", "トスカーナ", "Sangiovese はトスカーナの主要黒ブドウ品種です。"],
    ["it-var-003", "Corvina", "Valpolicella、Amarone", "ヴェネト", "Corvina は Valpolicella、Amarone と結びつくヴェネトの重要品種です。"],
    ["it-var-004", "Garganega", "Soave", "ヴェネト", "Garganega は Soave の主要白ブドウ品種です。"],
    ["it-var-005", "Glera", "Prosecco", "ヴェネト", "Glera は Prosecco の主要品種です。"],
    ["it-var-006", "Verdicchio", "Verdicchio dei Castelli di Jesi", "マルケ", "Verdicchio はマルケ州の白ワインで重要です。"],
    ["it-var-007", "Aglianico", "Taurasi", "カンパーニア", "Aglianico は Taurasi と結びつけて整理します。"],
    ["it-var-008", "Primitivo", "Primitivo di Manduria", "プーリア", "Primitivo はプーリア州の重要黒ブドウ品種です。"],
    ["it-var-009", "Nero d'Avola", "シチリアの代表的黒ブドウ品種", "シチリア", "Nero d'Avola はシチリアを代表する黒ブドウ品種です。"],
    ["it-var-010", "Nerello Mascalese", "Etna", "シチリア", "Nerello Mascalese は Etna と結びつけて整理します。"]
  ];
  itVarieties.forEach(([id, variety, clue, correct, note]) => q(id, "イタリア総まとめ", `${variety} と ${clue} で判別する州は？`, [correct, ...italyChoices.filter((r) => r !== correct).slice(0, 3)], 0, note));

  const itLaw = [
    ["it-law-001", "D.O.C.G.がD.O.C.より上位とされる理由は？", ["より厳格な原産地・品質管理を示すため", "すべて甘口であるため", "輸出専用であるため", "生産者名を隠すため"], "D.O.C.G.はD.O.C.より厳格な管理を示す上位原産地呼称です。"],
    ["it-law-002", "I.G.T.を理解するうえで適切な説明は？", ["地域表示を持ちながらD.O.C.より自由度の高いワインを含む", "D.O.C.G.より上位である", "瓶内二次発酵だけを示す", "フランスの1855年格付けである"], "I.G.T.は地理的表示を持ち、品種や製法の自由度が比較的高い区分です。"],
    ["it-law-003", "スーパータスカンの理解で重要な制度的背景は？", ["伝統的規定外の品種・製法がI.G.T.などで評価された", "D.O.C.G.が全廃された", "甘口ワインだけが認められた", "全ての赤にNebbioloが義務化された"], "スーパータスカンは既存規定外の国際品種などとI.G.T.の理解に結びつきます。"],
    ["it-law-004", "イタリアの原産地呼称学習で優先すべき視点は？", ["州、D.O.C.G.名、主要品種を結びつける", "ボトルの重さだけを覚える", "生産者名だけを暗記する", "輸出量順に並べる"], "一次試験では州、呼称、品種の対応関係が得点に直結します。"]
  ];
  itLaw.forEach(([id, question, choices, note]) => q(id, "イタリア 歴史・概論", question, choices, 0, note));

  const countrySets = [
    ["jp", "日本", ["山梨県", "北海道", "長野県", "山形県"], [
      ["甲州の代表産地", "山梨県", "甲州は山梨県を代表する白ブドウ品種です。"],
      ["マスカット・ベーリーAを交配した人物", "川上善兵衛", "マスカット・ベーリーAは川上善兵衛により交配されました。", ["川上善兵衛", "麻井宇介", "土屋守", "大村春夫"]],
      ["日本ワインの地理的表示として最初に指定された産地", "山梨", "GI山梨は日本ワインの制度で重要です。", ["山梨", "北海道", "長野", "山形"]],
      ["冷涼地品種 Kerner や Zweigelt と結びつきやすい産地", "北海道", "北海道は冷涼地品種と結びつけて整理します。"],
      ["千曲川ワインバレーと結びつく県", "長野県", "長野県は千曲川ワインバレーなどで重要です。"],
      ["甲州の果皮色", "灰色がかった淡い赤紫色", "甲州は白ブドウですが、果皮は灰色がかった淡い赤紫色を帯びます。", ["灰色がかった淡い赤紫色", "濃い黒紫色", "透明に近い緑色", "黄色がかった褐色"]]
    ]],
    ["es", "スペイン", ["Rioja", "Ribera del Duero", "Rias Baixas", "Jerez", "Priorat", "Rueda", "Cava", "La Mancha"], [
      ["Tempranillo と D.O.Ca.で重要な産地", "Rioja", "Rioja は Tempranillo と熟成表示で頻出です。"],
      ["Tinto Fino と結びつく産地", "Ribera del Duero", "Ribera del Duero は Tempranillo 系の Tinto Fino で重要です。"],
      ["Albarino と結びつく産地", "Rias Baixas", "Rias Baixas は Albarino の白で重要です。"],
      ["Palomino とソレラシステムで判別する産地", "Jerez", "Jerez は Sherry、Palomino、ソレラシステムで整理します。"],
      ["Llicorella と Garnacha／Carinena で重要な産地", "Priorat", "Priorat はスレート系土壌とD.O.Ca.で重要です。"],
      ["Verdejo と結びつく産地", "Rueda", "Rueda は Verdejo の白で頻出です。"],
      ["瓶内二次発酵で造られる発泡性ワイン", "Cava", "Cava は瓶内二次発酵で造られるスペインの発泡性ワインです。"],
      ["Airen の栽培面積と結びつきやすい内陸部", "La Mancha", "La Mancha は Airen と広大な栽培面積で整理します。"]
    ]],
    ["de", "ドイツ", ["Mosel", "Rheingau", "Pfalz", "Rheinhessen", "Ahr", "Franken", "Baden", "Nahe"], [
      ["急斜面と Riesling で最重要の産地", "Mosel", "Mosel は冷涼な急斜面と Riesling で重要です。"],
      ["Riesling と高品質辛口で重要な産地", "Rheingau", "Rheingau は Riesling の銘醸地として整理します。"],
      ["Spatburgunder で重要な北部の赤ワイン産地", "Ahr", "Ahr は Spatburgunder の赤で重要です。"],
      ["Silvaner とボックスボイテルで結びつく産地", "Franken", "Franken は Silvaner とボックスボイテルで重要です。"],
      ["ドイツ最大級の栽培面積を持つ産地", "Rheinhessen", "Rheinhessen は広い栽培面積で重要です。"],
      ["温暖で赤品種も重要な南部産地", "Baden", "Baden はドイツの中では温暖な産地として整理します。"]
    ]],
    ["us", "アメリカ", ["Napa Valley", "Sonoma", "Russian River Valley", "Central Coast", "Willamette Valley", "Columbia Valley", "Finger Lakes", "Walla Walla Valley"], [
      ["Cabernet Sauvignon と結びつくカリフォルニアの代表産地", "Napa Valley", "Napa Valley は Cabernet Sauvignon で最重要です。"],
      ["冷涼な Pinot Noir、Chardonnay と結びつくソノマのA.V.A.", "Russian River Valley", "Russian River Valley は冷涼系品種で重要です。"],
      ["Oregon の Pinot Noir で最重要の産地", "Willamette Valley", "Willamette Valley は Oregon の Pinot Noir で重要です。"],
      ["Washington State の広域A.V.A.", "Columbia Valley", "Columbia Valley はワシントン州の重要な広域A.V.A.です。"],
      ["New York の Riesling で重要な冷涼産地", "Finger Lakes", "Finger Lakes は Riesling などで重要です。"],
      ["Washington と Oregon にまたがるA.V.A.", "Walla Walla Valley", "Walla Walla Valley はワシントン州とオレゴン州にまたがります。"]
    ]],
    ["au", "オーストラリア", ["Barossa Valley", "Hunter Valley", "Coonawarra", "Margaret River", "Clare Valley", "Yarra Valley", "Tasmania", "Eden Valley"], [
      ["Shiraz と結びつく南オーストラリアの代表産地", "Barossa Valley", "Barossa Valley は Shiraz の重要産地です。"],
      ["Semillon の長期熟成型辛口白で重要な産地", "Hunter Valley", "Hunter Valley は Semillon で頻出です。"],
      ["Terra rossa と Cabernet Sauvignon で重要な産地", "Coonawarra", "Coonawarra は Terra rossa と Cabernet Sauvignon で整理します。"],
      ["Bordeaux 系品種と西オーストラリアで重要な産地", "Margaret River", "Margaret River は Cabernet Sauvignon などで重要です。"],
      ["Riesling で重要な南オーストラリアの産地", "Clare Valley", "Clare Valley は Riesling の銘醸地です。"]
    ]]
  ];
  countrySets.forEach(([prefix, category, pool, items]) => {
    items.forEach(([clue, answer, note, customChoices], index) => {
      const choices = customChoices || [answer, ...pool.filter((item) => item !== answer).slice(0, 3)];
      q(`${prefix}-core-${String(index + 1).padStart(3, "0")}`, category, `${clue}として適切なものは？`, choices, choices.indexOf(answer), note);
    });
  });

  const general = [
    ["gen-001", "海洋性気候の特徴として適切なものは？", ["年較差が比較的小さく降水量が比較的多い", "夏冬の気温差が大きい", "夏に乾燥し冬に雨が多い", "標高が高いほど必ず高温になる"], "海洋性気候は海の影響で年較差が緩和され、降水量が比較的多い傾向です。"],
    ["gen-002", "大陸性気候の特徴として適切なものは？", ["夏冬の気温差が大きい", "海の影響で年較差が小さい", "年間を通じて雨季が続く", "夏に必ず降水がない"], "大陸性気候は夏冬の気温差が大きくなりやすい気候です。"],
    ["gen-003", "地中海性気候の特徴として適切なものは？", ["夏は乾燥し冬に降水が多い", "年間を通じて高温多湿", "夏冬の差が全くない", "降水が常にゼロ"], "地中海性気候は夏の乾燥と冬の降水が重要です。"],
    ["gen-004", "標高が高い畑で起こりやすい影響は？", ["気温が下がり酸を保ちやすい", "必ず糖度がゼロになる", "日照が必ず失われる", "降水が完全になくなる"], "標高が上がると気温が下がりやすく、酸の保持に影響します。"],
    ["gen-005", "マロラクティック発酵で起こる主な変化は？", ["リンゴ酸が乳酸に変わる", "乳酸がリンゴ酸に変わる", "糖が酒石酸に変わる", "酒石酸がアルコールに変わる"], "マロラクティック発酵ではリンゴ酸が乳酸に変わり、酸味がやわらぎます。"],
    ["gen-006", "瓶内二次発酵が重要なワインとして適切なものは？", ["Champagne", "Sauternes", "Cahors", "Barolo"], "Champagne は瓶内二次発酵の理解が重要です。"],
    ["gen-007", "酒精強化ワインとして整理するものは？", ["Port", "Chablis", "Chianti Classico", "Sancerre"], "Port は発酵途中にアルコールを加える酒精強化ワインとして重要です。"],
    ["gen-008", "貴腐ワインと関係する菌は？", ["Botrytis cinerea", "Saccharomyces cerevisiae", "Oenococcus oeni", "Brettanomyces"], "Botrytis cinerea は条件が整うと貴腐菌として甘口ワインに関わります。"],
    ["gen-009", "フィロキセラ対策として重要な方法は？", ["アメリカ系台木への接ぎ木", "瓶内二次発酵", "澱引き", "清澄"], "フィロキセラ対策では耐性を持つアメリカ系台木への接ぎ木が重要です。"],
    ["gen-010", "石灰質土壌と強く結びつく産地として適切なものは？", ["Chablis", "Priorat", "Coonawarra", "Etna"], "Chablis はキンメリジャンを含む石灰質土壌で重要です。"],
    ["gen-011", "Terra rossa と結びつく産地は？", ["Coonawarra", "Chablis", "Mosel", "Santorini"], "Coonawarra は Terra rossa と Cabernet Sauvignon で重要です。"],
    ["gen-012", "Llicorella と結びつく産地は？", ["Priorat", "Pauillac", "Soave", "Marlborough"], "Priorat は Llicorella と呼ばれるスレート系土壌で重要です。"],
    ["gen-013", "一次試験の原産地呼称学習で最も重要な視点は？", ["産地、品種、ワインタイプ、格付けを結びつける", "生産者名だけを暗記する", "ラベル色だけを覚える", "価格順に並べる"], "得点には産地と品種・制度・ワインタイプの対応関係が重要です。"],
    ["gen-014", "EU分類で保護原産地呼称を示すものは？", ["P.D.O.", "P.G.I.", "A.V.A.", "I.G.T."], "P.D.O. は保護原産地呼称を示します。"],
    ["gen-015", "EU分類で保護地理的表示を示すものは？", ["P.G.I.", "P.D.O.", "D.O.C.G.", "A.O.C."], "P.G.I. は保護地理的表示を示します。"]
  ];
  general.forEach(([id, question, choices, note]) => q(id, "ワイン概論 / 重要A", question, choices, 0, note));

  const wrongRegion = (correct, pool) => pool.find((item) => item !== correct) || pool[0];
  const rotateWrongRegions = (correct, pool) => pool.filter((item) => item !== correct).slice(0, 3);
  frAocs.forEach(([id, item, correct, note]) => {
    q(`${id}-reverse`, "フランス総まとめ", `${correct}のA.O.C.として適切なものは？`, [item, ...frAocs.filter((row) => row[2] !== correct).slice(0, 3).map((row) => row[1])], 0, note);
    const wrongs = rotateWrongRegions(correct, regionChoicesFr);
    q(`${id}-pair`, "フランス総まとめ", `A.O.C.と地域の組み合わせで正しいものは？`, [`${item} - ${correct}`, `${item} - ${wrongs[0]}`, `${item} - ${wrongs[1]}`, `${item} - ${wrongs[2]}`], 0, note);
  });
  frVarieties.forEach(([id, clue, correct, note]) => {
    q(`${id}-reverse`, "フランス総まとめ", `${correct}の特徴として適切なものは？`, [clue, ...frVarieties.filter((row) => row[2] !== correct).slice(0, 3).map((row) => row[1])], 0, note);
    const wrongs = rotateWrongRegions(correct, regionChoicesFr);
    q(`${id}-pair`, "フランス総まとめ", `品種・ワインタイプと地域の組み合わせで正しいものは？`, [`${clue} - ${correct}`, `${clue} - ${wrongs[0]}`, `${clue} - ${wrongs[1]}`, `${clue} - ${wrongs[2]}`], 0, note);
  });

  itItems.forEach(([id, item, correct, note]) => {
    q(`${id}-reverse`, "イタリア総まとめ", `${correct}州のワインとして適切なものは？`, [item, ...itItems.filter((row) => row[2] !== correct).slice(0, 3).map((row) => row[1])], 0, note);
    const wrongs = rotateWrongRegions(correct, italyChoices);
    q(`${id}-pair`, "イタリア総まとめ", `ワイン名と州の組み合わせで正しいものは？`, [`${item} - ${correct}`, `${item} - ${wrongs[0]}`, `${item} - ${wrongs[1]}`, `${item} - ${wrongs[2]}`], 0, note);
  });
  itVarieties.forEach(([id, variety, clue, correct, note]) => {
    q(`${id}-reverse`, "イタリア総まとめ", `${correct}州の重要品種・ワインとして適切なものは？`, [`${variety} - ${clue}`, ...itVarieties.filter((row) => row[3] !== correct).slice(0, 3).map((row) => `${row[1]} - ${row[2]}`)], 0, note);
    const wrongs = rotateWrongRegions(correct, italyChoices);
    q(`${id}-pair`, "イタリア総まとめ", `品種と州の組み合わせで正しいものは？`, [`${variety} - ${correct}`, `${variety} - ${wrongs[0]}`, `${variety} - ${wrongs[1]}`, `${variety} - ${wrongs[2]}`], 0, note);
  });

  countrySets.forEach(([prefix, category, pool, items]) => {
    items.forEach(([clue, answer, note, customChoices], index) => {
      if (customChoices) return;
      q(`${prefix}-reverse-${String(index + 1).padStart(3, "0")}`, category, `${answer}と結びつく事項として適切なものは？`, [clue, ...items.filter((row) => row[1] !== answer && !row[3]).slice(0, 3).map((row) => row[0])], 0, note);
      const wrongs = rotateWrongRegions(answer, pool);
      if (wrongs.length >= 3) {
        q(`${prefix}-pair-${String(index + 1).padStart(3, "0")}`, category, `産地・事項の組み合わせで正しいものは？`, [`${answer} - ${clue}`, `${wrongs[0]} - ${clue}`, `${wrongs[1]} - ${clue}`, `${wrongs[2]} - ${clue}`], 0, note);
      }
    });
  });

  general.forEach(([id, question, choices, note], index) => {
    const answer = choices[0];
    q(`${id}-reverse`, "ワイン概論 / 重要A", `${answer}の説明として最も適切なものは？`, [note.replace(/。$/, ""), ...general.filter((_, i) => i !== index).slice(0, 3).map((row) => row[3].replace(/。$/, ""))], 0, note);
  });

  const repeatedDrill = [
    ["mix-001", "Cabernet Sauvignon", "ボルドー左岸・Napa Valley", "Merlot", "ボルドー右岸"],
    ["mix-002", "Pinot Noir", "ブルゴーニュ・Oregon", "Gamay", "Beaujolais"],
    ["mix-003", "Sauvignon Blanc", "Sancerre・Marlborough", "Chenin Blanc", "Vouvray"],
    ["mix-004", "Syrah", "北部ローヌ", "Grenache", "南部ローヌ"],
    ["mix-005", "Nebbiolo", "Barolo・Barbaresco", "Sangiovese", "Chianti Classico・Brunello"],
    ["mix-006", "Corvina", "Valpolicella・Amarone", "Glera", "Prosecco"],
    ["mix-007", "Tempranillo", "Rioja・Ribera del Duero", "Albarino", "Rias Baixas"],
    ["mix-008", "Riesling", "Mosel・Rheingau", "Gruner Veltliner", "オーストリア"],
    ["mix-009", "Malbec", "Cahors・Argentina", "Tannat", "Madiran・Uruguay"],
    ["mix-010", "Carmenere", "Chile", "Zinfandel", "California"]
  ];
  repeatedDrill.forEach(([id, left, leftHint, right, rightHint]) => {
    q(id, "地域横断 / 品種判別", `${left} と最も結びつきが強いものは？`, [leftHint, rightHint, "シャンパーニュ主要3品種", "酒精強化ワイン"], 0, `${left} は ${leftHint} と結びつけて整理します。`);
    q(`${id}-b`, "地域横断 / 品種判別", `${right} と最も結びつきが強いものは？`, [rightHint, leftHint, "貴腐甘口白", "火山性土壌"], 0, `${right} は ${rightHint} と結びつけて整理します。`);
  });

  window.QUESTION_PACKS.push({
    id: "phase1-core",
    title: "第1段階 重要度Aコア",
    phase: 1,
    targetTotalWithBase: 500,
    questions: phase1.slice(0, 379)
  });
})();
