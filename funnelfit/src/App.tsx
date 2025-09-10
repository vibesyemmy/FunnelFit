import React, { useState, useEffect } from 'react'
import SignInPage from './pages/sign-in'
import SignUpPage from './pages/sign-up'
import CreateAccountPage from './pages/create-account'
import EmailVerificationPage from './pages/email-verification'
import VerificationSuccessPage from './pages/verification-success'
import OnboardingPage from './pages/onboarding'
import OnboardingSuccessPage from './pages/onboarding-success'
import SmeDashboard from './pages/sme-dashboard'
import SmeMainDashboard from './pages/sme-main-dashboard'
import UploadCenter from './pages/upload-center'
import BankConnection from './pages/bank-connection'
import EnhancedUploadPage from './pages/enhanced-upload'
import CfoDashboard from './pages/cfo-dashboard'
import CfoClientManagement from './pages/cfo-client-management'
import CfoClientWorkspace from './pages/cfo-client-workspace'
import ProjectsTasks from './pages/projects-tasks'
import InvoiceTracking from './pages/invoice-tracking'
import CfoProfileManagement from './pages/cfo-profile-management'

type Page = 'sign-in' | 'sign-up' | 'create-account' | 'email-verification' | 'verification-success' | 'onboarding' | 'onboarding-success' | 'sme-dashboard' | 'sme-main-dashboard' | 'upload-center' | 'bank-connection' | 'enhanced-upload' | 'cfo-dashboard' | 'cfo-client-management' | 'cfo-client-workspace' | 'projects-tasks' | 'invoice-tracking' | 'cfo-profile-management' | 'messaging'

// Helper functions for persistent authentication
const getStoredAuthState = () => {
  try {
    const storedPage = localStorage.getItem('funnelfit_current_page') as Page | null
    const storedAccountType = localStorage.getItem('funnelfit_account_type') as 'sme' | 'cfo' | null
    const storedEmail = localStorage.getItem('funnelfit_user_email')
    
    return {
      currentPage: storedPage || 'sign-in',
      selectedAccountType: storedAccountType,
      userEmail: storedEmail || ''
    }
  } catch {
    return {
      currentPage: 'sign-in' as Page,
      selectedAccountType: null,
      userEmail: ''
    }
  }
}

const setStoredAuthState = (page: Page, accountType?: 'sme' | 'cfo' | null, email?: string) => {
  try {
    localStorage.setItem('funnelfit_current_page', page)
    if (accountType !== undefined) {
      if (accountType) {
        localStorage.setItem('funnelfit_account_type', accountType)
      } else {
        localStorage.removeItem('funnelfit_account_type')
      }
    }
    if (email !== undefined) {
      if (email) {
        localStorage.setItem('funnelfit_user_email', email)
      } else {
        localStorage.removeItem('funnelfit_user_email')
      }
    }
  } catch {
    // Ignore localStorage errors
  }
}

const clearStoredAuthState = () => {
  try {
    localStorage.removeItem('funnelfit_current_page')
    localStorage.removeItem('funnelfit_account_type')
    localStorage.removeItem('funnelfit_user_email')
  } catch {
    // Ignore localStorage errors
  }
}

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('sign-in')
  const [selectedAccountType, setSelectedAccountType] = useState<'sme' | 'cfo' | null>(null)
  const [userEmail, setUserEmail] = useState<string>('')
  
  // Load authentication state from localStorage on app start
  useEffect(() => {
    const storedState = getStoredAuthState()
    setCurrentPage(storedState.currentPage)
    setSelectedAccountType(storedState.selectedAccountType)
    setUserEmail(storedState.userEmail)
  }, [])

  const navigateTo = (page: Page, accountType?: 'sme' | 'cfo', email?: string) => {
    setCurrentPage(page)
    if (accountType) {
      setSelectedAccountType(accountType)
    }
    if (email) {
      setUserEmail(email)
    }
    
    // Persist authentication state to localStorage
    setStoredAuthState(page, accountType, email)
    
    // Clear stored state when signing out (going back to sign-in)
    if (page === 'sign-in') {
      clearStoredAuthState()
      setSelectedAccountType(null)
      setUserEmail('')
    }
  }

  if (currentPage === 'onboarding-success' && selectedAccountType && userEmail) {
    return <OnboardingSuccessPage onNavigate={navigateTo} accountType={selectedAccountType} email={userEmail} />
  }

                if (currentPage === 'bank-connection' && selectedAccountType && userEmail) {
                return <BankConnection onNavigate={navigateTo} accountType={selectedAccountType} email={userEmail} />
              }

              if (currentPage === 'upload-center' && selectedAccountType && userEmail) {
                return <UploadCenter onNavigate={navigateTo} accountType={selectedAccountType} email={userEmail} />
              }

              if (currentPage === 'sme-dashboard' && selectedAccountType && userEmail) {
                return <SmeDashboard onNavigate={navigateTo} accountType={selectedAccountType} email={userEmail} />
              }

              if (currentPage === 'enhanced-upload' && selectedAccountType && userEmail) {
                return <EnhancedUploadPage onNavigate={navigateTo} accountType={selectedAccountType} email={userEmail} />
              }

              if (currentPage === 'sme-main-dashboard' && selectedAccountType && userEmail) {
                return <SmeMainDashboard onNavigate={navigateTo} accountType={selectedAccountType} email={userEmail} />
              }

  if (currentPage === 'onboarding' && selectedAccountType && userEmail) {
    return <OnboardingPage onNavigate={navigateTo} accountType={selectedAccountType} email={userEmail} />
  }

  if (currentPage === 'verification-success' && selectedAccountType && userEmail) {
    return <VerificationSuccessPage onNavigate={navigateTo} accountType={selectedAccountType} email={userEmail} />
  }

  if (currentPage === 'email-verification' && selectedAccountType && userEmail) {
    return <EmailVerificationPage onNavigate={navigateTo} accountType={selectedAccountType} email={userEmail} />
  }

  if (currentPage === 'create-account' && selectedAccountType) {
    return <CreateAccountPage onNavigate={navigateTo} accountType={selectedAccountType} />
  }

  if (currentPage === 'sign-up') {
    return <SignUpPage onNavigate={navigateTo} />
  }

  if (currentPage === 'cfo-dashboard' && selectedAccountType && userEmail) {
    return <CfoDashboard onNavigate={navigateTo} accountType={selectedAccountType} email={userEmail} />
  }

  if (currentPage === 'cfo-client-management' && selectedAccountType && userEmail) {
    return <CfoClientManagement onNavigate={navigateTo} accountType={selectedAccountType} email={userEmail} />
  }

  if (currentPage === 'cfo-client-workspace' && selectedAccountType && userEmail) {
    return <CfoClientWorkspace onNavigate={navigateTo} accountType={selectedAccountType} email={userEmail} />
  }

  if (currentPage === 'projects-tasks' && selectedAccountType && userEmail) {
    return <ProjectsTasks onNavigate={navigateTo} accountType={selectedAccountType} email={userEmail} />
  }

  if (currentPage === 'invoice-tracking' && selectedAccountType && userEmail) {
    return <InvoiceTracking onNavigate={navigateTo} accountType={selectedAccountType} email={userEmail} />
  }

  if (currentPage === 'cfo-profile-management' && selectedAccountType && userEmail) {
    return <CfoProfileManagement onNavigate={navigateTo} accountType={selectedAccountType} email={userEmail} />
  }

  if (currentPage === 'messaging' && selectedAccountType && userEmail) {
    return <CfoDashboard onNavigate={navigateTo} accountType={selectedAccountType} email={userEmail} initialTab="messaging" />
  }

  return <SignInPage onNavigate={navigateTo} />
}

export default App
