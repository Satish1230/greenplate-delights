
import React from 'react';
import CounterAnimation from './CounterAnimation';

const StatCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-12">
      <div className="bg-white rounded-lg shadow-md p-6 text-center">
        <div className="text-3xl font-bold text-sage-600 mb-2">
          <CounterAnimation end={5000} suffix="+" />
        </div>
        <h3 className="text-lg font-medium text-sage-800">Meals Delivered</h3>
        <p className="text-sm text-sage-600 mt-2">Fresh, healthy meals delivered daily</p>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6 text-center">
        <div className="text-3xl font-bold text-sage-600 mb-2">
          <CounterAnimation end={98} suffix="%" />
        </div>
        <h3 className="text-lg font-medium text-sage-800">Customer Satisfaction</h3>
        <p className="text-sm text-sage-600 mt-2">Our customers love our service</p>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6 text-center">
        <div className="text-3xl font-bold text-sage-600 mb-2">
          <CounterAnimation end={100} suffix="%" />
        </div>
        <h3 className="text-lg font-medium text-sage-800">Eco-Friendly Packaging</h3>
        <p className="text-sm text-sage-600 mt-2">Sustainable and biodegradable materials</p>
      </div>
    </div>
  );
};

export default StatCards;
