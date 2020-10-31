import { createTheme, ITheme } from "@fluentui/react";
import { AzureThemeDark } from "@uifabric/azure-themes";

export const darkTheme: ITheme = AzureThemeDark as ITheme;  

darkTheme.semanticColors.bodyStandoutBackground = darkTheme.palette.neutralLighter

// createTheme({
//     palette: {
//         themePrimary: '#c94aff',
//         themeLighterAlt: '#08030a',
//         themeLighter: '#200c29',
//         themeLight: '#3c164d',
//         themeTertiary: '#782c99',
//         themeSecondary: '#b141e0',
//         themeDarkAlt: '#ce5cff',
//         themeDark: '#d675ff',
//         themeDarker: '#e19aff',
//         neutralLighterAlt: '#3c3b39',
//         neutralLighter: '#444241',
//         neutralLight: '#514f4e',
//         neutralQuaternaryAlt: '#595756',
//         neutralQuaternary: '#5f5e5c',
//         neutralTertiaryAlt: '#7a7977',
//         neutralTertiary: '#c8c8c8',
//         neutralSecondary: '#d0d0d0',
//         neutralPrimaryAlt: '#dadada',
//         neutralPrimary: '#ffffff',
//         neutralDark: '#f4f4f4',
//         black: '#f8f8f8',
//         white: '#323130',
//     }
// });

