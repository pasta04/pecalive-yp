import { createMuiTheme } from '@material-ui/core/styles';

export const theme = createMuiTheme({
  // MaterialUIのCSSを上書きする
  overrides: {
    MuiGrid: {
      item: {
        padding: 12,
        width: '100%',
      },
    },
    MuiTableCell: {
      root: {
        padding: '5px 40px 5px 16px',
      },
    },
  },
  // MaterialUIのCSSのオンオフ切り替える
  props: {},
});
