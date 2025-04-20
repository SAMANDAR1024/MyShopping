"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { login } from "@/store/slices/auth.slice";
import axios from "axios";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

const formSchema = z.object({
  email: z
    .string()
    .min(2, {
      message: "Email must be at least 2 characters.",
    })
    .email(),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

type LoginFormType = z.infer<typeof formSchema>;

export function LoginForm({ onClose }: { onClose: (open: boolean) => void }) {
  const form = useForm<LoginFormType>({
    resolver: zodResolver(formSchema),
  });

  const dispatch = useDispatch();
  function onSubmit(values: LoginFormType) {
    console.log(values);
    axios
      .post("https://nt.softly.uz/api/auth/login", values)
      .then((res) => {
        toast.success("Oxwadii...");
        onClose(false);
        dispatch(login(res.data));
      })
      .catch((error) => {
        console.log(error);
        toast.error("Xato!!!");
      });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="shadcn" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="shadcn" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
