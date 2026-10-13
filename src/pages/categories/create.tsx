

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import type { z } from "zod";

import { mapFieldsOnError } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import PageHeader from "@/components/common/page-header";
import SelectCommand from "@/components/common/select-command";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/form";

import { batchCreateInputSchema } from "./schema/schema";
import { createBatch } from "./service/service";
import type { T_UseQueryError } from "@/types/common";

type T_BatchCreateSchema = z.infer<typeof batchCreateInputSchema>;

const CreateBatch = () => {
  const navigate = useNavigate();

  const form = useForm<T_BatchCreateSchema>({
    resolver: zodResolver(batchCreateInputSchema),
    defaultValues: {
      productId: "",
      batchNumber: "",
      costPrice: 0,
      price: 0,
      quantity: 0,
    },
  });

  const createBatchMutation = useMutation({
    mutationFn: createBatch,

    onSuccess: () => {
      toast.success("Batch created successfully.");
      return navigate("/batch");
    },

    onError: (error: AxiosError<T_UseQueryError>) => {
      mapFieldsOnError(error, form.setError);
      return toast.error(
        error.response?.data?.message ?? "Failed to create batch."
      );
    },
  });

  return (
    <div className="p-5">
      <title>Create Batch | Billing System</title>

      <PageHeader
        title="Create Batch"
        breadCrumbItems={[
          { title: "Home", link: "/" },
          { title: "Batches", link: "/batch" },
          { title: "Create", link: "/batch/create" },
        ]}
      />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) => {
            createBatchMutation.mutate(data);
          })}
        >
          <div className="grid grid-cols-1 gap-y-3 sm:grid-cols-2 sm:gap-x-3">
            <FormField
              control={form.control}
              name="productId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product</FormLabel>
                  <FormControl>
                    <SelectCommand
                      value={field.value}
                      onChange={field.onChange}
                      
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="batchNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Batch Number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter batch number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="costPrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cost Price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="0"
                      step="any"
                      placeholder="Enter cost price"
                      value={field.value}
                      onChange={(event) => {
                        field.onChange(event.target.valueAsNumber);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Selling Price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="0"
                      step="any"
                      placeholder="Enter selling price"
                      value={field.value}
                      onChange={(event) => {
                        field.onChange(event.target.valueAsNumber);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantity</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="0"
                      step="1"
                      placeholder="Enter quantity"
                      value={field.value}
                      onChange={(event) => {
                        field.onChange(event.target.valueAsNumber);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="mb-5 mt-5 flex items-center justify-end space-x-3">
            <Link to="/batch">
              <Button
                type="button"
                disabled={createBatchMutation.isPending}
                variant="secondary"
              >
                Cancel
              </Button>
            </Link>

            <Button
              type="submit"
              loading={createBatchMutation.isPending}
              disabled={createBatchMutation.isPending}
            >
              Create
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreateBatch;
```