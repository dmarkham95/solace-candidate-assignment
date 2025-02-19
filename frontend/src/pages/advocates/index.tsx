"use client";

import { Advocate, AdvocateQueryFilter } from "@/@types/advocate";
import AdaptableCard from "@/components/AdaptableCard";
import AdvocateFilter from "@/components/features/advocates/components/AdvocateFilter";
import AdvocatesTable, {
  OnSortParam,
} from "@/components/features/advocates/components/AdvocatesTable";
import AdvocateStatistic from "@/components/features/advocates/components/AdvocateStatistic";
import {
  apiGetAdvocates,
  apiGetAdvocateStatistic,
} from "@/services/AdvocateService";
import { cloneDeep } from "lodash";
import { useEffect, useMemo, useState } from "react";

type AdvocateResponse = {
  data: Advocate[];
  total: number;
};

type AdvocateRequest = AdvocateQueryFilter

type StatisticData = {
  totalYearsOfExperience: number;
  totalAdvocates: number;
  totalSpecialties: number;
};

const initialFilter: AdvocateQueryFilter = {
  firstName: '',
  lastName: '',
  city: '',
  state: '',
  degree: '',
}
export default function Home() {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [statisticData, setStatisticData] = useState<StatisticData>({
    totalYearsOfExperience: 0,
    totalAdvocates: 0,
    totalSpecialties: 0,
  });
  const [loading, setLoading] = useState(true);
  const [pagingData, setPagingData] = useState({
    total: 0,
    pageIndex: 1,
    pageSize: 10,
  });
  const [filter, setFilter] = useState<AdvocateQueryFilter>(initialFilter);

  const { pageIndex, pageSize, total } = pagingData;

  const fetchStatisticData = async () => {
    const response = await apiGetAdvocateStatistic<StatisticData>();
    setStatisticData(response.data);
  };
  const fetchData = async () => {
    setLoading(true);
    const filterData = {...filter,  page: pageIndex, pageSize}
    const response = await apiGetAdvocates<AdvocateResponse, AdvocateRequest>(filterData);
    const { data, total } = response.data;
    setAdvocates([...data]);
    const newTableData = cloneDeep(tableData);
    newTableData.total = Number(total);
    setPagingData(newTableData);
    setLoading(false);
  };

  useEffect(() => {
    fetchStatisticData();
  }, []);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageIndex, pageSize, filter]);

  const tableData = useMemo(
    () => ({ pageIndex, pageSize, total }),
    [pageIndex, pageSize, total]
  );

  const onPaginationChange = (page: number) => {
    const newTableData = cloneDeep(tableData);
    newTableData.pageIndex = page;
    setPagingData(newTableData);
  };

  const onSelectChange = (value: number) => {
    const newTableData = cloneDeep(tableData);
    newTableData.pageSize = Number(value);
    newTableData.pageIndex = 1;
    setPagingData(newTableData);
  };

  const handleFilterChange = (values: AdvocateQueryFilter) => {
    setFilter(values);
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3>Solace Advocates</h3>
        </div>
      </div>
      <AdvocateStatistic
        totalAdvocates={statisticData.totalAdvocates}
        totalSpectilties={statisticData.totalSpecialties}
        totalYearsOfExperience={statisticData.totalYearsOfExperience}
        loading={false}
      />
      <AdaptableCard className="h-full" bodyClass="h-full">
        <div className="flex flex-col lg:flex-row lg:items-center">
          <AdvocateFilter onSubmitComplete={handleFilterChange} filterData={filter} />
        </div>
        <AdvocatesTable
          data={advocates}
          loading={loading}
          onPaginationChange={onPaginationChange}
          onSelectChange={onSelectChange}
          pagingData={{
            pageIndex: tableData.pageIndex,
            pageSize: tableData.pageSize,
            total: tableData.total,
          }}
        />
      </AdaptableCard>
    </div>
  );
}
