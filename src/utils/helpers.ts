import { AxiosError } from "axios";
import { useEffect } from "react";
import { useLocation } from "react-router";
import { toast } from "react-toastify";

export const capitalize = <T extends string>(s: T) => (s[0].toUpperCase() + s.slice(1)) as Capitalize<typeof s>;

export const handleError = (err: Error, errorTypes?: string[]) => {
  if (err instanceof AxiosError) {
    const error = err.response?.data.errors;

    if (error && errorTypes) {
      for (const type of errorTypes) {
        if (error[type]) {
          if (Array.isArray(error[type]) && error[type].length > 0) {
            toast.error(error[type][0]);
            return;
          }
        }
      }
    } else {
      toast.error(err.response?.data.message);
      return;
    }

    toast.error("Gagal, periksa ulang data anda");
  }
};

export const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};
