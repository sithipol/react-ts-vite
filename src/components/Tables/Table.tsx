import React, { useState } from "react";
type Props = {
  itemsPerPage: number;
  data: {
    id: number;
    firstName: string;
    lastName: string;
    gender: string;
    birthDay: string;
  }[];
};

export default function Table({ itemsPerPage, data }: Props) {
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handleClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <div className="lg:pr-8 lg:pt-4 overflow-x-auto">
        <table className=" table-auto min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-400">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-dark-500 uppercase tracking-wider">
                Profile Picture
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-dark-500 uppercase tracking-wider">
                First Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-dark-500 uppercase tracking-wider">
                Last Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-dark-500 uppercase tracking-wider">
                Gender
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-dark-500 uppercase tracking-wider">
                Birthday
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-dark-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item) => (
              <tr key={item.id} className="bg-white">
                <td className="px-6 py-4 whitespace-nowrap">{item.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {item.firstName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{item.lastName}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.gender}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.birthDay}</td>
                <td className="px-6 py-4 whitespace-nowrap"></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center items-center mt-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            className={`py-1 px-3 rounded ${
              index + 1 === currentPage
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => handleClick(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
