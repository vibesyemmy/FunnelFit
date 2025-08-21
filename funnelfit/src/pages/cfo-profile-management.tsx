import React, { useState } from 'react'
import { Button, Card, CardContent, Input, Select } from '../components/ui'
import { 
  UserIcon,
  BriefcaseIcon,
  GraduationCapIcon,
  StarIcon,
  ClockIcon,
  DollarSignIcon,
  EditIcon,
  SaveIcon,
  CameraIcon,
  LinkedinIcon,
  FileTextIcon,
  CheckCircleIcon,
  AlertCircleIcon,
  PlusIcon,
  XIcon
} from 'lucide-react'

interface CfoProfileManagementProps {
  onNavigate: (page: string, accountType?: 'sme' | 'cfo', email?: string) => void
  accountType: 'sme' | 'cfo'
  email: string
}

const CfoProfileManagement: React.FC<CfoProfileManagementProps> = ({ 
  onNavigate, 
  accountType, 
  email 
}) => {
  const [activeSection, setActiveSection] = useState('overview')
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    // Personal Information
    firstName: 'John',
    lastName: 'Doe',
    professionalTitle: 'Senior Fractional CFO',
    bio: 'Experienced CFO with 15+ years in financial leadership across technology and healthcare industries.',
    profilePicture: null as File | null,
    
    // Professional Background
    certifications: ['CPA', 'CFA', 'MBA'],
    education: 'MBA Finance - Wharton School, BS Accounting - NYU',
    linkedinUrl: 'https://linkedin.com/in/johndoe',
    
    // Experience & Expertise
    yearsOfExperience: '15+',
    previousRoles: [
      'CFO at TechStart Inc. (2018-2023)',
      'VP Finance at HealthCorp (2015-2018)',
      'Senior Manager at Deloitte (2010-2015)'
    ],
    areasOfExpertise: [
      'Financial Planning & Analysis',
      'Fundraising & Investment',
      'Cash Flow Management',
      'Financial Modeling',
      'Due Diligence',
      'IPO Preparation'
    ],
    industryExpertise: [
      'Technology/SaaS',
      'Healthcare',
      'E-commerce',
      'Manufacturing'
    ],
    softwareProficiencies: [
      'QuickBooks',
      'Xero',
      'NetSuite',
      'Excel/Google Sheets',
      'Tableau',
      'Adaptive Insights'
    ],
    
    // Availability & Pricing
    weeklyCapacity: '20-30 hours',
    preferredEngagementLength: '6-12 months',
    timeZone: 'EST',
    workingHours: '9 AM - 6 PM EST',
    hourlyRate: '₦75,000-100,000',
    retainerRange: '₦4,000,000-7,500,000',
    projectBasedRate: 'Varies by scope',
    
    // Client Preferences
    preferredClientSize: 'Mid-market (₦5B-50B revenue)',
    minimumEngagementValue: '₦2,500,000',
    specializations: [
      'Growth-stage companies',
      'Pre-IPO preparation',
      'M&A transactions'
    ],
    
    // Verification Status
    backgroundCheckStatus: 'completed',
    referenceCheckStatus: 'completed',
    profileReviewStatus: 'approved',
    isPublicProfile: true
  })

  const profileSections = [
    { id: 'overview', name: 'Profile Overview', icon: <UserIcon className="h-5 w-5" /> },
    { id: 'professional', name: 'Professional Background', icon: <BriefcaseIcon className="h-5 w-5" /> },
    { id: 'expertise', name: 'Areas of Expertise', icon: <StarIcon className="h-5 w-5" /> },
    { id: 'availability', name: 'Availability & Pricing', icon: <ClockIcon className="h-5 w-5" /> },
    { id: 'verification', name: 'Verification Status', icon: <CheckCircleIcon className="h-5 w-5" /> }
  ]

  const handleInputChange = (field: string, value: any) => {
    setProfileData(prev => ({ ...prev, [field]: value }))
  }

  const handleArrayAdd = (field: string, value: string) => {
    if (!value.trim()) return
    
    setProfileData(prev => ({
      ...prev,
      [field]: [...(prev[field] as string[]), value.trim()]
    }))
  }

  const handleArrayRemove = (field: string, index: number) => {
    setProfileData(prev => ({
      ...prev,
      [field]: (prev[field] as string[]).filter((_, i) => i !== index)
    }))
  }

  const getVerificationStatus = (status: string) => {
    switch (status) {
      case 'completed':
      case 'approved':
        return { color: 'text-green-600 bg-green-50', icon: <CheckCircleIcon className="h-4 w-4" />, text: 'Verified' }
      case 'pending':
        return { color: 'text-yellow-600 bg-yellow-50', icon: <ClockIcon className="h-4 w-4" />, text: 'Pending' }
      case 'required':
        return { color: 'text-red-600 bg-red-50', icon: <AlertCircleIcon className="h-4 w-4" />, text: 'Required' }
      default:
        return { color: 'text-gray-600 bg-gray-50', icon: <AlertCircleIcon className="h-4 w-4" />, text: 'Unknown' }
    }
  }

  const renderOverviewSection = () => (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-start space-x-6">
            <div className="relative">
              <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center">
                {profileData.profilePicture ? (
                  <img 
                    src={URL.createObjectURL(profileData.profilePicture)} 
                    alt="Profile" 
                    className="w-24 h-24 rounded-full object-cover" 
                  />
                ) : (
                  <span className="text-2xl font-bold text-primary-600">
                    {profileData.firstName[0]}{profileData.lastName[0]}
                  </span>
                )}
              </div>
              {isEditing && (
                <button className="absolute bottom-0 right-0 p-2 bg-white border border-gray-300 rounded-full shadow-sm hover:bg-gray-50">
                  <CameraIcon className="h-4 w-4 text-gray-600" />
                </button>
              )}
            </div>
            
            <div className="flex-1">
              {isEditing ? (
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <Input
                      value={profileData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      placeholder="First Name"
                    />
                    <Input
                      value={profileData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      placeholder="Last Name"
                    />
                  </div>
                  <Input
                    value={profileData.professionalTitle}
                    onChange={(e) => handleInputChange('professionalTitle', e.target.value)}
                    placeholder="Professional Title"
                  />
                  <textarea
                    value={profileData.bio}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    placeholder="Professional Bio"
                    rows={3}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
              ) : (
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    {profileData.firstName} {profileData.lastName}
                  </h1>
                  <p className="text-lg text-primary-600 mb-2">{profileData.professionalTitle}</p>
                  <p className="text-gray-600 mb-4">{profileData.bio}</p>
                  
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <StarIcon className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm text-gray-600">4.9 rating</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <BriefcaseIcon className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600">{profileData.yearsOfExperience} years experience</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <ClockIcon className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600">{profileData.weeklyCapacity} weekly</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex items-center space-x-2">
              {isEditing ? (
                <>
                  <Button size="sm" onClick={() => setIsEditing(false)}>
                    <SaveIcon className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setIsEditing(false)}>
                    Cancel
                  </Button>
                </>
              ) : (
                <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                  <EditIcon className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary-600">12</div>
            <div className="text-sm text-gray-600">Active Clients</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">98%</div>
            <div className="text-sm text-gray-600">Success Rate</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">4.9</div>
            <div className="text-sm text-gray-600">Avg Rating</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">45</div>
            <div className="text-sm text-gray-600">Projects Done</div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const renderProfessionalSection = () => (
    <div className="space-y-6">
      {/* Certifications */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Certifications</h3>
          <div className="flex flex-wrap gap-2">
            {profileData.certifications.map((cert, index) => (
              <span 
                key={index}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800"
              >
                {cert}
                {isEditing && (
                  <button 
                    onClick={() => handleArrayRemove('certifications', index)}
                    className="ml-2 text-primary-600 hover:text-primary-800"
                  >
                    <XIcon className="h-3 w-3" />
                  </button>
                )}
              </span>
            ))}
          </div>
          {isEditing && (
            <div className="mt-3 flex items-center space-x-2">
              <Input 
                placeholder="Add certification"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleArrayAdd('certifications', (e.target as HTMLInputElement).value);
                    (e.target as HTMLInputElement).value = ''
                  }
                }}
              />
              <Button size="sm" variant="outline">
                <PlusIcon className="h-4 w-4" />
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Education */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Education</h3>
          {isEditing ? (
            <textarea
              value={profileData.education}
              onChange={(e) => handleInputChange('education', e.target.value)}
              rows={3}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          ) : (
            <p className="text-gray-700">{profileData.education}</p>
          )}
        </CardContent>
      </Card>

      {/* Previous Roles */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Previous Roles</h3>
          <div className="space-y-2">
            {profileData.previousRoles.map((role, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-700">{role}</span>
                {isEditing && (
                  <button 
                    onClick={() => handleArrayRemove('previousRoles', index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <XIcon className="h-4 w-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* LinkedIn */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Professional Links</h3>
          {isEditing ? (
            <Input
              value={profileData.linkedinUrl}
              onChange={(e) => handleInputChange('linkedinUrl', e.target.value)}
              placeholder="LinkedIn Profile URL"
            />
          ) : (
            <a 
              href={profileData.linkedinUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-800"
            >
              <LinkedinIcon className="h-4 w-4" />
              <span>View LinkedIn Profile</span>
            </a>
          )}
        </CardContent>
      </Card>
    </div>
  )

  const renderExpertiseSection = () => (
    <div className="space-y-6">
      {/* Areas of Expertise */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Areas of Expertise</h3>
          <div className="flex flex-wrap gap-2">
            {profileData.areasOfExpertise.map((area, index) => (
              <span 
                key={index}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
              >
                {area}
                {isEditing && (
                  <button 
                    onClick={() => handleArrayRemove('areasOfExpertise', index)}
                    className="ml-2 text-blue-600 hover:text-blue-800"
                  >
                    <XIcon className="h-3 w-3" />
                  </button>
                )}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Industry Expertise */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Industry Expertise</h3>
          <div className="flex flex-wrap gap-2">
            {profileData.industryExpertise.map((industry, index) => (
              <span 
                key={index}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800"
              >
                {industry}
                {isEditing && (
                  <button 
                    onClick={() => handleArrayRemove('industryExpertise', index)}
                    className="ml-2 text-green-600 hover:text-green-800"
                  >
                    <XIcon className="h-3 w-3" />
                  </button>
                )}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Software Proficiencies */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Software Proficiencies</h3>
          <div className="flex flex-wrap gap-2">
            {profileData.softwareProficiencies.map((software, index) => (
              <span 
                key={index}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800"
              >
                {software}
                {isEditing && (
                  <button 
                    onClick={() => handleArrayRemove('softwareProficiencies', index)}
                    className="ml-2 text-purple-600 hover:text-purple-800"
                  >
                    <XIcon className="h-3 w-3" />
                  </button>
                )}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderAvailabilitySection = () => (
    <div className="space-y-6">
      {/* Availability */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Availability</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Weekly Capacity</label>
              {isEditing ? (
                <Input
                  value={profileData.weeklyCapacity}
                  onChange={(e) => handleInputChange('weeklyCapacity', e.target.value)}
                />
              ) : (
                <p className="text-gray-900">{profileData.weeklyCapacity}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Engagement Length</label>
              {isEditing ? (
                <Input
                  value={profileData.preferredEngagementLength}
                  onChange={(e) => handleInputChange('preferredEngagementLength', e.target.value)}
                />
              ) : (
                <p className="text-gray-900">{profileData.preferredEngagementLength}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Time Zone</label>
              {isEditing ? (
                <Input
                  value={profileData.timeZone}
                  onChange={(e) => handleInputChange('timeZone', e.target.value)}
                />
              ) : (
                <p className="text-gray-900">{profileData.timeZone}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Working Hours</label>
              {isEditing ? (
                <Input
                  value={profileData.workingHours}
                  onChange={(e) => handleInputChange('workingHours', e.target.value)}
                />
              ) : (
                <p className="text-gray-900">{profileData.workingHours}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pricing */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Pricing Structure</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Hourly Rate</label>
              {isEditing ? (
                <Input
                  value={profileData.hourlyRate}
                  onChange={(e) => handleInputChange('hourlyRate', e.target.value)}
                />
              ) : (
                <p className="text-gray-900">{profileData.hourlyRate}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Retainer</label>
              {isEditing ? (
                <Input
                  value={profileData.retainerRange}
                  onChange={(e) => handleInputChange('retainerRange', e.target.value)}
                />
              ) : (
                <p className="text-gray-900">{profileData.retainerRange}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Project-Based</label>
              {isEditing ? (
                <Input
                  value={profileData.projectBasedRate}
                  onChange={(e) => handleInputChange('projectBasedRate', e.target.value)}
                />
              ) : (
                <p className="text-gray-900">{profileData.projectBasedRate}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderVerificationSection = () => (
    <div className="space-y-6">
      {/* Verification Status */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile Verification</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`p-1 rounded-full ${getVerificationStatus(profileData.backgroundCheckStatus).color}`}>
                  {getVerificationStatus(profileData.backgroundCheckStatus).icon}
                </div>
                <div>
                  <p className="font-medium text-gray-900">Background Check</p>
                  <p className="text-sm text-gray-600">Professional background verification</p>
                </div>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getVerificationStatus(profileData.backgroundCheckStatus).color}`}>
                {getVerificationStatus(profileData.backgroundCheckStatus).text}
              </span>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`p-1 rounded-full ${getVerificationStatus(profileData.referenceCheckStatus).color}`}>
                  {getVerificationStatus(profileData.referenceCheckStatus).icon}
                </div>
                <div>
                  <p className="font-medium text-gray-900">Reference Check</p>
                  <p className="text-sm text-gray-600">Client and colleague references</p>
                </div>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getVerificationStatus(profileData.referenceCheckStatus).color}`}>
                {getVerificationStatus(profileData.referenceCheckStatus).text}
              </span>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`p-1 rounded-full ${getVerificationStatus(profileData.profileReviewStatus).color}`}>
                  {getVerificationStatus(profileData.profileReviewStatus).icon}
                </div>
                <div>
                  <p className="font-medium text-gray-900">Profile Review</p>
                  <p className="text-sm text-gray-600">FunnelFit team review and approval</p>
                </div>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getVerificationStatus(profileData.profileReviewStatus).color}`}>
                {getVerificationStatus(profileData.profileReviewStatus).text}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Profile Visibility */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile Visibility</h3>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Public Profile</p>
              <p className="text-sm text-gray-600">Allow SMEs to view your profile for matching</p>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={profileData.isPublicProfile}
                onChange={(e) => handleInputChange('isPublicProfile', e.target.checked)}
                className="mr-2"
              />
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                profileData.isPublicProfile ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
              }`}>
                {profileData.isPublicProfile ? 'Visible' : 'Hidden'}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderSectionContent = () => {
    switch (activeSection) {
      case 'overview': return renderOverviewSection()
      case 'professional': return renderProfessionalSection()
      case 'expertise': return renderExpertiseSection()
      case 'availability': return renderAvailabilitySection()
      case 'verification': return renderVerificationSection()
      default: return renderOverviewSection()
    }
  }

  return (
    <div className="min-h-screen bg-gray-25 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Profile Management</h1>
          <p className="text-gray-600">Manage your professional profile and expertise</p>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-6">
          <nav className="flex space-x-8">
            {profileSections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex items-center space-x-2 pb-4 px-1 border-b-2 font-medium text-sm ${
                  activeSection === section.id
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {section.icon}
                <span>{section.name}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        {renderSectionContent()}
      </div>
    </div>
  )
}

export default CfoProfileManagement
