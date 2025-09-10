import React, { useState } from 'react'
import { Button, Card, CardContent, Avatar, Badge } from '../components/ui'
import CFOSidebar from '../components/CFOSidebar'
import { formatDate } from '../utils/dateUtils'
import {
  UsersIcon,
  ClockIcon,
  DollarSign,
  FileTextIcon,
  MessageSquareIcon,
  CalendarIcon,
  TrendingUpIcon,
  SettingsIcon,
  BellIcon,
  StarIcon,
  LogOutIcon,
  HomeIcon,
  UserIcon,
  CheckCircleIcon,
  ArrowUpIcon,
  UserPlusIcon,
  Edit3Icon,
  ArrowUpRightIcon
} from 'lucide-react'
import {
  dashboardMetrics,
  clients,
  recentActivities,
  actionItems,
  revenueData,
  formatCurrency,
  getPriorityColor,
  getClientsByStatus,
  type Client,
  type Activity,
  type ActionItem
} from '../data/dashboard-data'
import CfoClientManagement from './cfo-client-management'
import CfoClientWorkspace from './cfo-client-workspace'

type Page = 'sign-in' | 'sign-up' | 'create-account' | 'email-verification' | 'verification-success' | 'onboarding' | 'onboarding-success' | 'sme-dashboard' | 'sme-main-dashboard' | 'upload-center' | 'bank-connection' | 'enhanced-upload' | 'cfo-dashboard' | 'cfo-client-management' | 'cfo-client-workspace' | 'projects-tasks' | 'invoice-tracking' | 'cfo-profile-management' | 'messaging'

interface CfoDashboardProps {
  onNavigate: (page: Page, accountType?: 'sme' | 'cfo', email?: string) => void
  accountType: 'sme' | 'cfo'
  email: string
  initialTab?: string
}

const CfoDashboard: React.FC<CfoDashboardProps> = ({ 
  onNavigate, 
  accountType, 
  email,
  initialTab = 'overview'
}) => {
  const [activeTab, setActiveTab] = useState(initialTab)

  // Get active clients for engagement display
  const activeEngagements = getClientsByStatus('active')

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
      id: 'messaging',
      name: 'Messaging',
      icon: <MessageSquareIcon className="h-5 w-5" />,
      description: 'Communicate with all clients, share documents and voice memos'
    },
    {
      id: 'engagements',
      name: 'Projects & Tasks',
      icon: <FileTextIcon className="h-5 w-5" />,
      description: 'Track project progress and deliverables'
    },
    {
      id: 'financials',
      name: 'Invoice Tracking',
      icon: <DollarSign className="h-5 w-5" />,
      description: 'Track payments for completed SME projects'
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



  const getModuleContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="bg-[#ffffff] flex">
            {/* Main Content Area */}
            <div className="flex-1">
              {/* Header section */}
              <div className="px-8 py-8">
                <div className="mb-5">
                  <h1 className="text-[30px] font-medium text-[#101828] leading-[38px]">Welcome John</h1>
                </div>
              </div>

              {/* Main content */}
              <div className="px-8 pb-12">
              {/* Revenue section */}
              <div className="mb-8">
                <div className="flex gap-8">
                  {/* Revenue metrics */}
                  <div className="w-60">
                    <div className="mb-4">
                      <p className="text-[14px] font-medium text-[#667085] leading-[20px]">Current Month Revenue</p>
                    </div>
                    <div className="flex items-baseline gap-4 mb-4">
                      <div className="flex items-baseline gap-0.5">
                        <span className="text-[20px] font-medium text-[#101828]">₦</span>
                        <span className="text-[36px] font-semibold text-[#101828] leading-[44px] tracking-[-0.72px]">518,880</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-3 flex items-center justify-center">
                          <ArrowUpIcon className="w-3 h-3 text-[#027a48]" />
                        </div>
                        <span className="text-[14px] font-medium text-[#027a48]">7.4%</span>
                      </div>
                    </div>
                  </div>

                  {/* Chart area with proper Y-axis and X-axis */}
                  <div className="grow h-60 relative">
                    {/* Y-axis */}
                    <div className="absolute left-0 top-0 bottom-6 flex flex-col justify-between text-[12px] text-[#667085] pr-2">
                      <span>600K</span>
                      <span>500K</span>
                      <span>400K</span>
                      <span>300K</span>
                      <span>200K</span>
                      <span>100K</span>
                      <span>0</span>
                    </div>

                    {/* Chart content */}
                    <div className="absolute left-12 right-0 top-0 bottom-6">
                      <div className="flex items-end justify-between h-full px-6 py-4">
                        {revenueData.slice(-12).map((data, index) => {
                          const maxRevenue = Math.max(...revenueData.slice(-12).map(d => d.revenue));
                          const height = (data.revenue / maxRevenue) * 100;
                          return (
                            <div key={data.month} className="flex flex-col items-center flex-1">
                              <div
                                className={`w-8 rounded-t-sm ${index === 11 ? 'bg-[#7d4f30]' : 'bg-gray-300'} transition-all duration-300 hover:opacity-80`}
                                style={{ height: `${height}%` }}
                                title={`${data.month}: ₦${data.revenue.toLocaleString()}`}
                              />
                            </div>
                          );
                        })}
                      </div>

                      {/* X-axis */}
                      <div className="flex justify-between text-[12px] text-[#667085] px-6 mt-2">
                        <span>Jan</span>
                        <span>Feb</span>
                        <span>Mar</span>
                        <span>Apr</span>
                        <span>May</span>
                        <span>Jun</span>
                        <span>Jul</span>
                        <span>Aug</span>
                        <span>Sep</span>
                        <span>Oct</span>
                        <span>Nov</span>
                        <span>Dec</span>
                      </div>
                    </div>
                  </div>

                  {/* Metrics */}
                  <div className="w-60">
                    {/* Active Clients */}
                    <div>
                      <div className="mb-2">
                        <p className="text-[14px] font-medium text-[#667085]">Active Clients</p>
                      </div>
                      <div className="flex items-baseline gap-4">
                        <span className="text-[30px] font-semibold text-[#101828]">5</span>
                        <div className="flex items-center gap-1">
                          <div className="w-3 h-3 flex items-center justify-center">
                            <ArrowUpIcon className="w-3 h-3 text-[#027a48]" />
                          </div>
                          <span className="text-[14px] font-medium text-[#027a48]">9.2%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Start creating content */}
              <div className="mb-8">
                <div className="mb-5">
                  <h2 className="text-[18px] font-medium text-[#101828] leading-[28px]">Start creating content</h2>
                </div>
                <div className="flex gap-6">
                  <div className="grow bg-[#ffffff] border border-[#e4e7ec] rounded-lg p-5 shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#ded3cb] rounded-[20px] flex items-center justify-center">
                        <UserPlusIcon className="w-5 h-5 text-[#7d4f30]" />
                      </div>
                      <div>
                        <p className="text-[16px] font-medium text-[#344054] leading-[24px]">Submit Timesheet</p>
                        <p className="text-[14px] text-[#667085] leading-[20px]">2 pending submissions</p>
                      </div>
                    </div>
                  </div>
                  <div className="grow bg-[#ffffff] border border-[#e4e7ec] rounded-lg p-5 shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#ded3cb] rounded-[20px] flex items-center justify-center">
                        <Edit3Icon className="w-5 h-5 text-[#7d4f30]" />
                      </div>
                      <div>
                        <p className="text-[16px] font-medium text-[#344054] leading-[24px]">Check New Messages</p>
                        <p className="text-[14px] text-[#667085] leading-[20px]">4 unread messages</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* FunnelFit News & Updates */}
              <div className="mb-8">
                <div className="mb-5">
                  <h2 className="text-[18px] font-medium text-[#101828] leading-[28px]">FunnelFit News & Updates</h2>
                  <div className="bg-[#e4e7ec] h-px mt-1" />
                </div>
                <div className="flex gap-6">
                  {/* News Item 1 */}
                  <div className="flex-1">
                        <div className="mb-6">
                          <img
                            src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80"
                            alt="Office workspace"
                            className="w-full h-60 object-cover rounded-md"
                          />
                        </div>
                        <div>
                          <div className="mb-2">
                            <p className="text-[14px] font-semibold text-[#90694f] leading-[20px]">Olivia Rhye • 20 Jan 2022</p>
                          </div>
                          <div className="mb-4">
                            <div className="flex items-start gap-4">
                              <h3 className="text-[18px] font-medium text-[#101828] leading-[28px] flex-1">UX review presentations</h3>
                              <div className="pt-1">
                                <ArrowUpRightIcon className="w-6 h-6 text-[#667085]" />
                              </div>
                            </div>
                            <p className="text-[16px] text-[#667085] leading-[24px]">How do you create compelling presentations that wow your colleagues and impress your managers?</p>
                          </div>
                          <div className="flex gap-2">
                            <span className="px-2.5 py-0.5 bg-[#ece5e0] rounded-2xl text-[14px] font-medium text-[#90694f]">Design</span>
                            <span className="px-2.5 py-0.5 bg-[#eef4ff] rounded-2xl text-[14px] font-medium text-[#3538cd]">Research</span>
                            <span className="px-2.5 py-0.5 bg-[#fdf2fa] rounded-2xl text-[14px] font-medium text-[#c11574]">Presentation</span>
                          </div>
                        </div>
                      </div>

                      {/* News Item 2 */}
                      <div className="flex-1">
                        <div className="mb-6">
                          <img
                            src="https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                            alt="Team meeting"
                            className="w-full h-60 object-cover rounded-md"
                          />
                        </div>
                        <div>
                          <div className="mb-2">
                            <p className="text-[14px] font-semibold text-[#90694f] leading-[20px]">Phoenix Baker • 19 Jan 2022</p>
                          </div>
                          <div className="mb-4">
                            <div className="flex items-start gap-4">
                              <h3 className="text-[18px] font-medium text-[#101828] leading-[28px] flex-1">Migrating to Linear 101</h3>
                              <div className="pt-1">
                                <ArrowUpRightIcon className="w-6 h-6 text-[#667085]" />
                              </div>
                            </div>
                            <p className="text-[16px] text-[#667085] leading-[24px]">Linear helps streamline software projects, sprints, tasks, and bug tracking. Here's how to get started...</p>
                          </div>
                          <div className="flex gap-2">
                            <span className="px-2.5 py-0.5 bg-[#ece5e0] rounded-2xl text-[14px] font-medium text-[#90694f]">Design</span>
                            <span className="px-2.5 py-0.5 bg-[#eef4ff] rounded-2xl text-[14px] font-medium text-[#3538cd]">Research</span>
                          </div>
                        </div>
                  </div>
                </div>
              </div>
              </div>
            </div>

            {/* Right Sidebar - Metrics & Active Clients */}
            <div className="w-80 bg-[#ffffff] border-l border-[#eaecf0] p-6">
              {/* Pending Invoices */}
              <div className="mb-6">
                <div className="mb-2">
                  <p className="text-[14px] font-medium text-[#667085]">Pending Invoices</p>
                </div>
                <div className="flex items-baseline gap-4">
                  <span className="text-[30px] font-semibold text-[#101828]">2</span>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 flex items-center justify-center">
                      <ArrowUpIcon className="w-3 h-3 text-[#027a48]" />
                    </div>
                    <span className="text-[14px] font-medium text-[#027a48]">6.6%</span>
                  </div>
                </div>
              </div>

              {/* Email Open Rate */}
              <div className="mb-6">
                <div className="mb-2">
                  <p className="text-[14px] font-medium text-[#667085]">Email open rate</p>
                </div>
                <div className="flex items-baseline gap-4">
                  <span className="text-[30px] font-semibold text-[#101828]">82%</span>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 flex items-center justify-center">
                      <ArrowUpIcon className="w-3 h-3 text-[#027a48]" />
                    </div>
                    <span className="text-[14px] font-medium text-[#027a48]">8.1%</span>
                  </div>
                </div>
              </div>

              {/* Active Clients */}
              <div className="mb-6">
                <h3 className="text-[16px] font-medium text-[#101828] leading-[24px]">Active Clients</h3>
              </div>
              <div className="space-y-4">
                {clients.filter(client => client.status === 'active').slice(0, 4).map((client, index) => {
                  // Define avatar colors from Figma
                  const avatarColors = ['#AA9C75', '#D4B5AD', '#BEA887', '#A2A8CD'];
                  const avatarColor = avatarColors[index % avatarColors.length];
                  return (
                    <div key={client.id} className="flex items-center gap-3">
                      <div className="relative">
                        <div
                          className="w-10 h-10 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: avatarColor }}
                        >
                          <span className="text-[14px] font-semibold text-white">{client.avatar}</span>
                        </div>
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#12b76a] rounded-full border-2 border-white" />
                      </div>
                      <div>
                        <p className="text-[14px] font-medium text-[#344054] leading-[20px]">{client.name}</p>
                        <p className="text-[14px] text-[#667085] leading-[20px]">Member since {formatDate(client.startDate)}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
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
          return <CfoClientManagement onNavigate={(page, accountType, email) => onNavigate(page as Page, accountType, email)} accountType={accountType} email={email} />
        case 'messaging':
          return (
            <div className="flex h-full">
              {/* Client List Sidebar */}
              <div className="w-80 bg-white border-r border-gray-200 flex flex-col">

                <div className="flex-1 overflow-y-auto">
                  {clients.map((client) => (
                    <div key={client.id} className="p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-10 w-10">
                          <div className="bg-blue-500 text-white text-sm font-medium flex items-center justify-center h-full w-full rounded-full">
                            {client.name.split(' ').map(n => n[0]).join('')}
                          </div>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                           <p className="text-sm font-medium text-gray-900 truncate">{client.name}</p>
                           <p className="text-xs text-gray-500 truncate">{client.contact.email}</p>
                           <p className="text-xs text-gray-400">Last message 2h ago</p>
                         </div>
                        <div className="flex flex-col items-end">
                          <Badge className="bg-green-100 text-green-800 text-xs">Online</Badge>
                        </div>
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
                      <Avatar className="h-8 w-8">
                        <div className="bg-blue-500 text-white text-sm font-medium flex items-center justify-center h-full w-full rounded-full">
                          JD
                        </div>
                      </Avatar>
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">John Doe</h3>
                        <p className="text-xs text-gray-500">Online</p>
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
                        <p className="text-sm text-gray-900">Hi! I wanted to discuss the Q4 financial projections.</p>
                        <p className="text-xs text-gray-500 mt-1">10:30 AM</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <div className="max-w-xs lg:max-w-md">
                      <div className="bg-blue-500 rounded-lg p-3 shadow-sm">
                        <p className="text-sm text-white">Sure! I've prepared the updated forecasts. Let me share the document.</p>
                        <p className="text-xs text-blue-100 mt-1">10:32 AM</p>
                      </div>
                    </div>
                  </div>

                  {/* Document sharing example */}
                  <div className="flex justify-end">
                    <div className="max-w-xs lg:max-w-md">
                      <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm">
                        <div className="flex items-center space-x-2">
                          <FileTextIcon className="h-5 w-5 text-blue-500" />
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">Q4_Financial_Projections.pdf</p>
                            <p className="text-xs text-gray-500">2.4 MB</p>
                          </div>
                          <Button size="sm" variant="outline">Download</Button>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">10:33 AM</p>
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
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                      </svg>
                    </Button>
                    <Button size="sm" variant="outline" className="p-2">
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                      </svg>
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
        case 'cfo-client-workspace':
          return <CfoClientWorkspace onNavigate={(page, accountType, email) => onNavigate(page as Page, accountType, email)} accountType={accountType} email={email} />
        case 'engagements':
          onNavigate('projects-tasks', accountType, email)
          return null

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
      {/* Sidebar */}
      <CFOSidebar 
        onNavigate={onNavigate}
        accountType={accountType}
        email={email}
        activePage="cfo-dashboard"
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Header - Only show for non-overview tabs */}
        {activeTab !== 'overview' && (
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
        )}

        {/* Page Content */}
        <main className={`flex-1 overflow-auto ${activeTab === 'overview' ? 'p-0' : 'p-6'}`}>
          {getModuleContent()}
        </main>
      </div>
    </div>
  )
}

export default CfoDashboard
