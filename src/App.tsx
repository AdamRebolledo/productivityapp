import React from 'react'
import logo from './logo.svg'
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import './App.css'
import Routes from './routes/routes'

const queryClient = new QueryClient()

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Routes />
      </QueryClientProvider>
    </>
  )
}

export default App
