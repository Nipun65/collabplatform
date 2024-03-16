"use client";
import plus from "@/public/plus.svg";
import Image from "next/image";
import React, { useEffect } from "react";
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
import { useAddYourPostMutation, useUpdatePostMutation } from "@/redux/api";
import { useSession } from "next-auth/react";
import { formValue, setFormData } from "@/redux/PostSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import upload from "@/public/upload.svg";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  headline: z.string().min(2, {
    message: "Headline must be at least 2 characters.",
  }),
  description: z.string()?.optional(),
  email: z.string().email({ message: "Please Enter Valid Email" }),
  photo: z.object({
    data: z.string() as any,
    name: z.string(),
  }),
  socialLinks: z.object({
    insta: z.string().url({ message: "Please Enter Valid URL" }).optional(),
    facebook: z.string().url({ message: "Please Enter Valid URL" }).optional(),
    twitter: z.string().url({ message: "Please Enter Valid URL" }).optional(),
    linkedin: z.string().url({ message: "Please Enter Valid URL" }).optional(),
  }),
});

const FormWrapper = () => {
  const formData: any = useAppSelector(formValue);
  const dispatch = useAppDispatch();

  const [addYourPost, { isLoading, isSuccess, isError, error }] =
    useAddYourPostMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: formData?.data?.name || "",
      headline: formData?.data?.headline || "",
      description: formData?.data?.description || "",
      photo: formData?.data?.photo || ("" as any),
      email: formData?.data?.email || "",
      socialLinks: {
        linkedin: formData?.data?.socialLinks?.linkedin || "",
        facebook: formData?.data?.socialLinks?.facebook || "",
        insta: formData?.data?.socialLinks?.insta || "",
        twitter: formData?.data?.socialLinks?.twitter || "",
      },
    },
  });
  useEffect(() => {
    form.setValue("name", formData?.data?.name);
    form.setValue("headline", formData?.data?.headline);
    form.setValue("description", formData?.data?.description);
    form.setValue("email", formData?.data?.email);
    form.setValue("photo", { data: "", name: formData?.data?.image?.name });
    form.setValue("socialLinks", formData?.data?.socialLinks?.[0]);
  }, [formData]);

  const { data: session, status } = useSession();

  const [updatePost, { error: updatePostError }] = useUpdatePostMutation();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    let result;
    if (formData?.data?._id) {
      result = updatePost({
        ...formData?.data,
        ...values,
      });
    } else {
      result = await addYourPost({
        ...values,
        loggedInEmail: session?.user?.email,
      });
    }

    if (result) {
      dispatch(setFormData({ data: {}, showModal: false }));
    }
  }

  const handleImageChange = (e: React.ChangeEvent) => {
    const eTarget = e?.target as HTMLInputElement;

    if (eTarget.files) {
      const file = eTarget.files[0];
      previewFile(file);
    }
  };

  const previewFile = (file: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      form.setValue("photo", { data: reader.result, name: file?.name });
    };
  };

  return (
    <>
      {formData?.showModal && (
        <Form {...form}>
          <div className="z-50 bg-white h-[80%] w-[70%] m-auto shadow-lg rounded-md form-transition space-y-8 inset-0 absolute overflow-auto">
            <h3 className="text-xl font-bold p-3 h-[8%]">Your Post</h3>
            <div className="border" style={{ margin: 0 }} />
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="p-3 h-[88%]"
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
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter Description"
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
                    name="photo"
                    render={({ field: { onChange, value, ...rest } }) => (
                      <FormItem>
                        <FormLabel>Photo</FormLabel>
                        <FormControl>
                          <div>
                            <Input
                              {...rest}
                              type="file"
                              name="photo"
                              onChange={handleImageChange}
                              accept="image/*"
                              id="inputFile"
                              className="hidden"
                            />
                            <label
                              htmlFor="inputFile"
                              className="border px-3 py-2 flex items-center gap-2"
                            >
                              <Image
                                src={upload}
                                alt="upload img"
                                className="h-5 w-5"
                              />
                              {value?.name || "Click me to upload image"}
                            </label>
                          </div>
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

              <div className="flex w-1/4 gap-3 float-right xs:py-6 lg:py-0 lg:absolute lg:bottom-3 lg:right-3">
                <Button
                  variant={"secondary"}
                  onClick={() => {
                    // setShowForm(false);
                    dispatch(setFormData({ data: {}, showModal: false }));
                  }}
                  className="w-1/2"
                >
                  Cancel
                </Button>
                <Button type="submit" className="w-1/2">
                  Submit
                </Button>
              </div>
            </form>
          </div>
        </Form>
      )}
      <div
        className="z-50 absolute bottom-6 right-14 cursor-pointer"
        onClick={() => {
          dispatch(setFormData({ data: {}, showModal: !formData?.showModal }));
        }}
      >
        <div className="rounded-full bg-white p-4">
          <Image
            className={`h-8 w-8 transform transition duration-300 ${
              formData?.showModal ? "-rotate-45" : ""
            }`}
            src={plus}
            alt="plus icon"
          />
        </div>
      </div>
      {formData?.showModal && (
        // <div className="bg-black opacity-25 z-40 absolute inset-0 w-full h-screen transition" />
        <div className=" h-screen fixed inset-0 z-40 bg-black/80" />
      )}
    </>
  );
};

export default FormWrapper;
