import { create } from 'zustand'

interface Dataset {
  id: string
  title: string
  description: string
  provider: string
  price: number
  tags: string[]
  quality: number
  size: string
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
  sampleData: any[]
  providerVerified: boolean
  ipfsHash?: string
  metadataHash?: string
  blockchainId?: number
}

interface DatasetStore {
  datasets: Dataset[]
  addDataset: (dataset: Omit<Dataset, 'id'>) => string
  getDataset: (id: string) => Dataset | undefined
}

export const useDatasetStore = create<DatasetStore>((set, get) => ({
  datasets: [],
  addDataset: (dataset) => {
    const id = Math.random().toString(36).substr(2, 9)
    const newDataset = { ...dataset, id }
    set((state) => ({
      datasets: [...state.datasets, newDataset]
    }))
    return id
  },
  getDataset: (id) => {
    return get().datasets.find(dataset => dataset.id === id)
  }
}))
