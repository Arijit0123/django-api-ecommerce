

export default function AdminTable({ data, columns, onEdit, onDelete }) {
    return (
        <table border="1" cellPadding="10" style={{ width: "100%", marginTop: "20px" }}>
            <thead>
                <tr>
                    {columns.map((col) => (
                        <th key={col}>{col}</th>
                    ))}
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {data.map((row) => (
                    <tr key={row.id}>
                        {columns.map((col) => (
                            <td key={col}>{row[col]}</td>
                        ))}
                        <td>
                            <button onClick={() => onEdit(row)}>Edit</button>
                            <button onClick={() => onDelete(row.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
