
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import AISuggestions from '../common/AISuggestions';

const Dashboard = () => {
  // Remove mock data
  const recentTasks: any[] = [];
  const teamActivities: any[] = [];

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return 'bg-team-orange text-white';
      case 'critical':
        return 'bg-team-red text-white';
      case 'medium':
        return 'bg-team-blue text-white';
      default:
        return 'bg-gray-200 text-gray-800';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back to your workspace</p>
        </div>
        <Button asChild className="bg-primary">
          <Link to="/tasks">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-plus mr-2"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
            New Task
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <CardTitle className="text-lg font-medium">Your Tasks</CardTitle>
              <CardDescription>Recent and upcoming tasks</CardDescription>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link to="/tasks">View all</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTasks.length === 0 ? (
                <p className="text-center text-muted-foreground">No tasks available</p>
              ) : (
                recentTasks.map(task => (
                  <div key={task.id} className="task-card flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-0 sm:justify-between animate-fade-in">
                    <div>
                      <h3 className="font-medium text-foreground">{task.title}</h3>
                      <p className="text-sm text-muted-foreground">Due on {new Date(task.dueDate).toLocaleDateString()}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs bg-muted rounded-full px-2 py-1">{task.team}</span>
                      <span className={`text-xs rounded-full px-2 py-1 ${getPriorityColor(task.priority)}`}>{task.priority}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        <AISuggestions />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-medium">Team Activity</CardTitle>
          <CardDescription>Recent activity from your team members</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {teamActivities.length === 0 ? (
              <p className="text-center text-muted-foreground">No team activities available</p>
            ) : (
              teamActivities.map(activity => (
                <div key={activity.id} className="flex items-start gap-4 animate-fade-in">
                  <div className="active-user w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <span className="text-sm font-medium">{activity.user.split(' ').map(n => n[0]).join('')}</span>
                  </div>
                  <div>
                    <p className="text-sm">
                      <span className="font-medium">{activity.user}</span> {activity.action} <span className="font-medium">{activity.item}</span>
                    </p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;

