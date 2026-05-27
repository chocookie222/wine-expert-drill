# Question Pack Design

このアプリでは、ユーザーが画面上で問題を追加する機能は持たせない。
問題追加はコード内の問題パックを増やすことで行う。

## フェーズ

- Phase 1: 約800問。重要度Aは「頻出かつ必須」に限定し、一次試験の得点に直結する産地、品種、格付け、法律、気候、土壌、歴史、製法を優先する。
- Phase 2: 重要度Bを追加し、約1000〜1500問へ拡張する。
- Phase 3: 発展問題、小国、歴史、地域横断問題を厚くし、約2000〜3000問へ拡張する。

## 追加方法

`window.QUESTION_PACKS` に `{ id, title, phase, questions }` を追加する。
`questions.generated.js` の既存問題と、`question-packs/*.js` の問題は `app.js` で結合される。

UIに追加ボタン、JSON入力欄、取り込み機能は置かない。
