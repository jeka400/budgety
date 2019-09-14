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
    NumberField,
    NumberInput,
    Edit,
    DisabledInput,
    Filter,
    Show,
    SimpleShowLayout,
    RichTextField,
    ShowButton,
} from 'react-admin';
import Button from '@material-ui/core/Button';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Toolbar from '@material-ui/core/Toolbar';


const ExpenseFilter = props => {
    return (
        <Filter { ...props }>
            <TextInput label="Search" source="q" alwaysOn />
            <ReferenceInput label="User's first name" source="userId" reference="users" allowEmpty>
                <SelectInput optionText="firstName" />
            </ReferenceInput>
        </Filter>
    )
}

const ExpensePagination = ({ page, total, setPage }) => {
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

export const ExpenseList = ({ ...props }) => {
    return (
        <List 
            filters={ <ExpenseFilter /> } 
            title="List of expences" 
            filter={{ title: true }}
            perPage={5}
            pagination={<ExpensePagination />}
            { ...props }
        >
            <Responsive
                small={
                    <SimpleList
                        primaryText={ record => record.title }
                        secondaryText={ record => record.value }
                        tertiaryText={ record => record.id }
                    />
                }
                medium={
                    <Datagrid>
                        <TextField label="Expense ID" source="id" />
                        <TextField label="Expense" source="title"  />
                        <NumberField label="Expense value" source="value" />
                        <ReferenceField source="userId" reference="users">
                            <TextField label="User's first name" source="firstName" />
                        </ReferenceField>
                        <EditButton />
                        <ShowButton/>
                    </Datagrid>
                }
            />
        </List>
    );
};

export const ExpenseCreate = props => {
    return (
        <Create { ...props } redirect="list">
            <SimpleForm>
                <ReferenceInput source="userId" reference="users">
                    <SelectInput optionText="firstName" />
                </ReferenceInput>
                <TextInput source="title" />
                <NumberInput source="value" />
                <LongTextInput source="description" />
            </SimpleForm>
        </Create>
    );
};

export const ExpenseTitle = ({ record }) => {
    return(
        <span>Post { record ? `"${record.expence}" ` : '' }</span>
    );
};

export const ExpenseEdit = props => {
    return (
        <Edit title={ <ExpenseTitle /> } undoable={false} { ...props }>
            <SimpleForm>
                <DisabledInput source="id" />
                <ReferenceInput source="userId" reference="users">
                    <SelectInput optionText="firstName" />
                </ReferenceInput>
                <TextInput source="title" />
                <TextInput source="value" />
                <LongTextInput source="description" />
            </SimpleForm>
        </Edit>
    );
};

const ExpenseTitleShow = ({ record }) => {
    return (
        <span>About expense - { record ? `${record.title}` : ''}</span>
    )
};

export const ExpenseShow = props => {
    return (
        <Show title={ <ExpenseTitleShow /> } { ...props }>
            <SimpleShowLayout>
                <TextField source="id" />
                <TextField source="title" />
                <NumberField source="value" />
                <ReferenceField source="userId" reference="users">
                    <TextField optiontext="firstName" />
                </ReferenceField>
                <RichTextField source="description" />
            </SimpleShowLayout>
        </Show>
    )
}