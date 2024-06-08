'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Loader2 } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { UserRegisterSchema } from '@/lib/types';
import { AuthType, useCreateUserMutation } from "@/generated/graphql";

const SignInForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof UserRegisterSchema>>({
    mode: 'onChange',
    resolver: zodResolver(UserRegisterSchema),
    defaultValues: {
      password: '',
      username: '',
      email: '',
    },
  });
  const [registerUser] = useCreateUserMutation();

  const handleSubmit = async (values: z.infer<typeof UserRegisterSchema>) => {
    setIsLoading(true);
   const { username, email, password } = values;
    await registerUser({
      variables: {
        data: {
          email,
          username,
          password,
          authType: AuthType.EmailAndPassword
        }
      },
    });
     setIsLoading(false);
  };

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            className="flex flex-col gap-6"
            onSubmit={form.handleSubmit(handleSubmit)}
          >
            <FormField
              disabled={isLoading}
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-md">Username</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Username" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              disabled={isLoading}
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-md">Email</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Email" />
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
                  <FormLabel className="text-md">Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Password"
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="self-start hover:bg-[#2F006B] hover:text-white w-full"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                </>
              ) : (
                'Create an Account'
              )}
            </Button>

            <Button variant="outline" className="w-full">
              Sign up with Google
            </Button>
          </form>
        </Form>

        <div className="mt-4 text-center text-sm">
          Already have an account?{' '}
          <Link href="#" className="underline">
            Sign in
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default SignInForm;
