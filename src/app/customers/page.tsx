"use client";

import { useState } from "react";
import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { FileText, Settings, LifeBuoy, LogOut, Menu, Users, User, Phone, Edit, Trash2, Plus } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AddCustomerDialog } from "@/components/customers/add-customer-dialog";
import type { Customer } from "@/lib/types";


export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const handleAddCustomer = (customer: Omit<Customer, 'id' | 'totalAppointments' | 'totalSpent'>) => {
    const newCustomer: Customer = {
      ...customer,
      id: Date.now().toString(),
      totalAppointments: 0,
      totalSpent: 0,
    };
    setCustomers(prev => [...prev, newCustomer]);
  };

  return (
    <>
      <AddCustomerDialog
        isOpen={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onAddCustomer={handleAddCustomer}
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
                  <h2 className="text-2xl font-bold font-headline">Customers</h2>
                  <p className="text-muted-foreground">Manage your salon customer database</p>
              </div>
              <Button onClick={() => setIsAddDialogOpen(true)}><Plus className="mr-2 h-4 w-4" /> Add Customer</Button>
          </div>

          <Card className="shadow-lg">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="p-4 font-semibold">Name</th>
                      <th className="p-4 font-semibold">Contact</th>
                      <th className="p-4 font-semibold text-center">Appointments</th>
                      <th className="p-4 font-semibold text-right">Total Spent</th>
                      <th className="p-4 font-semibold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customers.length > 0 ? (
                      customers.map(customer => (
                        <tr key={customer.id} className="border-b">
                          <td className="p-4 font-medium">{customer.name}</td>
                          <td className="p-4 text-muted-foreground">
                            <div>{customer.email}</div>
                            <div>{customer.phone}</div>
                          </td>
                          <td className="p-4 text-center text-muted-foreground">{customer.totalAppointments}</td>
                          <td className="p-4 text-right text-muted-foreground">₹{customer.totalSpent.toFixed(2)}</td>
                          <td className="p-4 text-right">
                            <div className="flex justify-end gap-2">
                                <Button variant="ghost" size="icon"><Edit className="h-4 w-4" /></Button>
                                <Button variant="ghost" size="icon"><Trash2 className="h-4 w-4 text-destructive/80" /></Button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="p-8 text-center text-muted-foreground">No customers yet.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </>
  );
}
