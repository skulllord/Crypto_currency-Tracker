# Crypto_currency-Tracker
# Real-Time Crypto Price Tracker

A responsive React application that simulates real-time cryptocurrency price updates using Redux Toolkit for state management.

## Features

- Real-time price updates for 6 major cryptocurrencies
- Responsive design that works on all device sizes
- Complete state management with Redux Toolkit
- Visual indicators for price changes (green for positive, red for negative)
- 7-day price charts
- Detailed information including market cap, 24h volume, and circulating supply

## Technology Stack

- **React**: UI library
- **Redux Toolkit**: State management
- **Next.js**: React framework
- **Tailwind CSS**: Styling
- **TypeScript**: Type safety

## Architecture

The application follows a clean architecture with the following components:

### Components
- `CryptoTable`: Main component that displays the cryptocurrency data
- `PriceChart`: Component for rendering the 7-day price charts
- `Providers`: Redux Provider wrapper

### Redux 
- **Store**: Central Redux store configuration
- **Slice**: Crypto slice for managing cryptocurrency data
- **Selectors**: Optimized selectors for accessing state data

### Services
- `MockWebSocketService`: Simulates real-time WebSocket updates

## Setup Instructions

1. Clone the repository:
```bash
git clone https://github.com/skulllord/Crypto_currency-Tracker.git
```
2. Go to folder 
```bash
cd crypto-price-tracker
```
3. Install all dependencies
```bash
pnpm install 
```
4. Run the file
```bash
pnpm dev
```
5. OPtional if pnpm not install 
first install pnpm 
```bash
npm install -g pnpm@latest-10
```