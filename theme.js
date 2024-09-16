// theme.js
import { border, extendTheme} from '@chakra-ui/react';


// Example of extending the theme
const customTheme = extendTheme({

  config :{
    initialColorMode: "dark"
  },
  styles : {
    global: (props) =>({
      body:{
        bg: props.colorMode === "dark"? "#121212": " #F9E9E9",
        color: props.colorMode === "dark"? "#E0E0E0": "#2A2F33",
      }
    })
  },
  colors: {
    brand: {
      lightPrimary: '#20C997', // Primary color
      lightSecondary: '#6C757D',
      darkPrimary: "#20C997",
      darkSecondary: "#BOBEC5",
      purple: "#6B46C1"
      
    },
  },
  fonts: {
    heading: `sans-serif`,
    body: `sans-serif`,
  },
  components: {
    Button: {
      // Customize Chakra UI components here
      baseStyle: {
        fontWeight: 'bold', // Change font weight
        bg: 'brand.primary',
        text: "white"
        
      },
      sizes: {
        xl: {
          h: '56px',
          fontSize: 'lg',
          px: '32px',
        },
      },
      variants: {
        'with-shadow': {
          bg: 'brand.500',
          boxShadow: '0 0 2px 2px #efdfde',
        },
        solid: (props) => ({
          bg: props.colorMode === 'dark' ? 'brand.purple' : 'brand.purple',
        }),
      },
    },
    Text: {
      baseStyle: (props)=>({
        color: props.colorMode === "dark"? "whiteAlpha.900": "gray.800"
      })
    },
    Box: {
      baseStyle: {
        field: {
          fontWeight: 'bold', // Change font weight for all inputs
          borderColor: 'red',
        }
      },
    },
    Input: {
      // Base styles for all Inputs
      baseStyle: {
        field: {
         
          borderColor: 'gray.300', // Default border color
          _hover: {
            borderColor: 'brand.secondary', // Border color on hover
          },
          _focus: {
            borderColor: 'brand.secondary', // Border color on focus
            boxShadow: '0 0 0 1px blue.500', // Box shadow on focus
          },
        },
      },
      
      // Define or override default sizes
      sizes: {
        md: {
          field: {
            fontSize: 'md', // Font size for medium size
            padding: '10px', // Custom padding
          },
        },
        lg: {
          field: {
            fontSize: 'lg', // Font size for large size
            padding: '16px', // Custom padding
          },
        },
      },
      // Define or override default variants
      variants: {
        outline: {
          field: {
            border: '2px solid',
            borderColor: 'gray.400',
            _hover: {
              borderColor: 'blue.600', // Hover state for outline variant
            },
            _focus: {
              borderColor: 'blue.600', // Focus state for outline variant
              boxShadow: '0 0 0 1px blue.600',
            },
          },
        },
        filled: {
          field: {
            bg: 'gray', // Background color for filled variant
            border: "none",
            _hover: {
              bg: 'gray.200', // Hover background color
            },
            _focus: {
              bg: 'white', // Focus background color
              borderColor: 'blue.500',
            },
          },
        },
      },
      // Default properties for the Input component
      defaultProps: {
        size: 'md', // Set default size
        variant: 'outline', // Set default variant
      },
    },
    
  },
});

export default customTheme;