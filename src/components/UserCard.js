import React from 'react'
import PropTypes from 'prop-types'

const UserCard = props => {
    return (
        <li id={props.user.uid} className="list-group-item d-flex justify-content-between align-items-start">
            <div className="ms-2 me-auto">
                <div className="fw-bold">{props.user.name}</div>
                {props.user.company_name}
            </div>
            <span className="badge bg-danger rounded-pill">14</span>
        </li>
    )
}

UserCard.propTypes = {
    user: PropTypes.object,
}

export default UserCard
