
import React, { ReactNode } from 'react';
import Sidebar from './Sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { useToast } from '@/hooks/use-toast';

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  const { toast } = useToast();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <header className="border-b h-14 px-6 flex items-center justify-between bg-white">
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-semibold text-foreground">FlowBoost</h1>
            </div>
            <div className="flex items-center gap-3">
              <button 
                className="p-2 rounded-full hover:bg-muted text-muted-foreground" 
                onClick={() => toast({
                  title: "Coming soon",
                  description: "Notifications feature will be available soon!",
                })}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-bell"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
              </button>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                  <span className="text-sm font-medium">TS</span>
                </div>
              </div>
            </div>
          </header>
          <main className="flex-1 overflow-auto bg-background">
            <div className="container py-6 h-full">
              {children}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AppLayout;
