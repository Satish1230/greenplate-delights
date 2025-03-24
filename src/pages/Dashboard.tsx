
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Mock data for user's meal plan
const initialMeals = [
  {
    id: "meal-1",
    name: "Weekly Vegetarian Plan",
    status: "active",
    remainingDays: 24,
    nextDelivery: "Tomorrow, 11 AM",
    pausedUntil: null,
  },
  {
    id: "meal-2",
    name: "Bi-Weekly Protein Pack",
    status: "active",
    remainingDays: 12,
    nextDelivery: "Thursday, 10 AM",
    pausedUntil: null,
  }
];

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<any>(null);
  const [meals, setMeals] = useState(initialMeals);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem("user");
    if (!userData) {
      navigate("/login");
      return;
    }
    
    setUser(JSON.parse(userData));
    setLoading(false);
  }, [navigate]);

  const handlePauseMeal = (mealId: string) => {
    // Calculate resume date (2 days from now)
    const resumeDate = new Date();
    resumeDate.setDate(resumeDate.getDate() + 2);
    const formattedDate = resumeDate.toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'short', 
      day: 'numeric' 
    });
    
    // Update the meal status
    setMeals(meals.map(meal => 
      meal.id === mealId 
        ? { 
            ...meal, 
            status: "paused", 
            pausedUntil: formattedDate 
          } 
        : meal
    ));
    
    toast({
      title: "Meal Paused",
      description: `Your meal will resume on ${formattedDate}`,
    });
  };

  const handleResumeMeal = (mealId: string) => {
    // Update the meal status
    setMeals(meals.map(meal => 
      meal.id === mealId 
        ? { 
            ...meal, 
            status: "active", 
            pausedUntil: null 
          } 
        : meal
    ));
    
    toast({
      title: "Meal Resumed",
      description: "Your meal subscription is now active again",
    });
  };

  if (loading) {
    return <div className="h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-sage-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-serif font-bold text-sage-800">
            Welcome, {user?.name || "User"}
          </h1>
          <p className="text-sage-600 mt-2">
            Manage your meal subscriptions and delivery preferences
          </p>
        </div>
        
        <div className="mb-12">
          <h2 className="text-xl font-medium mb-4 text-sage-700">Active Subscriptions</h2>
          
          <div className="grid gap-6 md:grid-cols-2">
            {meals.map((meal) => (
              <Card key={meal.id} className="border border-sage-200">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-sage-800">{meal.name}</CardTitle>
                    <Badge className={meal.status === "active" ? "bg-sage-500" : "bg-amber-500"}>
                      {meal.status === "active" ? "Active" : "Paused"}
                    </Badge>
                  </div>
                  <CardDescription>
                    {meal.status === "active" 
                      ? `Next delivery: ${meal.nextDelivery}` 
                      : `Paused until: ${meal.pausedUntil}`}
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="flex items-center space-x-2 mb-3">
                    <Calendar className="h-5 w-5 text-sage-600" />
                    <span className="text-sage-700">
                      {meal.remainingDays} days remaining
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Clock className="h-5 w-5 text-sage-600" />
                    <span className="text-sage-700">
                      Estimated delivery time: 10 AM - 12 PM
                    </span>
                  </div>
                </CardContent>
                
                <CardFooter>
                  {meal.status === "active" ? (
                    <Button 
                      onClick={() => handlePauseMeal(meal.id)}
                      variant="outline"
                      className="w-full border-sage-300 text-sage-700 hover:bg-sage-100"
                    >
                      Pause for 2 Days
                    </Button>
                  ) : (
                    <Button 
                      onClick={() => handleResumeMeal(meal.id)}
                      className="w-full bg-sage-600 hover:bg-sage-700"
                    >
                      Resume Now
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
