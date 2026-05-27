(function () {
  window.QUESTION_PACKS = window.QUESTION_PACKS || [];

  const pack = [];
  const add = (question) => pack.push(question);
  const letters = ["A", "B", "C", "D"];
  const noteFor = (choice) => `${choice}は別の産地・品種・制度と結びつけて整理します。`;
  const makeNotes = (choices, answer, note) => choices.map((choice, index) => index === answer ? note : noteFor(choice));
  const choiceSet = (correct, wrongs) => [correct, ...wrongs.filter((item) => item !== correct).slice(0, 3)];
  const normalize = (text) => text.toLowerCase().replace(/[^a-z0-9ぁ-んァ-ン一-龥]+/g, "-").replace(/^-|-$/g, "");

  function q(id, category, question, choices, answer, note, importance = "A") {
    add({
      id: `phase1-balance-${id}`,
      category,
      importance,
      question,
      choices,
      answer,
      note,
      choiceNotes: makeNotes(choices, answer, note)
    });
  }

  function buildRegion(category, wrongRegions, facts, target) {
    let count = 0;
    let cursor = 0;
    while (count < target) {
      const fact = facts[cursor % facts.length];
      const base = `${normalize(category)}-${normalize(fact.key)}-${Math.floor(cursor / facts.length)}`;
      const regionChoices = choiceSet(category.split(" / ")[1], wrongRegions);
      const otherFacts = facts.filter((item) => item.key !== fact.key);
      const pattern = count % 5;

      if (pattern === 0) {
        q(`${base}-a`, category, `${fact.key}として適切なものは？`, choiceSet(fact.answer, fact.wrongs), 0, fact.note, fact.importance || "A");
      } else if (pattern === 1) {
        const wrongPairs = otherFacts.slice(0, 3).map((item, index) => `${item.key} - ${fact.wrongs[index % fact.wrongs.length]}`);
        q(`${base}-pair`, category, `${fact.key}を含む組み合わせで、正しいものはどれですか？`, choiceSet(`${fact.key} - ${fact.answer}`, wrongPairs), 0, fact.note, fact.importance || "A");
      } else if (pattern === 2) {
        const wrongFact = otherFacts[0] || fact;
        const correctPairs = otherFacts.slice(1).map((item) => `${item.key} - ${item.answer}`);
        q(`${base}-wrong-pair`, category, `${fact.key}周辺の知識で、誤っている組み合わせはどれですか？`, choiceSet(`${fact.key} - ${wrongFact.answer}`, [`${fact.key} - ${fact.answer}`, ...correctPairs]), 0, `${fact.key}は${fact.answer}と結びつけます。`, fact.importance || "A");
      } else if (pattern === 3) {
        q(`${base}-c`, category, `${category.split(" / ")[1]}で、${fact.key}はどれですか？`, choiceSet(fact.answer, fact.wrongs), 0, fact.note, fact.importance || "A");
      } else {
        const explanationChoices = choiceSet(
          `${fact.key} - ${fact.answer}`,
          otherFacts.slice(0, 3).map((item, index) => `${item.key} - ${fact.wrongs[index % fact.wrongs.length]}`)
        );
        q(`${base}-compare`, category, `${category.split(" / ")[1]}について、正しい組み合わせはどれですか？`, explanationChoices, 0, fact.note, fact.importance || "A");
      }
      count += 1;
      cursor += 1;
    }
  }

  const franceRegions = ["ボルドー", "ブルゴーニュ", "シャンパーニュ", "ロワール", "ローヌ", "アルザス", "ジュラ・サヴォワ", "プロヴァンス", "ラングドック・ルーション", "南西地方"];
  const italyRegions = ["ピエモンテ", "トスカーナ", "ヴェネト", "ロンバルディア", "トレンティーノ・アルト・アディジェ", "フリウリ・ヴェネツィア・ジューリア", "マルケ", "アブルッツォ", "カンパーニア", "プーリア", "シチリア", "サルデーニャ"];

  const data = [
    ["フランス / ボルドー", franceRegions, 12, [
      ["メドック、グラーヴで主体となりやすい黒ブドウ品種", "Cabernet Sauvignon", ["Merlot", "Pinot Noir", "Gamay"], "メドック、グラーヴでは Cabernet Sauvignon が主体になりやすく、砂利質土壌と結びつけます。"],
      ["右岸で主体となりやすい黒ブドウ品種", "Merlot", ["Cabernet Sauvignon", "Syrah", "Nebbiolo"], "ボルドー右岸では Merlot が主体になりやすく、Saint-Emilion や Pomerol と結びつけます。"],
      ["Pauillac、Margaux、Saint-Estephe が位置する地区", "Medoc", ["Entre-Deux-Mers", "Graves", "Pomerol"], "Pauillac、Margaux、Saint-Estephe はメドック地区の村名A.O.C.です。"],
      ["ボルドー甘口白で中心となる品種とスタイル", "Semillon主体の貴腐甘口白", ["Cabernet Sauvignon主体の辛口赤", "Chardonnay主体の瓶内二次発酵", "Grenache主体のロゼ"], "ボルドーの甘口白では Semillon を主体とする貴腐甘口白を整理します。"]
    ]],
    ["フランス / ブルゴーニュ", franceRegions, 11, [
      ["赤ワインの基本品種", "Pinot Noir", ["Cabernet Sauvignon", "Syrah", "Tempranillo"], "ブルゴーニュの赤は基本的に Pinot Noir と整理します。"],
      ["白ワインの基本品種", "Chardonnay", ["Sauvignon Blanc", "Riesling", "Chenin Blanc"], "ブルゴーニュの白は基本的に Chardonnay と整理します。"],
      ["Chablisで重要な土壌", "Kimmeridgian", ["Terra rossa", "Llicorella", "Galestro"], "Chablis ではキンメリジャンの石灰質土壌が重要です。"],
      ["Beaujolaisで主要な黒ブドウ品種", "Gamay", ["Pinot Noir", "Merlot", "Malbec"], "Beaujolais はブルゴーニュ地方に含めて、Gamay と結びつけます。"]
    ]],
    ["フランス / シャンパーニュ", franceRegions, 14, [
      ["主要3品種の組み合わせ", "Chardonnay / Pinot Noir / Meunier", ["Riesling / Silvaner / Kerner", "Grenache / Syrah / Mourvedre", "Semillon / Sauvignon Blanc / Muscadelle"], "シャンパーニュの主要3品種は Chardonnay、Pinot Noir、Meunier です。"],
      ["基本的な製法", "瓶内二次発酵", ["シャルマ方式", "ソレラ方式", "酸化熟成"], "シャンパーニュは瓶内二次発酵の理解が重要です。"],
      ["Blanc de Blancsの基本品種", "Chardonnay", ["Pinot Noir", "Meunier", "Gamay"], "Blanc de Blancs は主に Chardonnay から造られます。"],
      ["Blanc de Noirsに使われる品種", "Pinot Noir / Meunier", ["Chardonnay / Aligote", "Riesling / Muscat", "Semillon / Muscadelle"], "Blanc de Noirs は黒ブドウ品種から造る白のシャンパーニュです。"],
      ["シャンパーニュの気候として重要な特徴", "冷涼な北限産地", ["高温多湿", "乾燥した砂漠性", "熱帯性"], "シャンパーニュは冷涼な北限産地として酸の保持と発泡性ワインに結びつきます。"]
    ]],
    ["フランス / ロワール", franceRegions, 12, [
      ["Sancerreの主要品種", "Sauvignon Blanc", ["Chenin Blanc", "Melon de Bourgogne", "Viognier"], "Sancerre はロワール上流の Sauvignon Blanc で重要です。"],
      ["Vouvrayの主要品種", "Chenin Blanc", ["Sauvignon Blanc", "Chardonnay", "Palomino"], "Vouvray は Chenin Blanc の白、甘口、発泡で重要です。"],
      ["Chinonの主要品種", "Cabernet Franc", ["Cabernet Sauvignon", "Pinot Noir", "Gamay"], "Chinon は Cabernet Franc の赤で重要です。"],
      ["Muscadetの主要品種", "Melon de Bourgogne", ["Chenin Blanc", "Aligote", "Ugni Blanc"], "Muscadet は Melon de Bourgogne と結びつけます。"]
    ]],
    ["フランス / ローヌ", franceRegions, 12, [
      ["北部ローヌ赤の主要品種", "Syrah", ["Grenache", "Pinot Noir", "Cabernet Franc"], "北部ローヌの赤は Syrah が中心です。"],
      ["南部ローヌで重要な黒ブドウ品種", "Grenache", ["Nebbiolo", "Gamay", "Carmenere"], "南部ローヌでは Grenache を中心にブレンドを整理します。"],
      ["Condrieuの主要品種", "Viognier", ["Marsanne", "Roussanne", "Clairette"], "Condrieu は Viognier の白で重要です。"],
      ["Chateauneuf-du-Papeの位置づけ", "南部ローヌの代表的A.O.C.", ["北部ローヌの単一品種白", "ボルドー左岸の格付け村", "ロワール上流の白産地"], "Chateauneuf-du-Pape は南部ローヌの代表的A.O.C.です。"]
    ]],
    ["フランス / アルザス", franceRegions, 14, [
      ["アルザスで重要な表示の特徴", "単一品種表示", ["熟成期間表示", "クリュ・ブルジョワ", "酒精強化表示"], "アルザスは単一品種表示の理解が重要です。"],
      ["Grand Cruで重要な品種", "Riesling", ["Palomino", "Glera", "Ugni Blanc"], "アルザス Grand Cru では Riesling などの高貴品種を整理します。"],
      ["アルザスの気候に影響する山脈", "Vosges", ["Alps", "Pyrenees", "Apennines"], "ヴォージュ山脈の雨陰により、アルザスは比較的乾燥します。"],
      ["アルザスで重要な芳香性品種", "Gewurztraminer", ["Airen", "Trebbiano", "Bobal"], "Gewurztraminer はアルザスの芳香性品種として重要です。"],
      ["アルザスの位置", "ドイツ国境沿い", ["大西洋沿岸", "地中海沿岸", "ピレネー山麓"], "アルザスはドイツ国境沿いの地域として整理します。"]
    ]],
    ["フランス / ジュラ・サヴォワ", franceRegions, 15, [
      ["Vin Jauneで重要な品種", "Savagnin", ["Sauvignon Blanc", "Semillon", "Glera"], "Vin Jaune は Savagnin と結びつけてジュラで整理します。"],
      ["Chateau-Chalonのワインタイプ", "Vin Jaune", ["ロゼ", "貴腐甘口白", "辛口シェリー"], "Chateau-Chalon はジュラの Vin Jaune で重要です。"],
      ["ジュラで使われる特徴的な黒ブドウ品種", "Poulsard", ["Carmenere", "Tempranillo", "Nebbiolo"], "Poulsard はジュラの地方品種として重要です。"],
      ["サヴォワで重要な白ブドウ品種", "Jacquere", ["Palomino", "Moscato Bianco", "Garganega"], "Jacquere はサヴォワの白ブドウ品種として整理します。"],
      ["ジュラ・サヴォワの地理的特徴", "山地性・冷涼地域", ["熱帯性地域", "砂漠性地域", "平坦な灌漑専用地域"], "ジュラ・サヴォワは山地性・冷涼地域として整理します。"]
    ]],
    ["フランス / プロヴァンス", franceRegions, 14, [
      ["プロヴァンスで生産比率が高いワイン", "ロゼ", ["貴腐甘口白", "酸化熟成白", "瓶内二次発酵の白"], "プロヴァンスはロゼワインの産地として重要です。"],
      ["Bandolで重要な黒ブドウ品種", "Mourvedre", ["Gamay", "Nebbiolo", "Tannat"], "Bandol は Mourvedre 主体の赤・ロゼで重要です。"],
      ["プロヴァンスの気候", "地中海性気候", ["海洋性気候", "大陸性気候", "冷涼な山岳気候のみ"], "プロヴァンスは地中海性気候とロゼを結びつけます。"],
      ["Cotes de Provenceで中心となる理解", "ロゼの広域産地", ["貴腐甘口白", "酒精強化赤のみ", "シャンパーニュ方式のみ"], "Cotes de Provence はロゼの広域産地として重要です。"]
    ]],
    ["フランス / ラングドック・ルーション", franceRegions, 14, [
      ["Banyulsのワインタイプ", "V.D.N.", ["辛口シャンパーニュ", "貴腐甘口白", "通常の辛口白のみ"], "Banyuls はルーションの Vins Doux Naturels として重要です。"],
      ["この地域の気候", "地中海性気候", ["冷涼な海洋性気候", "極寒の大陸性気候", "熱帯雨林気候"], "ラングドック・ルーションは地中海性気候の広域産地として整理します。"],
      ["Corbieres、Minervoisの位置づけ", "ラングドックの重要A.O.C.", ["ボルドーの村名A.O.C.", "ブルゴーニュのグラン・クリュ", "ロワール上流の白産地"], "Corbieres、Minervois はラングドックの重要A.O.C.です。"],
      ["ルーションで重要な甘口酒精強化ワイン", "Banyuls / Maury / Rivesaltes", ["Sancerre / Vouvray", "Pauillac / Margaux", "Chablis / Meursault"], "Banyuls、Maury、Rivesaltes はV.D.N.で整理します。"]
    ]],
    ["フランス / 南西地方", franceRegions, 14, [
      ["Cahorsの主要品種", "Malbec", ["Merlot", "Pinot Noir", "Gamay"], "Cahors は Malbec の赤で重要です。"],
      ["Madiranの主要品種", "Tannat", ["Syrah", "Nebbiolo", "Grenache"], "Madiran は Tannat の赤で重要です。"],
      ["Juranconで押さえるべきスタイル", "白・甘口", ["ロゼのみ", "酒精強化赤のみ", "瓶内二次発酵のみ"], "Jurancon は白、特に甘口の理解が重要です。"],
      ["南西地方の学習で重要な視点", "地方品種とA.O.C.の対応", ["シャンパーニュ主要3品種だけ", "ブルゴーニュ畑名だけ", "スペイン熟成表示だけ"], "南西地方は地方品種とA.O.C.の対応関係で得点しやすい地域です。"]
    ]],
    ["イタリア / ピエモンテ", italyRegions, 13, [
      ["Baroloの主要品種", "Nebbiolo", ["Sangiovese", "Corvina", "Aglianico"], "Barolo は Nebbiolo から造られるピエモンテのD.O.C.G.です。"],
      ["Barbarescoの主要品種", "Nebbiolo", ["Montepulciano", "Primitivo", "Nero d'Avola"], "Barbaresco も Nebbiolo から造られるピエモンテのD.O.C.G.です。"],
      ["Astiの主要品種", "Moscato Bianco", ["Glera", "Garganega", "Verdicchio"], "Asti は Moscato Bianco の発泡性ワインで重要です。"],
      ["Gaviの主要品種", "Cortese", ["Fiano", "Greco", "Trebbiano"], "Gavi は Cortese の白でピエモンテの重要D.O.C.G.です。"],
      ["ピエモンテの重要黒ブドウ品種", "Barbera", ["Glera", "Airen", "Palomino"], "Barbera はピエモンテで重要な黒ブドウ品種です。"]
    ]],
    ["イタリア / トスカーナ", italyRegions, 13, [
      ["Chianti Classicoの主体品種", "Sangiovese", ["Nebbiolo", "Corvina", "Aglianico"], "Chianti Classico は Sangiovese 主体のトスカーナのD.O.C.G.です。"],
      ["Brunello di Montalcinoの品種", "Sangiovese", ["Barbera", "Glera", "Primitivo"], "Brunello di Montalcino は Sangiovese 系品種から造られます。"],
      ["Vino Nobile di Montepulcianoの州", "トスカーナ", ["ピエモンテ", "ヴェネト", "シチリア"], "Vino Nobile di Montepulciano はトスカーナのD.O.C.G.です。"],
      ["Bolgheriで重要な理解", "国際品種の赤", ["Moscatoの甘口発泡", "Gleraの発泡", "Savagninの酸化熟成"], "Bolgheri は国際品種の赤で問われやすい産地です。"]
    ]],
    ["イタリア / ヴェネト", italyRegions, 12, [
      ["Valpolicellaの重要品種", "Corvina", ["Nebbiolo", "Aglianico", "Sangiovese"], "Valpolicella は Corvina を中心に整理します。"],
      ["Amaroneの製法理解", "陰干しブドウを用いる赤", ["瓶内二次発酵のみ", "貴腐甘口白", "通常のロゼのみ"], "Amarone は陰干しブドウから造る力強い赤で重要です。"],
      ["Soaveの主要品種", "Garganega", ["Glera", "Moscato Bianco", "Verdicchio"], "Soave は Garganega 主体の白です。"],
      ["Proseccoの主要品種", "Glera", ["Chardonnay", "Cortese", "Fiano"], "Prosecco は Glera から造られる発泡性ワインです。"]
    ]],
    ["イタリア / ロンバルディア", italyRegions, 15, [
      ["Franciacortaの製法", "瓶内二次発酵", ["シャルマ方式のみ", "ソレラ方式", "酒精強化"], "Franciacorta は瓶内二次発酵の発泡性ワインで重要です。"],
      ["Franciacortaの州", "ロンバルディア", ["ヴェネト", "ピエモンテ", "シチリア"], "Franciacorta はロンバルディア州の重要D.O.C.G.です。"],
      ["Oltrepo Paveseで重要な品種", "Pinot Nero", ["Nebbiolo", "Aglianico", "Nero d'Avola"], "Oltrepo Pavese は Pinot Nero などで整理します。"],
      ["Valtellinaで重要な品種", "Nebbiolo", ["Corvina", "Glera", "Primitivo"], "Valtellina では Nebbiolo 系品種を整理します。"]
    ]],
    ["イタリア / トレンティーノ・アルト・アディジェ", italyRegions, 15, [
      ["この州の地理的特徴", "北部の山岳地域", ["地中海の島", "南部の乾燥平野", "大西洋沿岸"], "トレンティーノ・アルト・アディジェは北部山岳地域として整理します。"],
      ["Alto Adigeで見られる重要品種", "Lagrein", ["Aglianico", "Nero d'Avola", "Primitivo"], "Lagrein はアルト・アディジェで見られる重要品種です。"],
      ["Trento D.O.C.のワインタイプ", "瓶内二次発酵の発泡性ワイン", ["酒精強化ワイン", "貴腐甘口白", "陰干し赤"], "Trento は瓶内二次発酵の発泡性ワインで重要です。"],
      ["北部産地で重要な白品種", "Pinot Grigio", ["Palomino", "Airen", "Bobal"], "Pinot Grigio は北部イタリアの白で頻出です。"]
    ]],
    ["イタリア / フリウリ・ヴェネツィア・ジューリア", italyRegions, 15, [
      ["Collioの州", "フリウリ・ヴェネツィア・ジューリア", ["トスカーナ", "カンパーニア", "サルデーニャ"], "Collio はフリウリ・ヴェネツィア・ジューリア州の白で重要です。"],
      ["この州で重視されるワインタイプ", "高品質白ワイン", ["酒精強化赤", "貴腐甘口のみ", "ロゼのみ"], "フリウリは高品質白ワインで問われやすい地域です。"],
      ["国境地域として隣接する国", "スロヴェニア", ["ポルトガル", "ギリシャ", "アイルランド"], "フリウリはスロヴェニア国境に近い北東部の州です。"],
      ["Friulanoの位置づけ", "地方白品種", ["黒ブドウ品種", "酒精強化製法", "熟成表示"], "Friulano はフリウリの白品種として整理します。"]
    ]],
    ["イタリア / マルケ", italyRegions, 14, [
      ["Verdicchio dei Castelli di Jesiの品種", "Verdicchio", ["Garganega", "Fiano", "Greco"], "Verdicchio dei Castelli di Jesi はマルケ州の白です。"],
      ["マルケでVerdicchioと結びつくスタイル", "白ワイン", ["酒精強化赤", "瓶内二次発酵のみ", "貴腐甘口のみ"], "マルケは Verdicchio の白で重要です。"],
      ["Coneroで重要な品種", "Montepulciano", ["Nebbiolo", "Glera", "Corvina"], "Conero は Montepulciano を用いる赤で整理します。"],
      ["マルケの位置", "中部イタリアのアドリア海側", ["北西部の山岳地域", "地中海の島", "南部のかかと部分"], "マルケは中部イタリアのアドリア海側に位置します。"]
    ]],
    ["イタリア / アブルッツォ", italyRegions, 15, [
      ["Montepulciano d'Abruzzoの主要品種", "Montepulciano", ["Sangiovese", "Nebbiolo", "Glera"], "Montepulciano d'Abruzzo は品種 Montepulciano から造られます。"],
      ["Trebbiano d'Abruzzoのワインタイプ", "白ワイン", ["赤ワイン", "ロゼのみ", "酒精強化"], "Trebbiano d'Abruzzo は白ワインとして整理します。"],
      ["Cerasuolo d'Abruzzoのワインタイプ", "ロゼ", ["貴腐甘口白", "瓶内二次発酵のみ", "酒精強化赤"], "Cerasuolo d'Abruzzo はロゼとして重要です。"],
      ["アブルッツォで混同注意の語", "Montepulciano", ["Asti", "Soave", "Marsala"], "Montepulciano は地名と品種名の混同に注意します。"]
    ]],
    ["イタリア / カンパーニア", italyRegions, 15, [
      ["Taurasiの主要品種", "Aglianico", ["Sangiovese", "Corvina", "Glera"], "Taurasi は Aglianico から造るカンパーニアの赤です。"],
      ["Fiano di Avellinoの品種", "Fiano", ["Garganega", "Verdicchio", "Trebbiano"], "Fiano di Avellino はカンパーニアの重要白です。"],
      ["Greco di Tufoの品種", "Greco", ["Glera", "Cortese", "Moscato Bianco"], "Greco di Tufo はカンパーニアの重要白です。"],
      ["カンパーニアの代表的な赤D.O.C.G.", "Taurasi", ["Barolo", "Chianti Classico", "Amarone"], "Taurasi はカンパーニアの代表的な赤D.O.C.G.です。"]
    ]],
    ["イタリア / プーリア", italyRegions, 14, [
      ["Primitivo di Manduriaの品種", "Primitivo", ["Nebbiolo", "Corvina", "Verdicchio"], "Primitivo di Manduria はプーリア州の重要赤です。"],
      ["Primitivoと同一品種とされるもの", "Zinfandel", ["Pinotage", "Carmenere", "Tannat"], "Primitivo は Zinfandel と同一品種とされます。"],
      ["Salice Salentinoで重要な品種", "Negroamaro", ["Glera", "Cortese", "Fiano"], "Salice Salentino は Negroamaro と結びつけます。"],
      ["プーリアの位置", "イタリア半島のかかと部分", ["北西部の山岳地域", "中部アドリア海側", "地中海の島"], "プーリアはイタリア半島のかかと部分に位置します。"]
    ]],
    ["イタリア / シチリア", italyRegions, 13, [
      ["シチリアを代表する黒ブドウ品種", "Nero d'Avola", ["Nebbiolo", "Corvina", "Sangiovese"], "Nero d'Avola はシチリアを代表する黒ブドウ品種です。"],
      ["Etnaで重要な品種", "Nerello Mascalese", ["Glera", "Barbera", "Aglianico"], "Etna では Nerello Mascalese が重要です。"],
      ["Marsalaのワインタイプ", "酒精強化ワイン", ["瓶内二次発酵", "貴腐甘口白", "通常のロゼのみ"], "Marsala はシチリアの酒精強化ワインです。"],
      ["Etnaの土壌で重要な特徴", "火山性土壌", ["Terra rossa", "Kimmeridgian", "Llicorella"], "Etna は火山性土壌と品種を結びつけて整理します。"]
    ]],
    ["イタリア / サルデーニャ", italyRegions, 15, [
      ["Vermentino di Galluraのワインタイプ", "白ワイン", ["赤ワイン", "酒精強化", "貴腐甘口"], "Vermentino di Gallura はサルデーニャの白ワインです。"],
      ["サルデーニャで重要な白品種", "Vermentino", ["Garganega", "Glera", "Cortese"], "Vermentino はサルデーニャで重要な白品種です。"],
      ["Cannonauと同系統とされる品種", "Grenache", ["Nebbiolo", "Barbera", "Corvina"], "Cannonau は Grenache 系品種として整理します。"],
      ["サルデーニャの地理的特徴", "地中海の島", ["北部山岳内陸州", "アドリア海側の中部州", "アルプス山麓"], "サルデーニャは地中海の島の州です。"]
    ]]
  ];

  data.forEach(([category, allRegions, target, rows]) => {
    const wrongs = allRegions.filter((region) => region !== category.split(" / ")[1]);
    const facts = rows.map(([key, answer, wrongChoices, note]) => ({ key, answer, wrongs: wrongChoices, note }));
    buildRegion(category, wrongs, facts, target);
  });

  const spain = [
    ["Riojaの中心品種", "Tempranillo", ["Albarino", "Palomino", "Verdejo"], "Rioja の赤は Tempranillo が中心です。"],
    ["Rias Baixasの主要品種", "Albarino", ["Tempranillo", "Garnacha", "Bobal"], "Rias Baixas は Albarino の白で重要です。"],
    ["Jerezの主要品種", "Palomino", ["Verdejo", "Airen", "Godello"], "Jerez は Palomino と Sherry で整理します。"],
    ["Cavaの製法", "瓶内二次発酵", ["シャルマ方式", "ソレラ方式", "酒精強化"], "Cava は瓶内二次発酵で造られる発泡性ワインです。"]
  ];
  spain.forEach(([key, answer, wrongs, note], index) => q(`spain-balance-${index + 1}`, "スペイン / 主要産地", `${key}として適切なものは？`, choiceSet(answer, wrongs), 0, note));

  window.QUESTION_PACKS.push({
    id: "phase1-regional-balance",
    title: "第1段階 主要地域配分調整",
    phase: 1,
    questions: pack
  });
})();
