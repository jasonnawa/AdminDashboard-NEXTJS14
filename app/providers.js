'use client'

import { ChakraProvider } from '@chakra-ui/react'
import customTheme from '@/theme'


export function Providers({ children }) {


  return <ChakraProvider theme={customTheme}>{children}</ChakraProvider>
}