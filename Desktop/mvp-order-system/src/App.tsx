import { useState, FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from './supabase'

function App() {
  // フォーム入力の状態管理
  const [itemName, setItemName] = useState('')
  const [quantity, setQuantity] = useState(1)
  
  // 送信状態とメッセージの管理
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  // フォーム送信処理
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage(null)

    try {
      // Supabaseのordersテーブルにデータを挿入
      const { error } = await supabase
        .from('orders')
        .insert([
          {
            item_name: itemName,
            quantity: quantity
          }
        ])

      if (error) throw error

      // 成功時の処理
      setMessage({ type: 'success', text: '注文が完了しました！' })
      setItemName('')
      setQuantity(1)
    } catch (error) {
      // エラー時の処理
      console.error('Error:', error)
      setMessage({ type: 'error', text: '注文に失敗しました。もう一度お試しください。' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container">
      <h1>注文フォーム</h1>
      
      {/* 管理画面へのリンク */}
      <Link to="/admin" className="nav-link">
        → 管理画面を見る
      </Link>

      {/* メッセージ表示 */}
      {message && (
        <div className={`message ${message.type}`}>
          {message.text}
        </div>
      )}

      {/* 注文フォーム */}
      <form onSubmit={handleSubmit}>
        <label>
          商品名
          <input
            type="text"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            required
            placeholder="例: コーヒー"
          />
        </label>

        <label>
          数量
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            required
            min="1"
          />
        </label>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? '送信中...' : '注文する'}
        </button>
      </form>
    </div>
  )
}

export default App
