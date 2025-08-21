import React, { useState } from 'react'
import { Button, Input, Card, CardContent } from '../components/ui'
import { EyeIcon, EyeOffIcon, MailIcon, LockIcon, PhoneIcon, ArrowLeftIcon } from 'lucide-react'

interface CreateAccountPageProps {
  onNavigate: (page: 'sign-in' | 'sign-up' | 'create-account' | 'email-verification' | 'verification-success' | 'onboarding', accountType?: 'sme' | 'cfo', email?: string) => void
  accountType: 'sme' | 'cfo'
}

const CreateAccountPage: React.FC<CreateAccountPageProps> = ({ onNavigate, accountType }) => {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  })
  const [errors, setErrors] = useState<{ 
    email?: string; 
    phone?: string; 
    password?: string; 
    confirmPassword?: string 
  }>({})

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  const validateForm = () => {
    const newErrors: { 
      email?: string; 
      phone?: string; 
      password?: string; 
      confirmPassword?: string 
    } = {}

    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!formData.phone) {
      newErrors.phone = 'Phone number is required'
    } else if (!/^[\+]?[1-9][\d]{0,15}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number'
    }

    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters'
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password'
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      // Handle account creation logic here
      console.log('Creating account:', { ...formData, accountType })
      // Navigate to email verification
      onNavigate('email-verification', accountType, formData.email)
    }
  }

  const getAccountTypeLabel = () => {
    return accountType === 'sme' ? 'Small & Medium Business' : 'Fractional CFO'
  }

  return (
    <div className="min-h-screen bg-gray-25 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* Back Button */}
        <div className="mb-6">
          <Button 
            variant="ghost" 
            className="text-gray-600 hover:text-gray-900"
            onClick={() => onNavigate('sign-up')}
          >
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            Back
          </Button>
        </div>

        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="w-48 h-12">
            <svg className="w-full h-full" viewBox="0 0 119 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M114.41 9.13419C114.41 9.41033 114.634 9.63419 114.91 9.63419H116.989C117.265 9.63419 117.489 9.85805 117.489 10.1342V12.4773C117.489 12.7535 117.265 12.9773 116.989 12.9773H114.91C114.634 12.9773 114.41 13.2012 114.41 13.4773V20.7495C114.41 21.1604 114.475 21.4811 114.603 21.711C114.731 21.9335 114.908 22.0897 115.135 22.1802C115.369 22.2707 115.639 22.3162 115.945 22.3162C116.158 22.3162 116.371 22.2994 116.584 22.2645C116.589 22.2637 116.593 22.2628 116.597 22.2619C116.863 22.21 117.12 22.3809 117.177 22.6452L117.691 25.0334C117.746 25.2872 117.597 25.5402 117.345 25.6027C117.193 25.6404 117.021 25.6803 116.829 25.7225C116.418 25.82 115.917 25.8788 115.327 25.8997C114.234 25.9415 113.274 25.799 112.45 25.4717C111.634 25.1443 110.998 24.6356 110.543 23.9461C110.089 23.2566 109.865 22.3861 109.872 21.3346V13.4773C109.872 13.2012 109.648 12.9773 109.372 12.9773H108.35C108.074 12.9773 107.85 13.2012 107.85 13.4773V25.1805C107.85 25.4566 107.626 25.6805 107.35 25.6805H103.812C103.536 25.6805 103.312 25.4566 103.312 25.1805V10.1342C103.312 9.85805 103.536 9.63419 103.812 9.63419H109.372C109.648 9.63419 109.872 9.41033 109.872 9.13419V6.28923C109.872 6.01309 110.096 5.78923 110.372 5.78923H113.91C114.186 5.78923 114.41 6.01309 114.41 6.28923V9.13419Z" fill="black"/>
              <path d="M102.695 7.74116C102.695 8.0173 102.471 8.24116 102.195 8.24116H93.3618C93.0857 8.24116 92.8618 8.46502 92.8618 8.74116V12.8386C92.8618 13.1148 93.0857 13.3386 93.3618 13.3386H101.236C101.512 13.3386 101.736 13.5625 101.736 13.8386V16.5687C101.736 16.8449 101.512 17.0687 101.236 17.0687H93.3618C93.0857 17.0687 92.8618 17.2926 92.8618 17.5687V25.4068C92.8618 25.683 92.638 25.9068 92.3618 25.9068H88.7485C88.4724 25.9068 88.2485 25.683 88.2485 25.4068V5.01115C88.2485 4.735 88.4724 4.51115 88.7485 4.51115H102.195C102.471 4.51115 102.695 4.735 102.695 5.01115V7.74116Z" fill="black"/>
              <path d="M105.592 4.70691C106.267 4.70698 106.842 4.92963 107.318 5.37524C107.8 5.81388 108.042 6.33955 108.042 6.95222C108.042 7.57189 107.8 8.10464 107.318 8.55027C106.842 8.98891 106.267 9.20896 105.592 9.20903C104.918 9.20903 104.339 8.98892 103.856 8.55027C103.38 8.10461 103.142 7.57198 103.142 6.95222C103.142 6.33954 103.38 5.81388 103.856 5.37524C104.339 4.92973 104.918 4.70691 105.592 4.70691Z" fill="#E3B018"/>
              <path fillRule="evenodd" clipRule="evenodd" d="M73.4019 9.33768C74.4813 9.33768 75.4862 9.5088 76.4165 9.85006C77.354 10.1844 78.1707 10.6895 78.8667 11.365C79.5698 12.0406 80.1167 12.8905 80.5073 13.9143C80.8979 14.9311 81.0933 16.1222 81.0933 17.4873V18.2091C81.0933 18.4853 80.8694 18.7091 80.5933 18.7091H69.9603C69.9544 18.7091 69.9497 18.7139 69.9497 18.7197C69.9497 19.5136 70.0987 20.1997 70.397 20.7777C70.7023 21.3556 71.1322 21.8011 71.6861 22.1145C72.2399 22.4279 72.8969 22.5847 73.6568 22.5848C74.1609 22.5848 74.6235 22.5152 75.0424 22.376C75.4613 22.2367 75.8195 22.0273 76.1177 21.7488C76.33 21.5504 76.5068 21.3203 76.6474 21.0585C76.7507 20.866 76.9486 20.7346 77.1665 20.7487L80.419 20.9595C80.7237 20.9793 80.9414 21.2662 80.8486 21.5572C80.6069 22.3154 80.2195 22.9921 79.687 23.5874C79.0336 24.3187 78.1887 24.8907 77.1519 25.3016C76.122 25.7055 74.932 25.9068 73.5825 25.9068C71.8993 25.9068 70.4503 25.5727 69.2359 24.9041C68.0286 24.2286 67.0982 23.2744 66.4448 22.0418C65.7914 20.8021 65.4644 19.3357 65.4644 17.6433C65.4644 15.9928 65.7915 14.5442 66.4448 13.2975C67.0982 12.0509 68.0176 11.079 69.2036 10.3824C70.3968 9.686 71.7968 9.33768 73.4019 9.33768ZM73.4761 12.6607C72.7874 12.6607 72.1766 12.8167 71.6441 13.13C71.1185 13.4364 70.706 13.8516 70.4077 14.3739C70.2178 14.7022 70.0876 15.0545 70.0162 15.4308C69.963 15.7112 70.1944 15.9511 70.4798 15.9511H76.3208C76.5969 15.9511 76.8249 15.7263 76.7903 15.4523C76.7347 15.0118 76.603 14.6105 76.395 14.2485C76.1109 13.754 75.7167 13.3674 75.2124 13.0888C74.7153 12.8032 74.1366 12.6607 73.4761 12.6607Z" fill="black"/>
              <path d="M86.1929 25.4068C86.1929 25.683 85.969 25.9068 85.6929 25.9068H82.1548C81.8786 25.9068 81.6548 25.683 81.6548 25.4068V5.01115C81.6548 4.735 81.8786 4.51115 82.1548 4.51115H85.6929C85.969 4.51115 86.1929 4.735 86.1929 5.01115V25.4068Z" fill="black"/>
              <path d="M14.8643 7.74116C14.8643 8.0173 14.6404 8.24116 14.3643 8.24116H5.53125C5.25511 8.24116 5.03125 8.46502 5.03125 8.74116V12.8386C5.03125 13.1148 5.25511 13.3386 5.53125 13.3386H13.4053C13.6814 13.3386 13.9053 13.5625 13.9053 13.8386V16.5687C13.9053 16.8449 13.6814 17.0687 13.4053 17.0687H5.53125C5.25511 17.0687 5.03125 17.2926 5.03125 17.5687V25.4068C5.03125 25.683 4.80739 25.9068 4.53125 25.9068H0.917968C0.641826 25.9068 0.417969 25.683 0.417969 25.4068V5.01115C0.417969 4.735 0.641826 4.51115 0.917968 4.51115H14.3643C14.6404 4.51115 14.8643 4.735 14.8643 5.01115V7.74116Z" fill="black"/>
              <path d="M31.0416 9.62609C31.3178 9.62609 31.5416 9.84995 31.5416 10.1261V17.9064C31.5416 22.3246 27.9051 25.9062 23.4869 25.9064C19.0687 25.9064 15.4313 22.3246 15.4313 17.9064V10.1261C15.4313 9.84999 15.6552 9.62616 15.9313 9.62609H17.5837C17.753 9.62609 17.9107 9.71172 18.003 9.85365L21.6949 15.5353V21.4239C21.6949 21.8298 22.153 22.0666 22.484 21.8321L25.068 19.9982C25.1999 19.9044 25.2789 19.7528 25.2789 19.5909V15.5402L28.9709 9.85381C29.0631 9.71179 29.221 9.62609 29.3903 9.62609H31.0416Z" fill="#E3B018"/>
              <path d="M40.1648 9.62609C44.583 9.62616 48.2195 13.2079 48.2195 17.6261V25.4064C48.2195 25.6823 47.9964 25.9061 47.7205 25.9064H44.1755C43.8994 25.9064 43.6755 25.6825 43.6755 25.4064V17.6818C43.6755 15.7429 42.1036 14.1711 40.1648 14.171C38.2259 14.171 36.6541 15.7429 36.6541 17.6818V25.4064C36.6541 25.6825 36.4302 25.9064 36.1541 25.9064H32.6091C32.3331 25.9062 32.1091 25.6824 32.1091 25.4064V17.6261C32.1091 13.2078 35.7465 9.62609 40.1648 9.62609Z" fill="black"/>
              <path d="M56.8424 9.62609C61.2606 9.62616 64.8971 13.2079 64.8971 17.6261V25.4064C64.8971 25.6823 64.674 25.9061 64.3981 25.9064H60.8531C60.577 25.9064 60.3531 25.6825 60.3531 25.4064V17.6818C60.3531 15.7429 58.7812 14.1711 56.8424 14.171C54.9035 14.171 53.3317 15.7429 53.3317 17.6818V25.4064C53.3317 25.6825 53.1078 25.9064 52.8317 25.9064H49.2867C49.0107 25.9062 48.7867 25.6824 48.7867 25.4064V17.6261C48.7867 13.2078 52.4241 9.62609 56.8424 9.62609Z" fill="black"/>
            </svg>
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">
            Create your account
          </h1>
          <p className="text-gray-600">
            {getAccountTypeLabel()} • Set up your account details
          </p>
        </div>

        {/* Account Creation Form */}
        <div className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MailIcon className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`pl-10 ${errors.email ? 'border-error-500 focus:border-error-500 focus:ring-error-500' : ''}`}
                />
              </div>
              {errors.email && (
                <p className="text-sm text-error-600 mt-1">{errors.email}</p>
              )}
            </div>

            {/* Phone Field */}
            <div className="space-y-2">
              <label htmlFor="phone" className="text-sm font-medium text-gray-700">
                Phone number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <PhoneIcon className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className={`pl-10 ${errors.phone ? 'border-error-500 focus:border-error-500 focus:ring-error-500' : ''}`}
                />
              </div>
              {errors.phone && (
                <p className="text-sm text-error-600 mt-1">{errors.phone}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LockIcon className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className={`pl-10 pr-10 ${errors.password ? 'border-error-500 focus:border-error-500 focus:ring-error-500' : ''}`}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOffIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <EyeIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-error-600 mt-1">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                Confirm password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LockIcon className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  className={`pl-10 ${errors.confirmPassword ? 'border-error-500 focus:border-error-500 focus:ring-error-500' : ''}`}
                />
              </div>
              {errors.confirmPassword && (
                <p className="text-sm text-error-600 mt-1">{errors.confirmPassword}</p>
              )}
            </div>

            {/* Create Account Button */}
            <Button type="submit" className="w-full" size="lg">
              Create account
            </Button>
          </form>

          {/* Sign In Link */}
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <button 
                onClick={() => onNavigate('sign-in')}
                className="font-semibold text-primary-600 hover:text-primary-500"
              >
                Sign in
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateAccountPage
