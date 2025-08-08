'use client'

import { useState } from 'react'
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

// Mock dataset data
const DATASET = {
  id: '1',
  title: 'Global Climate Data 2024',
  description: 'Comprehensive climate measurements from 10,000+ weather stations worldwide, updated daily with temperature, humidity, and precipitation data. This dataset includes historical records dating back to 1950 and real-time updates from IoT sensors deployed across six continents.',
  provider: 'ClimateDAO',
  providerVerified: true,
  price: 45,
  rating: 4.8,
  reviews: 234,
  downloads: 12847,
  views: 45231,
  tags: ['Climate', 'Weather', 'IoT', 'Time Series', 'Real-time', 'Historical'],
  quality: 95,
  size: '2.3 TB',
  lastUpdated: '2 hours ago',
  created: 'March 15, 2024',
  license: 'CC BY 4.0',
  format: 'CSV, JSON, Parquet',
  updateFrequency: 'Daily',
  coverage: 'Global',
  sampleData: [
    { station_id: 'US001', timestamp: '2024-01-01T00:00:00Z', temperature: 15.2, humidity: 68, precipitation: 0.0 },
    { station_id: 'EU045', timestamp: '2024-01-01T00:00:00Z', temperature: 8.7, humidity: 82, precipitation: 2.3 },
    { station_id: 'AS123', timestamp: '2024-01-01T00:00:00Z', temperature: 28.1, humidity: 45, precipitation: 0.0 }
  ]
}

export default function DatasetDetailPage() {
  const params = useParams()
  const [selectedDuration, setSelectedDuration] = useState('1')
  const [accessDuration, setAccessDuration] = useState([1])
  const [showPurchaseModal, setShowPurchaseModal] = useState(false)

  const totalPrice = DATASET.price * accessDuration[0]

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
                        {DATASET.title}
                      </h1>
                      <div className="flex items-center space-x-4 text-sm text-neutral-600 mb-4">
                        <div className="flex items-center space-x-1">
                          <span>by</span>
                          <span className="font-medium text-primary">{DATASET.provider}</span>
                          {DATASET.providerVerified && (
                            <Shield className="w-4 h-4 text-green-600" />
                          )}
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 fill-secondary text-secondary" />
                          <span>{DATASET.rating}</span>
                          <span>({DATASET.reviews} reviews)</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary mb-1">
                        {DATASET.price} FIL
                      </div>
                      <div className="text-sm text-neutral-600">per month</div>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {DATASET.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="bg-neutral-100 text-neutral-700">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="text-center p-3 bg-neutral-50 rounded-lg">
                      <Eye className="w-5 h-5 text-neutral-600 mx-auto mb-1" />
                      <div className="font-semibold">{DATASET.views.toLocaleString()}</div>
                      <div className="text-xs text-neutral-600">Views</div>
                    </div>
                    <div className="text-center p-3 bg-neutral-50 rounded-lg">
                      <Download className="w-5 h-5 text-neutral-600 mx-auto mb-1" />
                      <div className="font-semibold">{DATASET.downloads.toLocaleString()}</div>
                      <div className="text-xs text-neutral-600">Downloads</div>
                    </div>
                    <div className="text-center p-3 bg-neutral-50 rounded-lg">
                      <Database className="w-5 h-5 text-neutral-600 mx-auto mb-1" />
                      <div className="font-semibold">{DATASET.size}</div>
                      <div className="text-xs text-neutral-600">Size</div>
                    </div>
                    <div className="text-center p-3 bg-neutral-50 rounded-lg">
                      <Calendar className="w-5 h-5 text-neutral-600 mx-auto mb-1" />
                      <div className="font-semibold">{DATASET.updateFrequency}</div>
                      <div className="text-xs text-neutral-600">Updates</div>
                    </div>
                  </div>

                  {/* Quality Score */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between text-sm text-neutral-600 mb-2">
                      <span>Quality Score</span>
                      <span className="font-semibold">{DATASET.quality}%</span>
                    </div>
                    <div className="w-full bg-neutral-200 rounded-full h-3">
                      <div 
                        className="bg-gradient-to-r from-accent to-secondary h-3 rounded-full transition-all duration-500"
                        style={{ width: `${DATASET.quality}%` }}
                      />
                    </div>
                  </div>

                  <p className="text-neutral-700 leading-relaxed mb-6">
                    {DATASET.description}
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
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b border-neutral-200">
                              <th className="text-left p-2 font-medium">Station ID</th>
                              <th className="text-left p-2 font-medium">Timestamp</th>
                              <th className="text-left p-2 font-medium">Temperature (°C)</th>
                              <th className="text-left p-2 font-medium">Humidity (%)</th>
                              <th className="text-left p-2 font-medium">Precipitation (mm)</th>
                            </tr>
                          </thead>
                          <tbody>
                            {DATASET.sampleData.map((row, index) => (
                              <tr key={index} className="border-b border-neutral-100">
                                <td className="p-2 font-mono">{row.station_id}</td>
                                <td className="p-2 font-mono">{row.timestamp}</td>
                                <td className="p-2">{row.temperature}</td>
                                <td className="p-2">{row.humidity}</td>
                                <td className="p-2">{row.precipitation}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
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
                          <h4 className="font-semibold mb-2">Fields (5)</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="font-mono">station_id</span>
                              <span className="text-neutral-600">string</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="font-mono">timestamp</span>
                              <span className="text-neutral-600">datetime</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="font-mono">temperature</span>
                              <span className="text-neutral-600">float</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="font-mono">humidity</span>
                              <span className="text-neutral-600">integer</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="font-mono">precipitation</span>
                              <span className="text-neutral-600">float</span>
                            </div>
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
                            https://api.fildata.io/v1/datasets/{DATASET.id}
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
                      <div className="space-y-4">
                        <div className="flex items-center space-x-4 p-4 border border-neutral-200 rounded-lg">
                          <div className="flex items-center space-x-1">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 fill-secondary text-secondary" />
                            ))}
                          </div>
                          <div className="flex-1">
                            <p className="font-medium">Excellent data quality</p>
                            <p className="text-sm text-neutral-600">Very comprehensive and well-structured climate data. Perfect for our ML models.</p>
                            <p className="text-xs text-neutral-500 mt-1">by DataScientist_42 • 2 days ago</p>
                          </div>
                        </div>
                      </div>
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
                    <span>{DATASET.created}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Last Updated:</span>
                    <span>{DATASET.lastUpdated}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-600">License:</span>
                    <span>{DATASET.license}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Format:</span>
                    <span>{DATASET.format}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Coverage:</span>
                    <span>{DATASET.coverage}</span>
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
