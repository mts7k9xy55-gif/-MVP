# MVP 注文システム

React + Vite + TypeScript + Supabase で構築した最小構成の注文管理システムです。

## 機能

- 📝 注文フォーム（商品名・数量を入力してSupabaseに保存）
- 📊 管理画面（全注文を新しい順に表示）
- ⚡ Vercelへ即デプロイ可能

## 技術スタック

- **フロントエンド**: React 18 + Vite + TypeScript
- **データベース**: Supabase
- **ルーティング**: React Router v6
- **ホスティング**: Vercel

## セットアップ手順

### 1. 依存パッケージのインストール

```bash
npm install
```

### 2. Supabaseのセットアップ

#### テーブルを作成

Supabaseのダッシュボードで以下のSQLを実行してください：

```sql
-- ordersテーブルを作成
create table orders (
  id uuid default gen_random_uuid() primary key,
  item_name text not null,
  quantity int not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 匿名アクセスを許可（開発用）
alter table orders enable row level security;

create policy "Enable read access for all users" on orders
  for select using (true);

create policy "Enable insert for all users" on orders
  for insert with check (true);
```

#### 環境変数の設定

`.env.example` をコピーして `.env` を作成：

```bash
cp .env.example .env
```

`.env` ファイルに Supabase の接続情報を設定：

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### 3. 開発サーバーの起動

```bash
npm run dev
```

ブラウザで `http://localhost:5173` を開きます。

## ページ構成

- `/` - 注文フォーム
- `/admin` - 管理画面（全注文一覧）

## Vercelへのデプロイ

### 1. GitHubにプッシュ

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-repo-url>
git push -u origin main
```

### 2. Vercelでデプロイ

1. [Vercel](https://vercel.com) にアクセス
2. GitHubリポジトリをインポート
3. 環境変数を設定：
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. デプロイボタンをクリック

## ファイル構成

```
mvp-order-system/
├── src/
│   ├── main.tsx        # エントリーポイント + ルーティング設定
│   ├── App.tsx         # 注文ページ
│   ├── Admin.tsx       # 管理画面
│   ├── supabase.ts     # Supabaseクライアント設定
│   └── index.css       # スタイル
├── index.html          # HTMLテンプレート
├── package.json        # 依存関係
├── vite.config.ts      # Vite設定
├── tsconfig.json       # TypeScript設定
├── vercel.json         # Vercel設定（SPAルーティング用）
└── .env.example        # 環境変数テンプレート
```

## 本番運用時の注意

現在の設定では **誰でも注文の閲覧・作成が可能** です。本番環境では：

- 管理画面に認証を追加
- Supabaseの Row Level Security (RLS) を適切に設定
- APIキーを環境変数で管理

することを推奨します。

## ライセンス

MIT
