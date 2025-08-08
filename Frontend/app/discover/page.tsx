'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Grid, List, SlidersHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DataCard } from '@/components/ui/data-card'
import { FiltersSidebar } from '@/components/marketplace/filters-sidebar'
import { Skeleton } from '@/components/ui/skeleton'

// Mock data
const MOCK_DATASETS = [
  {
    id: '1',
    title: 'Global Climate Data 2024',
    description: 'Comprehensive climate measurements from 10,000+ weather stations worldwide, updated daily with temperature, humidity, and precipitation data.',
    provider: 'ClimateDAO',
    price: 45,
    rating: 4.8,
    downloads: 12847,
    views: 45231,
    tags: ['Climate', 'Weather', 'IoT', 'Time Series'],
    quality: 95,
    size: '2.3 TB',
    lastUpdated: '2 hours ago'
  },
  {
    id: '2', 
    title: 'Financial Markets Dataset',
    description: 'Real-time and historical financial data covering stocks, bonds, commodities, and crypto markets with millisecond precision.',
    provider: 'QuantumFinance',
    price: 120,
    rating: 4.9,
    downloads: 8934,
    views: 23456,
    tags: ['Finance', 'Trading', 'Real-time', 'Markets'],
    quality: 98,
    size: '5.7 TB',
    lastUpdated: '15 minutes ago'
  },
  {
    id: '3',
    title: 'Medical Imaging Collection',
    description: 'Anonymized medical scans including X-rays, MRIs, and CT scans with expert annotations for machine learning research.',
    provider: 'MedResearch Labs',
    price: 89,
    rating: 4.7,
    downloads: 5623,
    views: 18934,
    tags: ['Healthcare', 'Medical', 'Images', 'ML'],
    quality: 92,
    size: '12.1 TB',
    lastUpdated: '1 day ago'
  },
  {
    id: '4',
    title: 'Social Media Sentiment Data',
    description: 'Processed social media posts with sentiment analysis, trending topics, and demographic insights from major platforms.',
    provider: 'SocialInsights',
    price: 67,
    rating: 4.6,
    downloads: 15234,
    views: 67890,
    tags: ['Social Media', 'Sentiment', 'NLP', 'Trends'],
    quality: 88,
    size: '890 GB',
    lastUpdated: '6 hours ago'
  },
  {
    id: '5',
    title: 'Genomic Sequences Database',
    description: 'Large-scale genomic sequencing data from diverse populations with associated phenotype information for research.',
    provider: 'GenomeCore',
    price: 156,
    rating: 4.9,
    downloads: 3456,
    views: 12345,
    tags: ['Genomics', 'DNA', 'Research', 'Biology'],
    quality: 97,
    size: '8.9 TB',
    lastUpdated: '3 days ago'
  },
  {
    id: '6',
    title: 'IoT Sensor Network Data',
    description: 'Real-time sensor data from smart cities including air quality, traffic patterns, noise levels, and energy consumption.',
    provider: 'SmartCity Solutions',
    price: 34,
    rating: 4.5,
    downloads: 9876,
    views: 34567,
    tags: ['IoT', 'Smart City', 'Sensors', 'Real-time'],
    quality: 85,
    size: '1.2 TB',
    lastUpdated: '30 minutes ago'
  }
]

export default function DiscoverPage() {
  const [datasets, setDatasets] = useState<typeof MOCK_DATASETS>([])
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showFilters, setShowFilters] = useState(true)

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setDatasets(MOCK_DATASETS)
      setLoading(false)
    }, 1500)
  }, [])

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <h1 className="text-3xl font-bold text-neutral-900 mb-2">
              Discover Datasets
            </h1>
            <p className="text-neutral-600">
              Explore {datasets.length.toLocaleString()} high-quality datasets from verified providers
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <Button
              variant={showFilters ? "default" : "outline"}
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal className="w-4 h-4 mr-2" />
              Filters
            </Button>
            
            <div className="flex items-center border border-neutral-200 rounded-lg p-1">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </motion.div>

        <div className="flex gap-8">
          {/* Filters Sidebar */}
          {showFilters && <FiltersSidebar />}

          {/* Main Content */}
          <div className="flex-1">
            {loading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="space-y-4">
                    <Skeleton className="h-48 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                className={
                  viewMode === 'grid' 
                    ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-6'
                    : 'space-y-6'
                }
              >
                {datasets.map((dataset, index) => (
                  <DataCard 
                    key={dataset.id} 
                    dataset={dataset} 
                    index={index}
                  />
                ))}
              </motion.div>
            )}

            {/* Load More */}
            {!loading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="text-center mt-12"
              >
                <Button variant="outline" size="lg">
                  Load More Datasets
                </Button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
