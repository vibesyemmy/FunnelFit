import React from 'react'
import { Button } from '../components/ui'
import { CheckCircleIcon, ArrowRightIcon, HomeIcon } from 'lucide-react'

interface OnboardingSuccessPageProps {
  onNavigate: (page: 'sign-in' | 'sign-up' | 'create-account' | 'email-verification' | 'verification-success' | 'onboarding' | 'onboarding-success', accountType?: 'sme' | 'cfo', email?: string) => void
  accountType: 'sme' | 'cfo'
  email: string
}

const OnboardingSuccessPage: React.FC<OnboardingSuccessPageProps> = ({ 
  onNavigate, 
  accountType, 
  email 
}) => {
  const handleGoToDashboard = () => {
    // Navigate to the appropriate dashboard based on account type
    if (accountType === 'sme') {
      onNavigate('sme-dashboard', accountType, email)
    } else {
      // For CFO users, we'll implement their dashboard later
      console.log('CFO dashboard coming soon...')
      onNavigate('sign-in')
    }
  }

  const getAccountTypeLabel = () => {
    return accountType === 'sme' ? 'Small & Medium Business' : 'Fractional CFO'
  }

  const getSuccessMessage = () => {
    return accountType === 'sme' 
      ? "Your onboarding is complete! We're now analyzing your requirements to match you with the perfect fractional CFO."
      : "Your onboarding is complete! We're now analyzing your profile to match you with the right businesses."
  }

  const getNextStepsMessage = () => {
    return accountType === 'sme'
      ? "Our team will review your information and reach out within 24-48 hours to discuss your CFO match and next steps."
      : "Our team will review your profile and reach out within 24-48 hours to discuss potential business matches and next steps."
  }

  return (
    <div className="min-h-screen bg-gray-25 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* Success Content */}
        <div className="text-center space-y-8">
          {/* Success Icon */}
          <div className="flex justify-center">
            <div className="w-20 h-20 bg-success-100 rounded-full flex items-center justify-center">
              <CheckCircleIcon className="h-10 w-10 text-success-600" />
            </div>
          </div>

          {/* Header */}
          <div className="space-y-3">
            <h1 className="text-3xl font-bold text-gray-900">
              Onboarding Complete!
            </h1>
            <p className="text-lg text-gray-600">
              {getSuccessMessage()}
            </p>
          </div>

          {/* Account Type Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-primary-100 text-primary-800">
            {getAccountTypeLabel()}
          </div>

          {/* Next Steps */}
          <div className="bg-gray-50 rounded-lg p-6 space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">
              What happens next?
            </h3>
            <p className="text-sm text-gray-700">
              {getNextStepsMessage()}
            </p>
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
              <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
              <span>You'll receive a confirmation email shortly</span>
            </div>
          </div>

          {/* Action Button */}
          <div className="space-y-4">
            <Button 
              onClick={handleGoToDashboard}
              className="w-full"
              size="lg"
            >
              Go to Dashboard
              <ArrowRightIcon className="h-4 w-4 ml-2" />
            </Button>
          </div>

          {/* Contact Info */}
          <div className="pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Questions? Contact us at{' '}
              <a href="mailto:help@funnelfit.com" className="font-semibold text-primary-600 hover:text-primary-500">
                help@funnelfit.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OnboardingSuccessPage
