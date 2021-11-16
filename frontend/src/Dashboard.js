import * as React from 'react';
import {createTheme, styled, ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import {mainListItems, secondaryListItems} from './listItems';
import {TextField, Button} from "@mui/material";
import { Pie, Bar } from 'react-chartjs-2';
const axios = require('axios');


const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            }),
        },
    }),
);

const spentPieChartLabels = [
    'заработная плата разработчиков',
    'дополнительная заработная плата',
    'отчисления на социальные нужды',
    'накладные расходы',
    'эксплуатационные расходы'
]
const priceChartLabels = [
    'затраты(себестоимость)',
    'цена',
    'нижний предел цены',
    'договорная цена программного продукта',
]

const spentPieBackgroundColors = [
    'rgba(255, 99, 132, 0.2)',
    'rgba(54, 162, 235, 0.2)',
    'rgba(255, 206, 86, 0.2)',
    'rgba(75, 192, 192, 0.2)',
    'rgba(153, 102, 255, 0.2)',
]
const priceBackgroundColors = [
    'rgba(255, 99, 132, 0.2)',
    'rgba(54, 162, 235, 0.2)',
    'rgba(255, 206, 86, 0.2)',
    'rgba(75, 192, 192, 0.2)',
]

const mdTheme = createTheme();

function DashboardContent() {
    const [open, setOpen] = React.useState(true);
    const [time_develop, setTimeDevelop] = React.useState(0);
    const [salary, setSalary] = React.useState(0);
    const [add_coeff, setAddCoeff] = React.useState(0);
    const [overheads, setOverheads] = React.useState(0);
    const [power_consumption, setPowerConsumption] = React.useState(0);
    const [energy_price, setEnergyPrice] = React.useState(0);
    const [salary_staff, setSalaryStaff] = React.useState(0);
    const [count_serviced_units, setCountServicesUnits] = React.useState(0);
    const [book_value, setBookValue] = React.useState(0);
    const [time_coding, setTimeCoding] = React.useState(0);
    const [time_debugging, setTimeDebugging] = React.useState(0);
    const [profitability, setProfitability] = React.useState(0);
    const [tax, setTax] = React.useState(0);
    const [replication, setReplication] = React.useState(0);
    const [additional_profit, setAdditionalProfit] = React.useState(0);
    const [spentDataset, setSpentDataset] = React.useState(null)
    const [priceDataset, setPriceDataset] = React.useState(null)
    const toggleDrawer = () => {
        setOpen(!open);
    };

    async function calculate() {
        try {
            // TODO: remove hardcode
            const response = await axios.post("http://localhost:8000/calculate/", {
                time_develop,
                salary,
                add_coeff,
                overheads,
                power_consumption,
                energy_price,
                salary_staff,
                count_serviced_units,
                book_value,
                time_coding,
                time_debugging,
                profitability,
                tax,
                replication,
                additional_profit,
            })
            console.log(response.data)
            const chartData = [
                response.data.salary_developers,
                response.data.additional_salary,
                response.data.social_contributions,
                response.data.overhead_costs,
                response.data.operating_costs
            ]
            setSpentDataset({
                labels: spentPieChartLabels,
                datasets: [
                    {
                        label: 'Затраты',
                        data: chartData,
                        backgroundColor: spentPieBackgroundColors
                    },
                    // {
                    //     label: 'Затраты в процентах',
                    //     data: chartData.map(el => el / chartData.reduce((a, b) => a + b, 0) * 100),
                    //     backgroundColor: spentPieBackgroundColors
                    // },
                ]
            })
            const priceChartData = [
                response.data.software_cost,
                response.data.cost_app,
                response.data.low_limit,
                response.data.contract_price,
            ]
            setPriceDataset({
                labels: priceChartLabels,
                datasets: [
                    {
                        label: 'Основные результаты решения задачи',
                        data: priceChartData,
                        backgroundColor: priceBackgroundColors
                    },
                ]
            })
        } catch {
            console.log('Exception :(')
        }
    }

    return (
        <ThemeProvider theme={mdTheme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar position="absolute" open={open}>
                    <Toolbar
                        sx={{
                            pr: '24px', // keep right padding when drawer closed
                        }}
                    >
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={toggleDrawer}
                            sx={{
                                marginRight: '36px',
                                ...(open && { display: 'none' }),
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            component="h1"
                            variant="h6"
                            color="inherit"
                            noWrap
                            sx={{ flexGrow: 1 }}
                        >
                            Dashboard
                        </Typography>
                        <IconButton color="inherit">
                            <Badge badgeContent={4} color="secondary">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Drawer variant="permanent" open={open}>
                    <Toolbar
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            px: [1],
                        }}
                    >
                        <IconButton onClick={toggleDrawer}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </Toolbar>
                    <Divider />
                    <List>{mainListItems}</List>
                    <Divider />
                    <List>{secondaryListItems}</List>
                </Drawer>
                <Box
                    component="main"
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.mode === 'light'
                                ? theme.palette.grey[100]
                                : theme.palette.grey[900],
                        flexGrow: 1,
                        height: '100vh',
                        overflow: 'auto',
                    }}
                >
                    <Toolbar />
                    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} lg={6}>
                                <Paper
                                    sx={{
                                        p: 2,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        height: 1150,
                                    }}
                                >
                                    <Box
                                        component="form"
                                        sx={{
                                            '& .MuiTextField-root': { m: 1, width: '55ch' },
                                        }}
                                        noValidate
                                        autoComplete="off"
                                    >
                                        <div>
                                            <TextField
                                                id="time_develop"
                                                label="Время разработки"
                                                type={"number"}
                                                defaultValue={0}
                                                onChange={e => setTimeDevelop(e.target.value)}
                                            />
                                            <TextField
                                                id="salary"
                                                label="Зарплата"
                                                type={"number"}
                                                defaultValue={0}
                                                onChange={e => setSalary(e.target.value)}
                                            />
                                            <TextField
                                                id="add_coef"
                                                label="Коэффициент"
                                                type={"number"}
                                                defaultValue={0}
                                                onChange={e => setAddCoeff(e.target.value)}
                                            />
                                            <TextField
                                                id="overheads"
                                                label="Издержки"
                                                type={"number"}
                                                defaultValue={0}
                                                onChange={e => setOverheads(e.target.value)}
                                            />
                                            <TextField
                                                id="power_consumption"
                                                label="Потребление энергии"
                                                type={"number"}
                                                defaultValue={0}
                                                onChange={e => setPowerConsumption(e.target.value)}
                                            />
                                            <TextField
                                                id="energy_price"
                                                label="Цена электроэнергии"
                                                type={"number"}
                                                defaultValue={0}
                                                onChange={e => setEnergyPrice(e.target.value)}
                                            />
                                            <TextField
                                                id="salary_staff"
                                                label="Зарплата обсл. персонала"
                                                type={"number"}
                                                defaultValue={0}
                                                onChange={e => setSalaryStaff(e.target.value)}
                                            />
                                            <TextField
                                                id="count_serviced_units"
                                                label="Количество обслуживаемых им единиц оборудования"
                                                type={"number"}
                                                defaultValue={0}
                                                onChange={e => setCountServicesUnits(e.target.value)}
                                            />
                                            <TextField
                                                id="book_value"
                                                label="Балансовая стоимость компьютера"
                                                type={"number"}
                                                defaultValue={0}
                                                onChange={e => setBookValue(e.target.value)}
                                            />
                                            <TextField
                                                id="time_coding"
                                                label="Время кодирования"
                                                type={"number"}
                                                defaultValue={0}
                                                onChange={e => setTimeCoding(e.target.value)}
                                            />
                                            <TextField
                                                id="time_debugging"
                                                label="Время отладки"
                                                type={"number"}
                                                defaultValue={0}
                                                onChange={e => setTimeDebugging(e.target.value)}
                                            />
                                            <TextField
                                                id="profitability"
                                                label="Норматив рентабельности"
                                                type={"number"}
                                                defaultValue={0}
                                                onChange={e => setProfitability(e.target.value)}
                                            />
                                            <TextField
                                                id="tax"
                                                label="НДС"
                                                type={"number"}
                                                defaultValue={0}
                                                onChange={e => setTax(e.target.value)}
                                            />
                                            <TextField
                                                id="replication"
                                                label="Тиражирование"
                                                type={"number"}
                                                defaultValue={0}
                                                onChange={e => setReplication(e.target.value)}
                                            />
                                            <TextField
                                                id="additional_profit"
                                                label="Дополнительная прибыль"
                                                type={"number"}
                                                defaultValue={0}
                                                onChange={e => setAdditionalProfit(e.target.value)}
                                            />
                                            <Button onClick={calculate} variant={"contained"}>Рассчитать</Button>
                                        </div>
                                    </Box>
                                </Paper>
                            </Grid>
                            <Grid item xs={12} lg={6}>
                                <Paper
                                    sx={{
                                        p: 2,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        height: 1150,
                                    }}
                                >
                                    {!spentDataset && !priceDataset && <h2>Здесь будут диаграммы!</h2>}
                                    {spentDataset && <Pie data={spentDataset}/>}
                                    {priceDataset && <Bar data={priceDataset}/>}

                                </Paper>
                            </Grid>
                        </Grid>
                    </Container>

                </Box>
            </Box>
        </ThemeProvider>
    );
}

export default function Dashboard() {
    return <DashboardContent />;
}