import React from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { MOCK_USERS } from '@/services/mock-data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, School, User as UserIcon } from 'lucide-react';

export default function Login() {
  const { login } = useAuthStore();

  const handleLogin = (userIndex: number) => {
    const user = MOCK_USERS[userIndex];
    login({
      user,
      school_id: user.school_id,
      role: user.role,
      assigned_class_id: user.role === 'TEACHER' ? 'class-1' : undefined,
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/50 p-4">
      <Card className="w-full max-w-md border-none shadow-xl">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <div className="rounded-full bg-primary/10 p-3">
              <School className="h-8 w-8 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight">EduInsight</CardTitle>
          <CardDescription>
            Student Performance Intelligence Platform
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Select a persona to login</span>
              </div>
            </div>
            
            <Button 
              variant="outline" 
              className="w-full h-12 justify-start"
              onClick={() => handleLogin(2)}
            >
              <Shield className="mr-3 h-5 w-5 text-indigo-500" />
              Super Admin (EduInsight)
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full h-12 justify-start"
              onClick={() => handleLogin(0)}
            >
              <School className="mr-3 h-5 w-5 text-emerald-500" />
              School Admin (Kano Model School)
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full h-12 justify-start"
              onClick={() => handleLogin(1)}
            >
              <UserIcon className="mr-3 h-5 w-5 text-amber-500" />
              Teacher (Musa Bello)
            </Button>
          </div>
          
          <p className="px-8 text-center text-sm text-muted-foreground">
            This is a production foundation. Multi-tenancy is enforced based on the selected role.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
