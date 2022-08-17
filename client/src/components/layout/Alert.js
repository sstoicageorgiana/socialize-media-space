import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Alert = (props) => (
	<div className="alert-container">
		{props.alerts !== null &&
			props.alerts.length > 0 &&
			props.alerts.map((alert) => (
				<div className={`alert alert-${alert.alertType}`} key={alert.id}>
					{alert.msg}
				</div>
			))}
	</div>
);

Alert.propTypes = {
	alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
	alerts: state.alert,
});

export default connect(mapStateToProps)(Alert);

/**
 * componenta se va conecta(mapStateToProps) la alert, nu mai dau export default alert, ci conectez mapand
 * starea la proprietatile  aplicatiiei, la props, si astfel toate se conecteaza intre ele 
 * DE CITIT DESPRE CONNECT !!!
 * 
 */ 