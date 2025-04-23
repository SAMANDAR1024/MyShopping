import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { RootState } from "@/store/types";
import Link from "next/link";
import { useState } from "react";
import { useSelector } from "react-redux";
import UserIcon from "../icons/User";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { LoginForm } from "./LoginForm";

export function LoginDialog() {
  const [open, setOpen] = useState(false);
  const name = useSelector((s: RootState) => s.auth.user?.name);
  return (
    <>
      {name ? (
        // <div className="flex flex-col items-center text-xs sm:text-sm">
        //
        //   {name}
        // </div>

        <Link href={"/login"}>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex flex-col items-center">
              {" "}
              <UserIcon />
              {name}
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </Link>
      ) : (
        <div
          onClick={() => setOpen(true)}
          className="flex flex-col items-center text-xs sm:text-sm"
        >
          <UserIcon />
          Login
        </div>
      )}
      <Dialog
        open={open}
        onOpenChange={(open) => {
          setOpen(open);
        }}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
          </DialogHeader>
          <LoginForm
            onClose={(open) => {
              setOpen(open);
            }}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
