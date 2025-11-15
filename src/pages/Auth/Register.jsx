import { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { Helmet } from 'react-helmet-async'
import { toast } from 'react-hot-toast'
import { useAuthStore } from '../../stores/authStore'
import { 
  UserIcon, 
  EnvelopeIcon, 
  LockClosedIcon, 
  EyeIcon, 
  EyeSlashIcon,
  CheckCircleIcon,
  CogIcon
} from '@heroicons/react/24/outline'

const Register = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [step, setStep] = useState(1)
  const { register: registerUser, isAuthenticated } = useAuthStore()
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm()

  const password = watch('password')
  const watchedFields = watch(['first_name', 'last_name', 'username', 'email'])
  const isStep1Complete = watchedFields.every(field => field && field.length > 0)

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }

  const onSubmit = async (data) => {
    setIsLoading(true)
    const result = await registerUser(data)
    
    if (result.success) {
      toast.success('Account created successfully! Welcome to the EDRS engineering platform.')
    } else {
      if (typeof result.error === 'object') {
        // Handle field-specific errors
        Object.entries(result.error).forEach(([field, messages]) => {
          if (Array.isArray(messages)) {
            messages.forEach(message => toast.error(`${field}: ${message}`))
          } else {
            toast.error(`${field}: ${messages}`)
          }
        })
      } else {
        toast.error(result.error)
      }
    }
    
    setIsLoading(false)
  }

  return (
    <>
      <Helmet>
        <title>Join EDRS | Engineering Document Management Platform</title>
        <meta name="description" content="Create your EDRS account and join the next generation of engineering documentation" />
      </Helmet>

      {/* Main Container with Gradient Background */}
      <div className="min-h-screen relative overflow-hidden">
        {/* Animated Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-indigo-600/10 animate-pulse"></div>
          
          {/* Floating Elements */}
          <div className="absolute top-20 left-20 w-32 h-32 bg-blue-300/20 rounded-full blur-xl animate-bounce"></div>
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-purple-300/20 rounded-full blur-xl animate-bounce delay-1000"></div>
          <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-indigo-300/20 rounded-full blur-xl animate-bounce delay-500"></div>
        </div>

        {/* Content Container */}
        <div className="relative z-10 flex min-h-screen">
          {/* Left Side - Branding & Features */}
          <div className="hidden lg:flex lg:w-1/2 flex-col justify-center items-center p-12 text-white relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 opacity-95"></div>
            
            <div className="relative z-10 max-w-md text-center space-y-8">
              {/* Logo */}
              <div className="space-y-4">
                <div className="w-16 h-16 mx-auto bg-white/20 backdrop-blur-lg rounded-2xl flex items-center justify-center">
                  <CogIcon className="h-8 w-8 text-white" />
                </div>
                <h1 className="text-4xl font-bold">EDRS</h1>
                <p className="text-blue-100 text-lg">Engineering Document & Resource System</p>
              </div>

              {/* Features List */}
              <div className="space-y-6 text-left">
                <div className="flex items-start space-x-4">
                  <CheckCircleIcon className="h-6 w-6 text-green-300 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold">Advanced Documentation</h3>
                    <p className="text-blue-100 text-sm">Streamlined document management with version control</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <CheckCircleIcon className="h-6 w-6 text-green-300 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold">Team Collaboration</h3>
                    <p className="text-blue-100 text-sm">Real-time collaboration tools for engineering teams</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <CheckCircleIcon className="h-6 w-6 text-green-300 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold">PID Analysis</h3>
                    <p className="text-blue-100 text-sm">Intelligent process and instrumentation diagram analysis</p>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 text-center pt-8 border-t border-white/20">
                <div>
                  <div className="text-2xl font-bold">500+</div>
                  <div className="text-blue-100 text-xs">Active Users</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">1k+</div>
                  <div className="text-blue-100 text-xs">Documents</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">99.9%</div>
                  <div className="text-blue-100 text-xs">Uptime</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Registration Form */}
          <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
            <div className="w-full max-w-md">
              {/* Mobile Logo */}
              <div className="lg:hidden text-center mb-8">
                <Link to="/" className="inline-flex items-center space-x-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                    <CogIcon className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-2xl font-bold gradient-text">EDRS</span>
                </Link>
              </div>

              {/* Form Container */}
              <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-8 hover-lift">
                {/* Header */}
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold gradient-text mb-2">
                    Create Account
                  </h2>
                  <p className="text-gray-600">
                    Join the future of engineering documentation
                  </p>
                </div>

                {/* Progress Indicator */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center space-x-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                      step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
                    }`}>
                      {step > 1 ? <CheckCircleIcon className="h-5 w-5" /> : '1'}
                    </div>
                    <div className={`w-16 h-0.5 transition-all duration-300 ${
                      step >= 2 ? 'bg-blue-600' : 'bg-gray-200'
                    }`}></div>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                      step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
                    }`}>
                      2
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">
                    Step {step} of 2
                  </div>
                </div>

                {/* Registration Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Step 1: Basic Information */}
                  {step === 1 && (
                    <div className="space-y-6 animate-slide-up">
                      {/* Name Fields */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-gray-700">
                            First Name
                          </label>
                          <div className="relative">
                            <UserIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                            <input
                              {...register('first_name', {
                                required: 'First name is required'
                              })}
                              type="text"
                              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50"
                              placeholder="John"
                            />
                          </div>
                          {errors.first_name && (
                            <p className="text-sm text-red-500">{errors.first_name.message}</p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-gray-700">
                            Last Name
                          </label>
                          <div className="relative">
                            <UserIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                            <input
                              {...register('last_name', {
                                required: 'Last name is required'
                              })}
                              type="text"
                              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50"
                              placeholder="Doe"
                            />
                          </div>
                          {errors.last_name && (
                            <p className="text-sm text-red-500">{errors.last_name.message}</p>
                          )}
                        </div>
                      </div>

                      {/* Username */}
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                          Username
                        </label>
                        <div className="relative">
                          <UserIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                          <input
                            {...register('username', {
                              required: 'Username is required',
                              minLength: {
                                value: 3,
                                message: 'Username must be at least 3 characters'
                              }
                            })}
                            type="text"
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50"
                            placeholder="johndoe"
                          />
                        </div>
                        {errors.username && (
                          <p className="text-sm text-red-500">{errors.username.message}</p>
                        )}
                      </div>

                      {/* Email */}
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                          Email Address
                        </label>
                        <div className="relative">
                          <EnvelopeIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                          <input
                            {...register('email', {
                              required: 'Email is required',
                              pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: 'Invalid email address'
                              }
                            })}
                            type="email"
                            autoComplete="email"
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50"
                            placeholder="john.doe@company.com"
                          />
                        </div>
                        {errors.email && (
                          <p className="text-sm text-red-500">{errors.email.message}</p>
                        )}
                      </div>

                      {/* Next Button */}
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        disabled={!isStep1Complete}
                        className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-200 ${
                          isStep1Complete
                            ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        Continue to Security Setup
                      </button>
                    </div>
                  )}

                  {/* Step 2: Password Setup */}
                  {step === 2 && (
                    <div className="space-y-6 animate-slide-up">
                      {/* Password */}
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                          Password
                        </label>
                        <div className="relative">
                          <LockClosedIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                          <input
                            {...register('password', {
                              required: 'Password is required',
                              minLength: {
                                value: 8,
                                message: 'Password must be at least 8 characters'
                              }
                            })}
                            type={showPassword ? 'text' : 'password'}
                            autoComplete="new-password"
                            className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50"
                            placeholder="Create a strong password"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                          >
                            {showPassword ? (
                              <EyeSlashIcon className="h-5 w-5" />
                            ) : (
                              <EyeIcon className="h-5 w-5" />
                            )}
                          </button>
                        </div>
                        {errors.password && (
                          <p className="text-sm text-red-500">{errors.password.message}</p>
                        )}
                      </div>

                      {/* Confirm Password */}
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                          Confirm Password
                        </label>
                        <div className="relative">
                          <LockClosedIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                          <input
                            {...register('password_confirm', {
                              required: 'Please confirm your password',
                              validate: value => value === password || 'Passwords do not match'
                            })}
                            type={showConfirmPassword ? 'text' : 'password'}
                            autoComplete="new-password"
                            className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50"
                            placeholder="Confirm your password"
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                          >
                            {showConfirmPassword ? (
                              <EyeSlashIcon className="h-5 w-5" />
                            ) : (
                              <EyeIcon className="h-5 w-5" />
                            )}
                          </button>
                        </div>
                        {errors.password_confirm && (
                          <p className="text-sm text-red-500">{errors.password_confirm.message}</p>
                        )}
                      </div>

                      {/* Terms and Privacy */}
                      <div className="text-sm text-gray-600 bg-gray-50/50 rounded-lg p-4">
                        By creating an account, you agree to our{' '}
                        <Link to="/terms-of-service" className="text-blue-600 hover:underline">
                          Terms of Service
                        </Link>{' '}
                        and{' '}
                        <Link to="/privacy-policy" className="text-blue-600 hover:underline">
                          Privacy Policy
                        </Link>
                        .
                      </div>

                      {/* Action Buttons */}
                      <div className="flex space-x-4">
                        <button
                          type="button"
                          onClick={() => setStep(1)}
                          className="flex-1 py-3 px-6 border border-gray-300 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 transition-all duration-200"
                        >
                          Back
                        </button>
                        <button
                          type="submit"
                          disabled={isLoading}
                          className="flex-1 py-3 px-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                        >
                          {isLoading ? (
                            <div className="flex items-center justify-center space-x-2">
                              <div className="loading-spinner" />
                              <span>Creating Account...</span>
                            </div>
                          ) : (
                            'Create Account'
                          )}
                        </button>
                      </div>
                    </div>
                  )}
                </form>

                {/* Login Link */}
                <div className="mt-8 text-center">
                  <p className="text-gray-600">
                    Already have an account?{' '}
                    <Link 
                      to="/login" 
                      className="font-medium text-blue-600 hover:text-blue-500 transition-colors duration-200"
                    >
                      Sign in here
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Register