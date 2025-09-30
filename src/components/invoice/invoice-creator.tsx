"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import type { Invoice, InvoiceItem } from "@/lib/types";
import { suggestServicesOrProducts } from "@/ai/flows/suggest-services-or-products";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Label } from "@/components/ui/label";
import { formatCurrency } from "@/lib/utils";
import { PlusCircle, Trash2, Send } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface InvoiceCreatorProps {
  invoice: Invoice;
  setInvoice: React.Dispatch<React.SetStateAction<Invoice>>;
  onSaveAndPrint: (invoice: Invoice) => void;
}

const GST_RATE = 0.12;

const serviceOptions = [
  "Diamond Facials",
  "Fruit Facials",
  "Gold Facials",
  "Hair Colour Gel",
  "Hair Colour Streax",
  "Hair Colour loreal",
  "Highlights",
  "O facials",
  "Per Streax",
  "Vitamin C facials",
  "pappaya Facials",
  "shine and Whitening Facial"
];

export default function InvoiceCreator({ invoice, setInvoice, onSaveAndPrint }: InvoiceCreatorProps) {
  
  const handleCustomerChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setInvoice(prev => ({ ...prev, [name]: value }));
  };

  const handleItemChange = (id: number, field: keyof InvoiceItem, value: string | number) => {
    const newItems = invoice.items.map(item =>
      item.id === id ? { ...item, [field]: value } : item
    );
    setInvoice(prev => ({ ...prev, items: newItems }));
  };
  
  const addItem = () => {
    const newItem: InvoiceItem = {
      id: Date.now(),
      description: '',
      quantity: 1,
      rate: 0,
    };
    setInvoice(prev => ({ ...prev, items: [...prev.items, newItem] }));
  };

  const removeItem = (id: number) => {
    const newItems = invoice.items.filter(item => item.id !== id);
    setInvoice(prev => ({ ...prev, items: newItems }));
  };

  useEffect(() => {
    const subtotal = invoice.items.reduce((acc, item) => acc + item.quantity * item.rate, 0);
    const gst = subtotal * GST_RATE;
    const total = subtotal + gst;
    setInvoice(prev => ({ ...prev, subtotal, gst, total }));
  }, [invoice.items, setInvoice]);

  return (
    <Card className="shadow-lg border-2 border-primary/10">
      <CardHeader>
        <CardTitle className="font-headline">Create Invoice</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="customerName">Customer Name</Label>
            <Input id="customerName" name="customerName" value={invoice.customerName} onChange={handleCustomerChange} placeholder="John Doe" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="customerEmail">Customer Email</Label>
            <Input id="customerEmail" name="customerEmail" type="email" value={invoice.customerEmail} onChange={handleCustomerChange} placeholder="john.doe@example.com" />
          </div>
          <div className="md:col-span-2 space-y-2">
            <Label htmlFor="customerAddress">Customer Address</Label>
            <Textarea id="customerAddress" name="customerAddress" value={invoice.customerAddress} onChange={handleCustomerChange} placeholder="123 Main St, Anytown, USA" />
          </div>
        </div>

        <div>
          <CardTitle className="text-xl font-headline mb-4">Service Items</CardTitle>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-1/2">Description</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Rate</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoice.items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                       <Select onValueChange={(value) => handleItemChange(item.id, 'description', value)} value={item.description}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a service" />
                        </SelectTrigger>
                        <SelectContent>
                          {serviceOptions.map(option => (
                            <SelectItem key={option} value={option}>{option}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Input type="number" value={item.quantity} min="0" onChange={e => handleItemChange(item.id, 'quantity', parseFloat(e.target.value) || 0)} />
                    </TableCell>
                    <TableCell>
                      <Input type="number" value={item.rate} min="0" onChange={e => handleItemChange(item.id, 'rate', parseFloat(e.target.value) || 0)} />
                    </TableCell>
                    <TableCell>{formatCurrency(item.quantity * item.rate)}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon" onClick={() => removeItem(item.id)} disabled={invoice.items.length <= 1}>
                        <Trash2 className="h-4 w-4 text-destructive/70" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <Button variant="outline" size="sm" onClick={addItem} className="mt-4">
            <PlusCircle className="mr-2 h-4 w-4" /> Add Item
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea id="notes" name="notes" value={invoice.notes} onChange={handleCustomerChange} placeholder="Additional information..." />
          </div>

          <div className="space-y-4 rounded-lg bg-secondary/50 p-4">
            <div className="flex justify-between font-medium">
              <span>Subtotal</span>
              <span>{formatCurrency(invoice.subtotal)}</span>
            </div>
            <div className="flex justify-between font-medium">
              <span>GST ({(GST_RATE * 100).toFixed(0)}%)</span>
              <span>{formatCurrency(invoice.gst)}</span>
            </div>
            <div className="flex justify-between text-xl font-bold font-headline text-primary">
              <span>Total</span>
              <span>{formatCurrency(invoice.total)}</span>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button size="lg" className="w-full bg-accent text-accent-foreground hover:bg-accent/90" onClick={() => onSaveAndPrint(invoice)}>
          <Send className="mr-2 h-4 w-4" /> Save & Generate PDF
        </Button>
      </CardFooter>
    </Card>
  );
}
