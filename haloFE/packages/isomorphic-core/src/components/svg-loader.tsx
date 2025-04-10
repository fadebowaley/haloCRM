"use client";

import React from "react";
import { Loader } from "rizzui";

export default function SVGLoader({ fileName }: { fileName: string }) {
  const SvgComponent = React.lazy(() => import(`./icons/${fileName}`));

  return (
    <React.Suspense fallback={<Loader variant="spinner" />}>
      <SvgComponent />
    </React.Suspense>
  );
}
