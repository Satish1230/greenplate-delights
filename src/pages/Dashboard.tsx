
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, ArrowRight, Bell, BellOff } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Mock data for user's meal plan
const initialMeals = [
  {
    id: "meal-1",
    name: "Maternity Meal Plan",
    type: "Weekly",
    status: "active",
    remainingDays: 24,
    totalDays: 30,
    nextDelivery: "Tomorrow, 11 AM",
    pausedUntil: null,
    description: "Nutrient-rich meals designed for expectant mothers"
  },
  {
    id: "meal-2",
    name: "Protein Power Pack",
    type: "Bi-Weekly",
    status: "active",
    remainingDays: 12,
    totalDays: 14,
    nextDelivery: "Thursday, 10 AM",
    pausedUntil: null,
    description: "High-protein meals for fitness enthusiasts"
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
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-sage-50">
        <div className="w-12 h-12 rounded-full border-4 border-sage-200 border-t-sage-600 animate-spin"></div>
        <p className="mt-4 text-sage-700">Loading your meal plans...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sage-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-sm p-6 mb-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-serif font-bold text-sage-800">
                Welcome, {user?.name || "User"}
              </h1>
              <p className="text-sage-600 mt-2">
                Manage your meal subscriptions and delivery preferences
              </p>
            </div>
            <Button 
              onClick={() => navigate('/plans')}
              className="bg-sage-700 hover:bg-sage-800 text-white flex items-center gap-2 self-start"
            >
              Explore Plans <ArrowRight size={16} />
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h2 className="text-xl font-serif font-semibold mb-6 text-sage-800 border-b border-sage-100 pb-3">
                Your Active Subscriptions
              </h2>
              
              <div className="space-y-6">
                {meals.map((meal) => (
                  <Card key={meal.id} className="border-none shadow-none bg-sage-50/50">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-sage-800">{meal.name}</CardTitle>
                          <p className="text-sm text-sage-600 mt-1">{meal.description}</p>
                        </div>
                        <Badge className={`${meal.status === "active" ? "bg-sage-500" : "bg-amber-500"} text-white`}>
                          {meal.status === "active" ? "Active" : "Paused"}
                        </Badge>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="pb-2">
                      <div className="mb-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium text-sage-700">Subscription Remaining</span>
                          <span className="text-sm font-medium text-sage-700">
                            {meal.remainingDays} / {meal.totalDays} days
                          </span>
                        </div>
                        <Progress 
                          value={(meal.remainingDays / meal.totalDays) * 100} 
                          className="h-2 bg-sage-200" 
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex items-center gap-2 bg-sage-100/50 p-3 rounded-lg">
                          <Calendar className="h-5 w-5 text-sage-600" />
                          <div>
                            <p className="text-xs text-sage-500 font-medium">Next Delivery</p>
                            <p className="text-sm text-sage-700">
                              {meal.status === "active" ? meal.nextDelivery : `Paused until ${meal.pausedUntil}`}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2 bg-sage-100/50 p-3 rounded-lg">
                          <Clock className="h-5 w-5 text-sage-600" />
                          <div>
                            <p className="text-xs text-sage-500 font-medium">Delivery Window</p>
                            <p className="text-sm text-sage-700">10:00 AM - 12:00 PM</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    
                    <CardFooter className="pt-2">
                      {meal.status === "active" ? (
                        <Button 
                          onClick={() => handlePauseMeal(meal.id)}
                          variant="outline"
                          className="w-full border-sage-300 text-sage-700 hover:bg-sage-100 flex items-center justify-center gap-2"
                        >
                          <BellOff size={16} />
                          Pause for 2 Days
                        </Button>
                      ) : (
                        <Button 
                          onClick={() => handleResumeMeal(meal.id)}
                          className="w-full bg-sage-600 hover:bg-sage-700 flex items-center justify-center gap-2"
                        >
                          <Bell size={16} />
                          Resume Now
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h2 className="text-xl font-serif font-semibold mb-4 text-sage-800 border-b border-sage-100 pb-3">
                Upcoming Deliveries
              </h2>
              
              <div className="space-y-4 mt-4">
                {meals.filter(meal => meal.status === "active").map((meal) => (
                  <div key={`delivery-${meal.id}`} className="border-l-2 border-sage-300 pl-4 py-1">
                    <p className="text-sage-800 font-medium">{meal.nextDelivery}</p>
                    <p className="text-sm text-sage-600">{meal.name}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-sage-700 rounded-xl shadow-sm p-6 text-white">
              <h2 className="text-xl font-serif font-semibold mb-4 border-b border-sage-600 pb-3">
                Need Help?
              </h2>
              
              <p className="text-sage-100 mb-6">Having questions about your subscription or delivery? Our team is ready to help.</p>
              
              <Button
                className="w-full bg-white text-sage-700 hover:bg-sage-100 flex items-center justify-center gap-2"
                onClick={() => window.open('https://wa.me/1234567890', '_blank')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Contact on WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
