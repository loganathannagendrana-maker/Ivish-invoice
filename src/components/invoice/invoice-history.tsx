
"use client";

import { useState, useMemo } from 'react';
import type { Invoice } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Search, Calendar, Hash, Users, DollarSign, Trash2 } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { format } from 'date-fns';
import { Button } from '../ui/button';

interface InvoiceHistoryProps {
  invoices: Invoice[];
  onClearHistory: () => void;
}

export default function InvoiceHistory({ invoices, onClearHistory }: InvoiceHistoryProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const today = new Date().toISOString().split('T')[0];
  
  const todaysInvoices = useMemo(() => invoices.filter(inv => inv.date === today), [invoices, today]);
  
  const todaysRevenue = useMemo(() => todaysInvoices.reduce((acc, inv) => acc + inv.total, 0), [todaysInvoices]);

  const filteredInvoices = useMemo(() => 
    invoices.filter(inv => 
      inv.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase())
    ), [invoices, searchTerm]);
    
  const oldInvoicesExist = useMemo(() => invoices.some(inv => inv.date !== today), [invoices, today]);

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline">Invoice Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-secondary/50 rounded-lg p-4 space-y-2">
          <h3 className="font-semibold text-center text-foreground/80">Today's Activity</h3>
          <div className="flex justify-around text-center">
            <div>
              <p className="text-2xl font-bold text-primary">{todaysInvoices.length}</p>
              <p className="text-sm text-muted-foreground">Invoices</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-primary">{formatCurrency(todaysRevenue)}</p>
              <p className="text-sm text-muted-foreground">Revenue</p>
            </div>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold text-foreground/80">History</h3>
            {oldInvoicesExist && (
                <Button variant="outline" size="sm" onClick={onClearHistory}>
                    <Trash2 className="mr-2 h-4 w-4" /> Clear History
                </Button>
            )}
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search invoices..."
              className="pl-10"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {filteredInvoices.length > 0 ? (
            filteredInvoices.map(invoice => (
              <AccordionItem value={invoice.id} key={invoice.id}>
                <AccordionTrigger>
                  <div className="flex justify-between w-full pr-4">
                    <span className="font-medium">{invoice.customerName}</span>
                    <span className="text-muted-foreground">{formatCurrency(invoice.total)}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-2 text-sm text-muted-foreground">
                  <p className="flex items-center"><Hash className="w-4 h-4 mr-2 text-primary/70" /> Invoice #: {invoice.invoiceNumber}</p>
                  <p className="flex items-center"><Calendar className="w-4 h-4 mr-2 text-primary/70" /> Date: {format(new Date(invoice.date), 'MMMM d, yyyy')}</p>
                  <p className="flex items-center"><Users className="w-4 h-4 mr-2 text-primary/70" /> Items: {invoice.items.length}</p>
                  <p className="flex items-center font-semibold"><DollarSign className="w-4 h-4 mr-2 text-primary/70" /> Total: {formatCurrency(invoice.total)}</p>
                </AccordionContent>
              </AccordionItem>
            ))
          ) : (
            <p className="text-center text-muted-foreground pt-4">No invoices found.</p>
          )}
        </Accordion>
      </CardContent>
    </Card>
  );
}
