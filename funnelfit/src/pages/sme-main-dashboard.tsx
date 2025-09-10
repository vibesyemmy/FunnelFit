import React, { useState } from 'react'
import { Button, Card, CardContent, Modal, Input, Label, Select } from '../components/ui'
import ExpenseDetail, { ExpenseData } from '../components/ExpenseDetail'
import CFORequestWizard, { CFORequestData } from '../components/CFORequestWizard'
import { 
  ArrowLeftIcon,
  HomeIcon,
  FileTextIcon,
  BuildingIcon,
  BarChart3Icon,
  UsersIcon,
  MessageSquareIcon,
  SettingsIcon,
  UserIcon,
  DollarSignIcon,
  TrendingUpIcon,
  CalendarIcon,
  BellIcon,
  LogOutIcon,
  CheckCircleIcon,
  ClockIcon,
  AlertCircleIcon,
  SearchIcon,
  FilterIcon,
  MoreHorizontalIcon,
  CreditCardIcon,
  ReceiptIcon,
  LinkIcon,
  UploadIcon,
  XIcon,
  PlusIcon,
  FileTextIcon as FileText,
  MicIcon,
  PlayIcon,
  PaperclipIcon
} from 'lucide-react'

interface SmeMainDashboardProps {
  onNavigate: (page: 'sign-in' | 'sign-up' | 'create-account' | 'email-verification' | 'verification-success' | 'onboarding' | 'onboarding-success' | 'sme-dashboard' | 'sme-main-dashboard' | 'upload-center' | 'bank-connection' | 'enhanced-upload', accountType?: 'sme' | 'cfo', email?: string) => void
  accountType: 'sme' | 'cfo'
  email: string
}

const SmeMainDashboard: React.FC<SmeMainDashboardProps> = ({ 
  onNavigate, 
  accountType, 
  email 
}) => {
  const [activeModule, setActiveModule] = useState('overview')
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false)
  const [expenseForm, setExpenseForm] = useState({
    amount: '',
    category: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    receipt: null as File | null
  })
  const [selectedExpense, setSelectedExpense] = useState<ExpenseData | null>(null)
  const [isExpenseDetailOpen, setIsExpenseDetailOpen] = useState(false)
  const [isCFORequestWizardOpen, setIsCFORequestWizardOpen] = useState(false)

  // Mock data - in real app this would come from API
  const companyName = "Acme Corp"

  const mockExpenses: ExpenseData[] = [
    {
      id: '1',
      title: 'Office Supplies - Staples',
      amount: 45000,
      category: 'Office Expenses',
      date: 'Dec 15, 2024',
      status: 'categorized',
      description: 'Monthly office supplies including paper, pens, and folders',
      receiptNumber: '12345',
      vendor: 'Staples Nigeria',
      paymentMethod: 'Company Credit Card',
      submittedBy: 'John Doe',
      submittedDate: 'Dec 15, 2024',
      receiptUrl: '/api/receipts/12345.jpg',
      notes: 'Regular monthly office supplies purchase'
    },
    {
      id: '2',
      title: 'Uber Business Trip',
      amount: 15500,
      category: 'Travel',
      date: 'Dec 14, 2024',
      status: 'pending',
      description: 'Transportation to client meeting downtown',
      receiptNumber: '67890',
      vendor: 'Uber Technologies',
      paymentMethod: 'Personal Card (Reimbursable)',
      submittedBy: 'Jane Smith',
      submittedDate: 'Dec 14, 2024',
      receiptUrl: '/api/receipts/67890.jpg'
    },
    {
      id: '3',
      title: 'Team Lunch Meeting',
      amount: 28000,
      category: 'Meals',
      date: 'Dec 13, 2024',
      status: 'approved',
      description: 'Business lunch with potential clients',
      receiptNumber: '54321',
      vendor: 'The Wheatbaker Hotel',
      paymentMethod: 'Company Credit Card',
      submittedBy: 'Mike Johnson',
      submittedDate: 'Dec 13, 2024',
      approvedBy: 'Sarah Wilson',
      approvedDate: 'Dec 14, 2024',
      receiptUrl: '/api/receipts/54321.jpg',
      notes: 'Client meeting to discuss Q1 2025 partnership'
    }
  ]

  const navigationModules = [
    {
      id: 'overview',
      name: 'Overview',
      icon: <HomeIcon className="h-5 w-5" />,
      description: 'Dashboard overview and key metrics'
    },
    {
      id: 'documents',
      name: 'Documents',
      icon: <FileTextIcon className="h-5 w-5" />,
      description: 'Manage uploaded documents and reports'
    },
    {
      id: 'transactions',
      name: 'Transactions',
      icon: <CreditCardIcon className="h-5 w-5" />,
      description: 'View and categorize transactions'
    },
    {
      id: 'expenses',
      name: 'Expenses',
      icon: <ReceiptIcon className="h-5 w-5" />,
      description: 'Manage receipts and expense tracking'
    },
    {
      id: 'financials',
      name: 'Financials',
      icon: <BarChart3Icon className="h-5 w-5" />,
      description: 'Financial reports and analysis'
    },
    {
      id: 'messages',
      name: 'Messages',
      icon: <MessageSquareIcon className="h-5 w-5" />,
      description: 'Communicate with your bookkeeper'
    },
    {
      id: 'cfo',
      name: 'CFO Services',
      icon: <UsersIcon className="h-5 w-5" />,
      description: 'CFO matching and consultation'
    },
    {
      id: 'cashflow',
      name: 'Cash Flow',
      icon: <DollarSignIcon className="h-5 w-5" />,
      description: 'Cash flow management and forecasting'
    },
    {
      id: 'profile',
      name: 'Profile',
      icon: <UserIcon className="h-5 w-5" />,
      description: 'SME profile and company information'
    }
  ]

  const getModuleContent = () => {
    switch (activeModule) {
      case 'overview':
        return (
          <div className="space-y-6">
            {/* Key Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <DollarSignIcon className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Monthly Revenue</p>
                      <p className="text-2xl font-bold text-gray-900">₦2.5M</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <TrendingUpIcon className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Growth Rate</p>
                      <p className="text-2xl font-bold text-gray-900">+12%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <UsersIcon className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Active Clients</p>
                      <p className="text-2xl font-bold text-gray-900">45</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-orange-100 rounded-lg">
                      <CalendarIcon className="h-6 w-6 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Pending Tasks</p>
                      <p className="text-2xl font-bold text-gray-900">8</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Bank transaction imported</p>
                      <p className="text-xs text-gray-500">2 minutes ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">CFO consultation scheduled</p>
                      <p className="text-xs text-gray-500">1 hour ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Financial report generated</p>
                      <p className="text-xs text-gray-500">3 hours ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )
      
      case 'documents':
        return (
          <div className="space-y-6">

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <FileTextIcon className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Total Documents</p>
                      <p className="text-xl font-bold text-gray-900">47</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <CheckCircleIcon className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Approved</p>
                      <p className="text-xl font-bold text-gray-900">42</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-yellow-100 rounded-lg">
                      <ClockIcon className="h-5 w-5 text-yellow-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Pending Review</p>
                      <p className="text-xl font-bold text-gray-900">3</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-red-100 rounded-lg">
                      <AlertCircleIcon className="h-5 w-5 text-red-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Needs Attention</p>
                      <p className="text-xl font-bold text-gray-900">2</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-3 lg:space-y-0 lg:space-x-4">
              <div className="flex flex-col md:flex-row md:items-center space-y-3 md:space-y-0 md:space-x-4">
                <div className="flex-1 max-w-md">
                  <div className="relative">
                    <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search documents..."
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Button variant="outline" className="px-4 py-2 h-10 bg-white border-gray-300 text-gray-700 hover:bg-gray-50 justify-between min-w-[140px]">
                    <span>All Categories</span>
                    <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </Button>
                  <Button variant="outline" className="px-4 py-2 h-10 bg-white border-gray-300 text-gray-700 hover:bg-gray-50 justify-between min-w-[120px]">
                    <span>All Status</span>
                    <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </Button>
                  <Button variant="outline" className="w-10 h-10 p-0 bg-white border-gray-300 hover:bg-gray-50 flex items-center justify-center">
                    <FilterIcon className="h-4 w-4 text-gray-600" />
                  </Button>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Button
                  onClick={() => onNavigate('enhanced-upload', accountType, email)}
                  className="flex items-center space-x-2 h-10"
                >
                  <FileTextIcon className="h-4 w-4" />
                  <span>Upload Documents</span>
                </Button>
              </div>
            </div>

            {/* Documents Table */}
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Document
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Category
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Size
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Upload Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {/* Bank Statements */}
                      <tr className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <FileTextIcon className="h-5 w-5 text-gray-400 mr-3" />
                            <div>
                              <div className="text-sm font-medium text-gray-900">GTBank_Dec2023.pdf</div>
                              <div className="text-sm text-gray-500">Bank statement for December 2023</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            Bank Statements
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">2.4 MB</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Dec 15, 2023</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1"></div>
                            Approved
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <Button variant="ghost" size="sm" className="text-primary-600 hover:text-primary-900">
                            View
                          </Button>
                          <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900 ml-2">
                            <MoreHorizontalIcon className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                      
                      <tr className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <FileTextIcon className="h-5 w-5 text-gray-400 mr-3" />
                            <div>
                              <div className="text-sm font-medium text-gray-900">Zenith_Nov2023.pdf</div>
                              <div className="text-sm text-gray-500">Bank statement for November 2023</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            Bank Statements
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">1.8 MB</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Nov 30, 2023</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                            <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mr-1"></div>
                            Pending Review
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <Button variant="ghost" size="sm" className="text-primary-600 hover:text-primary-900">
                            View
                          </Button>
                          <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900 ml-2">
                            <MoreHorizontalIcon className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>

                      {/* Tax Documents */}
                      <tr className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <FileTextIcon className="h-5 w-5 text-gray-400 mr-3" />
                            <div>
                              <div className="text-sm font-medium text-gray-900">VAT_Return_2023.pdf</div>
                              <div className="text-sm text-gray-500">Value Added Tax return for 2023</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Tax Documents
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">856 KB</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Jan 10, 2024</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1"></div>
                            Approved
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <Button variant="ghost" size="sm" className="text-primary-600 hover:text-primary-900">
                            View
                          </Button>
                          <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900 ml-2">
                            <MoreHorizontalIcon className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>

                      <tr className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <FileTextIcon className="h-5 w-5 text-gray-400 mr-3" />
                            <div>
                              <div className="text-sm font-medium text-gray-900">CIT_Returns_2022.pdf</div>
                              <div className="text-sm text-gray-500">Company Income Tax returns for 2022</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Tax Documents
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">1.2 MB</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Dec 20, 2023</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            <div className="w-1.5 h-1.5 bg-red-500 rounded-full mr-1"></div>
                            Needs Attention
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <Button variant="ghost" size="sm" className="text-primary-600 hover:text-primary-900">
                            View
                          </Button>
                          <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900 ml-2">
                            <MoreHorizontalIcon className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>

                      {/* Financial Reports */}
                      <tr className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <FileTextIcon className="h-5 w-5 text-gray-400 mr-3" />
                            <div>
                              <div className="text-sm font-medium text-gray-900">P&L_Q4_2023.pdf</div>
                              <div className="text-sm text-gray-500">Profit & Loss statement for Q4 2023</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                            Financial Reports
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">645 KB</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Jan 05, 2024</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1"></div>
                            Approved
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <Button variant="ghost" size="sm" className="text-primary-600 hover:text-primary-900">
                            View
                          </Button>
                          <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900 ml-2">
                            <MoreHorizontalIcon className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>

                      <tr className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <FileTextIcon className="h-5 w-5 text-gray-400 mr-3" />
                            <div>
                              <div className="text-sm font-medium text-gray-900">Balance_Sheet_2023.xlsx</div>
                              <div className="text-sm text-gray-500">Balance sheet for fiscal year 2023</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                            Financial Reports
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">1.1 MB</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Dec 28, 2023</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                            <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mr-1"></div>
                            Pending Review
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <Button variant="ghost" size="sm" className="text-primary-600 hover:text-primary-900">
                            View
                          </Button>
                          <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900 ml-2">
                            <MoreHorizontalIcon className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>

                      <tr className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <FileTextIcon className="h-5 w-5 text-gray-400 mr-3" />
                            <div>
                              <div className="text-sm font-medium text-gray-900">Access_Oct2023.pdf</div>
                              <div className="text-sm text-gray-500">Access Bank statement for October 2023</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            Bank Statements
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">2.1 MB</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Oct 31, 2023</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1"></div>
                            Approved
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <Button variant="ghost" size="sm" className="text-primary-600 hover:text-primary-900">
                            View
                          </Button>
                          <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900 ml-2">
                            <MoreHorizontalIcon className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>

                      <tr className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <FileTextIcon className="h-5 w-5 text-gray-400 mr-3" />
                            <div>
                              <div className="text-sm font-medium text-gray-900">PAYE_Schedule.xlsx</div>
                              <div className="text-sm text-gray-500">Pay As You Earn tax schedule</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Tax Documents
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">423 KB</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Nov 15, 2023</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1"></div>
                            Approved
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <Button variant="ghost" size="sm" className="text-primary-600 hover:text-primary-900">
                            View
                          </Button>
                          <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900 ml-2">
                            <MoreHorizontalIcon className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>

                      <tr className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <FileTextIcon className="h-5 w-5 text-gray-400 mr-3" />
                            <div>
                              <div className="text-sm font-medium text-gray-900">UBA_Sep2023.pdf</div>
                              <div className="text-sm text-gray-500">UBA Bank statement for September 2023</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            Bank Statements
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">1.9 MB</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Sep 30, 2023</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1"></div>
                            Approved
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <Button variant="ghost" size="sm" className="text-primary-600 hover:text-primary-900">
                            View
                          </Button>
                          <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900 ml-2">
                            <MoreHorizontalIcon className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>

                      <tr className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <FileTextIcon className="h-5 w-5 text-gray-400 mr-3" />
                            <div>
                              <div className="text-sm font-medium text-gray-900">Inventory_Report_Q3.xlsx</div>
                              <div className="text-sm text-gray-500">Quarterly inventory and stock report</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                            Financial Reports
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">892 KB</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Oct 15, 2023</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                            <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mr-1"></div>
                            Pending Review
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <Button variant="ghost" size="sm" className="text-primary-600 hover:text-primary-900">
                            View
                          </Button>
                          <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900 ml-2">
                            <MoreHorizontalIcon className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                {/* Pagination */}
                <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
                  <div className="flex items-center text-sm text-gray-700">
                    <span>Showing</span>
                    <select className="mx-2 border border-gray-300 rounded px-2 py-1 text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                      <option>8</option>
                      <option selected>10</option>
                      <option>20</option>
                      <option>50</option>
                    </select>
                    <span>of 47 documents</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" className="px-3 py-1.5" disabled>
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                      <span className="ml-1">Previous</span>
                    </Button>
                    
                    <div className="flex items-center space-x-1">
                      <Button size="sm" className="w-8 h-8 p-0 bg-primary-600 text-white">1</Button>
                      <Button variant="outline" size="sm" className="w-8 h-8 p-0">2</Button>
                      <Button variant="outline" size="sm" className="w-8 h-8 p-0">3</Button>
                      <Button variant="outline" size="sm" className="w-8 h-8 p-0">4</Button>
                      <Button variant="outline" size="sm" className="w-8 h-8 p-0">5</Button>
                      <span className="px-2 text-gray-500">...</span>
                      <Button variant="outline" size="sm" className="w-8 h-8 p-0">12</Button>
                    </div>
                    
                    <Button variant="outline" size="sm" className="px-3 py-1.5">
                      <span className="mr-1">Next</span>
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )
      
      case 'profile':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">SME Profile</h2>
                <p className="text-gray-600">Manage your company profile and business information</p>
              </div>
              <Button size="sm">
                Edit Profile
              </Button>
            </div>
            
            {/* Profile Overview */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start space-x-6">
                  <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold text-primary-600">
                      {companyName.charAt(0)}
                    </span>
                  </div>
                  
                  <div className="flex-1">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">
                      {companyName}
                    </h1>
                    <p className="text-lg text-primary-600 mb-2">Technology Company</p>
                    <p className="text-gray-600 mb-4">
                      A growing technology company focused on innovative solutions for small and medium businesses.
                    </p>
                    
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <BuildingIcon className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600">₦5B - ₦10B Revenue</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <UsersIcon className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600">26-50 Employees</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CalendarIcon className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600">5+ Years in Business</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Company Information */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Company Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Legal Company Name</label>
                    <p className="text-sm text-gray-900 mt-1">{companyName}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Industry</label>
                    <p className="text-sm text-gray-900 mt-1">Technology</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Revenue Range</label>
                    <p className="text-sm text-gray-900 mt-1">₦5B - ₦10B</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Number of Employees</label>
                    <p className="text-sm text-gray-900 mt-1">26-50</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Years in Business</label>
                    <p className="text-sm text-gray-900 mt-1">5+ years</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Location</label>
                    <p className="text-sm text-gray-900 mt-1">Lagos, Nigeria</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Primary Contact</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Contact Person</label>
                    <p className="text-sm text-gray-900 mt-1">John Smith</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Job Title</label>
                    <p className="text-sm text-gray-900 mt-1">CEO & Founder</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Email</label>
                    <p className="text-sm text-gray-900 mt-1">{email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Phone</label>
                    <p className="text-sm text-gray-900 mt-1">+234 801 234 5678</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Financial Challenges & Goals */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Financial Challenges & Goals</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Current Financial Challenges</label>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-red-100 text-red-800 text-sm rounded-full">Cash flow management</span>
                      <span className="px-3 py-1 bg-red-100 text-red-800 text-sm rounded-full">Financial planning & budgeting</span>
                      <span className="px-3 py-1 bg-red-100 text-red-800 text-sm rounded-full">Fundraising & investment</span>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">CFO Support Areas Needed</label>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">Financial planning & budgeting</span>
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">Cash flow management</span>
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">Fundraising & capital raising</span>
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">Financial reporting & analysis</span>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Preferred Engagement Duration</label>
                    <p className="text-sm text-gray-900 mt-1">6-12 months</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Communication Preferences */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Communication Preferences</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Preferred Communication Methods</label>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">Email</span>
                      <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">Video calls</span>
                      <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">In-person meetings</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )
      
      case 'transactions':
        return (
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <CreditCardIcon className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Total Transactions</p>
                      <p className="text-xl font-bold text-gray-900">2,139</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <CheckCircleIcon className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Categorized</p>
                      <p className="text-xl font-bold text-gray-900">1,987</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-yellow-100 rounded-lg">
                      <ClockIcon className="h-5 w-5 text-yellow-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Pending Review</p>
                      <p className="text-xl font-bold text-gray-900">152</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-purple-100 rounded-lg">
                       <DollarSignIcon className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">This Month</p>
                      <p className="text-xl font-bold text-gray-900">₦2.4M</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-3 lg:space-y-0 lg:space-x-4">
              <div className="flex flex-col md:flex-row md:items-center space-y-3 md:space-y-0 md:space-x-4">
                <div className="flex-1 max-w-md">
                  <div className="relative">
                    <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search transactions..."
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Button variant="outline" className="px-4 py-2 h-10 bg-white border-gray-300 text-gray-700 hover:bg-gray-50 justify-between min-w-[140px]">
                    <span>All Categories</span>
                    <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </Button>
                  <Button variant="outline" className="px-4 py-2 h-10 bg-white border-gray-300 text-gray-700 hover:bg-gray-50 justify-between min-w-[120px]">
                    <span>All Status</span>
                    <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </Button>
                  <Button variant="outline" className="w-10 h-10 p-0 bg-white border-gray-300 hover:bg-gray-50 flex items-center justify-center">
                    <FilterIcon className="h-4 w-4 text-gray-600" />
                  </Button>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Button
                  onClick={() => onNavigate('bank-connection', accountType, email)}
                  className="flex items-center space-x-2 h-10"
                >
                  <LinkIcon className="h-4 w-4" />
                  <span>Connect Bank</span>
                </Button>
              </div>
            </div>
            
            {/* Transactions Table */}
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Transaction
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Amount
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Category
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <CreditCardIcon className="h-5 w-5 text-gray-400 mr-3" />
                            <div>
                              <div className="text-sm font-medium text-gray-900">Office Supplies - Staples</div>
                              <div className="text-sm text-gray-500">GTBank Current Account</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-red-600">-₦45,000</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            Office Expenses
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Dec 15, 2024</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Categorized
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreHorizontalIcon className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <CreditCardIcon className="h-5 w-5 text-gray-400 mr-3" />
                            <div>
                              <div className="text-sm font-medium text-gray-900">Client Payment - ABC Corp</div>
                              <div className="text-sm text-gray-500">Zenith Bank Savings Account</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-green-600">+₦250,000</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Revenue
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Dec 14, 2024</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Categorized
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreHorizontalIcon className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        )
      
      case 'expenses':
        return (
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <ReceiptIcon className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Expenses</p>
                      <p className="text-xl font-bold text-gray-900">₦275,000</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <CheckCircleIcon className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Categorized</p>
                      <p className="text-xl font-bold text-gray-900">18</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-yellow-100 rounded-lg">
                      <ClockIcon className="h-5 w-5 text-yellow-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Pending Review</p>
                      <p className="text-xl font-bold text-gray-900">5</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <CalendarIcon className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">This Month</p>
                      <p className="text-xl font-bold text-gray-900">₦125,000</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center flex-1">
                <div className="relative flex-1 max-w-md">
                  <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Search expenses..."
                    className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex items-center space-x-2">
                     <span>All Categories</span>
                   </Button>
                   <Button variant="outline" size="sm" className="flex items-center space-x-2">
                     <span>All Status</span>
                   </Button>
                  <Button variant="outline" size="sm">
                    <FilterIcon className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <Button 
                className="flex items-center space-x-2"
                onClick={() => setIsExpenseModalOpen(true)}
              >
                <ReceiptIcon className="h-4 w-4" />
                <span>Upload Receipt</span>
              </Button>
            </div>

            {/* Expenses Table */}
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Expense
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Amount
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Category
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {mockExpenses.map((expense) => {
                        const getStatusColor = (status: string) => {
                          switch (status) {
                            case 'pending':
                              return 'bg-yellow-100 text-yellow-800';
                            case 'categorized':
                              return 'bg-green-100 text-green-800';
                            case 'approved':
                              return 'bg-blue-100 text-blue-800';
                            case 'rejected':
                              return 'bg-red-100 text-red-800';
                            default:
                              return 'bg-gray-100 text-gray-800';
                          }
                        };

                        const getCategoryColor = (category: string) => {
                          switch (category.toLowerCase()) {
                            case 'office expenses':
                              return 'bg-blue-100 text-blue-800';
                            case 'travel':
                              return 'bg-purple-100 text-purple-800';
                            case 'meals':
                              return 'bg-orange-100 text-orange-800';
                            default:
                              return 'bg-gray-100 text-gray-800';
                          }
                        };

                        return (
                          <tr 
                            key={expense.id} 
                            className="hover:bg-gray-50 cursor-pointer"
                            onClick={() => {
                              setSelectedExpense(expense);
                              setIsExpenseDetailOpen(true);
                            }}
                          >
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <ReceiptIcon className="h-5 w-5 text-gray-400 mr-3" />
                                <div>
                                  <div className="text-sm font-medium text-gray-900">{expense.title}</div>
                                  <div className="text-sm text-gray-500">Receipt #{expense.receiptNumber}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-red-600">₦{expense.amount.toLocaleString()}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(expense.category)}`}>
                                {expense.category}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{expense.date}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(expense.status)}`}>
                                {expense.status.charAt(0).toUpperCase() + expense.status.slice(1)}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-8 w-8 p-0"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  // Handle action menu
                                }}
                              >
                                <MoreHorizontalIcon className="h-4 w-4" />
                              </Button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        )
      
      case 'messages':
        return (
          <div className="flex h-full">
            {/* CFO List Sidebar */}
            <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
              
              <div className="flex-1 overflow-y-auto">
                {[
                  { name: 'Sarah (Bookkeeper)', role: 'Bookkeeper', status: 'online', avatar: 'SK', lastMessage: 'I\'ve reviewed your November transactions...', time: '2h ago', unread: true },
                  { name: 'Michael (CFO)', role: 'Chief Financial Officer', status: 'away', avatar: 'MJ', lastMessage: 'Let\'s schedule a call to discuss...', time: '1d ago', unread: false },
                  { name: 'Lisa (Tax Advisor)', role: 'Tax Advisor', status: 'offline', avatar: 'LT', lastMessage: 'The Q4 tax planning looks good', time: '3d ago', unread: false }
                ].map((cfo) => (
                  <div key={cfo.name} className="p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer">
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
                          {cfo.avatar}
                        </div>
                        <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                          cfo.status === 'online' ? 'bg-green-500' : 
                          cfo.status === 'away' ? 'bg-yellow-500' : 'bg-gray-400'
                        }`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-gray-900 truncate">{cfo.name}</p>
                          <span className="text-xs text-gray-500">{cfo.time}</span>
                        </div>
                        <p className="text-xs text-gray-500 truncate">{cfo.role}</p>
                        <p className="text-xs text-gray-600 truncate mt-1">{cfo.lastMessage}</p>
                      </div>
                      {cfo.unread && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chat Interface */}
            <div className="flex-1 flex flex-col">
              {/* Chat Header */}
              <div className="p-4 border-b border-gray-200 bg-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
                        SK
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">Sarah (Bookkeeper)</h3>
                      <p className="text-xs text-gray-500">Bookkeeper • Online</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <CalendarIcon className="h-4 w-4 mr-1" />
                      Schedule Call
                    </Button>
                  </div>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                {/* Sample messages */}
                <div className="flex justify-start">
                  <div className="max-w-xs lg:max-w-md">
                    <div className="bg-white rounded-lg p-3 shadow-sm">
                      <p className="text-sm text-gray-900">Hi! I've reviewed your November transactions. I have a few questions about some expense categories. Could you clarify the ₦45,000 payment to Staples?</p>
                      <p className="text-xs text-gray-500 mt-1">2:30 PM</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <div className="max-w-xs lg:max-w-md">
                    <div className="bg-blue-500 rounded-lg p-3 shadow-sm">
                      <p className="text-sm text-white">That was for office supplies - printer paper, folders, and stationery for the team. I can upload the receipt if needed.</p>
                      <p className="text-xs text-blue-100 mt-1">2:32 PM</p>
                    </div>
                  </div>
                </div>

                {/* Document sharing example */}
                <div className="flex justify-start">
                  <div className="max-w-xs lg:max-w-md">
                    <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm">
                      <div className="flex items-center space-x-2">
                        <FileTextIcon className="h-5 w-5 text-blue-500" />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">November_Expense_Report.pdf</p>
                          <p className="text-xs text-gray-500">2.4 MB</p>
                        </div>
                        <Button size="sm" variant="outline">Download</Button>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">2:35 PM</p>
                    </div>
                  </div>
                </div>

                {/* Voice memo example */}
                <div className="flex justify-end">
                  <div className="max-w-xs lg:max-w-md">
                    <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <PlayIcon className="h-4 w-4 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">Voice Message</p>
                          <div className="flex items-center space-x-2">
                            <div className="flex-1 bg-gray-200 rounded-full h-1">
                              <div className="bg-blue-500 h-1 rounded-full" style={{ width: '60%' }}></div>
                            </div>
                            <span className="text-xs text-gray-500">1:23</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">2:40 PM</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Message Input */}
              <div className="p-4 bg-white border-t border-gray-200">
                <div className="flex items-center space-x-2">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      placeholder="Type your message..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <Button size="sm" variant="outline" className="p-2">
                    <PaperclipIcon className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline" className="p-2">
                    <MicIcon className="h-4 w-4" />
                  </Button>
                  <Button size="sm">
                    Send
                  </Button>
                </div>
                <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                  <span>Press Enter to send, Shift + Enter for new line</span>
                  <span>📎 Attach files • 🎤 Voice memo</span>
                </div>
              </div>
            </div>
          </div>
        )
      
      case 'financials':
        return (
          <div className="space-y-6">
            {/* Financial Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <DollarSignIcon className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Net Income</p>
                      <p className="text-2xl font-bold text-gray-900">₦485,000</p>
                      <p className="text-sm text-green-600">+12.5% from last month</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <TrendingUpIcon className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Revenue</p>
                      <p className="text-2xl font-bold text-gray-900">₦2.5M</p>
                      <p className="text-sm text-blue-600">+8.3% from last month</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-orange-100 rounded-lg">
                      <ReceiptIcon className="h-6 w-6 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Total Expenses</p>
                      <p className="text-2xl font-bold text-gray-900">₦2.02M</p>
                      <p className="text-sm text-orange-600">+5.1% from last month</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <BarChart3Icon className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Profit Margin</p>
                      <p className="text-2xl font-bold text-gray-900">19.4%</p>
                      <p className="text-sm text-purple-600">+2.1% from last month</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Financial Reports Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Profit & Loss */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Profit & Loss</h3>
                    <Button variant="outline" size="sm">View Full Report</Button>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Revenue</span>
                      <span className="text-sm font-medium text-gray-900">₦2,500,000</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Cost of Goods Sold</span>
                      <span className="text-sm font-medium text-gray-900">₦1,200,000</span>
                    </div>
                    <div className="flex justify-between items-center border-t pt-2">
                      <span className="text-sm font-medium text-gray-900">Gross Profit</span>
                      <span className="text-sm font-medium text-gray-900">₦1,300,000</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Operating Expenses</span>
                      <span className="text-sm font-medium text-gray-900">₦815,000</span>
                    </div>
                    <div className="flex justify-between items-center border-t pt-2">
                      <span className="text-sm font-semibold text-gray-900">Net Income</span>
                      <span className="text-sm font-semibold text-green-600">₦485,000</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Cash Flow */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Cash Flow</h3>
                    <Button variant="outline" size="sm">View Details</Button>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Operating Activities</span>
                      <span className="text-sm font-medium text-green-600">+₦520,000</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Investing Activities</span>
                      <span className="text-sm font-medium text-red-600">-₦150,000</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Financing Activities</span>
                      <span className="text-sm font-medium text-red-600">-₦80,000</span>
                    </div>
                    <div className="flex justify-between items-center border-t pt-2">
                      <span className="text-sm font-semibold text-gray-900">Net Cash Flow</span>
                      <span className="text-sm font-semibold text-green-600">+₦290,000</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Cash Balance</span>
                      <span className="text-sm font-medium text-gray-900">₦1,850,000</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Balance Sheet Summary */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Balance Sheet Summary</h3>
                  <Button variant="outline" size="sm">View Full Balance Sheet</Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-3">Assets</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Current Assets</span>
                        <span className="text-sm font-medium">₦2,100,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Fixed Assets</span>
                        <span className="text-sm font-medium">₦1,500,000</span>
                      </div>
                      <div className="flex justify-between border-t pt-2">
                        <span className="text-sm font-semibold">Total Assets</span>
                        <span className="text-sm font-semibold">₦3,600,000</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-3">Liabilities</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Current Liabilities</span>
                        <span className="text-sm font-medium">₦800,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Long-term Debt</span>
                        <span className="text-sm font-medium">₦1,200,000</span>
                      </div>
                      <div className="flex justify-between border-t pt-2">
                        <span className="text-sm font-semibold">Total Liabilities</span>
                        <span className="text-sm font-semibold">₦2,000,000</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-3">Equity</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Owner's Equity</span>
                        <span className="text-sm font-medium">₦1,115,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Retained Earnings</span>
                        <span className="text-sm font-medium">₦485,000</span>
                      </div>
                      <div className="flex justify-between border-t pt-2">
                        <span className="text-sm font-semibold">Total Equity</span>
                        <span className="text-sm font-semibold">₦1,600,000</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Financial Ratios */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Financial Ratios</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Current Ratio</p>
                    <p className="text-xl font-bold text-gray-900">2.63</p>
                    <p className="text-xs text-green-600">Healthy</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Debt-to-Equity</p>
                    <p className="text-xl font-bold text-gray-900">1.25</p>
                    <p className="text-xs text-yellow-600">Moderate</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">ROE</p>
                    <p className="text-xl font-bold text-gray-900">30.3%</p>
                    <p className="text-xs text-green-600">Excellent</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Gross Margin</p>
                    <p className="text-xl font-bold text-gray-900">52.0%</p>
                    <p className="text-xs text-green-600">Strong</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )
      
      case 'cfo':
        return (
          <div className="space-y-6">
            {/* CFO Services Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white">
              <h2 className="text-2xl font-bold mb-2">CFO Services</h2>
              <p className="text-blue-100">Connect with expert fractional CFOs to accelerate your business growth</p>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="p-3 bg-blue-100 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                    <UsersIcon className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Find a CFO</h3>
                  <p className="text-gray-600 text-sm mb-4">Get matched with expert CFOs based on your specific needs</p>
                  <Button className="w-full" onClick={() => setIsCFORequestWizardOpen(true)}>
                    Start Matching Process
                  </Button>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="p-3 bg-green-100 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                    <CalendarIcon className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Schedule Call</h3>
                  <p className="text-gray-600 text-sm mb-4">Book a chemistry call with recommended CFOs</p>
                  <Button variant="outline" className="w-full">
                    View Available Slots
                  </Button>
                </CardContent>
              </Card>


            </div>

            {/* Active Engagements */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Active Engagements</h3>
                  <Button variant="outline" size="sm">
                    View All
                  </Button>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                      JD
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">John Davis, CPA</h4>
                      <p className="text-sm text-gray-600">Financial Planning & Analysis</p>
                      <div className="flex items-center space-x-4 mt-2">
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Active</span>
                        <span className="text-xs text-gray-500">Started 2 weeks ago</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">₦150,000/month</p>
                      <p className="text-xs text-gray-500">Next meeting: Tomorrow 2PM</p>
                    </div>
                  </div>
                  
                  <div className="text-center py-8 text-gray-500">
                    <BuildingIcon className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                    <p>No other active engagements</p>
                    <Button variant="link" className="mt-2">
                      Find more CFOs
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Request History */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Recent Requests</h3>
                  <Button variant="outline" size="sm">
                    View History
                  </Button>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">Fundraising Strategy</p>
                      <p className="text-sm text-gray-600">Requested 1 week ago</p>
                    </div>
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">Matched</span>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">Financial Modeling</p>
                      <p className="text-sm text-gray-600">Requested 3 weeks ago</p>
                    </div>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Completed</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recommended CFOs */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommended CFOs</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                        SM
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">Sarah Mitchell</h4>
                        <p className="text-sm text-gray-600">M&A Specialist</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 mb-3">
                      <div className="flex text-yellow-400">
                        {'★'.repeat(5)}
                      </div>
                      <span className="text-sm text-gray-600">(4.9)</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">Expert in mergers, acquisitions, and strategic partnerships</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-900">₦200,000/month</span>
                      <Button size="sm">
                        View Profile
                      </Button>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-semibold">
                        MR
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">Michael Roberts</h4>
                        <p className="text-sm text-gray-600">Tech CFO</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 mb-3">
                      <div className="flex text-yellow-400">
                        {'★'.repeat(5)}
                      </div>
                      <span className="text-sm text-gray-600">(4.8)</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">Specializes in SaaS metrics and venture capital</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-900">₦180,000/month</span>
                      <Button size="sm">
                        View Profile
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )
      
      default:
        return (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="p-4 bg-gray-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                {navigationModules.find(m => m.id === activeModule)?.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {navigationModules.find(m => m.id === activeModule)?.name}
              </h3>
              <p className="text-gray-600">
                {navigationModules.find(m => m.id === activeModule)?.description}
              </p>
              <p className="text-sm text-gray-500 mt-2">This module is coming soon.</p>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gray-25 flex">
      {/* Sidebar Navigation */}
      <div className="w-64 bg-primary-600 border-r border-primary-700 flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-primary-700">
          <div className="flex justify-center">
            <div className="w-40 h-8">
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
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 p-4 space-y-2">
          {navigationModules.map((module) => (
            <button
              key={module.id}
              onClick={() => setActiveModule(module.id)}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                activeModule === module.id
                  ? 'bg-primary-500 text-white border border-primary-400'
                  : 'text-primary-100 hover:bg-primary-500 hover:text-white'
              }`}
            >
              {module.icon}
              <span className="font-medium">{module.name}</span>
            </button>
          ))}
        </nav>

        {/* User Menu */}
        <div className="p-4 border-t border-primary-700">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-8 h-8 bg-primary-400 rounded-full flex items-center justify-center">
              <span className="text-sm font-semibold text-white">
                {companyName.charAt(0)}
              </span>
            </div>
            <div>
              <p className="text-sm font-medium text-white">{companyName}</p>
              <p className="text-xs text-primary-100">{email}</p>
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            className="w-full text-primary-100 hover:bg-primary-500 hover:text-white justify-start"
            onClick={() => onNavigate('sign-in')}
          >
            <LogOutIcon className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {navigationModules.find(m => m.id === activeModule)?.name}
              </h2>
              <p className="text-sm text-gray-600">
                {navigationModules.find(m => m.id === activeModule)?.description}
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" className="w-[42px] h-[42px] p-0 flex items-center justify-center">
                <BellIcon className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-auto">
          {getModuleContent()}
        </main>
      </div>

      {/* Add Expense Modal */}
      <Modal
        isOpen={isExpenseModalOpen}
        onClose={() => {
          setIsExpenseModalOpen(false)
          setExpenseForm({
            amount: '',
            category: '',
            description: '',
            date: new Date().toISOString().split('T')[0],
            receipt: null
          })
        }}
        title="Add New Expense"
        size="lg"
      >
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Amount */}
            <div>
              <Label htmlFor="amount">Amount (₦)</Label>
              <Input
                id="amount"
                type="number"
                placeholder="0.00"
                value={expenseForm.amount}
                onChange={(e) => setExpenseForm(prev => ({ ...prev, amount: e.target.value }))}
                className="mt-1"
              />
            </div>

            {/* Category */}
            <div>
              <Label htmlFor="category">Category</Label>
              <Select
                 value={expenseForm.category}
                 onChange={(value) => setExpenseForm(prev => ({ ...prev, category: value }))}
                 options={[
                   { value: 'office-expenses', label: 'Office Expenses' },
                   { value: 'travel-transport', label: 'Travel & Transport' },
                   { value: 'utilities', label: 'Utilities' },
                   { value: 'marketing', label: 'Marketing' },
                   { value: 'meals-entertainment', label: 'Meals & Entertainment' },
                   { value: 'professional-services', label: 'Professional Services' },
                   { value: 'other', label: 'Other' }
                 ]}
                 placeholder="Select category"
                 className="mt-1"
               />
            </div>
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              placeholder="Enter expense description"
              value={expenseForm.description}
              onChange={(e) => setExpenseForm(prev => ({ ...prev, description: e.target.value }))}
              className="mt-1"
            />
          </div>

          {/* Date */}
          <div>
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              value={expenseForm.date}
              onChange={(e) => setExpenseForm(prev => ({ ...prev, date: e.target.value }))}
              className="mt-1"
            />
          </div>

          {/* Receipt Upload */}
          <div>
            <Label htmlFor="receipt">Receipt (Optional)</Label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-gray-400 transition-colors">
              <div className="space-y-1 text-center">
                <UploadIcon className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600">
                  <label
                    htmlFor="receipt-upload"
                    className="relative cursor-pointer bg-white rounded-md font-medium text-primary-600 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500"
                  >
                    <span>Upload a file</span>
                    <input
                      id="receipt-upload"
                      name="receipt-upload"
                      type="file"
                      accept="image/*,.pdf"
                      className="sr-only"
                      onChange={(e) => {
                        const file = e.target.files?.[0] || null
                        setExpenseForm(prev => ({ ...prev, receipt: file }))
                      }}
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">PNG, JPG, PDF up to 10MB</p>
                {expenseForm.receipt && (
                  <p className="text-sm text-green-600 mt-2">
                    Selected: {expenseForm.receipt.name}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-4">
            <Button
              variant="outline"
              onClick={() => {
                setIsExpenseModalOpen(false)
                setExpenseForm({
                  amount: '',
                  category: '',
                  description: '',
                  date: new Date().toISOString().split('T')[0],
                  receipt: null
                })
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                // Handle form submission
                console.log('Submitting expense:', expenseForm)
                // In a real app, this would submit to the backend
                setIsExpenseModalOpen(false)
                setExpenseForm({
                  amount: '',
                  category: '',
                  description: '',
                  date: new Date().toISOString().split('T')[0],
                  receipt: null
                })
              }}
              disabled={!expenseForm.amount || !expenseForm.category || !expenseForm.description}
            >
              Add Expense
            </Button>
          </div>
        </div>
      </Modal>

      {/* Expense Detail Modal */}
      {selectedExpense && (
        <ExpenseDetail
          expense={selectedExpense}
          isOpen={isExpenseDetailOpen}
          onClose={() => {
            setIsExpenseDetailOpen(false);
            setSelectedExpense(null);
          }}
          onEdit={(expense) => {
            // Handle edit functionality
            console.log('Edit expense:', expense);
          }}
          onDelete={(expenseId) => {
            // Handle delete functionality
            console.log('Delete expense:', expenseId);
            setIsExpenseDetailOpen(false);
            setSelectedExpense(null);
          }}
          onDownloadReceipt={(expense) => {
            // Handle receipt download
            console.log('Download receipt for:', expense.title);
          }}
        />
      )}
      
      {/* CFO Request Wizard */}
      <CFORequestWizard
        isOpen={isCFORequestWizardOpen}
        onClose={() => setIsCFORequestWizardOpen(false)}
        onSubmit={(data: CFORequestData) => {
          console.log('CFO Request submitted:', data)
          // Here you would typically send the data to your API
          // For now, we'll just log it and show a success message
          alert('CFO request submitted successfully! We will match you with suitable CFOs within 24 hours.')
        }}
      />
    </div>
  )
}

export default SmeMainDashboard
