'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Upload, FileText, DollarSign, Zap, CheckCircle, ArrowRight, ArrowLeft, Database, Shield, Globe, X, File } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { useDatasetStore } from '@/lib/store'
import { toast } from 'sonner'
import { PinataSDK } from "pinata"
import { ethers } from "ethers"

// Pinata configuration - In production, use environment variables
const pinata = new PinataSDK({
  pinataJwt: process.env.JWT || "",
  pinataGateway: "jade-obvious-goose-24.mypinata.cloud"
})

// Contract configuration
const registryAddress = "0x9D7f74d0C41E726EC95884E0e97Fa6129e3b5E99"
const registryABI = [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "datasetId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "cid",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "metadataCid",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "provider",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "price",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "timestamp",
        "type": "uint256"
      }
    ],
    "name": "DatasetPublished",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "datasetCount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "datasets",
    "outputs": [
      {
        "internalType": "string",
        "name": "cid",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "metadataCid",
        "type": "string"
      },
      {
        "internalType": "address",
        "name": "provider",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "price",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "isActive",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_datasetId",
        "type": "uint256"
      }
    ],
    "name": "getDataset",
    "outputs": [
      {
        "internalType": "string",
        "name": "cid",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "metadataCid",
        "type": "string"
      },
      {
        "internalType": "address",
        "name": "provider",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "price",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "isActive",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_cid",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_metadataCid",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "_price",
        "type": "uint256"
      }
    ],
    "name": "publishDataset",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]

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

interface UploadedFile {
  file: File
  id: string
  progress: number
  status: 'uploading' | 'completed' | 'error'
  ipfsHash?: string
}

export default function PublishPage() {
  const router = useRouter()
  const { addDataset } = useDatasetStore()
  const [currentStep, setCurrentStep] = useState(1)
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const [isLaunching, setIsLaunching] = useState(false)
  const [launchProgress, setLaunchProgress] = useState(0)
  const [launchStatus, setLaunchStatus] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

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

    const handlePinataUpload = async (file: File): Promise<string> => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    // Call your Next.js API route instead of Pinata directly
    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `Upload failed: ${response.statusText}`);
    }

    const result = await response.json();
    console.log("Upload successful:", result);

    return result.ipfsHash;
  } catch (error) {
    console.error("Error uploading to Pinata:", error);
    throw new Error("Failed to upload file to IPFS");
  }
};


  const handleFileSelect = (files: FileList | null) => {
    if (!files) return

    Array.from(files).forEach(async (file) => {
      const fileId = Math.random().toString(36).substr(2, 9)
      const newFile: UploadedFile = {
        file,
        id: fileId,
        progress: 0,
        status: 'uploading'
      }

      setUploadedFiles(prev => [...prev, newFile])

      try {
        // Upload to IPFS via Pinata
        const ipfsHash = await handlePinataUpload(file)

        // Update file with IPFS hash and completion status
        setUploadedFiles(prev => prev.map(f =>
          f.id === fileId
            ? { ...f, progress: 100, status: 'completed', ipfsHash }
            : f
        ))
      } catch (error) {
        setUploadedFiles(prev => prev.map(f =>
          f.id === fileId
            ? { ...f, status: 'error' }
            : f
        ))
        toast.error(`Failed to upload ${file.name}`)
      }
    })
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    handleFileSelect(e.dataTransfer.files)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const removeFile = (fileId: string) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== fileId))
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const getFileIcon = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase()
    switch (extension) {
      case 'csv':
      case 'json':
      case 'xml':
        return '📊'
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
        return '🖼️'
      case 'mp4':
      case 'avi':
      case 'mov':
        return '🎥'
      case 'mp3':
      case 'wav':
        return '🎵'
      case 'pdf':
        return '📄'
      case 'txt':
        return '📝'
      default:
        return '📁'
    }
  }

  const getFileFormat = () => {
    const extensions = uploadedFiles.map(f => {
      const ext = f.file.name.split('.').pop()?.toUpperCase()
      return ext
    }).filter(Boolean)
    return [...new Set(extensions)].join(', ')
  }

  const getTotalSize = () => {
    return formatFileSize(uploadedFiles.reduce((acc, f) => acc + f.file.size, 0))
  }

  const generateSampleData = () => {
    const csvFiles = uploadedFiles.filter(f => f.file.name.endsWith('.csv'))
    if (csvFiles.length > 0) {
      return [
        { id: 1, timestamp: '2024-01-01T00:00:00Z', value: Math.random() * 100, category: 'A' },
        { id: 2, timestamp: '2024-01-01T01:00:00Z', value: Math.random() * 100, category: 'B' },
        { id: 3, timestamp: '2024-01-01T02:00:00Z', value: Math.random() * 100, category: 'C' }
      ]
    }
    return []
  }

  const handleLaunchDataset = async () => {
    if (uploadedFiles.length === 0) {
      toast.error('Please upload at least one file')
      return
    }

    const completedFiles = uploadedFiles.filter(f => f.status === 'completed')
    if (completedFiles.length === 0) {
      toast.error('Please wait for files to finish uploading')
      return
    }

    setIsLaunching(true)
    setLaunchProgress(0)

    try {
      // Check if MetaMask is available
      if (!window.ethereum) {
        throw new Error('MetaMask is not installed. Please install MetaMask to continue.')
      }

      setLaunchStatus('Connecting to wallet...')
      setLaunchProgress(10)

      // Request account access
      await window.ethereum.request({ method: 'eth_requestAccounts' })

      const provider = new ethers.BrowserProvider(window.ethereum)
      const signer = await provider.getSigner()

      setLaunchStatus('Uploading metadata to IPFS...')
      setLaunchProgress(30)

      // Create metadata object
      const metadata = {
        title: formData.title || 'Untitled Dataset',
        description: formData.description || 'No description provided',
        domain: formData.domain || 'General',
        fileType: formData.fileType || getFileFormat(),
        tags: formData.tags,
        license: formData.license || 'Not specified',
        files: completedFiles.map(f => ({
          name: f.file.name,
          size: f.file.size,
          type: f.file.name.split('.').pop()?.toLowerCase() || 'unknown',
          ipfsHash: f.ipfsHash
        })),
        createdAt: new Date().toISOString(),
        totalSize: getTotalSize()
      }

      // Upload metadata to IPFS
      const metadataCid = await handlePinJSONToIPFS(metadata)

      setLaunchStatus('Preparing blockchain transaction...')
      setLaunchProgress(50)

      // Use the first file's IPFS hash as the main dataset CID
      const fileCid = completedFiles[0].ipfsHash!
      const priceInWei = ethers.parseEther(formData.price || "0")

      setLaunchStatus('Publishing to blockchain...')
      setLaunchProgress(70)

      // Create contract instance
      const contract = new ethers.Contract(registryAddress, registryABI, signer)

      // Publish dataset to blockchain
      const tx = await contract.publishDataset(fileCid, metadataCid, priceInWei)

      setLaunchStatus('Waiting for confirmation...')
      setLaunchProgress(85)

      // Wait for transaction confirmation
      const receipt = await tx.wait()

      setLaunchStatus('Finalizing...')
      setLaunchProgress(95)

      // Get the dataset count to determine the new dataset ID
      const datasetCount = await contract.datasetCount()
      const newDatasetId = datasetCount.toNumber()

      // Add to local store for immediate UI update
      const localDatasetId = addDataset({
        title: formData.title || 'Untitled Dataset',
        description: formData.description || 'No description provided',
        provider: 'You',
        price: parseFloat(formData.price) || 0,
        tags: formData.tags,
        quality: Math.floor(Math.random() * 20) + 80,
        size: getTotalSize(),
        license: formData.license || 'Not specified',
        format: getFileFormat(),
        updateFrequency: 'Manual',
        coverage: 'Custom',
        domain: formData.domain || 'General',
        files: completedFiles.map(f => ({
          name: f.file.name,
          size: f.file.size,
          type: f.file.name.split('.').pop()?.toLowerCase() || 'unknown'
        })),
        sampleData: generateSampleData(),
        providerVerified: false,
        metadataHash: metadataCid,
        blockchainId: newDatasetId
      })

      setLaunchProgress(100)
      setLaunchStatus('Complete!')

      toast.success('Dataset published successfully!', {
        description: `Transaction hash: ${receipt.transactionHash.slice(0, 10)}...`
      })

      // Redirect to the new dataset page
      setTimeout(() => {
        router.push(`/discover/${localDatasetId}`)
      }, 1000)

    } catch (error: any) {
      console.error('Error publishing dataset:', error)

      let errorMessage = 'Failed to publish dataset'
      if (error.message.includes('MetaMask')) {
        errorMessage = error.message
      } else if (error.code === 4001) {
        errorMessage = 'Transaction was rejected by user'
      } else if (error.message.includes('insufficient funds')) {
        errorMessage = 'Insufficient funds for transaction'
      }

      toast.error(errorMessage)
    } finally {
      setIsLaunching(false)
      setLaunchProgress(0)
      setLaunchStatus('')
    }
  }

  const handlePinJSONToIPFS = async (jsonData: object): Promise<string> => {
    try {
      const response = await fetch("/api/upload-json", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(jsonData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `JSON upload failed: ${response.statusText}`);
      }

      const result = await response.json();
      return result.ipfsHash;
    } catch (error) {
      console.error("Error uploading JSON to Pinata:", error);
      throw new Error("Failed to upload JSON to IPFS");
    }
  };

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
            Share your data with the world and earn FIL tokens. Your files will be stored on IPFS
            and registered on the Filecoin blockchain for permanent, decentralized access.
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
                  {/* File Upload Area */}
                  <div
                    className={`border-2 border-dashed rounded-lg p-12 text-center transition-all duration-300 cursor-pointer ${
                      isDragging
                        ? 'border-primary bg-primary/5'
                        : 'border-neutral-300 hover:border-primary/50'
                    }`}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className={`w-12 h-12 mx-auto mb-4 ${
                      isDragging ? 'text-primary' : 'text-neutral-400'
                    }`} />
                    <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                      {isDragging ? 'Drop your files here' : 'Drop your files here or click to browse'}
                    </h3>
                    <p className="text-neutral-600 mb-4">
                      Files will be uploaded to IPFS automatically. Supports CSV, JSON, Parquet, Images, and more.
                    </p>
                    <Button className="bg-primary hover:bg-primary/90">
                      Choose Files
                    </Button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      className="hidden"
                      onChange={(e) => handleFileSelect(e.target.files)}
                      accept=".csv,.json,.parquet,.jpg,.jpeg,.png,.gif,.mp4,.avi,.mov,.mp3,.wav,.pdf,.txt,.xml"
                    />
                  </div>

                  {/* Uploaded Files List */}
                  {uploadedFiles.length > 0 && (
                    <div className="space-y-3">
                      <h4 className="font-semibold text-neutral-900">Uploaded Files ({uploadedFiles.length})</h4>
                      <div className="space-y-2 max-h-60 overflow-y-auto">
                        {uploadedFiles.map((uploadedFile) => (
                          <div key={uploadedFile.id} className="flex items-center space-x-3 p-3 bg-white border border-neutral-200 rounded-lg">
                            <div className="text-2xl">{getFileIcon(uploadedFile.file.name)}</div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between mb-1">
                                <p className="text-sm font-medium text-neutral-900 truncate">
                                  {uploadedFile.file.name}
                                </p>
                                <div className="flex items-center space-x-2">
                                  <span className="text-xs text-neutral-500">
                                    {formatFileSize(uploadedFile.file.size)}
                                  </span>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => removeFile(uploadedFile.id)}
                                    className="h-6 w-6 p-0 hover:bg-red-100 hover:text-red-600"
                                  >
                                    <X className="w-3 h-3" />
                                  </Button>
                                </div>
                              </div>
                              {uploadedFile.status === 'uploading' && (
                                <div className="space-y-1">
                                  <Progress value={uploadedFile.progress} className="h-1" />
                                  <p className="text-xs text-neutral-500">
                                    Uploading to IPFS... {Math.round(uploadedFile.progress)}%
                                  </p>
                                </div>
                              )}
                              {uploadedFile.status === 'completed' && (
                                <div className="space-y-1">
                                  <div className="flex items-center space-x-1">
                                    <CheckCircle className="w-3 h-3 text-green-600" />
                                    <p className="text-xs text-green-600">Uploaded to IPFS</p>
                                  </div>
                                  {uploadedFile.ipfsHash && (
                                    <p className="text-xs text-neutral-500 font-mono">
                                      IPFS: {uploadedFile.ipfsHash.slice(0, 20)}...
                                    </p>
                                  )}
                                </div>
                              )}
                              {uploadedFile.status === 'error' && (
                                <p className="text-xs text-red-600">Upload failed</p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

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
                      <h3 className="text-lg font-semibold">IPFS Upload Complete</h3>
                    </div>
                    <p className="text-neutral-700 mb-4">
                      Your {uploadedFiles.filter(f => f.status === 'completed').length} file{uploadedFiles.filter(f => f.status === 'completed').length !== 1 ? 's have' : ' has'} been successfully uploaded to IPFS and are ready for blockchain publication.
                    </p>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="bg-white rounded-lg p-4">
                        <div className="text-2xl font-bold text-primary mb-1">
                          {uploadedFiles.filter(f => f.status === 'completed').length}
                        </div>
                        <div className="text-sm text-neutral-600">Files on IPFS</div>
                      </div>
                      <div className="bg-white rounded-lg p-4">
                        <div className="text-2xl font-bold text-accent mb-1">{getTotalSize()}</div>
                        <div className="text-sm text-neutral-600">Total Size</div>
                      </div>
                      <div className="bg-white rounded-lg p-4">
                        <div className="text-2xl font-bold text-secondary mb-1">{getFileFormat()}</div>
                        <div className="text-sm text-neutral-600">Format</div>
                      </div>
                    </div>
                  </div>

                  {/* IPFS Hashes */}
                  {uploadedFiles.filter(f => f.status === 'completed').length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-3">IPFS Upload Results</h4>
                      <div className="space-y-3">
                        {uploadedFiles.filter(f => f.status === 'completed').map((file) => (
                          <div key={file.id} className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                            <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                            <div className="flex-1">
                              <p className="font-medium text-green-900">{file.file.name}</p>
                              <p className="text-sm text-green-700 font-mono">
                                IPFS Hash: {file.ipfsHash}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <h4 className="font-semibold mb-3">Blockchain Publication</h4>
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                        <Database className="w-5 h-5 text-blue-600 mt-0.5" />
                        <div>
                          <p className="font-medium text-blue-900">Ready for blockchain publication</p>
                          <p className="text-sm text-blue-700">
                            Your dataset will be registered on the Filecoin blockchain with metadata stored on IPFS
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg">
                        <Shield className="w-5 h-5 text-yellow-600 mt-0.5" />
                        <div>
                          <p className="font-medium text-yellow-900">MetaMask required</p>
                          <p className="text-sm text-yellow-700">
                            Make sure you have MetaMask installed and connected to publish to the blockchain
                          </p>
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
                      Your {uploadedFiles.filter(f => f.status === 'completed').length} file{uploadedFiles.filter(f => f.status === 'completed').length !== 1 ? 's are' : ' is'} uploaded to IPFS and ready to be published on the Filecoin blockchain.
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
                            <span className="text-neutral-600">Files:</span>
                            <span>{uploadedFiles.filter(f => f.status === 'completed').length} file{uploadedFiles.filter(f => f.status === 'completed').length !== 1 ? 's' : ''}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-neutral-600">Total Size:</span>
                            <span>{getTotalSize()}</span>
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
                        <h4 className="font-semibold mb-3">Blockchain Details</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-neutral-600">Network:</span>
                            <span className="font-semibold">Filecoin</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-neutral-600">Storage:</span>
                            <span>IPFS + Filecoin</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-neutral-600">Contract:</span>
                            <span className="font-mono text-xs">{registryAddress.slice(0, 10)}...</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-neutral-600">Gas Fee:</span>
                            <span>~0.001 FIL</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Launch Progress */}
                  {isLaunching && (
                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-5 h-5 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />
                        <span className="font-medium text-blue-900">{launchStatus}</span>
                      </div>
                      <Progress value={launchProgress} className="h-2" />
                      <p className="text-sm text-blue-700 mt-2">{launchProgress}% complete</p>
                    </div>
                  )}

                  <div className="text-center">
                    <Button
                      size="lg"
                      className="bg-primary hover:bg-primary/90 px-8"
                      onClick={handleLaunchDataset}
                      disabled={isLaunching || uploadedFiles.filter(f => f.status === 'completed').length === 0}
                    >
                      {isLaunching ? (
                        <>
                          <div className="w-5 h-5 mr-2 animate-spin rounded-full border-2 border-white border-t-transparent" />
                          Publishing...
                        </>
                      ) : (
                        <>
                          <Database className="w-5 h-5 mr-2" />
                          Publish to Blockchain
                        </>
                      )}
                    </Button>
                    <p className="text-sm text-neutral-600 mt-2">
                      By publishing, you agree to our Terms of Service and Data Policy
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
                    disabled={currentStep === 1 && uploadedFiles.filter(f => f.status === 'completed').length === 0}
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
