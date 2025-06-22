
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { ArrowLeft, Shield } from "lucide-react";

interface OTPVerificationProps {
  email: string;
  onVerified: () => void;
  onBack: () => void;
  userType: 'customer' | 'vendor';
}

const OTPVerification = ({ email, onVerified, onBack, userType }: OTPVerificationProps) => {
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);

  const handleVerify = () => {
    if (otp.length !== 6) {
      toast({
        title: "Invalid OTP",
        description: "Please enter a 6-digit OTP",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate OTP verification
    setTimeout(() => {
      console.log(`OTP verified for ${userType}:`, { email, otp });
      toast({
        title: "Verification Successful",
        description: `Welcome! You have been logged in as ${userType}.`,
      });
      onVerified();
      setIsLoading(false);
    }, 1500);
  };

  const handleResendOTP = () => {
    setResendLoading(true);
    
    // Simulate resending OTP
    setTimeout(() => {
      toast({
        title: "OTP Sent",
        description: "A new OTP has been sent to your email.",
      });
      setResendLoading(false);
    }, 1000);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center">
        <Shield className="h-16 w-16 text-gold-400 mx-auto mb-4 animate-pulse" />
        <h3 className="text-xl font-cinzel metallic-gold mb-2">Verify Your Identity</h3>
        <p className="text-sm metallic-gold-subtle font-cormorant">
          We've sent a 6-digit code to
        </p>
        <p className="text-sm font-semibold metallic-gold font-cormorant">{email}</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label className="text-sm font-medium metallic-gold-subtle font-cormorant">
            Enter OTP
          </Label>
          <div className="flex justify-center">
            <InputOTP maxLength={6} value={otp} onChange={setOtp}>
              <InputOTPGroup>
                <InputOTPSlot 
                  index={0} 
                  className="bg-maroon-700 border-gold-500 text-gold-200 focus:border-gold-400 w-12 h-12 text-lg font-bold"
                />
                <InputOTPSlot 
                  index={1} 
                  className="bg-maroon-700 border-gold-500 text-gold-200 focus:border-gold-400 w-12 h-12 text-lg font-bold"
                />
                <InputOTPSlot 
                  index={2} 
                  className="bg-maroon-700 border-gold-500 text-gold-200 focus:border-gold-400 w-12 h-12 text-lg font-bold"
                />
                <InputOTPSlot 
                  index={3} 
                  className="bg-maroon-700 border-gold-500 text-gold-200 focus:border-gold-400 w-12 h-12 text-lg font-bold"
                />
                <InputOTPSlot 
                  index={4} 
                  className="bg-maroon-700 border-gold-500 text-gold-200 focus:border-gold-400 w-12 h-12 text-lg font-bold"
                />
                <InputOTPSlot 
                  index={5} 
                  className="bg-maroon-700 border-gold-500 text-gold-200 focus:border-gold-400 w-12 h-12 text-lg font-bold"
                />
              </InputOTPGroup>
            </InputOTP>
          </div>
        </div>

        <Button 
          onClick={handleVerify}
          disabled={otp.length !== 6 || isLoading}
          className="w-full bg-gold-500 hover:bg-gold-600 text-maroon-900 font-cormorant font-semibold py-3 transition-all duration-300 hover-scale"
        >
          {isLoading ? "Verifying..." : "Verify OTP"}
        </Button>

        <div className="text-center space-y-2">
          <p className="text-sm metallic-gold-subtle font-cormorant">
            Didn't receive the code?
          </p>
          <Button
            variant="link"
            onClick={handleResendOTP}
            disabled={resendLoading}
            className="text-gold-400 hover:text-gold-300 font-cormorant"
          >
            {resendLoading ? "Sending..." : "Resend OTP"}
          </Button>
        </div>

        <Button
          variant="ghost"
          onClick={onBack}
          className="w-full text-gold-400 hover:text-gold-300 font-cormorant hover:bg-maroon-700/50"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Login
        </Button>
      </div>
    </div>
  );
};

export default OTPVerification;
