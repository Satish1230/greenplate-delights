
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Calendar, Clock, Utensils, AlertCircle, Package, Bell } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useIsMobile } from "@/hooks/use-mobile";
import WhatsAppButton from "@/components/WhatsAppButton";

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
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "meal-2",
    name: "Fitness & Keto Plan",
    type: "Bi-Weekly",
    status: "active",
    remainingDays: 12,
    totalDays: 14,
    nextDelivery: "Thursday, 10 AM",
    pausedUntil: null,
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  }
];

// Mock data for upcoming deliveries
const upcomingDeliveries = [
  {
    id: "del-1",
    date: "Tomorrow",
    time: "10:00 AM - 12:00 PM",
    mealPlan: "Maternity Meal Plan",
    items: 5,
    status: "On Schedule"
  },
  {
    id: "del-2",
    date: "Thursday, 28 Mar",
    time: "11:00 AM - 01:00 PM",
    mealPlan: "Fitness & Keto Plan",
    items: 3,
    status: "Processing"
  }
];

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [user, setUser] = useState<any>(null);
  const [meals, setMeals] = useState(initialMeals);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("subscriptions");

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
      <div className="h-screen flex flex-col items-center justify-center bg-sage-50 p-4">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-16 h-16 bg-sage-300 rounded-full mb-4"></div>
          <div className="h-4 bg-sage-300 rounded w-24 mb-2"></div>
          <div className="h-3 bg-sage-200 rounded w-32"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sage-50">
      <Navbar />
      
      <div className="pt-20 sm:pt-24 pb-6">
        {/* Mobile header with greeting */}
        <div className="bg-sage-600 text-white p-4 sm:p-6 mb-4">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl font-serif font-bold">
              Hello, {user?.name?.split(' ')[0] || "User"}
            </h1>
            <p className="text-sage-100 mt-1 text-sm">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </p>
          </div>
        </div>
        
        {/* Mobile navigation tabs */}
        {isMobile && (
          <div className="flex border-b border-sage-200 bg-white sticky top-16 z-20">
            <button 
              onClick={() => setActiveTab("subscriptions")}
              className={`flex-1 py-3 text-center text-sm font-medium ${
                activeTab === "subscriptions" 
                  ? "text-sage-800 border-b-2 border-sage-600" 
                  : "text-sage-600"
              }`}
            >
              Subscriptions
            </button>
            <button 
              onClick={() => setActiveTab("deliveries")}
              className={`flex-1 py-3 text-center text-sm font-medium ${
                activeTab === "deliveries" 
                  ? "text-sage-800 border-b-2 border-sage-600" 
                  : "text-sage-600"
              }`}
            >
              Deliveries
            </button>
          </div>
        )}
        
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          {/* Desktop Title */}
          {!isMobile && (
            <div className="mb-8">
              <h1 className="text-3xl font-serif font-bold text-sage-800">
                Your Dashboard
              </h1>
              <p className="text-sage-600 mt-2">
                Manage your meal subscriptions and delivery preferences
              </p>
            </div>
          )}
          
          {/* Content based on active tab for mobile */}
          <div className={isMobile && activeTab !== "subscriptions" ? "hidden" : ""}>
            <div className="mb-6 sm:mb-12">
              {!isMobile && <h2 className="text-xl font-medium mb-4 text-sage-700">Your Meal Plans</h2>}
              
              <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2">
                {meals.map((meal) => (
                  <Card key={meal.id} className="border border-sage-200 overflow-hidden">
                    <div className="md:flex">
                      {/* Image shown on larger screens */}
                      <div className="hidden md:block md:w-1/3 relative">
                        <img 
                          src={meal.image} 
                          alt={meal.name}
                          className="absolute inset-0 h-full w-full object-cover"
                        />
                      </div>
                      
                      <div className="md:w-2/3">
                        <CardHeader className="pb-2 pt-4 px-4 sm:px-6">
                          <div className="flex justify-between items-start gap-2">
                            <div>
                              <CardTitle className="text-sage-800 text-lg sm:text-xl">{meal.name}</CardTitle>
                              <CardDescription className="text-xs sm:text-sm flex items-center gap-1 mt-1">
                                <Utensils className="h-3 w-3" /> {meal.type} Plan
                              </CardDescription>
                            </div>
                            <Badge className={`${meal.status === "active" ? "bg-sage-500" : "bg-amber-500"} shrink-0`}>
                              {meal.status === "active" ? "Active" : "Paused"}
                            </Badge>
                          </div>
                        </CardHeader>
                        
                        <CardContent className="pt-0 pb-2 px-4 sm:px-6">
                          {/* Progress bar */}
                          <div className="mb-3">
                            <div className="flex justify-between text-xs text-sage-600 mb-1">
                              <span>{meal.remainingDays} days remaining</span>
                              <span>{meal.totalDays} days total</span>
                            </div>
                            <Progress value={(meal.remainingDays / meal.totalDays) * 100} className="h-2" />
                          </div>
                          
                          <div className="flex items-center space-x-2 text-xs sm:text-sm mb-2">
                            <Calendar className="h-4 w-4 text-sage-600" />
                            <span className="text-sage-700">
                              {meal.status === "active" 
                                ? `Next delivery: ${meal.nextDelivery}` 
                                : `Paused until: ${meal.pausedUntil}`}
                            </span>
                          </div>
                          
                          <div className="flex items-center space-x-2 text-xs sm:text-sm">
                            <Clock className="h-4 w-4 text-sage-600" />
                            <span className="text-sage-700">
                              Delivery window: 10 AM - 12 PM
                            </span>
                          </div>
                        </CardContent>
                        
                        <CardFooter className="pt-2 px-4 sm:px-6 pb-4">
                          {meal.status === "active" ? (
                            <Button 
                              onClick={() => handlePauseMeal(meal.id)}
                              variant="outline"
                              size={isMobile ? "sm" : "default"}
                              className="w-full border-sage-300 text-sage-700 hover:bg-sage-100"
                            >
                              Pause for 2 Days
                            </Button>
                          ) : (
                            <Button 
                              onClick={() => handleResumeMeal(meal.id)}
                              size={isMobile ? "sm" : "default"}
                              className="w-full bg-sage-600 hover:bg-sage-700"
                            >
                              Resume Now
                            </Button>
                          )}
                        </CardFooter>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
          
          {/* Upcoming Deliveries Section */}
          <div className={isMobile && activeTab !== "deliveries" ? "hidden" : ""}>
            <div className="mb-6 sm:mb-12">
              {!isMobile && <h2 className="text-xl font-medium mb-4 text-sage-700">Upcoming Deliveries</h2>}
              
              <div className="space-y-4">
                {upcomingDeliveries.map((delivery) => (
                  <Card key={delivery.id} className="border border-sage-200">
                    <CardHeader className="pb-3 relative">
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-sage-100 text-sage-800 hover:bg-sage-200">{delivery.status}</Badge>
                      </div>
                      <CardTitle className="text-lg text-sage-800">{delivery.date}</CardTitle>
                      <CardDescription>{delivery.time}</CardDescription>
                    </CardHeader>
                    
                    <CardContent className="pb-3">
                      <div className="flex items-start space-x-3 mb-3">
                        <Package className="h-5 w-5 text-sage-600 mt-0.5" />
                        <div>
                          <p className="text-sage-700 font-medium">{delivery.mealPlan}</p>
                          <p className="text-sage-600 text-sm">{delivery.items} items</p>
                        </div>
                      </div>
                    </CardContent>
                    
                    <CardFooter className="flex justify-between">
                      <Button 
                        variant="outline" 
                        size={isMobile ? "sm" : "default"}
                        className="border-sage-300 text-sage-700 hover:bg-sage-100"
                      >
                        View Details
                      </Button>
                      
                      <Button 
                        variant="ghost"
                        size={isMobile ? "sm" : "default"}
                        className="text-sage-700"
                      >
                        <Bell className="h-4 w-4 mr-2" />
                        Notify Me
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          </div>
          
          {/* Quick Actions for non-mobile */}
          {!isMobile && (
            <div className="mb-8">
              <h2 className="text-xl font-medium mb-4 text-sage-700">Quick Actions</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Button 
                  variant="outline" 
                  className="h-auto py-6 border-sage-300 text-sage-700 hover:bg-sage-100 flex flex-col items-center"
                >
                  <Calendar className="h-6 w-6 mb-2" />
                  <span>Modify Schedule</span>
                </Button>
                
                <Button 
                  variant="outline" 
                  className="h-auto py-6 border-sage-300 text-sage-700 hover:bg-sage-100 flex flex-col items-center"
                >
                  <Utensils className="h-6 w-6 mb-2" />
                  <span>Change Meal Preferences</span>
                </Button>
                
                <Button 
                  variant="outline" 
                  className="h-auto py-6 border-sage-300 text-sage-700 hover:bg-sage-100 flex flex-col items-center"
                >
                  <AlertCircle className="h-6 w-6 mb-2" />
                  <span>Help & Support</span>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <WhatsAppButton />
      <Footer />
    </div>
  );
};

export default Dashboard;
