import React from "react";
import "./ProfileCard.css";
import avatar from "../../assets/images/user/avatar-template.png";

function ProfileCard(props) {
	return (
		<div className="card-container mt-4">
			<header>
				<img className="img2 rounded-circle img-thumbnail" src={avatar} alt={props.name} />
			</header>
			<h1 className="bold-text">
				{props.name} {props.lastName} 
			</h1>
			<h2 className="normal-text">{props.userType}</h2>
			<div className="summary-container">
				<div className="today">
					<h1 className="bold-text">{props.today}</h1>
					<h2 className="smaller-text">Today</h2>
				</div>
				<div className="week">
					<h1 className="bold-text">{props.week}</h1>
					<h2 className="smaller-text">This Week</h2>
				</div>
				<div className="month">
					<h1 className="bold-text">{props.month}</h1>
					<h2 className="smaller-text">This Month</h2>
				</div>
                <div className="overall">
					<h1 className="bold-text">{props.overall}</h1>
					<h2 className="smaller-text">Overall</h2>
				</div>
			</div>
		</div>
	);
}

export default ProfileCard;