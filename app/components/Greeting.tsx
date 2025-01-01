import React from 'react';

interface GreetingProps {
  name: string;
  existingUser: boolean 
}

const Greeting: React.FC<GreetingProps> = ({ name }) => {
  return (
    <div className="text-3xl font-cursive p-4">
      <div>Welcome back,</div>
      <div className="text-4xl font-bold mb-4">{name}</div>
    </div>
  );
};

export default Greeting;
