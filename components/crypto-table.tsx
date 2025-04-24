"use client"

import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { selectCryptoAssets, updateCryptoData } from "@/lib/features/crypto/cryptoSlice"
import { formatCurrency, formatPercentage, formatNumber } from "@/lib/utils"
import { MockWebSocketService } from "@/lib/mock-websocket-service"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"
import { InfoIcon, StarIcon } from "lucide-react"
import Image from "next/image"
import { PriceChart } from "@/components/price-chart"

export default function CryptoTable() {
  const assets = useSelector(selectCryptoAssets)
  const dispatch = useDispatch()

  useEffect(() => {
    const webSocketService = new MockWebSocketService()

    const subscription = webSocketService.subscribe((data) => {
      dispatch(updateCryptoData(data))
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [dispatch])

  return (
    <TooltipProvider>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b text-left">
              <th className="px-4 py-3 font-medium">#</th>
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium text-right">Price</th>
              <th className="px-4 py-3 font-medium text-right">1h %</th>
              <th className="px-4 py-3 font-medium text-right">24h %</th>
              <th className="px-4 py-3 font-medium text-right">7d %</th>
              <th className="px-4 py-3 font-medium text-right">
                <div className="flex items-center justify-end">
                  Market Cap
                  <Tooltip>
                    <TooltipTrigger>
                      <InfoIcon className="h-4 w-4 ml-1 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">Market capitalization is the total value of all coins</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </th>
              <th className="px-4 py-3 font-medium text-right">
                <div className="flex items-center justify-end">
                  Volume(24h)
                  <Tooltip>
                    <TooltipTrigger>
                      <InfoIcon className="h-4 w-4 ml-1 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">Trading volume in the last 24 hours</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </th>
              <th className="px-4 py-3 font-medium text-right">
                <div className="flex items-center justify-end">
                  Circulating Supply
                  <Tooltip>
                    <TooltipTrigger>
                      <InfoIcon className="h-4 w-4 ml-1 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">The amount of coins that are circulating in the market</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </th>
              <th className="px-4 py-3 font-medium text-center">Last 7 Days</th>
            </tr>
          </thead>
          <tbody>
            {assets.map((asset, index) => (
              <tr key={asset.id} className="border-b hover:bg-muted/50">
                <td className="px-4 py-4 text-muted-foreground">
                  <div className="flex items-center">
                    <StarIcon className="h-4 w-4 mr-2 text-muted-foreground/40" />
                    {index + 1}
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center">
                    <div className="h-8 w-8 mr-3 relative">
                      <Image
                        src={asset.logo || "/placeholder.svg"}
                        alt={asset.name}
                        width={32}
                        height={32}
                        className="rounded-full"
                      />
                    </div>
                    <div>
                      <div className="font-medium">{asset.name}</div>
                      <div className="text-muted-foreground">{asset.symbol}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4 text-right font-medium">{formatCurrency(asset.price)}</td>
                <td className={`px-4 py-4 text-right ${asset.priceChange1h >= 0 ? "text-green-600" : "text-red-600"}`}>
                  <div className="flex items-center justify-end">
                    {asset.priceChange1h >= 0 ? "▲" : "▼"} {formatPercentage(Math.abs(asset.priceChange1h))}
                  </div>
                </td>
                <td className={`px-4 py-4 text-right ${asset.priceChange24h >= 0 ? "text-green-600" : "text-red-600"}`}>
                  <div className="flex items-center justify-end">
                    {asset.priceChange24h >= 0 ? "▲" : "▼"} {formatPercentage(Math.abs(asset.priceChange24h))}
                  </div>
                </td>
                <td className={`px-4 py-4 text-right ${asset.priceChange7d >= 0 ? "text-green-600" : "text-red-600"}`}>
                  <div className="flex items-center justify-end">
                    {asset.priceChange7d >= 0 ? "▲" : "▼"} {formatPercentage(Math.abs(asset.priceChange7d))}
                  </div>
                </td>
                <td className="px-4 py-4 text-right">{formatCurrency(asset.marketCap)}</td>
                <td className="px-4 py-4 text-right">
                  <div>{formatCurrency(asset.volume24h)}</div>
                  <div className="text-xs text-muted-foreground">
                    {formatNumber(asset.volumeInCrypto)} {asset.symbol}
                  </div>
                </td>
                <td className="px-4 py-4 text-right">
                  <div>
                    {formatNumber(asset.circulatingSupply)} {asset.symbol}
                  </div>
                  {asset.maxSupply && (
                    <div className="mt-1 h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gray-500 rounded-full"
                        style={{ width: `${(asset.circulatingSupply / asset.maxSupply) * 100}%` }}
                      ></div>
                    </div>
                  )}
                </td>
                <td className="px-4 py-4 text-center">
                  <PriceChart data={asset.priceHistory} change={asset.priceChange7d} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </TooltipProvider>
  )
}
