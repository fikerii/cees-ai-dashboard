import { format, parseISO } from "date-fns";
import { id } from "date-fns/locale";
// import CurrencyInput from "react-currency-input-field"; // for auto-formatting currency input

export const currencyIdr = new Intl.NumberFormat(["ban", "id"], {
  style: "currency",
  currency: "IDR",
});

// export const formatDate = (dateString: string): string => {
//   const [year, month, day] = dateString.split("-");
//   return `${day}/${month}/${year}`;
// };

export const formatDate = (dateString: string): string => {
  const parsedDate = parseISO(dateString);
  const formattedDate = format(parsedDate, "dd/MM/yyyy", { locale: id });
  const dayOfWeek = format(parsedDate, "EEEE", { locale: id });
  return `${dayOfWeek}, ${formattedDate}`;
};

// export const formatBuktiPembayaran = (bukti: string): string => {
//   const modifiedString = bukti.replace(" ", "%20");
//   const link = `${import.meta.env.VITE_API_BASE_URL}getImage?foto=${modifiedString}`;
//   return link;
// };
