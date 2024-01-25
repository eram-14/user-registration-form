import React, { useEffect, useRef, useMemo } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-dt/css/jquery.dataTables.css';

const USER_DATA_KEY = 'userFormData';

const DataTables: React.FC = () => {
  const tableRef = useRef<HTMLTableElement>(null);

  const sessionData: any[] = useMemo(() => {
    const storedData = sessionStorage.getItem(USER_DATA_KEY);
    return storedData ? JSON.parse(storedData) : [];
  }, []);

  useEffect(() => {
    if (tableRef.current) {
      $(tableRef.current).DataTable();
    }
  }, [sessionData]);

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
    <div style={{ margin: '20px', padding: '20px' }}>
      <TableContainer component={Paper}>
        <Table ref={tableRef}>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column} sx={{ padding: '10px', background: '#19caca' }}>
                  {column}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {sessionData.map((formData, index) => (
              <TableRow key={index}>
                {columns.map((column) => (
                  <TableCell sx={{ padding: '1rem !important' }} key={column} >
                    {formData[column.toLowerCase().replaceAll(' ', '_')]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default DataTables;
