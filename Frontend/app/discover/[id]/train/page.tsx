'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Brain, Play, Pause, Settings, Download, Zap, Target, TrendingUp, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import Link from 'next/link'
import { useParams } from 'next/navigation'

const MODEL_TEMPLATES = [
  { id: 'regression', name: 'Linear Regression', description: 'Predict continuous values', icon: TrendingUp },
  { id: 'classification', name: 'Classification', description: 'Categorize data points', icon: Target },
  { id: 'clustering', name: 'Clustering', description: 'Find patterns in data', icon: Brain },
  { id: 'timeseries', name: 'Time Series', description: 'Forecast future values', icon: Zap }
]

export default function TrainModelPage() {
  const params = useParams()
  const [selectedModel, setSelectedModel] = useState('regression')
  const [isTraining, setIsTraining] = useState(false)
  const [trainingProgress, setTrainingProgress] = useState(0)
  const [learningRate, setLearningRate] = useState([0.01])
  const [epochs, setEpochs] = useState([100])

  const startTraining = () => {
    setIsTraining(true)
    setTrainingProgress(0)
    
    // Simulate training progress
    const interval = setInterval(() => {
      setTrainingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsTraining(false)
          return 100
        }
        return prev + Math.random() * 10
      })
    }, 500)
  }

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
                Train ML Model
              </h1>
              <p className="text-neutral-600">
                Build and train machine learning models using Global Climate Data 2024
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline">
                <Settings className="w-4 h-4 mr-2" />
                Advanced Settings
              </Button>
              <Button 
                className="bg-primary hover:bg-primary/90"
                onClick={startTraining}
                disabled={isTraining}
              >
                {isTraining ? (
                  <>
                    <Pause className="w-4 h-4 mr-2" />
                    Training...
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 mr-2" />
                    Start Training
                  </>
                )}
              </Button>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Model Selection */}
          <div className="lg:col-span-2 space-y-6">
            {/* Model Templates */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Choose Model Type</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {MODEL_TEMPLATES.map((model) => {
                      const ModelIcon = model.icon
                      return (
                        <div
                          key={model.id}
                          className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-300 ${
                            selectedModel === model.id
                              ? 'border-primary bg-primary/5'
                              : 'border-neutral-200 hover:border-primary/30'
                          }`}
                          onClick={() => setSelectedModel(model.id)}
                        >
                          <div className="flex items-center space-x-3 mb-2">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                              selectedModel === model.id ? 'bg-primary text-white' : 'bg-neutral-100 text-neutral-600'
                            }`}>
                              <ModelIcon className="w-5 h-5" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-neutral-900">{model.name}</h3>
                              <p className="text-sm text-neutral-600">{model.description}</p>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Training Configuration */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Tabs defaultValue="config" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="config">Configuration</TabsTrigger>
                  <TabsTrigger value="features">Features</TabsTrigger>
                  <TabsTrigger value="validation">Validation</TabsTrigger>
                </TabsList>

                <TabsContent value="config" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Model Parameters</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="target">Target Variable</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select target" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="temperature">Temperature</SelectItem>
                              <SelectItem value="humidity">Humidity</SelectItem>
                              <SelectItem value="precipitation">Precipitation</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="algorithm">Algorithm</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select algorithm" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="linear">Linear Regression</SelectItem>
                              <SelectItem value="ridge">Ridge Regression</SelectItem>
                              <SelectItem value="lasso">Lasso Regression</SelectItem>
                              <SelectItem value="random_forest">Random Forest</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div>
                        <Label>Learning Rate: {learningRate[0]}</Label>
                        <Slider
                          value={learningRate}
                          onValueChange={setLearningRate}
                          max={1}
                          min={0.001}
                          step={0.001}
                          className="mt-2"
                        />
                      </div>

                      <div>
                        <Label>Epochs: {epochs[0]}</Label>
                        <Slider
                          value={epochs}
                          onValueChange={setEpochs}
                          max={1000}
                          min={10}
                          step={10}
                          className="mt-2"
                        />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="features" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Feature Selection</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {['temperature', 'humidity', 'precipitation', 'wind_speed', 'pressure'].map((feature) => (
                          <div key={feature} className="flex items-center justify-between p-3 border border-neutral-200 rounded-lg">
                            <div className="flex items-center space-x-3">
                              <input type="checkbox" defaultChecked className="rounded" />
                              <span className="font-medium capitalize">{feature.replace('_', ' ')}</span>
                            </div>
                            <Badge variant="secondary">Numeric</Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="validation" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Validation Strategy</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <Label>Train/Test Split</Label>
                          <div className="flex items-center space-x-4 mt-2">
                            <span className="text-sm">Train: 80%</span>
                            <div className="flex-1 bg-neutral-200 rounded-full h-2">
                              <div className="bg-primary h-2 rounded-full" style={{ width: '80%' }} />
                            </div>
                            <span className="text-sm">Test: 20%</span>
                          </div>
                        </div>
                        <div>
                          <Label>Cross Validation</Label>
                          <Select>
                            <SelectTrigger className="mt-2">
                              <SelectValue placeholder="Select CV method" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="kfold">K-Fold (5)</SelectItem>
                              <SelectItem value="stratified">Stratified K-Fold</SelectItem>
                              <SelectItem value="time_series">Time Series Split</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </motion.div>
          </div>

          {/* Training Status */}
          <div className="space-y-6">
            {/* Training Progress */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Brain className="w-5 h-5 text-primary" />
                    <span>Training Status</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {isTraining || trainingProgress > 0 ? (
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Progress</span>
                          <span>{Math.round(trainingProgress)}%</span>
                        </div>
                        <Progress value={trainingProgress} className="h-2" />
                      </div>
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Epoch:</span>
                          <span>{Math.round(trainingProgress * epochs[0] / 100)}/{epochs[0]}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Loss:</span>
                          <span>{(0.5 - trainingProgress * 0.004).toFixed(4)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Accuracy:</span>
                          <span>{(60 + trainingProgress * 0.3).toFixed(1)}%</span>
                        </div>
                      </div>

                      {trainingProgress >= 100 && (
                        <div className="flex items-center space-x-2 text-green-600">
                          <CheckCircle className="w-4 h-4" />
                          <span className="text-sm font-medium">Training Complete!</span>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Brain className="w-12 h-12 text-neutral-400 mx-auto mb-4" />
                      <p className="text-neutral-600">Ready to start training</p>
                      <p className="text-sm text-neutral-500">Configure your model and click Start Training</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Model Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Model Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Type:</span>
                    <span className="capitalize">{selectedModel.replace('_', ' ')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Dataset Size:</span>
                    <span>2.4M records</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Features:</span>
                    <span>5 selected</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Est. Training Time:</span>
                    <span>~15 minutes</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Actions */}
            {trainingProgress >= 100 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Model Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button className="w-full bg-primary hover:bg-primary/90">
                      <Download className="w-4 h-4 mr-2" />
                      Download Model
                    </Button>
                    <Button variant="outline" className="w-full">
                      Deploy to API
                    </Button>
                    <Button variant="outline" className="w-full">
                      View Predictions
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
