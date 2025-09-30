export interface InvoiceItem {
  id: number;
  description: string;
  quantity: number;
  rate: number;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  customerName: string;
  customerEmail: string;
  customerAddress: string;
  date: string;
  items: InvoiceItem[];
  notes: string;
  subtotal: number;
  gst: number;
  total: number;
}
