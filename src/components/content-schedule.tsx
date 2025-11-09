"use client";

import { useEffect, useState } from 'react';
import {
  Card,
  CardContent
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const scheduleData = {
  Monday: [
    { time: "08:00 - 10:00", show: "Morning Grooves", host: "DJ Elena" },
    { time: "10:00 - 12:00", show: "Mid-day Mix", host: "DJ Carlos" },
    { time: "14:00 - 16:00", show: "Afternoon Chill", host: "DJ Sofia" },
    { time: "20:00 - 22:00", show: "Night Waves", host: "DJ Marco" },
  ],
  Tuesday: [
    { time: "09:00 - 11:00", show: "Top Hits Tuesday", host: "DJ Leon" },
    { time: "13:00 - 15:00", show: "Retro Rewind", host: "DJ Ana" },
  ],
  Wednesday: [
    { time: "08:00 - 10:00", show: "Wake Up Call", host: "DJ Elena" },
    { time: "16:00 - 18:00", show: "The Beat Drop", host: "DJ Carlos" },
  ],
  Thursday: [
    { time: "09:00 - 11:00", show: "Throwback Thursday", host: "DJ Leon" },
    { time: "19:00 - 21:00", show: "Indie Spotlight", host: "DJ Sofia" },
  ],
  Friday: [
    { time: "08:00 - 10:00", show: "Friday Feelings", host: "DJ Elena" },
    { time: "17:00 - 19:00", show: "Weekend Warmup", host: "DJ Marco" },
    { time: "21:00 - 00:00", show: "Club 026 Live", host: "Guest DJs" },
  ],
  Saturday: [
    { time: "10:00 - 13:00", show: "Saturday Brunch", host: "DJ Ana" },
    { time: "20:00 - 23:00", show: "Saturday Night Fever", host: "DJ Carlos" },
  ],
  Sunday: [
    { time: "11:00 - 14:00", show: "Easy Like Sunday Morning", host: "DJ Sofia" },
  ],
};

type Day = keyof typeof scheduleData;

export default function ContentSchedule() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const days = Object.keys(scheduleData) as Day[];
  
  // Safely determine default tab on client side
  const getDefaultTab = () => {
    if (!isClient) return 'Monday';
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' }) as Day;
    return days.includes(today) ? today : 'Monday';
  };

  if (!isClient) {
    return (
      <Card className="shadow-lg">
        <CardContent className="p-4 md:p-6">
          <Skeleton className="h-80 w-full" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-lg">
      <CardContent className="p-4 md:p-6">
        <Tabs defaultValue={getDefaultTab()} className="w-full">
          <TabsList className="grid w-full grid-cols-3 sm:grid-cols-4 md:grid-cols-7">
            {days.map((day) => (
              <TabsTrigger key={day} value={day}>{day.substring(0,3)}</TabsTrigger>
            ))}
          </TabsList>
          {days.map((day) => (
            <TabsContent key={day} value={day}>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[150px]">Time</TableHead>
                    <TableHead>Show</TableHead>
                    <TableHead>Host</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {scheduleData[day].length > 0 ? (
                     scheduleData[day].map((item) => (
                      <TableRow key={item.time}>
                        <TableCell className="font-medium">{item.time}</TableCell>
                        <TableCell>{item.show}</TableCell>
                        <TableCell>{item.host}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                        <TableCell colSpan={3} className="text-center text-muted-foreground h-24">No shows scheduled for today.</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
}
