import { FC, memo, ReactNode, useState } from 'react';
import { Table, TableColumnsType } from 'antd';
import { useTranslation } from 'react-i18next';
import { ColumnType } from 'antd/es/table';
import { TableRowSelection } from 'antd/es/table/interface';
import { FieldValues } from 'react-hook-form';
import NewActions from './NewActions';
import clsx from 'clsx';
import useFetch from '../../hooks/useFetch';
import { useSearchParams } from 'react-router';

/**
 * ==> props interface
 */
interface IProps {
  cols?: ColumnType[] | undefined;
  endPoint?: string;
  delEndPoint?: string;
  hasContainer?: boolean;
  getMenu?: (
    id: string,
    record: FieldValues
  ) => Array<{ key: string; label: ReactNode }>;
  query?: string | undefined;
  hasSelectRows?: boolean;
  hasSperateData?: boolean;
  sperateData?: FieldValues;
  noPagination?: boolean;
  customClass?: string;
  color?: string;
}
interface TableItem {
  id: string;
  [key: number]: number;
}

/**
 * ==> Component
 */
const CustomTable: FC<IProps> = ({
  cols = [],
  endPoint,
  query,
  getMenu,
  hasSelectRows = false,
  hasContainer = true,
  hasSperateData = false,
  sperateData = [],
  noPagination = true,
  customClass = '',
  color = ''
}) => {
  // vars
  const [searchParams, setSearchParams] = useSearchParams();
  const pageParam = Number(searchParams.get('page')) || 1;
  const pageCountParam = Number(searchParams.get('per_page')) || 10;
  // const [currentPage, setCurrentPage] = useState(1);
  // const [pageSize, setPageSize] = useState(10);
  const { t } = useTranslation();

  const endpoint = `${endPoint}?page=${pageParam}&per_page=${pageCountParam}${
    query ? query : ''
  }`;
  const { data: table, isLoading: loading } = useFetch({
    endpoint,
    keys: [endPoint ?? '', pageParam, pageCountParam, query ? query : ''],
    enabled: !!endPoint
  });

  const tableDataView = hasSperateData ? sperateData : table?.data;

  // table columns
  const columns: TableColumnsType<IProps> = getMenu
    ? [
        {
          title: t('table.id'),
          dataIndex: 'rowNumber',
          align: 'center',
          render: (_: unknown, __: unknown, index: number) =>
            hasSperateData
              ? index + 1
              : (pageParam - 1) * pageCountParam + index + 1,

          fixed: 'left'
        },
        ...cols,

        {
          title: t('table.action'),
          dataIndex: 'action',
          align: 'center',
          responsive: ['xs', 'sm', 'md', 'lg', 'xl'],
          render: (id: string, record: FieldValues) =>
            getMenu ? <NewActions menuItems={getMenu(id, record)} /> : null,
          fixed: 'right'
        }
      ]
    : [
        {
          title: t('table.id'),
          dataIndex: 'rowNumber',
          align: 'center',
          render: (_: unknown, __: unknown, index: number) =>
            hasSperateData
              ? index + 1
              : (pageParam - 1) * pageCountParam + index + 1,

          fixed: 'left'
        },
        ...cols
      ];

  // handle data
  const source = tableDataView?.map((item: TableItem) => {
    const dynamicFields = (cols ?? []).reduce<Record<string, number>>(
      (acc: Record<string, number>, col: ColumnType) => {
        const column = col as ColumnType;

        const idx = column.dataIndex as number;
        if (column.dataIndex) {
          acc[idx] = item[idx];
        }
        return acc;
      },
      {}
    );

    return {
      key: item.id,
      ...item,
      ...dynamicFields,
      action: item.id
    };
  });

  // pagination function
  const handlePaginationChange = (page: number, size?: number) => {
    const newSize = size || pageCountParam;
    if (!hasSperateData) {
      const params = new URLSearchParams(searchParams);

      if (page > 1 || newSize !== 10) {
        params.set('page', page.toString());
        params.set('per_page', newSize.toString());
      } else {
        params.delete('page');
        params.delete('per_page');
      }

      setSearchParams(params);
    }
    // if (size && size !== pageSize) {
    //   setPageSize(size);
    // }
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection: TableRowSelection = {
    selectedRowKeys,
    onChange: onSelectChange
  };

  return (
    <>
      <section className="pt-0 ">
        <div
          className={hasContainer ? 'container-fluid flex-grow' : 'flex-grow'}
        >
          <Table
            size="small"
            bordered
            className={clsx(`mt-4 ${customClass}`)}
            loading={{
              spinning: loading,
              size: 'large'
            }}
            style={{
              ['--primary' as string]: color
            }}
            rowSelection={hasSelectRows ? rowSelection : undefined}
            dataSource={source}
            columns={columns}
            pagination={
              noPagination
                ? {
                    current: pageParam,
                    showSizeChanger: true,
                    pageSizeOptions: ['10', '25', '50', '100'],
                    pageSize: pageCountParam,
                    total: table?.total || 0,
                    onChange: handlePaginationChange,
                    onShowSizeChange: handlePaginationChange,
                    position: ['bottomCenter']
                  }
                : false
            }
            scroll={{ x: 'max-content' }}
          />
        </div>
      </section>
    </>
  );
};

export default memo(CustomTable);
