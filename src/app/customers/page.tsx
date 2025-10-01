"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { AddCustomerDialog } from "@/components/customers/add-customer-dialog";
import type { Customer } from "@/lib/types";
import PageLayout from "@/components/layout/page-layout";
import { formatCurrency } from "@/lib/utils";


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
      <PageLayout>
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
                        <td className="p-4 text-right text-muted-foreground">{formatCurrency(customer.totalSpent)}</td>
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
      </PageLayout>
    </>
  );
}
