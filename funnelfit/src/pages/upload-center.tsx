import React, { useState, useRef, useCallback } from 'react'
import { Button, Card, CardContent } from '../components/ui'
import { 
  UploadIcon, 
  FileTextIcon, 
  XIcon, 
  CheckCircleIcon, 
  AlertCircleIcon,
  DownloadIcon,
  Trash2Icon,
  ArrowLeftIcon,
  ClockIcon,
  BuildingIcon,
  CreditCardIcon,
  UsersIcon,
  FileIcon,
  PlusIcon
} from 'lucide-react'

interface UploadCenterProps {
  onNavigate: (page: 'sign-in' | 'sign-up' | 'create-account' | 'email-verification' | 'verification-success' | 'onboarding' | 'onboarding-success' | 'sme-dashboard' | 'upload-center', accountType?: 'sme' | 'cfo', email?: string) => void
  accountType: 'sme' | 'cfo'
  email: string
}

interface UploadedFile {
  id: string
  name: string
  size: number
  type: string
  category: string
  uploadDate: Date
  status: 'uploading' | 'processing' | 'reviewed' | 'complete' | 'error'
  progress?: number
  error?: string
}

const UploadCenter: React.FC<UploadCenterProps> = ({ 
  onNavigate, 
  accountType, 
  email 
}) => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const documentCategories = [
    {
      id: 'bank-statements',
      name: 'Bank Statements',
      description: 'Monthly bank statements for all business accounts',
      required: true,
      icon: <BuildingIcon className="h-5 w-5" />,
      acceptedTypes: ['.pdf', '.csv', '.xlsx', '.xls'],
      examples: ['Checking account statements', 'Savings account statements', 'Business credit line statements']
    },
    {
      id: 'credit-card-statements',
      name: 'Credit Card Statements',
      description: 'Monthly credit card statements for business expenses',
      required: true,
      icon: <CreditCardIcon className="h-5 w-5" />,
      acceptedTypes: ['.pdf', '.csv', '.xlsx', '.xls'],
      examples: ['Business credit card statements', 'Corporate card statements']
    },
    {
      id: 'payroll-reports',
      name: 'Payroll Reports',
      description: 'Payroll reports and employee payment records',
      required: true,
      icon: <UsersIcon className="h-5 w-5" />,
      acceptedTypes: ['.pdf', '.csv', '.xlsx', '.xls'],
      examples: ['Payroll summaries', 'Employee payment records', 'Tax withholding reports']
    },
    {
      id: 'tax-returns',
      name: 'Previous Tax Returns',
      description: 'Previous year tax returns and related documents',
      required: false,
      icon: <FileIcon className="h-5 w-5" />,
      acceptedTypes: ['.pdf'],
      examples: ['Previous year tax returns', 'Tax payment records']
    },
    {
      id: 'other-documents',
      name: 'Other Financial Documents',
      description: 'Additional financial documents and records',
      required: false,
      icon: <FileTextIcon className="h-5 w-5" />,
      acceptedTypes: ['.pdf', '.csv', '.xlsx', '.xls', '.doc', '.docx'],
      examples: ['Invoices', 'Receipts', 'Financial reports', 'Loan documents']
    }
  ]

  const getStatusInfo = (status: UploadedFile['status']) => {
    switch (status) {
      case 'uploading':
        return {
          color: 'text-blue-600',
          bgColor: 'bg-blue-50',
          icon: <ClockIcon className="h-4 w-4" />,
          text: 'Uploading...'
        }
      case 'processing':
        return {
          color: 'text-yellow-600',
          bgColor: 'bg-yellow-50',
          icon: <ClockIcon className="h-4 w-4" />,
          text: 'Processing'
        }
      case 'reviewed':
        return {
          color: 'text-green-600',
          bgColor: 'bg-green-50',
          icon: <CheckCircleIcon className="h-4 w-4" />,
          text: 'Reviewed'
        }
      case 'complete':
        return {
          color: 'text-green-600',
          bgColor: 'bg-green-50',
          icon: <CheckCircleIcon className="h-4 w-4" />,
          text: 'Complete'
        }
      case 'error':
        return {
          color: 'text-red-600',
          bgColor: 'bg-red-50',
          icon: <AlertCircleIcon className="h-4 w-4" />,
          text: 'Error'
        }
      default:
        return {
          color: 'text-gray-600',
          bgColor: 'bg-gray-50',
          icon: <ClockIcon className="h-4 w-4" />,
          text: 'Unknown'
        }
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files, selectedCategory || undefined)
    }
  }, [selectedCategory])

  const handleFiles = (files: FileList, categoryId?: string) => {
    setIsUploading(true)
    
    Array.from(files).forEach((file, index) => {
      const fileId = `file-${Date.now()}-${index}`
      const newFile: UploadedFile = {
        id: fileId,
        name: file.name,
        size: file.size,
        type: file.type,
        category: categoryId || 'other-documents',
        uploadDate: new Date(),
        status: 'uploading',
        progress: 0
      }

      setUploadedFiles(prev => [...prev, newFile])

      // Simulate upload progress
      simulateUpload(fileId)
    })
  }

  const simulateUpload = (fileId: string) => {
    let progress = 0
    const interval = setInterval(() => {
      progress += Math.random() * 30
      if (progress >= 100) {
        progress = 100
        clearInterval(interval)
        
        setUploadedFiles(prev => prev.map(file => 
          file.id === fileId 
            ? { ...file, status: 'processing' as const, progress: 100 }
            : file
        ))

        // Simulate processing completion
        setTimeout(() => {
          setUploadedFiles(prev => prev.map(file => 
            file.id === fileId 
              ? { ...file, status: 'complete' as const }
              : file
          ))
          setIsUploading(false)
        }, 2000)
      } else {
        setUploadedFiles(prev => prev.map(file => 
          file.id === fileId 
            ? { ...file, progress }
            : file
        ))
      }
    }, 200)
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files, selectedCategory || undefined)
    }
  }

  const removeFile = (fileId: string) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== fileId))
  }

  const downloadFile = (file: UploadedFile) => {
    // In a real app, this would download the file from the server
    console.log('Downloading file:', file.name)
  }

  const getCategoryName = (categoryId: string) => {
    const category = documentCategories.find(cat => cat.id === categoryId)
    return category ? category.name : 'Other Documents'
  }

  const getRequiredDocuments = () => {
    return documentCategories.filter(cat => cat.required)
  }

  const getUploadedRequiredDocs = () => {
    const requiredCategories = getRequiredDocuments().map(cat => cat.id)
    return uploadedFiles.filter(file => requiredCategories.includes(file.category))
  }

  const getUploadProgress = () => {
    const requiredCategories = getRequiredDocuments().map(cat => cat.id)
    const completedRequiredCategories = requiredCategories.filter(categoryId => {
      const status = getCategoryUploadStatus(categoryId)
      return status.hasCompleteFiles
    })
    return Math.round((completedRequiredCategories.length / requiredCategories.length) * 100)
  }

  const getCategoryUploadStatus = (categoryId: string) => {
    const categoryFiles = uploadedFiles.filter(file => file.category === categoryId)
    const hasUploadedFiles = categoryFiles.length > 0
    const hasCompleteFiles = categoryFiles.some(file => file.status === 'complete')
    
    return {
      hasFiles: hasUploadedFiles,
      hasCompleteFiles,
      fileCount: categoryFiles.length,
      files: categoryFiles
    }
  }

  const handleCategoryUpload = (categoryId: string) => {
    setSelectedCategory(categoryId)
    fileInputRef.current?.click()
  }

  const isAllRequiredComplete = () => {
    const requiredCategories = getRequiredDocuments().map(cat => cat.id)
    return requiredCategories.every(categoryId => {
      const status = getCategoryUploadStatus(categoryId)
      return status.hasCompleteFiles
    })
  }

  return (
    <div className="min-h-screen bg-gray-25">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <div className="flex items-center">
              <div className="w-32 h-8">
                <svg className="w-full h-full" viewBox="0 0 119 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M114.41 9.13419C114.41 9.41033 114.634 9.63419 114.91 9.63419H116.989C117.265 9.63419 117.489 9.85805 117.489 10.1342V12.4773C117.489 12.7535 117.265 12.9773 116.989 12.9773H114.91C114.634 12.9773 114.41 13.2012 114.41 13.4773V20.7495C114.41 21.1604 114.475 21.4811 114.603 21.711C114.731 21.9335 114.908 22.0897 115.135 22.1802C115.369 22.2707 115.639 22.3162 115.945 22.3162C116.158 22.3162 116.371 22.2994 116.584 22.2645C116.589 22.2637 116.593 22.2628 116.597 22.2619C116.863 22.21 117.12 22.3809 117.177 22.6452L117.691 25.0334C117.746 25.2872 117.597 25.5402 117.345 25.6027C117.193 25.6404 117.021 25.6803 116.829 25.7225C116.418 25.82 115.917 25.8788 115.327 25.8997C114.234 25.9415 113.274 25.799 112.45 25.4717C111.634 25.1443 110.998 24.6356 110.543 23.9461C110.089 23.2566 109.865 22.3861 109.872 21.3346V13.4773C109.872 13.2012 109.648 12.9773 109.372 12.9773H108.35C108.074 12.9773 107.85 13.2012 107.85 13.4773V25.1805C107.85 25.4566 107.626 25.6805 107.35 25.6805H103.812C103.536 25.6805 103.312 25.4566 103.312 25.1805V10.1342C103.312 9.85805 103.536 9.63419 103.812 9.63419H109.372C109.648 9.63419 109.872 9.41033 109.872 9.13419V6.28923C109.872 6.01309 110.096 5.78923 110.372 5.78923H113.91C114.186 5.78923 114.41 6.01309 114.41 6.28923V9.13419Z" fill="currentColor"/>
                  <path d="M102.695 7.74116C102.695 8.0173 102.471 8.24116 102.195 8.24116H93.3618C93.0857 8.24116 92.8618 8.46502 92.8618 8.74116V12.8386C92.8618 13.1148 93.0857 13.3386 93.3618 13.3386H101.236C101.512 13.3386 101.736 13.5625 101.736 13.8386V16.5687C101.736 16.8449 101.512 17.0687 101.236 17.0687H93.3618C93.0857 17.0687 92.8618 17.2926 92.8618 17.5687V25.4068C92.8618 25.683 92.638 25.9068 92.3618 25.9068H88.7485C88.4724 25.9068 88.2485 25.683 88.2485 25.4068V5.01115C88.2485 4.735 88.4724 4.51115 88.7485 4.51115H102.195C102.471 4.51115 102.695 4.735 102.695 5.01115V7.74116Z" fill="currentColor"/>
                  <path d="M105.592 4.70691C106.267 4.70698 106.842 4.92963 107.318 5.37524C107.8 5.81388 108.042 6.33955 108.042 6.95222C108.042 7.57189 107.8 8.10464 107.318 8.55027C106.842 8.98891 106.267 9.20896 105.592 9.20903C104.918 9.20903 104.339 8.98892 103.856 8.55027C103.38 8.10461 103.142 7.57198 103.142 6.95222C103.142 6.33954 103.38 5.81388 103.856 5.37524C104.339 4.92973 104.918 4.70691 105.592 4.70691Z" fill="#E3B018"/>
                  <path fillRule="evenodd" clipRule="evenodd" d="M73.4019 9.33768C74.4813 9.33768 75.4862 9.5088 76.4165 9.85006C77.354 10.1844 78.1707 10.6895 78.8667 11.365C79.5698 12.0406 80.1167 12.8905 80.5073 13.9143C80.8979 14.9311 81.0933 16.1222 81.0933 17.4873V18.2091C81.0933 18.4853 80.8694 18.7091 80.5933 18.7091H69.9603C69.9544 18.7091 69.9497 18.7139 69.9497 18.7197C69.9497 19.5136 70.0987 20.1997 70.397 20.7777C70.7023 21.3556 71.1322 21.8011 71.6861 22.1145C72.2399 22.4279 72.8969 22.5847 73.6568 22.5848C74.1609 22.5848 74.6235 22.5152 75.0424 22.376C75.4613 22.2367 75.8195 22.0273 76.1177 21.7488C76.33 21.5504 76.5068 21.3203 76.6474 21.0585C76.7507 20.866 76.9486 20.7346 77.1665 20.7487L80.419 20.9595C80.7237 20.9793 80.9414 21.2662 80.8486 21.5572C80.6069 22.3154 80.2195 22.9921 79.687 23.5874C79.0336 24.3187 78.1887 24.8907 77.1519 25.3016C76.122 25.7055 74.932 25.9068 73.5825 25.9068C71.8993 25.9068 70.4503 25.5727 69.2359 24.9041C68.0286 24.2286 67.0982 23.2744 66.4448 22.0418C65.7914 20.8021 65.4644 19.3357 65.4644 17.6433C65.4644 15.9928 65.7915 14.5442 66.4448 13.2975C67.0982 12.0509 68.0176 11.079 69.2036 10.3824C70.3968 9.686 71.7968 9.33768 73.4019 9.33768ZM73.4761 12.6607C72.7874 12.6607 72.1766 12.8167 71.6441 13.13C71.1185 13.4364 70.706 13.8516 70.4077 14.3739C70.2178 14.7022 70.0876 15.0545 70.0162 15.4308C69.963 15.7112 70.1944 15.9511 70.4798 15.9511H76.3208C76.5969 15.9511 76.8249 15.7263 76.7903 15.4523C76.7347 15.0118 76.603 14.6105 76.395 14.2485C76.1109 13.754 75.7167 13.3674 75.2124 13.0888C74.7153 12.8032 74.1366 12.6607 73.4761 12.6607Z" fill="currentColor"/>
                  <path d="M86.1929 25.4068C86.1929 25.683 85.969 25.9068 85.6929 25.9068H82.1548C81.8786 25.9068 81.6548 25.683 81.6548 25.4068V5.01115C81.6548 4.735 81.8786 4.51115 82.1548 4.51115H85.6929C85.969 4.51115 86.1929 4.735 86.1929 5.01115V25.4068Z" fill="currentColor"/>
                  <path d="M14.8643 7.74116C14.8643 8.0173 14.6404 8.24116 14.3643 8.24116H5.53125C5.25511 8.24116 5.03125 8.46502 5.03125 8.74116V12.8386C5.03125 13.1148 5.25511 13.3386 5.53125 13.3386H13.4053C13.6814 13.3386 13.9053 13.5625 13.9053 13.8386V16.5687C13.9053 16.8449 13.6814 17.0687 13.4053 17.0687H5.53125C5.25511 17.0687 5.03125 17.2926 5.03125 17.5687V25.4068C5.03125 25.683 4.80739 25.9068 4.53125 25.9068H0.917968C0.641826 25.9068 0.417969 25.683 0.417969 25.4068V5.01115C0.417969 4.735 0.641826 4.51115 0.917968 4.51115H14.3643C14.6404 4.51115 14.8643 4.735 14.8643 5.01115V7.74116Z" fill="currentColor"/>
                  <path d="M31.0416 9.62609C31.3178 9.62609 31.5416 9.84995 31.5416 10.1261V17.9064C31.5416 22.3246 27.9051 25.9062 23.4869 25.9064C19.0687 25.9064 15.4313 22.3246 15.4313 17.9064V10.1261C15.4313 9.84999 15.6552 9.62616 15.9313 9.62609H17.5837C17.753 9.62609 17.9107 9.71172 18.003 9.85365L21.6949 15.5353V21.4239C21.6949 21.8298 22.153 22.0666 22.484 21.8321L25.068 19.9982C25.1999 19.9044 25.2789 19.7528 25.2789 19.5909V15.5402L28.9709 9.85381C29.0631 9.71179 29.221 9.62609 29.3903 9.62609H31.0416Z" fill="#E3B018"/>
                  <path d="M40.1648 9.62609C44.583 9.62616 48.2195 13.2079 48.2195 17.6261V25.4064C48.2195 25.6823 47.9964 25.9061 47.7205 25.9064H44.1755C43.8994 25.9064 43.6755 25.6825 43.6755 25.4064V17.6818C43.6755 15.7429 42.1036 14.1711 40.1648 14.171C38.2259 14.171 36.6541 15.7429 36.6541 17.6818V25.4064C36.6541 25.6825 36.4302 25.9064 36.1541 25.9064H32.6091C32.3331 25.9062 32.1091 25.6824 32.1091 25.4064V17.6261C32.1091 13.2078 35.7465 9.62609 40.1648 9.62609Z" fill="currentColor"/>
                  <path d="M56.8424 9.62609C61.2606 9.62616 64.8971 13.2079 64.8971 17.6261V25.4064C64.8971 25.6823 64.674 25.9061 64.3981 25.9064H60.8531C60.577 25.9064 60.3531 25.6825 60.3531 25.4064V17.6818C60.3531 15.7429 58.7812 14.1711 56.8424 14.171C54.9035 14.171 53.3317 15.7429 53.3317 17.6818V25.4064C53.3317 25.6825 53.1078 25.9064 52.8317 25.9064H49.2867C49.0107 25.9062 48.7867 25.6824 48.7867 25.4064V17.6261C48.7867 13.2078 52.4241 9.62609 56.8424 9.62609Z" fill="currentColor"/>
                </svg>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center space-x-4">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => onNavigate('sme-dashboard', accountType, email)}
              >
                <ArrowLeftIcon className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-3xl font-bold text-gray-900">
              Document Upload Center
            </h1>
                          {isAllRequiredComplete() && (
                <Button 
                  size="lg"
                  onClick={() => {
                    console.log('Submitting documents for review...')
                    // In a real app, this would submit to the backend
                    // Pass the uploaded files count to update dashboard state
                    const totalDocuments = uploadedFiles.length
                    console.log(`Submitting ${totalDocuments} documents for review`)
                    onNavigate('sme-dashboard', accountType, email)
                  }}
                  className="flex items-center space-x-2"
                >
                  <CheckCircleIcon className="h-5 w-5" />
                  <span>Submit for Review</span>
                </Button>
              )}
          </div>
          <p className="text-gray-600">
            Upload your financial documents to get started with bookkeeping services.
          </p>
        </div>

        {/* Progress Overview */}
        <div className="mb-8">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Upload Progress
              </h2>
              <span className="text-sm text-gray-600">
                {getRequiredDocuments().filter(cat => getCategoryUploadStatus(cat.id).hasCompleteFiles).length} of {getRequiredDocuments().length} required categories
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
              <div 
                className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${getUploadProgress()}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-600">
              {getUploadProgress()}% complete
            </p>
          </div>
        </div>

        {/* Document Categories in Two Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {documentCategories.map((category) => {
            const uploadStatus = getCategoryUploadStatus(category.id)
            return (
              <Card key={category.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-primary-100 rounded-lg">
                      {category.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-medium text-gray-900">
                            {category.name}
                          </h3>
                          {category.required && (
                            <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full">
                              Required
                            </span>
                          )}
                        </div>
                        {uploadStatus.hasCompleteFiles && (
                          <div className="flex items-center space-x-1 text-green-600">
                            <CheckCircleIcon className="h-4 w-4" />
                            <span className="text-xs font-medium">Complete</span>
                          </div>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        {category.description}
                      </p>
                      <div className="text-xs text-gray-500 mb-3">
                        <p className="mb-1">Accepted formats: {category.acceptedTypes.join(', ')}</p>
                        <p>Examples: {category.examples.join(', ')}</p>
                      </div>
                      
                      {/* Upload Status */}
                      {uploadStatus.hasFiles && (
                        <div className="mb-3 p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-gray-700">
                              {uploadStatus.fileCount} document{uploadStatus.fileCount > 1 ? 's' : ''} uploaded
                            </span>
                            {uploadStatus.hasCompleteFiles && (
                              <span className="text-xs text-green-600 font-medium">✓ Ready</span>
                            )}
                          </div>
                          {uploadStatus.files.map((file) => (
                            <div key={file.id} className="group flex items-center justify-between text-xs text-gray-600 hover:bg-gray-100 rounded px-2 py-1 transition-colors">
                              <div className="flex items-center space-x-2 flex-1 min-w-0">
                                <FileTextIcon className="h-3 w-3 text-gray-400 flex-shrink-0" />
                                <span className="truncate flex-1">{file.name}</span>
                              </div>
                              <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                                <span className="text-gray-500 whitespace-nowrap">{formatFileSize(file.size)}</span>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    removeFile(file.id)
                                  }}
                                  className="h-6 w-6 p-0 hover:bg-red-100 hover:text-red-600 flex-shrink-0"
                                >
                                  <Trash2Icon className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                      
                      {/* Upload Button */}
                      <div className="flex justify-end">
                        <Button
                          onClick={() => handleCategoryUpload(category.id)}
                          variant={uploadStatus.hasCompleteFiles ? "outline" : "default"}
                          size="sm"
                          disabled={isUploading}
                        >
                          {uploadStatus.hasCompleteFiles ? (
                            <>
                              <PlusIcon className="h-4 w-4 mr-2" />
                              Add More
                            </>
                          ) : (
                            <>
                              <UploadIcon className="h-4 w-4 mr-2" />
                              Upload
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>



        {/* Hidden file input for category uploads */}
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".pdf,.csv,.xlsx,.xls,.doc,.docx"
          onChange={handleFileInput}
          className="hidden"
        />
      </div>
    </div>
  )
}

export default UploadCenter
