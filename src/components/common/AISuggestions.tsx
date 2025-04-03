
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const AISuggestions = () => {
  const { toast } = useToast();

  const suggestions = [
    "Schedule team retrospective meeting",
    "Review Q2 roadmap with stakeholders",
    "Update project documentation",
  ];

  const handleApplySuggestion = (suggestion: string) => {
    toast({
      title: "Suggestion Applied",
      description: `"${suggestion}" has been added to your tasks.`,
    });
  };

  return (
    <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">AI Suggestions</CardTitle>
        <CardDescription>Actionable insights based on your workflow</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {suggestions.map((suggestion, index) => (
            <div key={index} className="flex items-start gap-2">
              <div className="mt-1 text-primary animate-pulse-light">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-sparkles"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>
              </div>
              <div className="flex-1">
                <p className="text-sm">{suggestion}</p>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-xs mt-1 h-7 text-primary"
                  onClick={() => handleApplySuggestion(suggestion)}
                >
                  Add to tasks
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AISuggestions;
