'use client'

import { motion } from 'framer-motion'
import { Star, Download, Eye, Coins } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface DataCardProps {
  dataset: {
    id: string
    title: string
    description: string
    provider: string
    price: number
    rating: number
    downloads: number
    views: number
    tags: string[]
    quality: number
    size: string
    lastUpdated: string
  }
  index?: number
}

export function DataCard({ dataset, index = 0 }: DataCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        ease: 'easeOut'
      }}
      whileHover={{ 
        scale: 1.03,
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
      }}
      className="group cursor-pointer"
    >
      <Card className="h-full border-2 border-neutral-100 hover:border-accent/30 transition-all duration-300">
        <CardContent className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="font-semibold text-lg text-neutral-900 mb-1 group-hover:text-primary transition-colors">
                {dataset.title}
              </h3>
              <p className="text-sm text-neutral-600 mb-2">by {dataset.provider}</p>
            </div>
            <div className="flex items-center space-x-1 text-sm text-neutral-600">
              <Star className="w-4 h-4 fill-secondary text-secondary" />
              <span>{dataset.rating}</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-neutral-700 text-sm mb-4 line-clamp-2">
            {dataset.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {dataset.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs bg-neutral-100 text-neutral-700">
                {tag}
              </Badge>
            ))}
            {dataset.tags.length > 3 && (
              <Badge variant="secondary" className="text-xs bg-neutral-100 text-neutral-700">
                +{dataset.tags.length - 3}
              </Badge>
            )}
          </div>

          {/* Metrics */}
          <div className="flex items-center justify-between text-sm text-neutral-600 mb-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Eye className="w-4 h-4" />
                <span>{dataset.views.toLocaleString()}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Download className="w-4 h-4" />
                <span>{dataset.downloads.toLocaleString()}</span>
              </div>
            </div>
            <div className="text-xs text-neutral-500">
              {dataset.size} • Updated {dataset.lastUpdated}
            </div>
          </div>

          {/* Quality Bar */}
          <div className="mb-4">
            <div className="flex items-center justify-between text-xs text-neutral-600 mb-1">
              <span>Quality Score</span>
              <span>{dataset.quality}%</span>
            </div>
            <div className="w-full bg-neutral-100 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-accent to-secondary h-2 rounded-full transition-all duration-500"
                style={{ width: `${dataset.quality}%` }}
              />
            </div>
          </div>

          {/* Price & Action */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1">
              <Coins className="w-4 h-4 text-secondary" />
              <span className="font-semibold text-lg text-neutral-900">
                {dataset.price} FIL
              </span>
              <span className="text-sm text-neutral-500">/month</span>
            </div>
            <Button asChild size="sm" className="bg-primary hover:bg-primary/90">
              <Link href={`/discover/${dataset.id}`}>
                View Details
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
