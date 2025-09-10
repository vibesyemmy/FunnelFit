import React, { useState } from 'react'
import { Button, Card, CardContent, Avatar, Badge } from '../components/ui'
import CFOSidebar from '../components/CFOSidebar'
import { formatDate, formatDateTime } from '../utils/dateUtils'
import { 
  UsersIcon,
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
  StarIcon,
  MapPinIcon,
  BarChart3Icon,
  PlayIcon,
  DownloadIcon,
  VideoIcon,
  InfoIcon,
  UserCheckIcon,
  UserXIcon,
  ExternalLinkIcon,
  ArrowUpIcon,
  RefreshCwIcon,
  X,
  HomeIcon,
  UserIcon,
  SettingsIcon,
  BellIcon,
  LogOutIcon
} from 'lucide-react'

type Page = 'sign-in' | 'sign-up' | 'create-account' | 'email-verification' | 'verification-success' | 'onboarding' | 'onboarding-success' | 'sme-dashboard' | 'sme-main-dashboard' | 'upload-center' | 'bank-connection' | 'enhanced-upload' | 'cfo-dashboard' | 'cfo-client-management' | 'cfo-client-workspace' | 'projects-tasks' | 'invoice-tracking' | 'cfo-profile-management'

interface CfoClientManagementProps {
  onNavigate: (page: Page, accountType?: 'sme' | 'cfo', email?: string) => void
  accountType: 'sme' | 'cfo'
  email: string
}

// New Request Interface
interface NewRequest {
  id: string
  companyName: string
  location: string
  revenueRange: string
  employeeCount: string
  industry: string
  financialNeeds: string[]
  matchScore: number
  chemistryCallStatus: 'none' | 'scheduled' | 'completed'
  description: string
  challenges: string[]
  cfoNeeds: string[]
  expectedHours: string
  duration: string
  budgetRange: string
  startDate: string
  matchingCriteria: string[]
  relevantExperience: string[]
}

// Chemistry Call Interface
interface ChemistryCall {
  id: string
  companyName: string
  scheduledDate: string | null
  meetingLink: string
  overview: string
  status: 'scheduled' | 'pending' | 'completed'
}

// Active Client Interface
interface ActiveClient {
  id: string
  clientName: string
  industry: string
  engagementType: string
  progress: number
  lastActivity: string
}

// Completed Client Interface
interface CompletedClient {
  id: string
  clientName: string
  engagementPeriod: string
  finalDeliverable: string
  rating: number
}

// Declined Request Interface
interface DeclinedRequest {
  id: string
  companyName: string
  dateDeclined: string
  reason: string
}

const CfoClientManagement: React.FC<CfoClientManagementProps> = ({ 
  onNavigate, 
  accountType, 
  email 
}) => {
  const [activeTab, setActiveTab] = useState('new-requests')
  const [selectedRequest, setSelectedRequest] = useState<NewRequest | null>(null)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [showAcceptModal, setShowAcceptModal] = useState(false)
  const [showDeclineModal, setShowDeclineModal] = useState(false)
  const [showScheduleCallModal, setShowScheduleCallModal] = useState(false)
  const [showContractModal, setShowContractModal] = useState(false)
  const [actionRequest, setActionRequest] = useState<NewRequest | null>(null)
  const [declineReason, setDeclineReason] = useState('')
  const [scheduleCallData, setScheduleCallData] = useState({
    date: '',
    time: '',
    duration: '30',
    meetingType: 'video',
    notes: ''
  })
  const [contractData, setContractData] = useState({
    cfoSignature: '',
    date: new Date().toISOString().split('T')[0],
    termsAccepted: false
  })

  // Mock data for new requests with Nigerian business examples
  const mockNewRequests: NewRequest[] = [
    {
      id: "req-001",
      companyName: "Agritech Innovations Ltd",
      location: "Lagos",
      revenueRange: "₦50M-100M",
      employeeCount: "25-50 Employees",
      industry: "Agriculture Technology",
      financialNeeds: ["Cash flow optimization", "Growth strategy", "Investor preparation"],
      matchScore: 92,
      chemistryCallStatus: 'none' as const,
      description: "Leading agricultural technology company specializing in smart farming solutions across West Africa.",
      challenges: ["Seasonal cash flow variations", "Scaling operations", "Managing rapid growth"],
      cfoNeeds: ["Financial modeling for expansion", "Cash flow management", "Fundraising preparation"],
      expectedHours: "15-20 hours/week",
      duration: "6-month initial",
      budgetRange: "₦2M-3M/month",
      startDate: "January 2025",
      matchingCriteria: ["Agriculture experience", "Growth-stage expertise", "Nigerian market knowledge"],
      relevantExperience: ["Led 3 agtech companies through Series A", "Agriculture sector specialist", "Lagos-based operations"]
    },
    {
      id: "req-002", 
      companyName: "FinCorp Solutions",
      location: "Abuja",
      revenueRange: "₦200M-500M",
      employeeCount: "100-200 Employees",
      industry: "Financial Services",
      financialNeeds: ["Regulatory compliance", "Risk management", "Capital optimization"],
      matchScore: 85,
      chemistryCallStatus: 'completed' as const,
      description: "Digital banking solutions provider serving underbanked populations across Nigeria.",
      challenges: ["Complex regulatory environment", "Capital requirements", "Risk assessment"],
      cfoNeeds: ["Regulatory financial reporting", "Capital adequacy management", "Risk framework development"],
      expectedHours: "20-25 hours/week",
      duration: "12-month engagement",
      budgetRange: "₦4M-6M/month",
      startDate: "February 2025",
      matchingCriteria: ["Financial services experience", "Regulatory expertise", "Risk management"],
      relevantExperience: ["Former bank CFO", "CBN compliance expert", "Fintech advisor"]
    },
    {
      id: "req-003",
      companyName: "GreenEnergy Dynamics",
      location: "Port Harcourt", 
      revenueRange: "₦1B-2B",
      employeeCount: "200-500 Employees",
      industry: "Renewable Energy",
      financialNeeds: ["Project financing", "Cost optimization", "Strategic planning"],
      matchScore: 78,
      chemistryCallStatus: 'completed' as const,
      description: "Solar and wind energy projects across Nigeria, focusing on rural electrification.",
      challenges: ["Project financing complexity", "Currency fluctuation", "Long-term contracts"],
      cfoNeeds: ["Project finance structuring", "Currency hedging", "Government contract management"],
      expectedHours: "10-15 hours/week",
      duration: "9-month project",
      budgetRange: "₦3M-4M/month",
      startDate: "March 2025",
      matchingCriteria: ["Energy sector experience", "Project finance expertise", "Government contracts"],
      relevantExperience: ["Energy sector CFO", "Project finance specialist", "Infrastructure funding"]
    }
  ]

  // Mock chemistry calls data
  const mockChemistryCalls: ChemistryCall[] = [
    {
      id: "call-001",
      companyName: "Retail Excellence Ltd",
      scheduledDate: "2024-12-20T10:00:00",
      meetingLink: "https://meet.google.com/abc-defg-hij",
      overview: "Fast-growing retail chain looking for CFO support during expansion phase.",
      status: "scheduled"
    },
    {
      id: "call-002", 
      companyName: "Manufacturing Plus",
      scheduledDate: null,
      meetingLink: "",
      overview: "Traditional manufacturer transitioning to digital operations needing financial guidance.",
      status: "pending"
    }
  ]

  // Mock active clients data
  const mockActiveClients: ActiveClient[] = [
    {
      id: "active-001",
      clientName: "TechHub Lagos",
      industry: "Technology",
      engagementType: "Financial Modeling",
      progress: 75,
      lastActivity: "2 hours ago"
    },
    {
      id: "active-002",
      clientName: "FarmFresh Exports",
      industry: "Agriculture",
      engagementType: "Cash Flow Management",
      progress: 45,
      lastActivity: "1 day ago"
    },
    {
      id: "active-003",
      clientName: "UrbanDev Properties",
      industry: "Real Estate",
      engagementType: "Investment Analysis",
      progress: 90,
      lastActivity: "3 hours ago"
    },
    {
      id: "active-004",
      clientName: "MedCare Systems",
      industry: "Healthcare",
      engagementType: "Operational Finance",
      progress: 60,
      lastActivity: "5 hours ago"
    },
    {
      id: "active-005",
      clientName: "EduTech Innovations",
      industry: "Education",
      engagementType: "Growth Strategy",
      progress: 30,
      lastActivity: "1 day ago"
    }
  ]

  // Mock completed clients data
  const mockCompletedClients: CompletedClient[] = [
    {
      id: "comp-001",
      clientName: "Lagos Logistics Ltd",
      engagementPeriod: "Jan-Mar 2024",
      finalDeliverable: "Financial Restructuring Plan",
      rating: 5
    },
    {
      id: "comp-002",
      clientName: "Fashion Forward",
      engagementPeriod: "Apr-Jun 2024",
      finalDeliverable: "Investment Readiness Report",
      rating: 4
    }
  ]

  // Mock declined requests data
  const mockDeclinedRequests: DeclinedRequest[] = [
    {
      id: "dec-001",
      companyName: "OilField Services",
      dateDeclined: "2024-11-15",
      reason: "Outside expertise area"
    },
    {
      id: "dec-002",
      companyName: "Mining Corp Ltd",
      dateDeclined: "2024-11-20", 
      reason: "Timeline conflict"
    }
  ]

  // Utility functions

  const getIndustryIcon = (industry: string) => {
    const iconMap: { [key: string]: React.ReactNode } = {
      'Agriculture Technology': <BarChart3Icon className="w-4 h-4 flex-shrink-0 text-gray-400" />,
      'Financial Services': <DollarSignIcon className="w-4 h-4 flex-shrink-0 text-gray-400" />,
      'Renewable Energy': <TrendingUpIcon className="w-4 h-4 flex-shrink-0 text-gray-400" />,
      'Technology': <BuildingIcon className="w-4 h-4 flex-shrink-0 text-gray-400" />,
      'Healthcare': <StarIcon className="w-4 h-4 flex-shrink-0 text-gray-400" />,
      'Real Estate': <BuildingIcon className="w-4 h-4 flex-shrink-0 text-gray-400" />,
      'Education': <UsersIcon className="w-4 h-4 flex-shrink-0 text-gray-400" />,
      'Agriculture': <BarChart3Icon className="w-4 h-4 flex-shrink-0 text-gray-400" />
    }
    return iconMap[industry] || <BuildingIcon className="w-4 h-4 flex-shrink-0 text-gray-400" />
  }

  // Tab counts
  const tabCounts = {
    'new-requests': mockNewRequests.length,
    'chemistry-calls': mockChemistryCalls.length,
    'active': mockActiveClients.length,
    'completed': mockCompletedClients.length,
    'declined': mockDeclinedRequests.length
  }

  // Detail Modal Component
  const DetailModal = () => {
    if (!selectedRequest || !showDetailModal) return null

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          {/* Modal Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-2xl font-bold text-gray-900">{selectedRequest.companyName}</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowDetailModal(false)}
              className="p-2"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Modal Content */}
          <div className="p-6 space-y-6">
            {/* Company Overview */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Company Overview</h3>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <MapPinIcon className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{selectedRequest.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSignIcon className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{selectedRequest.revenueRange}</span>
                </div>
                <div className="flex items-center gap-2">
                  <UsersIcon className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{selectedRequest.employeeCount}</span>
                </div>
                <div className="flex items-center gap-2">
                  {getIndustryIcon(selectedRequest.industry)}
                  <span className="text-sm text-gray-600">{selectedRequest.industry}</span>
                </div>
              </div>
              <p className="text-gray-700">{selectedRequest.description}</p>
            </div>

            {/* Business Context */}
          <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Business Context</h3>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Current Challenges</h4>
                  <ul className="space-y-1">
                    {selectedRequest.challenges.map((challenge, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <AlertCircleIcon className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-600">{challenge}</span>
                      </li>
                    ))}
                  </ul>
          </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Specific CFO Needs</h4>
                  <ul className="space-y-1">
                    {selectedRequest.cfoNeeds.map((need, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircleIcon className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-600">{need}</span>
                      </li>
                    ))}
                  </ul>
                </div>
          </div>
        </div>

            {/* Engagement Requirements */}
          <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Engagement Requirements</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm font-medium text-gray-900">Expected Hours:</span>
                  <p className="text-sm text-gray-600">{selectedRequest.expectedHours}</p>
          </div>
          <div>
                  <span className="text-sm font-medium text-gray-900">Duration:</span>
                  <p className="text-sm text-gray-600">{selectedRequest.duration}</p>
          </div>
          <div>
                  <span className="text-sm font-medium text-gray-900">Budget Range:</span>
                  <p className="text-sm text-gray-600">{selectedRequest.budgetRange}</p>
          </div>
          <div>
                  <span className="text-sm font-medium text-gray-900">Preferred Start:</span>
                  <p className="text-sm text-gray-600">{selectedRequest.startDate}</p>
            </div>
          </div>
        </div>

            
          </div>

          {/* Modal Actions */}
          <div className="flex items-center justify-end p-6 border-t bg-gray-50">
            <div className="flex gap-3">
              {selectedRequest.chemistryCallStatus === 'none' ? (
                <Button 
                  className="bg-primary-500 hover:bg-primary-600 text-white"
                  onClick={() => {
                    setActionRequest(selectedRequest)
                    setShowScheduleCallModal(true)
                    setShowDetailModal(false)
                  }}
                >
                  <CalendarIcon className="w-4 h-4 mr-2" />
                  Schedule Chemistry Call
            </Button>
              ) : (
                <>
            <Button 
                    variant="outline"
                    onClick={() => {
                      setActionRequest(selectedRequest)
                      setShowDeclineModal(true)
                      setShowDetailModal(false)
                    }}
                  >
                    Decline
            </Button>
                  <Button 
                    className="bg-primary-500 hover:bg-primary-600 text-white"
                    onClick={() => {
                      setActionRequest(selectedRequest)
                      setShowAcceptModal(true)
                      setShowDetailModal(false)
                    }}
                  >
                    <UserCheckIcon className="w-4 h-4 mr-2" />
                    Accept Match
                  </Button>
                </>
              )}
          </div>
        </div>
        </div>
      </div>
  )
  }

  // Accept Confirmation Modal
  const AcceptModal = () => {
    if (!showAcceptModal || !actionRequest) return null

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-[0px_20px_24px_-4px_rgba(16,24,40,0.1),0px_8px_8px_-4px_rgba(16,24,40,0.04)] p-6 max-w-md w-full">
          <div className="flex flex-col gap-5 items-center text-center">
            {/* Featured Icon */}
            <div className="bg-[#d1fadf] rounded-[28px] w-12 h-12 flex items-center justify-center">
              <div className="relative rounded-[28px] w-full h-full">
                <div className="absolute border-8 border-[#ecfdf3] border-solid inset-[-4px] pointer-events-none rounded-[32px]" />
                <div className="absolute left-3 top-3 w-6 h-6 flex items-center justify-center">
                  <UserCheckIcon className="w-4 h-4 text-green-600" />
          </div>
          </div>
        </div>

            {/* Text Content */}
            <div className="flex flex-col gap-2 w-full">
              <h3 className="font-medium text-[#101828] text-lg leading-[28px]">
                Accept Client Request
              </h3>
              <p className="font-normal text-[#667085] text-sm leading-[20px]">
                You're about to accept <strong>{actionRequest.companyName}</strong> as a new client. 
                This will move them to your active client list.
              </p>
                </div>
                </div>

          {/* Modal Actions */}
          <div className="flex gap-3 mt-8 w-full">
            <Button 
              variant="outline" 
              className="flex-1 bg-white text-[#344054] border-[#d0d5dd] hover:bg-gray-50"
              onClick={() => {
                setShowAcceptModal(false)
                setActionRequest(null)
              }}
            >
              Cancel
            </Button>
            <Button 
              className="flex-1 bg-[#9e7b64] hover:bg-[#7d4f30] text-white border-[#9e7b64]"
              onClick={() => {
                // Close accept modal and open contract modal
                setShowAcceptModal(false)
                setShowContractModal(true)
              }}
            >
              Confirm
            </Button>
          </div>
        </div>
      </div>
  )
  }

  // Decline Confirmation Modal
  const DeclineModal = () => {
    if (!showDeclineModal || !actionRequest) return null

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-[0px_20px_24px_-4px_rgba(16,24,40,0.1),0px_8px_8px_-4px_rgba(16,24,40,0.04)] p-6 max-w-md w-full">
          <div className="flex flex-col gap-5 items-center text-center">
            {/* Featured Icon */}
            <div className="bg-[#fee4e2] rounded-[28px] w-12 h-12 flex items-center justify-center">
              <div className="relative rounded-[28px] w-full h-full">
                <div className="absolute border-8 border-[#fef3f2] border-solid inset-[-4px] pointer-events-none rounded-[32px]" />
                <div className="absolute left-3 top-3 w-6 h-6 flex items-center justify-center">
                  <UserXIcon className="w-4 h-4 text-red-600" />
              </div>
              </div>
              </div>

            {/* Text Content */}
            <div className="flex flex-col gap-2 w-full">
              <h3 className="font-medium text-[#101828] text-lg leading-[28px]">
                Decline Client Request
              </h3>
              <p className="font-normal text-[#667085] text-sm leading-[20px]">
                Are you sure you want to decline <strong>{actionRequest.companyName}</strong>? 
                This action cannot be undone.
              </p>
                </div>

            {/* Decline Reason Field */}
            <div className="w-full">
              <textarea
                value={declineReason}
                onChange={(e) => setDeclineReason(e.target.value)}
                placeholder="Enter decline reason"
                className="w-full px-3 py-2 border border-[#d0d5dd] rounded-lg text-sm text-[#101828] placeholder-[#667085] focus:outline-none focus:ring-2 focus:ring-[#9e7b64] focus:border-[#9e7b64] resize-none"
                rows={3}
              />
              </div>
            </div>

          {/* Modal Actions */}
          <div className="flex gap-3 mt-8 w-full">
            <Button 
              variant="outline" 
              className="flex-1 bg-white text-[#344054] border-[#d0d5dd] hover:bg-gray-50"
              onClick={() => {
                setShowDeclineModal(false)
                setActionRequest(null)
                setDeclineReason('')
              }}
            >
              Cancel
          </Button>
            <Button 
              className="flex-1 bg-[#d92d20] hover:bg-[#b42318] text-white border-[#d92d20]"
              onClick={() => {
                // Handle decline logic here
                console.log('Declined:', actionRequest.companyName, 'Reason:', declineReason)
                setShowDeclineModal(false)
                setActionRequest(null)
                setDeclineReason('')
              }}
            >
              Decline
            </Button>
          </div>
        </div>
                </div>
    )
  }

  // Schedule Call Modal
  const ScheduleCallModal = () => {
    if (!showScheduleCallModal || !actionRequest) return null

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-[0px_20px_24px_-4px_rgba(16,24,40,0.1),0px_8px_8px_-4px_rgba(16,24,40,0.04)] p-6 max-w-md w-full">
          <div className="flex flex-col gap-8">
            {/* Header */}
            <div className="flex flex-col gap-5 items-start w-full">
              <div className="bg-[#ded3cb] rounded-[28px] w-12 h-12 flex items-center justify-center">
                <div className="relative rounded-[28px] w-full h-full">
                  <div className="absolute border-8 border-[#ece5e0] border-solid inset-[-4px] pointer-events-none rounded-[32px]" />
                  <div className="absolute left-3 top-3 w-6 h-6 flex items-center justify-center">
                    <CalendarIcon className="w-4 h-4 text-[#9e7b64]" />
                </div>
                </div>
              </div>
              <div className="flex flex-col gap-2 w-full">
                <h3 className="font-medium text-[#101828] text-lg leading-[28px]">
                  Schedule Chemistry Call
                </h3>
                <p className="font-normal text-[#667085] text-sm leading-[20px]">
                  Schedule a call with {actionRequest.companyName}
                </p>
              </div>
            </div>

            {/* Form */}
            <div className="flex flex-col gap-4 w-full">
              <div className="flex gap-4 w-full">
                <div className="flex flex-col gap-1.5 grow">
                  <label className="font-medium text-[#344054] text-sm leading-[20px]">Date</label>
                  <input
                    type="date"
                    value={scheduleCallData.date}
                    onChange={(e) => setScheduleCallData({...scheduleCallData, date: e.target.value})}
                    className="bg-white px-3.5 py-2.5 border border-[#d0d5dd] rounded-lg text-[#101828] text-base leading-[24px] focus:outline-none focus:ring-2 focus:ring-[#9e7b64] focus:border-[#9e7b64]"
                  />
              </div>
                <div className="flex flex-col gap-1.5 w-28">
                  <label className="font-medium text-[#344054] text-sm leading-[20px]">Time</label>
                  <input
                    type="time"
                    value={scheduleCallData.time}
                    onChange={(e) => setScheduleCallData({...scheduleCallData, time: e.target.value})}
                    className="bg-white px-3.5 py-2.5 border border-[#d0d5dd] rounded-lg text-[#101828] text-base leading-[24px] focus:outline-none focus:ring-2 focus:ring-[#9e7b64] focus:border-[#9e7b64]"
                  />
              </div>
              </div>

              <div className="flex gap-4 w-full">
                <div className="flex flex-col gap-1.5 grow">
                  <label className="font-medium text-[#344054] text-sm leading-[20px]">Duration</label>
                  <select
                    value={scheduleCallData.duration}
                    onChange={(e) => setScheduleCallData({...scheduleCallData, duration: e.target.value})}
                    className="bg-white px-3.5 py-2.5 border border-[#d0d5dd] rounded-lg text-[#101828] text-base leading-[24px] focus:outline-none focus:ring-2 focus:ring-[#9e7b64] focus:border-[#9e7b64]"
                  >
                    <option value="15">15 minutes</option>
                    <option value="30">30 minutes</option>
                    <option value="45">45 minutes</option>
                    <option value="60">1 hour</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1.5 grow">
                  <label className="font-medium text-[#344054] text-sm leading-[20px]">Meeting Type</label>
                  <select
                    value={scheduleCallData.meetingType}
                    onChange={(e) => setScheduleCallData({...scheduleCallData, meetingType: e.target.value})}
                    className="bg-white px-3.5 py-2.5 border border-[#d0d5dd] rounded-lg text-[#101828] text-base leading-[24px] focus:outline-none focus:ring-2 focus:ring-[#9e7b64] focus:border-[#9e7b64]"
                  >
                    <option value="video">Video Call</option>
                    <option value="phone">Phone Call</option>
                    <option value="in-person">In Person</option>
                  </select>
              </div>
            </div>

              <div className="flex flex-col gap-1.5 w-full">
                <label className="font-medium text-[#344054] text-sm leading-[20px]">Notes (optional)</label>
                <textarea
                  value={scheduleCallData.notes}
                  onChange={(e) => setScheduleCallData({...scheduleCallData, notes: e.target.value})}
                  placeholder="Add any notes or agenda items for the call..."
                  className="bg-white px-3.5 py-2.5 border border-[#d0d5dd] rounded-lg text-[#101828] text-base leading-[24px] focus:outline-none focus:ring-2 focus:ring-[#9e7b64] focus:border-[#9e7b64] resize-none"
                  rows={3}
                />
                </div>
                </div>

            {/* Actions */}
            <div className="flex gap-3 w-full">
              <Button 
                variant="outline" 
                className="flex-1 bg-white text-[#344054] border-[#d0d5dd] hover:bg-gray-50"
                onClick={() => {
                  setShowScheduleCallModal(false)
                  setActionRequest(null)
                  setScheduleCallData({
                    date: '',
                    time: '',
                    duration: '30',
                    meetingType: 'video',
                    notes: ''
                  })
                }}
              >
                Cancel
              </Button>
              <Button 
                className="flex-1 bg-[#9e7b64] hover:bg-[#7d4f30] text-white border-[#9e7b64]"
                onClick={() => {
                  // Handle schedule call logic here
                  console.log('Scheduling call for:', actionRequest.companyName, scheduleCallData)
                  setShowScheduleCallModal(false)
                  setActionRequest(null)
                  setScheduleCallData({
                    date: '',
                    time: '',
                    duration: '30',
                    meetingType: 'video',
                    notes: ''
                  })
                }}
              >
                Schedule Call
              </Button>
                </div>
                  </div>
                </div>
              </div>
    )
  }

  // Contract Signing Modal
  const ContractModal = () => {
    if (!showContractModal || !actionRequest) return null

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-[0px_20px_24px_-4px_rgba(16,24,40,0.1),0px_8px_8px_-4px_rgba(16,24,40,0.04)] p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="flex flex-col gap-8">
            {/* Header */}
            <div className="flex flex-col gap-5 items-start w-full">
              <div className="bg-[#ded3cb] rounded-[28px] w-12 h-12 flex items-center justify-center">
                <div className="relative rounded-[28px] w-full h-full">
                  <div className="absolute border-8 border-[#ece5e0] border-solid inset-[-4px] pointer-events-none rounded-[32px]" />
                  <div className="absolute left-3 top-3 w-6 h-6 flex items-center justify-center">
                    <FileTextIcon className="w-4 h-4 text-[#9e7b64]" />
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2 w-full">
                <h3 className="font-medium text-[#101828] text-lg leading-[28px]">
                  Engagement Contract
                </h3>
                <p className="font-normal text-[#667085] text-sm leading-[20px]">
                  Review and sign the contract for {actionRequest.companyName}
                </p>
              </div>
        </div>

            {/* Contract Content */}
            <div className="flex flex-col gap-6 w-full">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <h4 className="font-semibold text-gray-900 text-base mb-4">Fractional CFO Engagement Agreement</h4>
                
                <div className="space-y-4 text-sm text-gray-700 leading-relaxed">
                  <div>
                    <strong>Parties:</strong>
                    <p>This agreement is between {actionRequest.companyName} (the "Client") and [CFO Name] (the "CFO") for fractional CFO services.</p>
                </div>
                  
                  <div>
                    <strong>Services:</strong>
                    <p>The CFO will provide financial leadership and strategic guidance including: {actionRequest.cfoNeeds.join(', ')}.</p>
              </div>
                  
                  <div>
                    <strong>Engagement Terms:</strong>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                      <li>Duration: {selectedRequest?.duration || actionRequest.duration}</li>
                      <li>Hours: {selectedRequest?.expectedHours || actionRequest.expectedHours}</li>
                      <li>Compensation: {selectedRequest?.budgetRange || actionRequest.budgetRange}</li>
                      <li>Start Date: {selectedRequest?.startDate || actionRequest.startDate}</li>
                    </ul>
                </div>
                  
                  <div>
                    <strong>Responsibilities:</strong>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                      <li>Financial planning and analysis</li>
                      <li>Cash flow management</li>
                      <li>Strategic financial guidance</li>
                      <li>Regular reporting and communication</li>
                    </ul>
              </div>
                  
                  <div>
                    <strong>Confidentiality:</strong>
                    <p>Both parties agree to maintain strict confidentiality of all business information shared during the engagement.</p>
                </div>
              </div>
            </div>

              {/* Signature Section */}
              <div className="space-y-4">
                <div className="flex flex-col gap-1.5">
                  <label className="font-medium text-[#344054] text-sm leading-[20px]">CFO Digital Signature</label>
                  <input
                    type="text"
                    value={contractData.cfoSignature}
                    onChange={(e) => setContractData({...contractData, cfoSignature: e.target.value})}
                    placeholder="Type your full name to sign"
                    className="bg-white px-3.5 py-2.5 border border-[#d0d5dd] rounded-lg text-[#101828] text-base leading-[24px] focus:outline-none focus:ring-2 focus:ring-[#9e7b64] focus:border-[#9e7b64]"
                  />
      </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-medium text-[#344054] text-sm leading-[20px]">Date</label>
                  <input
                    type="date"
                    value={contractData.date}
                    onChange={(e) => setContractData({...contractData, date: e.target.value})}
                    className="bg-white px-3.5 py-2.5 border border-[#d0d5dd] rounded-lg text-[#101828] text-base leading-[24px] focus:outline-none focus:ring-2 focus:ring-[#9e7b64] focus:border-[#9e7b64]"
                  />
                </div>

                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="termsAccepted"
                    checked={contractData.termsAccepted}
                    onChange={(e) => setContractData({...contractData, termsAccepted: e.target.checked})}
                    className="mt-1 w-4 h-4 text-[#9e7b64] border-gray-300 rounded focus:ring-[#9e7b64] focus:ring-2"
                  />
                  <label htmlFor="termsAccepted" className="text-sm text-gray-700">
                    I have read, understood, and agree to the terms and conditions of this engagement agreement.
                  </label>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 w-full">
              <Button 
                variant="outline" 
                className="flex-1 bg-white text-[#344054] border-[#d0d5dd] hover:bg-gray-50"
                onClick={() => {
                  setShowContractModal(false)
                  setActionRequest(null)
                  setContractData({
                    cfoSignature: '',
                    date: new Date().toISOString().split('T')[0],
                    termsAccepted: false
                  })
                }}
              >
                Cancel
              </Button>
              <Button 
                className="flex-1 bg-[#9e7b64] hover:bg-[#7d4f30] text-white border-[#9e7b64]"
                disabled={!contractData.cfoSignature || !contractData.termsAccepted}
                onClick={() => {
                  // Handle contract signing logic here
                  console.log('Contract signed for:', actionRequest.companyName, contractData)
                  setShowContractModal(false)
                  setActionRequest(null)
                  setContractData({
                    cfoSignature: '',
                    date: new Date().toISOString().split('T')[0],
                    termsAccepted: false
                  })
                  // Here you would typically move the client to active status
                }}
              >
                Sign Contract
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // New Request Card Component
  const renderNewRequestCard = (request: NewRequest) => (
    <Card 
      key={request.id} 
      className="hover:shadow-lg transition-all duration-200 cursor-pointer"
      onClick={() => {
        setSelectedRequest(request)
        setShowDetailModal(true)
      }}
    >
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 truncate">{request.companyName}</h3>
            <div className="grid grid-cols-2 gap-4 mt-2 text-sm text-gray-600">
              <div className="flex items-center gap-1 min-w-0 w-full">
                <MapPinIcon className="w-4 h-4 flex-shrink-0" />
                <span className="truncate flex-1">{request.location}</span>
          </div>
              <div className="flex items-center gap-1 min-w-0 w-full">
                {getIndustryIcon(request.industry)}
                <span className="truncate flex-1">{request.industry}</span>
              </div>
            </div>
          </div>
          {request.chemistryCallStatus === 'completed' && (
            <Badge className="bg-green-50 text-green-700 border-green-200 whitespace-nowrap">
              <CheckCircleIcon className="w-3 h-3 mr-1" />
              Call Done
            </Badge>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center gap-1 min-w-0 w-full">
            <DollarSignIcon className="w-4 h-4 text-gray-400 flex-shrink-0" />
            <span className="text-sm truncate flex-1">{request.revenueRange}</span>
                </div>
          <div className="flex items-center gap-1 min-w-0 w-full">
            <UsersIcon className="w-4 h-4 text-gray-400 flex-shrink-0" />
            <span className="text-sm truncate flex-1">{request.employeeCount}</span>
                </div>
              </div>

        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-900 mb-2 truncate">Financial Needs</h4>
          <div className="flex gap-1 overflow-hidden">
            {request.financialNeeds.slice(0, 2).map((need, index) => (
              <span key={index} className="px-2 py-1 bg-primary-50 text-primary-700 text-xs rounded whitespace-nowrap">
                {need}
              </span>
            ))}
            {request.financialNeeds.length > 2 && (
              <span className="px-2 py-1 bg-gray-50 text-gray-600 text-xs rounded whitespace-nowrap">
                +{request.financialNeeds.length - 2} more
              </span>
            )}
                </div>
                </div>

        <div className="flex items-center justify-between pt-4 border-t">
          <Button 
            variant="outline" 
            size="sm"
            onClick={(e) => {
              e.stopPropagation()
              setSelectedRequest(request)
              setShowDetailModal(true)
            }}
          >
            <EyeIcon className="w-4 h-4 mr-2" />
            View Details
          </Button>
          {request.chemistryCallStatus === 'none' ? (
            <Button 
              size="sm" 
              className="bg-primary-500 hover:bg-primary-600 text-white"
              onClick={(e) => {
                e.stopPropagation()
                setActionRequest(request)
                setShowScheduleCallModal(true)
              }}
            >
              <CalendarIcon className="w-4 h-4 mr-2" />
              Schedule Call
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={(e) => {
                  e.stopPropagation()
                  setActionRequest(request)
                  setShowDeclineModal(true)
                }}
              >
                Decline
              </Button>
              <Button 
                size="sm" 
                className="bg-primary-500 hover:bg-primary-600 text-white"
                onClick={(e) => {
                  e.stopPropagation()
                  setActionRequest(request)
                  setShowAcceptModal(true)
                }}
              >
                Accept
              </Button>
            </div>
          )}
              </div>
            </CardContent>
          </Card>
  )

  // Tab Content Renderers
  const renderTabContent = () => {
    switch (activeTab) {
      case 'new-requests':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockNewRequests.map(renderNewRequestCard)}
                </div>
        )
      case 'chemistry-calls':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mockChemistryCalls.map((call) => (
              <Card key={call.id} className="hover:shadow-md transition-shadow flex flex-col h-full">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="flex items-start justify-between mb-4">
                <div>
                      <h3 className="text-lg font-semibold text-gray-900">{call.companyName}</h3>
                      <p className="text-sm text-gray-600 mt-1">{call.overview}</p>
                </div>
                    <Badge 
                      className={call.status === 'scheduled' 
                        ? 'bg-green-50 text-green-700 border-green-200' 
                        : 'bg-gray-50 text-gray-700 border-gray-200'
                      }
                    >
                      {call.status.charAt(0).toUpperCase() + call.status.slice(1)}
                    </Badge>
              </div>
                  
                  <div className="space-y-3 flex-grow">
                    {call.scheduledDate ? (
                      <>
                        <div className="flex items-center gap-2">
                          <CalendarIcon className="w-4 h-4 text-gray-400" />
                          <span className="text-sm">
                            {formatDate(call.scheduledDate)}
                          </span>
                </div>
                        <div className="flex items-center gap-2">
                          <ClockIcon className="w-4 h-4 text-gray-400" />
                          <span className="text-sm">
                            {formatDateTime(call.scheduledDate).split(', ')[1]}
                          </span>
                </div>
                      </>
                    ) : (
                      <div className="flex items-center gap-2">
                        <CalendarIcon className="w-4 h-4 text-gray-400" />
                        <span className="text-sm">Pending Scheduling</span>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2 mt-6 justify-end">
                    {call.status === 'scheduled' ? (
                      <>
                        <Button size="sm" className="bg-primary-500 hover:bg-primary-600 text-white">
                          <VideoIcon className="w-4 h-4 mr-2" />
                          Join Call
                        </Button>
                        <Button variant="outline" size="sm">
                          <RefreshCwIcon className="w-4 h-4 mr-2" />
                          Reschedule
                        </Button>
                      </>
                    ) : (
                      <Button size="sm" className="bg-warning-500 hover:bg-warning-600 text-white">
                        <CalendarIcon className="w-4 h-4 mr-2" />
                        Schedule Call
                      </Button>
                    )}
                    <Button variant="outline" size="sm">
                      Cancel
                    </Button>
              </div>
            </CardContent>
          </Card>
            ))}
        </div>
        )
      case 'active':
        return (
          <div className="bg-white rounded-lg border overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Client Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Industry</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Engagement Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Progress</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Last Activity</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {mockActiveClients.map((client) => (
                  <tr key={client.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{client.clientName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        {getIndustryIcon(client.industry)}
                        <span className="text-sm text-gray-600">{client.industry}</span>
                </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-900">{client.engagementType}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-primary-500 h-2 rounded-full" 
                            style={{ width: `${client.progress}%` }}
                          ></div>
              </div>
                        <span className="text-sm text-gray-600">{client.progress}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {client.lastActivity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex gap-2">
                                                 <Button 
                           size="sm" 
                           className="bg-primary-500 hover:bg-primary-600 text-white"
                           onClick={() => onNavigate('projects-tasks', accountType, email)}
                         >
                           <ExternalLinkIcon className="w-4 h-4 mr-2" />
                           View Projects
                         </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    // Navigate to client workspace and set communication tab as active
                    onNavigate('cfo-client-workspace', accountType, email)
                    // Note: In a real implementation, you'd pass the client ID and default tab
                  }}
                >
                  <MessageSquareIcon className="w-4 h-4" />
                </Button>
              </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
        )
      case 'completed':
        return (
          <div className="bg-white rounded-lg border overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Client Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Engagement Period</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Final Deliverable</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rating</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {mockCompletedClients.map((client) => (
                  <tr key={client.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{client.clientName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {client.engagementPeriod}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {client.finalDeliverable}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <StarIcon 
                            key={star} 
                            className={`w-4 h-4 ${star <= client.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                          />
                        ))}
                        <span className="ml-2 text-sm text-gray-600">({client.rating})</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex gap-2">
                <Button variant="outline" size="sm">
                          <EyeIcon className="w-4 h-4 mr-2" />
                          View Summary
                        </Button>
                        <Button variant="outline" size="sm">
                          <DownloadIcon className="w-4 h-4 mr-2" />
                          Download Report
                </Button>
              </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
        )
      case 'declined':
        return (
          <div className="bg-white rounded-lg border overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Company Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date Declined</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reason</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {mockDeclinedRequests.map((request) => (
                  <tr key={request.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{request.companyName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {formatDate(request.dateDeclined)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      <div className="max-w-xs truncate" title={request.reason}>
                        {request.reason}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Button variant="outline" size="sm">
                        <RefreshCwIcon className="w-4 h-4 mr-2" />
                        Revisit
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-25 flex">
      {/* Sidebar */}
      <CFOSidebar 
        onNavigate={onNavigate}
        accountType={accountType}
        email={email}
        activePage="cfo-client-management"
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Client Management</h2>
              <p className="text-sm text-gray-600">Manage your client relationships and engagements</p>
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
            {/* Tab Navigation */}
            <div className="border-b border-gray-200 mb-6">
              <nav className="flex space-x-8">
                {[
                  { id: 'new-requests', label: 'New Requests', count: tabCounts['new-requests'] },
                  { id: 'chemistry-calls', label: 'Chemistry Calls', count: tabCounts['chemistry-calls'] },
                  { id: 'active', label: 'Active', count: tabCounts['active'] },
                  { id: 'completed', label: 'Completed', count: tabCounts['completed'] },
                  { id: 'declined', label: 'Declined', count: tabCounts['declined'] }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                      activeTab === tab.id
                        ? 'border-primary-500 text-primary-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {tab.label}
                    <Badge variant="secondary" className="ml-1">
                      {tab.count}
                    </Badge>
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab Content */}
            {renderTabContent()}

            {/* Detail Modal */}
            <DetailModal />
            
            {/* Confirmation Modals */}
            <AcceptModal />
            <DeclineModal />
            <ScheduleCallModal />
            <ContractModal />
          </div>
        </main>
      </div>
    </div>
  )
}

export default CfoClientManagement