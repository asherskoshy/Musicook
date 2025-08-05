import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Music, Mail, CheckCircle, RefreshCw } from 'lucide-react';

const EmailVerification: React.FC = () => {
  const [isResending, setIsResending] = useState(false);
  const { user, sendVerificationEmail } = useAuth();
  const { toast } = useToast();

  const handleResendVerification = async () => {
    setIsResending(true);
    
    try {
      const result = await sendVerificationEmail();
      
      if (result.success) {
        toast({
          title: "Verification Email Sent",
          description: "A new verification email has been sent to your inbox.",
        });
      } else {
        toast({
          title: "Failed to Send Email",
          description: result.error || "Failed to send verification email",
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
      setIsResending(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
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
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-full">
                <Mail className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <CardTitle className="text-2xl font-outfit font-bold">Verify Your Email</CardTitle>
            <CardDescription>
              We've sent a verification email to your email address
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <p className="text-blue-800 dark:text-blue-200 text-sm">
                Please check your email at <strong>{user?.email}</strong> and click the verification link to activate your account.
              </p>
            </div>
            
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Didn't receive the email? Check your spam folder or try resending.
              </p>
              
              <Button 
                variant="outline" 
                onClick={handleResendVerification}
                disabled={isResending}
                className="w-full"
              >
                {isResending ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Mail className="h-4 w-4 mr-2" />
                    Resend Verification Email
                  </>
                )}
              </Button>
            </div>

            <div className="pt-4 space-y-2">
              <Link to="/login" className="text-sm text-primary hover:underline font-medium block">
                Back to Sign In
              </Link>
              <p className="text-xs text-muted-foreground">
                Once verified, you can sign in to your account
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EmailVerification; 