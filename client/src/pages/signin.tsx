import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Input from "@/components/core/Input";
import Button from "@/components/core/Button";
import AxiosInstances from "@/helper/AxiosInstances";
import { toast } from "react-hot-toast";
import { TOKEN, USER } from "@/config";
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
      email: "",
      password: "",
    },
  });
  const onSubmit = handleSubmit((data) => {
    setLoading(true);
    AxiosInstances.post("/auth/login", data)
      .then((response) => {
        const { data } = response;
        if (data.success) {
          setLoading(false);
          toast.success("Login successfully...");
          sessionStorage.setItem(TOKEN, data.data.token.access.token);
          sessionStorage.setItem(USER, JSON.stringify(data.data.user));
          AxiosInstances.defaults.headers.Authorization = `Bearer ${data.data.token.access.token}`;
          router.push("/");
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
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{" "}
            <Link
              href="/signup"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Are you a new user?
            </Link>
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={onSubmit}>
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

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <a
                    href="#"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot your password?
                  </a>
                </div>
              </div>

              <div>
                <Button
                  className="!w-full"
                  loading={loading}
                  onClick={onSubmit}
                >
                  {" "}
                  Sign in
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
