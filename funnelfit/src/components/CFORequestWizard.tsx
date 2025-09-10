import React, { useState } from 'react'
import { Modal } from './ui/modal'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Card } from './ui/card'
import { Label } from './ui/label'
import { 
  ChevronLeftIcon, 
  ChevronRightIcon, 
  BuildingIcon, 
  DollarSignIcon, 
  TrendingUpIcon,
  CheckCircleIcon,
  AlertCircleIcon,
  BarChart3Icon
} from 'lucide-react'

export interface CFORequestWizardProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: CFORequestData) => void
}

export interface CFORequestData {
  // Financial Challenges
  primaryChallenges: string[]
  urgencyLevel: string
  timeframe: string
  
  // Specific Needs
  serviceTypes: string[]
  preferredExperience: string[]
  additionalRequirements: string
}

const STEPS = [
  { id: 1, title: 'Financial Challenges', icon: AlertCircleIcon },
  { id: 2, title: 'Specific Needs', icon: BarChart3Icon },
  { id: 3, title: 'Review & Submit', icon: CheckCircleIcon }
]

const FINANCIAL_CHALLENGES = [
  'Fundraising Strategy',
  'Financial Planning & Analysis',
  'Cash Flow Management',
  'Financial Reporting & Compliance',
  'M&A Advisory',
  'IPO Preparation',
  'Cost Optimization',
  'Investment Strategy',
  'Risk Management',
  'Tax Strategy'
]

const SERVICE_TYPES = [
  'Part-time CFO',
  'Interim CFO',
  'Project-based Consulting',
  'Financial Advisory',
  'Board Advisory',
  'Fundraising Support'
]



export const CFORequestWizard: React.FC<CFORequestWizardProps> = ({
  isOpen,
  onClose,
  onSubmit
}) => {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<CFORequestData>({
    primaryChallenges: [],
    urgencyLevel: '',
    timeframe: '',
    serviceTypes: [],
    preferredExperience: [],
    additionalRequirements: ''
  })

  const updateFormData = (field: keyof CFORequestData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const toggleArrayField = (field: keyof CFORequestData, value: string) => {
    const currentArray = formData[field] as string[]
    const newArray = currentArray.includes(value)
      ? currentArray.filter(item => item !== value)
      : [...currentArray, value]
    updateFormData(field, newArray)
  }

  const nextStep = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = () => {
    onSubmit(formData)
    onClose()
    // Reset form
    setCurrentStep(1)
    setFormData({
      primaryChallenges: [],
      urgencyLevel: '',
      timeframe: '',
      serviceTypes: [],
      preferredExperience: [],
      additionalRequirements: ''
    })
  }

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.primaryChallenges.length > 0 && formData.urgencyLevel
      case 2:
        return formData.serviceTypes.length > 0
      case 3:
        return true
      default:
        return false
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <Label>Primary Financial Challenges * (Select all that apply)</Label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {FINANCIAL_CHALLENGES.map((challenge) => (
                  <button
                    key={challenge}
                    type="button"
                    onClick={() => toggleArrayField('primaryChallenges', challenge)}
                    className={`p-3 text-sm border rounded-lg text-left hover:bg-gray-50 transition-colors ${
                      formData.primaryChallenges.includes(challenge)
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-300'
                    }`}
                  >
                    {challenge}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <Label>Urgency Level *</Label>
              <div className="space-y-2 mt-2">
                {[
                  { value: 'immediate', label: 'Immediate (Within 2 weeks)', color: 'red' },
                  { value: 'urgent', label: 'Urgent (Within 1 month)', color: 'orange' },
                  { value: 'moderate', label: 'Moderate (Within 3 months)', color: 'yellow' },
                  { value: 'flexible', label: 'Flexible (No rush)', color: 'green' }
                ].map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => updateFormData('urgencyLevel', option.value)}
                    className={`w-full p-3 text-sm border rounded-lg text-left hover:bg-gray-50 transition-colors ${
                      formData.urgencyLevel === option.value
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-300'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <Label>Expected Engagement Timeframe</Label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {[
                  '3-6 months',
                  '6-12 months',
                  '1-2 years',
                  '2+ years',
                  'Project-based',
                  'Ongoing'
                ].map((timeframe) => (
                  <button
                    key={timeframe}
                    type="button"
                    onClick={() => updateFormData('timeframe', timeframe)}
                    className={`p-3 text-sm border rounded-lg text-left hover:bg-gray-50 transition-colors ${
                      formData.timeframe === timeframe
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-300'
                    }`}
                  >
                    {timeframe}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )
        
      case 2:
        return (
          <div className="space-y-6">
            <div>
              <Label>Service Types * (Select all that apply)</Label>
              <div className="space-y-2 mt-2">
                {SERVICE_TYPES.map((service) => (
                  <button
                    key={service}
                    type="button"
                    onClick={() => toggleArrayField('serviceTypes', service)}
                    className={`w-full p-3 text-sm border rounded-lg text-left hover:bg-gray-50 transition-colors ${
                      formData.serviceTypes.includes(service)
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-300'
                    }`}
                  >
                    {service}
                  </button>
                ))}
              </div>
            </div>
            

            
            <div>
              <Label>Preferred CFO Experience (Select all that apply)</Label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {[
                  'Startup Experience',
                  'Public Company Experience',
                  'Industry Expertise',
                  'Fundraising Experience',
                  'M&A Experience',
                  'International Experience',
                  'Technology Background',
                  'Board Experience'
                ].map((experience) => (
                  <button
                    key={experience}
                    type="button"
                    onClick={() => toggleArrayField('preferredExperience', experience)}
                    className={`p-3 text-sm border rounded-lg text-left hover:bg-gray-50 transition-colors ${
                      formData.preferredExperience.includes(experience)
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-300'
                    }`}
                  >
                    {experience}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <Label htmlFor="additionalRequirements">Additional Requirements</Label>
              <textarea
                id="additionalRequirements"
                value={formData.additionalRequirements}
                onChange={(e) => updateFormData('additionalRequirements', e.target.value)}
                placeholder="Any specific requirements, preferences, or additional information..."
                rows={4}
                className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
              />
            </div>
          </div>
        )
        
      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Review Your Request</h3>
              <p className="text-gray-600">Please review your information before submitting</p>
            </div>
            
            <div className="space-y-4">

              <Card className="p-4">
                <h4 className="font-semibold text-gray-900 mb-2">Financial Challenges</h4>
                <div className="space-y-1 text-sm text-gray-600">
                  <p><span className="font-medium">Primary Challenges:</span> {formData.primaryChallenges.join(', ')}</p>
                  <p><span className="font-medium">Urgency:</span> {formData.urgencyLevel}</p>
                  {formData.timeframe && <p><span className="font-medium">Timeframe:</span> {formData.timeframe}</p>}
                </div>
              </Card>
              
              <Card className="p-4">
                <h4 className="font-semibold text-gray-900 mb-2">Service Requirements</h4>
                <div className="space-y-1 text-sm text-gray-600">
                  <p><span className="font-medium">Service Types:</span> {formData.serviceTypes.join(', ')}</p>
                  {formData.preferredExperience.length > 0 && (
                    <p><span className="font-medium">Preferred Experience:</span> {formData.preferredExperience.join(', ')}</p>
                  )}
                  {formData.additionalRequirements && (
                    <p><span className="font-medium">Additional Requirements:</span> {formData.additionalRequirements}</p>
                  )}
                </div>
              </Card>
            </div>
          </div>
        )
        
      default:
        return null
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl" title="Find Your Perfect CFO">
      <div className="p-6">
        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-8">
          {STEPS.map((step, index) => {
            const Icon = step.icon
            const isActive = currentStep === step.id
            const isCompleted = currentStep > step.id
            
            return (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                  isCompleted
                    ? 'bg-green-500 border-green-500 text-white'
                    : isActive
                    ? 'bg-blue-500 border-blue-500 text-white'
                    : 'bg-white border-gray-300 text-gray-400'
                }`}>
                  {isCompleted ? (
                    <CheckCircleIcon className="h-5 w-5" />
                  ) : (
                    <Icon className="h-5 w-5" />
                  )}
                </div>
                <div className="ml-3">
                  <p className={`text-sm font-medium ${
                    isActive ? 'text-blue-600' : isCompleted ? 'text-green-600' : 'text-gray-500'
                  }`}>
                    {step.title}
                  </p>
                </div>
                {index < STEPS.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-4 ${
                    isCompleted ? 'bg-green-500' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            )
          })}
        </div>
        
        {/* Step Content */}
        <div className="min-h-[400px]">
          {renderStepContent()}
        </div>
        
        {/* Navigation */}
        <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
            className="flex items-center"
          >
            <ChevronLeftIcon className="h-4 w-4 mr-1" />
            Previous
          </Button>
          
          <div className="text-sm text-gray-500">
            Step {currentStep} of {STEPS.length}
          </div>
          
          {currentStep === STEPS.length ? (
            <Button
              onClick={handleSubmit}
              disabled={!isStepValid()}
              className="flex items-center"
            >
              Submit Request
              <CheckCircleIcon className="h-4 w-4 ml-1" />
            </Button>
          ) : (
            <Button
              onClick={nextStep}
              disabled={!isStepValid()}
              className="flex items-center"
            >
              Next
              <ChevronRightIcon className="h-4 w-4 ml-1" />
            </Button>
          )}
        </div>
      </div>
    </Modal>
  )
}

export default CFORequestWizard