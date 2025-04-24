import CryptoTable from "@/components/crypto-table"
import { Providers } from "@/components/providers"

export default function Home() {
  return (
    <Providers>
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Cryptocurrency Market</h1>
        <CryptoTable />
      </main>
    </Providers>
  )
}
