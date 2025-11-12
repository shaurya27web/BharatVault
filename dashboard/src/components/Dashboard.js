import React from 'react';
import { GeneralProvider } from './context/GeneralContext';
import Funds from './components/Funds';
import { useUser } from '@clerk/clerk-react'; // If using Clerk in dashboard

function Dashboard() {
  const { user: clerkUser, isLoaded } = useUser();

  if (!isLoaded) {
    return <div>Loading Dashboard...</div>;
  }

  return (
    <GeneralProvider clerkUser={clerkUser}>
      <div className="dashboard">
        <header>
          <h1>BharatVault Dashboard</h1>
          <p>Welcome, {clerkUser.firstName}!</p>
        </header>
        
        <main>
          <div className="dashboard-grid">
            {/* Funds Section */}
            <section className="funds-section">
              <Funds />
            </section>
            
            {/* Other dashboard sections can go here */}
            <section className="stocks-section">
              <h3>Stocks Portfolio</h3>
              {/* Stocks components */}
            </section>
            
            <section className="lending-section">
              <h3>Lending</h3>
              {/* Lending components */}
            </section>
          </div>
        </main>
      </div>
    </GeneralProvider>
  );
}

export default Dashboard;