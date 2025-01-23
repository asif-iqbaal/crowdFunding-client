import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { verify } from '../../action/auth';

// Mock verification function
// async function verifyAccount(token: string): Promise<{ success: boolean; message: string }> {
//   // Replace this with your API logic
//   await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate delay
//   return token === 'valid' // Simulate token validation
//     ? { success: true, message: "Your account has been successfully verified!" }
//     : { success: false, message: "Invalid or expired verification token." };
// }

export default function VerifyPage() {
  const [searchParams] = useSearchParams(); 
  const [verificationState, setVerificationState] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    const verifyToken = async () => {
      const token = searchParams.get('token');
      if (!token) {
        setVerificationState('error');
        setMessage('Verification token is missing.');
        return;
      }

      try {
        const result = await verify(token);
        console.log(result.succes);
        if (result.success) {
          setVerificationState('success');
        } else {
          setVerificationState('error');
        }
        setMessage(result.message);
      } catch (error) {
        console.error(error);
        setVerificationState('error');
        setMessage('An error occurred during verification. Please try again.');
      }
    };

    verifyToken();
  }, [searchParams]);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-blue-50 flex items-center justify-center px-4">
      <motion.div initial="hidden" animate="visible" variants={cardVariants}>
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">Account Verification</CardTitle>
            <CardDescription className="text-center">
              {verificationState === 'loading' ? 'Verifying your account...' : 'Verification process complete'}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center text-center">
            {verificationState === 'loading' && <Loader2 className="h-16 w-16 text-blue-500 animate-spin" />}
            {verificationState === 'success' && <CheckCircle className="h-16 w-16 text-green-500" />}
            {verificationState === 'error' && <XCircle className="h-16 w-16 text-red-500" />}
            <p className="mt-4 text-lg">{message}</p>
          </CardContent>
          <CardFooter className="flex justify-center">
            {verificationState !== 'loading' && (
              <Button asChild className="text-white bg-blue-400">
                <Link to="#">Thank you</Link>
              </Button>
            )}
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
