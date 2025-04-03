
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

interface Task {
  id: string;
  title: string;
  description?: string;
  status: 'todo' | 'inProgress' | 'review' | 'done';
  priority: 'low' | 'medium' | 'high' | 'critical';
  assignee?: string;
}

const TaskBoard = () => {
  const { toast } = useToast();
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', title: 'Create wireframes for homepage', description: 'Design initial wireframes for the new homepage layout', status: 'todo', priority: 'medium' },
    { id: '2', title: 'Update user authentication flow', description: 'Implement new security measures and optimize login process', status: 'inProgress', priority: 'high' },
    { id: '3', title: 'Prepare product demo', description: 'Create slides and demo script for next client meeting', status: 'review', priority: 'high' },
    { id: '4', title: 'Review analytics dashboard', description: 'Validate metrics and improve visualization', status: 'todo', priority: 'low' },
    { id: '5', title: 'Fix payment gateway issue', description: 'Critical bug affecting 5% of transactions', status: 'inProgress', priority: 'critical' },
    { id: '6', title: 'Update documentation', description: 'Update API documentation with new endpoints', status: 'done', priority: 'medium' },
  ]);

  const [newTask, setNewTask] = useState<Partial<Task>>({
    title: '',
    description: '',
    status: 'todo',
    priority: 'medium',
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddTask = () => {
    if (!newTask.title) {
      toast({
        title: "Required field missing",
        description: "Please enter a task title.",
        variant: "destructive",
      });
      return;
    }

    const task: Task = {
      id: Date.now().toString(),
      title: newTask.title,
      description: newTask.description,
      status: newTask.status as 'todo' | 'inProgress' | 'review' | 'done',
      priority: newTask.priority as 'low' | 'medium' | 'high' | 'critical',
      assignee: newTask.assignee,
    };

    setTasks([...tasks, task]);
    setNewTask({
      title: '',
      description: '',
      status: 'todo',
      priority: 'medium',
    });
    setIsDialogOpen(false);
    
    toast({
      title: "Task created",
      description: "Your task has been added to the board.",
    });
  };

  const handleDragStart = (e: React.DragEvent, taskId: string) => {
    e.dataTransfer.setData('taskId', taskId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, status: 'todo' | 'inProgress' | 'review' | 'done') => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('taskId');
    
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status } : task
    ));

    toast({
      title: "Task updated",
      description: "Task status has been updated.",
    });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low':
        return 'bg-gray-200 text-gray-800';
      case 'medium':
        return 'bg-team-blue text-white';
      case 'high':
        return 'bg-team-orange text-white';
      case 'critical':
        return 'bg-team-red text-white';
      default:
        return 'bg-gray-200 text-gray-800';
    }
  };

  const columns = [
    { id: 'todo', title: 'To Do' },
    { id: 'inProgress', title: 'In Progress' },
    { id: 'review', title: 'Review' },
    { id: 'done', title: 'Done' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Task Board</h1>
          <p className="text-muted-foreground">Manage and track your team's tasks</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-plus mr-2"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
              Add Task
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Task</DialogTitle>
              <DialogDescription>
                Add a new task to your board
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="title" className="text-right text-sm font-medium">
                  Title
                </label>
                <Input
                  id="title"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  className="col-span-3"
                  placeholder="Task title"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="description" className="text-right text-sm font-medium">
                  Description
                </label>
                <Textarea
                  id="description"
                  value={newTask.description}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                  className="col-span-3"
                  placeholder="Task description"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="priority" className="text-right text-sm font-medium">
                  Priority
                </label>
                <Select 
                  value={newTask.priority} 
                  onValueChange={(value) => setNewTask({ ...newTask, priority: value as 'low' | 'medium' | 'high' | 'critical' })}
                >
                  <SelectTrigger id="priority" className="col-span-3">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleAddTask}>Create Task</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {columns.map(column => (
          <div 
            key={column.id}
            className="space-y-3"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, column.id as 'todo' | 'inProgress' | 'review' | 'done')}
          >
            <div className="text-sm font-medium flex items-center justify-between">
              <span>{column.title}</span>
              <span className="bg-muted rounded-full px-2 py-0.5 text-xs">
                {tasks.filter(task => task.status === column.id).length}
              </span>
            </div>
            <div className="bg-muted/40 rounded-lg p-2 min-h-[300px]">
              {tasks
                .filter(task => task.status === column.id)
                .map(task => (
                  <div 
                    key={task.id}
                    className="task-card mb-2 last:mb-0"
                    draggable
                    onDragStart={(e) => handleDragStart(e, task.id)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-medium">{task.title}</h3>
                      <span className={`text-xs rounded-full px-2 py-0.5 ${getPriorityColor(task.priority)}`}>
                        {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                      </span>
                    </div>
                    {task.description && (
                      <p className="text-sm text-muted-foreground mb-2">{task.description}</p>
                    )}
                    {task.assignee && (
                      <div className="flex items-center mt-2">
                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs">
                          {task.assignee.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span className="text-xs ml-2">{task.assignee}</span>
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskBoard;
