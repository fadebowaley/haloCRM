"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import {
  INVOICE_BUILDER_DEFAULT_VALUE,
  InvoiceType,
  invoiceBuilderSchema,
} from "./invoice-builder.schema";
import CalcPayBlock from "./invoice-details/calc-pay-block";
import FirstBlock from "./invoice-details/first-block";
import OthersBlock from "./invoice-details/others-block";
import SecondBlock from "./invoice-details/second-block";
import TableBlock from "./invoice-details/table-block";
import { InvoicePrint } from "./invoice-print";

export default function InvoiceBuilder({ printRef }: { printRef: any }) {
  const methods = useForm<InvoiceType>({
    mode: "onChange",
    defaultValues: INVOICE_BUILDER_DEFAULT_VALUE,
    resolver: zodResolver(invoiceBuilderSchema),
  });

  const onSubmit: SubmitHandler<InvoiceType> = (data) => {};

  let subTotal = methods.watch("invoiceTable").reduce((acc, item) => {
    if (!item.quantity || !item.rate) return acc;
    return acc + item.quantity * item.rate;
  }, 0);

  let totalTax = methods.watch("invoiceTable").reduce((acc, item) => {
    return acc + item.tax;
  }, 0);

  return (
    <>
      <InvoicePrint
        ref={printRef}
        subTotal={subTotal}
        totalTax={totalTax}
        data={methods.watch()}
      />
      <div className="rounded-2xl p-8">
        <div className="custom-scrollbar overflow-x-auto scroll-smooth w-full">
          <FormProvider {...methods}>
            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              className="mx-auto w-[840px] rounded-xl border border-gray-200 bg-white p-10 shadow-sm"
            >
              <FirstBlock setValue={methods.setValue} />
              <SecondBlock />
              <TableBlock />
              <CalcPayBlock subTotal={subTotal} totalTax={totalTax} />
              <OthersBlock />
            </form>
          </FormProvider>
        </div>
      </div>
    </>
  );
}
