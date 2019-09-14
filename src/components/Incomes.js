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
    NumberInput,
    NumberField,
} from 'react-admin';
import Button from '@material-ui/core/Button';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Toolbar from '@material-ui/core/Toolbar';

const IncomeActions = ({
    bulkActions,
    basePath,
    displayedFilters,
    filters,
    filterValues,
    onUnselectItems,
    resource,
    selectedIds,
    showFilter,
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

    </CardActions>
);

const IncomeFilter = props => {
    return (
        <Filter { ...props }>
            <TextInput label="Search" source="q" alwaysOn />
            <ReferenceInput label="User's first name" source="userId" reference="users" allowEmpty>
                <SelectInput optionText="firstName" />
            </ReferenceInput>
        </Filter>
    );
};

const IncomePagination = ({ page, total, setPage }) => {
    return (
        <Toolbar>
            {page > 1 &&
                <Button color="primary" key="prev" icon={<ChevronLeft />} onClick={() => setPage(page - 1)}>
                    Prev
                </Button>
            }
            {total &&
                <Button color="primary" key="next" icon={<ChevronRight />} onClick={() => setPage(page + 1)} labelposition="before">
                    Next
                </Button>
            }
        </Toolbar>
    );
};

export const IncomeList = ({ permissions, ...props }) => {
    return (
        <List 
            filters={ <IncomeFilter /> } 
            title="List of incomes" 
            actions={ <IncomeActions permissions={permissions} /> }
            perPage={5}
            pagination={<IncomePagination />}
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
                        <TextField label="Income ID" source="id"/>
                        <TextField label="Income source" source="incomeSource" />
                        <NumberField label="Income value" source="incomeValue" />
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
        <Create { ...props }>
            <SimpleForm validate={ValidateUserCreation} redirect="list">
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
        <Edit title={ <IncomeTitle /> } { ...props }>
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