"use client"

import { useState, useEffect } from 'react';
import type { Invoice } from '@/lib/types';
import InvoiceCreator from '@/components/invoice/invoice-creator';
import InvoiceHistory from '@/components/invoice/invoice-history';
import { PrintInvoice } from '@/components/invoice/print-invoice';
import Logo from '@/components/logo';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { FileText, Settings, LifeBuoy, LogOut, Menu } from 'lucide-react';

const getInitialInvoice = (): Invoice => ({
  id: '',
  invoiceNumber: '',
  customerName: '',
  customerEmail: '',
  customerAddress: '',
  date: new Date().toISOString().split('T')[0],
  items: [
    { id: Date.now(), description: '', quantity: 1, rate: 0 },
  ],
  notes: '',
  subtotal: 0,
  gst: 0,
  total: 0,
});

export default function Home() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [currentInvoice, setCurrentInvoice] = useState<Invoice>(getInitialInvoice());
  const [invoiceToPrint, setInvoiceToPrint] = useState<Invoice | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    try {
      const storedInvoices = localStorage.getItem('invoices');
      if (storedInvoices) {
        setInvoices(JSON.parse(storedInvoices));
      }
    } catch (error) {
      console.error("Failed to parse invoices from localStorage", error);
    }
  }, []);

  useEffect(() => {
    if (isMounted) {
      try {
        localStorage.setItem('invoices', JSON.stringify(invoices));
      } catch (error) {
        console.error("Failed to save invoices to localStorage", error);
      }
    }
  }, [invoices, isMounted]);

  useEffect(() => {
    if (invoiceToPrint) {
      const timer = setTimeout(() => {
        window.print();
        setInvoiceToPrint(null);
      }, 100); 
      return () => clearTimeout(timer);
    }
  }, [invoiceToPrint]);

  const handleSaveAndPrint = (invoice: Invoice) => {
    const newInvoiceNumber = `INV-${Date.now()}`;
    const newInvoice: Invoice = {
      ...invoice,
      id: newInvoiceNumber,
      invoiceNumber: newInvoiceNumber,
    };
    
    setInvoices(prev => [newInvoice, ...prev]);
    setInvoiceToPrint(newInvoice);
    setCurrentInvoice(getInitialInvoice());
  };
  
  const handleNewInvoice = () => {
    setCurrentInvoice(getInitialInvoice());
  }

  if (!isMounted) {
    return null; // Or a loading spinner
  }

  return (
    <>
      <div className="print-container hidden">
        {invoiceToPrint && <PrintInvoice invoice={invoiceToPrint} />}
      </div>
      <div className="no-print container mx-auto p-4 md:p-8">
        <header className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Logo className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold font-headline text-foreground/80">InvoiceFast</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button onClick={handleNewInvoice} className="hidden sm:inline-flex"><FileText className="mr-2 h-4 w-4" /> New Invoice</Button>
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
                <DropdownMenuItem onClick={handleNewInvoice} className="sm:hidden">
                  <FileText className="mr-2 h-4 w-4" />
                  <span>New Invoice</span>
                </DropdownMenuItem>
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

        <main className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8">
            <InvoiceCreator
              invoice={currentInvoice}
              setInvoice={setCurrentInvoice}
              onSaveAndPrint={handleSaveAndPrint}
            />
          </div>
          <div className="lg:col-span-4">
            <InvoiceHistory invoices={invoices} />
          </div>
        </main>
      </div>
    </>
  );
}
