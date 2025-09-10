import React, { useState } from 'react'
import { 
  ArrowLeft,
  DollarSign,
  Calendar,
  CheckCircle,
  Clock,
  AlertTriangle,
  Eye,
  Download,
  Filter,
  Search,
  Users,
  FileText,
  TrendingUp,
  User,
  Settings,
  HomeIcon,
  UsersIcon,
  FileTextIcon,
  DollarSignIcon,
  TrendingUpIcon,
  UserIcon,
  SettingsIcon,
  BellIcon,
  LogOutIcon
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Select } from '../components/ui/select'
import { Badge } from '../components/ui/badge'
import { Avatar } from '../components/ui/avatar'
import CFOSidebar from '../components/CFOSidebar'

interface Invoice {
  id: string
  invoiceNumber: string
  clientName: string
  clientAvatar: string
  projectName: string
  amount: number
  issueDate: string
  dueDate: string
  paidDate?: string
  status: 'paid' | 'pending' | 'overdue' | 'draft'
  paymentMethod?: string
  description: string
}

type Page = 'sign-in' | 'sign-up' | 'create-account' | 'email-verification' | 'verification-success' | 'onboarding' | 'onboarding-success' | 'sme-dashboard' | 'sme-main-dashboard' | 'upload-center' | 'bank-connection' | 'enhanced-upload' | 'cfo-dashboard' | 'cfo-client-management' | 'cfo-client-workspace' | 'projects-tasks' | 'invoice-tracking'

interface InvoiceTrackingProps {
  onNavigate: (page: Page, accountType?: 'sme' | 'cfo', email?: string) => void
  accountType: string
  email: string
}

const InvoiceTracking: React.FC<InvoiceTrackingProps> = ({ onNavigate, accountType, email }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null)

  // Sample invoice data
  const invoices: Invoice[] = [
    {
      id: '1',
      invoiceNumber: 'INV-2024-001',
      clientName: 'TechStart Solutions',
      clientAvatar: 'TS',
      projectName: 'Financial Audit & Compliance Review',
      amount: 2500000,
      issueDate: '2024-11-15',
      dueDate: '2024-12-15',
      paidDate: '2024-12-10',
      status: 'paid',
      paymentMethod: 'Bank Transfer',
      description: 'Comprehensive financial audit and compliance review for Q3 2024'
    },
    {
      id: '2',
      invoiceNumber: 'INV-2024-002',
      clientName: 'GrowthCorp Ltd',
      clientAvatar: 'GC',
      projectName: 'Cash Flow Optimization Strategy',
      amount: 1800000,
      issueDate: '2024-12-01',
      dueDate: '2024-12-31',
      status: 'pending',
      description: 'Strategic cash flow analysis and optimization recommendations'
    },
    {
      id: '3',
      invoiceNumber: 'INV-2024-003',
      clientName: 'InnovateTech',
      clientAvatar: 'IT',
      projectName: 'Investment Readiness Assessment',
      amount: 3200000,
      issueDate: '2024-11-20',
      dueDate: '2024-12-05',
      status: 'overdue',
      description: 'Complete investment readiness assessment and financial modeling'
    },
    {
      id: '4',
      invoiceNumber: 'INV-2024-004',
      clientName: 'ScaleUp Ventures',
      clientAvatar: 'SV',
      projectName: 'Financial Planning & Analysis',
      amount: 2100000,
      issueDate: '2024-12-10',
      dueDate: '2025-01-10',
      status: 'draft',
      description: 'Quarterly financial planning and analysis services'
    }
  ]

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0
    }).format(amount)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'overdue': return 'bg-red-100 text-red-800'
      case 'draft': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid': return <CheckCircle className="h-4 w-4" />
      case 'pending': return <Clock className="h-4 w-4" />
      case 'overdue': return <AlertTriangle className="h-4 w-4" />
      case 'draft': return <FileText className="h-4 w-4" />
      default: return <Clock className="h-4 w-4" />
    }
  }

  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = invoice.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || invoice.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const totalRevenue = invoices.filter(inv => inv.status === 'paid').reduce((sum, inv) => sum + inv.amount, 0)
  const pendingAmount = invoices.filter(inv => inv.status === 'pending').reduce((sum, inv) => sum + inv.amount, 0)
  const overdueAmount = invoices.filter(inv => inv.status === 'overdue').reduce((sum, inv) => sum + inv.amount, 0)

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <CFOSidebar 
        onNavigate={onNavigate}
        accountType={accountType as 'cfo'}
        email={email}
        activePage="invoice-tracking"
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Payments</h2>
              <p className="text-sm text-gray-600">Track payments received for completed projects</p>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" className="w-[42px] h-[42px] p-0 flex items-center justify-center">
                <BellIcon className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="sm">
                <SettingsIcon className="w-4 h-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto">
            {/* Summary Cards */}
            <div className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                    <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalRevenue)}</p>
                  </div>
                  <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Pending Payments</p>
                    <p className="text-2xl font-bold text-gray-900">{formatCurrency(pendingAmount)}</p>
                  </div>
                  <div className="h-12 w-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <Clock className="h-6 w-6 text-yellow-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Overdue Amount</p>
                    <p className="text-2xl font-bold text-gray-900">{formatCurrency(overdueAmount)}</p>
                  </div>
                  <div className="h-12 w-12 bg-red-100 rounded-lg flex items-center justify-center">
                    <AlertTriangle className="h-6 w-6 text-red-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Invoices</p>
                    <p className="text-2xl font-bold text-gray-900">{invoices.length}</p>
                  </div>
                  <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <FileText className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters and Search */}
          <div className="mb-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    placeholder="Search invoices, clients, or projects..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="w-full sm:w-48">
                <Select
                  value={statusFilter}
                  onChange={setStatusFilter}
                  placeholder="Filter by status"
                  options={[
                    { value: 'all', label: 'All Status' },
                    { value: 'paid', label: 'Paid' },
                    { value: 'pending', label: 'Pending' },
                    { value: 'overdue', label: 'Overdue' },
                    { value: 'draft', label: 'Draft' }
                  ]}
                />
              </div>
            </div>
          </div>

          {/* Invoice List */}
          <Card>
            <CardHeader>
              <CardTitle>Invoices</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredInvoices.map((invoice) => (
                  <div key={invoice.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">

                        <div>
                          <div className="flex items-center space-x-2">
                            <h3 className="font-medium text-gray-900">{invoice.invoiceNumber}</h3>
                            <Badge className={`${getStatusColor(invoice.status)} flex items-center space-x-1`}>
                              {getStatusIcon(invoice.status)}
                              <span className="capitalize">{invoice.status}</span>
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600">{invoice.clientName} • {invoice.projectName}</p>
                          <p className="text-xs text-gray-500 mt-1">{invoice.description}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">{formatCurrency(invoice.amount)}</p>
                        <p className="text-sm text-gray-600">Due: {new Date(invoice.dueDate).toLocaleDateString()}</p>
                        {invoice.paidDate && (
                          <p className="text-xs text-green-600">Paid: {new Date(invoice.paidDate).toLocaleDateString()}</p>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default InvoiceTracking