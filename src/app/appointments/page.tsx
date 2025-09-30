"use client";

import { useState } from "react";
import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { FileText, Settings, LifeBuoy, LogOut, Menu, Calendar as CalendarIcon, Clock, Plus, User, Phone, Edit, Trash2, Users } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { AddAppointmentDialog } from "@/components/appointments/add-appointment-dialog";
import type { Appointment } from "@/lib/types";

export default function AppointmentsPage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const todaysAppointments = appointments.filter(apt => {
    // For demo purposes, we show all mock appointments for the selected date
    return true; 
  });

  const handleAddAppointment = (appointment: Omit<Appointment, 'id'>) => {
    setAppointments(prev => [...prev, { ...appointment, id: Date.now().toString() }]);
  };
  
  return (
    <>
      <AddAppointmentDialog
        isOpen={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onAddAppointment={handleAddAppointment}
      />
      <div className="container mx-auto p-4 md:p-8">
        <header className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-3">
              <Logo className="h-10 w-auto text-primary" />
              <h1 className="text-3xl font-bold font-headline text-foreground/80">Ivish Spa & MakeOvers</h1>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/services">
              <Button variant="outline" className="hidden sm:inline-flex">
                <Users className="mr-2 h-4 w-4" /> Services
              </Button>
            </Link>
            <Link href="/customers">
              <Button variant="outline" className="hidden sm:inline-flex">
                <Users className="mr-2 h-4 w-4" /> Customers
              </Button>
            </Link>
            <Link href="/appointments">
              <Button variant="outline" className="hidden sm:inline-flex">
                <CalendarIcon className="mr-2 h-4 w-4" /> Appointments
              </Button>
            </Link>
            <Link href="/">
              <Button className="hidden sm:inline-flex">
                <FileText className="mr-2 h-4 w-4" /> New Invoice
              </Button>
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="h-4 w-4" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Link href="/services">
                  <DropdownMenuItem className="sm:hidden">
                    <Users className="mr-2 h-4 w-4" />
                    <span>Services</span>
                  </DropdownMenuItem>
                </Link>
                <Link href="/customers">
                  <DropdownMenuItem className="sm:hidden">
                    <Users className="mr-2 h-4 w-4" />
                    <span>Customers</span>
                  </DropdownMenuItem>
                </Link>
                <Link href="/">
                  <DropdownMenuItem className="sm:hidden">
                    <FileText className="mr-2 h-4 w-4" />
                    <span>New Invoice</span>
                  </DropdownMenuItem>
                </Link>
                <Link href="/appointments">
                  <DropdownMenuItem className="sm:hidden">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    <span>Appointments</span>
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <LifeBuoy className="mr-2 h-4 w-4" />
                  <span>Support</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2">
            <Card className="shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="font-headline">Today's Appointments</CardTitle>
                <Button size="sm" onClick={() => setIsAddDialogOpen(true)}><Plus className="mr-2 h-4 w-4" /> Add Appointment</Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {todaysAppointments.length > 0 ? (
                    todaysAppointments.map(apt => (
                      <Card key={apt.id} className="bg-secondary/30">
                        <CardContent className="p-4 grid grid-cols-1 sm:grid-cols-3 items-center gap-4">
                          <div className="flex items-center gap-3">
                            <Clock className="h-5 w-5 text-primary" />
                            <span className="font-semibold text-lg">{apt.time}</span>
                          </div>
                          <div className="space-y-1">
                            <p className="flex items-center gap-2"><User className="h-4 w-4 text-muted-foreground" /> {apt.customerName}</p>
                            <p className="flex items-center gap-2 text-sm text-muted-foreground"><Phone className="h-4 w-4" /> {apt.customerPhone}</p>
                          </div>
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon"><Edit className="h-4 w-4" /></Button>
                            <Button variant="ghost" size="icon"><Trash2 className="h-4 w-4 text-destructive/80" /></Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <p className="text-center text-muted-foreground py-8">No appointments for today.</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="lg:col-span-1">
            <Card className="shadow-lg">
              <CardContent className="p-0">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md"
                  classNames={{
                    day_selected: "bg-primary text-primary-foreground hover:bg-primary/90 focus:bg-primary/90",
                    day_today: "bg-accent text-accent-foreground",
                  }}
                />
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </>
  );
}
