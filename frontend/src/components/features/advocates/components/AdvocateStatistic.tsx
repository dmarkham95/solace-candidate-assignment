import Card from '@/components/ui/Card'
import Avatar from '@/components/ui/Avatar'
import MediaSkeleton from '@/components/shared/loaders/MediaSkeleton'
import {
    HiOutlineUserGroup,
    HiOutlineBeaker ,
    HiOutlineAcademicCap  
} from 'react-icons/hi'
import { NumericFormat } from 'react-number-format'
import type { ReactNode } from 'react'
import { Loading } from '@/components/shared'

type StatisticCardProps = {
    icon: ReactNode
    avatarClass: string
    label: string
    value?: number
    loading: boolean
}

type AdvocateStatisticProps = {
    totalAdvocates: number
    totalSpectilties: number
    totalYearsOfExperience: number
    loading: boolean
}

const StatisticCard = (props: StatisticCardProps) => {
    const { icon, avatarClass, label, value, loading } = props

    const avatarSize = 55

    return (
        <Card bordered>
            <Loading
                loading={loading}
                customLoader={
                    <MediaSkeleton
                        avatarProps={{
                            className: 'rounded',
                            width: avatarSize,
                            height: avatarSize,
                        }}
                    />
                }
            >
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <Avatar
                            className={avatarClass}
                            size={avatarSize}
                            icon={icon}
                        />
                        <div>
                            <span>{label}</span>
                            <h3>
                                <NumericFormat
                                    thousandSeparator
                                    displayType="text"
                                    value={value}
                                />
                            </h3>
                        </div>
                    </div>
                </div>
            </Loading>
        </Card>
    )
}

const AdvocateStatistic = (props: AdvocateStatisticProps) => {
const  {totalAdvocates, totalSpectilties, totalYearsOfExperience , loading} = props
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 mb-6">
            <StatisticCard
                icon={<HiOutlineUserGroup />}
                avatarClass="!bg-indigo-600"
                label="Total Advocatess"
                value={totalAdvocates}
                loading={loading}
            />
            <StatisticCard
                icon={<HiOutlineBeaker  />}
                avatarClass="!bg-blue-500"
                label="Spectilties Covered"
                value={totalSpectilties}
                loading={loading}
            />
            <StatisticCard
                icon={<HiOutlineAcademicCap  />}
                avatarClass="!bg-emerald-500"
                label="Total Years of Experience"
                value={totalYearsOfExperience}
                loading={loading}
            />
        </div>
    )
}

export default AdvocateStatistic
