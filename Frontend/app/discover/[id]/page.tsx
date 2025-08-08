'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Star, Download, Eye, Coins, Calendar, Database, Shield, Globe, Copy, ExternalLink, Play, Pause, Brain, BarChart3 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useDatasetStore } from '@/lib/store'

export default function DatasetDetailPage() {
  const params = useParams()
  const { getDatasetById } = useDatasetStore()
  const [dataset, setDataset] = useState<any>(null)
  const [selectedDuration, setSelectedDuration] = useState('1')
  const [accessDuration, setAccessDuration] = useState([1])
  const [showPurchaseModal, setShowPurchaseModal] = useState(false)

  useEffect(() => {
    if (params.id) {
      const foundDataset = getDatasetById(params.id as string)
      setDataset(foundDataset)
    }
  }, [params.id, getDatasetById])

  if (!dataset) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-neutral-900 mb-2">Dataset not found</h1>
          <p className="text-neutral-600 mb-4">The dataset you're looking for doesn't exist.</p>
          <Button asChild>
            <Link href="/discover">Back to Discover</Link>
          </Button>
        </div>
      </div>
    )
  }

  const totalPrice = dataset.price * accessDuration[0]

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-6"
        >
          <Button variant="ghost" asChild className="flex items-center space-x-2">
            <Link href="/discover">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Discover</span>
            </Link>
          </Button>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="border-2 border-neutral-100">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h1 className="text-3xl font-bold text-neutral-900 mb-2">
                        {dataset.title}
                      </h1>
                      <div className="flex items-center space-x-4 text-sm text-neutral-600 mb-4">
                        <div className="flex items-center space-x-1">
                          <span>by</span>
                          <span className="font-medium text-primary">{dataset.provider}</span>
                          {dataset.providerVerified && (
                            <Shield className="w-4 h-4 text-green-600" />
                          )}
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 fill-secondary text-secondary" />
                          <span>{dataset.rating || 'New'}</span>
                          {dataset.reviews > 0 && <span>({dataset.reviews} reviews)</span>}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary mb-1">
                        {dataset.price} FIL
                      </div>
                      <div className="text-sm text-neutral-600">per month</div>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {dataset.tags.map((tag: string) => (
                      <Badge key={tag} variant="secondary" className="bg-neutral-100 text-neutral-700">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="text-center p-3 bg-neutral-50 rounded-lg">
                      <Eye className="w-5 h-5 text-neutral-600 mx-auto mb-1" />
                      <div className="font-semibold">{dataset.views.toLocaleString()}</div>
                      <div className="text-xs text-neutral-600">Views</div>
                    </div>
                    <div className="text-center p-3 bg-neutral-50 rounded-lg">
                      <Download className="w-5 h-5 text-neutral-600 mx-auto mb-1" />
                      <div className="font-semibold">{dataset.downloads.toLocaleString()}</div>
                      <div className="text-xs text-neutral-600">Downloads</div>
                    </div>
                    <div className="text-center p-3 bg-neutral-50 rounded-lg">
                      <Database className="w-5 h-5 text-neutral-600 mx-auto mb-1" />
                      <div className="font-semibold">{dataset.size}</div>
                      <div className="text-xs text-neutral-600">Size</div>
                    </div>
                    <div className="text-center p-3 bg-neutral-50 rounded-lg">
                      <Calendar className="w-5 h-5 text-neutral-600 mx-auto mb-1" />
                      <div className="font-semibold">{dataset.updateFrequency}</div>
                      <div className="text-xs text-neutral-600">Updates</div>
                    </div>
                  </div>

                  {/* Quality Score */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between text-sm text-neutral-600 mb-2">
                      <span>Quality Score</span>
                      <span className="font-semibold">{dataset.quality}%</span>
                    </div>
                    <div className="w-full bg-neutral-200 rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-accent to-secondary h-3 rounded-full transition-all duration-500"
                        style={{ width: `${dataset.quality}%` }}
                      />
                    </div>
                  </div>

                  <p className="text-neutral-700 leading-relaxed mb-6">
                    {dataset.description}
                  </p>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-3">
                    <Button asChild className="bg-primary hover:bg-primary/90">
                      <Link href={`/discover/${params.id}/train`}>
                        <Brain className="w-4 h-4 mr-2" />
                        Train Model
                      </Link>
                    </Button>
                    <Button asChild variant="outline">
                      <Link href={`/discover/${params.id}/analytics`}>
                        <BarChart3 className="w-4 h-4 mr-2" />
                        Analytics
                      </Link>
                    </Button>
                    <Button variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      Download Sample
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Tabs defaultValue="sample" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="sample">Sample Data</TabsTrigger>
                  <TabsTrigger value="schema">Schema</TabsTrigger>
                  <TabsTrigger value="api">API Docs</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                </TabsList>

                <TabsContent value="sample" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>Sample Data Preview</span>
                        <Button variant="outline" size="sm">
                          <Copy className="w-4 h-4 mr-2" />
                          Copy
                        </Button>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {dataset.sampleData && dataset.sampleData.length > 0 ? (
                        <div className="overflow-x-auto">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="border-b border-neutral-200">
                                {Object.keys(dataset.sampleData[0]).map((key) => (
                                  <th key={key} className="text-left p-2 font-medium capitalize">
                                    {key.replace('_', ' ')}
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {dataset.sampleData.map((row: any, index: number) => (
                                <tr key={index} className="border-b border-neutral-100">
                                  {Object.values(row).map((value: any, i: number) => (
                                    <td key={i} className="p-2 font-mono">
                                      {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                                    </td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <Database className="w-12 h-12 text-neutral-400 mx-auto mb-4" />
                          <p className="text-neutral-600">No sample data available</p>
                          <p className="text-sm text-neutral-500">Sample data will be generated after purchase</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="schema" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Data Schema</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="p-4 bg-neutral-50 rounded-lg">
                          <h4 className="font-semibold mb-2">Files ({dataset.files.length})</h4>
                          <div className="space-y-2 text-sm">
                            {dataset.files.map((file: any, index: number) => (
                              <div key={index} className="flex justify-between">
                                <span className="font-mono">{file.name}</span>
                                <span className="text-neutral-600">{file.type.toUpperCase()}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="api" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>API Documentation</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold mb-2">Base URL</h4>
                          <div className="p-3 bg-neutral-900 text-green-400 rounded-lg font-mono text-sm">
                            https://api.fildata.io/v1/datasets/{dataset.id}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Authentication</h4>
                          <div className="p-3 bg-neutral-900 text-green-400 rounded-lg font-mono text-sm">
                            curl -H "Authorization: Bearer YOUR_API_KEY"
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="reviews" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Reviews & Ratings</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {dataset.reviews > 0 ? (
                        <div className="space-y-4">
                          <div className="flex items-center space-x-4 p-4 border border-neutral-200 rounded-lg">
                            <div className="flex items-center space-x-1">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-4 h-4 fill-secondary text-secondary" />
                              ))}
                            </div>
                            <div className="flex-1">
                              <p className="font-medium">Great dataset!</p>
                              <p className="text-sm text-neutral-600">Very useful for our research project.</p>
                              <p className="text-xs text-neutral-500 mt-1">by User123 • 1 day ago</p>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <Star className="w-12 h-12 text-neutral-400 mx-auto mb-4" />
                          <p className="text-neutral-600">No reviews yet</p>
                          <p className="text-sm text-neutral-500">Be the first to review this dataset</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Purchase Widget */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card className="border-2 border-primary/20 sticky top-8">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Coins className="w-5 h-5 text-secondary" />
                    <span>Rent Access</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Duration</label>
                    <Slider
                      value={accessDuration}
                      onValueChange={setAccessDuration}
                      max={12}
                      min={1}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-neutral-600 mt-1">
                      <span>1 month</span>
                      <span>{accessDuration[0]} month{accessDuration[0] > 1 ? 's' : ''}</span>
                      <span>12 months</span>
                    </div>
                  </div>

                  <div className="p-4 bg-neutral-50 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span>Subtotal:</span>
                      <span>{totalPrice} FIL</span>
                    </div>
                    <div className="flex justify-between items-center mb-2 text-sm text-neutral-600">
                      <span>Platform fee (2%):</span>
                      <span>{(totalPrice * 0.02).toFixed(2)} FIL</span>
                    </div>
                    <div className="border-t border-neutral-200 pt-2">
                      <div className="flex justify-between items-center font-semibold">
                        <span>Total:</span>
                        <span className="text-primary">{(totalPrice * 1.02).toFixed(2)} FIL</span>
                      </div>
                    </div>
                  </div>

                  <Button
                    className="w-full bg-primary hover:bg-primary/90"
                    onClick={() => setShowPurchaseModal(true)}
                  >
                    Rent Dataset Access
                  </Button>

                  <div className="text-xs text-neutral-600 text-center">
                    Secure payment via Filecoin network
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Dataset Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Dataset Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Created:</span>
                    <span>{dataset.created}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Last Updated:</span>
                    <span>{dataset.lastUpdated}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-600">License:</span>
                    <span>{dataset.license}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Format:</span>
                    <span>{dataset.format}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Coverage:</span>
                    <span>{dataset.coverage}</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
