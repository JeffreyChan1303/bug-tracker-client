import { styled } from '@mui/material/styles';
import { TableCell } from '@mui/material';

export const BoldedTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: theme.typography.fontWeightBold,
  padding: '8px 5px',
}));

export const ContentTableCell = styled(TableCell)(() => ({
  padding: '5px',
}));
