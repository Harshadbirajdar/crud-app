import AxiosInstances from "@/helper/AxiosInstances";
import { sanitizeObject } from "@/utils";
import React, { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import Button from "./core/Button";
import Input from "./core/Input";
import MyDialog from "./core/MyDailog";

interface IAddClient {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const AddClient = ({ open, setOpen }: IAddClient) => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      id: "",
      address: "",
    },
  });
  const onSubmit = handleSubmit((data) => {
    setLoading(true);
    AxiosInstances.post("/client", sanitizeObject(data))
      .then((response) => {
        if (response.data.success) {
          setLoading(false);
          setOpen(false);
          toast.success(response.data.message);
          reset();
        }
      })
      .catch(() => {
        setLoading(false);
      });
  });
  return (
    <>
      <MyDialog
        isOpen={open}
        title="Add Client"
        closeModal={() => {
          setOpen(false);
        }}
      >
        <div>
          <div className="relative">
            <div className="mt-10 sm:mt-0">
              <div className="mt-5 md:col-span-2 md:mt-0">
                <form onSubmit={onSubmit}>
                  <div className="overflow-hidden ">
                    <div className=" px-4 py-5 sm:p-6">
                      <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-6 sm:col-span-3">
                          <Input
                            {...register("firstName", {
                              required: {
                                value: true,
                                message: "First Name is required",
                              },
                              pattern: {
                                value: /^[a-zA-Z]+$/,
                                message: "Please enter a valid first name",
                              },
                            })}
                            label="First Name"
                            isRequired={true}
                            error={errors.firstName?.message}
                          />
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                          <Input
                            {...register("lastName", {
                              required: {
                                value: true,
                                message: "Last Name is required",
                              },
                              pattern: {
                                value: /^[a-zA-Z]+$/,
                                message: "Please enter a valid last name",
                              },
                            })}
                            label="Last Name"
                            isRequired={true}
                            error={errors.lastName?.message}
                          />
                        </div>

                        <div className="col-span-6 sm:col-span-6 w-full">
                          <Input
                            {...register("email", {
                              pattern: {
                                value:
                                  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                message: "Please enter a valid email address",
                              },
                            })}
                            label="Email"
                            error={errors.email?.message}
                          />
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                          <Input
                            {...register("id", {
                              required: {
                                value: true,
                                message: "ID is required",
                              },
                              pattern: {
                                value:
                                  /(([0-9]{2})(0|1)([0-9])([0-3])([0-9]))([ ]?)(([0-9]{4})([ ]?)([0-1][8]([ ]?)[0-9]))/,
                                message: "Please enter a valid ID",
                              },
                              maxLength: {
                                value: 13,
                                message: "Please enter a valid ID",
                              },
                            })}
                            label="ID number"
                            isRequired={true}
                            error={errors.id?.message}
                          />
                        </div>

                        <div className="col-span-6">
                          <div>
                            <label
                              htmlFor="comment"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Address
                            </label>
                            <div className="mt-1">
                              <textarea
                                {...register("address")}
                                rows={4}
                                name="comment"
                                id="comment"
                                className="block w-full rounded-md outline outline-gray-300 shadow-sm  focus:outline-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 "
                                defaultValue={""}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className=" px-4 py-3 text-right sm:px-6">
                      <Button loading={loading} type="submit">
                        Save
                      </Button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </MyDialog>
    </>
  );
};

export default AddClient;
