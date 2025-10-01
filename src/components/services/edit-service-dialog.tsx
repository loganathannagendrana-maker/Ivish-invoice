
"use client";

import { useState, useEffect } from "react";
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
import type { Service } from "@/lib/types";

interface EditServiceDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onUpdateService: (service: Service) => void;
  service: Service;
}

export function EditServiceDialog({ isOpen, onOpenChange, onUpdateService, service }: EditServiceDialogProps) {
  const [name, setName] = useState("");
  const [rate, setRate] = useState(0);

  useEffect(() => {
    if (service) {
        setName(service.name);
        setRate(service.rate);
    }
  }, [service]);


  const handleSubmit = () => {
    if (!name || rate <= 0) {
      alert("Please enter a valid service name and price.");
      return;
    }
    onUpdateService({
      name,
      rate,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Service</DialogTitle>
          <DialogDescription>
            Update the details for this service.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="col-span-3" placeholder="Service Name" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="rate" className="text-right">
              Price
            </Label>
            <Input id="rate" type="number" value={rate} onChange={(e) => setRate(parseFloat(e.target.value) || 0)} className="col-span-3" placeholder="Service Price" />
          </div>
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button type="submit" onClick={handleSubmit}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
