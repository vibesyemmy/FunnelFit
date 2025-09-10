import React, { useState } from 'react'
import { Button, Card, CardContent, CardHeader, CardTitle, Avatar, Badge, Input, Select, Label } from '../components/ui'
import {
  FileTextIcon,
  PlusIcon,
  FilterIcon,
  SearchIcon,
  CalendarIcon,
  ClockIcon,
  UserIcon,
  MoreHorizontalIcon,
  CheckCircleIcon,
  AlertCircleIcon,
  PlayCircleIcon,
  PauseCircleIcon,
  XCircleIcon,
  X,
  BarChart3Icon,
  KanbanSquareIcon,
  ListIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  TrendingUpIcon,
  HomeIcon,
  UsersIcon,
  DownloadIcon,
  TrashIcon,
  UploadIcon,
  DollarSignIcon,
  SettingsIcon,
  LogOutIcon,
  BellIcon,
  ChevronDownIcon,
  ChevronRightIcon
} from 'lucide-react'
import CFOSidebar from '../components/CFOSidebar'
import {
  projects,
  tasks,
  getTasksByStatus,
  getTasksByPriority,
  getProjectsByClient,
  getTaskStatusColor,
  getProjectStatusColor,
  formatCurrency,
  type Project,
  type Task
} from '../data/dashboard-data'
import { formatDate, formatDueDate, formatDateTime } from '../utils/dateUtils'

type Page = 'sign-in' | 'sign-up' | 'create-account' | 'email-verification' | 'verification-success' | 'onboarding' | 'onboarding-success' | 'sme-dashboard' | 'sme-main-dashboard' | 'upload-center' | 'bank-connection' | 'enhanced-upload' | 'cfo-dashboard' | 'cfo-client-management' | 'cfo-client-workspace' | 'projects-tasks' | 'invoice-tracking'

interface ProjectsTasksProps {
  onNavigate: (page: Page, accountType?: 'sme' | 'cfo', email?: string) => void
  accountType: 'sme' | 'cfo'
  email: string
}

const ProjectsTasks: React.FC<ProjectsTasksProps> = ({ 
  onNavigate, 
  accountType, 
  email 
}) => {
  const [activeView, setActiveView] = useState<'overview' | 'projects' | 'tasks' | 'kanban'>('overview')
  const [selectedProject, setSelectedProject] = useState<string | null>(null)
  const [taskFilter, setTaskFilter] = useState<'all' | 'todo' | 'in_progress' | 'review' | 'completed' | 'blocked'>('all')
  const [priorityFilter, setPriorityFilter] = useState<'all' | 'urgent' | 'high' | 'medium' | 'low'>('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState<'dueDate' | 'priority' | 'status' | 'title' | 'client'>('dueDate')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
  const [localTasks, setLocalTasks] = useState<Task[]>(tasks)
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [isTaskDetailOpen, setIsTaskDetailOpen] = useState(false)
  const [isTimeTrackingOpen, setIsTimeTrackingOpen] = useState(false)
  const [selectedProjectForDetail, setSelectedProjectForDetail] = useState<Project | null>(null)
  const [isProjectDetailOpen, setIsProjectDetailOpen] = useState(false)
  const [timeEntry, setTimeEntry] = useState({ hours: '', description: '', date: new Date().toISOString().split('T')[0] })
  const [expandedClients, setExpandedClients] = useState<Set<string>>(new Set())

  // Helper function to toggle client expansion
  const toggleClientExpansion = (clientId: string) => {
    setExpandedClients(prev => {
      const newSet = new Set(prev)
      if (newSet.has(clientId)) {
        newSet.delete(clientId)
      } else {
        newSet.add(clientId)
      }
      return newSet
    })
  }

  // Helper function to group projects by client
  const getProjectsByClient = () => {
    const clientGroups: { [key: string]: { client: any, projects: Project[] } } = {}
    
    projects.forEach(project => {
      if (!clientGroups[project.clientId]) {
        clientGroups[project.clientId] = {
          client: {
            id: project.clientId,
            name: project.clientName,
            avatar: project.clientAvatar,
            color: project.clientColor
          },
          projects: []
        }
      }
      clientGroups[project.clientId].projects.push(project)
    })
    
    return Object.values(clientGroups)
  }

  // Function to update task status
  const updateTaskStatus = (taskId: string, newStatus: Task['status']) => {
    setLocalTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    )
    
    // Update selectedTask if it's the one being updated
    if (selectedTask && selectedTask.id === taskId) {
      setSelectedTask(prev => prev ? { ...prev, status: newStatus } : null)
    }
  }

  // Filter and sort tasks based on current filters
  const filteredTasks = localTasks
    .filter(task => {
      const matchesStatus = taskFilter === 'all' || task.status === taskFilter
      const matchesPriority = priorityFilter === 'all' || task.priority === priorityFilter
      const matchesProject = !selectedProject || task.projectId === selectedProject
      const matchesSearch = !searchTerm || 
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.clientName.toLowerCase().includes(searchTerm.toLowerCase())
      
      return matchesStatus && matchesPriority && matchesProject && matchesSearch
    })
    .sort((a, b) => {
      let comparison = 0
      
      switch (sortBy) {
        case 'dueDate':
          comparison = new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
          break
        case 'priority':
          const priorityOrder = { urgent: 4, high: 3, medium: 2, low: 1 }
          comparison = priorityOrder[a.priority] - priorityOrder[b.priority]
          break
        case 'status':
          const statusOrder = { todo: 1, in_progress: 2, review: 3, completed: 4, blocked: 5 }
          comparison = statusOrder[a.status] - statusOrder[b.status]
          break
        case 'title':
          comparison = a.title.localeCompare(b.title)
          break
        case 'client':
          comparison = a.clientName.localeCompare(b.clientName)
          break
        default:
          comparison = 0
      }
      
      return sortOrder === 'asc' ? comparison : -comparison
    })

  // Calculate overview metrics
  const overviewMetrics = {
    totalProjects: projects.length,
    activeProjects: projects.filter(p => p.status === 'active').length,
    totalTasks: localTasks.length,
    completedTasks: localTasks.filter(t => t.status === 'completed').length,
    inProgressTasks: localTasks.filter(t => t.status === 'in_progress').length,
    overdueTasks: localTasks.filter(t => {
      const dueDate = new Date(t.dueDate)
      const today = new Date()
      return dueDate < today && t.status !== 'completed'
    }).length,
    totalBudget: projects.reduce((sum, p) => sum + p.budget, 0),
    totalSpent: projects.reduce((sum, p) => sum + p.spent, 0)
  }

  const getStatusIcon = (status: Task['status']) => {
    switch (status) {
      case 'todo': return <AlertCircleIcon className="h-4 w-4" />
      case 'in_progress': return <PlayCircleIcon className="h-4 w-4" />
      case 'review': return <PauseCircleIcon className="h-4 w-4" />
      case 'completed': return <CheckCircleIcon className="h-4 w-4" />
      case 'blocked': return <XCircleIcon className="h-4 w-4" />
      default: return <AlertCircleIcon className="h-4 w-4" />
    }
  }

  const getPriorityIcon = (priority: Task['priority']) => {
    switch (priority) {
      case 'urgent': return <ArrowUpIcon className="h-4 w-4 text-red-500" />
      case 'high': return <ArrowUpIcon className="h-4 w-4 text-orange-500" />
      case 'medium': return <ArrowUpIcon className="h-4 w-4 text-yellow-500" />
      case 'low': return <ArrowDownIcon className="h-4 w-4 text-green-500" />
      default: return <ArrowUpIcon className="h-4 w-4 text-gray-500" />
    }
  }

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Overview Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Projects</p>
                <p className="text-2xl font-bold text-gray-900">{overviewMetrics.totalProjects}</p>
                <p className="text-sm text-green-600">{overviewMetrics.activeProjects} active</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <FileTextIcon className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Tasks</p>
                <p className="text-2xl font-bold text-gray-900">{overviewMetrics.totalTasks}</p>
                <p className="text-sm text-blue-600">{overviewMetrics.inProgressTasks} in progress</p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <CheckCircleIcon className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completion Rate</p>
                <p className="text-2xl font-bold text-gray-900">
                  {Math.round((overviewMetrics.completedTasks / overviewMetrics.totalTasks) * 100)}%
                </p>
                <p className="text-sm text-green-600">{overviewMetrics.completedTasks} completed</p>
              </div>
              <div className="p-3 bg-purple-50 rounded-lg">
                <TrendingUpIcon className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Hours Tracked</p>
                <p className="text-2xl font-bold text-gray-900">
                  {overviewMetrics.totalTasks * 8}h
                </p>
                <p className="text-sm text-orange-600">
                  Across all projects
                </p>
              </div>
              <div className="p-3 bg-orange-50 rounded-lg">
                <ClockIcon className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Projects */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Active Projects</h3>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setActiveView('projects')}
            >
              View All
            </Button>
          </div>
          <div className="space-y-4">
            {projects.filter(p => p.status === 'active').map((project) => (
              <div key={project.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                <div className="flex items-center space-x-4">
                  <Avatar className={`${project.clientColor} text-white`}>
                    {project.clientAvatar}
                  </Avatar>
                  <div>
                    <h4 className="font-medium text-gray-900">{project.name}</h4>
                    <p className="text-sm text-gray-600">{project.clientName}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{project.progress}% Complete</p>
                  </div>
                  <Badge className={getProjectStatusColor(project.status)}>
                    {project.status.replace('_', ' ')}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Tasks */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Recent Tasks</h3>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setActiveView('kanban')}
            >
              View All
            </Button>
          </div>
          <div className="space-y-4">
            {localTasks.slice(0, 5).map((task) => (
              <div key={task.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                <div className="flex items-center space-x-4">
                  <div className={`p-2 rounded-lg ${getTaskStatusColor(task.status)}`}>
                    {getStatusIcon(task.status)}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{task.title}</h4>
                    <p className="text-sm text-gray-600">{task.projectName} • {task.clientName}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{formatDueDate(task.dueDate)}</p>
                    <p className="text-sm text-gray-600">{task.assignedTo}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getPriorityIcon(task.priority)}
                    <Badge className={getTaskStatusColor(task.status)}>
                      {task.status.replace('_', ' ')}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderProjects = () => {
    const clientGroups = getProjectsByClient()
    
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Projects by Client</h2>
          <div className="text-sm text-gray-600">
            {clientGroups.length} clients • {projects.length} projects
          </div>
        </div>

        <div className="space-y-4">
          {clientGroups.map(({ client, projects: clientProjects }) => {
            const isExpanded = expandedClients.has(client.id)
            const activeProjects = clientProjects.filter(p => p.status === 'active').length
            const totalProgress = clientProjects.reduce((sum, p) => sum + p.progress, 0) / clientProjects.length
            
            return (
              <Card key={client.id} className="overflow-hidden">
                <div 
                  className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => toggleClientExpansion(client.id)}
                >
                  <div className="flex items-center justify-between">
                     <div className="flex items-center space-x-4">
                       <Avatar className={`${client.color} text-white h-12 w-12`}>
                         <span className="text-lg font-semibold">{client.avatar}</span>
                       </Avatar>
                       <div>
                         <h3 className="text-lg font-semibold text-gray-900">{client.name}</h3>
                         <p className="text-sm text-gray-600">
                           {clientProjects.length} project{clientProjects.length !== 1 ? 's' : ''} • 
                           {activeProjects} active
                         </p>
                       </div>
                     </div>
                     <div className="flex items-center space-x-4">
                       <div className="text-right">
                         <p className="text-sm font-medium text-gray-900">
                           {Math.round(totalProgress)}% avg progress
                         </p>
                         <div className="w-24 bg-gray-200 rounded-full h-2 mt-1">
                           <div 
                             className="bg-blue-600 h-2 rounded-full transition-all" 
                             style={{ width: `${totalProgress}%` }}
                           ></div>
                         </div>
                       </div>
                       {isExpanded ? (
                         <ChevronDownIcon className="h-5 w-5 text-gray-400" />
                       ) : (
                         <ChevronRightIcon className="h-5 w-5 text-gray-400" />
                       )}
                     </div>
                   </div>
                </div>
                
                {isExpanded && (
                  <div className="border-t border-gray-200 bg-gray-50 p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {clientProjects.map((project) => (
                        <Card key={project.id} className="bg-white hover:shadow-md transition-shadow">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between mb-3">
                              <Badge className={getProjectStatusColor(project.status)}>
                                {project.status.replace('_', ' ')}
                              </Badge>
                              <span className="text-xs text-gray-500">
                                {formatDate(project.endDate)}
                              </span>
                            </div>
                            
                            <h4 className="font-semibold text-gray-900 mb-2 text-sm">{project.name}</h4>
                            <p className="text-xs text-gray-600 mb-3 line-clamp-2">{project.description}</p>
                            
                            <div className="space-y-2 mb-3">
                              <div className="flex justify-between text-xs">
                                <span className="text-gray-600">Progress</span>
                                <span className="font-medium">{project.progress}%</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-1.5">
                                <div 
                                  className="bg-orange-600 h-1.5 rounded-full transition-all" 
                                  style={{ width: `${project.progress}%` }}
                                ></div>
                              </div>
                            </div>
                            
                            <div className="flex justify-between text-xs text-gray-600 mb-3">
                              <span>{localTasks.filter(task => task.projectId === project.id).length} tasks</span>
                              <span>{formatCurrency(project.budget)}</span>
                            </div>
                            
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="w-full text-xs h-7"
                              onClick={(e) => {
                                e.stopPropagation()
                                openProjectDetail(project)
                              }}
                            >
                              View Details
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}
              </Card>
            )
          })}
        </div>
      </div>
    )
  }

  const renderTasks = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Tasks</h2>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <Input
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-64"
          icon={<SearchIcon className="h-4 w-4" />}
        />
        
        <Select
          value={taskFilter}
          onChange={(value) => setTaskFilter(value as any)}
          options={[
            { value: 'all', label: 'All Status' },
            { value: 'todo', label: 'To Do' },
            { value: 'in_progress', label: 'In Progress' },
            { value: 'review', label: 'Review' },
            { value: 'completed', label: 'Completed' },
            { value: 'blocked', label: 'Blocked' }
          ]}
          placeholder="All Status"
        />
        
        <Select
          value={priorityFilter}
          onChange={(value) => setPriorityFilter(value as any)}
          options={[
            { value: 'all', label: 'All Priority' },
            { value: 'urgent', label: 'Urgent' },
            { value: 'high', label: 'High' },
            { value: 'medium', label: 'Medium' },
            { value: 'low', label: 'Low' }
          ]}
          placeholder="All Priority"
        />
        
        <Select
          value={selectedProject || ''}
          onChange={(value) => setSelectedProject(value || null)}
          options={[
            { value: '', label: 'All Projects' },
            ...projects.map((project) => ({
              value: project.id,
              label: project.name
            }))
          ]}
          placeholder="All Projects"
        />
        
        <div className="flex items-center space-x-2 border-l border-gray-300 pl-4">
          <span className="text-sm text-gray-600">Sort by:</span>
          <Select
            value={sortBy}
            onChange={(value) => setSortBy(value as any)}
            options={[
              { value: 'dueDate', label: 'Due Date' },
              { value: 'priority', label: 'Priority' },
              { value: 'status', label: 'Status' },
              { value: 'title', label: 'Title' },
              { value: 'client', label: 'Client' }
            ]}
            placeholder="Due Date"
          />
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                className="p-1"
              >
                {sortOrder === 'asc' ? (
                  <ArrowUpIcon className="h-4 w-4" />
                ) : (
                  <ArrowDownIcon className="h-4 w-4" />
                )}
              </Button>
            </div>
            
            <div className="text-sm text-gray-600">
              {filteredTasks.length} task{filteredTasks.length !== 1 ? 's' : ''}
            </div>
          </div>

      {/* Tasks List */}
      <Card>
        <CardContent className="p-0">
          <div className="divide-y divide-gray-200">
            {filteredTasks.map((task) => (
              <div 
                key={task.id} 
                className="p-6 hover:bg-gray-50 cursor-pointer"
                onClick={() => openTaskDetail(task)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`p-2 rounded-lg ${getTaskStatusColor(task.status)}`}>
                      {getStatusIcon(task.status)}
                    </div>
                    <Avatar className={`${task.clientColor} text-white`}>
                      {task.clientAvatar}
                    </Avatar>
                    <div>
                      <h4 className="font-medium text-gray-900">{task.title}</h4>
                      <p className="text-sm text-gray-600">{task.description}</p>
                      <div className="flex items-center space-x-4 mt-1">
                        <span className="text-sm text-gray-500">{task.projectName}</span>
                        <span className="text-sm text-gray-500">•</span>
                        <span className="text-sm text-gray-500">{task.clientName}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">{formatDueDate(task.dueDate)}</p>
                      <p className="text-sm text-gray-600">Assigned to {task.assignedTo}</p>
                      <p className="text-sm text-gray-500">{task.actualHours}h / {task.estimatedHours}h</p>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {getPriorityIcon(task.priority)}
                      <Badge className={getTaskStatusColor(task.status)}>
                        {task.status.replace('_', ' ')}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          setSelectedTask(task)
                          openTimeTracking()
                        }}
                        className="text-orange-600 hover:text-orange-700"
                      >
                        <ClockIcon className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontalIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                
                {task.subtasks.length > 0 && (
                  <div className="mt-4 ml-16">
                    <p className="text-sm font-medium text-gray-700 mb-2">Subtasks:</p>
                    <div className="space-y-1">
                      {task.subtasks.map((subtask) => (
                        <div key={subtask.id} className="flex items-center space-x-2">
                          <CheckCircleIcon className={`h-4 w-4 ${subtask.completed ? 'text-green-500' : 'text-gray-300'}`} />
                          <span className={`text-sm ${subtask.completed ? 'text-gray-500 line-through' : 'text-gray-700'}`}>
                            {subtask.title}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const openTaskDetail = (task: Task) => {
    setSelectedTask(task)
    setIsTaskDetailOpen(true)
  }

  const closeTaskDetail = () => {
    setSelectedTask(null)
    setIsTaskDetailOpen(false)
  }

  const openTimeTracking = () => {
    setIsTimeTrackingOpen(true)
  }

  const closeTimeTracking = () => {
    setIsTimeTrackingOpen(false)
    setTimeEntry({ hours: '', description: '', date: new Date().toISOString().split('T')[0] })
  }

  const handleTimeSubmit = () => {
    if (selectedTask && timeEntry.hours) {
      // In a real app, this would update the task's actual hours
      console.log('Time logged:', {
        taskId: selectedTask.id,
        hours: parseFloat(timeEntry.hours),
        description: timeEntry.description,
        date: timeEntry.date
      })
      closeTimeTracking()
    }
  }

  const openProjectDetail = (project: Project) => {
    setSelectedProjectForDetail(project)
    setIsProjectDetailOpen(true)
  }

  const closeProjectDetail = () => {
    setSelectedProjectForDetail(null)
    setIsProjectDetailOpen(false)
  }

  const renderTimeTrackingModal = () => {
    if (!isTimeTrackingOpen || !selectedTask) return null

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-md w-full">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Log Time</h3>
              <Button variant="ghost" onClick={closeTimeTracking}>
                <XCircleIcon className="h-5 w-5" />
              </Button>
            </div>
            <p className="text-sm text-gray-600 mt-1">{selectedTask.title}</p>
          </div>

          <div className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
              <input
                type="date"
                value={timeEntry.date}
                onChange={(e) => setTimeEntry({ ...timeEntry, date: e.target.value })}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Hours</label>
              <input
                type="number"
                step="0.25"
                min="0"
                max="24"
                placeholder="e.g., 2.5"
                value={timeEntry.hours}
                onChange={(e) => setTimeEntry({ ...timeEntry, hours: e.target.value })}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description (Optional)</label>
              <textarea
                placeholder="What did you work on?"
                value={timeEntry.description}
                onChange={(e) => setTimeEntry({ ...timeEntry, description: e.target.value })}
                rows={3}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div className="bg-gray-50 rounded-lg p-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Current Progress:</span>
                <span className="font-medium">{selectedTask.actualHours}h / {selectedTask.estimatedHours}h</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div 
                  className="bg-orange-600 h-2 rounded-full" 
                  style={{ width: `${Math.min((selectedTask.actualHours / selectedTask.estimatedHours) * 100, 100)}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="p-6 border-t border-gray-200 bg-gray-50">
            <div className="flex justify-end space-x-3">
              <Button variant="outline" onClick={closeTimeTracking}>
                Cancel
              </Button>
              <Button 
                onClick={handleTimeSubmit}
                disabled={!timeEntry.hours}
                className="bg-orange-600 hover:bg-orange-700 text-white"
              >
                Log Time
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const renderProjectDetailModal = () => {
    if (!selectedProjectForDetail || !isProjectDetailOpen) return null

    const projectTasks = localTasks.filter(task => task.projectId === selectedProjectForDetail.id)
    const completedTasks = projectTasks.filter(task => task.status === 'completed')
    const inProgressTasks = projectTasks.filter(task => task.status === 'in_progress')
    const todoTasks = projectTasks.filter(task => task.status === 'todo')

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Avatar className={`${selectedProjectForDetail.clientColor} text-white`}>
                  {selectedProjectForDetail.clientAvatar}
                </Avatar>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">{selectedProjectForDetail.name}</h2>
                  <p className="text-sm text-gray-600">{selectedProjectForDetail.clientName}</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={closeProjectDetail}
                className="p-2"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Project Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Details</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <Badge className={getProjectStatusColor(selectedProjectForDetail.status)}>
                      {selectedProjectForDetail.status.replace('_', ' ')}
                    </Badge>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Start Date:</span>
                    <span className="font-medium">{formatDate(selectedProjectForDetail.startDate)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">End Date:</span>
                    <span className="font-medium">{formatDate(selectedProjectForDetail.endDate)}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Task Summary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Tasks:</span>
                    <span className="font-medium">{projectTasks.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Completed:</span>
                    <span className="font-medium text-green-600">{completedTasks.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">In Progress:</span>
                    <span className="font-medium text-blue-600">{inProgressTasks.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">To Do:</span>
                    <span className="font-medium text-gray-600">{todoTasks.length}</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Overall Progress</span>
                    <span className="font-medium">{selectedProjectForDetail.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-orange-600 h-3 rounded-full transition-all duration-300" 
                      style={{ width: `${selectedProjectForDetail.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Project Description */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
              <p className="text-gray-600">{selectedProjectForDetail.description}</p>
            </div>

            {/* Recent Tasks */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Tasks</h3>
              <div className="space-y-3">
                {projectTasks.slice(0, 5).map((task) => (
                  <div key={task.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${getTaskStatusColor(task.status)}`}>
                        {getStatusIcon(task.status)}
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{task.title}</h4>
                        <p className="text-sm text-gray-600">{formatDueDate(task.dueDate)}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getPriorityIcon(task.priority)}
                      <Badge className={getTaskStatusColor(task.status)}>
                        {task.status.replace('_', ' ')}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
              {projectTasks.length > 5 && (
                <div className="mt-3 text-center">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      closeProjectDetail()
                      setSelectedProject(selectedProjectForDetail.id)
                      setActiveView('kanban')
                    }}
                  >
                    View All Tasks in Kanban
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  const renderTaskDetail = () => {
    if (!selectedTask || !isTaskDetailOpen) return null

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className={`p-2 rounded-lg ${getTaskStatusColor(selectedTask.status)}`}>
                  {getStatusIcon(selectedTask.status)}
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">{selectedTask.title}</h2>
                  <p className="text-sm text-gray-600">{selectedTask.projectName} • {selectedTask.clientName}</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={closeTaskDetail}
                className="p-2"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Task Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Task Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Description</Label>
                    <p className="text-sm text-gray-600 mt-1">{selectedTask.description}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Status</Label>
                      <div className="mt-1">
                        <Select
                          value={selectedTask.status}
                          onChange={(value) => {
                            const newStatus = value as Task['status']
                            updateTaskStatus(selectedTask.id, newStatus)
                            console.log('Status updated:', { taskId: selectedTask.id, newStatus })
                          }}
                          options={[
                            { value: 'todo', label: 'To Do' },
                            { value: 'in_progress', label: 'In Progress' },
                            { value: 'review', label: 'Review' },
                            { value: 'completed', label: 'Completed' }
                          ]}
                        />
                      </div>
                    </div>
                    <div>
                      <Label>Priority</Label>
                      <div className="mt-1 flex items-center space-x-1">
                        {getPriorityIcon(selectedTask.priority)}
                        <span className="text-sm capitalize">{selectedTask.priority}</span>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Due Date</Label>
                      <p className="text-sm text-gray-600 mt-1">{formatDate(selectedTask.dueDate)}</p>
                    </div>
                    <div>
                      <Label>Assigned To</Label>
                      <p className="text-sm text-gray-600 mt-1">{selectedTask.assignedTo}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Time Tracking</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Estimated Hours</Label>
                      <p className="text-sm text-gray-600 mt-1">{selectedTask.estimatedHours}h</p>
                    </div>
                    <div>
                      <Label>Actual Hours</Label>
                      <p className="text-sm text-gray-600 mt-1">{selectedTask.actualHours}h</p>
                    </div>
                  </div>
                  <div>
                    <Label>Progress</Label>
                    <div className="mt-2">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Time Used</span>
                        <span>{Math.round((selectedTask.actualHours / selectedTask.estimatedHours) * 100)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-orange-600 h-2 rounded-full" 
                          style={{ width: `${Math.min((selectedTask.actualHours / selectedTask.estimatedHours) * 100, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Subtasks */}
            {selectedTask.subtasks.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Subtasks</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {selectedTask.subtasks.map((subtask) => (
                      <div key={subtask.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <CheckCircleIcon className={`h-5 w-5 ${subtask.completed ? 'text-green-500' : 'text-gray-300'}`} />
                        <span className={`flex-1 ${subtask.completed ? 'text-gray-500 line-through' : 'text-gray-700'}`}>
                          {subtask.title}
                        </span>
                        {subtask.assignedTo && (
                          <span className="text-sm text-gray-500">{subtask.assignedTo}</span>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* File Attachments */}
            <Card>
              <CardHeader>
                <CardTitle>File Attachments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Existing Files */}
                  {selectedTask.attachments && selectedTask.attachments.length > 0 && (
                    <div className="space-y-2">
                      {selectedTask.attachments.map((fileName, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border">
                          <div className="flex items-center space-x-3">
                            <FileTextIcon className="h-5 w-5 text-gray-400" />
                            <div>
                              <p className="text-sm font-medium text-gray-900">{fileName}</p>
                              <p className="text-xs text-gray-500">Uploaded recently</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="sm">
                              <DownloadIcon className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <TrashIcon className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {/* File Upload */}
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                    <input
                      type="file"
                      multiple
                      className="hidden"
                      id="file-upload"
                      onChange={(e) => {
                        // Handle file upload logic here
                        console.log('Files selected:', e.target.files)
                      }}
                    />
                    <Label htmlFor="file-upload" className="cursor-pointer">
                      <UploadIcon className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600 mb-1">Click to upload files or drag and drop</p>
                      <p className="text-xs text-gray-500">PDF, DOC, DOCX, XLS, XLSX, PNG, JPG up to 10MB</p>
                    </Label>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Comments */}
            <Card>
              <CardHeader>
                <CardTitle>Comments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {selectedTask.comments.map((comment) => (
                    <div key={comment.id} className="flex space-x-3">
                      <Avatar className="bg-gray-400 text-white w-8 h-8">
                        {comment.author.charAt(0)}
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="text-sm font-medium text-gray-900">{comment.author}</span>
                          <span className="text-xs text-gray-500">{comment.timestamp}</span>
                        </div>
                        <p className="text-sm text-gray-700">{comment.content}</p>
                      </div>
                    </div>
                  ))}
                  
                  <div className="flex space-x-3 pt-4 border-t border-gray-200">
                    <Avatar className="bg-orange-600 text-white w-8 h-8">
                      JD
                    </Avatar>
                    <div className="flex-1">
                      <textarea
                        placeholder="Add a comment..."
                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                        rows={3}
                      />
                      <div className="mt-2">
                        <Button size="sm" className="bg-orange-600 hover:bg-orange-700 text-white">
                          Add Comment
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>


        </div>
      </div>
    )
  }

  const renderKanban = () => {
    const columns = [
      { id: 'todo', title: 'To Do', status: 'todo' as const },
      { id: 'in_progress', title: 'In Progress', status: 'in_progress' as const },
      { id: 'review', title: 'Review', status: 'review' as const },
      { id: 'completed', title: 'Completed', status: 'completed' as const },
      { id: 'blocked', title: 'Blocked', status: 'blocked' as const }
    ]

    const getColumnTasks = (status: Task['status']) => {
      return filteredTasks.filter(task => task.status === status)
    }

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Kanban Board</h2>
        </div>

        {/* Kanban Filters */}
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <Input
            type="text"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64"
            icon={<SearchIcon className="h-4 w-4" />}
          />
          
          <Select
            value={priorityFilter}
            onChange={(value) => setPriorityFilter(value as any)}
            options={[
              { value: 'all', label: 'All Priority' },
              { value: 'urgent', label: 'Urgent' },
              { value: 'high', label: 'High' },
              { value: 'medium', label: 'Medium' },
              { value: 'low', label: 'Low' }
            ]}
            placeholder="All Priority"
          />
          
          <Select
            value={selectedProject || ''}
            onChange={(value) => setSelectedProject(value || null)}
            options={[
              { value: '', label: 'All Projects' },
              ...projects.map((project) => ({
                value: project.id,
                label: project.name
              }))
            ]}
            placeholder="All Projects"
          />
        </div>

        {/* Kanban Board */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 overflow-x-auto">
          {columns.map((column) => {
            const columnTasks = getColumnTasks(column.status)
            return (
              <div key={column.id} className="flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">{column.title}</h3>
                  <Badge variant="secondary" className="text-xs">
                    {columnTasks.length}
                  </Badge>
                </div>
                
                <div className="flex-1 space-y-3 min-h-[400px] bg-gray-50 rounded-lg p-3">
                  {columnTasks.map((task) => (
                    <Card 
                      key={task.id} 
                      className="hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => openTaskDetail(task)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-medium text-gray-900 text-sm leading-tight">
                            {task.title}
                          </h4>
                          {getPriorityIcon(task.priority)}
                        </div>
                        
                        <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                          {task.description}
                        </p>
                        
                        <div className="flex items-center justify-between mb-3">
                          <Avatar className={`${task.clientColor} text-white w-6 h-6 text-xs`}>
                            {task.clientAvatar}
                          </Avatar>
                          <span className="text-xs text-gray-500">
                            {task.clientName}
                          </span>
                        </div>
                        
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span className="flex items-center">
                            <CalendarIcon className="h-3 w-3 mr-1" />
                            {formatDate(task.dueDate)}
                          </span>
                          <span className="flex items-center">
                            <ClockIcon className="h-3 w-3 mr-1" />
                            {task.actualHours}h
                          </span>
                        </div>
                        
                        {task.subtasks.length > 0 && (
                          <div className="mt-3 pt-3 border-t border-gray-200">
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-gray-600">Subtasks</span>
                              <span className="text-gray-500">
                                {task.subtasks.filter(st => st.completed).length}/{task.subtasks.length}
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-1 mt-1">
                              <div 
                                className="bg-orange-600 h-1 rounded-full" 
                                style={{ 
                                  width: `${(task.subtasks.filter(st => st.completed).length / task.subtasks.length) * 100}%` 
                                }}
                              ></div>
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                  
                  {columnTasks.length === 0 && (
                    <div className="flex items-center justify-center h-32 text-gray-400">
                      <div className="text-center">
                        <div className={`p-2 rounded-lg ${getTaskStatusColor(column.status)} mb-2 inline-block`}>
                          {getStatusIcon(column.status)}
                        </div>
                        <p className="text-sm">No {column.title.toLowerCase()} tasks</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-25 flex">
      <CFOSidebar
        onNavigate={onNavigate}
        accountType={accountType || 'cfo'}
        email={email || ''}
        activePage="projects-tasks"
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Projects & Tasks</h2>
              <p className="text-sm text-gray-600">Manage your projects and track task progress</p>
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

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto">
            {/* Tab Navigation */}
            <div className="border-b border-gray-200 mb-6">
              <nav className="flex space-x-8">
                {[
                  { id: 'overview', label: 'Overview', icon: BarChart3Icon },
                  { id: 'projects', label: 'Projects', icon: FileTextIcon },
                  { id: 'kanban', label: 'Kanban', icon: KanbanSquareIcon }
                ].map((tab) => {
                  const Icon = tab.icon
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveView(tab.id as any)}
                      className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center gap-2 transition-colors ${
                        activeView === tab.id
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
            {activeView === 'overview' && renderOverview()}
            {activeView === 'projects' && renderProjects()}
            {activeView === 'kanban' && renderKanban()}
          </div>
        </main>
      </div>

      {/* Task Detail Modal */}
      {renderTaskDetail()}
      
      {/* Time Tracking Modal */}
      {renderTimeTrackingModal()}
      
      {/* Project Detail Modal */}
      {renderProjectDetailModal()}
    </div>
  )
}

export default ProjectsTasks