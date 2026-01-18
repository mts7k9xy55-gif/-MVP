import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase, Order } from './supabase'

function Admin() {
  // 注文リストとローディング状態の管理
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // コンポーネントマウント時に注文データを取得
  useEffect(() => {
    fetchOrders()
  }, [])

  // Supabaseから注文データを取得
  const fetchOrders = async () => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false }) // 新しい順にソート

      if (error) throw error

      setOrders(data || [])
    } catch (error) {
      console.error('Error:', error)
      setError('データの取得に失敗しました')
    } finally {
      setIsLoading(false)
    }
  }

  // 日時を読みやすい形式に変換
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('ja-JP', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date)
  }

  return (
    <div className="container">
      <h1>注文管理画面</h1>
      
      {/* 注文ページへのリンク */}
      <Link to="/" className="nav-link">
        ← 注文ページに戻る
      </Link>

      {/* エラー表示 */}
      {error && (
        <div className="message error">
          {error}
        </div>
      )}

      {/* ローディング表示 */}
      {isLoading && (
        <div className="loading">読み込み中...</div>
      )}

      {/* 注文リスト表示 */}
      {!isLoading && !error && (
        <div className="orders-list">
          <h2>注文一覧 ({orders.length}件)</h2>
          
          {orders.length === 0 ? (
            <p style={{ color: '#999', padding: '20px 0' }}>
              まだ注文がありません
            </p>
          ) : (
            orders.map((order) => (
              <div key={order.id} className="order-item">
                <p>
                  <strong>商品名:</strong> {order.item_name}
                </p>
                <p>
                  <strong>数量:</strong> {order.quantity}
                </p>
                <p>
                  <strong>注文日時:</strong> {formatDate(order.created_at)}
                </p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}

export default Admin
