import React, { useState } from 'react'
import { 
  ArrowLeftIcon,
  SettingsIcon,
  AlertTriangleIcon,
  CheckCircleIcon,
  ClockIcon,
  CalendarIcon,
  FileTextIcon,
  MessageSquareIcon,
  UsersIcon,
  BarChart3Icon,
  DollarSignIcon,
  TrendingUpIcon,
  DownloadIcon,
  ShareIcon,
  PlusIcon,
  FilterIcon,
  SearchIcon,
  BellIcon,
  MoreHorizontalIcon,
  VideoIcon,
  MapPinIcon,
  HomeIcon,
  UserIcon,
  LogOutIcon,
  XIcon
} from 'lucide-react'
import { Button } from '../components/ui/button'
import { Card, CardContent } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import CFOSidebar from '../components/CFOSidebar'
import { formatDate, formatDueDate } from '../utils/dateUtils'

type Page = 'sign-in' | 'sign-up' | 'create-account' | 'email-verification' | 'verification-success' | 'onboarding' | 'onboarding-success' | 'sme-dashboard' | 'sme-main-dashboard' | 'upload-center' | 'bank-connection' | 'enhanced-upload' | 'cfo-dashboard' | 'cfo-client-management' | 'cfo-client-workspace' | 'projects-tasks' | 'invoice-tracking'

interface CfoClientWorkspaceProps {
  onNavigate: (page: Page, accountType?: 'sme' | 'cfo', email?: string) => void
  accountType?: 'sme' | 'cfo'
  email?: string
  clientId?: string
}

interface Task {
  id: string
  title: string
  description: string
  status: 'pending' | 'in-progress' | 'completed' | 'overdue'
  priority: 'low' | 'medium' | 'high'
  dueDate: string
  assignedBy: string
  progress: number
  attachments: string[]
}

interface Alert {
  id: string
  type: 'urgent' | 'warning' | 'info'
  message: string
  date: string
}

interface Metric {
  label: string
  value: string
  change: string
  trend: 'up' | 'down' | 'neutral'
}

interface CompletedTask {
  id: string
  title: string
  completedDate: string
  submittedTo: string
  attachments: string[]
}

interface Deadline {
  id: string
  title: string
  dueDate: string
  priority: 'low' | 'medium' | 'high'
}

const CfoClientWorkspace: React.FC<CfoClientWorkspaceProps> = ({ 
  onNavigate, 
  accountType, 
  email, 
  clientId = 'techstartup-ltd' 
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'tasks' | 'communication' | 'client-data' | 'reports'>('overview')
  const [taskFilter, setTaskFilter] = useState<'all' | 'in-progress' | 'completed' | 'overdue'>('all')
  const [showNewTaskModal, setShowNewTaskModal] = useState(false)
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [activeCommTab, setActiveCommTab] = useState<'messages' | 'meetings' | 'files' | 'updates'>('messages')
  const [showNewMessageModal, setShowNewMessageModal] = useState(false)
  const [activeDataTab, setActiveDataTab] = useState<'financials' | 'operations' | 'reports' | 'analytics'>('financials')
  const [dateRange, setDateRange] = useState('last-30-days')
  const [activeReportTab, setActiveReportTab] = useState<'scheduled' | 'generated' | 'templates' | 'settings'>('scheduled')

  // Mock data for TechStartup Ltd
  const clientName = 'TechStartup Ltd'
  const clientData = {
    name: clientName,
    industry: 'Technology',
    engagementStart: '2024-09-01',
    contractValue: '₦2.5M',
    contactPerson: 'CEO - Sarah Johnson'
  }

  // Mock alerts
  const alerts: Alert[] = [
    {
      id: '1',
      type: 'urgent',
      message: 'Q4 Budget Review Due Today',
      date: '2024-12-10'
    },
    {
      id: '2',
      type: 'warning',
      message: 'Cash Flow Projection Needed by Friday',
      date: '2024-12-13'
    },
    {
      id: '3',
      type: 'info',
      message: 'Board Meeting Prep Required',
      date: '2024-12-15'
    }
  ]

  // Mock metrics
  const metrics: Metric[] = [
    {
      label: 'Current Cash',
      value: '₦15.2M',
      change: '+2.1M',
      trend: 'up'
    },
    {
      label: 'Monthly Burn',
      value: '₦2.1M',
      change: '-0.3M',
      trend: 'down'
    },
    {
      label: 'Revenue YTD',
      value: '₦45.2M',
      change: '+23%',
      trend: 'up'
    },
    {
      label: 'Cash Runway',
      value: '8 months',
      change: '+1 month',
      trend: 'up'
    }
  ]

  // Mock completed tasks
  const completedTasks: CompletedTask[] = [
    {
      id: '1',
      title: 'Financial Model Updated',
      completedDate: '2 hours ago',
      submittedTo: 'CEO',
      attachments: ['Financial_Model_v2.1.xlsx']
    },
    {
      id: '2',
      title: 'Monthly Report Sent',
      completedDate: 'Yesterday',
      submittedTo: 'Board',
      attachments: ['Monthly_Report_Nov2024.pdf']
    },
    {
      id: '3',
      title: 'Budget Variance Analysis',
      completedDate: '3 days ago',
      submittedTo: 'Management Team',
      attachments: ['Budget_Variance_Q3.xlsx']
    }
  ]

  // Mock deadlines
  const deadlines: Deadline[] = [
    {
      id: '1',
      title: 'Board Presentation',
      dueDate: 'Dec 15',
      priority: 'high'
    },
    {
      id: '2',
      title: 'Investor Update',
      dueDate: 'Dec 20',
      priority: 'medium'
    },
    {
      id: '3',
      title: 'Q4 Close',
      dueDate: 'Dec 31',
      priority: 'high'
    }
  ]

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'urgent':
        return <AlertTriangleIcon className="w-4 h-4 text-red-500" />
      case 'warning':
        return <AlertTriangleIcon className="w-4 h-4 text-yellow-500" />
      case 'info':
        return <BellIcon className="w-4 h-4 text-blue-500" />
      default:
        return <BellIcon className="w-4 h-4 text-gray-500" />
    }
  }

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'urgent':
        return 'border-red-200 bg-red-50'
      case 'warning':
        return 'border-yellow-200 bg-yellow-50'
      case 'info':
        return 'border-blue-200 bg-blue-50'
      default:
        return 'border-gray-200 bg-gray-50'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-600 bg-red-50 border-red-200'
      case 'medium':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200'
      case 'low':
        return 'text-green-600 bg-green-50 border-green-200'
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  const renderOverviewTab = () => (
    <div className="space-y-6">
      {/* Priority Alerts */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Priority Alerts</h3>
            <Badge variant="outline" className="text-xs">
              {alerts.length} items
            </Badge>
          </div>
          <div className="space-y-3">
            {alerts.map((alert) => (
              <div key={alert.id} className={`flex items-center gap-3 p-3 rounded-lg border ${getAlertColor(alert.type)}`}>
                {getAlertIcon(alert.type)}
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{alert.message}</p>
                  <p className="text-xs text-gray-500">{alert.date}</p>
                </div>
                <Button size="sm" variant="outline">
                  View
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Metrics */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Metrics</h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {metrics.map((metric, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">{metric.label}</p>
                    <p className="text-xl font-semibold text-gray-900">{metric.value}</p>
                  </div>
                  <div className={`flex items-center gap-1 text-sm ${
                    metric.trend === 'up' ? 'text-green-600' : 
                    metric.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                  }`}>
                    <TrendingUpIcon className={`w-4 h-4 ${
                      metric.trend === 'down' ? 'rotate-180' : ''
                    }`} />
                    <span>{metric.change}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Completed Tasks */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Recent Completed Tasks</h3>
            <Button size="sm" variant="outline">
              View All
            </Button>
          </div>
          <div className="space-y-3">
            {completedTasks.map((task) => (
              <div key={task.id} className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <CheckCircleIcon className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{task.title}</p>
                    <p className="text-xs text-gray-500">Submitted to {task.submittedTo} • {task.completedDate}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {task.attachments.length > 0 && (
                    <Badge variant="outline" className="text-xs">
                      {task.attachments.length} file{task.attachments.length > 1 ? 's' : ''}
                    </Badge>
                  )}
                  <Button size="sm" variant="outline">
                    View
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Deadlines */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Upcoming Deadlines</h3>
            <Button size="sm" variant="outline">
              View Calendar
            </Button>
          </div>
          <div className="space-y-3">
            {deadlines.map((deadline) => (
              <div key={deadline.id} className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <CalendarIcon className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{deadline.title}</p>
                    <p className="text-xs text-gray-500">{formatDueDate(deadline.dueDate)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={`text-xs ${getPriorityColor(deadline.priority)}`}>
                    {deadline.priority}
                  </Badge>
                  <Button size="sm" variant="outline">
                    Start
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderTasksTab = () => {

    // Mock tasks data
    const tasks: Task[] = [
      {
        id: '1',
        title: 'Q4 Budget Planning',
        description: 'Create comprehensive budget plan for Q4 including revenue projections, expense forecasts, and cash flow analysis.',
        status: 'in-progress',
        priority: 'high',
        dueDate: '2024-12-15',
        assignedBy: 'CEO',
        progress: 75,
        attachments: ['Budget_Template.xlsx', 'Q3_Results.pdf']
      },
      {
        id: '2',
        title: 'Investor Presentation',
        description: 'Prepare investor update presentation with Q3 results, Q4 projections, and strategic initiatives.',
        status: 'in-progress',
        priority: 'medium',
        dueDate: '2024-12-20',
        assignedBy: 'CEO',
        progress: 40,
        attachments: ['Investor_Deck_Template.pptx']
      },
      {
        id: '3',
        title: 'Cash Flow Analysis',
        description: 'Analyze current cash flow patterns and provide recommendations for optimization.',
        status: 'overdue',
        priority: 'high',
        dueDate: '2024-12-08',
        assignedBy: 'Board',
        progress: 90,
        attachments: ['Cash_Flow_Model.xlsx']
      },
      {
        id: '4',
        title: 'Monthly Financial Report',
        description: 'Generate and submit monthly financial report to management team.',
        status: 'completed',
        priority: 'medium',
        dueDate: '2024-12-10',
        assignedBy: 'CEO',
        progress: 100,
        attachments: ['Monthly_Report_Nov2024.pdf', 'Financial_Summary.xlsx']
      },
      {
        id: '5',
        title: 'Board Meeting Preparation',
        description: 'Prepare materials and analysis for upcoming board meeting.',
        status: 'pending',
        priority: 'high',
        dueDate: '2024-12-15',
        assignedBy: 'Board Chair',
        progress: 0,
        attachments: []
      }
    ]

    const filteredTasks = tasks.filter(task => {
      if (taskFilter === 'all') return true
      return task.status === taskFilter
    })

    const getStatusColor = (status: string) => {
      switch (status) {
        case 'completed':
          return 'bg-green-100 text-green-800 border-green-200'
        case 'in-progress':
          return 'bg-blue-100 text-blue-800 border-blue-200'
        case 'overdue':
          return 'bg-red-100 text-red-800 border-red-200'
        case 'pending':
          return 'bg-gray-100 text-gray-800 border-gray-200'
        default:
          return 'bg-gray-100 text-gray-800 border-gray-200'
      }
    }

    const getProgressColor = (progress: number) => {
      if (progress >= 80) return 'bg-green-500'
      if (progress >= 50) return 'bg-yellow-500'
      return 'bg-red-500'
    }

    const TaskCard = ({ task }: { task: Task }) => (
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h4 className="text-lg font-semibold text-gray-900">{task.title}</h4>
                <Badge className={`text-xs ${getStatusColor(task.status)}`}>
                  {task.status.replace('-', ' ')}
                </Badge>
                <Badge className={`text-xs ${getPriorityColor(task.priority)}`}>
                  {task.priority}
                </Badge>
              </div>
              <p className="text-sm text-gray-600 mb-3">{task.description}</p>
              
              <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                <div className="flex items-center gap-1">
                  <CalendarIcon className="w-4 h-4" />
                  {formatDueDate(task.dueDate)}
                </div>
                <div className="flex items-center gap-1">
                  <UsersIcon className="w-4 h-4" />
                  Assigned by: {task.assignedBy}
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-gray-600">Progress</span>
                  <span className="font-medium">{task.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${getProgressColor(task.progress)}`}
                    style={{ width: `${task.progress}%` }}
                  />
                </div>
              </div>

              {/* Attachments */}
              {task.attachments.length > 0 && (
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Attachments:</p>
                  <div className="flex flex-wrap gap-2">
                    {task.attachments.map((file, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        <FileTextIcon className="w-3 h-3 mr-1" />
                        {file}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            {task.status === 'in-progress' && (
              <>
                <Button size="sm" variant="outline">
                  Update Progress
                </Button>
                <Button size="sm" variant="outline">
                  Submit for Review
                </Button>
                <Button size="sm" className="bg-green-600 hover:bg-green-700">
                  Mark Complete
                </Button>
              </>
            )}
            {task.status === 'pending' && (
              <>
                <Button size="sm" variant="outline">
                  Start Task
                </Button>
                <Button size="sm" variant="outline">
                  Request Extension
                </Button>
              </>
            )}
            {task.status === 'overdue' && (
              <>
                <Button size="sm" className="bg-red-600 hover:bg-red-700">
                  Mark Complete
                </Button>
                <Button size="sm" variant="outline">
                  Request Extension
                </Button>
              </>
            )}
            {task.status === 'completed' && (
              <>
                <Button size="sm" variant="outline">
                  View Deliverable
                </Button>
                <Button size="sm" variant="outline">
                  Download Files
                </Button>
              </>
            )}
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => setSelectedTask(task)}
            >
              View Details
            </Button>
          </div>
        </CardContent>
      </Card>
    )

    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Task Management</h3>
            <p className="text-sm text-gray-600">Manage and track your deliverables for {clientName}</p>
          </div>
          <Button onClick={() => setShowNewTaskModal(true)}>
            <PlusIcon className="w-4 h-4 mr-2" />
            New Task
          </Button>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-lg">
          {[
            { id: 'all', label: 'All Tasks', count: tasks.length },
            { id: 'in-progress', label: 'In Progress', count: tasks.filter(t => t.status === 'in-progress').length },
            { id: 'completed', label: 'Completed', count: tasks.filter(t => t.status === 'completed').length },
            { id: 'overdue', label: 'Overdue', count: tasks.filter(t => t.status === 'overdue').length }
          ].map((filter) => (
            <button
              key={filter.id}
              onClick={() => setTaskFilter(filter.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                taskFilter === filter.id
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {filter.label}
              <Badge variant="outline" className="text-xs">
                {filter.count}
              </Badge>
            </button>
          ))}
        </div>

        {/* Tasks Grid */}
        <div className="grid gap-6">
          {filteredTasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>

        {/* Empty State */}
        {filteredTasks.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <FileTextIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No tasks found</h3>
              <p className="text-gray-600 mb-4">
                {taskFilter === 'all' 
                  ? "You don't have any tasks yet. Create your first task to get started."
                  : `No ${taskFilter.replace('-', ' ')} tasks found.`
                }
              </p>
              {taskFilter === 'all' && (
                <Button onClick={() => setShowNewTaskModal(true)}>
                  <PlusIcon className="w-4 h-4 mr-2" />
                  Create First Task
                </Button>
              )}
            </CardContent>
          </Card>
        )}

        {/* Task Details Modal would go here */}
        {selectedTask && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Task Details</h3>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setSelectedTask(null)}
                >
                  <XIcon className="w-4 h-4" />
                </Button>
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900">{selectedTask.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">{selectedTask.description}</p>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Status:</span>
                    <Badge className={`ml-2 ${getStatusColor(selectedTask.status)}`}>
                      {selectedTask.status.replace('-', ' ')}
                    </Badge>
                  </div>
                  <div>
                    <span className="text-gray-500">Priority:</span>
                    <Badge className={`ml-2 ${getPriorityColor(selectedTask.priority)}`}>
                      {selectedTask.priority}
                    </Badge>
                  </div>
                  <div>
                    <span className="text-gray-500">Due Date:</span>
                    <span className="ml-2">{formatDate(selectedTask.dueDate)}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Assigned by:</span>
                    <span className="ml-2">{selectedTask.assignedBy}</span>
                  </div>
                </div>
                <div>
                  <span className="text-gray-500">Progress:</span>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${getProgressColor(selectedTask.progress)}`}
                        style={{ width: `${selectedTask.progress}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium">{selectedTask.progress}%</span>
                  </div>
                </div>
                {selectedTask.attachments.length > 0 && (
                  <div>
                    <span className="text-gray-500">Attachments:</span>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {selectedTask.attachments.map((file, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          <FileTextIcon className="w-3 h-3 mr-1" />
                          {file}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }

  const renderCommunicationTab = () => {

    // Mock communication data
    const messages = [
      {
        id: '1',
        from: 'CEO - Sarah Johnson',
        subject: 'Q4 Budget Review Discussion',
        preview: 'Can we discuss the Q4 budget tomorrow? I have some questions about the revenue projections.',
        timestamp: '2 hours ago',
        unread: true,
        priority: 'high'
      },
      {
        id: '2',
        from: 'Board Chair - Michael Chen',
        subject: 'Investor Meeting Preparation',
        preview: 'We need to prepare for the investor meeting next week. Can you provide the financial highlights?',
        timestamp: '1 day ago',
        unread: false,
        priority: 'medium'
      },
      {
        id: '3',
        from: 'Finance Team',
        subject: 'Monthly Report Feedback',
        preview: 'Great work on the monthly report! The board was very impressed with the clarity.',
        timestamp: '3 days ago',
        unread: false,
        priority: 'low'
      }
    ]

    const meetings = [
      {
        id: '1',
        title: 'Weekly CFO Check-in',
        date: 'Tomorrow, 10:00 AM',
        duration: '30 minutes',
        attendees: ['CEO - Sarah Johnson', 'CFO', 'Finance Team'],
        type: 'video',
        status: 'scheduled',
        link: 'https://meet.google.com/abc-defg-hij'
      },
      {
        id: '2',
        title: 'Board Meeting',
        date: 'Dec 15, 2:00 PM',
        duration: '1 hour',
        attendees: ['Board Members', 'CEO', 'CFO'],
        type: 'in-person',
        status: 'scheduled',
        location: 'Board Room, Main Office'
      },
      {
        id: '3',
        title: 'Q4 Budget Review',
        date: 'Dec 12, 11:00 AM',
        duration: '45 minutes',
        attendees: ['CEO', 'CFO', 'Department Heads'],
        type: 'hybrid',
        status: 'pending',
        location: 'Conference Room A'
      }
    ]

    const sharedFiles = [
      {
        id: '1',
        name: 'Financial Model v2.1.xlsx',
        type: 'excel',
        size: '2.4 MB',
        updatedBy: 'CFO',
        updatedAt: '2 hours ago',
        sharedBy: 'CFO'
      },
      {
        id: '2',
        name: 'Board Presentation Draft.pptx',
        type: 'powerpoint',
        size: '5.1 MB',
        updatedBy: 'CEO',
        updatedAt: '1 day ago',
        sharedBy: 'CEO'
      },
      {
        id: '3',
        name: 'Monthly Report Nov 2024.pdf',
        type: 'pdf',
        size: '1.8 MB',
        updatedBy: 'CFO',
        updatedAt: '3 days ago',
        sharedBy: 'CFO'
      }
    ]

    const updates = [
      {
        id: '1',
        type: 'task_completed',
        title: 'Monthly Financial Report Completed',
        description: 'November 2024 financial report has been submitted and approved.',
        timestamp: '2 hours ago',
        user: 'CFO'
      },
      {
        id: '2',
        type: 'file_shared',
        title: 'Financial Model Updated',
        description: 'Updated financial model with Q4 projections has been shared.',
        timestamp: '1 day ago',
        user: 'CFO'
      },
      {
        id: '3',
        type: 'meeting_scheduled',
        title: 'Board Meeting Scheduled',
        description: 'Q4 board meeting has been scheduled for December 15th.',
        timestamp: '3 days ago',
        user: 'CEO'
      }
    ]

    const getFileIcon = (type: string) => {
      switch (type) {
        case 'excel':
          return '📊'
        case 'powerpoint':
          return '📈'
        case 'pdf':
          return '📄'
        default:
          return '📁'
      }
    }

    const getUpdateIcon = (type: string) => {
      switch (type) {
        case 'task_completed':
          return <CheckCircleIcon className="w-5 h-5 text-green-600" />
        case 'file_shared':
          return <FileTextIcon className="w-5 h-5 text-blue-600" />
        case 'meeting_scheduled':
          return <CalendarIcon className="w-5 h-5 text-purple-600" />
        default:
          return <BellIcon className="w-5 h-5 text-gray-600" />
      }
    }

    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Client Communication</h3>
            <p className="text-sm text-gray-600">Stay connected with {clientName} team</p>
          </div>
          <Button onClick={() => setShowNewMessageModal(true)}>
            <MessageSquareIcon className="w-4 h-4 mr-2" />
            New Message
          </Button>
        </div>

        {/* Communication Tabs */}
        <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-lg">
          {[
            { id: 'messages', label: 'Messages', count: messages.filter(m => m.unread).length },
            { id: 'meetings', label: 'Meetings', count: meetings.length },
            { id: 'files', label: 'Shared Files', count: sharedFiles.length },
            { id: 'updates', label: 'Updates', count: updates.length }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveCommTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeCommTab === tab.id
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.label}
              {tab.count > 0 && (
                <Badge variant="outline" className="text-xs">
                  {tab.count}
                </Badge>
              )}
            </button>
          ))}
        </div>

        {/* Messages Tab */}
        {activeCommTab === 'messages' && (
          <div className="space-y-4">
            {messages.map((message) => (
              <Card key={message.id} className={`hover:shadow-md transition-shadow ${message.unread ? 'border-blue-200 bg-blue-50' : ''}`}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-medium text-gray-900">{message.subject}</h4>
                        {message.unread && (
                          <Badge className="bg-blue-100 text-blue-800 border-blue-200 text-xs">
                            New
                          </Badge>
                        )}
                        <Badge className={`text-xs ${getPriorityColor(message.priority)}`}>
                          {message.priority}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{message.preview}</p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>From: {message.from}</span>
                        <span>{message.timestamp}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <Button size="sm" variant="outline">
                        Reply
                      </Button>
                      <Button size="sm" variant="outline">
                        View
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Meetings Tab */}
        {activeCommTab === 'meetings' && (
          <div className="space-y-4">
            {meetings.map((meeting) => (
              <Card key={meeting.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-medium text-gray-900">{meeting.title}</h4>
                        <Badge className={`text-xs ${
                          meeting.status === 'scheduled' ? 'bg-green-100 text-green-800 border-green-200' : 'bg-yellow-100 text-yellow-800 border-yellow-200'
                        }`}>
                          {meeting.status}
                        </Badge>
                      </div>
                      <div className="space-y-1 text-sm text-gray-600 mb-3">
                        <div className="flex items-center gap-2">
                          <CalendarIcon className="w-4 h-4" />
                          {meeting.date} • {meeting.duration}
                        </div>
                        <div className="flex items-center gap-2">
                          <UsersIcon className="w-4 h-4" />
                          {meeting.attendees.join(', ')}
                        </div>
                        <div className="flex items-center gap-2">
                          {meeting.type === 'video' ? (
                            <>
                              <VideoIcon className="w-4 h-4" />
                              {meeting.link}
                            </>
                          ) : (
                            <>
                              <MapPinIcon className="w-4 h-4" />
                              {meeting.location}
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      {meeting.status === 'scheduled' && meeting.type === 'video' && (
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
                          Join Meeting
                        </Button>
                      )}
                      <Button size="sm" variant="outline">
                        Reschedule
                      </Button>
                      <Button size="sm" variant="outline">
                        Cancel
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Files Tab */}
        {activeCommTab === 'files' && (
          <div className="space-y-4">
            {sharedFiles.map((file) => (
              <Card key={file.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">{getFileIcon(file.type)}</div>
                      <div>
                        <h4 className="font-medium text-gray-900">{file.name}</h4>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>{file.size}</span>
                          <span>Updated by {file.updatedBy}</span>
                          <span>{file.updatedAt}</span>
                          <span>Shared by {file.sharedBy}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline">
                        <DownloadIcon className="w-4 h-4 mr-1" />
                        Download
                      </Button>
                      <Button size="sm" variant="outline">
                        <ShareIcon className="w-4 h-4 mr-1" />
                        Share
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Updates Tab */}
        {activeCommTab === 'updates' && (
          <div className="space-y-4">
            {updates.map((update) => (
              <Card key={update.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    {getUpdateIcon(update.type)}
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{update.title}</h4>
                      <p className="text-sm text-gray-600 mb-2">{update.description}</p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>By {update.user}</span>
                        <span>{update.timestamp}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    )
  }

  const renderClientDataTab = () => {

    // Mock financial data
    const financialData = {
      currentCash: '₦15.2M',
      monthlyRevenue: '₦8.5M',
      monthlyExpenses: '₦6.3M',
      netIncome: '₦2.2M',
      accountsReceivable: '₦3.8M',
      accountsPayable: '₦2.1M',
      cashFlow: [
        { month: 'Aug', cash: 12.5, revenue: 7.2, expenses: 5.8 },
        { month: 'Sep', cash: 13.8, revenue: 7.8, expenses: 6.1 },
        { month: 'Oct', cash: 14.2, revenue: 8.1, expenses: 6.2 },
        { month: 'Nov', cash: 15.2, revenue: 8.5, expenses: 6.3 }
      ]
    }

    // Mock operational data
    const operationalData = {
      salesPipeline: '₦45.2M',
      customerAcquisitionCost: '₦12,500',
      customerLifetimeValue: '₦85,000',
      monthlyRecurringRevenue: '₦6.8M',
      churnRate: '2.3%',
      averageDealSize: '₦125,000',
      salesCycle: '45 days',
      leadConversionRate: '18%'
    }

    // Mock reports
    const reports = [
      {
        id: '1',
        name: 'Monthly P&L Statement',
        type: 'financial',
        period: 'November 2024',
        status: 'generated',
        lastUpdated: '2 hours ago',
        size: '2.1 MB'
      },
      {
        id: '2',
        name: 'Cash Flow Analysis',
        type: 'financial',
        period: 'Q4 2024',
        status: 'generated',
        lastUpdated: '1 day ago',
        size: '1.8 MB'
      },
      {
        id: '3',
        name: 'Sales Performance Report',
        type: 'operational',
        period: 'November 2024',
        status: 'generated',
        lastUpdated: '3 days ago',
        size: '3.2 MB'
      },
      {
        id: '4',
        name: 'Customer Analytics',
        type: 'analytics',
        period: 'Q4 2024',
        status: 'pending',
        lastUpdated: '5 days ago',
        size: '4.5 MB'
      }
    ]

    // Mock analytics
    const analytics = {
      revenueGrowth: '+23%',
      profitMargin: '26%',
      cashRunway: '8 months',
      burnRate: '₦2.1M/month',
      customerGrowth: '+15%',
      marketShare: '12%',
      efficiencyScore: '85/100',
      riskScore: 'Low'
    }

    const getReportIcon = (type: string) => {
      switch (type) {
        case 'financial':
          return <DollarSignIcon className="w-5 h-5 text-green-600" />
        case 'operational':
          return <BarChart3Icon className="w-5 h-5 text-blue-600" />
        case 'analytics':
          return <TrendingUpIcon className="w-5 h-4 text-purple-600" />
        default:
          return <FileTextIcon className="w-5 h-5 text-gray-600" />
      }
    }

    const getStatusColor = (status: string) => {
      switch (status) {
        case 'generated':
          return 'bg-green-100 text-green-800 border-green-200'
        case 'pending':
          return 'bg-yellow-100 text-yellow-800 border-yellow-200'
        case 'processing':
          return 'bg-blue-100 text-blue-800 border-blue-200'
        default:
          return 'bg-gray-100 text-gray-800 border-gray-200'
      }
    }

    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Client Data Access</h3>
            <p className="text-sm text-gray-600">Access {clientName}'s financial and operational data</p>
          </div>
          <div className="flex items-center gap-3">
            <select 
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="last-7-days">Last 7 days</option>
              <option value="last-30-days">Last 30 days</option>
              <option value="last-90-days">Last 90 days</option>
              <option value="last-year">Last year</option>
            </select>
            <Button variant="outline">
              <DownloadIcon className="w-4 h-4 mr-2" />
              Export Data
            </Button>
          </div>
        </div>

        {/* Data Tabs */}
        <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-lg">
          {[
            { id: 'financials', label: 'Financials', icon: DollarSignIcon },
            { id: 'operations', label: 'Operations', icon: BarChart3Icon },
            { id: 'reports', label: 'Reports', icon: FileTextIcon },
            { id: 'analytics', label: 'Analytics', icon: TrendingUpIcon }
          ].map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveDataTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeDataTab === tab.id
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            )
          })}
        </div>

        {/* Financials Tab */}
        {activeDataTab === 'financials' && (
          <div className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Current Cash</p>
                      <p className="text-xl font-semibold text-gray-900">{financialData.currentCash}</p>
                    </div>
                    <DollarSignIcon className="w-8 h-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Monthly Revenue</p>
                      <p className="text-xl font-semibold text-gray-900">{financialData.monthlyRevenue}</p>
                    </div>
                    <TrendingUpIcon className="w-8 h-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Monthly Expenses</p>
                      <p className="text-xl font-semibold text-gray-900">{financialData.monthlyExpenses}</p>
                    </div>
                    <BarChart3Icon className="w-8 h-8 text-red-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Net Income</p>
                      <p className="text-xl font-semibold text-gray-900">{financialData.netIncome}</p>
                    </div>
                    <CheckCircleIcon className="w-8 h-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Cash Flow Chart */}
            <Card>
              <CardContent className="p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Cash Flow Trend</h4>
                <div className="space-y-3">
                  {financialData.cashFlow.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-4">
                        <span className="font-medium text-gray-900">{item.month}</span>
                        <div className="flex items-center gap-6 text-sm">
                          <span className="text-green-600">Cash: ₦{item.cash}M</span>
                          <span className="text-blue-600">Revenue: ₦{item.revenue}M</span>
                          <span className="text-red-600">Expenses: ₦{item.expenses}M</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-500 h-2 rounded-full" 
                            style={{ width: `${(item.cash / 20) * 100}%` }}
                          />
                        </div>
                        <span className="text-xs text-gray-500">{item.cash}M</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Accounts Summary */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardContent className="p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Accounts Receivable</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Total Outstanding</span>
                      <span className="font-semibold text-gray-900">{financialData.accountsReceivable}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Overdue (&gt;30 days)</span>
                      <span className="font-semibold text-red-600">₦850K</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Average Days Outstanding</span>
                      <span className="font-semibold text-gray-900">28 days</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Accounts Payable</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Total Outstanding</span>
                      <span className="font-semibold text-gray-900">{financialData.accountsPayable}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Due This Week</span>
                      <span className="font-semibold text-yellow-600">₦450K</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Average Payment Terms</span>
                      <span className="font-semibold text-gray-900">30 days</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Operations Tab */}
        {activeDataTab === 'operations' && (
          <div className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Sales Pipeline</p>
                      <p className="text-xl font-semibold text-gray-900">{operationalData.salesPipeline}</p>
                    </div>
                    <BarChart3Icon className="w-8 h-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">MRR</p>
                      <p className="text-xl font-semibold text-gray-900">{operationalData.monthlyRecurringRevenue}</p>
                    </div>
                    <TrendingUpIcon className="w-8 h-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Churn Rate</p>
                      <p className="text-xl font-semibold text-gray-900">{operationalData.churnRate}</p>
                    </div>
                    <AlertTriangleIcon className="w-8 h-8 text-red-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Avg Deal Size</p>
                      <p className="text-xl font-semibold text-gray-900">{operationalData.averageDealSize}</p>
                    </div>
                    <DollarSignIcon className="w-8 h-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Operational Details */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardContent className="p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Customer Metrics</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Customer Acquisition Cost</span>
                      <span className="font-semibold text-gray-900">{operationalData.customerAcquisitionCost}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Customer Lifetime Value</span>
                      <span className="font-semibold text-gray-900">{operationalData.customerLifetimeValue}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">LTV/CAC Ratio</span>
                      <span className="font-semibold text-green-600">6.8x</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Sales Performance</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Sales Cycle</span>
                      <span className="font-semibold text-gray-900">{operationalData.salesCycle}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Lead Conversion Rate</span>
                      <span className="font-semibold text-gray-900">{operationalData.leadConversionRate}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Win Rate</span>
                      <span className="font-semibold text-green-600">32%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Reports Tab */}
        {activeDataTab === 'reports' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-semibold text-gray-900">Available Reports</h4>
              <Button>
                <PlusIcon className="w-4 h-4 mr-2" />
                Generate New Report
              </Button>
            </div>
            <div className="grid gap-4">
              {reports.map((report) => (
                <Card key={report.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {getReportIcon(report.type)}
                        <div>
                          <h5 className="font-medium text-gray-900">{report.name}</h5>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span>{report.period}</span>
                            <span>{report.size}</span>
                            <span>Updated {report.lastUpdated}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={`text-xs ${getStatusColor(report.status)}`}>
                          {report.status}
                        </Badge>
                        <Button size="sm" variant="outline">
                          <DownloadIcon className="w-4 h-4 mr-1" />
                          Download
                        </Button>
                        <Button size="sm" variant="outline">
                          <ShareIcon className="w-4 h-4 mr-1" />
                          Share
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeDataTab === 'analytics' && (
          <div className="space-y-6">
            {/* Key Analytics */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Revenue Growth</p>
                      <p className="text-xl font-semibold text-green-600">{analytics.revenueGrowth}</p>
                    </div>
                    <TrendingUpIcon className="w-8 h-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Profit Margin</p>
                      <p className="text-xl font-semibold text-gray-900">{analytics.profitMargin}</p>
                    </div>
                    <BarChart3Icon className="w-8 h-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Cash Runway</p>
                      <p className="text-xl font-semibold text-gray-900">{analytics.cashRunway}</p>
                    </div>
                    <ClockIcon className="w-8 h-8 text-yellow-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Risk Score</p>
                      <p className="text-xl font-semibold text-green-600">{analytics.riskScore}</p>
                    </div>
                    <CheckCircleIcon className="w-8 h-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Performance Metrics */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardContent className="p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Performance Metrics</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Customer Growth</span>
                      <span className="font-semibold text-green-600">{analytics.customerGrowth}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Market Share</span>
                      <span className="font-semibold text-gray-900">{analytics.marketShare}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Efficiency Score</span>
                      <span className="font-semibold text-blue-600">{analytics.efficiencyScore}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Financial Health</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Burn Rate</span>
                      <span className="font-semibold text-red-600">{analytics.burnRate}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Cash Flow Ratio</span>
                      <span className="font-semibold text-green-600">1.8x</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Debt-to-Equity</span>
                      <span className="font-semibold text-gray-900">0.3x</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    )
  }

  const renderReportsTab = () => {

    // Mock scheduled reports
    const scheduledReports = [
      {
        id: '1',
        name: 'Monthly Financial Summary',
        type: 'financial',
        frequency: 'Monthly',
        nextRun: 'Dec 31, 2024',
        recipients: ['CEO - Sarah Johnson', 'Board Members'],
        status: 'active',
        lastGenerated: 'Nov 30, 2024'
      },
      {
        id: '2',
        name: 'Quarterly Board Report',
        type: 'financial',
        frequency: 'Quarterly',
        nextRun: 'Jan 15, 2025',
        recipients: ['Board Members', 'Investors'],
        status: 'active',
        lastGenerated: 'Oct 15, 2024'
      },
      {
        id: '3',
        name: 'Weekly Cash Flow Analysis',
        type: 'financial',
        frequency: 'Weekly',
        nextRun: 'Dec 16, 2024',
        recipients: ['CEO', 'Finance Team'],
        status: 'paused',
        lastGenerated: 'Dec 9, 2024'
      }
    ]

    // Mock generated reports
    const generatedReports = [
      {
        id: '1',
        name: 'Q4 Budget Variance Report',
        type: 'financial',
        generatedDate: 'Dec 10, 2024',
        recipients: ['Management Team'],
        status: 'delivered',
        openRate: '85%',
        size: '2.1 MB'
      },
      {
        id: '2',
        name: 'November Financial Summary',
        type: 'financial',
        generatedDate: 'Dec 1, 2024',
        recipients: ['CEO', 'Board'],
        status: 'delivered',
        openRate: '92%',
        size: '1.8 MB'
      },
      {
        id: '3',
        name: 'Cash Flow Analysis',
        type: 'financial',
        generatedDate: 'Dec 9, 2024',
        recipients: ['Finance Team'],
        status: 'delivered',
        openRate: '78%',
        size: '1.5 MB'
      }
    ]

    // Mock report templates
    const reportTemplates = [
      {
        id: '1',
        name: 'Monthly Executive Summary',
        type: 'financial',
        description: 'Comprehensive monthly financial overview for executives',
        estimatedTime: '5 minutes',
        includes: ['P&L Summary', 'Cash Flow', 'Key Metrics', 'Forecasts']
      },
      {
        id: '2',
        name: 'Quarterly Board Report',
        type: 'financial',
        description: 'Detailed quarterly report for board members and investors',
        estimatedTime: '10 minutes',
        includes: ['Financial Performance', 'Strategic Analysis', 'Risk Assessment', 'Outlook']
      },
      {
        id: '3',
        name: 'Cash Flow Analysis',
        type: 'financial',
        description: 'Weekly cash flow monitoring and analysis',
        estimatedTime: '3 minutes',
        includes: ['Cash Position', 'Cash Flow Statement', 'Projections', 'Alerts']
      },
      {
        id: '4',
        name: 'Budget vs Actual',
        type: 'financial',
        description: 'Monthly budget variance analysis and reporting',
        estimatedTime: '7 minutes',
        includes: ['Budget Comparison', 'Variance Analysis', 'Trends', 'Recommendations']
      }
    ]

    const getReportTypeIcon = (type: string) => {
      switch (type) {
        case 'financial':
          return <DollarSignIcon className="w-5 h-5 text-green-600" />
        case 'operational':
          return <BarChart3Icon className="w-5 h-5 text-blue-600" />
        case 'analytics':
          return <TrendingUpIcon className="w-5 h-5 text-purple-600" />
        default:
          return <FileTextIcon className="w-5 h-5 text-gray-600" />
      }
    }

    const getStatusColor = (status: string) => {
      switch (status) {
        case 'active':
          return 'bg-green-100 text-green-800 border-green-200'
        case 'paused':
          return 'bg-yellow-100 text-yellow-800 border-yellow-200'
        case 'delivered':
          return 'bg-blue-100 text-blue-800 border-blue-200'
        default:
          return 'bg-gray-100 text-gray-800 border-gray-200'
      }
    }

    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Automated Reporting</h3>
            <p className="text-sm text-gray-600">Manage automated reports and analytics for {clientName}</p>
          </div>
          <Button>
            <PlusIcon className="w-4 h-4 mr-2" />
            New Report
          </Button>
        </div>

        {/* Report Tabs */}
        <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-lg">
          {[
            { id: 'scheduled', label: 'Scheduled', count: scheduledReports.length },
            { id: 'generated', label: 'Generated', count: generatedReports.length },
            { id: 'templates', label: 'Templates', count: reportTemplates.length },
            { id: 'settings', label: 'Settings', count: 0 }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveReportTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeReportTab === tab.id
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.label}
              {tab.count > 0 && (
                <Badge variant="outline" className="text-xs">
                  {tab.count}
                </Badge>
              )}
            </button>
          ))}
        </div>

        {/* Scheduled Reports Tab */}
        {activeReportTab === 'scheduled' && (
          <div className="space-y-4">
            {scheduledReports.map((report) => (
              <Card key={report.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      {getReportTypeIcon(report.type)}
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-medium text-gray-900">{report.name}</h4>
                          <Badge className={`text-xs ${getStatusColor(report.status)}`}>
                            {report.status}
                          </Badge>
                        </div>
                        <div className="space-y-1 text-sm text-gray-600 mb-3">
                          <div className="flex items-center gap-4">
                            <span>Frequency: {report.frequency}</span>
                            <span>Next Run: {report.nextRun}</span>
                            <span>Last Generated: {report.lastGenerated}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Recipients: </span>
                            <span>{report.recipients.join(', ')}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline">
                        Edit
                      </Button>
                      <Button size="sm" variant="outline">
                        {report.status === 'active' ? 'Pause' : 'Resume'}
                      </Button>
                      <Button size="sm" variant="outline">
                        Preview
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Generated Reports Tab */}
        {activeReportTab === 'generated' && (
          <div className="space-y-4">
            {generatedReports.map((report) => (
              <Card key={report.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      {getReportTypeIcon(report.type)}
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-medium text-gray-900">{report.name}</h4>
                          <Badge className={`text-xs ${getStatusColor(report.status)}`}>
                            {report.status}
                          </Badge>
                        </div>
                        <div className="space-y-1 text-sm text-gray-600 mb-3">
                          <div className="flex items-center gap-4">
                            <span>Generated: {report.generatedDate}</span>
                            <span>Size: {report.size}</span>
                            <span>Open Rate: {report.openRate}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Recipients: </span>
                            <span>{report.recipients.join(', ')}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline">
                        <DownloadIcon className="w-4 h-4 mr-1" />
                        Download
                      </Button>
                      <Button size="sm" variant="outline">
                        <ShareIcon className="w-4 h-4 mr-1" />
                        Resend
                      </Button>
                      <Button size="sm" variant="outline">
                        View Analytics
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Templates Tab */}
        {activeReportTab === 'templates' && (
          <div className="space-y-4">
            {reportTemplates.map((template) => (
              <Card key={template.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      {getReportTypeIcon(template.type)}
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 mb-2">{template.name}</h4>
                        <p className="text-sm text-gray-600 mb-3">{template.description}</p>
                        <div className="space-y-2">
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span>Estimated Time: {template.estimatedTime}</span>
                          </div>
                          <div>
                            <span className="text-sm text-gray-500">Includes: </span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {template.includes.map((item, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {item}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline">
                        Preview
                      </Button>
                      <Button size="sm">
                        Use Template
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Settings Tab */}
        {activeReportTab === 'settings' && (
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Report Settings</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">Email Notifications</p>
                      <p className="text-sm text-gray-600">Receive notifications when reports are generated</p>
                    </div>
                    <input type="checkbox" className="w-4 h-4 text-primary-600" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">Auto-archive Reports</p>
                      <p className="text-sm text-gray-600">Automatically archive reports older than 12 months</p>
                    </div>
                    <input type="checkbox" className="w-4 h-4 text-primary-600" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">Default Format</p>
                      <p className="text-sm text-gray-600">Preferred file format for generated reports</p>
                    </div>
                    <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
                      <option>PDF</option>
                      <option>Excel</option>
                      <option>PowerPoint</option>
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    )
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverviewTab()
      case 'tasks':
        return renderTasksTab()
      case 'communication':
        return renderCommunicationTab()
      case 'client-data':
        return renderClientDataTab()
      case 'reports':
        return renderReportsTab()
      default:
        return renderOverviewTab()
    }
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3Icon },
    { id: 'tasks', label: 'Tasks', icon: FileTextIcon },
    { id: 'communication', label: 'Communication', icon: MessageSquareIcon },
    { id: 'client-data', label: 'Client Data', icon: UsersIcon },
    { id: 'reports', label: 'Reports', icon: TrendingUpIcon }
  ]

  return (
    <div className="min-h-screen bg-gray-25 flex">
      {/* Sidebar */}
       <CFOSidebar 
         onNavigate={onNavigate}
         accountType={accountType || 'cfo'}
         email={email || ''}
         activePage="cfo-client-workspace"
       />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => onNavigate('cfo-client-management', accountType, email)}
              >
                <ArrowLeftIcon className="w-4 h-4 mr-2" />
                Back to Clients
              </Button>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">{clientName} - CFO Workspace</h2>
                <p className="text-sm text-gray-600">Engagement started {clientData.engagementStart}</p>
              </div>
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

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto">
            {/* Tab Navigation */}
            <div className="border-b border-gray-200 mb-6">
              <nav className="flex space-x-8">
                {tabs.map((tab) => {
                  const Icon = tab.icon
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center gap-2 transition-colors ${
                        activeTab === tab.id
                          ? 'border-primary-500 text-primary-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {tab.label}
                    </button>
                  )
                })}
              </nav>
            </div>

            {/* Tab Content */}
            {renderTabContent()}
          </div>
        </main>
      </div>
    </div>
  )
}

export default CfoClientWorkspace
