'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Upload, FileText, DollarSign, Zap, CheckCircle, ArrowRight, ArrowLeft, Database, Shield, Globe } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'

const STEPS = [
  { id: 1, title: 'Upload & Preview', icon: Upload },
  { id: 2, title: 'License & Pricing', icon: DollarSign },
  { id: 3, title: 'AI-Metadata Review', icon: Zap },
  { id: 4, title: 'Confirm & Launch', icon: CheckCircle }
]

const DOMAINS = [
  'Machine Learning', 'Finance', 'Healthcare', 'Climate', 'Social Media', 
  'IoT Sensors', 'Genomics', 'Transportation', 'Energy', 'Agriculture'
]

const FILE_TYPES = ['CSV', 'JSON', 'Parquet', 'Images', 'Video', 'Audio', 'Text', 'Binary']

export default function PublishPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    domain: '',
    fileType: '',
    price: '',
    license: '',
    tags: [] as string[],
    isPublic: true
  })

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1)
  }

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  const addTag = (tag: string) => {
    if (!formData.tags.includes(tag)) {
      setFormData({ ...formData, tags: [...formData.tags, tag] })
    }
  }

  const removeTag = (tag: string) => {
    setFormData({ ...formData, tags: formData.tags.filter(t => t !== tag) })
  }

  const getCurrentStepIcon = () => {
    const CurrentIcon = STEPS[currentStep - 1].icon
    return <CurrentIcon className="w-6 h-6 text-primary" />
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-neutral-900 mb-4">
            Publish Your Dataset
          </h1>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            Share your data with the world and earn FIL tokens. Our AI will help optimize 
            your dataset for maximum discoverability and value.
          </p>
        </motion.div>

        {/* Progress Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex items-center justify-between">
            {STEPS.map((step, index) => {
              const StepIcon = step.icon
              return (
                <div key={step.id} className="flex items-center">
                  <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300 ${
                    currentStep >= step.id 
                      ? 'bg-primary border-primary text-white' 
                      : 'border-neutral-300 text-neutral-400'
                  }`}>
                    <StepIcon className="w-5 h-5" />
                  </div>
                  <div className="ml-3 hidden sm:block">
                    <p className={`text-sm font-medium ${
                      currentStep >= step.id ? 'text-primary' : 'text-neutral-400'
                    }`}>
                      Step {step.id}
                    </p>
                    <p className={`text-xs ${
                      currentStep >= step.id ? 'text-neutral-900' : 'text-neutral-500'
                    }`}>
                      {step.title}
                    </p>
                  </div>
                  {index < STEPS.length - 1 && (
                    <div className={`w-16 h-0.5 mx-4 ${
                      currentStep > step.id ? 'bg-primary' : 'bg-neutral-300'
                    }`} />
                  )}
                </div>
              )
            })}
          </div>
        </motion.div>

        {/* Step Content */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Card className="border-2 border-neutral-100">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                {getCurrentStepIcon()}
                <span>{STEPS[currentStep - 1].title}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              
              {/* Step 1: Upload & Preview */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div className="border-2 border-dashed border-neutral-300 rounded-lg p-12 text-center hover:border-primary/50 transition-colors cursor-pointer">
                    <Upload className="w-12 h-12 text-neutral-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                      Drop your files here or click to browse
                    </h3>
                    <p className="text-neutral-600 mb-4">
                      Supports CSV, JSON, Parquet, Images, and more. Max file size: 10GB
                    </p>
                    <Button className="bg-primary hover:bg-primary/90">
                      Choose Files
                    </Button>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="title">Dataset Title</Label>
                      <Input
                        id="title"
                        placeholder="e.g., Global Climate Data 2024"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="domain">Domain</Label>
                      <Select value={formData.domain} onValueChange={(value) => setFormData({ ...formData, domain: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select domain" />
                        </SelectTrigger>
                        <SelectContent>
                          {DOMAINS.map((domain) => (
                            <SelectItem key={domain} value={domain}>{domain}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe your dataset, its sources, and potential use cases..."
                      rows={4}
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                  </div>
                </div>
              )}

              {/* Step 2: License & Pricing */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="price">Price (FIL/month)</Label>
                      <Input
                        id="price"
                        type="number"
                        placeholder="0.00"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      />
                      <p className="text-sm text-neutral-600 mt-1">
                        Set to 0 for free datasets
                      </p>
                    </div>
                    <div>
                      <Label htmlFor="license">License Type</Label>
                      <Select value={formData.license} onValueChange={(value) => setFormData({ ...formData, license: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select license" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="mit">MIT License</SelectItem>
                          <SelectItem value="apache">Apache 2.0</SelectItem>
                          <SelectItem value="cc0">CC0 Public Domain</SelectItem>
                          <SelectItem value="cc-by">CC BY 4.0</SelectItem>
                          <SelectItem value="commercial">Commercial License</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label>Tags</Label>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {formData.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="cursor-pointer" onClick={() => removeTag(tag)}>
                          {tag} ×
                        </Badge>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {DOMAINS.filter(d => !formData.tags.includes(d)).slice(0, 6).map((domain) => (
                        <Button
                          key={domain}
                          variant="outline"
                          size="sm"
                          onClick={() => addTag(domain)}
                        >
                          + {domain}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="public"
                      checked={formData.isPublic}
                      onCheckedChange={(checked) => setFormData({ ...formData, isPublic: !!checked })}
                    />
                    <Label htmlFor="public">Make dataset publicly discoverable</Label>
                  </div>
                </div>
              )}

              {/* Step 3: AI-Metadata Review */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <Zap className="w-6 h-6 text-primary" />
                      <h3 className="text-lg font-semibold">AI Analysis Complete</h3>
                    </div>
                    <p className="text-neutral-700 mb-4">
                      Our AI has analyzed your dataset and generated optimized metadata to improve discoverability.
                    </p>
                    
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="bg-white rounded-lg p-4">
                        <div className="text-2xl font-bold text-primary mb-1">95%</div>
                        <div className="text-sm text-neutral-600">Quality Score</div>
                      </div>
                      <div className="bg-white rounded-lg p-4">
                        <div className="text-2xl font-bold text-accent mb-1">12</div>
                        <div className="text-sm text-neutral-600">Auto Tags</div>
                      </div>
                      <div className="bg-white rounded-lg p-4">
                        <div className="text-2xl font-bold text-secondary mb-1">8.5</div>
                        <div className="text-sm text-neutral-600">Market Score</div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">Suggested Improvements</h4>
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                        <div>
                          <p className="font-medium text-green-900">Data format is optimal</p>
                          <p className="text-sm text-green-700">Your CSV structure follows best practices</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg">
                        <Zap className="w-5 h-5 text-yellow-600 mt-0.5" />
                        <div>
                          <p className="font-medium text-yellow-900">Consider adding more tags</p>
                          <p className="text-sm text-yellow-700">Adding "time-series" and "weather" tags could increase visibility by 23%</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Confirm & Launch */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-primary to-accent text-white rounded-lg p-6">
                    <h3 className="text-xl font-semibold mb-2">Ready to Launch!</h3>
                    <p className="text-white/90">
                      Your dataset will be stored on Filecoin and made available through IPFS for global access.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <Card>
                      <CardContent className="p-4">
                        <h4 className="font-semibold mb-3">Dataset Summary</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-neutral-600">Title:</span>
                            <span>{formData.title || 'Untitled Dataset'}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-neutral-600">Domain:</span>
                            <span>{formData.domain || 'Not specified'}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-neutral-600">Price:</span>
                            <span>{formData.price || '0'} FIL/month</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-neutral-600">License:</span>
                            <span>{formData.license || 'Not specified'}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <h4 className="font-semibold mb-3">Estimated Earnings</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-neutral-600">Monthly Revenue:</span>
                            <span className="font-semibold">{(parseFloat(formData.price || '0') * 10).toFixed(2)} FIL</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-neutral-600">Platform Fee (5%):</span>
                            <span>-{(parseFloat(formData.price || '0') * 10 * 0.05).toFixed(2)} FIL</span>
                          </div>
                          <div className="flex justify-between font-semibold">
                            <span>Net Earnings:</span>
                            <span className="text-primary">{(parseFloat(formData.price || '0') * 10 * 0.95).toFixed(2)} FIL</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="text-center">
                    <Button size="lg" className="bg-primary hover:bg-primary/90 px-8">
                      <Database className="w-5 h-5 mr-2" />
                      Launch Dataset
                    </Button>
                    <p className="text-sm text-neutral-600 mt-2">
                      By launching, you agree to our Terms of Service and Data Policy
                    </p>
                  </div>
                </div>
              )}

              {/* Navigation */}
              <div className="flex justify-between pt-6 border-t border-neutral-200">
                <Button
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className="flex items-center space-x-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Previous</span>
                </Button>

                {currentStep < 4 ? (
                  <Button
                    onClick={nextStep}
                    className="bg-primary hover:bg-primary/90 flex items-center space-x-2"
                  >
                    <span>Next</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                ) : null}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
