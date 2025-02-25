'use client'
import { forwardRef, Ref } from 'react'
import classNames from 'classnames'
import ReactSelect from 'react-select'
import CreatableSelect from 'react-select/creatable'
import AsyncSelect from 'react-select/async'
import isEmpty from 'lodash/isEmpty'
import get from 'lodash/get'
import { useConfig } from '../ConfigProvider'
import { useForm } from '../Form/context'
import { useInputGroup } from '../InputGroup/context'
import { HiCheck, HiChevronDown, HiX } from 'react-icons/hi'
import Spinner from '../Spinner/Spinner'
import { CONTROL_SIZES } from '@/utils/constants'
import type { CommonProps, TypeAttributes } from '@/@types/common'
import type {
    ControlProps,
    Props as ReactSelectProps,
    GroupBase,
} from 'react-select'
import type { AsyncProps } from 'react-select/async'
import type { CreatableProps } from 'react-select/creatable'
import type { ForwardedRef } from 'react'

interface DefaultOptionProps {
    innerProps: JSX.IntrinsicElements['div']
    label: string
    selectProps: { themeColor?: string }
    isSelected: boolean
    isDisabled: boolean
    isFocused: boolean
}

const DefaultOption = ({
    innerProps,
    label,
    selectProps,
    isSelected,
    isDisabled,
    isFocused,
}: DefaultOptionProps) => {
    const { themeColor } = selectProps
    return (
        <div
            className={classNames(
                'select-option',
                isSelected && 'selected',
                isDisabled && 'disabled',
                isFocused && 'focused',
            )}
            {...innerProps}
        >
            <span className="ml-2">{label}</span>
            {isSelected && (
                <HiCheck
                    className={`text-${themeColor} dark:text-white text-xl`}
                />
            )}
        </div>
    )
}

const DefaultDropdownIndicator = () => {
    return (
        <div className="select-dropdown-indicator">
            <HiChevronDown />
        </div>
    )
}

interface DefaultClearIndicatorProps {
    innerProps: JSX.IntrinsicElements['div']
    ref: Ref<HTMLElement>
}

const DefaultClearIndicator = ({
    innerProps: { ref, ...restInnerProps },
}: DefaultClearIndicatorProps) => {
    return (
        <div {...restInnerProps} ref={ref}>
            <div className="select-clear-indicator">
                <HiX />
            </div>
        </div>
    )
}

interface DefaultLoadingIndicatorProps {
    selectProps: { themeColor?: string }
}

const DefaultLoadingIndicator = ({
    selectProps,
}: DefaultLoadingIndicatorProps) => {
    const { themeColor } = selectProps
    return (
        <Spinner className={`select-loading-indicatior text-${themeColor}`} />
    )
}

export interface SelectProps<
    Option,
    IsMulti extends boolean = false,
    Group extends GroupBase<Option> = GroupBase<Option>,
> extends CommonProps,
        ReactSelectProps<Option, IsMulti, Group>,
        AsyncProps<Option, IsMulti, Group>,
        CreatableProps<Option, IsMulti, Group> {
    size?: TypeAttributes.ControlSize
    field?: any
    form?: any
    componentAs?: ReactSelect | CreatableSelect | AsyncSelect
}

// Tailwind-based color and height maps to replace the twin.macro theme template literals
const tailwindColors = {
    white: '#ffffff',
    gray: {
        '300': '#d1d5db',
        '600': '#4b5563',
        '700': '#374151',
        '800': '#1f2937'
    },
    red: {
        '500': '#ef4444'
    },
    blue: {
        '50': '#eff6ff',
        '100': '#dbeafe',
        '500': '#3b82f6',
        '600': '#2563eb'
    },
    indigo: {
        '50': '#eef2ff',
        '100': '#e0e7ff',
        '500': '#6366f1',
        '600': '#4f46e5'
    },
    emerald: {
        '50': '#ecfdf5',
        '100': '#d1fae5',
        '500': '#10b981',
        '600': '#059669'
    },
    amber: {
        '50': '#fffbeb',
        '100': '#fef3c7',
        '500': '#f59e0b',
        '600': '#d97706'
    },
    violet: {
        '50': '#f5f3ff',
        '100': '#ede9fe',
        '500': '#8b5cf6',
        '600': '#7c3aed'
    },
    green: {
        '50': '#f0fdf4',
        '100': '#dcfce7',
        '200': '#bbf7d0',
        '300': '#86efac',
        '400': '#4ade80',
        '500': '#22c55e',
        '600': '#16a34a',
        '700': '#15803d',
        '800': '#166534',
        '900': '#14532d',
        '950': '#052e16'
      }
}

const tailwindHeights: {[key: string]: string} = {
    '8': '2rem',    // 32px
    '9': '2.25rem', // 36px
    '10': '2.5rem', // 40px
    '11': '2.75rem' // 44px
  }

function Select<
    Option,
    IsMulti extends boolean = false,
    Group extends GroupBase<Option> = GroupBase<Option>,
>(
    props: SelectProps<Option, IsMulti, Group>,
    ref: ForwardedRef<ReactSelect | CreatableSelect | AsyncSelect>,
) {
    const {
        size,
        style,
        className,
        form,
        field,
        components,
        componentAs: Component = ReactSelect,
        ...rest
    } = props

    const { themeColor = 'blue', controlSize, primaryColorLevel = '600', mode } = useConfig()
    const formControlSize = useForm()?.size
    const inputGroupSize = useInputGroup()?.size

    const selectSize = size || inputGroupSize || formControlSize || controlSize

    const twColor = tailwindColors
    const twHeight = tailwindHeights

    let isInvalid = false

    if (!isEmpty(form)) {
        const { touched, errors } = form

        const touchedField = get(touched, field.name)
        const errorField = get(errors, field.name)

        isInvalid = touchedField && errorField
    }

    const getBoxShadow = (state: ControlProps<Option, IsMulti, Group>) => {
        const shadowBase = '0 0 0 1px '

        if (isInvalid) {
            return shadowBase + twColor.red['500']
        }

        if (state.isFocused) {
            return shadowBase + (twColor[themeColor as keyof typeof twColor] as any)[primaryColorLevel]
        }

        return 'none'
    }

    const selectClass = classNames('select', `select-${selectSize}`, className)

    return (
        <Component<Option, IsMulti, Group>
            ref={ref}
            className={selectClass}
            classNamePrefix={'select'}
            styles={{
                control: (provided, state) => {
                    return {
                        ...provided,
                        height: twHeight[CONTROL_SIZES[selectSize]],
                        minHeight: twHeight[CONTROL_SIZES[selectSize]],
                        '&:hover': {
                            boxShadow: getBoxShadow(state),
                            cursor: 'pointer',
                        },
                        boxShadow: getBoxShadow(state),
                        borderRadius: '0.375rem', // equivalent to rounded-md
                        ...(isInvalid
                            ? { borderColor: twColor.red['500'] }
                            : {}),
                    }
                },
                input: (css) => {
                    return {
                        ...css,
                        input: {
                            outline: 'none',
                            outlineOffset: 0,
                            boxShadow: 'none !important',
                        },
                    }
                },
                menu: (provided) => ({ ...provided, zIndex: 50 }),
                ...style,
            }}
            theme={(theme) => ({
                ...theme,
                colors: {
                    ...theme.colors,
                    neutral0:
                        mode === 'dark' ? twColor.gray['800'] : twColor.white,
                    neutral20:
                        mode === 'dark'
                            ? twColor.gray['600']
                            : twColor.gray['300'],
                    neutral30:
                        mode === 'dark'
                            ? twColor.gray['600']
                            : twColor.gray['300'],
                    neutral80: twColor.gray['700'],
                    neutral10:
                        mode === 'dark'
                            ? twColor.gray['600']
                            : twColor.gray['300'],
                    primary25: (twColor[themeColor as keyof typeof twColor] as any)['50'],
                    primary50: (twColor[themeColor as keyof typeof twColor] as any)['100'],
                    primary: (twColor[themeColor as keyof typeof twColor] as any)[primaryColorLevel],
                },
            })}
            themeColor={`${themeColor}-${primaryColorLevel}`}
            components={{
                IndicatorSeparator: () => null,
                Option: DefaultOption,
                LoadingIndicator: DefaultLoadingIndicator,
                DropdownIndicator: DefaultDropdownIndicator,
                ClearIndicator: DefaultClearIndicator,
                ...components,
            }}
            {...field}
            {...rest}
        />
    )
}

export default forwardRef(Select) as <
    Option,
    IsMulti extends boolean = false,
    Group extends GroupBase<Option> = GroupBase<Option>,
>(
    props: SelectProps<Option, IsMulti, Group> & {
        ref?: ForwardedRef<ReactSelect | CreatableSelect | AsyncSelect>
    },
) => ReturnType<typeof Select>