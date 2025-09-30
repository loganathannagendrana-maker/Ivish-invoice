"use client";

import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { FileText, Settings, LifeBuoy, LogOut, Menu, Users } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function SupportPage() {
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
                <h2 className="text-2xl font-bold font-headline">Support</h2>
                <p className="text-muted-foreground">Get help and find answers.</p>
            </div>
            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle>Contact Us</CardTitle>
                    <CardDescription>For any questions or support requests, please reach out to us.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p>
                        If you need assistance with the application, have a feature request, or encountered an issue, our team is here to help.
                    </p>
                    <div>
                        <p className="font-semibold">Email Support:</p>
                        <a href="mailto:support@ivish.com" className="text-primary hover:underline">support@ivish.com</a>
                    </div>
                     <div>
                        <p className="font-semibold">Phone Support:</p>
                        <p className="text-muted-foreground">095008 96380</p>
                    </div>
                </CardContent>
            </Card>
          </div>
        </main>
    </div>
  );
}
