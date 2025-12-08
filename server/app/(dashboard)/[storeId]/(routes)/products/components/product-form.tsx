"use client";

import { Heading } from "@/components/heading";
import ImageUpload from "@/components/image-upload";
import ImageProductUpload from "@/components/images-upload-product";
import { AlertModal } from "@/components/modal/alert-modal";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Category, Cuisine, Product, Size } from "@/type-db";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import ProductPreview from "./product-review";

interface ProductFormProps {
  initialData: Product;
  categories: Category[];
  cuisines: Cuisine[];
  sizes: Size[];
}
const formSchema = z.object({
  name: z.string().min(1),
  price: z.coerce.number().min(1),
  images: z.object({ url: z.string() }).array(),
  isFeatured: z.boolean().default(false).optional(),
  isArchived: z.boolean().default(false).optional(),
  qty: z.coerce.number().min(1).default(1),
  discountPrice: z.coerce.number().default(1),
  size: z.string().min(1),
  cuisine: z.string().min(1),
  category: z.string().min(1),
  description: z.string(),
});
const ProductForm = ({
  initialData,
  cuisines,
  sizes,
  categories,
}: ProductFormProps) => {
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      price: 1000,
      images: [],
      isFeatured: true,
      isArchived: false,
      qty: 1,
      discountPrice: 1000,
      size: "",
      cuisine: "",
      category: "",
      description: "",
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const params = useParams();
  const router = useRouter();
  const urlBack = `/${params.storeId}/products`;

  const [formattedPrice, setFormattedPrice] = useState("");
  const [formattedDiscount, setFormattedDiscount] = useState("");

  // 🪄 Cập nhật format khi form thay đổi
  useEffect(() => {
    const formatCurrency = (value: number) =>
      new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(value);

    setFormattedPrice(formatCurrency(form.getValues("price") || 0));
    setFormattedDiscount(formatCurrency(form.getValues("discountPrice") || 0));
  }, [form]);

  // 🧩 Hàm xử lý nhập tiền
  const handleCurrencyChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: "price" | "discountPrice"
  ) => {
    const rawValue = e.target.value.replace(/[^\d]/g, ""); // bỏ ký tự không phải số
    const numericValue = parseInt(rawValue || "0", 10);
    form.setValue(fieldName, numericValue);
    const formatted = new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(numericValue);
    if (fieldName === "price") setFormattedPrice(formatted);
    else setFormattedDiscount(formatted);
  };

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      if (initialData) {
        await axios.patch(
          `/api/stores/${params.storeId}/products/${params.productId}`,
          data
        );
      } else {
        await axios.post(`/api/stores/${params.storeId}/products`, data);
      }
      toast.success("Success!");
      router.push(urlBack);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      router.refresh();
      setIsLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setIsLoading(true);

      await axios.delete(
        `/api/stores/${params.storeId}/products/${params.cuisineId}`
      );

      toast.success("Success!");
      router.refresh();
      router.push(urlBack);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      router.refresh();
      setIsLoading(false);
    }
  };

  const title = initialData ? "Edit product" : "Create product";
  const description = initialData ? "Edit a product" : "Create a product";
  const actionButtonLabel = initialData ? "Update" : "Create";

  return (
    <div className="grid grid-cols-3 gap-10 items-start mt-10">
      <div className="col-span-2 space-y-8">
        <AlertModal
          isOpen={open}
          onClose={() => setOpen(false)}
          onConfirm={onDelete}
          loading={isLoading}
        />

        <div className="bg-gradient-to-br from-green-50 to-white p-6 rounded-3xl shadow-sm">
          <div className="flex justify-between items-center pb-4">
            <Heading title={title} description={description} />
            {initialData && (
              <Button
                variant="destructive"
                size="icon"
                className="rounded-full hover:scale-110 transition-transform"
                onClick={() => setOpen(true)}
              >
                <Trash className="h-5 w-5" />
              </Button>
            )}
          </div>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 mt-6"
          >
            {/* IMAGE */}
            <div className="bg-white p-6 rounded-2xl shadow-md border border-green-100 transition hover:shadow-xl">
              <FormField
                control={form.control}
                name="images"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-green-700 font-bold text-lg">
                      Product Images
                    </FormLabel>
                    <FormControl>
                      <ImageProductUpload
                        value={field.value.map((image) => image.url)}
                        onChange={(urls) =>
                          field.onChange(urls.map((url) => ({ url })))
                        }
                        onRemove={(url) =>
                          field.onChange(
                            field.value.filter((current) => current.url !== url)
                          )
                        }
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            {/* MAIN GRID */}
            <div className="grid grid-cols-2 gap-6">
              {/* LEFT CARD */}
              <div className="bg-white p-6 rounded-2xl shadow-md border border-green-100 transition hover:shadow-xl space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold">
                        Product Name
                      </FormLabel>
                      <Input
                        {...field}
                        placeholder="Fresh vegetable..."
                        className="focus-visible:ring-green-500"
                        disabled={isLoading}
                      />
                    </FormItem>
                  )}
                />

                <FormField
                  name="description"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <Textarea
                        {...field}
                        disabled={isLoading}
                        className="focus-visible:ring-green-500"
                      />
                    </FormItem>
                  )}
                />
              </div>

              {/* RIGHT CARD */}
              <div className="bg-white p-6 rounded-2xl shadow-md border border-green-100 transition hover:shadow-xl space-y-4">
                {/* Price Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    name="price"
                    control={form.control}
                    render={() => (
                      <FormItem>
                        <FormLabel>Price</FormLabel>
                        <Input
                          value={formattedPrice}
                          onChange={(e) => handleCurrencyChange(e, "price")}
                          disabled={isLoading}
                          className="focus-visible:ring-green-500"
                        />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="discountPrice"
                    control={form.control}
                    render={() => (
                      <FormItem>
                        <FormLabel>Discount Price</FormLabel>
                        <Input
                          value={formattedDiscount}
                          onChange={(e) =>
                            handleCurrencyChange(e, "discountPrice")
                          }
                          disabled={isLoading}
                          className="focus-visible:ring-green-500"
                        />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Selects */}
                <div className="grid grid-cols-3 gap-4">
                  {/* Category */}
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select
                          disabled={isLoading}
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem
                                key={category.id}
                                value={category.name}
                              >
                                {category.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Size */}
                  <FormField
                    control={form.control}
                    name="size"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Size</FormLabel>
                        <Select
                          disabled={isLoading}
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a size" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {sizes.map((size) => (
                              <SelectItem key={size.id} value={size.name}>
                                {size.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* Cuisine */}
                  <FormField
                    control={form.control}
                    name="cuisine"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cuisine</FormLabel>
                        <Select
                          disabled={isLoading}
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {cuisines.map((cuisine) => (
                              <SelectItem key={cuisine.id} value={cuisine.name}>
                                {cuisine.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Checkboxes + qty */}
                <div className="grid grid-cols-3 gap-4">
                  <FormField
                    name="qty"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Stock</FormLabel>
                        <Input
                          {...field}
                          type="number"
                          className="focus-visible:ring-green-500"
                        />
                      </FormItem>
                    )}
                  />

                  <FormField
                    name="isFeatured"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem className="flex items-center gap-2">
                        <Checkbox
                          onChange={field.onChange}
                          checked={field.value}
                        />
                        <FormLabel>Featured</FormLabel>
                      </FormItem>
                    )}
                  />

                  <FormField
                    name="isArchived"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem className="flex items-center gap-2">
                        <Checkbox
                          onChange={field.onChange}
                          checked={field.value}
                        />
                        <FormLabel>Archive</FormLabel>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>

            {/* Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-6 text-lg font-semibold rounded-xl hover:scale-105 transition-transform"
            >
              {actionButtonLabel}
            </Button>
          </form>
        </Form>
      </div>
      <div className="sticky top-28">
        <ProductPreview
          name={form.watch("name")}
          price={form.watch("price")}
          discountPrice={form.watch("discountPrice")}
          description={form.watch("description")}
          image={form.watch("images")[0]?.url}
          category={form.watch("category")}
        />
      </div>
    </div>
  );
};

export default ProductForm;
