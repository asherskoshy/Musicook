import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Music, Eye, EyeOff, Check, X } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';

interface SignupFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Signup: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const { signup, loginWithGoogle, isLoggedIn, isLoading: authLoading, user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  // Redirect authenticated users to dashboard (only if email is verified)
  useEffect(() => {
    if (!authLoading && isLoggedIn) {
      // Check if user is logged in and email is verified
      if (user && user.emailVerified) {
        navigate('/dashboard', { replace: true });
      } else if (user && !user.emailVerified) {
        // If user is logged in but email is not verified, redirect to email verification page
        navigate('/email-verification', { replace: true });
      }
    }
  }, [isLoggedIn, authLoading, navigate, user]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setError,
    clearErrors
  } = useForm<SignupFormData>({
    mode: 'onChange'
  });

  const watchedPassword = watch('password');

  const passwordRequirements = [
    { regex: /.{6,}/, text: 'At least 6 characters' },
    { regex: /[A-Z]/, text: 'One uppercase letter' },
    { regex: /[a-z]/, text: 'One lowercase letter' },
    { regex: /[0-9]/, text: 'One number' },
  ];

  const onSubmit = async (data: SignupFormData) => {
    setIsLoading(true);
    
    try {
      const result = await signup(data.name, data.email, data.password);
      
      if (result.success) {
        toast({
          title: "Account Created Successfully!",
          description: "Please verify your email before logging in. Check your inbox for a verification link.",
        });
        navigate('/login');
      } else {
        toast({
          title: "Signup Failed",
          description: result.error || "An error occurred during signup",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setIsGoogleLoading(true);
    
    try {
      const result = await loginWithGoogle();
      
      if (result.success) {
        toast({
          title: "Welcome to Musicook!",
          description: "You have been successfully signed up with Google.",
        });
        navigate('/dashboard');
      } else {
        toast({
          title: "Google Sign-in Failed",
          description: result.error || "Failed to sign in with Google",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-background px-4 py-8">
        <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center space-x-2 mb-8">
          <div className="gradient-primary p-3 rounded-lg">
            <Music className="h-8 w-8 text-white" />
          </div>
          <span className="font-outfit font-bold text-2xl gradient-primary bg-clip-text text-transparent">
            Musicook
          </span>
        </div>

        <Card className="bg-card/50 border-border/50 shadow-card">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-outfit font-bold">Create Account</CardTitle>
            <CardDescription>
              Join thousands of creators making amazing music
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  className={`bg-muted/50 ${errors.name ? 'border-red-500' : ''}`}
                  {...register('name', {
                    required: "Name is required"
                  })}
                />
                {errors.name && (
                  <p className="text-sm text-red-500">{errors.name.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className={`bg-muted/50 ${errors.email ? 'border-red-500' : ''}`}
                  {...register('email', {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Please enter a valid email address"
                    },
                    validate: {
                      notSimplePattern: (value) => {
                        const simplePatterns = [
                          /^\d+@\d+\.\w+$/, // 1@1.com, etc.
                          /^[a-z]@[a-z]\.\w+$/i, // a@a.com, etc.
                          /^test@test\.\w+$/i,
                          /^admin@admin\.\w+$/i,
                          /^user@user\.\w+$/i,
                          /^demo@demo\.\w+$/i,
                          /^example@example\.\w+$/i,
                        ];
                        for (const pattern of simplePatterns) {
                          if (pattern.test(value)) {
                            return "Please enter a real email address, not a test pattern";
                          }
                        }

                        const localPart = value.split('@')[0];
                        if (localPart && localPart.length < 2) {
                          return "Email local part must be at least 2 characters";
                        }

                        const domainPart = value.split('@')[1]?.split('.')[0];
                        if (domainPart && domainPart.length < 2) {
                          return "Email domain must be at least 2 characters";
                        }

                        return true;
                      }
                    }
                  })}
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    className={`bg-muted/50 pr-10 ${errors.password ? 'border-red-500' : ''}`}
                    {...register('password', {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters"
                      }
                    })}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-sm text-red-500">{errors.password.message}</p>
                )}
                
                {/* Password Requirements */}
                {watchedPassword && (
                  <div className="mt-2 space-y-1">
                    {passwordRequirements.map((req, index) => (
                      <div key={index} className="flex items-center space-x-2 text-xs">
                        {req.regex.test(watchedPassword) ? (
                          <Check className="h-3 w-3 text-green-500" />
                        ) : (
                          <X className="h-3 w-3 text-red-500" />
                        )}
                        <span className={req.regex.test(watchedPassword) ? 'text-green-500' : 'text-muted-foreground'}>
                          {req.text}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    className={`bg-muted/50 pr-10 ${errors.confirmPassword ? 'border-red-500' : ''}`}
                    {...register('confirmPassword', {
                      required: "Please confirm your password",
                      validate: (value) => {
                        if (value !== watchedPassword) {
                          return "Passwords do not match";
                        }
                        return true;
                      }
                    })}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>
                )}
              </div>

              <Button 
                type="submit" 
                className="w-full gradient-primary"
                disabled={isLoading}
              >
                {isLoading ? "Creating Account..." : "Create Account"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Already have an account?{' '}
                <Link to="/login" className="text-primary hover:underline font-medium">
                  Sign in
                </Link>
              </p>
            </div>

            {/* Social Signup */}
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
                </div>
              </div>

              <div className="mt-6 flex justify-center">
                <Button 
                  variant="outline" 
                  className="w-full max-w-xs"
                  onClick={handleGoogleSignup}
                  disabled={isGoogleLoading}
                >
                  {isGoogleLoading ? (
                    "Signing up..."
                  ) : (
                    <>
                      <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                      Google
                    </>
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
    </>
  );
};

export default Signup;