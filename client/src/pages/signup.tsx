import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Input from "@/components/core/Input";
import Button from "@/components/core/Button";
import AxiosInstances from "@/helper/AxiosInstances";
import { toast } from "react-hot-toast";
import { TOKEN } from "@/config";
import { useRouter } from "next/router";
import Link from "next/link";

const Signin = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  const onSubmit = handleSubmit((data) => {
    setLoading(true);
    AxiosInstances.post("/auth/register", data)
      .then((response) => {
        const { data } = response;
        if (data.success) {
          setLoading(false);
          toast.success("Account successfully registered");
          sessionStorage.setItem(TOKEN, data.access);
          router.push("/signin");
        }
      })
      .catch(() => {
        setLoading(false);
      });
  });
  return (
    <>
      <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{" "}
            <Link
              href="/signin"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Are you a existing user?
            </Link>
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={onSubmit}>
              <Input
                isRequired={true}
                {...register("name", {
                  required: {
                    value: true,
                    message: "Please enter your Name",
                  },
                })}
                label="Name"
                error={errors.name?.message}
              />
              <Input
                isRequired={true}
                {...register("email", {
                  required: {
                    value: true,
                    message: "Please enter your email address",
                  },
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Please enter a valid email address",
                  },
                })}
                label="Email"
                error={errors.email?.message}
              />
              <Input
                isRequired={true}
                type="password"
                {...register("password", {
                  required: {
                    value: true,
                    message: "Please enter your password",
                  },
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters long",
                  },
                  maxLength: {
                    value: 20,
                    message: "Password must be at most 20 characters long",
                  },
                })}
                label="Password"
                error={errors.password?.message}
              />

              <div>
                <Button
                  className="!w-full"
                  loading={loading}
                  onClick={onSubmit}
                >
                  Sign Up
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signin;
