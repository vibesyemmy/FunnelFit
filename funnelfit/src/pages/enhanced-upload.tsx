import React, { useState, useRef } from 'react'
import { Button, Card, CardContent } from '../components/ui'
import { 
  ArrowLeftIcon,
  FileTextIcon,
  BuildingIcon,
  BarChart3Icon,
  ReceiptIcon,
  ScaleIcon,
  UploadIcon,
  XIcon,
  EyeIcon,
  CheckCircleIcon
} from 'lucide-react'

interface EnhancedUploadPageProps {
  onNavigate: (page: 'sign-in' | 'sign-up' | 'create-account' | 'email-verification' | 'verification-success' | 'onboarding' | 'onboarding-success' | 'sme-dashboard' | 'sme-main-dashboard' | 'upload-center' | 'bank-connection' | 'enhanced-upload', accountType?: 'sme' | 'cfo', email?: string) => void
  accountType: 'sme' | 'cfo'
  email: string
}

const EnhancedUploadPage: React.FC<EnhancedUploadPageProps> = ({ 
  onNavigate, 
  accountType, 
  email 
}) => {
  const [currentStep, setCurrentStep] = useState<'upload' | 'preview'>('upload')
  const [selectedDocumentType, setSelectedDocumentType] = useState<string>('')
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [dragActive, setDragActive] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const documentTypes = [
    {
      id: 'bank-statements',
      name: 'Bank Statements',
      description: 'Monthly bank statements from your business accounts',
      icon: <BuildingIcon className="h-6 w-6" />,
      color: 'bg-blue-100 text-blue-600',
      examples: ['Bank statement PDF', 'Account summary', 'Transaction history']
    },
    {
      id: 'tax-documents',
      name: 'Tax Documents',
      description: 'VAT returns, income tax filings, and tax certificates',
      icon: <FileTextIcon className="h-6 w-6" />,
      color: 'bg-green-100 text-green-600',
      examples: ['VAT returns', 'Income tax returns', 'Tax certificates', 'PAYE schedules']
    },
    {
      id: 'financial-reports',
      name: 'Financial Reports',
      description: 'P&L statements, balance sheets, and financial summaries',
      icon: <BarChart3Icon className="h-6 w-6" />,
      color: 'bg-purple-100 text-purple-600',
      examples: ['Profit & Loss statements', 'Balance sheets', 'Cash flow reports']
    },
    {
      id: 'receipts',
      name: 'Receipts & Invoices',
      description: 'Business receipts, invoices, and expense documentation',
      icon: <ReceiptIcon className="h-6 w-6" />,
      color: 'bg-orange-100 text-orange-600',
      examples: ['Purchase receipts', 'Sales invoices', 'Expense receipts']
    },
    {
      id: 'legal-documents',
      name: 'Legal Documents',
      description: 'Contracts, agreements, and legal business documents',
      icon: <ScaleIcon className="h-6 w-6" />,
      color: 'bg-gray-100 text-gray-600',
      examples: ['Business contracts', 'Partnership agreements', 'Legal certificates']
    }
  ]

  const selectedType = documentTypes.find(type => type.id === selectedDocumentType)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0])
    }
  }

  const handleFile = (file: File) => {
    setUploadedFile(file)
    
    // Simulate upload progress
    setUploadProgress(0)
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => setCurrentStep('preview'), 500)
          return 100
        }
        return prev + 10
      })
    }, 200)
  }

  const handleSubmit = () => {
    // Simulate submission
    console.log('Submitting document:', {
      type: selectedDocumentType,
      file: uploadedFile?.name
    })
    // Navigate back to document management
    onNavigate('sme-main-dashboard', accountType, email)
  }

  const renderStepIndicator = () => (
    <div className="flex items-center space-x-4 mb-8">
      <div className={`flex items-center space-x-2 ${currentStep === 'upload' ? 'text-primary-600' : currentStep === 'preview' ? 'text-green-600' : 'text-gray-400'}`}>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep === 'upload' ? 'bg-primary-600 text-white' : currentStep === 'preview' ? 'bg-green-600 text-white' : 'bg-gray-200'}`}>
          {currentStep === 'preview' ? <CheckCircleIcon className="h-5 w-5" /> : '1'}
        </div>
        <span className="text-sm font-medium">Upload Document</span>
      </div>
      
      <div className={`h-px flex-1 ${currentStep === 'preview' ? 'bg-green-600' : 'bg-gray-200'}`} />
      
      <div className={`flex items-center space-x-2 ${currentStep === 'preview' ? 'text-primary-600' : 'text-gray-400'}`}>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep === 'preview' ? 'bg-primary-600 text-white' : 'bg-gray-200'}`}>
          2
        </div>
        <span className="text-sm font-medium">Preview & Submit</span>
      </div>
    </div>
  )

  const renderUploadForm = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Upload Your Document</h2>
        <p className="text-gray-600">Select document type and upload your file</p>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="space-y-6">
            {/* Document Type Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Document Type
              </label>
              <select
                value={selectedDocumentType}
                onChange={(e) => setSelectedDocumentType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white"
              >
                <option value="">Select document type...</option>
                {documentTypes.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
              </select>
            </div>

            {/* File Upload Area */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Document File
              </label>
              {uploadProgress > 0 ? (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <div className="space-y-4">
                    <UploadIcon className="h-12 w-12 text-primary-600 mx-auto" />
                    <div>
                      <p className="text-lg font-medium text-gray-900">Uploading...</p>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                        <div 
                          className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${uploadProgress}%` }}
                        />
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{uploadProgress}% complete</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer ${
                    dragActive ? 'border-primary-500 bg-primary-50' : 'border-gray-300 hover:border-gray-400'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <div className="space-y-4">
                    <UploadIcon className="h-12 w-12 text-gray-400 mx-auto" />
                    <div>
                      <p className="text-lg font-medium text-gray-900">Drop your file here</p>
                      <p className="text-sm text-gray-600">or click to browse</p>
                      <p className="text-xs text-gray-500 mt-2">Supports: PDF, DOC, DOCX, XLS, XLSX, JPG, PNG (Max 10MB)</p>
                    </div>
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    className="hidden"
                    accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
                    onChange={handleFileInput}
                  />
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Show selected document type info */}
      {selectedDocumentType && (
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <div className={`p-2 rounded-lg ${selectedType?.color}`}>
                {selectedType?.icon}
              </div>
              <div>
                <h4 className="font-medium text-gray-900">{selectedType?.name}</h4>
                <p className="text-sm text-gray-600">{selectedType?.description}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )



  const renderPreviewAndSubmit = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Review your document</h2>
        <p className="text-gray-600">Make sure everything looks correct before submitting</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Document Details */}
        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Document Details</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Document Type</label>
                <p className="text-gray-900">{selectedType?.name}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">File Name</label>
                <p className="text-gray-900">{uploadedFile?.name}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">File Size</label>
                <p className="text-gray-900">
                  {uploadedFile ? (uploadedFile.size / (1024 * 1024)).toFixed(2) + ' MB' : 'N/A'}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Upload Date</label>
                <p className="text-gray-900">{new Date().toLocaleDateString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* File Preview */}
        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold text-gray-900 mb-4">File Preview</h3>
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <FileTextIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-sm text-gray-600 mb-4">Preview not available</p>
              <Button variant="outline" size="sm">
                <EyeIcon className="h-4 w-4 mr-2" />
                Open File
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={() => {
            setCurrentStep('upload')
            setUploadedFile(null)
            setUploadProgress(0)
          }}
        >
          <ArrowLeftIcon className="h-4 w-4 mr-2" />
          Upload Different File
        </Button>
        
        <Button onClick={handleSubmit} className="px-8">
          Submit Document
        </Button>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-25">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => onNavigate('sme-main-dashboard', accountType, email)}
              >
                <ArrowLeftIcon className="h-4 w-4 mr-2" />
                Back to Documents
              </Button>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">Upload Document</h1>
                <p className="text-sm text-gray-600">Add a new document to your collection</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        {renderStepIndicator()}
        
        {currentStep === 'upload' && renderUploadForm()}
        {currentStep === 'preview' && renderPreviewAndSubmit()}
      </div>
    </div>
  )
}

export default EnhancedUploadPage
