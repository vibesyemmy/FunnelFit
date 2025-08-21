import React, { useState } from 'react'
import { Button, Card, CardContent, Input } from '../components/ui'
import { 
  UsersIcon,
  SearchIcon,
  FilterIcon,
  PlusIcon,
  MessageSquareIcon,
  CalendarIcon,
  FileTextIcon,
  DollarSignIcon,
  ClockIcon,
  TrendingUpIcon,
  AlertCircleIcon,
  CheckCircleIcon,
  XCircleIcon,
  EyeIcon,
  MoreHorizontalIcon,
  PhoneIcon,
  MailIcon,
  BuildingIcon,
  StarIcon
} from 'lucide-react'

interface CfoClientManagementProps {
  onNavigate: (page: string, accountType?: 'sme' | 'cfo', email?: string) => void
  accountType: 'sme' | 'cfo'
  email: string
}

interface Client {
  id: number
  companyName: string
  contactPerson: string
  email: string
  phone: string
  industry: string
  engagementType: 'retainer' | 'project' | 'hourly'
  status: 'active' | 'pending' | 'completed' | 'paused'
  startDate: string
  monthlyValue: number
  hoursThisMonth: number
  totalHours: number
  nextMeeting: string
  priority: 'high' | 'medium' | 'low'
  satisfaction: number
  lastActivity: string
  notes: string
}

const CfoClientManagement: React.FC<CfoClientManagementProps> = ({ 
  onNavigate, 
  accountType, 
  email 
}) => {
  const [activeView, setActiveView] = useState('list')
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedClient, setSelectedClient] = useState<Client | null>(null)

  // Mock client data based on the workflow requirements
  const mockClients: Client[] = [
    {
      id: 1,
      companyName: "TechStart Solutions",
      contactPerson: "Sarah Johnson",
      email: "sarah@techstart.com",
      phone: "+1-555-0123",
      industry: "Technology/SaaS",
      engagementType: "retainer",
      status: "active",
      startDate: "2024-01-15",
      monthlyValue: 6000000,
      hoursThisMonth: 28,
      totalHours: 156,
      nextMeeting: "2024-12-18 14:00",
      priority: "high",
      satisfaction: 4.9,
      lastActivity: "Submitted Q4 forecast",
      notes: "Preparing for Series A fundraising. Focus on financial modeling and investor deck."
    },
    {
      id: 2,
      companyName: "Green Earth Co.",
      contactPerson: "Michael Chen",
      email: "m.chen@greenearth.com",
      phone: "+1-555-0456",
      industry: "Sustainability",
      engagementType: "project",
      status: "active",
      startDate: "2024-02-01",
      monthlyValue: 4250000,
      hoursThisMonth: 18,
      totalHours: 89,
      nextMeeting: "2024-12-20 10:00",
      priority: "medium",
      satisfaction: 4.7,
      lastActivity: "Completed cash flow analysis",
      notes: "M&A due diligence project. Timeline: 8 weeks. Target completion: Jan 2025."
    },
    {
      id: 3,
      companyName: "Retail Plus",
      contactPerson: "Jennifer Martinez",
      email: "j.martinez@retailplus.com",
      phone: "+1-555-0789",
      industry: "Retail",
      engagementType: "hourly",
      status: "pending",
      startDate: "2024-11-01",
      monthlyValue: 2100000,
      hoursThisMonth: 12,
      totalHours: 24,
      nextMeeting: "2024-12-16 16:00",
      priority: "low",
      satisfaction: 4.5,
      lastActivity: "Initial onboarding call",
      notes: "New client. Needs help with inventory management and cost optimization."
    },
    {
      id: 4,
      companyName: "HealthTech Innovations",
      contactPerson: "Dr. Robert Kim",
      email: "r.kim@healthtech.com",
      phone: "+1-555-0321",
      industry: "Healthcare",
      engagementType: "retainer",
      status: "completed",
      startDate: "2023-08-15",
      monthlyValue: 7500000,
      hoursThisMonth: 0,
      totalHours: 312,
      nextMeeting: "",
      priority: "high",
      satisfaction: 5.0,
      lastActivity: "Final report delivered",
      notes: "Successful IPO preparation completed. Engagement ended Nov 2024."
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-50 border-green-200'
      case 'pending': return 'text-yellow-600 bg-yellow-50 border-yellow-200'
      case 'completed': return 'text-blue-600 bg-blue-50 border-blue-200'
      case 'paused': return 'text-gray-600 bg-gray-50 border-gray-200'
      default: return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-red-500'
      case 'medium': return 'border-l-yellow-500'
      case 'low': return 'border-l-green-500'
      default: return 'border-l-gray-500'
    }
  }

  const getEngagementTypeColor = (type: string) => {
    switch (type) {
      case 'retainer': return 'text-purple-600 bg-purple-50'
      case 'project': return 'text-blue-600 bg-blue-50'
      case 'hourly': return 'text-orange-600 bg-orange-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  const filteredClients = mockClients.filter(client => {
    const matchesSearch = client.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.industry.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || client.status === statusFilter
    
    return matchesSearch && matchesStatus
  })

  const renderClientCard = (client: Client) => (
    <Card key={client.id} className={`border-l-4 ${getPriorityColor(client.priority)} hover:shadow-md transition-shadow`}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{client.companyName}</h3>
            <p className="text-sm text-gray-600">{client.contactPerson} • {client.industry}</p>
          </div>
          <div className="flex items-center space-x-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(client.status)}`}>
              {client.status.toUpperCase()}
            </span>
            <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
              <MoreHorizontalIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div>
            <p className="text-xs text-gray-500">Monthly Value</p>
            <p className="text-sm font-semibold text-gray-900">₦{client.monthlyValue.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Hours This Month</p>
            <p className="text-sm font-semibold text-gray-900">{client.hoursThisMonth}h</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Engagement Type</p>
            <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getEngagementTypeColor(client.engagementType)}`}>
              {client.engagementType.charAt(0).toUpperCase() + client.engagementType.slice(1)}
            </span>
          </div>
          <div>
            <p className="text-xs text-gray-500">Satisfaction</p>
            <div className="flex items-center space-x-1">
              <StarIcon className="h-3 w-3 text-yellow-500 fill-current" />
              <span className="text-sm font-semibold text-gray-900">{client.satisfaction}</span>
            </div>
          </div>
        </div>

        {client.nextMeeting && (
          <div className="flex items-center space-x-2 mb-3 text-sm text-gray-600">
            <CalendarIcon className="h-4 w-4" />
            <span>Next meeting: {new Date(client.nextMeeting).toLocaleDateString()} at {new Date(client.nextMeeting).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
          </div>
        )}

        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{client.notes}</p>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-xs text-gray-500">
            <span>Last activity: {client.lastActivity}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Button size="sm" variant="outline" className="h-8">
              <MessageSquareIcon className="h-3 w-3 mr-1" />
              Message
            </Button>
            <Button size="sm" variant="outline" className="h-8">
              <CalendarIcon className="h-3 w-3 mr-1" />
              Schedule
            </Button>
            <Button 
              size="sm" 
              className="h-8"
              onClick={() => setSelectedClient(client)}
            >
              <EyeIcon className="h-3 w-3 mr-1" />
              View
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  const renderClientDetails = () => {
    if (!selectedClient) return null

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Button variant="outline" onClick={() => setSelectedClient(null)}>
            ← Back to Client List
          </Button>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <PhoneIcon className="h-4 w-4 mr-2" />
              Call
            </Button>
            <Button variant="outline" size="sm">
              <MailIcon className="h-4 w-4 mr-2" />
              Email
            </Button>
            <Button size="sm">
              <MessageSquareIcon className="h-4 w-4 mr-2" />
              Message
            </Button>
          </div>
        </div>

        {/* Client Header */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
                  <BuildingIcon className="h-8 w-8 text-primary-600" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{selectedClient.companyName}</h1>
                  <p className="text-lg text-gray-600">{selectedClient.contactPerson}</p>
                  <p className="text-sm text-gray-500">{selectedClient.industry}</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(selectedClient.status)}`}>
                {selectedClient.status.toUpperCase()}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
              <div>
                <p className="text-sm text-gray-500">Monthly Value</p>
                <p className="text-xl font-bold text-gray-900">₦{selectedClient.monthlyValue.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Hours</p>
                <p className="text-xl font-bold text-gray-900">{selectedClient.totalHours}h</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Start Date</p>
                <p className="text-xl font-bold text-gray-900">{new Date(selectedClient.startDate).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Satisfaction</p>
                <div className="flex items-center space-x-2">
                  <StarIcon className="h-5 w-5 text-yellow-500 fill-current" />
                  <span className="text-xl font-bold text-gray-900">{selectedClient.satisfaction}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Engagement Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Engagement Details</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Type:</span>
                  <span className={`px-2 py-1 rounded text-sm font-medium ${getEngagementTypeColor(selectedClient.engagementType)}`}>
                    {selectedClient.engagementType.charAt(0).toUpperCase() + selectedClient.engagementType.slice(1)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Priority:</span>
                  <span className={`px-2 py-1 rounded text-sm font-medium ${
                    selectedClient.priority === 'high' ? 'bg-red-100 text-red-800' :
                    selectedClient.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {selectedClient.priority.charAt(0).toUpperCase() + selectedClient.priority.slice(1)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Hours this month:</span>
                  <span className="font-semibold">{selectedClient.hoursThisMonth}h</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Contact:</span>
                  <div className="text-right">
                    <p className="font-semibold">{selectedClient.email}</p>
                    <p className="text-sm text-gray-500">{selectedClient.phone}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Notes</h3>
              <p className="text-gray-600 mb-4">{selectedClient.notes}</p>
              <Button variant="outline" size="sm" className="w-full">
                <FileTextIcon className="h-4 w-4 mr-2" />
                Edit Notes
              </Button>
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
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Financial analysis completed</p>
                  <p className="text-xs text-gray-500">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Meeting scheduled for next week</p>
                  <p className="text-xs text-gray-500">1 day ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Document review completed</p>
                  <p className="text-xs text-gray-500">3 days ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (selectedClient) {
    return (
      <div className="min-h-screen bg-gray-25 p-6">
        <div className="max-w-6xl mx-auto">
          {renderClientDetails()}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-25 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Client Management</h1>
            <p className="text-gray-600">Manage your client relationships and engagements</p>
          </div>
          <Button>
            <PlusIcon className="h-4 w-4 mr-2" />
            Add Client
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <UsersIcon className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Active Clients</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {mockClients.filter(c => c.status === 'active').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <DollarSignIcon className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Monthly Revenue</p>
                  <p className="text-2xl font-bold text-gray-900">
                    ₦{mockClients.filter(c => c.status === 'active').reduce((sum, c) => sum + c.monthlyValue, 0).toLocaleString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <ClockIcon className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Hours This Month</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {mockClients.reduce((sum, c) => sum + c.hoursThisMonth, 0)}h
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <StarIcon className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Avg Satisfaction</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {(mockClients.reduce((sum, c) => sum + c.satisfaction, 0) / mockClients.length).toFixed(1)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search clients..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                  <option value="paused">Paused</option>
                </select>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <FilterIcon className="h-4 w-4 mr-2" />
                  More Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Client List */}
        <div className="space-y-4">
          {filteredClients.map(renderClientCard)}
        </div>

        {filteredClients.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <UsersIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No clients found</h3>
              <p className="text-gray-600">
                {searchTerm || statusFilter !== 'all' 
                  ? 'Try adjusting your search or filters'
                  : 'Start by adding your first client'
                }
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

export default CfoClientManagement
