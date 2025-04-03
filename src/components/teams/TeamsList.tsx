
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar?: string;
}

interface Team {
  id: string;
  name: string;
  description: string;
  members: TeamMember[];
  color: string;
}

const TeamsList = () => {
  const { toast } = useToast();
  const [teams, setTeams] = useState<Team[]>([
    {
      id: '1',
      name: 'Marketing Team',
      description: 'Handles all marketing campaigns and social media',
      color: 'bg-team-purple',
      members: [
        { id: '1', name: 'John Doe', role: 'Team Lead' },
        { id: '2', name: 'Sarah Smith', role: 'Content Writer' },
        { id: '3', name: 'Michael Brown', role: 'Social Media Specialist' },
      ]
    },
    {
      id: '2',
      name: 'Development',
      description: 'Frontend and backend development team',
      color: 'bg-team-blue',
      members: [
        { id: '4', name: 'Emma Wilson', role: 'Tech Lead' },
        { id: '5', name: 'David Lee', role: 'Frontend Developer' },
        { id: '6', name: 'Sophie Martinez', role: 'Backend Developer' },
        { id: '7', name: 'James Johnson', role: 'QA Engineer' },
      ]
    },
    {
      id: '3',
      name: 'Design',
      description: 'UX/UI design and product design',
      color: 'bg-team-green',
      members: [
        { id: '8', name: 'Lucas Chen', role: 'Design Lead' },
        { id: '9', name: 'Olivia Garcia', role: 'UX Designer' },
      ]
    }
  ]);

  const [newTeam, setNewTeam] = useState<Partial<Team>>({
    name: '',
    description: '',
    color: 'bg-team-blue',
    members: [],
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddTeam = () => {
    if (!newTeam.name) {
      toast({
        title: "Required field missing",
        description: "Please enter a team name.",
        variant: "destructive",
      });
      return;
    }

    const team: Team = {
      id: Date.now().toString(),
      name: newTeam.name,
      description: newTeam.description || '',
      color: newTeam.color || 'bg-team-blue',
      members: [],
    };

    setTeams([...teams, team]);
    setNewTeam({
      name: '',
      description: '',
      color: 'bg-team-blue',
      members: [],
    });
    setIsDialogOpen(false);
    
    toast({
      title: "Team created",
      description: "Your new team has been created successfully.",
    });
  };

  const teamColors = [
    { value: 'bg-team-blue', label: 'Blue' },
    { value: 'bg-team-purple', label: 'Purple' },
    { value: 'bg-team-green', label: 'Green' },
    { value: 'bg-team-orange', label: 'Orange' },
    { value: 'bg-team-red', label: 'Red' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Teams</h1>
          <p className="text-muted-foreground">Manage your teams and team members</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-plus mr-2"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
              Create Team
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Team</DialogTitle>
              <DialogDescription>
                Add a new team to your workspace
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="teamName" className="text-right text-sm font-medium">
                  Team Name
                </label>
                <Input
                  id="teamName"
                  value={newTeam.name}
                  onChange={(e) => setNewTeam({ ...newTeam, name: e.target.value })}
                  className="col-span-3"
                  placeholder="Marketing, Development, etc."
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="teamDescription" className="text-right text-sm font-medium">
                  Description
                </label>
                <Textarea
                  id="teamDescription"
                  value={newTeam.description}
                  onChange={(e) => setNewTeam({ ...newTeam, description: e.target.value })}
                  className="col-span-3"
                  placeholder="Team purpose and goals"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label className="text-right text-sm font-medium">
                  Team Color
                </label>
                <div className="col-span-3 flex flex-wrap gap-2">
                  {teamColors.map(color => (
                    <button
                      key={color.value}
                      type="button"
                      onClick={() => setNewTeam({ ...newTeam, color: color.value })}
                      className={`w-8 h-8 rounded-full ${color.value} ${newTeam.color === color.value ? 'ring-2 ring-primary ring-offset-2' : ''}`}
                      aria-label={`Select ${color.label} color`}
                    />
                  ))}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleAddTeam}>Create Team</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teams.map(team => (
          <Card key={team.id} className="overflow-hidden">
            <div className={`h-2 ${team.color}`} />
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                {team.name}
                <Badge variant="outline" className="ml-2">
                  {team.members.length} members
                </Badge>
              </CardTitle>
              <CardDescription>{team.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col space-y-2">
                <h4 className="text-sm font-medium">Team Members</h4>
                <div className="space-y-2">
                  {team.members.map(member => (
                    <div key={member.id} className="flex items-center space-x-2">
                      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                        <span className="text-xs font-medium">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium">{member.name}</p>
                        <p className="text-xs text-muted-foreground">{member.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" size="sm" onClick={() => 
                toast({
                  title: "Coming Soon",
                  description: "Team management features will be available soon!",
                })
              }>
                Manage Team
              </Button>
              <Button size="sm" variant="ghost" onClick={() => 
                toast({
                  title: "Coming Soon",
                  description: "Invite members feature will be available soon!",
                })
              }>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user-plus mr-1"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" x2="19" y1="8" y2="14"/><line x1="16" x2="22" y1="11" y2="11"/></svg>
                Invite
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TeamsList;
