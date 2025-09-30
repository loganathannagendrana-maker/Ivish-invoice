"use client";

import { useState, useEffect } from "react";
import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { FileText, Settings, LifeBuoy, LogOut, Menu, Users } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { BusinessDetails } from "@/lib/types";
import { businessDetails as initialBusinessDetails } from "@/lib/config";
import { useToast } from "@/hooks/use-toast";

export default function SettingsPage() {
  const [details, setDetails] = useState<BusinessDetails>(initialBusinessDetails);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setDetails(prev => ({...prev, [name]: value}));
  };

  const handleSaveChanges = () => {
    // Here you would typically save to a persistent store (e.g., database or localStorage)
    console.log("Saving changes:", details);
    toast({
        title: "Settings Saved",
        description: "Your business details have been updated.",
    });
  };

  return (
    <div className="container mx-auto p-4 md:p-8">
        <header className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-3">
              <Logo className="h-10 w-auto text-primary" />
              <h1 className="text-3xl font-bold font-headline text-foreground/80">Ivish Spa & MakeOvers</h1>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/services">
              <Button variant="outline" className="hidden sm:inline-flex">
                <Users className="mr-2 h-4 w-4" /> Services
              </Button>
            </Link>
            <Link href="/customers">
              <Button variant="outline" className="hidden sm:inline-flex">
                <Users className="mr-2 h-4 w-4" /> Customers
              </Button>
            </Link>
            <Link href="/">
              <Button className="hidden sm:inline-flex">
                <FileText className="mr-2 h-4 w-4" /> New Invoice
              </Button>
            </Link>
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
                <Link href="/services">
                  <DropdownMenuItem className="sm:hidden">
                    <Users className="mr-2 h-4 w-4" />
                    <span>Services</span>
                  </DropdownMenuItem>
                </Link>
                <Link href="/customers">
                  <DropdownMenuItem className="sm:hidden">
                    <Users className="mr-2 h-4 w-4" />
                    <span>Customers</span>
                  </DropdownMenuItem>
                </Link>
                <Link href="/">
                  <DropdownMenuItem className="sm:hidden">
                    <FileText className="mr-2 h-4 w-4" />
                    <span>New Invoice</span>
                  </DropdownMenuItem>
                </Link>
                <Link href="/settings">
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                </Link>
                <Link href="/support">
                  <DropdownMenuItem>
                    <LifeBuoy className="mr-2 h-4 w-4" />
                    <span>Support</span>
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuSeparator />
                <Link href="/login">
                  <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </Link>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <main>
          <div className="max-w-2xl mx-auto">
            <div className="mb-6">
                <h2 className="text-2xl font-bold font-headline">Settings</h2>
                <p className="text-muted-foreground">Manage your business information and application settings.</p>
            </div>
            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle>Business Details</CardTitle>
                    <CardDescription>This information will appear on your invoices.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Shop Name</Label>
                        <Input id="name" name="name" value={details.name} onChange={handleInputChange} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="address">Address</Label>
                        <Textarea id="address" name="address" value={details.address} onChange={handleInputChange} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" name="phone" value={details.phone} onChange={handleInputChange} />
                    </div>
                    <Button onClick={handleSaveChanges}>Save Changes</Button>
                </CardContent>
            </Card>
          </div>
        </main>
    </div>
  );
}
