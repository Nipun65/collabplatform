"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useAddYourPostMutation, useUpdatePostMutation } from "@/redux/api";
import { setFormData } from "@/redux/PostSlice";
import { Loader } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormState, Post, State } from "@/interfaces";
import upload from "@/public/upload.svg";
import plus from "@/public/plus.svg";

const formSchema = z.object({
  name: z.string().nonempty("This is required").min(2, {
    message: "Name must be at least 2 characters.",
  }),
  headline: z.string().nonempty("This is required").min(2, {
    message: "Headline must be at least 2 characters",
  }),
  description: z
    .string()
    .nonempty("This is required")
    .min(10, {
      message: "Description must be at least 10 charaters",
    })
    .max(150, {
      message: "Description should be less than 150 characters",
    }),
  email: z.string().email({ message: "Please Enter Valid Email" }),
  photo: z
    .object({
      data: z.string() as any,
      name: z.string(),
    })
    .refine(
      (value) => {
        return value.data.length > 0 || value.name.length > 0;
      },
      {
        message: "This is required",
      }
    ),
  socialLinks: z.object({
    insta: z
      .string()
      .url({ message: "Please Enter Valid URL" })
      .optional()
      .or(z.literal("")),
    facebook: z
      .string()
      .url({ message: "Please Enter Valid URL" })
      .optional()
      .or(z.literal("")),
    twitter: z
      .string()
      .url({ message: "Please Enter Valid URL" })
      .optional()
      .or(z.literal("")),
    linkedin: z
      .string()
      .url({ message: "Please Enter Valid URL" })
      .optional()
      .or(z.literal("")),
  }),
});

const FormWrapper = () => {
  const formData: FormState = useAppSelector((state: State) => state.formData);
  const dispatch = useAppDispatch();

  const [addYourPost] = useAddYourPostMutation();
  const { data: session } = useSession();
  const [updatePost] = useUpdatePostMutation();

  const inputFileRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: formData?.data?.name || "",
      headline: formData?.data?.headline || "",
      description: formData?.data?.description || "",
      photo: {
        data: "",
        name: "",
      },
      email: formData?.data?.email || "",
      socialLinks: {
        facebook: formData?.data?.socialLinks?.[0]?.facebook || "",
        linkedin: formData?.data?.socialLinks?.[0]?.linkedin || "",
        insta: formData?.data?.socialLinks?.[0]?.insta || "",
        twitter: formData?.data?.socialLinks?.[0]?.twitter || "",
      },
    },
  });

  useEffect(() => {
    if (formData?.action === "edit") {
      form.setValue("name", formData?.data?.name);
      form.setValue("headline", formData?.data?.headline);
      form.setValue("description", formData?.data?.description);
      form.setValue("email", formData?.data?.email);
      form.setValue("photo", { data: "", name: formData?.data?.image?.name });
    }
    form.setValue("socialLinks", formData?.data?.socialLinks?.[0]);
  }, [formData]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    let result;
    setLoading(true);
    if (formData?.data?._id) {
      result = await updatePost({
        ...formData?.data,
        ...values,
      } as Post);
    } else {
      result = await addYourPost({
        ...values,
        loggedInEmail: session?.user?.email as string,
      } as Post);
    }

    if (result) {
      dispatch(setFormData({ data: {}, showModal: false }));
      form.reset();
      setLoading(false);
    }
  }

  const handleImageChange = (e: React.ChangeEvent) => {
    const eTarget = e?.target as HTMLInputElement;
    if (eTarget.files) {
      const file = eTarget.files[0];
      previewFile(file);
    } else {
      form.setValue("photo", { data: "", name: "" });
      form.trigger("photo");
    }
  };

  const previewFile = (file: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      form.setValue("photo", { data: reader.result, name: file?.name });
      form.trigger("photo");
    };
  };

  const setFormOnClose = (action: string) => {
    if (action === "edit") {
      dispatch(
        setFormData({
          data: {},
          showModal: !formData?.showModal,
          action: "",
        })
      );
      form.reset();
    } else {
      dispatch(
        setFormData({
          data: form.getValues(),
          showModal: !formData?.showModal,
          action: "",
        })
      );
    }
  };

  return (
    <>
      {formData?.showModal && (
        <Form {...form}>
          <div className="z-50 bg-white h-[80%] w-[70%] m-auto shadow-lg rounded-2xl form-transition space-y-8 inset-0 absolute overflow-auto">
            <h3 className="text-xl font-bold p-3 h-[8%]">Your Post</h3>
            <div className="border" style={{ margin: 0 }} />
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="p-3 h-[88%] overflow-auto"
              style={{ margin: 0 }}
            >
              <div className="flex xs:flex-col lg:flex-row gap-6 lg:col-span-2 xs:col-span-1">
                <div className="xs:w-full lg:w-1/2 flex flex-col gap-2">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter Name"
                            {...field}
                            className="mt-0"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="headline"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Headline</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter Headline"
                            {...field}
                            className="mt-0"
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field: { value, ...rest } }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <>
                            <Input
                              placeholder="Enter Description"
                              {...rest}
                              value={value}
                              className="mt-0"
                              maxLength={150}
                            />
                            <span className="opacity-80 float-right text-xs">
                              {value.length} / 150
                            </span>
                          </>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="photo"
                    render={({ field: { onChange, value, ...rest } }) => (
                      <FormItem>
                        <FormLabel>Photo</FormLabel>
                        <FormControl>
                          <>
                            <Input
                              {...rest}
                              type="file"
                              name="photo"
                              onChange={handleImageChange}
                              accept="image/*"
                              id="inputFile"
                              className="hidden"
                              ref={inputFileRef}
                            />

                            <label
                              htmlFor="inputFile"
                              className="border px-3 py-2 flex items-center gap-2 rounded-md"
                              tabIndex={0}
                              onKeyDown={(e) => {
                                if (e.key === "Enter")
                                  inputFileRef?.current?.click();
                              }}
                            >
                              <Image
                                src={upload}
                                alt="upload img"
                                className="h-5 w-5"
                              />
                              {value?.name || "Click to upload image"}
                            </label>
                          </>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter Your Email" {...field} />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="border" />
                <div className="xs:w-full lg:w-1/2 flex flex-col gap-2">
                  <p className="font-semibold text-lg">Social Links</p>
                  <FormField
                    control={form.control}
                    name="socialLinks.insta"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Instagram</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="https://www.instagram.com/collab"
                            {...field}
                            className="mt-0"
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="socialLinks.facebook"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Facebook</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="https://www.facebook.com/collab"
                            {...field}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="socialLinks.twitter"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Twitter</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="https://www.twitter.com/collab"
                            {...field}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="socialLinks.linkedin"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Linkedin</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="https://www.linkedin.com/collab"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="flex xs:float-right min-w-1/4 w-fit gap-3 xs:pt-6 lg:absolute lg:bottom-3 lg:right-3">
                <Button
                  variant={"secondary"}
                  onClick={() => setFormOnClose(formData?.action)}
                  className=" min-w-1/2 w-fit px-6 xs:text-[0.7rem] md:text-base"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="min-w-1/2 w-fit px-6 xs:text-[0.7rem] md:text-base flex gap-3"
                  disabled={loading}
                >
                  {loading && (
                    <Loader className="xs:h-3 xs:w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5 text-white" />
                  )}
                  Submit
                </Button>
              </div>
            </form>
          </div>
        </Form>
      )}
      <div
        className="z-50 absolute xs:bottom-4 lg:bottom-6 xs:right-4 md:right-10 lg:right-14 cursor-pointer"
        onClick={() => setFormOnClose(formData?.action)}
      >
        <div className="rounded-full bg-white xs:p-3 lg:p-4">
          <Image
            className={`xs:h-4 xs:w-4 md:h-6 md:w-6 lg:h-8 lg:w-8 transform transition duration-300 ${
              formData?.showModal ? "-rotate-45" : ""
            }`}
            src={plus}
            alt="plus icon"
          />
        </div>
      </div>
      {formData?.showModal && (
        <div className="h-screen fixed inset-0 z-40 bg-black/80" />
      )}
    </>
  );
};

export default FormWrapper;
