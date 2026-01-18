// Supabaseクライアントの初期化
import { createClient } from '@supabase/supabase-js'

// 環境変数から接続情報を取得
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Supabaseクライアントを作成してエクスポート
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// 型定義：注文データの構造
export type Order = {
  id: string
  item_name: string
  quantity: number
  created_at: string
}
