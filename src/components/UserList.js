import React from 'react';
import {
    List,
    Responsive,
    SimpleList,
    Datagrid,
    TextField,
    EmailField,
    NumberField,
    Show,
    DateField,
    RichTextField,
    ShowButton,
    TabbedShowLayout,
    Tab,
    ChipField,
    Edit,
    TextInput,
    NumberInput,
    DateInput,
    BooleanInput,
    SimpleForm,
    EditButton,
    email
} from 'react-admin';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const UserPanel = ({ id, record }) => (
    <div dangerouslySetInnerHTML={{ __html: record.about }} />
);

export const UserList = (props) => {
    return (
        <List { ...props } title="List of users" pagination={ false } >
            <Responsive 
                small={
                    <SimpleList
                        primaryText={ record => record.firstName }
                        secondaryText={ record => record.email }
                    />
                }
                medium={
                    <Datagrid expand={ <UserPanel /> } rowClick="edit" >
                        <TextField source="id" />
                        <TextField source="firstName" />
                        <TextField source="lastName" />
                        <ChipField label="Occupation" source="occupation" />
                        <DateField source="born" />
                        <EmailField source="email" />
                        <NumberField source="phone" />
                        <ShowButton />
                    </Datagrid>
                }
            />
        </List>
    )
};

const UserTitle = ({ record }) => {
    return (
        <span>About user - { record ? `${record.email}` : ''}</span>
    )
};

const cardActionStyle = {
    zIndex: 2,
    display: 'inline-block',
    float: 'right',
};

const UserShowActions = ({ basePath, data }) => {
    return (
        <CardActions style={cardActionStyle}>
            <EditButton basePath={basePath} record={data} />
            <Button color="primary">Custom Action</Button>
        </CardActions>
    )
}

export const UserShow = ({  ...props }) => {
    return (
        <Show 
            title={ <UserTitle /> } 
            actions={ <UserShowActions /> }
            { ...props }
        >
            <TabbedShowLayout>
                <Tab label="summary">
                    <TextField label="First name:" source="firstName" />
                    <TextField label="Last name:" source="lastName" />
                    <EmailField label="Email:" source="email" />
                    <TextField label="Phone number:" source="phone" />
                    <DateField label="Birth date:" source="born" />
                    <ChipField label="Occupation" source="occupation" />
                </Tab>
                <Tab label="About">
                    <RichTextField label="About user:"  source="about" />
                </Tab>
            </TabbedShowLayout>
        </Show>
    )
};

const validateEmail = email();

export const UserEdit = props => {
    return (
        <Edit title={ <UserTitle /> } undoable={false} redirect="list" { ...props }>
            <SimpleForm>
                <TextInput source="id" />
                <TextInput source="firstName" />
                <TextInput source="lastName" />
                <ChipField source="occupation" />
                <DateInput source="born" />
                <TextInput source="email" validate={validateEmail} />
                <NumberInput source="phone" />
                <BooleanInput source="commentable" />
            </SimpleForm>
        </Edit>
    )
}

