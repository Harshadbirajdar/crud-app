const Table = ({ colLength }: { colLength: number }) => {
  return (
    <>
      {Array(5)
        .fill("")
        .map((d, i) => (
          <tr key={i} className="animate-pulse bg-gray-50">
            {Array(colLength)
              .fill("")
              .map((data, index) => (
                <td
                  key={index}
                  className="rounded px-6 py-4 pl-4 pr-3 text-sm font-medium text-gray-500 sm:pl-6"
                >
                  <div className="h-2 bg-slate-300 rounded"></div>
                </td>
              ))}
          </tr>
        ))}
    </>
  );
};

export default Table;
