import ''
import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import MaterialReactTable from 'material-react-table';

export default function Table(props) {
  const { t, i18n } = useTranslation();
  const data = props.data
  const columns = props.columns.map((column) => {
    return {
      header: t(column.Header),
      accessorKey: column.accessor,
    }
  })
  return (
    <div>Table</div>
  )
}