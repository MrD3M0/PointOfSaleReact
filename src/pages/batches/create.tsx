
import PageHeader from "@/components/common/page-header";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/form";
import SelectCommand from "@/components/common/select-command";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { batchCreateInputSchema } from "./schema/schema";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createBatch } from "./service/service";
import { toast } from "sonner";
import { mapFieldsOnError } from "@/lib/utils";
import type { AxiosError } from "axios";
import type { T_UseQueryError } from "@/types/common";
import { getAllProducts } from "../product/service/service";
import { useNavigate } from "react-router";
import { QUERY_KEYS } from "@/lib/query-keys";



const CreateBatch = () => {

  const navigate = useNavigate();

  const form = useForm({
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
      toast.error(error.response?.data?.message ?? "Failed to create batch.");
    },
  });

  const productQuery = useQuery({
    queryFn: ()=>getAllProducts({limit:-1}),
    queryKey: [QUERY_KEYS.PRODUCT_LIST]
  })



  return (
    <div>
      <PageHeader
        title="Create Batch"
        breadCrumbItems={[
          { title: "Home", link: "/" },
          { title: "Batches", link: "/batch" },
          { title: "Create Batch", link: "/batch/create" },
        ]}
      />

      <div className="px-8 py-6">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="productId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product</FormLabel>
                  <FormControl>
                    <SelectCommand
                      {...field}
                      options={productQuery.data?.data?.data?.map((product) => ({
                        label: product.name,
                        value: product.id,
                      }))}
                      loading={productQuery.isLoading}
                      placeholder="Select a Product"
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
                      {...field}
                      placeholder="Enter batch number"
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
                      placeholder="Eg: 150"
                      value={field.value as number}
                      onChange={field.onChange}
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
                      placeholder="Eg: 150"
                      value={field.value as number}
                      onChange={field.onChange}
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
                      {...field}
                      onChange={(event) =>
                        field.onChange(event.target.valueAsNumber)
                      }
                      className="w-full rounded-md border px-3 py-2"
                      placeholder="Enter quantity"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={createBatchMutation.isPending}
              loading={createBatchMutation.isPending}
            >
              Create
            </Button>
            <Button variant="outline" disabled={createBatchMutation.isPending} onClick={() => navigate("/batch")}>Cancel</Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CreateBatch;
