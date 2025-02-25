import { ColorLevel, TypeAttributes } from '@/@types/common'
import { SIZES } from '@/utils/constants'
import { createContext, useContext } from 'react'

export type Config = {
    themeColor: string
    primaryColorLevel: ColorLevel
    controlSize: TypeAttributes.ControlSize
    mode: 'light' | 'dark'
}

export const defaultConfig = {
    themeColor: 'green',
    primaryColorLevel: 900,
    controlSize: SIZES.MD,
    mode: 'light',
} as const

export const ConfigContext = createContext<Config>(defaultConfig)

const ConfigProvider = ConfigContext.Provider

export const ConfigConsumer = ConfigContext.Consumer

export function useConfig() {
    return useContext(ConfigContext)
}

export default ConfigProvider
