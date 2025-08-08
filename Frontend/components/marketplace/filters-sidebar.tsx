'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Filter, X, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Slider } from '@/components/ui/slider'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'

const DOMAINS = [
  'Machine Learning',
  'Finance',
  'Healthcare', 
  'Climate',
  'Social Media',
  'IoT Sensors',
  'Genomics',
  'Transportation'
]

const FILE_TYPES = [
  'CSV',
  'JSON', 
  'Parquet',
  'Images',
  'Video',
  'Audio',
  'Text',
  'Binary'
]

export function FiltersSidebar() {
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [qualityRange, setQualityRange] = useState([70, 100])
  const [selectedDomains, setSelectedDomains] = useState<string[]>([])
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])

  return (
    <motion.div
      initial={{ x: -300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-80 space-y-6"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-neutral-900">Filters</h2>
        <Button variant="ghost" size="sm">
          <X className="w-4 h-4" />
          Clear All
        </Button>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <Label htmlFor="search" className="text-sm font-medium mb-2 block">
            Search Datasets
          </Label>
          <Input 
            id="search"
            placeholder="Enter keywords..."
            className="w-full"
          />
        </CardContent>
      </Card>

      {/* Price Range */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Price Range (FIL/month)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Slider
            value={priceRange}
            onValueChange={setPriceRange}
            max={1000}
            step={10}
            className="w-full"
          />
          <div className="flex items-center justify-between text-sm text-neutral-600">
            <span>{priceRange[0]} FIL</span>
            <span>{priceRange[1]} FIL</span>
          </div>
        </CardContent>
      </Card>

      {/* Quality Score */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Quality Score</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Slider
            value={qualityRange}
            onValueChange={setQualityRange}
            max={100}
            step={5}
            className="w-full"
          />
          <div className="flex items-center justify-between text-sm text-neutral-600">
            <span>{qualityRange[0]}%</span>
            <span>{qualityRange[1]}%</span>
          </div>
        </CardContent>
      </Card>

      {/* Domains */}
      <Card>
        <Collapsible defaultOpen>
          <CollapsibleTrigger asChild>
            <CardHeader className="pb-3 cursor-pointer hover:bg-neutral-50">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm">Domain</CardTitle>
                <ChevronDown className="w-4 h-4" />
              </div>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent className="space-y-3 max-h-48 overflow-y-auto">
              {DOMAINS.map((domain) => (
                <div key={domain} className="flex items-center space-x-2">
                  <Checkbox 
                    id={domain}
                    checked={selectedDomains.includes(domain)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedDomains([...selectedDomains, domain])
                      } else {
                        setSelectedDomains(selectedDomains.filter(d => d !== domain))
                      }
                    }}
                  />
                  <Label htmlFor={domain} className="text-sm cursor-pointer">
                    {domain}
                  </Label>
                </div>
              ))}
            </CardContent>
          </CollapsibleContent>
        </Collapsible>
      </Card>

      {/* File Types */}
      <Card>
        <Collapsible defaultOpen>
          <CollapsibleTrigger asChild>
            <CardHeader className="pb-3 cursor-pointer hover:bg-neutral-50">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm">File Type</CardTitle>
                <ChevronDown className="w-4 h-4" />
              </div>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent className="space-y-3">
              {FILE_TYPES.map((type) => (
                <div key={type} className="flex items-center space-x-2">
                  <Checkbox 
                    id={type}
                    checked={selectedTypes.includes(type)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedTypes([...selectedTypes, type])
                      } else {
                        setSelectedTypes(selectedTypes.filter(t => t !== type))
                      }
                    }}
                  />
                  <Label htmlFor={type} className="text-sm cursor-pointer">
                    {type}
                  </Label>
                </div>
              ))}
            </CardContent>
          </CollapsibleContent>
        </Collapsible>
      </Card>
    </motion.div>
  )
}
