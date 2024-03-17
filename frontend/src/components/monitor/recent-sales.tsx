import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArbiscanTxn } from "@/lib/arbiscan";
import { formatDate } from "date-fns";

export function RecentSales({ transactions }: { transactions: ArbiscanTxn[] }) {
  return (
    <div className="space-y-8">
      {transactions.map((txn) => {
        return (
          <div className="flex items-center" key={txn.hash}>
            {/* <Avatar className="h-9 w-9">
              <AvatarImage src="/avatars/01.png" alt="Avatar" />
              <AvatarFallback>OM</AvatarFallback>
            </Avatar> */}

            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">
                {txn.blockHash.slice(0, 30)}...
              </p>
              <p className="text-sm text-muted-foreground">
                {formatDate(parseInt(txn.timeStamp), "dd/MM/yyyy")}
              </p>
            </div>
            <div className="ml-auto font-medium mt-0 mb-auto">{txn.value}</div>
          </div>
        );
      })}
    </div>
  );
}
