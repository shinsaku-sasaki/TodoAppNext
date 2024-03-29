# サンプル用 ToDo アプリ

## 準備

.env を作成する際は、.example.env を参考に

1. vercel で postgres を作成し、.env に設定する
2. 各種認証プロバイダでシークレット情報を作成する
3. postgres セットアップ

```
npx prisma migrate dev --name init
```

## 起動

```
npm run dev
```
