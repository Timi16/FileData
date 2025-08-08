'use client'

import { motion } from 'framer-motion'
import { Database, Shield, Zap, Globe, ArrowRight, Users, TrendingUp, Lock, Coins } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import Link from 'next/link'

const PIPELINE_STEPS = [
  {
    id: 1,
    title: 'Upload & Validate',
    description: 'Providers upload datasets which are automatically validated for quality and completeness',
    icon: Database,
    color: 'from-primary to-primary/80'
  },
  {
    id: 2,
    title: 'AI Enhancement',
    description: 'Our AI analyzes and enhances metadata, suggests tags, and optimizes for discoverability',
    icon: Zap,
    color: 'from-secondary to-secondary/80'
  },
  {
    id: 3,
    title: 'Filecoin Storage',
    description: 'Data is stored permanently on Filecoin network with cryptographic proofs of integrity',
    icon: Shield,
    color: 'from-accent to-accent/80'
  },
  {
    id: 4,
    title: 'Global Access',
    description: 'Consumers discover and access data through IPFS with global CDN performance',
    icon: Globe,
    color: 'from-primary to-accent'
  }
]

const BENEFITS = [
  {
    title: 'For Data Providers',
    icon: TrendingUp,
    benefits: [
      'Monetize your data assets with FIL tokens',
      'Permanent storage with zero maintenance',
      'Global reach and discoverability',
      'Automated quality scoring and optimization'
    ]
  },
  {
    title: 'For Data Consumers',
    icon: Users,
    benefits: [
      'Access high-quality, verified datasets',
      'Pay only for what you use',
      'Instant global access via IPFS',
      'Cryptographic proof of data integrity'
    ]
  }
]

const TOKENOMICS = [
  { label: 'Data Storage', percentage: 40, color: 'bg-primary' },
  { label: 'Provider Rewards', percentage: 35, color: 'bg-secondary' },
  { label: 'Platform Operations', percentage: 15, color: 'bg-accent' },
  { label: 'Community Treasury', percentage: 10, color: 'bg-neutral-400' }
]

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-accent/20 text-white">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        
        <div className="relative max-w-[1320px] mx-auto px-6 lg:px-8 py-24 lg:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
              How FilData
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-secondary to-accent">
                Works
              </span>
            </h1>
            
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Discover the technology and processes that power the world's most 
              advanced decentralized data marketplace, built on Filecoin.
            </p>

            <Button asChild size="lg" className="bg-secondary hover:bg-secondary/90 text-primary font-semibold">
              <Link href="#pipeline">
                Explore the Pipeline
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Pipeline Section */}
      <section id="pipeline" className="py-24 bg-white">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900 mb-4">
              The FilData Pipeline
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              From upload to global access, see how data flows through our 
              decentralized infrastructure powered by Filecoin and IPFS.
            </p>
          </motion.div>

          <div className="relative">
            {/* Connection Line */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-secondary to-accent transform -translate-y-1/2 hidden lg:block" />
            
            <div className="grid lg:grid-cols-4 gap-8">
              {PIPELINE_STEPS.map((step, index) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <Card className="h-full border-2 border-neutral-100 hover:border-accent/30 transition-all duration-300 hover:shadow-lg">
                    <CardContent className="p-6 text-center">
                      <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${step.color} rounded-2xl mb-6 relative z-10`}>
                        <step.icon className="w-8 h-8 text-white" />
                      </div>
                      
                      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-white border-4 border-primary rounded-full flex items-center justify-center text-sm font-bold text-primary z-20">
                        {step.id}
                      </div>
                      
                      <h3 className="text-xl font-semibold text-neutral-900 mb-3 mt-4">
                        {step.title}
                      </h3>
                      <p className="text-neutral-600 leading-relaxed">
                        {step.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-neutral-50">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900 mb-4">
              Built for Everyone
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Whether you're sharing data or seeking insights, FilData provides 
              the tools and infrastructure you need to succeed.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {BENEFITS.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, x: index === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="h-full border-2 border-neutral-100">
                  <CardContent className="p-8">
                    <div className="flex items-center space-x-3 mb-6">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center">
                        <benefit.icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-2xl font-semibold text-neutral-900">
                        {benefit.title}
                      </h3>
                    </div>
                    
                    <ul className="space-y-3">
                      {benefit.benefits.map((item, i) => (
                        <li key={i} className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                          <span className="text-neutral-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tokenomics Section */}
      <section className="py-24 bg-white">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900 mb-4">
              Tokenomics & FIL Payments
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Understand how FIL tokens flow through the FilData ecosystem, 
              ensuring fair compensation and sustainable growth.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="border-2 border-neutral-100">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-semibold text-neutral-900 mb-6">
                    FIL Token Distribution
                  </h3>
                  
                  <div className="space-y-4">
                    {TOKENOMICS.map((item, index) => (
                      <div key={item.label} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-neutral-900">{item.label}</span>
                          <span className="text-neutral-600">{item.percentage}%</span>
                        </div>
                        <div className="w-full bg-neutral-200 rounded-full h-3">
                          <motion.div 
                            className={`${item.color} h-3 rounded-full`}
                            initial={{ width: 0 }}
                            whileInView={{ width: `${item.percentage}%` }}
                            transition={{ duration: 1, delay: index * 0.1 }}
                            viewport={{ once: true }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <Card className="border-2 border-primary/20">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <Coins className="w-6 h-6 text-secondary" />
                    <h4 className="text-lg font-semibold">Payment Flow</h4>
                  </div>
                  <p className="text-neutral-700 text-sm">
                    Consumers pay in FIL tokens for dataset access. Payments are automatically 
                    distributed to providers, storage miners, and platform operations.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-accent/20">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <Lock className="w-6 h-6 text-accent" />
                    <h4 className="text-lg font-semibold">Escrow Protection</h4>
                  </div>
                  <p className="text-neutral-700 text-sm">
                    All payments are held in smart contract escrow until data delivery 
                    is confirmed, ensuring both parties are protected.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-neutral-200">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <TrendingUp className="w-6 h-6 text-primary" />
                    <h4 className="text-lg font-semibold">Revenue Sharing</h4>
                  </div>
                  <p className="text-neutral-700 text-sm">
                    Providers keep 95% of revenue, with 5% going to platform operations 
                    and community development.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-primary to-accent text-white">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Ready to Join the Data Revolution?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Start building on the most advanced decentralized data infrastructure. 
              Publish your first dataset or discover valuable data today.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-secondary hover:bg-secondary/90 text-primary font-semibold">
                <Link href="/publish">
                  Publish Dataset
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              
              <Button asChild variant="outline" size="lg" className="border-secondary text-secondary hover:bg-secondary hover:text-primary">
                <Link href="/discover">
                  Discover Data
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
