"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Customer } from "@/lib/types";

interface AddCustomerDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onAddCustomer: (customer: Omit<Customer, 'id' | 'totalAppointments' | 'totalSpent'>) => void;
}

export function AddCustomerDialog({ isOpen, onOpenChange, onAddCustomer }: AddCustomerDialogProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = () => {
    if (!name) {
      alert("Please enter a customer name.");
      return;
    }
    onAddCustomer({
      name,
      phone,
      email,
    });
    // Reset form and close dialog
    setName("");
    setPhone("");
    setEmail("");
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Customer</DialogTitle>
          <DialogDescription>
            Fill in the details below to add a new customer.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="col-span-3" placeholder="Customer's Name" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="phone" className="text-right">
              Phone
            </Label>
            <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} className="col-span-3" placeholder="Contact Number" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="col-span-3" placeholder="customer@example.com" />
          </div>
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button type="submit" onClick={handleSubmit}>Save Customer</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
