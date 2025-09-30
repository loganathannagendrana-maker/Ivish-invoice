"use client";

import { useState } from "react";
import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { FileText, Settings, LifeBuoy, LogOut, Menu, Calendar as CalendarIcon, Users, Plus, Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { serviceOptions } from "@/lib/services";
import { formatCurrency } from "@/lib/utils";

export default function ServicesPage() {
  const [services, setServices] = useState(serviceOptions);

  return (
    <div className="container mx-auto p-4 md:p-8">
      <header className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-3">
            <Logo className="h-8 w-8 text-primary" />
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

      <main>
        <div className="flex items-center justify-between mb-6">
            <div>
                <h2 className="text-2xl font-bold font-headline">Services</h2>
                <p className="text-muted-foreground">Manage your salon services and pricing</p>
            </div>
            <Button><Plus className="mr-2 h-4 w-4" /> Add Service</Button>
        </div>

        <Card className="shadow-lg">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="p-4 font-semibold">Service Name</th>
                    <th className="p-4 font-semibold text-right">Price</th>
                    <th className="p-4 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {services.map(service => (
                    <tr key={service.name} className="border-b">
                      <td className="p-4 font-medium">{service.name}</td>
                      <td className="p-4 text-right text-muted-foreground">{formatCurrency(service.rate)}</td>
                      <td className="p-4 text-right">
                        <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon"><Edit className="h-4 w-4" /></Button>
                            <Button variant="ghost" size="icon"><Trash2 className="h-4 w-4 text-destructive/80" /></Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
