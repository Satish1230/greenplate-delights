
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { LogIn, ArrowLeft } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useIsMobile } from "@/hooks/use-mobile";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login, checkUserExists } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isMobile = useIsMobile();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    setError(null);

    try {
      // First check if the user exists
      const userExists = await checkUserExists(values.email);
      
      if (!userExists) {
        setError("User not registered. Please sign up first.");
        setLoading(false);
        return;
      }
      
      // Attempt to login
      const success = await login(values.email, values.password);
      
      if (success) {
        // Redirect to dashboard
        navigate("/dashboard");
      } else {
        // Error handled in the login function through toast
        setLoading(false);
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-sage-50">
      {/* Back Button for Mobile */}
      {isMobile && (
        <div className="fixed top-0 left-0 z-50 w-full bg-white border-b border-sage-100 p-3">
          <button 
            onClick={() => navigate("/")}
            className="flex items-center text-sage-700"
          >
            <ArrowLeft size={18} className="mr-1" />
            <span>Back to Home</span>
          </button>
        </div>
      )}
      
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className={`bg-white rounded-2xl shadow-lg overflow-hidden ${isMobile ? 'animate-fade-in' : ''}`}>
            <div className="p-8">
              <div className="text-center mb-6">
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-sage-800">
                  Welcome Back
                </h2>
                <p className="mt-2 text-sm text-sage-600">
                  Sign in to manage your meal subscriptions
                </p>
              </div>
              
              {error && (
                <Alert variant="destructive" className="mb-6 animate-fade-in">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sage-700">Email</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="your.email@example.com" 
                            className="h-11 border-sage-200 focus:border-sage-500" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex justify-between">
                          <FormLabel className="text-sage-700">Password</FormLabel>
                          <a href="#" className="text-xs text-sage-600 hover:text-sage-800">
                            Forgot Password?
                          </a>
                        </div>
                        <FormControl>
                          <Input 
                            type="password" 
                            placeholder="******" 
                            className="h-11 border-sage-200 focus:border-sage-500" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full h-11 bg-sage-600 hover:bg-sage-700 transition-all duration-300"
                    disabled={loading}
                  >
                    <LogIn className="mr-2 h-4 w-4" /> 
                    {loading ? "Signing In..." : "Sign In"}
                  </Button>
                </form>
              </Form>
              
              <div className="mt-6 text-center">
                <p className="text-sm text-sage-600">
                  Don't have an account?{" "}
                  <button
                    onClick={() => navigate("/signup")}
                    className="font-medium text-sage-600 hover:text-sage-800"
                  >
                    Sign up
                  </button>
                </p>
              </div>
            </div>
            
            <div className="bg-sage-50 px-8 py-4 border-t border-sage-100">
              <p className="text-xs text-center text-sage-600">
                By signing in, you agree to our <a href="#" className="underline">Terms of Service</a> and <a href="#" className="underline">Privacy Policy</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
