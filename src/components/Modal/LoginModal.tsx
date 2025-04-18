import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import UserIcon from "../icons/User";
import { LoginForm } from "./LoginForm";
import { useSelector } from "react-redux";
import { RootState } from "@/store/types";

export function LoginDialog() {
  const [open, setOpen] = useState(false);
  const name = useSelector((s: RootState) => s.auth.user?.name);
  return (
    <>
      {name ? (
        <div className="flex flex-col items-center text-xs sm:text-sm">
          <UserIcon />
          {name}
        </div>
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
