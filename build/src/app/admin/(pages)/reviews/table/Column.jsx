import format from "date-fns/format";
import { AiOutlineArrowUp, AiOutlineArrowDown } from "react-icons/ai";
import ReviewActionsCell from "./ReviewActionsCell";
export var columns = [
    {
        accessorKey: "stars",
        header: function (_a) {
            var column = _a.column;
            return (<button className="flex justify-center items-center gap-1" onClick={function () { return column.toggleSorting(column.getIsSorted === "asc"); }}>
          Stars
          <span className="flex items-center ">
            <AiOutlineArrowUp />
            <AiOutlineArrowDown />
          </span>
        </button>);
        },
        cell: function (_a) {
            var row = _a.row;
            var value = row.getValue("stars");
            return <span>{value}</span>;
        },
    },
    {
        accessorKey: "text",
        header: "Text",
        cell: function (_a) {
            var row = _a.row;
            var text = row.getValue("text");
            return <span>{text}</span>;
        },
    },
    {
        accessorKey: "createdAt",
        header: "Created at",
        cell: function (_a) {
            var row = _a.row;
            var value = row.getValue("createdAt");
            return <span>{format(value, "MMM do yyyy")}</span>;
        },
    },
    {
        accessorKey: "actions",
        header: "Actions",
        cell: function (_a) {
            var row = _a.row;
            return <ReviewActionsCell reviewId={row.original.id}/>;
        },
    },
];
