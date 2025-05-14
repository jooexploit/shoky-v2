
import React from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Schedule = () => {
  return (
    <AppLayout>
      <h1 className="text-3xl font-bold tracking-tight mb-6">Schedule Generator</h1>
      <Card>
        <CardHeader>
          <CardTitle>Class Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Generate and manage your class schedule here.</p>
        </CardContent>
      </Card>
    </AppLayout>
  );
};

export default Schedule;
