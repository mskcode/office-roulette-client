import React from 'react'
import ReactDOM from 'react-dom/client'
import { ReportHandler } from 'web-vitals'
import App from './components/App'
import './index.css'

const reportWebVitals = (onPerfEntry?: ReportHandler) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry)
      getFID(onPerfEntry)
      getFCP(onPerfEntry)
      getLCP(onPerfEntry)
      getTTFB(onPerfEntry)
    })
  }
}

const main = () => {
  const documentRoot = document.getElementById('root')
  const root = ReactDOM.createRoot(documentRoot as Element)
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )

  // If you want to start measuring performance in your app, pass a function
  // to log results (for example: reportWebVitals(console.log))
  // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
  reportWebVitals()
}

// ENTRYPOINT

main()
