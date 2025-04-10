import { FC, memo, ReactNode, useEffect, useState } from 'react';
import { Table, TableColumnsType } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { ColumnType } from 'antd/es/table';
import { TableRowSelection } from 'antd/es/table/interface';
import { FieldValues } from 'react-hook-form';
import { getData } from '../../lib/utils/SendRequestes';
import NewActions from './NewActions';

/**
 * ==> props interface
 */
interface IProps {
  cols?: ColumnType[] | undefined;
  endPoint?: string;
  delEndPoint?: string;
  getMenu?: (
    id: string,
    record: FieldValues
  ) => Array<{ key: string; label: ReactNode }>;
  query?: string | undefined;
  hasSelectRows?: boolean;
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
  hasSelectRows = false
}) => {
  // vars
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { i18n, t } = useTranslation();
  const lang = i18n.language;

  // fetch data
  const { data: table, isLoading: loading } = useQuery({
    queryKey: [endPoint, lang, currentPage, pageSize, query ? query : ''],
    queryFn: () =>
      getData(
        `${endPoint}?page=${currentPage}&page_count=${pageSize}${
          query ? query : ''
        }`
      ),
    retry: false
  });
  useEffect(() => {
    setCurrentPage(1); // Reset to page 1 when the query changes
  }, [query]);
  // table columns
  const columns: TableColumnsType<IProps> = getMenu
    ? [
        {
          title: t('table.id'),
          dataIndex: 'rowNumber',
          align: 'center',
          render: (_: unknown, __: unknown, index: number) =>
            table?.meta?.total - ((currentPage - 1) * pageSize + index),

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
            table?.meta?.total - ((currentPage - 1) * pageSize + index),

          fixed: 'left'
        },
        ...cols
      ];

  // handle data
  const source = table?.data?.map((item: TableItem) => {
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
    setCurrentPage(page);
    if (size && size !== pageSize) {
      setPageSize(size);
    }
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
        <div className="container-fluid">
          <div className=" flex-grow">
            <Table
              size="small"
              bordered
              className="mt-4 "
              loading={{
                spinning: loading,
                size: 'large'
              }}
              rowSelection={hasSelectRows ? rowSelection : undefined}
              dataSource={source}
              columns={columns}
              pagination={{
                current: currentPage,
                showSizeChanger: true,
                pageSizeOptions: ['10', '25', '50', '100'],
                pageSize,
                total: table?.meta?.total || 0,
                onChange: handlePaginationChange,
                onShowSizeChange: handlePaginationChange,
                position: ['bottomCenter']
              }}
              scroll={{ x: 'max-content' }}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default memo(CustomTable);
