// src/frontend/src/components/DashboardOverview.tsx
import React from 'react';
import styled from 'styled-components';

const OverviewContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const StatCard = styled.div`
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  display: flex;
  flex-direction: column;
`;

const StatTitle = styled.h3`
  margin: 0 0 0.5rem 0;
  color: #7f8c8d;
  font-size: 0.9rem;
  font-weight: 500;
`;

const StatValue = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: #2c3e50;
`;

const StatSubtitle = styled.div`
  color: #95a5a6;
  font-size: 0.8rem;
  margin-top: 0.25rem;
`;

const RecentActivity = styled.div`
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  margin-top: 1.5rem;
`;

const ActivityList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ActivityItem = styled.li`
  padding: 0.75rem 0;
  border-bottom: 1px solid #ecf0f1;
  display: flex;
  justify-content: space-between;

  &:last-child {
    border-bottom: none;
  }
`;

const ActivityText = styled.span`
  color: #2c3e50;
`;

const ActivityTime = styled.span`
  color: #95a5a6;
  font-size: 0.8rem;
`;

interface DashboardOverviewProps {
  stats: {
    totalArtworks: number;
    totalUsers: number;
    activeExhibitions: number;
    totalViews: number;
  };
  recentActivity: Array<{
    id: string;
    text: string;
    time: string;
  }>;
  userRole: string;
}

const DashboardOverview: React.FC<DashboardOverviewProps> = ({ 
  stats, 
  recentActivity,
  userRole
}) => {
  return (
    <div>
      <h2>Dashboard Overview</h2>
      
      <OverviewContainer>
        <StatCard>
          <StatTitle>TOTAL ARTWORKS</StatTitle>
          <StatValue>{stats.totalArtworks}</StatValue>
          <StatSubtitle>In the gallery</StatSubtitle>
        </StatCard>
        
        <StatCard>
          <StatTitle>TOTAL USERS</StatTitle>
          <StatValue>{stats.totalUsers}</StatValue>
          <StatSubtitle>Registered visitors</StatSubtitle>
        </StatCard>
        
        <StatCard>
          <StatTitle>ACTIVE EXHIBITIONS</StatTitle>
          <StatValue>{stats.activeExhibitions}</StatValue>
          <StatSubtitle>Currently running</StatSubtitle>
        </StatCard>
        
        <StatCard>
          <StatTitle>TOTAL VIEWS</StatTitle>
          <StatValue>{stats.totalViews}</StatValue>
          <StatSubtitle>This month</StatSubtitle>
        </StatCard>
      </OverviewContainer>
      
      <RecentActivity>
        <h3>Recent Activity</h3>
        <ActivityList>
          {recentActivity.map(activity => (
            <ActivityItem key={activity.id}>
              <ActivityText>{activity.text}</ActivityText>
              <ActivityTime>{activity.time}</ActivityTime>
            </ActivityItem>
          ))}
        </ActivityList>
      </RecentActivity>
    </div>
  );
};

export default DashboardOverview;