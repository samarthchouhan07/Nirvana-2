import format from "date-fns/format";
import { FaTrash } from "react-icons/fa";
import { AiOutlineArrowUp, AiOutlineArrowDown } from "react-icons/ai";
import {useReviewHook} from "@/app/admin/hooks/review-hook"
import ReviewActionsCell from "./ReviewActionsCell";

export const columns = [
  {
    accessorKey: "stars",
    header: ({ column }: any) => {
      return (
        <button
          className="flex justify-center items-center gap-1"
          onClick={() => column.toggleSorting(column.getIsSorted === "asc")}
        >
          Stars
          <span className="flex items-center ">
            <AiOutlineArrowUp />
            <AiOutlineArrowDown />
          </span>
        </button>
      );
    },
    cell: ({ row }: any) => {
      const value = row.getValue("stars");
      return <span>{value}</span>;
    },
  },
  {
    accessorKey: "text",
    header: "Text",
    cell: ({ row }: any) => {
      const text = row.getValue("text");
      return <span>{text}</span>;
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created at",
    cell: ({ row }: any) => {
      const value = row.getValue("createdAt");
      return <span>{format(value, "MMM do yyyy")}</span>;
    },
  },
  {
    accessorKey:"actions",
    header:"Actions",
    cell: ({ row }: any) => <ReviewActionsCell reviewId={row.original.id} />,
},
];
