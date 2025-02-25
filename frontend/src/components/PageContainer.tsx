import { Suspense } from 'react'
import classNames from 'classnames'
import Container from '@/components/Container'
import {
    PAGE_CONTAINER_GUTTER_X,
    PAGE_CONTAINER_GUTTER_Y,
} from '@/constants/theme.constant'
import type { CommonProps } from '@/@types/common'
import type { ElementType, ComponentPropsWithRef, ReactNode } from 'react'

export interface PageContainerProps extends CommonProps {
    contained?: boolean
    pageContainerType?: 'default' | 'gutterless' | 'contained'
    header?: string | ReactNode
}

const CustomHeader = <T extends ElementType>({
    header,
    ...props
}: {
    header: T
} & ComponentPropsWithRef<T>) => {
    const Header = header
    return <Header {...props} />
}

const PageContainer = (props: PageContainerProps) => {
    const {
        pageContainerType = 'default',
        children,
        header,
        contained = false,
    } = props

    return (
        <div className="h-full flex flex-auto flex-col justify-between">
            <main className="h-full">
                <div
                    className={classNames(
                        'py-6 page-container relative h-full flex flex-auto flex-col',
                        pageContainerType !== 'gutterless' &&
                            `${PAGE_CONTAINER_GUTTER_X} ${PAGE_CONTAINER_GUTTER_Y}`,
                        pageContainerType === 'contained' && 'container mx-auto'
                    )}
                >
                    {(header) && (
                        <div
                            className={classNames(
                                contained && 'container mx-auto',
                                'flex items-center justify-between mb-4'
                            )}
                        >
                            <div>
                                {header && typeof header === 'string' && (
                                    <h3>{header}</h3>
                                )}
                                <Suspense fallback={<div></div>}>
                                    {header && typeof header !== 'string' && (
                                        <CustomHeader header={header} />
                                    )}
                                </Suspense>
                            </div>
                        </div>
                    )}
                    {pageContainerType === 'contained' ? (
                        <Container className="h-full">
                            <>{children}</>
                        </Container>
                    ) : (
                        <>{children}</>
                    )}
                </div>
            </main>
        </div>
    )
}

export default PageContainer
