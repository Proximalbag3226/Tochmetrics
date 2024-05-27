import React from 'react';
import { Table, Button } from 'reactstrap';
import * as BsIcons from "react-icons/bs";
import * as MdIcons from "react-icons/md";

const DataTable = ({ data, fields, onEdit, onDelete }) => {
  return (
    <Table>
      <thead>
        <tr>
          {fields.map((field) => (
            <th key={field}>{field}</th>
          ))}
          <th>Acción</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            {fields.map((field) => (
              <td key={field}>{item[field]}</td>
            ))}
            <td>
              <Button color="primary" onClick={() => onEdit(item)}><BsIcons.BsPencilSquare/>{" "}Editar</Button>{' '}
              <Button color="danger" onClick={() => onDelete(item)}><MdIcons.MdDelete/>{" "}Eliminar</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default DataTable;
