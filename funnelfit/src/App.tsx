import React, { useState } from 'react'
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

type Page = 'sign-in' | 'sign-up' | 'create-account' | 'email-verification' | 'verification-success' | 'onboarding' | 'onboarding-success' | 'sme-dashboard' | 'sme-main-dashboard' | 'upload-center' | 'bank-connection' | 'enhanced-upload' | 'cfo-dashboard'

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('sign-in')
  const [selectedAccountType, setSelectedAccountType] = useState<'sme' | 'cfo' | null>(null)
  const [userEmail, setUserEmail] = useState<string>('')

  const navigateTo = (page: Page, accountType?: 'sme' | 'cfo', email?: string) => {
    setCurrentPage(page)
    if (accountType) {
      setSelectedAccountType(accountType)
    }
    if (email) {
      setUserEmail(email)
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

  return <SignInPage onNavigate={navigateTo} />
}

export default App
