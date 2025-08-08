'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Dataset {
  id: string
  title: string
  description: string
  provider: string
  providerVerified: boolean
  price: number
  rating: number
  reviews: number
  downloads: number
  views: number
  tags: string[]
  quality: number
  size: string
  lastUpdated: string
  created: string
  license: string
  format: string
  updateFrequency: string
  coverage: string
  domain: string
  files: Array<{
    name: string
    size: number
    type: string
  }>
  sampleData?: Array<Record<string, any>>
}

interface DatasetStore {
  datasets: Dataset[]
  addDataset: (dataset: Omit<Dataset, 'id' | 'created' | 'lastUpdated' | 'downloads' | 'views' | 'reviews' | 'rating'>) => void
  getDatasetById: (id: string) => Dataset | undefined
  updateDataset: (id: string, updates: Partial<Dataset>) => void
}

// Mock initial datasets
const INITIAL_DATASETS: Dataset[] = [
  {
    id: '1',
    title: 'Global Climate Data 2024',
    description: 'Comprehensive climate measurements from 10,000+ weather stations worldwide, updated daily with temperature, humidity, and precipitation data.',
    provider: 'ClimateDAO',
    providerVerified: true,
    price: 45,
    rating: 4.8,
    reviews: 234,
    downloads: 12847,
    views: 45231,
    tags: ['Climate', 'Weather', 'IoT', 'Time Series'],
    quality: 95,
    size: '2.3 TB',
    lastUpdated: '2 hours ago',
    created: 'March 15, 2024',
    license: 'CC BY 4.0',
    format: 'CSV, JSON, Parquet',
    updateFrequency: 'Daily',
    coverage: 'Global',
    domain: 'Climate',
    files: [
      { name: 'climate_data_2024.csv', size: 2500000000, type: 'csv' },
      { name: 'metadata.json', size: 50000, type: 'json' }
    ],
    sampleData: [
      { station_id: 'US001', timestamp: '2024-01-01T00:00:00Z', temperature: 15.2, humidity: 68, precipitation: 0.0 },
      { station_id: 'EU045', timestamp: '2024-01-01T00:00:00Z', temperature: 8.7, humidity: 82, precipitation: 2.3 },
      { station_id: 'AS123', timestamp: '2024-01-01T00:00:00Z', temperature: 28.1, humidity: 45, precipitation: 0.0 }
    ]
  },
  {
    id: '2',
    title: 'Financial Markets Dataset',
    description: 'Real-time and historical financial data covering stocks, bonds, commodities, and crypto markets with millisecond precision.',
    provider: 'QuantumFinance',
    providerVerified: true,
    price: 120,
    rating: 4.9,
    reviews: 156,
    downloads: 8934,
    views: 23456,
    tags: ['Finance', 'Trading', 'Real-time', 'Markets'],
    quality: 98,
    size: '5.7 TB',
    lastUpdated: '15 minutes ago',
    created: 'February 28, 2024',
    license: 'Commercial License',
    format: 'CSV, JSON',
    updateFrequency: 'Real-time',
    coverage: 'Global',
    domain: 'Finance',
    files: [
      { name: 'market_data.csv', size: 6000000000, type: 'csv' }
    ]
  },
  {
    id: '3',
    title: 'Medical Imaging Collection',
    description: 'Anonymized medical scans including X-rays, MRIs, and CT scans with expert annotations for machine learning research.',
    provider: 'MedResearch Labs',
    providerVerified: true,
    price: 89,
    rating: 4.7,
    reviews: 89,
    downloads: 5623,
    views: 18934,
    tags: ['Healthcare', 'Medical', 'Images', 'ML'],
    quality: 92,
    size: '12.1 TB',
    lastUpdated: '1 day ago',
    created: 'January 10, 2024',
    license: 'CC BY 4.0',
    format: 'Images, JSON',
    updateFrequency: 'Weekly',
    coverage: 'North America',
    domain: 'Healthcare',
    files: [
      { name: 'xray_images.zip', size: 13000000000, type: 'zip' }
    ]
  }
]

export const useDatasetStore = create<DatasetStore>()(
  persist(
    (set, get) => ({
      datasets: INITIAL_DATASETS,

      addDataset: (datasetData) => {
        const newDataset: Dataset = {
          ...datasetData,
          id: Math.random().toString(36).substr(2, 9),
          created: new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          }),
          lastUpdated: 'Just now',
          downloads: 0,
          views: Math.floor(Math.random() * 100) + 1,
          reviews: 0,
          rating: 0,
          providerVerified: false
        }

        set((state) => ({
          datasets: [newDataset, ...state.datasets]
        }))

        return newDataset.id
      },

      getDatasetById: (id) => {
        return get().datasets.find(dataset => dataset.id === id)
      },

      updateDataset: (id, updates) => {
        set((state) => ({
          datasets: state.datasets.map(dataset =>
            dataset.id === id
              ? { ...dataset, ...updates, lastUpdated: 'Just now' }
              : dataset
          )
        }))
      }
    }),
    {
      name: 'dataset-store'
    }
  )
)
