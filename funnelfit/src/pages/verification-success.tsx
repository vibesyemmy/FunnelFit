import React from 'react'
import { Button } from '../components/ui'
import { CheckCircleIcon, ArrowRightIcon } from 'lucide-react'

interface VerificationSuccessPageProps {
  onNavigate: (page: 'sign-in' | 'sign-up' | 'create-account' | 'email-verification' | 'verification-success' | 'onboarding', accountType?: 'sme' | 'cfo', email?: string) => void
  accountType: 'sme' | 'cfo'
  email: string
}

const VerificationSuccessPage: React.FC<VerificationSuccessPageProps> = ({ 
  onNavigate, 
  accountType, 
  email 
}) => {
  const handleBeginOnboarding = () => {
    onNavigate('onboarding', accountType, email)
  }

  const getAccountTypeLabel = () => {
    return accountType === 'sme' ? 'Small & Medium Business' : 'Fractional CFO'
  }

  const getWelcomeMessage = () => {
    return accountType === 'sme' 
      ? "Welcome to FunnelFit! Your email has been verified and your account is ready."
      : "Welcome to FunnelFit! Your email has been verified and your CFO profile is ready."
  }

  const getOnboardingMessage = () => {
    return accountType === 'sme'
      ? "Let's set up your business profile to help us match you with the perfect fractional CFO."
      : "Let's set up your CFO profile to help us match you with the right businesses."
  }

  return (
    <div className="min-h-screen bg-gray-25 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">


        {/* Success Content */}
        <div className="text-center space-y-6">
          {/* Success Icon */}
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center">
              <CheckCircleIcon className="h-8 w-8 text-success-600" />
            </div>
          </div>

          {/* Header */}
          <div className="space-y-2">
            <h1 className="text-2xl font-semibold text-gray-900">
              Email verified successfully!
            </h1>
            <p className="text-gray-600">
              {getWelcomeMessage()}
            </p>
          </div>

          {/* Account Type Badge */}
          <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800">
            {getAccountTypeLabel()}
          </div>

          {/* Onboarding Message */}
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-700">
              {getOnboardingMessage()}
            </p>
          </div>

          {/* Begin Onboarding Button */}
          <div className="space-y-4">
            <Button 
              onClick={handleBeginOnboarding}
              className="w-full"
              size="lg"
            >
              Begin onboarding
              <ArrowRightIcon className="h-4 w-4 ml-2" />
            </Button>

            {/* Skip for now link */}
            <p className="text-sm text-gray-600">
              Want to complete this later?{' '}
              <button 
                onClick={() => onNavigate('sign-in')}
                className="font-semibold text-primary-600 hover:text-primary-500"
              >
                Skip for now
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VerificationSuccessPage
