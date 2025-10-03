
import Link from 'next/link';
import {
  FileText,
  LifeBuoy,
  LogOut,
  Menu,
  Settings,
  Users,
  BarChart,
} from 'lucide-react';
import Logo from '@/components/logo';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/hooks/use-auth.tsx';
import { useRouter } from 'next/navigation';

export default function Header() {
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };
  
  return (
    <header className="mb-8 flex items-center justify-between no-print">
      <div className="flex items-center gap-3">
        <Link href="/" className="flex items-center gap-3">
          <Logo className="h-10 w-auto text-primary" />
          <h1 className="text-3xl font-bold font-headline text-foreground/80">
            Ivish Spa & MakeOvers
          </h1>
        </Link>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" className="hidden sm:inline-flex" asChild>
          <Link href="/services">
            <Users className="mr-2 h-4 w-4" /> Services
          </Link>
        </Button>
        <Button variant="outline" className="hidden sm:inline-flex" asChild>
          <Link href="/customers">
            <Users className="mr-2 h-4 w-4" /> Customers
          </Link>
        </Button>
        <Button variant="outline" className="hidden sm:inline-flex" asChild>
          <Link href="/reports">
            <BarChart className="mr-2 h-4 w-4" /> Reports
          </Link>
        </Button>
        <Button className="hidden sm:inline-flex" asChild>
          <Link href="/">
            <FileText className="mr-2 h-4 w-4" /> New Invoice
          </Link>
        </Button>
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
            <DropdownMenuItem className="sm:hidden" asChild>
              <Link href="/">
                <FileText className="mr-2 h-4 w-4" />
                <span>New Invoice</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="sm:hidden" asChild>
              <Link href="/services">
                <Users className="mr-2 h-4 w-4" />
                <span>Services</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="sm:hidden" asChild>
              <Link href="/customers">
                <Users className="mr-2 h-4 w-4" />
                <span>Customers</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="sm:hidden" asChild>
              <Link href="/reports">
                <BarChart className="mr-2 h-4 w-4" />
                <span>Reports</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/settings">
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/support">
                <LifeBuoy className="mr-2 h-4 w-4" />
                <span>Support</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
