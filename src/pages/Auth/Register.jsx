import { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { Helmet } from 'react-helmet-async'
import { toast } from 'react-hot-toast'
import { useAuthStore } from '../../stores/authStore'

const Register = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { register: registerUser, isAuthenticated } = useAuthStore()
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm()

  const password = watch('password')

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }

  const onSubmit = async (data) => {
    setIsLoading(true)
    const result = await registerUser(data)
    
    if (result.success) {
      toast.success('Account created successfully! Welcome to EDRS!')
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
        <title>Sign Up - EDRS</title>
      </Helmet>

      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="text-center">
            <Link to="/" className="text-3xl font-bold text-primary-600">
              EDRS
            </Link>
          </div>
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500">
              sign in to your existing account
            </Link>
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="first_name" className="form-label">
                    First name
                  </label>
                  <input
                    {...register('first_name', {
                      required: 'First name is required'
                    })}
                    type="text"
                    className="form-input"
                    placeholder="First name"
                  />
                  {errors.first_name && (
                    <p className="form-error">{errors.first_name.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="last_name" className="form-label">
                    Last name
                  </label>
                  <input
                    {...register('last_name', {
                      required: 'Last name is required'
                    })}
                    type="text"
                    className="form-input"
                    placeholder="Last name"
                  />
                  {errors.last_name && (
                    <p className="form-error">{errors.last_name.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="username" className="form-label">
                  Username
                </label>
                <input
                  {...register('username', {
                    required: 'Username is required',
                    minLength: {
                      value: 3,
                      message: 'Username must be at least 3 characters'
                    }
                  })}
                  type="text"
                  className="form-input"
                  placeholder="Choose a username"
                />
                {errors.username && (
                  <p className="form-error">{errors.username.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="form-label">
                  Email address
                </label>
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
                  className="form-input"
                  placeholder="Enter your email"
                />
                {errors.email && (
                  <p className="form-error">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  {...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 8,
                      message: 'Password must be at least 8 characters'
                    }
                  })}
                  type="password"
                  autoComplete="new-password"
                  className="form-input"
                  placeholder="Create a password"
                />
                {errors.password && (
                  <p className="form-error">{errors.password.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="password_confirm" className="form-label">
                  Confirm password
                </label>
                <input
                  {...register('password_confirm', {
                    required: 'Please confirm your password',
                    validate: value => value === password || 'Passwords do not match'
                  })}
                  type="password"
                  autoComplete="new-password"
                  className="form-input"
                  placeholder="Confirm your password"
                />
                {errors.password_confirm && (
                  <p className="form-error">{errors.password_confirm.message}</p>
                )}
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn btn-primary w-full"
                >
                  {isLoading ? (
                    <>
                      <div className="loading-spinner mr-2" />
                      Creating account...
                    </>
                  ) : (
                    'Create account'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Register