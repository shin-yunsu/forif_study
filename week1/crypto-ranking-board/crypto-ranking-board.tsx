"use client"

import { TrendingUp, TrendingDown, RefreshCw } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ModeToggle } from "./components/theme-toggle"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Skeleton } from "@/components/ui/skeleton"

interface CoinData {
  rank: number
  name: string
  symbol: string
  price: number
  change24h: number
  marketCap: number
  volume: number
  logo: string
}

function formatNumber(num: number): string {
  if (num >= 1e12) {
    return `${(num / 1e12).toFixed(2)}T`
  }
  if (num >= 1e9) {
    return `${(num / 1e9).toFixed(2)}B`
  }
  if (num >= 1e6) {
    return `${(num / 1e6).toFixed(2)}M`
  }
  if (num >= 1e3) {
    return `${(num / 1e3).toFixed(2)}K`
  }
  return `${num.toFixed(2)}`
}

function formatPrice(price: number): string {
  if (price >= 1) {
    return `${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  }
  return `${price.toFixed(4)}`
}

export default function Component() {
  const [coinData, setCoinData] = useState<CoinData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const fetchCryptoData = async () => {
    try {
      setError(null)
      const response = await fetch('/api/crypto')
      
      if (!response.ok) {
        throw new Error('Failed to fetch data')
      }
      
      const data = await response.json()
      setCoinData(data)
      setLastUpdate(new Date())
    } catch (err) {
      setError('암호화폐 데이터를 불러오는데 실패했습니다.')
      console.error('Error fetching crypto data:', err)
    } finally {
      setLoading(false)
      setIsRefreshing(false)
    }
  }

  useEffect(() => {
    fetchCryptoData()
    
    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchCryptoData, 30000)
    
    return () => clearInterval(interval)
  }, [])

  const handleRefresh = () => {
    setIsRefreshing(true)
    fetchCryptoData()
  }

  const formatLastUpdate = (date: Date | null) => {
    if (!date) return ''
    return new Intl.DateTimeFormat('ko-KR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }).format(date)
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-4">
      <div className="max-w-7xl mx-auto">
        <Card className="bg-card border-border">
          <CardHeader className="border-b border-border">
            <div className="flex justify-between items-center">
              <CardTitle className="text-2xl font-bold flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold text-black">₿</span>
                </div>
                암호화폐 순위
              </CardTitle>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleRefresh}
                  disabled={isRefreshing}
                  className="h-9 w-9"
                >
                  <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                </Button>
                <ModeToggle />
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {error && (
              <Alert className="m-4 border-red-800">
                <AlertDescription className="text-red-400">
                  {error}
                </AlertDescription>
              </Alert>
            )}
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-card/50">
                    <th className="text-left p-4 text-muted-foreground font-medium">순위</th>
                    <th className="text-left p-4 text-muted-foreground font-medium">이름</th>
                    <th className="text-right p-4 text-muted-foreground font-medium">가격 (USD)</th>
                    <th className="text-right p-4 text-muted-foreground font-medium">24시간 변동률</th>
                    <th className="text-right p-4 text-muted-foreground font-medium hidden md:table-cell">시가총액</th>
                    <th className="text-right p-4 text-muted-foreground font-medium hidden lg:table-cell">거래량 (24시간)</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    // Loading skeletons
                    Array.from({ length: 10 }).map((_, index) => (
                      <tr key={index} className="border-b border-border/50">
                        <td className="p-4">
                          <Skeleton className="h-5 w-8" />
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <Skeleton className="h-8 w-8 rounded-full" />
                            <div className="space-y-2">
                              <Skeleton className="h-4 w-24" />
                              <Skeleton className="h-3 w-12" />
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <Skeleton className="h-5 w-20 ml-auto" />
                        </td>
                        <td className="p-4">
                          <Skeleton className="h-6 w-16 ml-auto" />
                        </td>
                        <td className="p-4 hidden md:table-cell">
                          <Skeleton className="h-5 w-24 ml-auto" />
                        </td>
                        <td className="p-4 hidden lg:table-cell">
                          <Skeleton className="h-5 w-20 ml-auto" />
                        </td>
                      </tr>
                    ))
                  ) : (
                    coinData.map((coin, index) => (
                      <tr
                        key={coin.symbol}
                        className={`border-b border-border/50 hover:bg-muted/30 transition-colors ${
                          index % 2 === 0 ? "bg-card/20" : "bg-card/40"
                        }`}
                      >
                        <td className="p-4">
                          <span className="text-foreground font-medium">{coin.rank}</span>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <img 
                              src={coin.logo || "/placeholder.svg"} 
                              alt={coin.name} 
                              className="w-8 h-8 rounded-full"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement
                                target.src = "/placeholder.svg"
                              }}
                            />
                            <div>
                              <div className="font-semibold text-foreground">{coin.name}</div>
                              <div className="text-sm text-muted-foreground">{coin.symbol}</div>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 text-right">
                          <span className="font-semibold text-foreground">${formatPrice(coin.price)}</span>
                        </td>
                        <td className="p-4 text-right">
                          <Badge
                            variant="secondary"
                            className={`${
                              coin.change24h >= 0
                                ? "bg-green-900/30 text-green-400 border-green-800"
                                : "bg-red-900/30 text-red-400 border-red-800"
                            } flex items-center gap-1 justify-end`}
                          >
                            {coin.change24h >= 0 ? (
                              <TrendingUp className="w-3 h-3" />
                            ) : (
                              <TrendingDown className="w-3 h-3" />
                            )}
                            {coin.change24h >= 0 ? "+" : ""}
                            {coin.change24h.toFixed(2)}%
                          </Badge>
                        </td>
                        <td className="p-4 text-right hidden md:table-cell">
                          <span className="text-muted-foreground">${formatNumber(coin.marketCap)}</span>
                        </td>
                        <td className="p-4 text-right hidden lg:table-cell">
                          <span className="text-muted-foreground">${formatNumber(coin.volume)}</span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 text-center text-muted-foreground text-sm">
          <p>
            {lastUpdate && `마지막 업데이트: ${formatLastUpdate(lastUpdate)} • `}
            데이터는 30초마다 자동 업데이트됩니다 • Powered by CoinGecko
          </p>
        </div>
      </div>
    </div>
  )
}
