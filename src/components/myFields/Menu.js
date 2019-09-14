import React, { createElement } from 'react';
import { connect } from 'react-redux';
import { MenuItemLink, getResources, Responsive } from 'react-admin';
import { withRouter } from 'react-router-dom';
import LabelIcon from '@material-ui/icons/Label';


const Menu = ({ resources, onMenuClick, logout }) => {
    return (
        <div>
            {resources.map(resource => (
                <MenuItemLink 
                    key={resource.name}
                    ti={`/${resource.name}`}
                    primaryText={resource.options && resource.options.label || resource.name}
                    leftIcon={createElement(resource.icon)}
                    onClick={onMenuClick}
                />
            ))}
            <MenuItemLink
                to="/custom-route"
                primaryText="Miscellaneous"
                leftIcon={ <LabelIcon /> }
                onClick={ onMenuClick} 
            />
            <Responsive
                small={logout}
                medium={null} // Pass null to render nothing on larger devices
            />
        </div>
    )
};

const mapStateToProps = state => {
    { resources: getResources(state) }
};

export default withRouter(connect(mapStateToProps)(Menu));