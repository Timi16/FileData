'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, TrendingUp, BarChart3, PieChart, LineChart, Download, Play, Settings, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { useParams } from 'next/navigation'

export default function AnalyticsPage() {
  const params = useParams()
  const [selectedMetric, setSelectedMetric] = useState('temperature')
  const [timeRange, setTimeRange] = useState('7d')

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
            <Link href={`/discover/${params.id}`}>
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Dataset</span>
            </Link>
          </Button>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-neutral-900 mb-2">
                Dataset Analytics
              </h1>
              <p className="text-neutral-600">
                Analyze patterns and insights from Global Climate Data 2024
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="24h">Last 24h</SelectItem>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                  <SelectItem value="90d">Last 90 days</SelectItem>
                </SelectContent>
              </Select>
              <Button className="bg-primary hover:bg-primary/90">
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-neutral-600">Avg Temperature</p>
                  <p className="text-2xl font-bold text-primary">18.4°C</p>
                  <p className="text-xs text-green-600">+2.1% from last week</p>
                </div>
                <TrendingUp className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-neutral-600">Data Points</p>
                  <p className="text-2xl font-bold text-accent">2.4M</p>
                  <p className="text-xs text-green-600">+15.2% this month</p>
                </div>
                <BarChart3 className="w-8 h-8 text-accent" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-neutral-600">Active Stations</p>
                  <p className="text-2xl font-bold text-secondary">8,947</p>
                  <p className="text-xs text-red-600">-0.8% from yesterday</p>
                </div>
                <PieChart className="w-8 h-8 text-secondary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-neutral-600">Anomalies</p>
                  <p className="text-2xl font-bold text-red-600">23</p>
                  <p className="text-xs text-neutral-600">Detected today</p>
                </div>
                <Zap className="w-8 h-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Main Analytics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Tabs defaultValue="trends" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="trends">Trends</TabsTrigger>
              <TabsTrigger value="patterns">Patterns</TabsTrigger>
              <TabsTrigger value="correlations">Correlations</TabsTrigger>
              <TabsTrigger value="predictions">Predictions</TabsTrigger>
            </TabsList>

            <TabsContent value="trends" className="mt-6">
              <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>Temperature Trends</span>
                        <Select value={selectedMetric} onValueChange={setSelectedMetric}>
                          <SelectTrigger className="w-40">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="temperature">Temperature</SelectItem>
                            <SelectItem value="humidity">Humidity</SelectItem>
                            <SelectItem value="precipitation">Precipitation</SelectItem>
                          </SelectContent>
                        </Select>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-80 bg-gradient-to-br from-primary/5 to-accent/5 rounded-lg flex items-center justify-center">
                        <div className="text-center">
                          <LineChart className="w-16 h-16 text-primary mx-auto mb-4" />
                          <p className="text-neutral-600">Interactive chart would render here</p>
                          <p className="text-sm text-neutral-500">Showing {selectedMetric} over {timeRange}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Top Regions</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">North America</span>
                          <Badge variant="secondary">34.2%</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Europe</span>
                          <Badge variant="secondary">28.7%</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Asia</span>
                          <Badge variant="secondary">22.1%</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Others</span>
                          <Badge variant="secondary">15.0%</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Data Quality</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Completeness</span>
                            <span>98.2%</span>
                          </div>
                          <div className="w-full bg-neutral-200 rounded-full h-2">
                            <div className="bg-green-500 h-2 rounded-full" style={{ width: '98.2%' }} />
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Accuracy</span>
                            <span>95.7%</span>
                          </div>
                          <div className="w-full bg-neutral-200 rounded-full h-2">
                            <div className="bg-blue-500 h-2 rounded-full" style={{ width: '95.7%' }} />
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Consistency</span>
                            <span>92.4%</span>
                          </div>
                          <div className="w-full bg-neutral-200 rounded-full h-2">
                            <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '92.4%' }} />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="patterns" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Seasonal Patterns</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-96 bg-gradient-to-br from-secondary/5 to-accent/5 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <PieChart className="w-16 h-16 text-secondary mx-auto mb-4" />
                      <p className="text-neutral-600">Pattern analysis visualization</p>
                      <p className="text-sm text-neutral-500">Seasonal trends and cyclical patterns</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="correlations" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Variable Correlations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-96 bg-gradient-to-br from-accent/5 to-primary/5 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <BarChart3 className="w-16 h-16 text-accent mx-auto mb-4" />
                      <p className="text-neutral-600">Correlation matrix visualization</p>
                      <p className="text-sm text-neutral-500">Relationships between temperature, humidity, and precipitation</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="predictions" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Predictive Models</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-96 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <TrendingUp className="w-16 h-16 text-primary mx-auto mb-4" />
                      <p className="text-neutral-600">ML model predictions</p>
                      <p className="text-sm text-neutral-500">Future climate trends and forecasts</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  )
}
