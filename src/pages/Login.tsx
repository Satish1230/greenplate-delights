
import React from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Calendar, LogIn } from "lucide-react";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // In a real app, this would be an API call to authenticate
    // For demo purposes, we'll just simulate a successful login
    if (values.email && values.password) {
      // Store user data in localStorage
      localStorage.setItem("user", JSON.stringify({
        id: "user-123",
        email: values.email,
        name: "Demo User",
        isLoggedIn: true,
      }));
      
      toast({
        title: "Login Successful",
        description: "Welcome back to Mealawe!",
      });
      
      // Redirect to dashboard
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-sage-50">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-serif font-bold text-sage-800">
            Welcome Back
          </h2>
          <p className="mt-2 text-sm text-sage-600">
            Sign in to manage your meal subscriptions
          </p>
        </div>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="your.email@example.com" {...field} />
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
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="******" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button type="submit" className="w-full bg-sage-600 hover:bg-sage-700">
              <LogIn className="mr-2 h-4 w-4" /> Sign In
            </Button>
          </form>
        </Form>
        
        <div className="mt-4 text-center">
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
    </div>
  );
};

export default Login;
