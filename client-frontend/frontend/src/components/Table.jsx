// Table.jsx
// Generic table component for any tabular data

const Table = ({ columns, data, rowClassName, onRowClick }) => (
  <table className="incident-table">
    <thead>
      <tr>
        {columns.map(col => (
          <th key={col.key}>{col.header}</th>
        ))}
      </tr>
    </thead>
    <tbody>
      {data.map((row, idx) => (
        <tr
          key={row.id || row.name || idx}
          className={rowClassName ? rowClassName(row, idx) : ''}
          onClick={onRowClick ? () => onRowClick(row, idx) : undefined}
          style={onRowClick ? { cursor: 'pointer' } : {}}
        >
          {columns.map(col => (
            <td key={col.key}>
              {col.render ? col.render(row[col.key], row, idx) : row[col.key]}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
);

export default Table;
