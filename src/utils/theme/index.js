import { createTheme } from '@mui/material';
import nunitoRegular from '../../assets/fonts/NunitoSans-Regular.ttf';
import nunitoBold from '../../assets/fonts/NunitoSans-Bold.ttf';

export const theme = createTheme({
	palette: {
		blue: '#0099CC',
		blueShade: '#E0F7FF',
	},
	components: {
		MuiCssBaseline: {
			styleOverrides: `        
        @font-face {
          font-family: 'Nunito-Regular';
          src: url(${nunitoRegular}) format('truetype');
        }
        
        @font-face {
          font-family: 'Nunito-Bold';
          src: url(${nunitoBold}) format('truetype');
        }
      `,
		},
	},
});
