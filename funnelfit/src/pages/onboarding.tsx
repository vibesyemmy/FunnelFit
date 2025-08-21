import React, { useState } from 'react'
import { Button, Input, Select } from '../components/ui'
import { CheckIcon } from 'lucide-react'

interface OnboardingPageProps {
  onNavigate: (page: 'sign-in' | 'sign-up' | 'create-account' | 'email-verification' | 'verification-success' | 'onboarding', accountType?: 'sme' | 'cfo', email?: string) => void
  accountType: 'sme' | 'cfo'
  email: string
}

type OnboardingStep = 'company-info' | 'contact-person' | 'financial-goals' | 'communication' | 'cfo-needs' | 'professional-background' | 'areas-of-expertise' | 'experience-level' | 'availability' | 'work-expectations'

const OnboardingPage: React.FC<OnboardingPageProps> = ({ 
  onNavigate, 
  accountType, 
  email 
}) => {
  const [currentStep, setCurrentStep] = useState<OnboardingStep>(accountType === 'cfo' ? 'professional-background' : 'company-info')
  const [formData, setFormData] = useState({
    // Company Information
    legalCompanyName: '',
    streetAddress: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
    industry: '',
    revenue: '',
    employees: '',
    yearsInBusiness: '',
    // Contact Person
    firstName: '',
    lastName: '',
    jobTitle: '',
    // Financial Challenges & Goals
    financialChallenges: [] as string[],
    additionalChallenges: '',
    // Communication Preferences
    communicationMethods: [] as string[],
    // CFO Engagement Needs
    engagementDuration: '',
    cfoSupportAreas: [] as string[],
    additionalRequirements: '',
    // CFO Professional Background
    certifications: [] as string[],
    certificationFiles: {} as Record<string, File | null>,
    customCertificationName: '',
    education: '',
    resumeFile: null as File | null,
    linkedinUrl: '',
    // CFO Areas of Expertise
    areasOfExpertise: [] as string[],
    // CFO Experience Level
    experienceLevel: '',
    industriesWorked: [] as string[],
    companySizeExperience: '',
    // CFO Availability
    availability: '',
    preferredHours: '',
    engagementLength: '',
    // CFO Work Expectations
    preferredEngagementModel: '',
    rateExpectations: '',
    additionalPreferences: ''
  })

  const smeSteps = [
    {
      id: 'company-info' as OnboardingStep,
      title: 'Company Information',
      subtitle: 'Tell us about your business details',
      icon: '🏢'
    },
    {
      id: 'contact-person' as OnboardingStep,
      title: 'Contact Person',
      subtitle: 'Primary contact information',
      icon: '👤'
    },
    {
      id: 'financial-goals' as OnboardingStep,
      title: 'Financial Challenges & Goals',
      subtitle: 'Share your financial objectives',
      icon: '📈'
    },
    {
      id: 'communication' as OnboardingStep,
      title: 'Communication Preferences',
      subtitle: 'How you\'d like to work with us',
      icon: '💬'
    },
    {
      id: 'cfo-needs' as OnboardingStep,
      title: 'CFO Engagement Needs',
      subtitle: 'Tell us about your CFO requirements',
      icon: '🎯'
    }
  ]

  const cfoSteps = [
    {
      id: 'professional-background' as OnboardingStep,
      title: 'Professional Background',
      subtitle: 'Share your credentials and experience',
      icon: '🎓'
    },
    {
      id: 'areas-of-expertise' as OnboardingStep,
      title: 'Areas of Expertise',
      subtitle: 'Tell us about your specializations',
      icon: '🔧'
    },
    {
      id: 'experience-level' as OnboardingStep,
      title: 'Experience Level',
      subtitle: 'Your professional experience details',
      icon: '📊'
    },
    {
      id: 'availability' as OnboardingStep,
      title: 'Availability',
      subtitle: 'Your working preferences and capacity',
      icon: '📅'
    },
    {
      id: 'work-expectations' as OnboardingStep,
      title: 'Work Expectations',
      subtitle: 'Your preferred engagement model',
      icon: '🤝'
    }
  ]

  const steps = accountType === 'cfo' ? cfoSteps : smeSteps

  const smeIndustryOptions = [
    'Technology',
    'Healthcare',
    'Manufacturing',
    'Retail',
    'Finance',
    'Real Estate',
    'Education',
    'Consulting',
    'Other'
  ]

  const revenueOptions = [
    'Under ₦1B',
    '₦1B - ₦5B',
    '₦5B - ₦10B',
    '₦10B - ₦25B',
    '₦25B - ₦50B',
    '₦50B - ₦100B',
    'Over ₦100B'
  ]

  const employeeOptions = [
    '1-10',
    '11-25',
    '26-50',
    '51-100',
    '101-250',
    '251-500',
    '500+'
  ]

  const yearsOptions = [
    'Less than 1 year',
    '1-2 years',
    '3-5 years',
    '6-10 years',
    '11-20 years',
    'Over 20 years'
  ]

  const countryOptions = [
    'United States',
    'Canada',
    'United Kingdom',
    'Australia',
    'Germany',
    'France',
    'Netherlands',
    'Switzerland',
    'Singapore',
    'Japan',
    'Other'
  ]

  const financialChallengeOptions = [
    'Cash flow optimization',
    'Fundraising',
    'Budgeting',
    'Financial modeling',
    'Cost reduction',
    'Growth strategy',
    'Exit planning',
    'Managing profitability',
    'Treasury management'
  ]

  const communicationMethodOptions = [
    'Email',
    'Video call',
    'Phone',
    'In-person'
  ]

  const engagementDurationOptions = [
    'Part-time (5-10 hours/week)',
    'Part-time (10-20 hours/week)',
    'Full-time (20-40 hours/week)',
    'Project-based',
    'On-demand consultation',
    'Other'
  ]

  const cfoSupportAreaOptions = [
    'Financial planning & budgeting',
    'Cash flow management',
    'Financial reporting & analysis',
    'Fundraising support',
    'Cost optimization',
    'Tax planning & compliance',
    'M&A financial due diligence',
    'Investor relations',
    'Risk management',
    'Strategic financial consulting'
  ]

  // CFO Options
  const certificationOptions = [
    'CPA (Certified Public Accountant)',
    'CFA (Chartered Financial Analyst)',
    'CMA (Certified Management Accountant)',
    'MBA in Finance',
    'Chartered Accountant',
    'Other'
  ]

  const expertiseAreaOptions = [
    'Financial planning & budgeting',
    'Cash flow management',
    'Financial reporting & analysis',
    'Fundraising & capital raising',
    'Cost optimization',
    'Tax planning & compliance',
    'M&A financial due diligence',
    'Investor relations',
    'Risk management',
    'Strategic financial consulting',
    'IPO preparation',
    'Financial modeling',
    'Treasury management',
    'Audit & compliance'
  ]

  const experienceLevelOptions = [
    '5-10 years',
    '10-15 years',
    '15-20 years',
    '20+ years'
  ]

  const industryOptions = [
    'Technology',
    'Healthcare',
    'Manufacturing',
    'Retail',
    'Finance',
    'Real Estate',
    'Education',
    'Consulting',
    'Startups',
    'SaaS',
    'E-commerce',
    'Other'
  ]

  const companySizeOptions = [
    'Startups (0-10 employees)',
    'Small business (10-50 employees)',
    'Medium business (50-200 employees)',
    'Large business (200+ employees)',
    'Enterprise (1000+ employees)'
  ]

  const availabilityOptions = [
    'Weekdays (After work)',
    'Weekends',
    'Flexible'
  ]

  const engagementLengthOptions = [
    '3-6 months',
    '6-12 months',
    '1-2 years',
    '2+ years',
    'Ongoing/Open-ended',
    'Project-based (flexible)'
  ]

  const engagementModelOptions = [
    'Fractional CFO (ongoing)',
    'Project-based',
    'Consultation (hourly)',
    'Interim CFO',
    'Advisory board member'
  ]

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleCheckboxChange = (challenge: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      financialChallenges: checked 
        ? [...prev.financialChallenges, challenge]
        : prev.financialChallenges.filter(c => c !== challenge)
    }))
  }

  const handleCommunicationMethodChange = (method: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      communicationMethods: checked 
        ? [...prev.communicationMethods, method]
        : prev.communicationMethods.filter(m => m !== method)
    }))
  }

  const handleCfoSupportAreaChange = (area: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      cfoSupportAreas: checked 
        ? [...prev.cfoSupportAreas, area]
        : prev.cfoSupportAreas.filter(a => a !== area)
    }))
  }

  const handleCertificationChange = (certification: string, checked: boolean) => {
    setFormData(prev => {
      const newCertifications = checked 
        ? [...prev.certifications, certification]
        : prev.certifications.filter(c => c !== certification)
      
      // Remove file when unchecking certification
      const newCertificationFiles = { ...prev.certificationFiles }
      if (!checked) {
        delete newCertificationFiles[certification]
        
        // If unchecking "Other", also clear the custom name
        if (certification === 'Other') {
          return {
            ...prev,
            certifications: newCertifications,
            certificationFiles: newCertificationFiles,
            customCertificationName: ''
          }
        }
      }
      
      return {
        ...prev,
        certifications: newCertifications,
        certificationFiles: newCertificationFiles
      }
    })
  }

  const handleCertificationFileUpload = (certification: string, file: File | null) => {
    setFormData(prev => ({
      ...prev,
      certificationFiles: {
        ...prev.certificationFiles,
        [certification]: file
      }
    }))
  }

  const handleExpertiseAreaChange = (area: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      areasOfExpertise: checked 
        ? [...prev.areasOfExpertise, area]
        : prev.areasOfExpertise.filter(a => a !== area)
    }))
  }

  const handleIndustryChange = (industry: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      industriesWorked: checked 
        ? [...prev.industriesWorked, industry]
        : prev.industriesWorked.filter(i => i !== industry)
    }))
  }

  const handleFileUpload = (file: File) => {
    setFormData(prev => ({
      ...prev,
      resumeFile: file
    }))
  }

  const handleContinue = () => {
    // Validate form data based on current step
    let isValid = false
    
    switch (currentStep) {
      case 'company-info':
        const companyFields = ['legalCompanyName', 'streetAddress', 'city', 'state', 'postalCode', 'country', 'industry', 'revenue', 'employees', 'yearsInBusiness']
        isValid = companyFields.every(field => formData[field as keyof typeof formData].trim() !== '')
        break
      case 'contact-person':
        const contactFields = ['firstName', 'lastName', 'jobTitle']
        isValid = contactFields.every(field => formData[field as keyof typeof formData].trim() !== '')
        break
      case 'financial-goals':
        isValid = formData.financialChallenges.length > 0
        break
      case 'communication':
        isValid = formData.communicationMethods.length > 0
        break
      case 'cfo-needs':
        isValid = formData.engagementDuration && formData.cfoSupportAreas.length > 0
        break
      case 'professional-background':
        // Check that all required fields are filled
        const hasBasicInfo = formData.firstName && formData.lastName && formData.education && formData.resumeFile && formData.linkedinUrl
        
        // Check that at least one certification is selected
        const hasCertifications = formData.certifications.length > 0
        
        // Check that if "Other" is selected, custom name is provided
        const hasCustomCertificationName = !formData.certifications.includes('Other') || 
          (formData.certifications.includes('Other') && formData.customCertificationName.trim() !== '')
        
        // Check that all selected certifications have uploaded files
        const allCertificationsHaveFiles = formData.certifications.every(cert => 
          formData.certificationFiles[cert] !== undefined && formData.certificationFiles[cert] !== null
        )
        
        isValid = hasBasicInfo && hasCertifications && hasCustomCertificationName && allCertificationsHaveFiles
        break
      case 'areas-of-expertise':
        isValid = formData.areasOfExpertise.length > 0
        break
      case 'experience-level':
        isValid = formData.experienceLevel && formData.industriesWorked.length > 0 && formData.companySizeExperience
        break
      case 'availability':
        isValid = formData.availability && formData.engagementLength
        break
      case 'work-expectations':
        isValid = formData.preferredEngagementModel && formData.rateExpectations
        break
      default:
        isValid = true
    }
    
    if (isValid) {
      // Move to next step
      const currentIndex = steps.findIndex(step => step.id === currentStep)
      if (currentIndex < steps.length - 1) {
        setCurrentStep(steps[currentIndex + 1].id)
      } else {
        // Complete onboarding and navigate to success page
        console.log('Onboarding completed:', formData)
        onNavigate('onboarding-success', accountType, email)
      }
    } else {
      // Provide specific error messages for professional background step
      if (currentStep === 'professional-background') {
        const missingFields = []
        if (!formData.firstName || !formData.lastName) missingFields.push('Name')
        if (!formData.education) missingFields.push('Education Background')
        if (!formData.resumeFile) missingFields.push('Resume/CV')
        if (!formData.linkedinUrl) missingFields.push('LinkedIn Profile')
        if (formData.certifications.length === 0) missingFields.push('At least one certification')
        
        // Check for custom certification name if "Other" is selected
        if (formData.certifications.includes('Other') && !formData.customCertificationName.trim()) {
          missingFields.push('Certification name for "Other" option')
        }
        
        const missingCertificationFiles = formData.certifications.filter(cert => 
          !formData.certificationFiles[cert]
        )
        if (missingCertificationFiles.length > 0) {
          missingFields.push(`Certificate files for: ${missingCertificationFiles.join(', ')}`)
        }
        
        if (missingFields.length > 0) {
          alert(`Please complete the following required fields:\n\n• ${missingFields.join('\n• ')}`)
        }
      } else {
        console.log('Please fill in all required fields')
      }
    }
  }

  const handleBack = () => {
    const currentIndex = steps.findIndex(step => step.id === currentStep)
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1].id)
    }
  }

  const isStepActive = (stepId: OnboardingStep) => currentStep === stepId
  const isStepCompleted = (stepId: OnboardingStep) => {
    const stepIndex = steps.findIndex(step => step.id === stepId)
    const currentIndex = steps.findIndex(step => step.id === currentStep)
    return stepIndex < currentIndex
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 'company-info':
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="legalCompanyName" className="text-sm font-medium text-gray-700">
                Legal Company Name*
              </label>
              <Input
                id="legalCompanyName"
                placeholder="Enter your legal company name"
                value={formData.legalCompanyName}
                onChange={(e) => handleInputChange('legalCompanyName', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="streetAddress" className="text-sm font-medium text-gray-700">
                Street Address*
              </label>
              <Input
                id="streetAddress"
                placeholder="Enter street address"
                value={formData.streetAddress}
                onChange={(e) => handleInputChange('streetAddress', e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="city" className="text-sm font-medium text-gray-700">
                  City*
                </label>
                <Input
                  id="city"
                  placeholder="Enter city"
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="state" className="text-sm font-medium text-gray-700">
                  State/Province*
                </label>
                <Input
                  id="state"
                  placeholder="Enter state or province"
                  value={formData.state}
                  onChange={(e) => handleInputChange('state', e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="postalCode" className="text-sm font-medium text-gray-700">
                  Postal Code*
                </label>
                <Input
                  id="postalCode"
                  placeholder="Enter postal code"
                  value={formData.postalCode}
                  onChange={(e) => handleInputChange('postalCode', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="country" className="text-sm font-medium text-gray-700">
                  Country*
                </label>
                <Select
                  options={countryOptions.map(option => ({ value: option, label: option }))}
                  value={formData.country}
                  onChange={(value) => handleInputChange('country', value)}
                  placeholder="Select country"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="industry" className="text-sm font-medium text-gray-700">
                  Industry*
                </label>
                                            <Select
                              options={smeIndustryOptions.map(option => ({ value: option, label: option }))}
                              value={formData.industry}
                              onChange={(value) => handleInputChange('industry', value)}
                              placeholder="Select your industry"
                            />
              </div>

              <div className="space-y-2">
                <label htmlFor="revenue" className="text-sm font-medium text-gray-700">
                  Revenue*
                </label>
                <Select
                  options={revenueOptions.map(option => ({ value: option, label: option }))}
                  value={formData.revenue}
                  onChange={(value) => handleInputChange('revenue', value)}
                  placeholder="Select range"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="employees" className="text-sm font-medium text-gray-700">
                  Employees*
                </label>
                <Select
                  options={employeeOptions.map(option => ({ value: option, label: option }))}
                  value={formData.employees}
                  onChange={(value) => handleInputChange('employees', value)}
                  placeholder="Select range"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="yearsInBusiness" className="text-sm font-medium text-gray-700">
                  Years in Business*
                </label>
                <Select
                  options={yearsOptions.map(option => ({ value: option, label: option }))}
                  value={formData.yearsInBusiness}
                  onChange={(value) => handleInputChange('yearsInBusiness', value)}
                  placeholder="Select years"
                />
              </div>
            </div>
          </div>
        )
      
      case 'contact-person':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="firstName" className="text-sm font-medium text-gray-700">
                  First Name*
                </label>
                <Input
                  id="firstName"
                  placeholder="Enter first name"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="lastName" className="text-sm font-medium text-gray-700">
                  Last Name*
                </label>
                <Input
                  id="lastName"
                  placeholder="Enter last name"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="jobTitle" className="text-sm font-medium text-gray-700">
                Job Title*
              </label>
              <Input
                id="jobTitle"
                placeholder="Enter job title"
                value={formData.jobTitle}
                onChange={(e) => handleInputChange('jobTitle', e.target.value)}
              />
            </div>


          </div>
        )
      
      case 'financial-goals':
        return (
          <div className="space-y-8">
            {/* Financial Challenges Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">
                Select your main financial challenges (select all that apply)*
              </h3>
              <div className="space-y-3">
                {financialChallengeOptions.map((challenge) => (
                  <label key={challenge} className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.financialChallenges.includes(challenge)}
                      onChange={(e) => handleCheckboxChange(challenge, e.target.checked)}
                      className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                    />
                    <span className="text-sm text-gray-700">{challenge}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Additional Challenges Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">
                Additional challenges or goals (optional)
              </h3>
              <textarea
                placeholder="Describe any specific financial challenges or goals..."
                value={formData.additionalChallenges}
                onChange={(e) => handleInputChange('additionalChallenges', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                rows={4}
              />
            </div>
          </div>
        )
      
      case 'communication':
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">
                Preferred communication methods (select all that apply)*
              </h3>
              <div className="space-y-3">
                {communicationMethodOptions.map((method) => (
                  <label key={method} className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.communicationMethods.includes(method)}
                      onChange={(e) => handleCommunicationMethodChange(method, e.target.checked)}
                      className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                    />
                    <span className="text-sm text-gray-700">{method}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )
      
      case 'cfo-needs':
        return (
          <div className="space-y-8">
            {/* Engagement Duration */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">
                Desired Engagement Duration*
              </h3>
              <Select
                options={engagementDurationOptions.map(option => ({ value: option, label: option }))}
                value={formData.engagementDuration}
                onChange={(value) => handleInputChange('engagementDuration', value)}
                placeholder="Select commitment duration"
              />
            </div>

            {/* CFO Support Areas */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">
                Areas where you need CFO support (select all that apply)*
              </h3>
              <div className="space-y-3">
                {cfoSupportAreaOptions.map((area) => (
                  <label key={area} className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.cfoSupportAreas.includes(area)}
                      onChange={(e) => handleCfoSupportAreaChange(area, e.target.checked)}
                      className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                    />
                    <span className="text-sm text-gray-700">{area}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Additional Requirements */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">
                Additional requirements or preferences
              </h3>
              <textarea
                placeholder="Describe any specific CFO requirements, budget constraints, or other preferences..."
                value={formData.additionalRequirements}
                onChange={(e) => handleInputChange('additionalRequirements', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                rows={4}
              />
            </div>
          </div>
        )
      
      case 'professional-background':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="firstName" className="text-sm font-medium text-gray-700">
                  First Name*
                </label>
                <Input
                  id="firstName"
                  placeholder="Enter your first name"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="lastName" className="text-sm font-medium text-gray-700">
                  Last Name*
                </label>
                <Input
                  id="lastName"
                  placeholder="Enter your last name"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                />
              </div>
            </div>





            <div className="space-y-2">
              <label htmlFor="linkedinUrl" className="text-sm font-medium text-gray-700">
                LinkedIn Profile URL*
              </label>
              <Input
                id="linkedinUrl"
                type="url"
                placeholder="https://linkedin.com/in/your-profile"
                value={formData.linkedinUrl}
                onChange={(e) => handleInputChange('linkedinUrl', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="resumeUpload" className="text-sm font-medium text-gray-700">
                Resume/CV Upload*
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-primary-400 transition-colors">
                <div className="space-y-1 text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-primary-600 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500"
                    >
                      <span>Upload a file</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => {
                          const file = e.target.files?.[0]
                          if (file) {
                            handleFileUpload(file)
                          }
                        }}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    PDF, DOC, or DOCX up to 10MB
                  </p>
                  {formData.resumeFile && (
                    <p className="text-sm text-primary-600 font-medium">
                      ✓ {formData.resumeFile.name}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">
                Certifications & Credentials
              </h3>
              <div className="space-y-4">
                {certificationOptions.map((certification) => (
                  <div key={certification} className="space-y-3">
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.certifications.includes(certification)}
                        onChange={(e) => handleCertificationChange(certification, e.target.checked)}
                        className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                      />
                      <span className="text-sm text-gray-700">{certification}</span>
                    </label>
                    
                    {/* Custom name input and file upload for selected certification */}
                    {formData.certifications.includes(certification) && (
                      <div className="ml-7 p-4 bg-gray-50 rounded-lg border border-gray-200 space-y-3">
                        {/* Show custom name input for "Other" option */}
                        {certification === 'Other' && (
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Certification Name*
                            </label>
                            <Input
                              placeholder="e.g., ACCA, CIMA, FRM, etc."
                              value={formData.customCertificationName}
                              onChange={(e) => handleInputChange('customCertificationName', e.target.value)}
                              className="w-full"
                            />
                          </div>
                        )}
                        
                        {/* File upload section */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Upload {certification === 'Other' && formData.customCertificationName 
                              ? formData.customCertificationName 
                              : certification} Certificate*
                          </label>
                          <div className="flex items-center space-x-3">
                            <div className="flex-1">
                              <input
                                type="file"
                                accept=".pdf,.jpg,.jpeg,.png"
                                onChange={(e) => {
                                  const file = e.target.files?.[0] || null
                                  handleCertificationFileUpload(certification, file)
                                }}
                                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
                              />
                            </div>
                            {formData.certificationFiles[certification] && (
                              <div className="flex items-center space-x-2">
                                <svg className="h-4 w-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span className="text-sm text-green-600 font-medium">
                                  {formData.certificationFiles[certification]?.name}
                                </span>
                              </div>
                            )}
                          </div>
                          <p className="text-xs text-gray-500 mt-1">
                            Accepted formats: PDF, JPG, PNG (max 10MB)
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              {formData.certifications.length === 0 && (
                <p className="text-sm text-gray-500 italic">
                  Please select at least one certification to proceed.
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="education" className="text-sm font-medium text-gray-700">
                Education Background*
              </label>
              <textarea
                id="education"
                placeholder="Describe your educational background, degrees, and relevant qualifications..."
                value={formData.education}
                onChange={(e) => handleInputChange('education', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                rows={3}
              />
            </div>
          </div>
        )
      
      case 'areas-of-expertise':
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">
                Areas of Expertise (select all that apply)*
              </h3>
              <div className="space-y-3">
                {expertiseAreaOptions.map((area) => (
                  <label key={area} className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.areasOfExpertise.includes(area)}
                      onChange={(e) => handleExpertiseAreaChange(area, e.target.checked)}
                      className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                    />
                    <span className="text-sm text-gray-700">{area}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )
      
      case 'experience-level':
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="experienceLevel" className="text-sm font-medium text-gray-700">
                Experience Level*
              </label>
              <Select
                options={experienceLevelOptions.map(option => ({ value: option, label: option }))}
                value={formData.experienceLevel}
                onChange={(value) => handleInputChange('experienceLevel', value)}
                placeholder="Select experience level"
              />
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">
                Industries You've Worked In (select all that apply)*
              </h3>
              <div className="space-y-3">
                {industryOptions.map((industry) => (
                  <label key={industry} className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.industriesWorked.includes(industry)}
                      onChange={(e) => handleIndustryChange(industry, e.target.checked)}
                      className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                    />
                    <span className="text-sm text-gray-700">{industry}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="companySizeExperience" className="text-sm font-medium text-gray-700">
                Company Size Experience*
              </label>
              <Select
                options={companySizeOptions.map(option => ({ value: option, label: option }))}
                value={formData.companySizeExperience}
                onChange={(value) => handleInputChange('companySizeExperience', value)}
                placeholder="Select company size experience"
              />
            </div>
          </div>
        )
      
      case 'availability':
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="availability" className="text-sm font-medium text-gray-700">
                Availability Type*
              </label>
              <Select
                options={availabilityOptions.map(option => ({ value: option, label: option }))}
                value={formData.availability}
                onChange={(value) => handleInputChange('availability', value)}
                placeholder="Select availability type"
              />
            </div>



            <div className="space-y-2">
              <label htmlFor="engagementLength" className="text-sm font-medium text-gray-700">
                Desired Engagement Length*
              </label>
              <Select
                options={engagementLengthOptions.map(option => ({ value: option, label: option }))}
                value={formData.engagementLength}
                onChange={(value) => handleInputChange('engagementLength', value)}
                placeholder="Select engagement length"
              />
            </div>
          </div>
        )
      
      case 'work-expectations':
        return (
          <div className="space-y-8">
            <div className="space-y-2">
              <label htmlFor="preferredEngagementModel" className="text-sm font-medium text-gray-700">
                Preferred Engagement Model*
              </label>
              <Select
                options={engagementModelOptions.map(option => ({ value: option, label: option }))}
                value={formData.preferredEngagementModel}
                onChange={(value) => handleInputChange('preferredEngagementModel', value)}
                placeholder="Select engagement model"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="rateExpectations" className="text-sm font-medium text-gray-700">
                Rate Expectations*
              </label>
              <Input
                id="rateExpectations"
                placeholder="e.g., ₦75,000-100,000/hour, ₦2,500,000-5,000,000/month"
                value={formData.rateExpectations}
                onChange={(e) => handleInputChange('rateExpectations', e.target.value)}
              />
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">
                Additional Preferences
              </h3>
              <textarea
                placeholder="Describe any specific preferences, working style, or other requirements..."
                value={formData.additionalPreferences}
                onChange={(e) => handleInputChange('additionalPreferences', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                rows={4}
              />
            </div>
          </div>
        )
      
      default:
        return (
          <div className="text-center py-12">
            <p className="text-gray-600">Step content coming soon...</p>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Sidebar */}
      <div className="w-1/3 bg-primary-600 text-white p-8 flex flex-col">
        {/* Logo */}
        <div className="mb-12">
          <div className="w-32 h-8">
            <svg className="w-full h-full" viewBox="0 0 119 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M114.41 9.13419C114.41 9.41033 114.634 9.63419 114.91 9.63419H116.989C117.265 9.63419 117.489 9.85805 117.489 10.1342V12.4773C117.489 12.7535 117.265 12.9773 116.989 12.9773H114.91C114.634 12.9773 114.41 13.2012 114.41 13.4773V20.7495C114.41 21.1604 114.475 21.4811 114.603 21.711C114.731 21.9335 114.908 22.0897 115.135 22.1802C115.369 22.2707 115.639 22.3162 115.945 22.3162C116.158 22.3162 116.371 22.2994 116.584 22.2645C116.589 22.2637 116.593 22.2628 116.597 22.2619C116.863 22.21 117.12 22.3809 117.177 22.6452L117.691 25.0334C117.746 25.2872 117.597 25.5402 117.345 25.6027C117.193 25.6404 117.021 25.6803 116.829 25.7225C116.418 25.82 115.917 25.8788 115.327 25.8997C114.234 25.9415 113.274 25.799 112.45 25.4717C111.634 25.1443 110.998 24.6356 110.543 23.9461C110.089 23.2566 109.865 22.3861 109.872 21.3346V13.4773C109.872 13.2012 109.648 12.9773 109.372 12.9773H108.35C108.074 12.9773 107.85 13.2012 107.85 13.4773V25.1805C107.85 25.4566 107.626 25.6805 107.35 25.6805H103.812C103.536 25.6805 103.312 25.4566 103.312 25.1805V10.1342C103.312 9.85805 103.536 9.63419 103.812 9.63419H109.372C109.648 9.63419 109.872 9.41033 109.872 9.13419V6.28923C109.872 6.01309 110.096 5.78923 110.372 5.78923H113.91C114.186 5.78923 114.41 6.01309 114.41 6.28923V9.13419Z" fill="white"/>
              <path d="M102.695 7.74116C102.695 8.0173 102.471 8.24116 102.195 8.24116H93.3618C93.0857 8.24116 92.8618 8.46502 92.8618 8.74116V12.8386C92.8618 13.1148 93.0857 13.3386 93.3618 13.3386H101.236C101.512 13.3386 101.736 13.5625 101.736 13.8386V16.5687C101.736 16.8449 101.512 17.0687 101.236 17.0687H93.3618C93.0857 17.0687 92.8618 17.2926 92.8618 17.5687V25.4068C92.8618 25.683 92.638 25.9068 92.3618 25.9068H88.7485C88.4724 25.9068 88.2485 25.683 88.2485 25.4068V5.01115C88.2485 4.735 88.4724 4.51115 88.7485 4.51115H102.195C102.471 4.51115 102.695 4.735 102.695 5.01115V7.74116Z" fill="white"/>
              <path d="M105.592 4.70691C106.267 4.70698 106.842 4.92963 107.318 5.37524C107.8 5.81388 108.042 6.33955 108.042 6.95222C108.042 7.57189 107.8 8.10464 107.318 8.55027C106.842 8.98891 106.267 9.20896 105.592 9.20903C104.918 9.20903 104.339 8.98892 103.856 8.55027C103.38 8.10461 103.142 7.57198 103.142 6.95222C103.142 6.33954 103.38 5.81388 103.856 5.37524C104.339 4.92973 104.918 4.70691 105.592 4.70691Z" fill="#E3B018"/>
              <path fillRule="evenodd" clipRule="evenodd" d="M73.4019 9.33768C74.4813 9.33768 75.4862 9.5088 76.4165 9.85006C77.354 10.1844 78.1707 10.6895 78.8667 11.365C79.5698 12.0406 80.1167 12.8905 80.5073 13.9143C80.8979 14.9311 81.0933 16.1222 81.0933 17.4873V18.2091C81.0933 18.4853 80.8694 18.7091 80.5933 18.7091H69.9603C69.9544 18.7091 69.9497 18.7139 69.9497 18.7197C69.9497 19.5136 70.0987 20.1997 70.397 20.7777C70.7023 21.3556 71.1322 21.8011 71.6861 22.1145C72.2399 22.4279 72.8969 22.5847 73.6568 22.5848C74.1609 22.5848 74.6235 22.5152 75.0424 22.376C75.4613 22.2367 75.8195 22.0273 76.1177 21.7488C76.33 21.5504 76.5068 21.3203 76.6474 21.0585C76.7507 20.866 76.9486 20.7346 77.1665 20.7487L80.419 20.9595C80.7237 20.9793 80.9414 21.2662 80.8486 21.5572C80.6069 22.3154 80.2195 22.9921 79.687 23.5874C79.0336 24.3187 78.1887 24.8907 77.1519 25.3016C76.122 25.7055 74.932 25.9068 73.5825 25.9068C71.8993 25.9068 70.4503 25.5727 69.2359 24.9041C68.0286 24.2286 67.0982 23.2744 66.4448 22.0418C65.7914 20.8021 65.4644 19.3357 65.4644 17.6433C65.4644 15.9928 65.7915 14.5442 66.4448 13.2975C67.0982 12.0509 68.0176 11.079 69.2036 10.3824C70.3968 9.686 71.7968 9.33768 73.4019 9.33768ZM73.4761 12.6607C72.7874 12.6607 72.1766 12.8167 71.6441 13.13C71.1185 13.4364 70.706 13.8516 70.4077 14.3739C70.2178 14.7022 70.0876 15.0545 70.0162 15.4308C69.963 15.7112 70.1944 15.9511 70.4798 15.9511H76.3208C76.5969 15.9511 76.8249 15.7263 76.7903 15.4523C76.7347 15.0118 76.603 14.6105 76.395 14.2485C76.1109 13.754 75.7167 13.3674 75.2124 13.0888C74.7153 12.8032 74.1366 12.6607 73.4761 12.6607Z" fill="white"/>
              <path d="M86.1929 25.4068C86.1929 25.683 85.969 25.9068 85.6929 25.9068H82.1548C81.8786 25.9068 81.6548 25.683 81.6548 25.4068V5.01115C81.6548 4.735 81.8786 4.51115 82.1548 4.51115H85.6929C85.969 4.51115 86.1929 4.735 86.1929 5.01115V25.4068Z" fill="white"/>
              <path d="M14.8643 7.74116C14.8643 8.0173 14.6404 8.24116 14.3643 8.24116H5.53125C5.25511 8.24116 5.03125 8.46502 5.03125 8.74116V12.8386C5.03125 13.1148 5.25511 13.3386 5.53125 13.3386H13.4053C13.6814 13.3386 13.9053 13.5625 13.9053 13.8386V16.5687C13.9053 16.8449 13.6814 17.0687 13.4053 17.0687H5.53125C5.25511 17.0687 5.03125 17.2926 5.03125 17.5687V25.4068C5.03125 25.683 4.80739 25.9068 4.53125 25.9068H0.917968C0.641826 25.9068 0.417969 25.683 0.417969 25.4068V5.01115C0.417969 4.735 0.641826 4.51115 0.917968 4.51115H14.3643C14.6404 4.51115 14.8643 4.735 14.8643 5.01115V7.74116Z" fill="white"/>
              <path d="M31.0416 9.62609C31.3178 9.62609 31.5416 9.84995 31.5416 10.1261V17.9064C31.5416 22.3246 27.9051 25.9062 23.4869 25.9064C19.0687 25.9064 15.4313 22.3246 15.4313 17.9064V10.1261C15.4313 9.84999 15.6552 9.62616 15.9313 9.62609H17.5837C17.753 9.62609 17.9107 9.71172 18.003 9.85365L21.6949 15.5353V21.4239C21.6949 21.8298 22.153 22.0666 22.484 21.8321L25.068 19.9982C25.1999 19.9044 25.2789 19.7528 25.2789 19.5909V15.5402L28.9709 9.85381C29.0631 9.71179 29.221 9.62609 29.3903 9.62609H31.0416Z" fill="#E3B018"/>
              <path d="M40.1648 9.62609C44.583 9.62616 48.2195 13.2079 48.2195 17.6261V25.4064C48.2195 25.6823 47.9964 25.9061 47.7205 25.9064H44.1755C43.8994 25.9064 43.6755 25.6825 43.6755 25.4064V17.6818C43.6755 15.7429 42.1036 14.1711 40.1648 14.171C38.2259 14.171 36.6541 15.7429 36.6541 17.6818V25.4064C36.6541 25.6825 36.4302 25.9064 36.1541 25.9064H32.6091C32.3331 25.9062 32.1091 25.6824 32.1091 25.4064V17.6261C32.1091 13.2078 35.7465 9.62609 40.1648 9.62609Z" fill="white"/>
              <path d="M56.8424 9.62609C61.2606 9.62616 64.8971 13.2079 64.8971 17.6261V25.4064C64.8971 25.6823 64.674 25.9061 64.3981 25.9064H60.8531C60.577 25.9064 60.3531 25.6825 60.3531 25.4064V17.6818C60.3531 15.7429 58.7812 14.1711 56.8424 14.171C54.9035 14.171 53.3317 15.7429 53.3317 17.6818V25.4064C53.3317 25.6825 53.1078 25.9064 52.8317 25.9064H49.2867C49.0107 25.9062 48.7867 25.6824 48.7867 25.4064V17.6261C48.7867 13.2078 52.4241 9.62609 56.8424 9.62609Z" fill="white"/>
            </svg>
          </div>
        </div>

        {/* Steps Navigation */}
        <div className="flex-1 space-y-6">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-start space-x-4">
              <div className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  isStepActive(step.id) 
                    ? 'bg-primary-400 text-primary-800' 
                    : isStepCompleted(step.id)
                    ? 'bg-primary-400 text-primary-800'
                    : 'border-2 border-primary-400 text-primary-300'
                }`}>
                  {isStepCompleted(step.id) ? (
                    <CheckIcon className="h-4 w-4" />
                  ) : (
                    <span className={`text-xs ${isStepActive(step.id) ? 'font-bold' : ''}`}>
                      {index + 1}
                    </span>
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-0.5 h-8 mt-2 ${
                    isStepCompleted(step.id) ? 'bg-primary-400' : 'bg-primary-500'
                  }`} />
                )}
              </div>
              <div className="flex-1">
                <h3 className={`font-semibold ${
                  isStepActive(step.id) ? 'text-white' : 'text-primary-200'
                }`}>
                  {step.title}
                </h3>
                <p className={`text-sm ${
                  isStepActive(step.id) ? 'text-primary-100' : 'text-primary-300'
                }`}>
                  {step.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-auto space-y-2">
          <p className="text-sm text-primary-200">© FunnelFit 2024</p>
          <p className="text-sm text-primary-200">help@funnelfit.com</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-white p-8">
        <div className="max-w-2xl mx-auto pt-12">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-2xl font-semibold text-gray-900">
                {steps.find(step => step.id === currentStep)?.title}
              </h1>
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary-100 text-primary-800 text-sm font-medium">
                Step {steps.findIndex(step => step.id === currentStep) + 1} of {steps.length}
              </div>
            </div>
            <p className="text-sm text-gray-600">
              {steps.find(step => step.id === currentStep)?.subtitle}
            </p>
          </div>

          {/* Form Content */}
          {renderStepContent()}

                                {/* Navigation Buttons */}
                      <div className="mt-8 flex justify-between">
                        {currentStep !== 'company-info' && (
                          <Button 
                            onClick={handleBack}
                            variant="outline"
                            className="w-full md:w-auto"
                            size="lg"
                          >
                            Back
                          </Button>
                        )}
                        <div className="flex-1" />
                        <Button 
                          onClick={handleContinue}
                          className="w-full md:w-auto"
                          size="lg"
                        >
                          {currentStep === 'cfo-needs' || currentStep === 'work-expectations' ? 'Submit' : 'Continue'}
                        </Button>
                      </div>
        </div>
      </div>
    </div>
  )
}

export default OnboardingPage
