import { useEffect, useState } from "react";
import { getCustomers } from "../../API";
// import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import {createColumnHelper,flexRender,getCoreRowModel,getFilteredRowModel,getPaginationRowModel,useReactTable} from "@tanstack/react-table";

function Customers() {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    setLoading(true);
    getCustomers().then((res) => {
      setDataSource(res.users);
      setLoading(false);
    });
  }, []);

  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor("", {
      id: "srno",
      cell: (info) => <span>{info.row.index + 1}</span>,
      header: "Sr.No.",
    }),
    columnHelper.accessor("empId", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Employee ID",
    }),
    columnHelper.accessor("name", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: " Name",
    }),
    columnHelper.accessor("avgMarks", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Average Marks",
    }),
  ];
  const [data] = useState(() => []);
  const [globalFilter, setGlobalFilter] = useState("");
  
  const [search, setsearch] = useState("");

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
    },
    getFilteredRowModel: getFilteredRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const data2 = [
    { srno: 1, empId: 'T50477', name: "Rishi" , avgMarks : 12 },
    { srno: 2, empId: 'T50498', name: "Vikas" , avgMarks : 11 },
    { srno: 3, empId: 'T50481', name: "Rutika" , avgMarks : 10 },
    { srno: 4, empId: 'T50482', name: "Shivkanya" , avgMarks : 19 },
    { srno: 5, empId: 'T50494', name: "Trupti" , avgMarks : 25 },
  ] 

  return (
    <>
 
    <div className=" mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
      <h1 className="text-3xl font-semibold text-black my-10">Table of Trainee ( Admin View )</h1>

      <div class="" x-data="{ search: '' }">
          <div class=" mb-2 w-50 flex rounded-md">
              <svg class="w-5 h-8 pl-1 text-gray-500 dark:text-gray-400 bg-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
              </svg>
            <input 
              type="search" 
              onChange={(e) => {setsearch(e.target.value)}} 
              class=" h-8 px-4 py-1 w-1/3 text-gray-800  focus:outline-none" 
              placeholder="Search Trainee by Id / Name" 
              x-model="search"/>
          </div>
      </div>
      
      <table className="shadow-sm p-6 h-max w-full text-left mb-5 border-spacing-0" id= "table-to-xls">
        <thead className="bg-gray-200 p-3 h-16 ">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="capitalize px-4 py-2 ">
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
            {data2.length ? (
              data2.filter((item) => {
                return search.toLowerCase() === '' ? item : item.empId.toLowerCase().includes(search) || item.name.toLowerCase().includes(search)
              }).map((row, i) => (
                <tr
                  key={row.srno}
                  className={`
                  ${i % 2 === 0 ? "bg-white" : "bg-white" } border-b border-gray-300 h-16
                  `}
                >
                  {Object.entries(row).map(([key,value]) => (
                    <td key={key} className="px-4 py-2 ">
                      {value}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr className="text-center h-32">
                <td colSpan={12}>No Record Found!</td>
              </tr>
            )}
          </tbody>
      </table>
      {/* Pagination */}
      <div className="flex items-center justify-end mt-2 gap-2">
          <button
            onClick={ () => { table.previousPage() }} 
            disabled = {!table.getCanPreviousPage()}
            className="p-1 border-2 border-black disabled:opacity-30 px-2">{"<"}
          </button>
          <button
            onClick={ () => { table.nextPage() }} 
            disabled = {!table.getCanNextPage()}
            className="p-1 border-2 border-black disabled:opacity-30 px-2">{">"}
          </button>
          <span className="flex items-center gap-1">
              <div>Page </div>
              <strong>
                {table.getState().pagination.pageIndex + 1} of{" "} {table.getPageCount() +1 }
              </strong>
          </span>
          <span className="flex items-center gap-1">
              | Go to Page :
              <input
                type = "number"
                className=" pl-2 w-10"
                defaultValue={table.getState().pagination.pageIndex + 1}
                onChange = { (e) => {
                  const page = e.target.value ? Number(e.target.value) -1 : 0;
                  table.setPageIndex(page);
                }}
              ></input>
          </span>     
          {/* <select
            value = {table.getState().pagination.pageSize}
            onChange = {(e) => {
              table.setPageSize(Number(e.target.value))
            }}
            className="p-0 w-24"
          >
            {
              [2,4,10,20,30,40,50].map((pageSize) => (
                <option key={pageSize} value= {pageSize}> Show {pageSize}</option>
              ))
            }
          </select>        */}
      </div>
      {/* <ReactHTMLTableToExcel
        id="test-table-xls-button"
        className="download-btn" class="bg-[#0A1C3E] hover:bg-grey text-grey-darkest font-bold py-2 px-4 rounded inline-flex items-center"
        table="table-to-xls"
        filename="Trainee"
        sheet="tablexls"
        buttonText= { 
            <div className="bg-[#0A1C3E] text-white hover:bg-white hover:text-[#0A1C3E] border-solid border-2 border-[#0A1C3E]  text-grey-darkest font-bold py-3 px-3 rounded mb-4 inline-flex items-center"> 
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5 mr-2">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                </svg>Download in XLS Format
            </div>
        }/> */}
        
    </div>

    </>
  );
}
export default Customers;
