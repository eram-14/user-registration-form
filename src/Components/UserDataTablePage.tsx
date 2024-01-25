import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import DataTables from './DataTables';

const UserDataTablePage: React.FC = () => {
  const formDataStep1 = useSelector((state: RootState) => state.user.formDataStep1);
  const formDataStep2 = useSelector((state: RootState) => state.user.formDataStep2);

  const dataTableData = React.useMemo(() => {
    return [formDataStep1, formDataStep2].filter(Boolean);
  }, [formDataStep1, formDataStep2]);

  return (
    <div style={{ margin: '20px', padding: '20px' }}>
      <DataTables data={dataTableData} />
    </div>
  );
};

export default UserDataTablePage;
