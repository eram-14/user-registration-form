import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-dt/css/jquery.dataTables.css';

interface DataTablesProps {
  data: any[];
}

const DataTables: React.FC<DataTablesProps> = ({ data }) => {
  const allFormData = useSelector((state: RootState) => state.user.allFormData);
  const tableRef = useRef<HTMLTableElement>(null);

  useEffect(() => {
    if (tableRef.current) {
      $(tableRef.current).DataTable();
    }
  }, [allFormData]);

  const columns = [
    'Name',
    'Age',
    'Sex',
    'Mobile',
    'ID Type',
    'Govt ID',
    'Address',
    'State',
    'City',
    'Country',
    'Pincode',
  ];

  return (
    <TableContainer component={Paper}>
      <Table ref={tableRef}>
        <TableHead>
          <TableRow>
            {columns.map((column) => <TableCell key={column}>{column}</TableCell>)}
          </TableRow>
        </TableHead>
        <TableBody>
          {allFormData.map((formData, index) => (
            <TableRow key={index}>
              {columns.map((column) => (
                <TableCell key={column}>{formData[column.toLowerCase().replaceAll(' ', '_')]}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DataTables;
