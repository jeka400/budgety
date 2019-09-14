import React from 'react';
import { 
    List,
    Responsive,
    SimpleList,
    Datagrid,
    TextField,
    ReferenceField,
    EditButton,
    Create,
    SimpleForm,
    ReferenceInput,
    SelectInput,
    TextInput,
    LongTextInput,
    Edit,
    DisabledInput,
    Filter,
    CardActions,
    CreateButton,
    ExportButton,
    RefreshButton,
    NumberInput,
    NumberField,
} from 'react-admin';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Toolbar from '@material-ui/core/Toolbar';
import IncomeSource from './myFields/IncomeSource';

const IncomeActions = ({
    bulkActions,
    basePath,
    currentSort,
    displayedFilters,
    exporter,
    filters,
    filterValues,
    onUnselectItems,
    resource,
    selectedIds,
    showFilter,
    total
}) => (
    <CardActions>
        {bulkActions && React.cloneElement(bulkActions, {
            basePath,
            filterValues,
            resource,
            selectedIds,
            onUnselectItems,
        })}
        {filters && React.cloneElement(filters, {
            resource,
            showFilter,
            displayedFilters,
            filterValues,
            context: 'button',
        }) }
        <CreateButton basePath={basePath} />
        <ExportButton
            disabled={total === 0}
            resource={resource}
            _sort={currentSort}
            filter={filterValues}
            exporter={exporter}
        />
        <RefreshButton />
        <Button color="primary" >Custom Action</Button> 
    </CardActions>
);

const IncomeFilter = props => {
    return (
        <Filter { ...props }>
            <TextInput label="Search" source="q" alwaysOn />
            <ReferenceInput label="Income source" source="incomeId" reference="incomes" allowEmpty>
                <SelectInput optionText="incomeSource" />
            </ReferenceInput>
            <ReferenceInput label="User's first name" source="userId" reference="users" allowEmpty>
                <SelectInput optionText="firstName" />
            </ReferenceInput>
        </Filter>
    );
};

const IncomePagination = ({ page, perPage, total, setPage }) => {
    const nbPages = Math.ceil(total / perPage) || 1;
    return (
        nbPages > 1 &&
            <Toolbar>
                {page > 1 &&
                    <Button color="secondary" key="prev" icon={<ChevronLeft />} onClick={() => setPage(page - 1)}>
                        Prev
                    </Button>
                }
                {page !== nbPages &&
                    <Button color="secondary" key="next" icon={<ChevronRight />} onClick={() => setPage(page + 1)} labelposition="before">
                        Next
                    </Button>
                }
            </Toolbar>
    );
};

const Aside = ({ ...props }) => {
    const sumArr =  Object.values(props.data).map(el => el.incomeValue);
    if(sumArr) {
        var sum = 0;
        for(var i = 0; i < sumArr.length; i++){
            sum += sumArr[i];
        }
        return sum;
    }

    return (
        <div style={{ width: 150, margin: 50 }}>
            <Typography variant="title">Total count is:</Typography>
            <Typography variant="body1">
                {sum ? sum : ''}
            </Typography>
        </div>
    )
};

export const IncomeList = ({ permissions, ...props }) => {
    return (
        <List 
            filters={ <IncomeFilter /> } 
            title="List of incomes" 
            actions={ <IncomeActions permissions={permissions} /> }
            perPage={5}
            sort={{ field: 'userId', order: 'ASC' }}
            pagination={<IncomePagination />}
            aside={<Aside />}
            { ...props }
        >
            <Responsive
                small={
                    <SimpleList
                        primaryText={ record => record.incomeSource }
                        secondaryText={ record => record.incomeValue }
                        tertiaryText={ record => record.id }
                    />
                }
                medium={
                    <Datagrid rowClick="edit">
                        <TextField label="Income ID" source="id" sortable={ false } />
                        <IncomeSource label="Income source" source="incomeSource" />
                        <NumberField label="Income value" source="incomeValue" sortable={ false } />
                        <ReferenceField source="userId" reference="users" >
                                <TextField label="User's first name" source="firstName" />
                        </ReferenceField>
                        <EditButton />
                    </Datagrid>
                }
            />
        </List>
    );
};

const ValidateUserCreation = (values) => {
    const errors = {};
    if(!values.incomeSource) {
        errors.incomeSource = ['The income source is required!'];
    }
    if(!values.incomeValue) {
        errors.incomeValue = ['The income value id required!'];
    }
    return errors
};

export const IncomeCreate = props => {
    return (
        <Create redirect="list" { ...props }>
            <SimpleForm validate={ValidateUserCreation} >
                <ReferenceInput source="userId" reference="users">
                    <SelectInput optionText="firstName" />
                </ReferenceInput>
                <TextInput source="incomeSource" />
                <NumberInput source="incomeValue" />
                <LongTextInput source="income.description" />
            </SimpleForm>
        </Create>
    );
};

export const IncomeTitle = ({ record }) => {
    return(
        <span>Post { record ? `"${record.incomeSource}" ` : '' }</span>
    );
};

export const IncomeEdit = props => {
    return (
        <Edit title={ <IncomeTitle /> } redirect="list" { ...props }>
            <SimpleForm>
                <DisabledInput source="id" />
                <ReferenceInput source="userId" reference="users">
                    <SelectInput optionText="firstName" />
                </ReferenceInput>
                <TextInput source="incomeSource" />
                <NumberInput source="incomeValue" />
                <LongTextInput source="income.description" />
            </SimpleForm>
        </Edit>
    );
};