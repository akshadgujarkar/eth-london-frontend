import { monitorConfig } from "@/config/dashboard";
import { MainNav } from "@/components/main-nav";
import { DashboardNav } from "@/components/nav";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { DashboardHeader } from "@/components/header";
import { DashboardShell } from "@/components/shell";

import { cn } from "@/lib/utils";
import MainLayout from "./main-layout";

interface DashboardLayoutProps {
  heading: string;
  text: string;
  buttonLabel: string;
}

export default function DashboardLayout({
  children,
  loading,
}: {
  loading: boolean;
  children?: React.ReactNode;
}) {
  return (
    <MainLayout>
      {/* <div className="flex min-h-screen flex-col space-y-6"> */}
      <div
        className={cn(
          "container grid flex-1 gap-12 md:grid-cols-[200px_1fr] mt-8"
        )}
      >
        <aside className={cn("hidden w-[200px] flex-col md:flex")}>
          <DashboardNav items={monitorConfig.sidebarNav} />
        </aside>

        <main className="flex w-full flex-1 flex-col overflow-hidden">
          {loading ? (
            <DashboardSkeleton
              text={"Loading..."}
              buttonLabel={"Loading..."}
              heading={"Loading..."}
            />
          ) : (
            children
          )}
        </main>
      </div>
      {/* </div> */}
    </MainLayout>
  );
}

export const DashboardSkeleton: React.FC<{
  heading: string;
  text: string;
  buttonLabel: string;
}> = ({ heading, text, buttonLabel }) => {
  return (
    <DashboardShell>
      <DashboardHeader heading={heading} text={text}>
        <Button>{buttonLabel}</Button>
      </DashboardHeader>

      <div className="divide-border-200 divide-y rounded-md border">
        <ItemSkeleton />
        <ItemSkeleton />
        <ItemSkeleton />
        <ItemSkeleton />
        <ItemSkeleton />
      </div>
    </DashboardShell>
  );
};

export function ItemSkeleton() {
  return (
    <div className="p-4">
      <div className="space-y-3">
        <Skeleton className="h-5 w-2/5" />
        <Skeleton className="h-4 w-4/5" />
      </div>
    </div>
  );
}
