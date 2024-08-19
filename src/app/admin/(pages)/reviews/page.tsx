"use client"
import React from 'react'
import AdminLayout from '../../layout/AdminLayout'
import { DataTable } from '../../components/Data-table'
import { useQuery } from '@tanstack/react-query'
import { getAllReviews } from './service'
import { columns} from './table/Column'
import Loader from '@/ui/Loader'

const Page = () => {
  const {data:allReviews,isPending}=useQuery({
    queryFn:getAllReviews,
    queryKey:["admin","reviews"]
  })
  console.log(allReviews)

  if(isPending) return <Loader/>
  return (
    <AdminLayout>
      <div className='ml-12 h-screen w-full '>
        <h2 className='text-3xl text-slate-800 font-bold whitespace-nowrap'>
          All Reviews
        </h2>
        <div className='mt-2 h-2/3 w-[50vw]'>
        <DataTable columns={columns} data={allReviews}/>
        </div>
      </div>
    </AdminLayout>
  )
}

export default Page