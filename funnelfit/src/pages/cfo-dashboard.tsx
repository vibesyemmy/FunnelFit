import React, { useState } from 'react'
import { Button, Card, CardContent } from '../components/ui'
import { 
  BarChart3Icon,
  UsersIcon,
  ClockIcon,
  DollarSignIcon,
  FileTextIcon,
  MessageSquareIcon,
  CalendarIcon,
  TrendingUpIcon,
  BookOpenIcon,
  SettingsIcon,
  BellIcon,
  SearchIcon,
  PlusIcon,
  StarIcon,
  ArrowUpIcon,
  LogOutIcon,
  HomeIcon,
  UserIcon,
  CheckCircleIcon
} from 'lucide-react'

interface CfoDashboardProps {
  onNavigate: (page: string, accountType?: 'sme' | 'cfo', email?: string) => void
  accountType: 'sme' | 'cfo'
  email: string
}

const CfoDashboard: React.FC<CfoDashboardProps> = ({ 
  onNavigate, 
  accountType, 
  email 
}) => {
  const [activeTab, setActiveTab] = useState('overview')

  // Mock data for CFO dashboard
  const mockData = {
    activeClients: 6,
    monthlyRevenue: 14250000,
    utilizationRate: 87,
    avgClientSatisfaction: 4.8,
    pendingTasks: 12,
    upcomingMeetings: 3
  }

  const activeEngagements = [
    {
      id: 1,
      clientName: "TechStart Solutions",
      industry: "Technology",
      type: "Monthly Retainer",
      status: "active",
      nextDeadline: "Dec 15, 2024",
      progress: 75,
      priority: "high"
    },
    {
      id: 2,
      clientName: "Green Earth Co.",
      industry: "Sustainability",
      type: "Project-Based",
      status: "active",
      nextDeadline: "Dec 20, 2024",
      progress: 45,
      priority: "medium"
    },
    {
      id: 3,
      clientName: "Retail Plus",
      industry: "Retail",
      type: "Hourly",
      status: "pending_review",
      nextDeadline: "Dec 12, 2024",
      progress: 90,
      priority: "low"
    }
  ]

  const navigationItems = [
    {
      id: 'overview',
      name: 'Overview',
      icon: <HomeIcon className="h-5 w-5" />,
      description: 'Dashboard overview and key metrics'
    },
    {
      id: 'clients',
      name: 'Client Management',
      icon: <UsersIcon className="h-5 w-5" />,
      description: 'Manage client relationships and engagements'
    },
    {
      id: 'engagements',
      name: 'Projects & Tasks',
      icon: <FileTextIcon className="h-5 w-5" />,
      description: 'Track project progress and deliverables'
    },
    {
      id: 'financials',
      name: 'Financial Tracking',
      icon: <DollarSignIcon className="h-5 w-5" />,
      description: 'Income, billing, and financial reports'
    },
    {
      id: 'analytics',
      name: 'Analytics',
      icon: <TrendingUpIcon className="h-5 w-5" />,
      description: 'Performance insights and analytics'
    },
    {
      id: 'profile',
      name: 'My Profile',
      icon: <UserIcon className="h-5 w-5" />,
      description: 'Manage your professional profile and expertise'
    },
    {
      id: 'settings',
      name: 'Settings',
      icon: <SettingsIcon className="h-5 w-5" />,
      description: 'Profile and account settings'
    }
  ]

  const recentActivities = [
    { action: "Completed Q3 financial analysis", client: "TechStart Solutions", time: "2 hours ago" },
    { action: "Scheduled meeting with CFO", client: "Green Earth Co.", time: "4 hours ago" },
    { action: "Submitted budget forecast", client: "Retail Plus", time: "1 day ago" },
    { action: "Received payment", client: "TechStart Solutions", time: "2 days ago" }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-50'
      case 'pending_review': return 'text-yellow-600 bg-yellow-50'
      case 'completed': return 'text-blue-600 bg-blue-50'
      default: return 'text-gray-600 bg-gray-50'
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

  const getModuleContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            {/* Top Key Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <UsersIcon className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Active Clients</p>
                      <p className="text-xl font-bold text-gray-900">5</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <ClockIcon className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">This Week</p>
                      <p className="text-xl font-bold text-gray-900">23/40 hrs</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-yellow-100 rounded-lg">
                      <DollarSignIcon className="h-5 w-5 text-yellow-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Pending Approval</p>
                      <p className="text-xl font-bold text-gray-900">₦4.25M</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <TrendingUpIcon className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">New Opportunities</p>
                      <p className="text-xl font-bold text-gray-900">3</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="md:col-span-2 lg:col-span-1">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-indigo-100 rounded-lg">
                      <StarIcon className="h-5 w-5 text-indigo-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Avg Rating</p>
                      <p className="text-xl font-bold text-gray-900">4.9</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Today's Focus */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Today's Focus</h3>
                <div className="space-y-4">
                  {/* Schedule */}
                  <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                    <CalendarIcon className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Your Schedule</p>
                      <p className="text-sm text-gray-600">Next meeting in 2 hours with Client ABC</p>
                    </div>
                  </div>

                  {/* Due Today */}
                  <div className="flex items-start space-x-3 p-3 bg-orange-50 rounded-lg border-l-4 border-orange-400">
                    <ClockIcon className="h-5 w-5 text-orange-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Due Today</p>
                      <p className="text-sm text-gray-600">2 tasks, 1 timesheet to submit</p>
                    </div>
                  </div>

                  {/* New Messages */}
                  <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg border-l-4 border-green-400">
                    <MessageSquareIcon className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">New Messages</p>
                      <p className="text-sm text-gray-600">2 unread from clients</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <Button variant="outline" className="flex items-center space-x-2 h-12">
                    <CheckCircleIcon className="h-4 w-4" />
                    <span>Submit Timesheet</span>
                  </Button>
                  <Button variant="outline" className="flex items-center space-x-2 h-12">
                    <CalendarIcon className="h-4 w-4" />
                    <span>View Calendar</span>
                  </Button>
                  <Button variant="outline" className="flex items-center space-x-2 h-12">
                    <TrendingUpIcon className="h-4 w-4" />
                    <span>View Opportunities</span>
                  </Button>
                  <Button variant="outline" className="flex items-center space-x-2 h-12">
                    <MessageSquareIcon className="h-4 w-4" />
                    <span>Check Messages</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Requires Your Action */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Requires Your Action</h3>
                <div className="space-y-3">
                  {/* Timesheet Due */}
                  <div className="flex items-start space-x-3 p-4 bg-red-50 rounded-lg border border-red-200">
                    <div className="flex-shrink-0 w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-lg">⚠️</span>
                        <p className="text-sm font-semibold text-red-900">Timesheet Due</p>
                        <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">Due today</span>
                      </div>
                      <p className="text-sm text-red-700">Submit hours for Client XYZ</p>
                    </div>
                    <Button size="sm" className="bg-red-600 hover:bg-red-700">
                      Submit Now
                    </Button>
                  </div>

                  {/* Chemistry Call Request */}
                  <div className="flex items-start space-x-3 p-4 bg-orange-50 rounded-lg border border-orange-200">
                    <div className="flex-shrink-0 w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-lg">🔔</span>
                        <p className="text-sm font-semibold text-orange-900">Chemistry Call Request</p>
                        <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-full">2 days old</span>
                      </div>
                      <p className="text-sm text-orange-700">Tech Startup wants to schedule</p>
                    </div>
                    <Button size="sm" variant="outline" className="border-orange-300 text-orange-700 hover:bg-orange-100">
                      Respond
                    </Button>
                  </div>

                  {/* Document Review */}
                  <div className="flex items-start space-x-3 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                    <div className="flex-shrink-0 w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-lg">📋</span>
                        <p className="text-sm font-semibold text-yellow-900">Document Review</p>
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">Pending</span>
                      </div>
                      <p className="text-sm text-yellow-700">Client ABC awaiting feedback on financial model</p>
                    </div>
                    <Button size="sm" variant="outline" className="border-yellow-300 text-yellow-700 hover:bg-yellow-100">
                      Review
                    </Button>
                  </div>

                  {/* Expiring Opportunity */}
                  <div className="flex items-start space-x-3 p-4 bg-red-50 rounded-lg border border-red-200">
                    <div className="flex-shrink-0 w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-lg">⏰</span>
                        <p className="text-sm font-semibold text-red-900">Expiring Opportunity</p>
                        <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">Expires in 24 hrs</span>
                      </div>
                      <p className="text-sm text-red-700">Respond to match request</p>
                    </div>
                    <Button size="sm" className="bg-red-600 hover:bg-red-700">
                      Respond Now
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
            {/* Profile Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <UserIcon className="h-12 w-12 text-primary-600 mx-auto mb-3" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Profile Completion</h3>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                    <div className="bg-primary-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                  <p className="text-sm text-gray-600">85% Complete</p>
                  <Button className="mt-3 w-full" size="sm">
                    Complete Profile
                  </Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 text-center">
                  <StarIcon className="h-12 w-12 text-yellow-500 mx-auto mb-3" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Profile Rating</h3>
                  <p className="text-2xl font-bold text-yellow-600 mb-1">4.9</p>
                  <p className="text-sm text-gray-600">Based on 23 reviews</p>
                  <Button variant="outline" className="mt-3 w-full" size="sm">
                    View Reviews
                  </Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 text-center">
                  <CheckCircleIcon className="h-12 w-12 text-green-500 mx-auto mb-3" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Verification</h3>
                  <p className="text-sm text-green-600 mb-1">Fully Verified</p>
                  <p className="text-sm text-gray-600">Background, References</p>
                  <Button variant="outline" className="mt-3 w-full" size="sm">
                    View Status
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Profile Preview */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Profile Preview</h3>
                  <Button size="sm">
                    Edit Profile
                  </Button>
                </div>
                
                <div className="flex items-start space-x-6">
                  <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center">
                    <span className="text-xl font-bold text-primary-600">JD</span>
                  </div>
                  
                  <div className="flex-1">
                    <h4 className="text-xl font-bold text-gray-900">John Doe</h4>
                    <p className="text-lg text-primary-600 mb-2">Senior Fractional CFO</p>
                    <p className="text-gray-600 mb-3">
                      Experienced CFO with 15+ years in financial leadership across technology and healthcare industries.
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        Financial Planning
                      </span>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        Fundraising
                      </span>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        Technology/SaaS
                      </span>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        +3 more
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span>📅 20-30 hrs/week available</span>
                      <span>💰 ₦75,000-100,000/hour</span>
                      <span>🕒 EST timezone</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>


          </div>
        )

      case 'clients':
        return (
          <div className="space-y-6">
            {/* Client Management Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <UsersIcon className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Active Clients</p>
                      <p className="text-2xl font-bold text-gray-900">6</p>
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
                      <p className="text-2xl font-bold text-gray-900">₦14,250,000</p>
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
                      <p className="text-2xl font-bold text-gray-900">58h</p>
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
                      <p className="text-2xl font-bold text-gray-900">4.8</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Client Activities */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Recent Client Activities</h3>
                  <Button size="sm">View All Clients</Button>
                </div>
                
                <div className="space-y-4">
                  {activeEngagements.map((engagement) => (
                    <div key={engagement.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                          <span className="text-sm font-semibold text-primary-600">
                            {engagement.clientName.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{engagement.clientName}</h4>
                          <p className="text-sm text-gray-600">{engagement.industry} • {engagement.type}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className="text-sm font-semibold text-gray-900">{engagement.progress}% Complete</p>
                          <p className="text-xs text-gray-500">Due: {engagement.nextDeadline}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button size="sm" variant="outline">
                            <MessageSquareIcon className="h-4 w-4 mr-1" />
                            Message
                          </Button>
                          <Button size="sm">
                            <CalendarIcon className="h-4 w-4 mr-1" />
                            Schedule
                          </Button>
                      </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Meetings */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Client Meetings</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <CalendarIcon className="h-5 w-5 text-blue-600" />
                      <div>
                        <p className="font-semibold text-gray-900">TechStart Solutions</p>
                        <p className="text-sm text-gray-600">Q4 Financial Review</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-gray-900">Dec 18, 2:00 PM</p>
                      <p className="text-xs text-gray-500">Video Call</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <CalendarIcon className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="font-semibold text-gray-900">Green Earth Co.</p>
                        <p className="text-sm text-gray-600">M&A Due Diligence Update</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-gray-900">Dec 20, 10:00 AM</p>
                      <p className="text-xs text-gray-500">In Person</p>
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
                {navigationItems.find(m => m.id === activeTab)?.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {navigationItems.find(m => m.id === activeTab)?.name}
              </h3>
              <p className="text-gray-600">
                {navigationItems.find(m => m.id === activeTab)?.description}
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
          {navigationItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                activeTab === item.id
                  ? 'bg-primary-500 text-white border border-primary-400'
                  : 'text-primary-100 hover:bg-primary-500 hover:text-white'
              }`}
            >
              {item.icon}
              <span className="font-medium">{item.name}</span>
            </button>
          ))}
        </nav>

        {/* User Menu */}
        <div className="p-4 border-t border-primary-700">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-8 h-8 bg-primary-400 rounded-full flex items-center justify-center">
              <span className="text-sm font-semibold text-white">JD</span>
            </div>
            <div>
              <p className="text-sm font-medium text-white">John Doe</p>
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
                {navigationItems.find(m => m.id === activeTab)?.name}
              </h2>
              <p className="text-sm text-gray-600">
                {navigationItems.find(m => m.id === activeTab)?.description}
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
    </div>
  )
}

export default CfoDashboard
