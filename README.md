# ワインエキスパート対策

iPhone向けのJ.S.A.ワインエキスパート一次試験対策Webアプリです。

## アプリの特徴

- 4択問題形式
- 第1段階800問（重要度Aは頻出必須に限定）
- 間違えた問題を自動保存
- 復習登録した問題を再出題
- 重要度A問題を優先出題
- 分野ごとの正答率を表示
- 学習データはブラウザに保存
- iPhoneのホーム画面に追加すると「ワインエキスパート対策」と表示

## 公開のしくみ

このリポジトリでは、GitHub Pagesで `app/` フォルダだけを公開します。

公開は `.github/workflows/pages.yml` のGitHub Actionsで自動実行されます。
`main` ブランチへpushすると、GitHub Pagesへ反映されます。

## GitHub Pages公開手順

### 1. GitHubでリポジトリを作成する

GitHubで新しいリポジトリを作成します。

作成後、リポジトリURLを控えます。

例：

```text
https://github.com/ユーザー名/リポジトリ名.git
```

### 2. このプロジェクトをGit管理する

ターミナルで、このプロジェクトのフォルダへ移動します。

```bash
cd "/Users/UchibaAya/Documents/Codex/2026-05-27/web-iphone-4-pdf-pdf"
```

初回だけ、Gitを開始します。

```bash
git init -b main
```

### 3. GitHubリポジトリを登録する

下のURL部分を、自分のGitHubリポジトリURLに置き換えて実行します。

```bash
git remote add origin https://github.com/ユーザー名/リポジトリ名.git
```

### 4. ファイルをコミットする

```bash
git add .
git commit -m "Initial GitHub Pages app"
```

### 5. GitHubへpushする

```bash
git push -u origin main
```

### 6. GitHub Pagesを有効にする

GitHubのリポジトリ画面で、次の順に開きます。

```text
Settings → Pages
```

`Build and deployment` の `Source` を `GitHub Actions` にします。

### 7. 公開URLを確認する

リポジトリの `Actions` タブを開き、`Deploy GitHub Pages` が成功するまで待ちます。

成功すると、GitHub PagesのURLでアプリを開けます。

URLの例：

```text
https://ユーザー名.github.io/リポジトリ名/
```

## iPhoneのホーム画面に追加する方法

1. iPhoneのSafariでGitHub Pagesの公開URLを開きます。
2. 共有ボタンを押します。
3. 「ホーム画面に追加」を選びます。
4. 名前が「ワインエキスパート対策」になっていることを確認します。
5. 「追加」を押します。

ホーム画面から開くと、スマホアプリのような見た目で使えます。

## 問題データの拡張方針

問題はユーザー画面から追加しません。
コード内の問題パックを追加して拡張します。

- 第1段階: 約800問。重要度Aは頻出かつ必須に限定
- 第2段階: 重要度Bを追加、約1000〜1500問
- 第3段階: 発展問題、小国、歴史、地域横断問題、約2000〜3000問

問題パックの詳細は [app/question-packs/README.md](app/question-packs/README.md) を参照してください。
