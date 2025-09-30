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
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { Appointment } from "@/lib/types";
import { serviceOptions } from "@/lib/services";

interface AddAppointmentDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onAddAppointment: (appointment: Omit<Appointment, 'id'>) => void;
}

export function AddAppointmentDialog({ isOpen, onOpenChange, onAddAppointment }: AddAppointmentDialogProps) {
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [time, setTime] = useState("");
  const [service, setService] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = () => {
    if (!customerName || !time || !service) {
      // Basic validation
      alert("Please fill in all required fields.");
      return;
    }
    onAddAppointment({
      date: new Date().toISOString().split('T')[0],
      time,
      customerName,
      customerPhone,
      service,
      notes,
    });
    // Reset form and close dialog
    setCustomerName("");
    setCustomerPhone("");
    setTime("");
    setService("");
    setNotes("");
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Appointment</DialogTitle>
          <DialogDescription>
            Fill in the details below to add a new appointment.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" value={customerName} onChange={(e) => setCustomerName(e.target.value)} className="col-span-3" placeholder="Customer's Name" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="phone" className="text-right">
              Phone
            </Label>
            <Input id="phone" value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} className="col-span-3" placeholder="Contact Number" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="time" className="text-right">
              Time
            </Label>
            <Input id="time" type="time" value={time} onChange={(e) => setTime(e.target.value)} className="col-span-3" />
          </div>
           <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="service" className="text-right">
              Service
            </Label>
             <div className="col-span-3">
                 <Select onValueChange={setService} value={service}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>
                  <SelectContent>
                    {serviceOptions.map(option => (
                      <SelectItem key={option.name} value={option.name}>{option.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="notes" className="text-right">
              Notes
            </Label>
            <Textarea id="notes" value={notes} onChange={(e) => setNotes(e.target.value)} className="col-span-3" placeholder="Any additional notes" />
          </div>
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button type="submit" onClick={handleSubmit}>Save Appointment</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
