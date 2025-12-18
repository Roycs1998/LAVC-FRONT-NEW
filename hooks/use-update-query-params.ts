"use client";

import { useCallback } from "react";

import { usePathname, useSearchParams, useRouter } from "next/navigation";

const useUpdateQueryParams = <TParams extends Record<string, unknown>>() => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  return useCallback(
    (newParams: Partial<Record<keyof TParams, string | number | null>>) => {
      const currentParams = new URLSearchParams(searchParams.toString());

      Object.entries(newParams).forEach(([key, value]) => {
        if (value === null || value === "") {
          currentParams.delete(key);
        } else {
          currentParams.set(key, String(value));
        }
      });

      router.push(`${pathname}?${currentParams.toString()}`, { scroll: false });
    },
    [pathname, searchParams, router]
  );
};

export default useUpdateQueryParams;
