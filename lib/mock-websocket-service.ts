// This class simulates a WebSocket connection providing cryptocurrency updates
export class MockWebSocketService {
  private intervalId: NodeJS.Timeout | null = null
  private subscribers: Function[] = []
  private cryptoIds = ["bitcoin", "ethereum", "tether", "xrp", "bnb", "solana"]

  constructor() {
    this.startUpdates()
  }

  private startUpdates() {
    this.intervalId = setInterval(() => {
      // Generate random updates for a subset of assets
      const updates = this.generateRandomUpdates()

      // Notify all subscribers
      this.subscribers.forEach((subscriber) => subscriber(updates))
    }, 1500) // Update every 1.5 seconds
  }

  private generateRandomUpdates() {
    // Randomly select 1-3 assets to update
    const numberOfUpdates = Math.floor(Math.random() * 3) + 1
    const assetsToUpdate = new Set<string>()

    while (assetsToUpdate.size < numberOfUpdates) {
      const randomIndex = Math.floor(Math.random() * this.cryptoIds.length)
      assetsToUpdate.add(this.cryptoIds[randomIndex])
    }

    return Array.from(assetsToUpdate).map((id) => this.generateAssetUpdate(id))
  }

  private generateAssetUpdate(id: string) {
    // Generate random price change (-2% to +2%)
    const priceChangePercent = Math.random() * 4 - 2

    // Base values differ per asset
    let basePrice = 0
    let baseVolume = 0

    switch (id) {
      case "bitcoin":
        basePrice = 93759.48
        baseVolume = 43874950947
        break
      case "ethereum":
        basePrice = 1802.46
        baseVolume = 23547469307
        break
      case "tether":
        basePrice = 1.0
        baseVolume = 92288882007
        break
      case "xrp":
        basePrice = 2.22
        baseVolume = 5131481491
        break
      case "bnb":
        basePrice = 606.65
        baseVolume = 1874281784
        break
      case "solana":
        basePrice = 151.51
        baseVolume = 4881674486
        break
    }

    // Calculate new price
    const newPrice = basePrice * (1 + priceChangePercent / 100)

    // Calculate new volume (±5%)
    const volumeChangePercent = Math.random() * 10 - 5
    const newVolume = baseVolume * (1 + volumeChangePercent / 100)

    // Update percentage changes
    const priceChange1h = Math.random() * 2 - 1
    const priceChange24h = Math.random() * 4 - 2
    const priceChange7d = Math.random() * 8 - 4

    // Calculate volume in crypto
    let volumeInCrypto = 0

    switch (id) {
      case "bitcoin":
        volumeInCrypto = newVolume / newPrice
        break
      case "ethereum":
        volumeInCrypto = newVolume / newPrice
        break
      case "tether":
        volumeInCrypto = newVolume
        break
      case "xrp":
        volumeInCrypto = newVolume / newPrice
        break
      case "bnb":
        volumeInCrypto = newVolume / newPrice
        break
      case "solana":
        volumeInCrypto = newVolume / newPrice
        break
    }

    return {
      id,
      price: newPrice,
      priceChange1h,
      priceChange24h,
      priceChange7d,
      volume24h: newVolume,
      volumeInCrypto: Number.parseFloat((volumeInCrypto / 1000000).toFixed(2)),
    }
  }

  public subscribe(callback: Function) {
    this.subscribers.push(callback)

    return {
      unsubscribe: () => {
        this.subscribers = this.subscribers.filter((sub) => sub !== callback)

        if (this.subscribers.length === 0 && this.intervalId) {
          clearInterval(this.intervalId)
          this.intervalId = null
        }
      },
    }
  }
}
