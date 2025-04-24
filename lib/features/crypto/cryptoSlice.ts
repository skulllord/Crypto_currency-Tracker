import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "@/lib/store"
import { initialCryptoData } from "@/lib/sample-data"

export interface CryptoAsset {
  id: string
  name: string
  symbol: string
  logo: string
  price: number
  priceChange1h: number
  priceChange24h: number
  priceChange7d: number
  marketCap: number
  volume24h: number
  volumeInCrypto: number
  circulatingSupply: number
  maxSupply: number | null
  priceHistory: number[]
}

interface CryptoState {
  assets: CryptoAsset[]
}

const initialState: CryptoState = {
  assets: initialCryptoData,
}

export const cryptoSlice = createSlice({
  name: "crypto",
  initialState,
  reducers: {
    updateCryptoData: (
      state,
      action: PayloadAction<
        {
          id: string
          price: number
          priceChange1h: number
          priceChange24h: number
          priceChange7d: number
          volume24h: number
          volumeInCrypto: number
        }[]
      >,
    ) => {
      action.payload.forEach((update) => {
        const assetIndex = state.assets.findIndex((asset) => asset.id === update.id)
        if (assetIndex !== -1) {
          state.assets[assetIndex] = {
            ...state.assets[assetIndex],
            ...update,
          }
        }
      })
    },
  },
})

export const { updateCryptoData } = cryptoSlice.actions

// Selectors
export const selectCryptoAssets = (state: RootState) => state.crypto.assets

export default cryptoSlice.reducer
