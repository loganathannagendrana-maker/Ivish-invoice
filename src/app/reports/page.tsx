
"use client";

import { useState, useEffect, useMemo } from 'react';
import PageLayout from '@/components/layout/page-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { Invoice, Customer } from '@/lib/types';
import { formatCurrency } from '@/lib/utils';
import { subDays, format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { PrintReport } from '@/components/reports/print-report';

export default function ReportsPage() {
    const [invoices, setInvoices] = useState<Invoice[]>([]);
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [isMounted, setIsMounted] = useState(false);
    const [reportToPrint, setReportToPrint] = useState<any | null>(null);

    useEffect(() => {
        setIsMounted(true);
        try {
            const storedInvoices = localStorage.getItem('invoices');
            if (storedInvoices) {
                setInvoices(JSON.parse(storedInvoices));
            }
            const storedCustomers = localStorage.getItem('customers');
            if (storedCustomers) {
                setCustomers(JSON.parse(storedCustomers));
            }
        } catch (error) {
            console.error("Failed to parse data from localStorage", error);
        }
    }, []);

    const reportData = useMemo(() => {
        if (!isMounted) return null;

        const totalRevenue = invoices.reduce((acc, inv) => acc + inv.total, 0);
        const totalInvoices = invoices.length;
        const averageInvoiceValue = totalInvoices > 0 ? totalRevenue / totalInvoices : 0;

        const salesData = Array.from({ length: 30 }, (_, i) => {
            const date = subDays(new Date(), i);
            return {
                date: format(date, 'MMM d'),
                revenue: 0,
            };
        }).reverse();

        invoices.forEach(inv => {
            const invoiceDate = new Date(inv.date);
            const dateString = format(invoiceDate, 'MMM d');
            const found = salesData.find(d => d.date === dateString);
            if (found) {
                found.revenue += inv.total;
            }
        });

        const topCustomers = [...customers]
            .sort((a, b) => b.totalSpent - a.totalSpent)
            .slice(0, 5);

        return {
            totalRevenue,
            totalInvoices,
            averageInvoiceValue,
            salesData,
            topCustomers,
        };
    }, [invoices, customers, isMounted]);

    useEffect(() => {
        if (reportToPrint) {
          const timer = setTimeout(() => {
            window.print();
            setReportToPrint(null);
          }, 100); 
          return () => clearTimeout(timer);
        }
    }, [reportToPrint]);

    const handleDownloadReport = () => {
        setReportToPrint(reportData);
    };

    if (!isMounted || !reportData) {
        return null; // or a loading spinner
    }

    return (
        <>
        {reportToPrint && <PrintReport reportData={reportToPrint} />}
        <div className="no-print">
            <PageLayout>
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-2xl font-bold font-headline">Reports</h2>
                        <p className="text-muted-foreground">An overview of your business performance.</p>
                    </div>
                    <Button onClick={handleDownloadReport}>
                        <Download className="mr-2 h-4 w-4" />
                        Download Report
                    </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Total Revenue</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-3xl font-bold text-primary">{formatCurrency(reportData.totalRevenue)}</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Total Invoices</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-3xl font-bold text-primary">{reportData.totalInvoices}</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Average Invoice Value</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-3xl font-bold text-primary">{formatCurrency(reportData.averageInvoiceValue)}</p>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <Card className="lg:col-span-2">
                        <CardHeader>
                            <CardTitle>Sales Over Time (Last 30 Days)</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={reportData.salesData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="date" />
                                    <YAxis tickFormatter={(value) => formatCurrency(value as number)} />
                                    <Tooltip formatter={(value) => [formatCurrency(value as number), "Revenue"]} />
                                    <Legend />
                                    <Bar dataKey="revenue" fill="hsl(var(--primary))" />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Top 5 Customers</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-4">
                                {reportData.topCustomers.map(customer => (
                                    <li key={customer.id} className="flex justify-between items-center">
                                        <div>
                                            <p className="font-semibold">{customer.name}</p>
                                            <p className="text-sm text-muted-foreground">{customer.phone}</p>
                                        </div>
                                        <p className="font-bold text-primary">{formatCurrency(customer.totalSpent)}</p>
                                    </li>
                                ))}
                            </ul>
                            {reportData.topCustomers.length === 0 && (
                                <p className="text-center text-muted-foreground pt-4">No customer data available yet.</p>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </PageLayout>
        </div>
        </>
    );
}
