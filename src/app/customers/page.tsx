
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { AddCustomerDialog } from "@/components/customers/add-customer-dialog";
import { EditCustomerDialog } from "@/components/customers/edit-customer-dialog";
import type { Customer } from "@/lib/types";
import PageLayout from "@/components/layout/page-layout";
import { formatCurrency } from "@/lib/utils";


export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    try {
      const storedCustomers = localStorage.getItem('customers');
      if (storedCustomers) {
        setCustomers(JSON.parse(storedCustomers));
      }
    } catch (error) {
      console.error("Failed to parse customers from localStorage", error);
    }
  }, []);

  useEffect(() => {
    if (isMounted) {
      try {
        localStorage.setItem('customers', JSON.stringify(customers));
      } catch (error) {
        console.error("Failed to save customers to localStorage", error);
      }
    }
  }, [customers, isMounted]);

  const handleAddCustomer = (customer: Omit<Customer, 'id' | 'totalAppointments' | 'totalSpent'>) => {
    const newCustomer: Customer = {
      ...customer,
      id: Date.now().toString(),
      totalAppointments: 0,
      totalSpent: 0,
    };
    setCustomers(prev => [...prev, newCustomer]);
  };

  const handleEditClick = (customer: Customer) => {
    setEditingCustomer(customer);
    setIsEditDialogOpen(true);
  };

  const handleUpdateCustomer = (updatedCustomer: Customer) => {
    setCustomers(prev => prev.map(c => c.id === updatedCustomer.id ? updatedCustomer : c));
    setEditingCustomer(null);
    setIsEditDialogOpen(false);
  };

  const handleDeleteCustomer = (id: string) => {
    setCustomers(prev => prev.filter(customer => customer.id !== id));
  };

  if (!isMounted) {
    return null; // Or a loading spinner
  }

  return (
    <>
      <AddCustomerDialog
        isOpen={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onAddCustomer={handleAddCustomer}
      />
      {editingCustomer && (
        <EditCustomerDialog
            isOpen={isEditDialogOpen}
            onOpenChange={setIsEditDialogOpen}
            onUpdateCustomer={handleUpdateCustomer}
            customer={editingCustomer}
        />
      )}
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
                              <Button variant="ghost" size="icon" onClick={() => handleEditClick(customer)}><Edit className="h-4 w-4" /></Button>
                              <Button variant="ghost" size="icon" onClick={() => handleDeleteCustomer(customer.id)}><Trash2 className="h-4 w-4 text-destructive/80" /></Button>
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
