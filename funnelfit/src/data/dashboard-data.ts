// Centralized dashboard data for CFO interface
export interface Client {
  id: string
  name: string
  avatar: string
  color: string
  industry: string
  status: 'active' | 'churned' | 'pending'
  monthlyValue: number
  startDate: string
  type: 'retainer' | 'project' | 'hourly'
  priority: 'high' | 'medium' | 'low'
  progress: number
  nextDeadline: string
  contact: {
    name: string
    email: string
    phone: string
  }
}

export interface Activity {
  id: string
  clientId: string
  clientName: string
  clientAvatar: string
  clientColor: string
  action: string
  type: 'completion' | 'payment' | 'meeting' | 'document' | 'review'
  timestamp: string
  amount?: number
}

export interface ActionItem {
  id: string
  title: string
  description: string
  clientName: string
  priority: 'urgent' | 'high' | 'medium' | 'low'
  dueDate: string
  type: 'timesheet' | 'review' | 'call' | 'document' | 'opportunity'
  status: 'pending' | 'overdue' | 'in_progress'
}

export interface DashboardMetrics {
  monthlyRevenue: {
    current: number
    previous: number
    growth: number
  }
  activeClients: {
    count: number
    change: number
  }
  weeklyHours: {
    logged: number
    capacity: number
    utilization: number
  }
  pendingApproval: {
    amount: number
    invoiceCount: number
  }
  newOpportunities: {
    count: number
    todayCount: number
  }
  clientRating: {
    average: number
    reviewCount: number
  }
  completedProjects: {
    thisMonth: number
    lastMonth: number
  }
}

export interface RevenueData {
  month: string
  revenue: number
  year: number
}

export interface Project {
  id: string
  name: string
  description: string
  clientId: string
  clientName: string
  clientAvatar: string
  clientColor: string
  status: 'planning' | 'active' | 'on_hold' | 'completed' | 'cancelled'
  priority: 'urgent' | 'high' | 'medium' | 'low'
  startDate: string
  endDate: string
  budget: number
  spent: number
  progress: number
  teamMembers: string[]
  tags: string[]
  type: 'consulting' | 'audit' | 'advisory' | 'implementation'
}

export interface Task {
  id: string
  title: string
  description: string
  projectId: string
  projectName: string
  clientId: string
  clientName: string
  clientAvatar: string
  clientColor: string
  assignedTo: string
  assignedBy: string
  status: 'todo' | 'in_progress' | 'review' | 'completed' | 'blocked'
  priority: 'urgent' | 'high' | 'medium' | 'low'
  type: 'analysis' | 'meeting' | 'document' | 'review' | 'presentation' | 'research'
  createdDate: string
  dueDate: string
  completedDate?: string
  estimatedHours: number
  actualHours: number
  tags: string[]
  attachments: string[]
  comments: TaskComment[]
  dependencies: string[]
  subtasks: SubTask[]
}

export interface TaskComment {
  id: string
  taskId: string
  author: string
  authorAvatar: string
  content: string
  timestamp: string
  type: 'comment' | 'status_change' | 'assignment'
}

export interface SubTask {
  id: string
  title: string
  completed: boolean
  assignedTo?: string
  dueDate?: string
}

// Mock data
export const dashboardMetrics: DashboardMetrics = {
  monthlyRevenue: {
    current: 14250000,
    previous: 12700000,
    growth: 12.2
  },
  activeClients: {
    count: 5,
    change: 2
  },
  weeklyHours: {
    logged: 23,
    capacity: 40,
    utilization: 57.5
  },
  pendingApproval: {
    amount: 4250000,
    invoiceCount: 3
  },
  newOpportunities: {
    count: 3,
    todayCount: 1
  },
  clientRating: {
    average: 4.9,
    reviewCount: 23
  },
  completedProjects: {
    thisMonth: 12,
    lastMonth: 8
  }
}

export const clients: Client[] = [
  {
    id: 'tech-start',
    name: 'TechStart Solutions',
    avatar: 'TS',
    color: 'bg-blue-500',
    industry: 'Technology',
    status: 'active',
    monthlyValue: 6000000,
    startDate: '2024-01-15',
    type: 'retainer',
    priority: 'high',
    progress: 75,
    nextDeadline: 'Dec 15, 2024',
    contact: {
      name: 'Sarah Johnson',
      email: 'sarah@techstart.com',
      phone: '+234 801 234 5678'
    }
  },
  {
    id: 'green-earth',
    name: 'Green Earth Co.',
    avatar: 'GE',
    color: 'bg-green-500',
    industry: 'Sustainability',
    status: 'active',
    monthlyValue: 4500000,
    startDate: '2024-02-20',
    type: 'project',
    priority: 'medium',
    progress: 45,
    nextDeadline: 'Dec 20, 2024',
    contact: {
      name: 'Michael Green',
      email: 'michael@greenearth.ng',
      phone: '+234 802 345 6789'
    }
  },
  {
    id: 'medflow',
    name: 'MedFlow Inc.',
    avatar: 'MF',
    color: 'bg-purple-500',
    industry: 'Healthcare',
    status: 'active',
    monthlyValue: 3200000,
    startDate: '2024-03-10',
    type: 'hourly',
    priority: 'medium',
    progress: 60,
    nextDeadline: 'Dec 18, 2024',
    contact: {
      name: 'Dr. Amara Okafor',
      email: 'amara@medflow.ng',
      phone: '+234 803 456 7890'
    }
  },
  {
    id: 'datacorp',
    name: 'DataCorp Ltd.',
    avatar: 'DC',
    color: 'bg-orange-500',
    industry: 'Technology',
    status: 'active',
    monthlyValue: 2800000,
    startDate: '2024-04-05',
    type: 'retainer',
    priority: 'low',
    progress: 30,
    nextDeadline: 'Dec 22, 2024',
    contact: {
      name: 'Emeka Nwankwo',
      email: 'emeka@datacorp.ng',
      phone: '+234 804 567 8901'
    }
  },
  {
    id: 'retail-plus',
    name: 'Retail Plus',
    avatar: 'RP',
    color: 'bg-red-500',
    industry: 'Retail',
    status: 'pending',
    monthlyValue: 1800000,
    startDate: '2024-05-15',
    type: 'project',
    priority: 'low',
    progress: 90,
    nextDeadline: 'Dec 12, 2024',
    contact: {
      name: 'Fatima Bello',
      email: 'fatima@retailplus.ng',
      phone: '+234 805 678 9012'
    }
  }
]

export const recentActivities: Activity[] = [
  {
    id: 'act-1',
    clientId: 'tech-start',
    clientName: 'TechStart Solutions',
    clientAvatar: 'TS',
    clientColor: 'bg-blue-500',
    action: 'Q4 Review completed',
    type: 'completion',
    timestamp: '2 hours ago'
  },
  {
    id: 'act-2',
    clientId: 'green-earth',
    clientName: 'Green Earth Co.',
    clientAvatar: 'GE',
    clientColor: 'bg-green-500',
    action: 'Invoice approved ₦2.1M',
    type: 'payment',
    timestamp: '4 hours ago',
    amount: 2100000
  },
  {
    id: 'act-3',
    clientId: 'medflow',
    clientName: 'MedFlow Inc.',
    clientAvatar: 'MF',
    clientColor: 'bg-purple-500',
    action: 'New document uploaded',
    type: 'document',
    timestamp: '6 hours ago'
  },
  {
    id: 'act-4',
    clientId: 'datacorp',
    clientName: 'DataCorp Ltd.',
    clientAvatar: 'DC',
    clientColor: 'bg-orange-500',
    action: 'Meeting scheduled for Dec 20',
    type: 'meeting',
    timestamp: '1 day ago'
  }
]

export const actionItems: ActionItem[] = [
  {
    id: 'action-1',
    title: 'Timesheet Due',
    description: 'Client XYZ - Submit 8 hours',
    clientName: 'TechStart Solutions',
    priority: 'urgent',
    dueDate: 'today',
    type: 'timesheet',
    status: 'overdue'
  },
  {
    id: 'action-2',
    title: 'Chemistry Call',
    description: 'Tech Startup - Schedule call',
    clientName: 'New Prospect',
    priority: 'high',
    dueDate: '2 days ago',
    type: 'call',
    status: 'pending'
  },
  {
    id: 'action-3',
    title: 'Document Review',
    description: 'Client ABC - Financial model',
    clientName: 'Green Earth Co.',
    priority: 'medium',
    dueDate: 'pending',
    type: 'document',
    status: 'in_progress'
  },
  {
    id: 'action-4',
    title: 'Expiring Opportunity',
    description: 'Respond to match request',
    clientName: 'Potential Client',
    priority: 'urgent',
    dueDate: '24 hours',
    type: 'opportunity',
    status: 'pending'
  }
]

export const revenueData: RevenueData[] = [
  { month: 'Jan', revenue: 9600000, year: 2024 },
  { month: 'Feb', revenue: 12000000, year: 2024 },
  { month: 'Mar', revenue: 7200000, year: 2024 },
  { month: 'Apr', revenue: 12800000, year: 2024 },
  { month: 'May', revenue: 10400000, year: 2024 },
  { month: 'Jun', revenue: 14400000, year: 2024 },
  { month: 'Jul', revenue: 11200000, year: 2024 },
  { month: 'Aug', revenue: 13600000, year: 2024 },
  { month: 'Sep', revenue: 9600000, year: 2024 },
  { month: 'Oct', revenue: 15200000, year: 2024 },
  { month: 'Nov', revenue: 12000000, year: 2024 },
  { month: 'Dec', revenue: 14080000, year: 2024 }
]

// Utility functions
export const getClientById = (id: string): Client | undefined => {
  return clients.find(client => client.id === id)
}

export const getClientsByStatus = (status: Client['status']): Client[] => {
  return clients.filter(client => client.status === status)
}

export const getTotalMonthlyRevenue = (): number => {
  return clients
    .filter(client => client.status === 'active')
    .reduce((total, client) => total + client.monthlyValue, 0)
}

export const getActionItemsByPriority = (priority: ActionItem['priority']): ActionItem[] => {
  return actionItems.filter(item => item.priority === priority)
}

export const getRecentActivitiesByType = (type: Activity['type']): Activity[] => {
  return recentActivities.filter(activity => activity.type === type)
}

export const formatCurrency = (amount: number): string => {
  if (amount >= 1000000) {
    return `₦${(amount / 1000000).toFixed(2)}M`
  } else if (amount >= 1000) {
    return `₦${(amount / 1000).toFixed(0)}K`
  }
  return `₦${amount.toLocaleString()}`
}

export const getPriorityColor = (priority: ActionItem['priority']): string => {
  const colors = {
    urgent: 'border-red-500 bg-red-50 text-red-900',
    high: 'border-orange-500 bg-orange-50 text-orange-900',
    medium: 'border-yellow-500 bg-yellow-50 text-yellow-900',
    low: 'border-blue-500 bg-blue-50 text-blue-900'
  }
  return colors[priority] || colors.medium
}

export const getStatusColor = (status: Client['status']): string => {
  const colors = {
    active: 'bg-green-100 text-green-800',
    pending: 'bg-yellow-100 text-yellow-800',
    churned: 'bg-red-100 text-red-800'
  }
  return colors[status] || colors.pending
}

// Projects and Tasks Mock Data
export const projects: Project[] = [
  {
    id: 'proj-1',
    name: 'Financial Restructuring',
    description: 'Complete financial analysis and restructuring plan for TechStart Solutions',
    clientId: 'tech-start',
    clientName: 'TechStart Solutions',
    clientAvatar: 'TS',
    clientColor: 'bg-blue-500',
    status: 'active',
    priority: 'high',
    startDate: '2024-11-01',
    endDate: '2024-12-31',
    budget: 5000000,
    spent: 3200000,
    progress: 65,
    teamMembers: ['CFO', 'Senior Analyst', 'Junior Analyst'],
    tags: ['Financial Analysis', 'Restructuring', 'Strategic Planning'],
    type: 'consulting'
  },
  {
    id: 'proj-2',
    name: 'Sustainability Audit',
    description: 'Environmental and financial sustainability assessment',
    clientId: 'green-earth',
    clientName: 'Green Earth Co.',
    clientAvatar: 'GE',
    clientColor: 'bg-green-500',
    status: 'active',
    priority: 'medium',
    startDate: '2024-10-15',
    endDate: '2024-12-20',
    budget: 3500000,
    spent: 1800000,
    progress: 45,
    teamMembers: ['CFO', 'Environmental Specialist'],
    tags: ['Audit', 'Sustainability', 'Compliance'],
    type: 'audit'
  },
  {
    id: 'proj-3',
    name: 'Healthcare Financial Advisory',
    description: 'Strategic financial advisory for healthcare expansion',
    clientId: 'medflow',
    clientName: 'MedFlow Inc.',
    clientAvatar: 'MF',
    clientColor: 'bg-purple-500',
    status: 'planning',
    priority: 'medium',
    startDate: '2024-12-01',
    endDate: '2025-02-28',
    budget: 4200000,
    spent: 0,
    progress: 10,
    teamMembers: ['CFO', 'Healthcare Specialist'],
    tags: ['Advisory', 'Healthcare', 'Expansion'],
    type: 'advisory'
  }
]

export const tasks: Task[] = [
  {
    id: 'task-1',
    title: 'Financial Statement Analysis',
    description: 'Analyze Q3 financial statements and identify key areas for improvement',
    projectId: 'proj-1',
    projectName: 'Financial Restructuring',
    clientId: 'tech-start',
    clientName: 'TechStart Solutions',
    clientAvatar: 'TS',
    clientColor: 'bg-blue-500',
    assignedTo: 'Senior Analyst',
    assignedBy: 'CFO',
    status: 'in_progress',
    priority: 'high',
    type: 'analysis',
    createdDate: '2024-11-01',
    dueDate: '2024-12-15',
    estimatedHours: 16,
    actualHours: 12,
    tags: ['Financial Analysis', 'Q3 Review'],
    attachments: ['financial_statements_q3.pdf'],
    comments: [
      {
        id: 'comment-1',
        taskId: 'task-1',
        author: 'CFO',
        authorAvatar: 'CF',
        content: 'Please focus on cash flow analysis first',
        timestamp: '2024-11-05 10:30',
        type: 'comment'
      }
    ],
    dependencies: [],
    subtasks: [
      {
        id: 'subtask-1',
        title: 'Review cash flow statements',
        completed: true,
        assignedTo: 'Senior Analyst',
        dueDate: '2024-11-10'
      },
      {
        id: 'subtask-2',
        title: 'Analyze profit margins',
        completed: false,
        assignedTo: 'Senior Analyst',
        dueDate: '2024-11-15'
      }
    ]
  },
  {
    id: 'task-2',
    title: 'Client Meeting Preparation',
    description: 'Prepare presentation materials for client review meeting',
    projectId: 'proj-1',
    projectName: 'Financial Restructuring',
    clientId: 'tech-start',
    clientName: 'TechStart Solutions',
    clientAvatar: 'TS',
    clientColor: 'bg-blue-500',
    assignedTo: 'CFO',
    assignedBy: 'CFO',
    status: 'todo',
    priority: 'urgent',
    type: 'presentation',
    createdDate: '2024-11-10',
    dueDate: '2024-12-12',
    estimatedHours: 8,
    actualHours: 0,
    tags: ['Presentation', 'Client Meeting'],
    attachments: [],
    comments: [],
    dependencies: ['task-1'],
    subtasks: [
      {
        id: 'subtask-3',
        title: 'Create executive summary',
        completed: false,
        assignedTo: 'CFO'
      },
      {
        id: 'subtask-4',
        title: 'Prepare financial charts',
        completed: false,
        assignedTo: 'CFO'
      }
    ]
  },
  {
    id: 'task-3',
    title: 'Environmental Impact Assessment',
    description: 'Conduct comprehensive environmental impact assessment',
    projectId: 'proj-2',
    projectName: 'Sustainability Audit',
    clientId: 'green-earth',
    clientName: 'Green Earth Co.',
    clientAvatar: 'GE',
    clientColor: 'bg-green-500',
    assignedTo: 'Environmental Specialist',
    assignedBy: 'CFO',
    status: 'review',
    priority: 'medium',
    type: 'research',
    createdDate: '2024-10-15',
    dueDate: '2024-12-01',
    estimatedHours: 24,
    actualHours: 20,
    tags: ['Environmental', 'Assessment', 'Sustainability'],
    attachments: ['environmental_data.xlsx', 'impact_report_draft.pdf'],
    comments: [
      {
        id: 'comment-2',
        taskId: 'task-3',
        author: 'CFO',
        authorAvatar: 'CF',
        content: 'Great progress! Please include carbon footprint analysis',
        timestamp: '2024-11-08 14:20',
        type: 'comment'
      }
    ],
    dependencies: [],
    subtasks: [
      {
        id: 'subtask-5',
        title: 'Data collection',
        completed: true,
        assignedTo: 'Environmental Specialist'
      },
      {
        id: 'subtask-6',
        title: 'Impact analysis',
        completed: true,
        assignedTo: 'Environmental Specialist'
      },
      {
        id: 'subtask-7',
        title: 'Report writing',
        completed: false,
        assignedTo: 'Environmental Specialist'
      }
    ]
  }
]

// Helper functions for projects and tasks
export const getProjectById = (id: string): Project | undefined => {
  return projects.find(project => project.id === id)
}

export const getTaskById = (id: string): Task | undefined => {
  return tasks.find(task => task.id === id)
}

export const getTasksByProject = (projectId: string): Task[] => {
  return tasks.filter(task => task.projectId === projectId)
}

export const getTasksByStatus = (status: Task['status']): Task[] => {
  return tasks.filter(task => task.status === status)
}

export const getTasksByPriority = (priority: Task['priority']): Task[] => {
  return tasks.filter(task => task.priority === priority)
}

export const getProjectsByClient = (clientId?: string): Project[] | { client: Client, projects: Project[] }[] => {
  if (clientId) {
    return projects.filter(project => project.clientId === clientId)
  }
  
  // Group all projects by client
  const clientGroups: { client: Client, projects: Project[] }[] = []
  const processedClients = new Set<string>()
  
  projects.forEach(project => {
    if (!processedClients.has(project.clientId)) {
      const client = getClientById(project.clientId)
      if (client) {
        const clientProjects = projects.filter(p => p.clientId === project.clientId)
        clientGroups.push({ client, projects: clientProjects })
        processedClients.add(project.clientId)
      }
    }
  })
  
  return clientGroups
}

export const getTaskStatusColor = (status: Task['status']): string => {
  switch (status) {
    case 'todo': return 'text-gray-600 bg-gray-50'
    case 'in_progress': return 'text-blue-600 bg-blue-50'
    case 'review': return 'text-yellow-600 bg-yellow-50'
    case 'completed': return 'text-green-600 bg-green-50'
    case 'blocked': return 'text-red-600 bg-red-50'
    default: return 'text-gray-600 bg-gray-50'
  }
}

export const getProjectStatusColor = (status: Project['status']): string => {
  switch (status) {
    case 'planning': return 'text-purple-600 bg-purple-50'
    case 'active': return 'text-green-600 bg-green-50'
    case 'on_hold': return 'text-yellow-600 bg-yellow-50'
    case 'completed': return 'text-blue-600 bg-blue-50'
    case 'cancelled': return 'text-red-600 bg-red-50'
    default: return 'text-gray-600 bg-gray-50'
  }
}
