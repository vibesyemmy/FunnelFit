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
