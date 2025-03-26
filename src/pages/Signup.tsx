
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth } from "@/contexts/AuthContext";
import { ArrowLeft, User, Mail, Phone, Lock, Eye, EyeOff } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(10, { message: "Phone number must be at least 10 digits" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const Signup = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { register } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const isMobile = useIsMobile();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    setError(null);

    try {
      const success = await register(
        values.name,
        values.email,
        values.phone,
        values.password
      );

      if (success) {
        // Redirect to dashboard
        navigate("/dashboard");
      } else {
        // Error handled in the register function through toast
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
      
      <div className="flex-1 flex items-center justify-center p-4 pt-16">
        <div className="w-full max-w-md">
          <div className={`bg-white rounded-2xl shadow-lg overflow-hidden ${isMobile ? 'animate-fade-in' : ''}`}>
            <div className="p-6 sm:p-8">
              <div className="text-center mb-6">
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-sage-800">
                  Create an Account
                </h2>
                <p className="mt-2 text-sm text-sage-600">
                  Join Mealawe and start your meal subscription
                </p>
              </div>
              
              {error && (
                <Alert variant="destructive" className="mb-6 animate-fade-in">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sage-700">Full Name</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input 
                              placeholder="John Doe" 
                              className="pl-10 h-11 border-sage-200 focus:border-sage-500" 
                              {...field} 
                            />
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-sage-500" />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sage-700">Email</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input 
                              placeholder="your.email@example.com" 
                              className="pl-10 h-11 border-sage-200 focus:border-sage-500" 
                              {...field} 
                            />
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-sage-500" />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sage-700">Phone Number</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input 
                              placeholder="1234567890" 
                              className="pl-10 h-11 border-sage-200 focus:border-sage-500" 
                              {...field} 
                            />
                            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-sage-500" />
                          </div>
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
                        <FormLabel className="text-sage-700">Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input 
                              type={showPassword ? "text" : "password"} 
                              placeholder="******" 
                              className="pl-10 pr-10 h-11 border-sage-200 focus:border-sage-500" 
                              {...field} 
                            />
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-sage-500" />
                            <button 
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sage-500 hover:text-sage-700"
                            >
                              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sage-700">Confirm Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input 
                              type={showConfirmPassword ? "text" : "password"} 
                              placeholder="******" 
                              className="pl-10 pr-10 h-11 border-sage-200 focus:border-sage-500" 
                              {...field} 
                            />
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-sage-500" />
                            <button 
                              type="button"
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sage-500 hover:text-sage-700"
                            >
                              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full h-11 bg-sage-600 hover:bg-sage-700 mt-6 transition-all duration-300"
                    disabled={loading}
                  >
                    {loading ? "Signing Up..." : "Sign Up"}
                  </Button>
                </form>
              </Form>
              
              <div className="mt-6 text-center">
                <p className="text-sm text-sage-600">
                  Already have an account?{" "}
                  <button
                    onClick={() => navigate("/login")}
                    className="font-medium text-sage-600 hover:text-sage-800"
                  >
                    Sign in
                  </button>
                </p>
              </div>
            </div>
            
            <div className="bg-sage-50 px-6 py-4 border-t border-sage-100">
              <p className="text-xs text-center text-sage-600">
                By signing up, you agree to our <a href="#" className="underline">Terms of Service</a> and <a href="#" className="underline">Privacy Policy</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
