import React from 'react';
import { Admin, Resource, Login } from 'react-admin';
import { Group, AttachMoney, MoneyOff } from '@material-ui/icons';
import { createBrowserHistory as createHistory } from 'history';

import dataProvider from '../providers/dataProvider';
import authProvider from '../providers/authProvider';
import Dashboard from './Dashboard';
import NotFound from './myFields/NotFound';

import { IncomeList, IncomeCreate, IncomeEdit } from './Incomes';
import { ExpenseList, ExpenseCreate, ExpenseEdit, ExpenseShow } from './Expenses';
import { UserList, UserShow, UserEdit } from './UserList';

import { createMuiTheme } from '@material-ui/core/styles';
import pink from '@material-ui/core/colors/pink';
import red from '@material-ui/core/colors/red';
import gray from '@material-ui/core/colors/grey';


const theme = createMuiTheme({
    palette: {
        background: {
            paper: 'black'
        },
        primary: {
            light: pink[300],
            main: pink[500],
            dark: pink[700],
        },
        secondary: {
            light: red.A200,
            main: red.A400,
            dark: red.A700,
        },
        action: pink,
        thernary: pink,
        error: red,
        type: 'dark',
    },
});

const MyLoginPage = () => <Login backgroundImage="./background.jpg"  />
const history = createHistory();

const App = () => {
    return (
        <Admin 
            authProvider={ authProvider } 
            dataProvider={ dataProvider } 
            dashboard={ Dashboard } 
            title="Budgety" 
            catchAll={ NotFound } 
            theme={ theme }
            loginPage={ MyLoginPage }
            history={ history }
        >
            <Resource 
                name="users" 
                list={ UserList } 
                icon={ Group } 
                show={ UserShow } 
                edit={ UserEdit }
            />
            <Resource 
                name="incomes" 
                list={ IncomeList } 
                create={ IncomeCreate } 
                edit={ IncomeEdit} 
                icon={ AttachMoney } 
            />
            <Resource 
                name="expenses" 
                show={ ExpenseShow } 
                list={ ExpenseList } 
                create={ ExpenseCreate } 
                icon={ MoneyOff } 
                edit={ ExpenseEdit }  
                options={{ label: "Expenses" }}
            />
        </Admin>
    )
};

export default App;