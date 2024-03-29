import React, { forwardRef } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Channel } from '../../../types/global';
import MaterialTable from 'material-table';
import AddBox from '@material-ui/icons/AddBox';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

const useStyles = makeStyles((theme: Theme) => createStyles({}));

type ComponentProps = {
  list: Channel[];
};
type ActionProps = {};

type PropsType = ComponentProps & ActionProps;

const tableIcons = {
  Add: forwardRef<SVGSVGElement>((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef<SVGSVGElement>((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef<SVGSVGElement>((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef<SVGSVGElement>((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef<SVGSVGElement>((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef<SVGSVGElement>((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef<SVGSVGElement>((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef<SVGSVGElement>((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef<SVGSVGElement>((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef<SVGSVGElement>((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef<SVGSVGElement>((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef<SVGSVGElement>((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef<SVGSVGElement>((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef<SVGSVGElement>((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef<SVGSVGElement>((props, ref) => <ArrowUpward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef<SVGSVGElement>((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef<SVGSVGElement>((props, ref) => <ViewColumn {...props} ref={ref} />),
};

const ChannelList: React.SFC<PropsType> = props => {
  const classes = useStyles();

  const handleClick = (event: React.MouseEvent, rowData: Channel) => {
    window.open(`http://peca.live/channels/${rowData.channelId}`);
  };

  return (
    <div style={{ width: '100%', height: '100%', position: 'absolute' }}>
      <MaterialTable
        onRowClick={handleClick}
        icons={tableIcons}
        columns={[
          { title: 'YP', field: 'yellowPage', cellStyle: { width: '3em' } },
          { title: 'チャンネル名', field: 'name' },
          { title: 'ジャンル', field: 'genre', cellStyle: { maxWidth: '200px' } },
          { title: '詳細', field: 'description' },
          {
            title: 'リスナー数',
            field: 'listeners',
            type: 'numeric',
            cellStyle: { width: '8em' },
          },
        ]}
        data={props.list}
        title="チャンネルリスト"
        options={{ pageSize: 20, pageSizeOptions: [10, 20, 50] }}
      />
    </div>
  );
};

export default ChannelList;
